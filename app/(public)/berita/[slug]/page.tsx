export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <main className="p-6">Berita: {slug}</main>;
}
