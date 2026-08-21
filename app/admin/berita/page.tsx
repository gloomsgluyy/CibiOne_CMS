import { ContentList } from "@/components/admin/content-list";
export default function AdminBeritaPage() { return <ContentList resource="posts" title="Kelola Berita" createBody={{ type: "berita", title: "Berita baru", slug: `berita-${Date.now()}`, isPublished: false }} />; }
