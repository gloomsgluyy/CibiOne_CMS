import AIChatLoader from "@/components/ui/ai-chat-loader";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <AIChatLoader />
    </>
  );
}
