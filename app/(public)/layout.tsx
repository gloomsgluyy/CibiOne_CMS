import AIChatLoader from "@/components/ui/ai-chat-loader";
import { SiteNavbar } from "@/components/ui/site-navbar";
import { PublicPageTransition } from "@/components/ui/public-page-transition";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteNavbar />
      <PublicPageTransition>{children}</PublicPageTransition>
      <AIChatLoader />
    </>
  );
}
