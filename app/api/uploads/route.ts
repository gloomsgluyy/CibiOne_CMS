import { put } from "@vercel/blob";
import { NextRequest } from "next/server";

import { apiError, apiSuccess } from "@/lib/api-response";
import { getSession } from "@/server/auth/session";
import { checkRateLimit, requestIp } from "@/server/rate-limit";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const maxBytes = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return apiError({ code: "UNAUTHENTICATED", message: "Silakan masuk terlebih dahulu." }, { status: 401 });
  if (!checkRateLimit(`upload:${session.id}:${requestIp(request)}`, 30, 60 * 60 * 1000)) return apiError({ code: "RATE_LIMITED", message: "Batas unggah tercapai. Coba lagi nanti." }, { status: 429 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return apiError({ code: "INTERNAL_ERROR", message: "Penyimpanan media belum dikonfigurasi." }, { status: 500 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !allowedTypes.has(file.type) || file.size > maxBytes) {
    return apiError({ code: "INVALID_FILE", message: "File harus gambar JPEG, PNG, WebP, atau AVIF maksimal 5 MB." }, { status: 422 });
  }
  const extension = file.type.split("/")[1];
  const blob = await put(`cms/${session.id}/${crypto.randomUUID()}.${extension}`, file, { access: "public", addRandomSuffix: false, contentType: file.type });
  return apiSuccess({ url: blob.url, contentType: file.type, size: file.size }, { status: 201 });
}
