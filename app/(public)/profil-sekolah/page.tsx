import { SejarahSection } from "@/components/sections/profil-sekolah/sejarah-section";
import { ProfileSections } from "@/components/sections/profil-sekolah/profile-sections";

export default function ProfilSekolahPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SejarahSection />
      <ProfileSections />
    </main>
  );
}
