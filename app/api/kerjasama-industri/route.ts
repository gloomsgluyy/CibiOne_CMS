import { and, asc, count, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

import { kerjasamaIndustri } from "@/db/schema";
import { apiError, apiSuccess } from "@/lib/api-response";
import { scopedJurusanId } from "@/lib/auth";
import { getSession } from "@/server/auth/session";
import { routeError } from "@/server/http";
import { listQuerySchema, partnerInputSchema } from "@/server/validators/content";

export async function GET(request: NextRequest) {
  try {
    const query = listQuerySchema.parse(Object.fromEntries(request.nextUrl.searchParams));
    if (!process.env.DATABASE_URL) return apiSuccess([], undefined, { page: query.page, limit: query.limit, total: 0 });
    const { db } = await import("@/db");
    const session = await getSession();
    const filters = [];
    if (!session) filters.push(eq(kerjasamaIndustri.isPublished, true));
    else if (session.role === "jurusan_admin") filters.push(eq(kerjasamaIndustri.jurusanId, session.jurusanId!));
    if (query.jurusan_id) filters.push(eq(kerjasamaIndustri.jurusanId, query.jurusan_id));
    const where = filters.length ? and(...filters) : undefined;
    const [data, totalResult] = await Promise.all([
      db.select({ id: kerjasamaIndustri.id, name: kerjasamaIndustri.name, logoUrl: kerjasamaIndustri.logoUrl, description: kerjasamaIndustri.description, websiteUrl: kerjasamaIndustri.websiteUrl, sortOrder: kerjasamaIndustri.sortOrder, isPublished: kerjasamaIndustri.isPublished }).from(kerjasamaIndustri).where(where).orderBy(asc(kerjasamaIndustri.sortOrder), asc(kerjasamaIndustri.name)).limit(query.limit).offset((query.page - 1) * query.limit),
      db.select({ value: count() }).from(kerjasamaIndustri).where(where),
    ]);
    return apiSuccess(data, undefined, { page: query.page, limit: query.limit, total: totalResult[0]?.value ?? 0 });
  } catch (error) { return routeError(error); }
}
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return apiError({ code: "UNAUTHENTICATED", message: "Silakan masuk terlebih dahulu." }, { status: 401 });
    const input = partnerInputSchema.parse(await request.json());
    const { db } = await import("@/db");
    const [created] = await db.insert(kerjasamaIndustri).values({ ...input, jurusanId: scopedJurusanId(session, input.jurusanId), createdBy: session.id }).returning();
    return apiSuccess(created, { status: 201 });
  } catch (error) { return routeError(error); }
}
