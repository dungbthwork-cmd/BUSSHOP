// app/api/chat/route.ts
import OpenAI from "openai"
import { NextRequest } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = "edge" // stream nhanh hơn; chuyển "nodejs" nếu cần

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as {
      messages: Array<{ role: "system"|"user"|"assistant"; content: string }>
    }

    if (!process.env.OPENAI_API_KEY) {
      return new Response("Missing OPENAI_API_KEY", { status: 500 })
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini"

    // Dùng Responses API (stream text)
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.3,
      stream: true,
    })

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const delta = chunk.choices?.[0]?.delta?.content || ""
            if (delta) controller.enqueue(new TextEncoder().encode(delta))
          }
        } catch (err) {
          controller.error(err)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    })
  } catch (e: any) {
    return new Response(e?.message || "Chat error", { status: 500 })
  }
}
