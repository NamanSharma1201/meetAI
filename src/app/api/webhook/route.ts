import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { generateAvatarUri } from "@/lib/avatar";
import { stremVideo } from "@/lib/steam-video";
import { streamChat } from "@/lib/stream-chat";
import {
  CallEndedEvent,
  CallTranscriptionReadyEvent,
  CallSessionParticipantLeftEvent,
  CallRecordingReadyEvent,
  CallSessionStartedEvent,
  MessageNewEvent,
} from "@stream-io/node-sdk";
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
async function askPerplexity({
  messages,
  instructions,
}: {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  instructions: string;
}): Promise<{ content: string }> {
  const apiKey = process.env.PERPLEXITY_API_KEY!;
  if (!apiKey) throw new Error("Missing Perplexity API Key!");

  const reqBody = {
    model: "sonar-pro",
    messages: [{ role: "system", content: instructions }, ...messages],
    max_tokens: 1500,
    temperature: 0.5,
  };

  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });

  if (!res.ok) {
    throw new Error(`Perplexity API error: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  if (
    !data.choices ||
    !Array.isArray(data.choices) ||
    !data.choices[0]?.message?.content
  ) {
    throw new Error(
      "Unexpected response from Perplexity API: " + JSON.stringify(data)
    );
  }
  return { content: data.choices[0].message.content.trim() };
}

function verifySignatureSDK(body: string, signature: string): boolean {
  return stremVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  const apiKey = req.headers.get("x-api-key");
  if (!signature || !apiKey) {
    return NextResponse.json(
      { error: "Missing signature or API key" },
      { status: 400 }
    );
  }
  const body = await req.text();

  if (!verifySignatureSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid Signature" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const eventType = (payload as Record<string, unknown>)?.type;

  // Debug log event type
  // console.log("Received webhook event:", eventType);

  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;
    if (!meetingId) {
      return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "active")),
          not(eq(meetings.status, "processing")),
          not(eq(meetings.status, "cancel"))
        )
      );
    if (!existingMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }
    await db
      .update(meetings)
      .set({
        status: "active",
        startedAt: new Date(),
      })
      .where(eq(meetings.id, existingMeeting.id));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }
    const call = stremVideo.video.call("default", meetingId);
    const realtimeClient = await stremVideo.video.connectOpenAi({
      call,
      openAiApiKey: process.env.OPENAI_API_KEY!,
      agentUserId: existingAgent.id,
    });

    realtimeClient.updateSession({
      instructions: existingAgent.instructions,
    });
  } else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];
    if (!meetingId) {
      return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
    }
    const call = stremVideo.video.call("default", meetingId);
    await call.end();
  } else if (eventType === "call.session_ended") {
    const event = payload as CallEndedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });
    }
    await db
      .update(meetings)
      .set({
        status: "processing",
        startedAt: new Date(),
      })
      .where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")));
  } else if (eventType === "call.transcription_ready") {
    const event = payload as CallTranscriptionReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    // Update the meeting with transcriptUrl
    const [updatedMeeting] = await db
      .update(meetings)
      .set({
        transcriptUrl: event.call_transcription.url,
      })
      .where(eq(meetings.id, meetingId))
      .returning();

    if (!updatedMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    // Send event to Inngest summarizer
    await inngest.send({
      name: "meetings/processing",
      data: {
        meetingId: updatedMeeting.id,
        transcriptUrl: updatedMeeting.transcriptUrl,
      },
    });

    // console.log(
    //   "Sent meetings/processing event to Inngest for meeting:",
    //   updatedMeeting.id
    // );
  } else if (eventType === "call.recording_ready") {
    const event = payload as CallRecordingReadyEvent;
    const meetingId = event.call_cid.split(":")[1];
    await db
      .update(meetings)
      .set({
        recordingUrl: event.call_recording.url,
      })
      .where(eq(meetings.id, meetingId))
      .returning();
  } else if (eventType === "message.new") {
    const event = payload as MessageNewEvent;
    const channelId = event.channel_id;
    const userId = event.user?.id;
    const text = event.message?.text;
    if (!userId || !channelId || !text) {
      return NextResponse.json(
        {
          error: "Misssing required fields",
        },
        {
          status: 400,
        }
      );
    }
    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(and(eq(meetings.id, channelId), eq(meetings.status, "completed")));
    if (!existingMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }
    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }
    if (userId != existingAgent.id) {
      const instructions = `
      You are an AI assistant helping the user revisit a recently completed meeting.
      Below is a summary of the meeting, generated from the transcript:
      
      ${existingMeeting.summary}
      
      The following are your original instructions from the live meeting assistant. Please continue to follow these behavioral guidelines as you assist the user:
      
      ${existingAgent.instructions}
      
      The user may ask questions about the meeting, request clarifications, or ask for follow-up actions.
      Always base your responses on the meeting summary above.
      
      You also have access to the recent conversation history between you and the user. Use the context of previous messages to provide relevant, coherent, and helpful responses. If the user's question refers to something discussed earlier, make sure to take that into account and maintain continuity in the conversation.
      
      If the summary does not contain enough information to answer a question, politely let the user know.
      
      Be concise, helpful, and focus on providing accurate information from the meeting and the ongoing conversation.
      `;
      const channel = streamChat.channel("messaging", channelId);
      await channel.watch();
      const previousMessages: Array<{
        role: "user" | "assistant";
        content: string;
      }> = channel.state.messages
        .slice(-5)
        .filter((msg) => msg.text && msg.text.trim() !== "")
        .map((message) => ({
          role: message.user?.id === existingAgent.id ? "assistant" : "user",
          content: message.text || "",
        }));

      const perplexityResponse = await askPerplexity({
        messages: previousMessages,
        instructions,
      });
      const avatarUrl = generateAvatarUri({
        seed: existingAgent.name,
        variant: "botttsNeutral",
      });
      streamChat.upsertUser({
        id: existingAgent.id,
        name: existingAgent.name,
        image: avatarUrl,
      });
      channel.sendMessage({
        text: perplexityResponse.content,
        user: {
          id: existingAgent.id,
          name: existingAgent.name,
          image: avatarUrl,
        },
      });
    }
  }

  return NextResponse.json({ status: "ok" });
}
