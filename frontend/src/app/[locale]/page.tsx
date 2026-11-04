import { Navbar } from "@/components/layout/navbar";
import { ScrollVideoBackground } from "@/components/layout/scroll-video-background";
import { Hero } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { FromInputToCampaign } from "@/components/sections/from-input-to-campaign";
import { FromConstructionToVisualExperience } from "@/components/sections/from-construction-to-visual-experience";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SelectedWorks2 } from "@/components/sections/selected-works-2";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { OurProcessSection } from "@/components/sections/our-process-section";
import { AboutSection } from "@/components/sections/about-section";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: `https://www.vistateam.tech/${locale}`,
      siteName: "Vista",
      locale,
    },
  };
}

// export const instant = false;

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vista",
    url: "https://vistateam.tech",
    description: t("description"),
    knowsAbout: t.raw("services") as string[],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ScrollVideoBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <ServicesSection />
          <FromInputToCampaign />
          <FromConstructionToVisualExperience />
          <SelectedWorks2 />
          {/* <ProjectsSection /> */}
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
