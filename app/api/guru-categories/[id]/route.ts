import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

import { guruCategories } from "@/db/schema";
import { apiError, apiSuccess } from "@/lib/api-response";
import { assertJurusanScope } from "@/lib/auth";
import { getSession } from "@/server/auth/session";
import { routeError } from "@/server/http";
import { categoryInputSchema, idSchema } from "@/server/validators/content";

type Context = { params: Promise<{ id: string }> };
async function scopedRecord(id: number) { const session = await getSession(); if (!session) return { session: null, record: null }; const { db } = await import("@/db"); const [record] = await db.select().from(guruCategories).where(eq(guruCategories.id, id)).limit(1); if (!record) return { session, record: null }; assertJurusanScope(session, record.jurusanId); return { session, record }; }
export async function GET(_: NextRequest, context: Context) { try { const { session, record } = await scopedRecord(idSchema.parse((await context.params).id)); if (!session) return apiError({ code: "UNAUTHENTICATED", message: "Silakan masuk terlebih dahulu." }, { status: 401 }); if (!record) return apiError({ code: "NOT_FOUND", message: "Kategori tidak ditemukan." }, { status: 404 }); return apiSuccess(record); } catch (error) { return routeError(error); } }
export async function PUT(request: NextRequest, context: Context) { try { const id = idSchema.parse((await context.params).id); const { session, record } = await scopedRecord(id); if (!session) return apiError({ code: "UNAUTHENTICATED", message: "Silakan masuk terlebih dahulu." }, { status: 401 }); if (!record) return apiError({ code: "NOT_FOUND", message: "Kategori tidak ditemukan." }, { status: 404 }); const input = categoryInputSchema.parse(await request.json()); const { db } = await import("@/db"); const [updated] = await db.update(guruCategories).set({ name: input.name, slug: input.slug, sortOrder: input.sortOrder, isActive: input.isActive, jurusanId: record.jurusanId, updatedAt: new Date() }).where(eq(guruCategories.id, id)).returning(); return apiSuccess(updated); } catch (error) { return routeError(error); } }
export async function DELETE(_: NextRequest, context: Context) { try { const id = idSchema.parse((await context.params).id); const { session, record } = await scopedRecord(id); if (!session) return apiError({ code: "UNAUTHENTICATED", message: "Silakan masuk terlebih dahulu." }, { status: 401 }); if (!record) return apiError({ code: "NOT_FOUND", message: "Kategori tidak ditemukan." }, { status: 404 }); const { db } = await import("@/db"); const [updated] = await db.update(guruCategories).set({ isActive: false, updatedAt: new Date() }).where(eq(guruCategories.id, id)).returning(); return apiSuccess(updated); } catch (error) { return routeError(error); } }
