import { StreamingTextResponse } from 'ai'
import { OpenAIStream } from 'ai/streams'
import OpenAI from 'openai'

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Request the OpenAI API for the response
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
} 