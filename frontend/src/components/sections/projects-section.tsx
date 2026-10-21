import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { ProjectCard } from "@/components/sections/project-card";

const projects = [
  {
    id: "saasDashboard",
    number: "01",
    image: "/projects/saas-dashboard.webp",
    layout: "featured",
    categories: ["webDevelopment", "productDesign"],
  },
  {
    id: "ecommercePlatform",
    number: "02",
    image: "/projects/ecommerce-platform.webp",
    layout: "supporting",
    categories: ["uiUxDesign", "webDevelopment"],
  },
  {
    id: "aiAnalyticsPlatform",
    number: "03",
    image: "/projects/ai-analytics-platform.webp",
    layout: "supporting",
    categories: ["aiAutomation", "productDesign"],
  },
  {
    id: "fintechWebApp",
    number: "04",
    image: "/projects/fintech-web-app.webp",
    layout: "featured",
    categories: ["webDevelopment", "uiUxDesign"],
  },
] as const;

export function ProjectsSection() {
  const t = useTranslations("Projects");

  return (
    <section
      id="work"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 bg-white/65 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
              {t("eyebrow")}
            </p>
            <h2
              id="projects-heading"
              className="max-w-2xl text-balance text-4xl font-medium leading-[1.12] tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-6xl"
            >
              {t("title")}
            </h2>
          </div>

          <div className="lg:justify-self-end lg:pb-1">
            <p className="max-w-xl text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9">
              {t("description")}
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
              {t("count")}
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 md:mt-16 md:grid-cols-2 md:gap-y-16 xl:gap-x-7 xl:gap-y-20">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              number={project.number}
              image={project.image}
              layout={project.layout}
              categories={project.categories}
            />
          ))}
        </div>

        <div className="mt-20 border-t border-black/10 pt-10 sm:mt-24 sm:flex sm:items-end sm:justify-between sm:gap-10 sm:pt-12">
          <div className="max-w-2xl">
            <h3 className="text-balance text-3xl font-medium leading-tight tracking-[-0.05em] text-neutral-950 sm:text-4xl lg:text-5xl">
              {t("cta.title")}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-8 text-neutral-600">
              {t("cta.description")}
            </p>
          </div>

          <Link
            href="#contact"
            className="mt-7 inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full border border-neutral-900 bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 motion-reduce:transition-none sm:mt-0"
          >
            {t("cta.label")}
            <ArrowUpRight
              aria-hidden="true"
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:-scale-x-100 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
