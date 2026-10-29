import { useTranslations } from "next-intl";

import { ServiceCard } from "@/components/sections/service-card";

const services = [
  {
    id: "contentCreation",
    number: "06",
    image: "/services_pics/contentcreator.webp",
    layout: "horizontal",
  },
  {
    id: "webDevelopment",
    number: "01",
    image: "/services_pics/webdevelopment.webp",
    layout: "wide",
  },
  {
    id: "uiUxDesign",
    number: "02",
    image: "/services_pics/uiuxdesign.webp",
    layout: "narrow",
  },
  {
    id: "aiAutomation",
    number: "03",
    image: "/services_pics/ai&automations.webp",
    layout: "narrow",
  },
  {
    id: "seoMarketing",
    number: "04",
    image: "/services_pics/seo&marketing.jpg",
    layout: "wide",
  },
  {
    id: "itConsulting",
    number: "05",
    image: "/services_pics/itconsulting.webp",
    layout: "horizontal",
  },
] as const;

export function ServicesSection() {
  const t = useTranslations("Services");

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24  py-24 sm:py-28 lg:py-32 bg-white/45"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
              {t("eyebrow")}
            </p>

            <h2
              id="services-heading"
              className="max-w-2xl text-balance text-4xl font-medium leading-[1.12] tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-6xl"
            >
              {t("title")}
            </h2>
          </div>

          <p className="max-w-xl text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9 lg:justify-self-end lg:pb-1">
            {t("description")}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-14 xl:grid-cols-12 xl:gap-x-7 xl:gap-y-16">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              number={service.number}
              image={service.image}
              layout={service.layout}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
