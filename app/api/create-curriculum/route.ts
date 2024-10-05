import { createOllama } from "ollama-ai-provider";
import { openai } from "@ai-sdk/openai";
import { google } from '@ai-sdk/google';
import { convertToCoreMessages, streamText } from "ai";

const ollama = createOllama({
  baseURL: process.env.OLLAMA_BASE_URL as string,
});

export async function POST (req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    // model: ollama("llama3.2:3b"),
    model: openai('gpt-4o-mini'),
    // model: google('gemini-1.5-flash-latest'),
    system: 'You are an experienced guide who assist teams to upscale. You are profound in making roadmaps and course curriculums according to the team requirements.',
    messages: convertToCoreMessages(messages)
  })

  return result.toDataStreamResponse();
}