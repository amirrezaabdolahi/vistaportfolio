import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { ProjectsSection } from "@/components/sections/projects-section";

export const instant = false;

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesSection />
      <ProjectsSection />
    </>
  );
}
