import { notFound } from "next/navigation";

import { BeritaDetailClient } from "@/components/sections/berita/berita-detail-client";
import { getPublicPostBySlug, getPublicPosts } from "@/server/queries/public-content";

function formatDate(value: Date | null) {
  return value ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(value) : "";
}

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublicPostBySlug(slug);
  if (!post) notFound();
  const related = await getPublicPosts("berita", 5);
  type NewsSource = { id: number; title: string; excerpt: string | null; body?: string | null; imageUrl: string | null; publishedAt: Date | null; category: { name: string; slug: string } | null };
  const toNewsItem = (item: NewsSource, rank: number) => ({ id: item.id, title: item.title, excerpt: item.excerpt ?? "", date: formatDate(item.publishedAt), category: item.category?.name ?? "Berita", image: item.imageUrl ?? "/banner.jpeg", popularRank: rank, content: [(item.body ?? item.excerpt ?? "").split(/\n{2,}/)] });
  return <BeritaDetailClient news={toNewsItem(post as NewsSource, 1)} relatedNews={related.filter((item) => item.id !== post.id).map((item, index) => toNewsItem(item as NewsSource, index + 2))} />;
}
