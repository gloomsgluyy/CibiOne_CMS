import { and, asc, count, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

import { jurusan } from "@/db/schema";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const requestedCategory = searchParams.get("category");
  const category = requestedCategory === "IT" || requestedCategory === "Teknik" ? requestedCategory : null;
  const requestedPage = Number(searchParams.get("page") ?? "1");
  const requestedLimit = Number(searchParams.get("limit") ?? "100");

  if (requestedCategory && !category) {
    return apiError({ code: "VALIDATION_ERROR", message: "Kategori harus IT atau Teknik." }, { status: 400 });
  }

  if (!Number.isInteger(requestedPage) || requestedPage < 1 || !Number.isInteger(requestedLimit) || requestedLimit < 1 || requestedLimit > 100) {
    return apiError({ code: "VALIDATION_ERROR", message: "Parameter page atau limit tidak valid." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return apiSuccess([], undefined, { page: requestedPage, limit: requestedLimit, total: 0 });
  }

  const filters = [eq(jurusan.isActive, true), eq(jurusan.isPublished, true)];
  if (category) {
    filters.push(eq(jurusan.category, category));
  }

  try {
    // Import on request so builds and seed previews do not require a database URL.
    const { db } = await import("@/db");
    const where = and(...filters);
    const [items, totalResult] = await Promise.all([
      db.select().from(jurusan).where(where).orderBy(asc(jurusan.sortOrder), asc(jurusan.name)).limit(requestedLimit).offset((requestedPage - 1) * requestedLimit),
      db.select({ value: count() }).from(jurusan).where(where),
    ]);

    return apiSuccess(items, undefined, { page: requestedPage, limit: requestedLimit, total: totalResult[0]?.value ?? 0 });
  } catch {
    return apiError({ code: "INTERNAL_ERROR", message: "Data jurusan tidak dapat dimuat." }, { status: 500 });
  }
}
