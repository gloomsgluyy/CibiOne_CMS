import { revalidateTag } from "next/cache";

export function revalidatePublicResource(resource: "posts" | "guru" | "facilities" | "partners" | "settings", type?: string, key?: string) {
  if (resource === "posts") {
    revalidateTag("public-posts");
    if (type) revalidateTag(`public-posts-${type}`);
    return;
  }
  if (resource === "settings" && key) revalidateTag(`public-setting-${key}`);
  else revalidateTag(`public-${resource}`);
}
