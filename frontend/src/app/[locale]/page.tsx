import { Hero } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { OurProcessSection } from "@/components/sections/our-process-section";
import { Navbar } from "@/components/layout/navbar";

export const instant = false;

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <WhyChooseUsSection />
      <OurProcessSection />
    </>
  );
}
