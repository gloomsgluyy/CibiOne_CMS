import { and, eq, isNull, or } from "drizzle-orm";
import { NextRequest } from "next/server";
import { z } from "zod";

import { chatbotKnowledge } from "@/db/schema";
import { apiError, apiSuccess } from "@/lib/api-response";
import { routeError } from "@/server/http";
import { checkRateLimit, requestIp } from "@/server/rate-limit";

const bodySchema = z.object({ prompt: z.string().trim().min(2).max(1_000), jurusanId: z.number().int().positive().nullable().optional() });

export async function POST(request: NextRequest) {
  try {
    if (!checkRateLimit(`chatbot:${requestIp(request)}`, 20, 60 * 60 * 1000)) return apiError({ code: "RATE_LIMITED", message: "Batas pertanyaan tercapai. Coba lagi nanti." }, { status: 429 });
    const { prompt, jurusanId } = bodySchema.parse(await request.json());
    if (!process.env.DATABASE_URL) return apiError({ code: "CHATBOT_UNAVAILABLE", message: "Layanan chatbot belum tersedia." }, { status: 503 });
    const { db } = await import("@/db");
    const knowledge = await db.select({ content: chatbotKnowledge.contentText }).from(chatbotKnowledge).where(and(eq(chatbotKnowledge.isActive, true), eq(chatbotKnowledge.isPublished, true), jurusanId ? or(eq(chatbotKnowledge.jurusanId, jurusanId), isNull(chatbotKnowledge.jurusanId)) : undefined)).limit(5);
    if (!process.env.CHATBOT_PROVIDER_URL || !process.env.CHATBOT_PROVIDER_KEY) return apiError({ code: "CHATBOT_UNAVAILABLE", message: "Layanan chatbot belum tersedia." }, { status: 503 });
    const response = await fetch(process.env.CHATBOT_PROVIDER_URL, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.CHATBOT_PROVIDER_KEY}` }, body: JSON.stringify({ prompt, knowledge: knowledge.map((item) => item.content) }), signal: AbortSignal.timeout(15_000) });
    if (!response.ok) return apiError({ code: "CHATBOT_UNAVAILABLE", message: "Layanan chatbot sedang tidak tersedia." }, { status: 503 });
    const data = await response.json() as { answer?: unknown };
    if (typeof data.answer !== "string") return apiError({ code: "CHATBOT_UNAVAILABLE", message: "Layanan chatbot sedang tidak tersedia." }, { status: 503 });
    return apiSuccess({ answer: data.answer });
  } catch (error) { return routeError(error); }
}
