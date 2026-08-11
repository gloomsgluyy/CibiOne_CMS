import { apiSuccess } from "@/lib/api-response";

export async function GET() {
  return apiSuccess([], undefined, { page: 1, limit: 10, total: 0 });
}
