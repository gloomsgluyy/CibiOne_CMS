export type ApiError = {
  code: string;
  message: string;
};

export function apiSuccess<T>(data: T, init?: ResponseInit, meta?: Record<string, unknown>) {
  return Response.json({ success: true, data, ...(meta ? { meta } : {}) }, init);
}

export function apiError(error: ApiError, init?: ResponseInit) {
  return Response.json({ success: false, error }, init);
}
