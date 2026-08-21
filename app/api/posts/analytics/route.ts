import { eq } from "drizzle-orm";

import { posts } from "@/db/schema";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getSession } from "@/server/auth/session";
import { routeError } from "@/server/http";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return apiError({ code: "UNAUTHENTICATED", message: "Silakan masuk terlebih dahulu." }, { status: 401 });
    if (!process.env.DATABASE_URL) return apiSuccess({ total: 0, published: 0, drafts: 0, views: 0, activity: Array(14).fill(0) });

    const { db } = await import("@/db");
    const rows = await db.select({ isPublished: posts.isPublished, viewCount: posts.viewCount, createdAt: posts.createdAt })
      .from(posts)
      .where(session.role === "jurusan_admin" ? eq(posts.jurusanId, session.jurusanId!) : undefined);
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - 13);
    const activity = Array(14).fill(0) as number[];
    for (const row of rows) {
      const day = Math.floor((row.createdAt.getTime() - start.getTime()) / 86_400_000);
      if (day >= 0 && day < activity.length) activity[day]++;
    }
    const published = rows.filter((row) => row.isPublished).length;
    return apiSuccess({ total: rows.length, published, drafts: rows.length - published, views: rows.reduce((sum, row) => sum + row.viewCount, 0), activity });
  } catch (error) {
    return routeError(error);
  }
}
