import { createOllama } from "ollama-ai-provider";
import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

const ollama = createOllama({
  baseURL: process.env.OLLAMA_BASE_URL as string,
});

export async function POST (req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    // model: ollama("llama3.2:3b"),
    model: openai('gpt-4o-mini'),
    system: 'you are a helpful assistant, that creates detailed roadmap and curriculum for people to upskill.',
    messages: convertToCoreMessages(messages)
  })

  return result.toDataStreamResponse();
}