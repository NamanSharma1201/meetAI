import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { stremVideo } from "@/lib/steam-video";
import {
  // CallEndedEvent,
  // CallTranscriptionReadyEvent,
  CallSessionParticipantLeftEvent,
  // CallRecordingReadyEvent,
  CallSessionStartedEvent,
} from "@stream-io/node-sdk";

import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

function verifySignatureSDK(body: string, signature: string): boolean {
  return stremVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  const apiKey = req.headers.get("x-api-key");
  if (!signature || !apiKey) {
    return NextResponse.json(
      { error: "Misssing signature or API key" },
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
      openAiApiKey: process.env.PERPLEXITY_API_KEY!,
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
  }

  return NextResponse.json({ status: "ok" });
}
