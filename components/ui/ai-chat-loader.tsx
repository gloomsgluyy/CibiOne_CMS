"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AIChatCard = dynamic(() => import("./ai-chat-card"), { ssr: false });

export default function AIChatLoader() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home-hero");
    if (!hero) {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && entry.boundingClientRect.bottom <= 0) {
        setShouldLoad(true);
        observer.disconnect();
      }
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return shouldLoad ? <AIChatCard /> : null;
}
