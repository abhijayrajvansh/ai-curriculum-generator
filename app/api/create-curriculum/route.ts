import { createOllama } from "ollama-ai-provider";
import { streamText } from "ai";
import { z } from 'zod';

const ollama = createOllama({
  baseURL: process.env.OLLAMA_BASE_URL as string,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const { text } = await streamText ({
    model: ollama("llama3.2:3b"), 
    prompt: prompt,
    // output: 'no-schema'
  })

  console.log({text})

  return Response.json({
    msg: "success"
  });
}
