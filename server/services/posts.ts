import { insertPost } from "@/server/repositories/posts";
import type { SessionUser } from "@/lib/auth";
import { scopedJurusanId } from "@/lib/auth";
import { revalidatePublicResource } from "@/server/cache";

export async function createPost(user: SessionUser, input: { type: "berita" | "pengumuman" | "prestasi" | "agenda"; title: string; slug: string; excerpt?: string | null; body?: string | null; imageUrl?: string | null; galleryUrls?: string[]; categoryId?: number | null; jurusanId?: number | null; eventDate?: Date | null; isPublished: boolean; publishedAt?: Date | null; isFeatured: boolean; featuredOrder?: number | null; isHighlighted: boolean; highlightOrder?: number | null; isPopularOverride: boolean }) {
  const post = await insertPost({ ...input, jurusanId: scopedJurusanId(user, input.jurusanId), createdBy: user.id, galleryUrls: input.galleryUrls ?? [] });
  revalidatePublicResource("posts", input.type);
  return post;
}
