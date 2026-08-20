import { AchievementHighlight } from "@/components/sections/achievement-highlight";
import { HeroBanner } from "@/components/sections/hero-banner";
import { PrincipalGreeting } from "@/components/sections/principal-greeting";
import { SchoolQuote } from "@/components/sections/school-quote";
import { NewsShowcase } from "@/components/sections/news-showcase";
import { AnnouncementBoard } from "@/components/sections/announcement-board";
import { SchoolEvents } from "@/components/sections/school-events";
import { SchoolProfileVideo } from "@/components/sections/school-profile-video";
import { IndustryPartners } from "@/components/sections/industry-partners";
import { FeaturedPrograms } from "@/components/sections/featured-programs";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <PrincipalGreeting />
      <SchoolQuote />
      <AchievementHighlight />
      <IndustryPartners />
      <FeaturedPrograms />
      <NewsShowcase />
      <AnnouncementBoard />
      <SchoolEvents />
      <SchoolProfileVideo />
    </main>
  );
}
