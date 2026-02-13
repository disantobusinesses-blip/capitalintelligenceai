import Hero from "@/components/Hero";
import TierCards from "@/components/TierCards";
import AboutSection from "@/components/AboutSection";
import ProjectsPreview from "@/components/ProjectsPreview";
import AddOnsSection from "@/components/AddOnsSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <TierCards />
      <AboutSection />
      <ProjectsPreview />
      <AddOnsSection />
      <CTASection />
    </>
  );
}
