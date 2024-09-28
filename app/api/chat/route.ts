import { openai } from '@ai-sdk/openai';
import { createOllama } from 'ollama-ai-provider';
import { streamText, convertToCoreMessages } from 'ai';

// export const maxDuration = 30; // Allow streaming responses up to 30 seconds

const ollama = createOllama({
  baseURL: 'http://192.168.29.170:11434/api/'
})

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    // model: openai('gpt-4-turbo'),
    model: ollama('llama3.2:3b'),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}