"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

const principles = [
  { id: "thinkBeforeBuilding", number: "01" },
  { id: "makeComplexityUseful", number: "02" },
  { id: "designForWhatComesNext", number: "03" },
] as const;

export function AboutSection() {
  const t = useTranslations("About");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 overflow-hidden border-y border-black/[0.04] bg-white/80 py-24 backdrop-blur-[2px] sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Introduction */}
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
              {t("eyebrow")}
            </p>

            <h2
              id="about-heading"
              className="max-w-4xl text-balance text-4xl font-medium leading-[1.08] tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-7xl"
            >
              {t("title")}
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9 lg:justify-self-end lg:pb-2">
            {t("description")}
          </p>
        </div>

        {/* Philosophy */}
        <div className="mt-24 grid gap-10 border-t border-neutral-200 pt-8 sm:mt-28 sm:pt-10 lg:mt-36 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 sm:text-sm">
              {t("philosophyLabel")}
            </p>

            <h3 className="mt-4 max-w-md text-3xl font-medium leading-tight tracking-[-0.05em] text-neutral-950 sm:text-4xl">
              {t("philosophyTitle")}
            </h3>
          </div>

          <div className="divide-y divide-neutral-200 border-t border-neutral-200">
            {principles.map((principle) => (
              <article
                key={principle.id}
                className="grid gap-3 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-5 sm:py-7"
              >
                <p className="pt-1 text-xs font-medium tabular-nums tracking-[0.14em] text-neutral-400">
                  {principle.number}
                </p>

                <div>
                  <h4 className="text-lg font-medium tracking-[-0.03em] text-neutral-950 sm:text-xl">
                    {t(`principles.${principle.id}.title`)}
                  </h4>

                  <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
                    {t(`principles.${principle.id}.description`)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Our perspective */}
        <div className="mt-20 grid gap-6 border-y border-neutral-200 py-8 sm:mt-24 sm:py-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 sm:text-sm">
              {t("perspectiveLabel")}
            </p>

            <h3 className="mt-4 max-w-md text-3xl font-medium leading-tight tracking-[-0.05em] text-neutral-950 sm:text-4xl">
              {t("perspectiveTitle")}
            </h3>
          </div>

          <div className="max-w-3xl lg:pt-1">
            <p className="text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9">
              {t("perspectiveDescription")}
            </p>

            <div aria-hidden="true" className="mt-8 flex items-center gap-2">
              <span className="h-px w-12 bg-neutral-900" />
              <span className="h-px flex-1 bg-neutral-200" />
              <span className="size-1.5 rounded-full bg-neutral-900" />
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="grid gap-6 pt-16 sm:pt-20 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:pt-24">
          <div>
            <h3 className="max-w-3xl text-balance text-3xl font-medium leading-[1.12] tracking-[-0.05em] text-neutral-950 sm:text-4xl lg:text-5xl">
              {t("closingTitle")}
            </h3>

            <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9">
              {t("closingDescription")}
            </p>
          </div>

          <Link
            href="#contact"
            className="group inline-flex min-h-12 w-fit items-center justify-center gap-3 border-b border-neutral-900 pb-2 text-sm font-medium text-neutral-950 transition-colors duration-150 hover:border-neutral-400 hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 motion-reduce:transition-none lg:mb-1"
          >
            <span>{t("cta")}</span>

            <ArrowUpRight
              aria-hidden="true"
              size={17}
              strokeWidth={1.7}
              className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none rtl:group-hover:-translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
