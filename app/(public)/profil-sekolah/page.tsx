import { SejarahSection } from "@/components/sections/profil-sekolah/sejarah-section";
import { VisiMisiSection } from "@/components/sections/profil-sekolah/visi-misi-section";
import { GuruStaffSection } from "@/components/sections/profil-sekolah/guru-staff-section";
import { SaranaPrasaranaSection } from "@/components/sections/profil-sekolah/sarana-prasarana-section";
import { AkreditasiSection } from "@/components/sections/profil-sekolah/akreditasi-section";
import { KerjaSamaIndustriSection } from "@/components/sections/profil-sekolah/kerja-sama-industri-section";

export default function ProfilSekolahPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SejarahSection />
      <VisiMisiSection />
      <GuruStaffSection />
      <SaranaPrasaranaSection />
      <AkreditasiSection />
      <KerjaSamaIndustriSection />
    </main>
  );
}
