import { BeritaSection } from "@/components/sections/berita/berita-section";
import { getPublicPosts } from "@/server/queries/public-content";

function toDate(value: Date | null) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export default async function BeritaPage() {
  const [posts, achievements] = await Promise.all([getPublicPosts("berita", 50), getPublicPosts("prestasi", 50)]);
  const newsItems = posts.map((post, index) => ({ id: post.id, title: post.title, excerpt: post.excerpt ?? "", date: toDate(post.publishedAt), category: post.category?.name ?? "Berita", image: post.imageUrl ?? "/banner.jpeg", popularRank: index + 1, content: [[post.excerpt ?? ""]] }));
  const achievementItems = achievements.map((post, index) => ({ id: post.id, title: post.title, recipient: post.excerpt ?? "SMKN 1 Cibinong", date: toDate(post.publishedAt), level: "Prestasi", image: post.imageUrl ?? "/banner.jpeg", ratio: (index % 3 === 0 ? "portrait" : index % 3 === 1 ? "landscape" : "square") as "portrait" | "landscape" | "square", description: post.excerpt ?? "" }));
  return (
    <main className="min-h-screen bg-[#f4f8fa]">
      <BeritaSection items={newsItems} achievements={achievementItems} />
    </main>
  );
}
