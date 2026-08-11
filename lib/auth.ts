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
