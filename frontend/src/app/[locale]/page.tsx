import { Navbar } from "@/components/layout/navbar";
import { ScrollVideoBackground } from "@/components/layout/scroll-video-background";
import { Hero } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { OurProcessSection } from "@/components/sections/our-process-section";
import { AboutSection } from "@/components/sections/about-section";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { SiteFooter } from "@/components/layout/site-footer";

export const instant = false;

export default function Home() {
  return (
    <>
      <ScrollVideoBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <ServicesSection />
          <ProjectsSection />
          <WhyChooseUsSection />
          <OurProcessSection />
          <AboutSection />
          <FAQSection />
          <ContactSection />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
