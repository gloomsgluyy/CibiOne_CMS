"use client";

import { TextAnimate } from "@/components/ui/text-animate";
import { AnimatePresence, motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Profil", href: "/profil-sekolah" },
  { label: "Jurusan", href: "/kompetensi-keahlian" },
  { label: "Berita", href: "/berita" },
  { label: "Kontak", href: "/kontak" },
];

const welcomeTexts = ["WELCOME TO", "SELAMAT DATANG DI", "WILUJENG SUMPING DI"];

export function HeroBanner() {
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [subtitleReady, setSubtitleReady] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(720);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroInset = useTransform(scrollYProgress, [0, 0.88], [16, 0]);
  // ponytail: desktop navbar height assumes 72px; derive it from measured nav height if it becomes configurable.
  const heroBottomInset = useTransform(scrollYProgress, [0, 0.88], [16, viewportHeight - 72]);
  const heroRadius = useTransform(scrollYProgress, [0, 0.88], [48, 0]);
  const heroClip = useMotionTemplate`inset(${heroInset}px ${heroInset}px ${heroBottomInset}px ${heroInset}px round ${heroRadius}px)`;
  const navPaddingY = useTransform(scrollYProgress, [0, 0.88], [28, 12]);
  const navTopOpacity = useTransform(scrollY, [viewportHeight * 0.7, viewportHeight * 1.05], [0, 0.9]);
  const navBottomOpacity = useTransform(scrollY, [viewportHeight * 0.7, viewportHeight * 1.05], [0, 0.72]);
  const navBlur = useTransform(scrollY, [viewportHeight * 0.95, viewportHeight * 1.05], [0, 16]);
  const navBackground = useMotionTemplate`linear-gradient(to bottom, rgba(0, 54, 171, ${navTopOpacity}), rgba(0, 54, 171, ${navBottomOpacity}))`;
  const navBackdropFilter = useMotionTemplate`blur(${navBlur}px)`;
  const contentOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setWelcomeIndex((current) => (current + 1) % welcomeTexts.length);
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [welcomeIndex]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setSubtitleReady(true), 1150);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const updateViewportHeight = () => setViewportHeight(window.innerHeight);

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);

    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  return (
    <section id="home-hero" ref={heroRef} className="relative h-[135svh] bg-white">
      <motion.header
        className="fixed inset-x-0 top-0 z-50 text-white"
        style={{
          paddingTop: navPaddingY,
          paddingBottom: navPaddingY,
          background: navBackground,
          backdropFilter: navBackdropFilter,
          WebkitBackdropFilter: navBackdropFilter,
        }}
      >
        <div className="px-10 md:px-14"><HeroNav /></div>
      </motion.header>

      <div className="fixed inset-0 z-0 overflow-hidden bg-white">
        <motion.div
          className="relative h-screen w-full transform-gpu overflow-hidden will-change-[clip-path]"
          style={{ clipPath: heroClip }}
        >
          <Image
            src="/smkn-hero-banner.png"
            alt="Gedung SMKN 1 Cibinong"
            fill
            priority
            fetchPriority="high"
            quality={55}
            sizes="100vw"
            className="object-cover brightness-60"
          />
          <div className="absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-[#0036ab]/45 to-transparent" />
          <motion.div
            className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.24)_34%,rgba(0,0,0,0.08)_62%,transparent_100%)]"
          />
          <motion.div
            className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center px-6 text-center text-white md:px-16 lg:px-20"
            style={{ opacity: contentOpacity }}
          >
            <h1 className="relative flex min-h-[1.1em] w-full justify-center overflow-hidden px-1 py-2 text-[clamp(1.75rem,8.2vw,6.6rem)] font-medium leading-none tracking-[-0.06em] drop-shadow-[0_8px_38px_rgba(0,0,0,0.9)] sm:text-[clamp(2.8rem,8.2vw,6.6rem)]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={welcomeTexts[welcomeIndex]}
                  initial={{ opacity: 0, y: 90 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -90 }}
                  transition={{ type: "spring", stiffness: 70, damping: 16 }}
                  className="absolute whitespace-nowrap"
                >
                  {welcomeTexts[welcomeIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="invisible whitespace-nowrap" aria-hidden="true">
                WILUJENG SUMPING DI
              </span>
            </h1>
            <TextAnimate
              text="SMKN 1 CIBINONG"
              type="whipInUp"
              delay={0.08}
              className="px-1 py-2 text-[clamp(2.8rem,8.2vw,6.6rem)] font-medium leading-none tracking-[-0.06em] drop-shadow-[0_8px_38px_rgba(0,0,0,0.9)]"
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: subtitleReady ? 1 : 0, y: subtitleReady ? 0 : 20 }}
              transition={{ duration: 0.45 }}
              className="mt-6 max-w-5xl rounded-full bg-black/35 px-6 py-3 text-balance text-center text-base font-normal leading-snug tracking-[-0.02em] text-white/95 shadow-[0_12px_40px_rgba(0,0,0,0.35)] md:text-2xl"
            >
              Selamat datang di Web SMKN 1 CIBINONG, temukan segala informasi
              dan update terbaru tentang kegiatan di SMKN 1 CIBINONG
            </motion.h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroNav() {
  return (
    <nav className="flex items-center justify-between gap-6">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/cropped-logo-SMKN-1-Cbn.png"
          alt="Logo SMKN 1 Cibinong"
          width={48}
          height={48}
          priority
          className="h-10 w-10 object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)] md:h-12 md:w-12"
        />
        <span className="hidden text-sm font-medium tracking-[-0.02em] text-white/95 md:block">
          SMKN 1 CIBINONG
        </span>
      </Link>
      <div className="hidden items-center gap-8 text-sm text-white/75 md:flex">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-white">
            {item.label}
          </Link>
        ))}
      </div>
      <Link
        href="/kontak"
        className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition hover:bg-white/90"
      >
        Hubungi
      </Link>
    </nav>
  );
}
