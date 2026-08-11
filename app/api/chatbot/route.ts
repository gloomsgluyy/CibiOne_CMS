import { apiError } from "@/lib/api-response";

export async function POST() {
  return apiError({ code: "NOT_IMPLEMENTED", message: "Chatbot belum diimplementasi" }, { status: 501 });
}
