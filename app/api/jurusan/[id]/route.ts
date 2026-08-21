import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

import { jurusan } from "@/db/schema";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id < 1) return apiError({ code: "VALIDATION_ERROR", message: "ID jurusan tidak valid." }, { status: 422 });
  if (!process.env.DATABASE_URL) return apiError({ code: "NOT_FOUND", message: "Jurusan tidak ditemukan." }, { status: 404 });
  try {
    const { db } = await import("@/db");
    const [record] = await db.select({ id: jurusan.id, code: jurusan.code, name: jurusan.name, fullName: jurusan.fullName, slug: jurusan.slug, category: jurusan.category, description: jurusan.description, kompetensi: jurusan.kompetensi, fokusKeahlian: jurusan.fokusKeahlian, prospek: jurusan.prospek, logoUrl: jurusan.logoUrl, bgImageUrl: jurusan.bgImageUrl, websiteUrl: jurusan.websiteUrl, isPublished: jurusan.isPublished }).from(jurusan).where(eq(jurusan.id, id)).limit(1);
    if (!record || !record.isPublished) return apiError({ code: "NOT_FOUND", message: "Jurusan tidak ditemukan." }, { status: 404 });
    return apiSuccess(record);
  } catch { return apiError({ code: "INTERNAL_ERROR", message: "Data jurusan tidak dapat dimuat." }, { status: 500 }); }
}
