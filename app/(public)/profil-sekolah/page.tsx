import { SejarahSection } from "@/components/sections/profil-sekolah/sejarah-section";
import { ProfileSections } from "@/components/sections/profil-sekolah/profile-sections";
import { getPublicFacilities, getPublicGuru, getPublicPartners } from "@/server/queries/public-content";

export default async function ProfilSekolahPage() {
  const [facilities, guru, partners] = await Promise.all([getPublicFacilities(), getPublicGuru(), getPublicPartners()]);
  const guruItems = guru.map((item) => ({ id: item.id, name: item.name, position: item.position ?? "", bio: item.bio ?? "", image: item.imageUrl ?? "/banner.jpeg", category: item.category ?? "General" }));
  return (
    <main className="min-h-screen bg-gray-50">
      <SejarahSection />
      <ProfileSections facilities={facilities} guru={guruItems} partners={partners} />
    </main>
  );
}
