import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CibiOne CMS",
  description: "CMS SMKN 1 Cibinong untuk JHIC 2026",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
