import { db } from "@/db";
import { agents, meetings, user } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { StreamTransciption } from "@/modules/meetings/types";
import { eq, inArray } from "drizzle-orm";
import JSONL from "jsonl-parse-stringify";

const SYSTEM_PROMPT = `
You are an expert summarizer. You write readable, concise, simple content. You are given a transcript of a meeting and you need to summarize it.

Use the following markdown structure for every output:

### Overview
Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

### Notes
Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

Example:
#### Section Name
- Main point or demo shown here
- Another key insight or interaction
- Follow-up tool or explanation provided

#### Next Section
- Feature X automatically does Y
- Mention of integration with Z
`.trim();

async function summarizeWithPerplexity(
  transcriptWithSpeakers: StreamTransciption[]
): Promise<string> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) throw new Error("Missing Perplexity API Key!");

  const userPrompt =
    "Summarize the following transcript:\n" +
    JSON.stringify(transcriptWithSpeakers);

  const reqBody = {
    model: "sonar-pro",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
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
  return data.choices[0].message.content.trim();
}

export const meetingsProcessing = inngest.createFunction(
  {
    id: "meetings/processing",
  },
  { event: "meetings/processing" },
  async ({ event, step }) => {
    const response = await step.run("fetch-transcript", async () => {
      return fetch(event.data.transcriptUrl).then((res) => res.text());
    });
    const transcript = await step.run("parse-transcript", async () => {
      return JSONL.parse<StreamTransciption>(response);
    });

    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id)),
      ];
      const userSpeakers = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakerIds));

      const agentSpeakers = await db
        .select()
        .from(agents)
        .where(inArray(agents.id, speakerIds));

      const speakers = [...userSpeakers, ...agentSpeakers];
      return transcript.map((item) => {
        const speaker = speakers.find(
          (speaker) => speaker.id === item.speaker_id
        );
        return {
          ...item,
          user: {
            name: speaker ? speaker.name : "Unknown",
          },
        };
      });
    });

    const summary = await step.run("summarize", async () => {
      return summarizeWithPerplexity(transcriptWithSpeakers);
    });

    await step.run("save-summary", async () => {
      await db
        .update(meetings)
        .set({
          summary,
          status: "completed",
        })
        .where(eq(meetings.id, event.data.meetingId));
    });
  }
);
