import { createOllama } from "ollama-ai-provider";

const ollama = createOllama({
  baseURL: process.env.OLLAMA_BASE_URL as string
})

export async function POST(req: Request) {
  const { prompt } = await req.json();

  return Response.json({
    prompt
  })
}