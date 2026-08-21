type Entry = { count: number; resetAt: number };

const entries = new Map<string, Entry>();

// ponytail: Per-instance limiter. Replace with Vercel KV/provider limiter for multi-instance production.
export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = entries.get(key);
  if (!entry || entry.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

export function requestIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
