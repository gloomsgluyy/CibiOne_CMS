"use client";

import { useState } from "react";

export function ContactFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Terima kasih! Pesan Anda telah dikirim.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <footer className="contact-enter sm:px-6 md:px-10 md:pt-20 md:pb-20 w-full max-w-7xl mr-auto ml-auto pt-12 pr-4 pb-10 pl-4">
      <div className="contact-card-enter relative overflow-hidden bg-white backdrop-blur-xl rounded-3xl border border-gray-200 shadow-2xl">
          <div className="relative z-10 sm:p-12 md:p-16 pt-12 pr-8 pb-8 pl-8">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo smkn 1 cibinong.png" 
                alt="Logo SMKN 1 Cibinong" 
                className="w-[80px] h-[80px] object-contain"
              />
              <div>
                <h3 className="text-gray-900 font-bold text-xl">SMKN 1 Cibinong</h3>
                <p className="text-gray-600 text-sm">Sekolah Menengah Kejuruan Negeri</p>
              </div>
            </div>
            <p className="text-gray-700 text-justify mb-6">
              SMK Negeri 1 Cibinong adalah lembaga pendidikan kejuruan yang berfokus pada pengembangan kompetensi siswa di bidang teknologi dan industri, 
              mempersiapkan lulusan yang siap kerja dan berdaya saing tinggi.
            </p>
            
            <div id="contact" className="rounded-2xl bg-white backdrop-blur-md shadow-2xl p-5 sm:p-6 md:p-8 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-600 ring-1 ring-blue-200 px-2.5 py-1 text-xs font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                      Siap Melayani
                    </div>
                    <h4 className="text-blue-900 font-medium tracking-tight text-lg">
                      Hubungi Kami
                    </h4>
                    
                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <div>
                          <p className="font-medium text-blue-900">Alamat</p>
                          <p className="text-gray-600">Jl. Raya Karadenan No.7, Karadenan, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16111</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <div>
                          <p className="font-medium text-blue-900">Telepon</p>
                          <a href="tel:+622518663846" className="text-blue-600 hover:text-blue-700 transition">(+62) 2518663 846</a>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0">
                          <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        </svg>
                        <div>
                          <p className="font-medium text-blue-900">Email</p>
                          <a href="mailto:smkn1cibinongbgr@gmail.com" className="text-blue-600 hover:text-blue-700 transition break-all">smkn1cibinongbgr@gmail.com</a>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-blue-900 text-xs font-medium mb-2">Media Sosial</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <a 
                          href="https://web.facebook.com/smknegeri1cibinong" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-100 transition"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                        <a 
                          href="https://twitter.com/smkn1cbn" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="Twitter"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-100 transition"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                        </a>
                        <a 
                          href="https://www.youtube.com/c/SMKN1Cibinong_Official" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="YouTube"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-100 transition"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </a>
                        <a 
                          href="https://www.instagram.com/smkn1cbn_official/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-100 transition"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-1">
                      <label htmlFor="name" className="block text-xs font-medium text-blue-900 mb-1">
                        Nama Lengkap
                      </label>
                      <input 
                        id="name" 
                        name="name" 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama Anda" 
                        className="w-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm text-gray-900 bg-gray-50 border-gray-200 border rounded-xl pt-2.5 pr-3 pb-2.5 pl-3"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label htmlFor="email" className="block text-xs font-medium text-blue-900 mb-1">
                        Email
                      </label>
                      <input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@example.com" 
                        className="w-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm text-gray-900 bg-gray-50 border-gray-200 border rounded-xl pt-2.5 pr-3 pb-2.5 pl-3"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="subject" className="block text-xs font-medium text-blue-900 mb-1">
                        Perihal
                      </label>
                      <select 
                        id="subject" 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm text-gray-900 bg-gray-50 border-gray-200 border rounded-xl pt-2.5 pr-3 pb-2.5 pl-3"
                      >
                        <option value="">Pilih perihal</option>
                        <option value="informasi-pendaftaran">Informasi Pendaftaran</option>
                        <option value="informasi-jurusan">Informasi Jurusan</option>
                        <option value="kerjasama">Kerja Sama</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-xs font-medium text-blue-900 mb-1">
                        Pesan
                      </label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4} 
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tulis pesan Anda di sini..." 
                        className="w-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm text-gray-900 bg-gray-50 border-gray-200 border rounded-xl pt-2.5 pr-3 pb-2.5 pl-3"
                      ></textarea>
                    </div>
                    <div className="sm:col-span-2 flex items-center justify-end">
                      <button 
                        type="submit" 
                        className="inline-flex gap-2 ring-1 ring-blue-600 hover:bg-blue-700 transition text-sm font-medium text-white bg-blue-600 rounded-xl pt-2.5 pr-4 pb-2.5 pl-4 shadow-lg items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                          <path d="m21.854 2.147-10.94 10.939"></path>
                        </svg>
                        Kirim Pesan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-gray-200 px-12 sm:px-14 md:px-16">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                <div>
              <h4 className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-3">
                Profil
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/profil-sekolah" className="text-gray-700 hover:text-gray-900 transition">
                    Sejarah
                  </a>
                </li>
                <li>
                  <a href="/profil-sekolah#visi-misi" className="text-gray-700 hover:text-gray-900 transition">
                    Visi & Misi
                  </a>
                </li>
                <li>
                  <a href="/profil-sekolah#struktur" className="text-gray-700 hover:text-gray-900 transition">
                    Struktur Organisasi
                  </a>
                </li>
                <li>
                  <a href="/profil-sekolah#guru" className="text-gray-700 hover:text-gray-900 transition">
                    Guru & Staff
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-3">
                Kompetensi
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/kompetensi-keahlian" className="text-gray-700 hover:text-gray-900 transition">
                    SIJA
                  </a>
                </li>
                <li>
                  <a href="/kompetensi-keahlian" className="text-gray-700 hover:text-gray-900 transition">
                    TKJ
                  </a>
                </li>
                <li>
                  <a href="/kompetensi-keahlian" className="text-gray-700 hover:text-gray-900 transition">
                    RPL
                  </a>
                </li>
                <li>
                  <a href="/kompetensi-keahlian" className="text-gray-700 hover:text-gray-900 transition">
                    MM
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-500 text-xs uppercase tracking-[0.2em] mb-3">
                Informasi
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/berita" className="text-gray-700 hover:text-gray-900 transition">
                    Berita
                  </a>
                </li>
                <li>
                  <a href="/berita#pengumuman" className="text-gray-700 hover:text-gray-900 transition">
                    Pengumuman
                  </a>
                </li>
                <li>
                  <a href="/berita#prestasi" className="text-gray-700 hover:text-gray-900 transition">
                    Prestasi
                  </a>
                </li>
                <li>
                  <a href="/berita#agenda" className="text-gray-700 hover:text-gray-900 transition">
                    Agenda
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="uppercase text-xs text-gray-500 tracking-[0.2em] mb-3">
                Berlangganan
              </h4>
              <p className="text-xs text-gray-600 mb-3">
                Dapatkan info terbaru dari SMKN 1 Cibinong
              </p>
              <form className="flex flex-col gap-2">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  </svg>
                  <input 
                    type="email" 
                    name="subscribeEmail" 
                    required 
                    placeholder="email@example.com" 
                    className="w-full placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-xs text-gray-900 bg-gray-50 border-gray-300 border rounded-xl pt-2.5 pr-3 pb-2.5 pl-9"
                  />
                </div>
                <button 
                  type="submit" 
                  className="inline-flex gap-2 ring-1 ring-blue-600 hover:bg-blue-700 transition text-xs font-medium text-white bg-blue-600 rounded-xl pt-2.5 pr-3.5 pb-2.5 pl-3.5 items-center justify-center"
                >
                  Berlangganan
                </button>
              </form>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200 px-12 sm:px-14 md:px-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-gray-600 text-sm">
              © 2026 SMKN 1 Cibinong. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-gray-600 text-sm">
              <a href="#" className="hover:text-gray-900 transition">
                Kebijakan Privasi
              </a>
              <span className="hidden sm:block text-gray-300">•</span>
              <a href="#" className="hover:text-gray-900 transition">
                Syarat & Ketentuan
              </a>
              <span className="hidden sm:block text-gray-300">•</span>
              <a href="#top" className="hover:text-gray-900 transition inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="m5 12 7-7 7 7"></path>
                  <path d="M12 19V5"></path>
                </svg>
                Kembali ke atas
              </a>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-10 h-72 w-72 rounded-full bg-gray-200/30 blur-3xl"></div>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-10 h-80 w-80 rounded-full bg-gray-300/30 blur-3xl"></div>
      </div>
    </footer>
  );
}
