"use client";

import { usePathname } from "next/navigation";

export function PublicPageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="public-page-enter">
      {children}
    </div>
  );
}
