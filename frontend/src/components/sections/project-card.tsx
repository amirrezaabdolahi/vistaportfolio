"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

type ProjectCategory =
  | "webDevelopment"
  | "productDesign"
  | "uiUxDesign"
  | "aiAutomation";

type ProjectCardProps = {
  id: "saasDashboard" | "ecommercePlatform" | "aiAnalyticsPlatform" | "fintechWebApp";
  number: string;
  image: string;
  layout: "featured" | "supporting";
  categories: readonly ProjectCategory[];
  href?: string;
};

export function ProjectCard({
  id,
  number,
  image,
  layout,
  categories,
  href,
}: ProjectCardProps) {
  const t = useTranslations("Projects");
  const servicesT = useTranslations("Services");
  const shouldReduceMotion = useReducedMotion();
  const featured = layout === "featured";
  const title = t(`${id}.title`);
  const imageSizes = featured
    ? "(min-width: 1280px) 86vw, (min-width: 768px) 88vw, 100vw"
    : "(min-width: 1280px) 42vw, (min-width: 768px) 43vw, 100vw";

  const imageContent = (
    <div
      className={`relative overflow-hidden rounded-xl border border-black/[0.06] bg-neutral-100 ${featured ? "aspect-[1.55/1] sm:aspect-[1.9/1] lg:aspect-[2.15/1]" : "aspect-[1.15/1] sm:aspect-[1.3/1]"}`}
    >
      <Image
        src={image}
        alt={t(`${id}.imageAlt`)}
        fill
        sizes={imageSizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </div>
  );

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`group min-w-0 ${featured ? "md:col-span-2" : ""}`}
    >
      {href ? (
        <a
          href={href}
          className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
          aria-label={t("openProject", { project: title })}
        >
          {imageContent}
        </a>
      ) : (
        imageContent
      )}

      <div className="pt-5 sm:pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-3 text-xs font-medium tabular-nums tracking-[0.14em] text-neutral-400">
              {number}
            </p>
            <h3 className={`text-pretty font-medium tracking-[-0.045em] text-neutral-950 ${featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"}`}>
              {title}
            </h3>
          </div>

          <ArrowUpRight
            aria-hidden="true"
            size={featured ? 22 : 20}
            className="mt-7 shrink-0 text-neutral-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5 motion-reduce:transition-none"
          />
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
          {t(`${id}.description`)}
        </p>

        <ul
          aria-label={t("categoriesLabel")}
          className="mt-4 flex flex-wrap gap-x-2 gap-y-2 text-xs text-neutral-500 sm:text-sm"
        >
          {categories.map((category, index) => (
            <li key={category} className="inline-flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-neutral-300">
                  /
                </span>
              )}
              <span>
                {category === "productDesign"
                  ? t("categories.productDesign")
                  : servicesT(category === "webDevelopment"
                    ? "webDevelopment.title"
                    : category === "uiUxDesign"
                      ? "uiUxDesign.title"
                      : "aiAutomation.title")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
