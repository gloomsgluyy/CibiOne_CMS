import { apiSuccess } from "@/lib/api-response";
import { clearedSessionCookie, revokeSession } from "@/server/auth/session";

export async function POST() {
  await revokeSession();
  const response = apiSuccess({ loggedOut: true });
  const cookie = clearedSessionCookie();
  response.headers.append("Set-Cookie", `${cookie.name}=; Path=/; HttpOnly; SameSite=Lax; Expires=${cookie.options.expires.toUTCString()}${cookie.options.secure ? "; Secure" : ""}`);
  return response;
}
