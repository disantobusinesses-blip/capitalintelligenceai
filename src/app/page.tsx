import HeroNew from "@/components/HeroNew";
import PackageSection from "@/components/PackageSection";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import AIChatDemo from "@/components/AIChatDemo";
import OnboardingSection from "@/components/OnboardingSection";

export default function Home() {
  return (
    <>
      <HeroNew />
      <PackageSection />
      <ProjectsCarousel />
      <AIChatDemo />
      <OnboardingSection />
    </>
  );
}
