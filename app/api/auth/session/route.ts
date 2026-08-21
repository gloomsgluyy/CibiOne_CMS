import { apiError, apiSuccess } from "@/lib/api-response";
import { getSession } from "@/server/auth/session";

export async function GET() {
  const session = await getSession();
  if (!session) return apiError({ code: "UNAUTHENTICATED", message: "Silakan masuk terlebih dahulu." }, { status: 401 });
  return apiSuccess({ user: { id: session.id, role: session.role, jurusanId: session.jurusanId }, expiresAt: session.expiresAt.toISOString() });
}
