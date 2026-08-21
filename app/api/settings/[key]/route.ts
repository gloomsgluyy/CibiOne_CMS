import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { z } from "zod";

import { siteSettings } from "@/db/schema";
import { apiError, apiSuccess } from "@/lib/api-response";
import { requireSuperAdmin } from "@/lib/auth";
import { getSession } from "@/server/auth/session";
import { routeError } from "@/server/http";
import { parseSetting } from "@/server/settings";
import { revalidatePublicResource } from "@/server/cache";

const keys = ["school_vision_mission", "school_accreditation"] as const;
const keySchema = z.enum(keys);

export async function GET(_: NextRequest, context: { params: Promise<{ key: string }> }) {
  try {
    const key = keySchema.parse((await context.params).key);
    if (!process.env.DATABASE_URL) return apiError({ code: "NOT_FOUND", message: "Pengaturan belum tersedia." }, { status: 404 });
    const { db } = await import("@/db");
    const [setting] = await db.select({ key: siteSettings.key, value: siteSettings.value, updatedAt: siteSettings.updatedAt }).from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
    if (!setting) return apiError({ code: "NOT_FOUND", message: "Pengaturan tidak ditemukan." }, { status: 404 });
    return apiSuccess(setting);
  } catch (error) {
    return routeError(error);
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ key: string }> }) {
  try {
    const session = await getSession();
    if (!session) return apiError({ code: "UNAUTHENTICATED", message: "Silakan masuk terlebih dahulu." }, { status: 401 });
    requireSuperAdmin(session);
    const key = keySchema.parse((await context.params).key);
    const value = parseSetting(key, z.object({ value: z.unknown() }).parse(await request.json()).value);
    const { db } = await import("@/db");
    const [setting] = await db.insert(siteSettings).values({ key, value, updatedBy: session.id, updatedAt: new Date() }).onConflictDoUpdate({ target: siteSettings.key, set: { value, updatedBy: session.id, updatedAt: new Date() } }).returning();
    revalidatePublicResource("settings", undefined, key);
    return apiSuccess(setting);
  } catch (error) {
    return routeError(error);
  }
}
