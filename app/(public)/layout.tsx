import AIChatLoader from "@/components/ui/ai-chat-loader";
import { SiteNavbar } from "@/components/ui/site-navbar";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteNavbar />
      {children}
      <AIChatLoader />
    </>
  );
}
