import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AOSInit } from "@/components/aos-init";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "CibiOne CMS",
  description: "CMS SMKN 1 Cibinong untuk JHIC 2026",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={poppins.variable}>
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
