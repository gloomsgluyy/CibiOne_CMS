export type UserRole = "super_admin" | "jurusan_admin";

export type SessionUser = {
  id: number;
  role: UserRole;
  jurusanId: number | null;
};

export function assertJurusanScope(user: SessionUser, jurusanId: number | null) {
  if (user.role === "jurusan_admin" && user.jurusanId !== jurusanId) {
    throw new Error("FORBIDDEN_JURUSAN_SCOPE");
  }
}

export function requireSuperAdmin(user: SessionUser) {
  if (user.role !== "super_admin") throw new Error("FORBIDDEN");
}

export function scopedJurusanId(user: SessionUser, requestedJurusanId: number | null | undefined) {
  if (user.role === "jurusan_admin") {
    if (!user.jurusanId) throw new Error("FORBIDDEN_JURUSAN_SCOPE");
    return user.jurusanId;
  }
  return requestedJurusanId ?? null;
}
