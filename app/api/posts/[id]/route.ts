import { apiError } from "@/lib/api-response";

export async function GET() {
  return apiError({ code: "NOT_IMPLEMENTED", message: "Post detail belum diimplementasi" }, { status: 501 });
}
