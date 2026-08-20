"use client";

import dynamic from "next/dynamic";
import { type ComponentType, useEffect, useRef, useState } from "react";

const VisiMisiSection = dynamic(
  () => import("./visi-misi-section").then((module) => module.VisiMisiSection),
  { ssr: false },
);
const GuruStaffSection = dynamic(
  () => import("./guru-staff-section").then((module) => module.GuruStaffSection),
  { ssr: false },
);
const SaranaPrasaranaSection = dynamic(
  () => import("./sarana-prasarana-section").then((module) => module.SaranaPrasaranaSection),
  { ssr: false },
);
const AkreditasiSection = dynamic(
  () => import("./akreditasi-section").then((module) => module.AkreditasiSection),
  { ssr: false },
);
const KerjaSamaIndustriSection = dynamic(
  () => import("./kerja-sama-industri-section").then((module) => module.KerjaSamaIndustriSection),
  { ssr: false },
);

function DeferredSection({ Component, rootMargin = "320px 0px" }: { Component: ComponentType; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="profile-deferred-section">{isVisible && <Component />}</div>;
}

export function ProfileSections() {
  return (
    <>
      <DeferredSection Component={VisiMisiSection} rootMargin="700px 0px" />
      <DeferredSection Component={GuruStaffSection} />
      <DeferredSection Component={SaranaPrasaranaSection} />
      <DeferredSection Component={AkreditasiSection} />
      <DeferredSection Component={KerjaSamaIndustriSection} />
    </>
  );
}
