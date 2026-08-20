# Reference — Blur Vignette Effect

Sumber: deskripsi/code reference yang dikirim PIC di chat untuk section Home / Hero Banner.

Deskripsi PIC:

import { BlurVignette, BlurVignetteArticle } from '@/components/ui/blur-vignette';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

function Blurvignettevideo() {
  return (
    <>
      <BlurVignette
        radius='24px'
        inset='10px'
        transitionLength='100px'
        blur='15px'
        classname='h-96 w-full overflow-hidden'
      >
        <video
          autoPlay={true}
          muted
          loop
          content='true'
          className='w-full  h-full object-cover  transition-all hover:scale-110'
        >
          <source
            src='https://cdn.pixabay.com/video/2023/10/19/185726-876210695_large.mp4'
            type='video/mp4'
          />
        </video>
        <BlurVignetteArticle />
      </BlurVignette>
    </>
  );
}

export default Blurvignettevideo;


Apple Vision Pro-inspired blur-sm vignette effect for creating visual overlays. Apply blur-sm effects to images, videos, cards, and UI elements. Features customizable intensity, smooth transitions, and modern glassmorphism design aesthetics.

Catatan pemakaian:

- Dipakai sebagai background treatment untuk foto dinamis Hero Banner.
- Implementasi wajib mengikuti konsep blur/vignette, bukan membuat overlay polos dari nol.
- Efek harus tetap menjaga keterbacaan teks.
- Mobile pakai versi statis, tanpa cursor reveal.

Code lengkap belum tersedia di chat transcript yang tersimpan di file ini. Jika PIC mengirim ulang full code, tambahkan ke file ini tanpa menghapus catatan lama.
