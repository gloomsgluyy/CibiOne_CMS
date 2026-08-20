import { notFound } from "next/navigation";
import { extractIdFromSlug, generateSlugWithId } from "@/lib/slug";
import { BeritaDetailClient } from "@/components/sections/berita/berita-detail-client";

// Temporary: Import NEWS_ITEMS from berita-section
// In production, this would be fetched from API
const NEWS_ITEMS = [
  {
    id: 1,
    title: "Siswa SMKN 1 Cibinong Raih Prestasi di Tingkat Nasional",
    excerpt:
      "Karya inovatif siswa kembali membawa nama sekolah ke panggung nasional melalui kompetisi teknologi dan kreativitas.",
    date: "18 Agustus 2026",
    category: "Prestasi Siswa",
    image: "/banner.jpeg",
    popularRank: 2,
    content: [
      [
        "Prestasi ini lahir dari proses panjang yang dijalani siswa bersama guru pembimbing. Mereka mengembangkan gagasan, menguji prototipe, dan menyempurnakan presentasi sebelum tampil di tingkat nasional.",
        "Capaian tersebut menjadi bukti bahwa pembelajaran berbasis proyek mampu mendorong siswa untuk memecahkan persoalan secara kreatif sekaligus bekerja dalam tim.",
      ],
      [
        "Sekolah akan terus memperluas ruang kolaborasi agar lebih banyak siswa dapat mengikuti kompetisi sesuai bidang keahliannya. Pendampingan juga disiapkan sejak tahap perencanaan hingga evaluasi.",
        "Pengalaman kompetisi diharapkan tidak berhenti pada penghargaan, tetapi menjadi bekal kepercayaan diri dan kesiapan siswa menghadapi dunia profesional.",
      ],
    ],
  },
  {
    id: 2,
    title: "Kolaborasi Industri Buka Peluang Belajar Lebih Luas",
    excerpt:
      "Program pembelajaran bersama mitra industri memperkuat pengalaman praktik dan kesiapan kerja peserta didik.",
    date: "15 Agustus 2026",
    category: "Sekolah",
    image: "/banner.jpeg",
    popularRank: 1,
    content: [
      [
        "Kolaborasi bersama mitra industri menghadirkan pengalaman belajar yang lebih dekat dengan kebutuhan lapangan. Siswa mendapat kesempatan mengenal alur kerja, standar keselamatan, dan teknologi yang digunakan saat ini.",
        "Program ini melibatkan sesi praktisi mengajar, kunjungan industri, serta penyelarasan materi pembelajaran bersama guru produktif.",
      ],
      [
        "Melalui kerja sama yang berkelanjutan, sekolah menargetkan peningkatan kompetensi teknis sekaligus kemampuan komunikasi dan adaptasi peserta didik.",
        "Evaluasi program akan dilakukan secara berkala agar kegiatan berikutnya tetap relevan bagi siswa, sekolah, dan mitra industri.",
      ],
    ],
  },
  {
    id: 3,
    title: "Semangat Baru Menyambut Tahun Ajaran 2026/2027",
    excerpt:
      "Rangkaian kegiatan awal tahun membantu siswa mengenal budaya sekolah yang aman, kreatif, dan kolaboratif.",
    date: "12 Agustus 2026",
    category: "Kesiswaan",
    image: "/banner.jpeg",
    popularRank: 3,
    content: [
      [
        "Tahun ajaran baru dibuka dengan rangkaian kegiatan pengenalan lingkungan sekolah yang aman dan ramah. Siswa baru diajak memahami budaya belajar, fasilitas, serta layanan pendampingan yang tersedia.",
        "Kegiatan disusun secara kolaboratif oleh guru dan pengurus siswa dengan menempatkan interaksi positif sebagai fokus utama.",
      ],
      [
        "Setelah masa pengenalan selesai, siswa akan mengikuti agenda penguatan karakter dan pemetaan minat agar proses adaptasi berjalan lebih terarah.",
        "Sekolah berharap setiap siswa dapat bertumbuh dalam lingkungan yang menghargai kreativitas, kedisiplinan, dan kerja sama.",
      ],
    ],
  },
  {
    id: 4,
    title: "Pembukaan MPLS Ramah Dorong Adaptasi Siswa Baru",
    excerpt:
      "Kegiatan pengenalan lingkungan sekolah disusun lebih interaktif agar siswa baru nyaman mengenal budaya belajar.",
    date: "10 Agustus 2026",
    category: "Berita Sekolah",
    image: "/banner.jpeg",
    popularRank: 6,
    content: [
      [
        "MPLS tahun ini menekankan suasana ramah dan kolaboratif. Siswa baru diajak mengenal ruang belajar, layanan sekolah, serta kegiatan ekstrakurikuler melalui sesi singkat yang mudah diikuti.",
        "Panitia juga menghadirkan mentor dari kakak kelas untuk membantu proses adaptasi berjalan lebih dekat dan menyenangkan.",
      ],
      [
        "Sekolah berharap kegiatan awal ini menjadi fondasi yang baik bagi siswa untuk membangun relasi positif dan motivasi belajar sejak hari pertama.",
      ],
    ],
  },
  {
    id: 5,
    title: "Workshop Guru Perkuat Pembelajaran Berbasis Proyek",
    excerpt:
      "Guru produktif dan normatif mengikuti lokakarya untuk menyusun proyek lintas mata pelajaran yang relevan.",
    date: "8 Agustus 2026",
    category: "Sekolah",
    image: "/banner.jpeg",
    popularRank: 5,
    content: [
      [
        "Workshop difokuskan pada penyusunan aktivitas belajar yang menghubungkan kompetensi akademik dengan tantangan nyata di sekitar siswa.",
        "Setiap kelompok guru merancang rubrik, alur asesmen, dan rencana publikasi karya agar proses belajar lebih terukur.",
      ],
      [
        "Hasil lokakarya akan diujicobakan secara bertahap pada beberapa kelas sebelum diterapkan lebih luas pada semester berjalan.",
      ],
    ],
  },
  {
    id: 6,
    title: "Tim Ekstrakurikuler Siapkan Agenda Prestasi Semester Baru",
    excerpt:
      "Pembina dan pengurus ekstrakurikuler menyusun kalender kegiatan untuk memperluas ruang minat siswa.",
    date: "5 Agustus 2026",
    category: "Kesiswaan",
    image: "/banner.jpeg",
    popularRank: 4,
    content: [
      [
        "Agenda ekstrakurikuler dirancang agar siswa memiliki ruang eksplorasi yang seimbang antara akademik, seni, olahraga, dan kepemimpinan.",
        "Setiap kegiatan akan didampingi pembina agar latihan dan target lomba berjalan aman serta terarah.",
      ],
      [
        "Sekolah juga membuka sesi pengenalan bagi siswa baru agar mereka dapat memilih kegiatan sesuai minat dan potensi masing-masing.",
      ],
    ],
  },
  {
    id: 7,
    title: "Program Literasi Digital Ajak Siswa Bijak Bermedia",
    excerpt:
      "Siswa mengikuti sesi literasi digital mengenai keamanan akun, etika komunikasi, dan jejak digital.",
    date: "2 Agustus 2026",
    category: "Kesiswaan",
    image: "/banner.jpeg",
    popularRank: 7,
    content: [
      [
        "Literasi digital menjadi bagian penting dari pembinaan karakter siswa. Materi mencakup cara mengelola identitas digital, mengenali informasi palsu, dan menjaga keamanan data pribadi.",
        "Kegiatan dikemas dengan studi kasus agar siswa dapat memahami dampak keputusan mereka di ruang digital.",
      ],
      [
        "Sekolah akan melanjutkan program ini melalui kampanye kelas dan pendampingan wali kelas secara berkala.",
      ],
    ],
  },
  {
    id: 8,
    title: "Kunjungan Industri Bantu Siswa Mengenal Standar Kerja",
    excerpt:
      "Peserta didik memperoleh gambaran langsung mengenai proses produksi, budaya kerja, dan kebutuhan kompetensi industri.",
    date: "29 Juli 2026",
    category: "Kerjasama",
    image: "/banner.jpeg",
    popularRank: 8,
    content: [
      [
        "Kunjungan industri memberikan pengalaman nyata tentang alur kerja profesional. Siswa melihat bagaimana standar kualitas, keselamatan, dan komunikasi diterapkan setiap hari.",
        "Guru pendamping mengaitkan temuan lapangan dengan materi pembelajaran agar siswa memahami hubungan teori dan praktik.",
      ],
      [
        "Hasil kunjungan akan menjadi bahan refleksi kelas sekaligus masukan bagi penguatan program keahlian.",
      ],
    ],
  },
  {
    id: 9,
    title: "Alumni Berbagi Strategi Karier di Dunia Profesional",
    excerpt:
      "Sesi alumni mengangkat pengalaman transisi dari sekolah ke dunia kerja dan pendidikan lanjutan.",
    date: "26 Juli 2026",
    category: "Alumni",
    image: "/banner.jpeg",
    popularRank: 9,
    content: [
      [
        "Alumni hadir untuk berbagi pengalaman membangun portofolio, mengikuti seleksi kerja, dan menjaga konsistensi belajar setelah lulus.",
        "Siswa diberi kesempatan bertanya langsung tentang tantangan awal memasuki lingkungan profesional.",
      ],
      [
        "Kegiatan ini diharapkan memperkuat jejaring alumni sekaligus memberi inspirasi praktis bagi siswa tingkat akhir.",
      ],
    ],
  },
];

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Extract ID from slug
  const newsId = extractIdFromSlug(slug);

  if (!newsId) {
    notFound();
  }

  // Find news item by ID
  const news = NEWS_ITEMS.find((item) => item.id === newsId);

  if (!news) {
    notFound();
  }

  // Get related news (same category, exclude current, max 4)
  const relatedNews = NEWS_ITEMS.filter(
    (item) => item.category === news.category && item.id !== news.id
  ).slice(0, 4);

  // If not enough related news, fill with latest news
  if (relatedNews.length < 4) {
    const additionalNews = NEWS_ITEMS.filter(
      (item) => item.id !== news.id && !relatedNews.includes(item)
    ).slice(0, 4 - relatedNews.length);
    relatedNews.push(...additionalNews);
  }

  return <BeritaDetailClient news={news} relatedNews={relatedNews} />;
}
