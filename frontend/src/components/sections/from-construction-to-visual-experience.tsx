"use client";

import Image from "next/image";
import {
  Box,
  Building2,
  Clapperboard,
  Video,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

// Insert the supplied image path here. Keep this as the section's only image.
const constructionShowcaseImage = "";

const capabilities = [
  { id: "architecturalRenders", number: "01", Icon: Building2 },
  { id: "threeDVisualization", number: "02", Icon: Box },
  { id: "threeDAnimations", number: "03", Icon: Video },
  { id: "cinematicVideos", number: "04", Icon: Clapperboard },
] as const;

export function FromConstructionToVisualExperience() {
  const t = useTranslations("FromConstructionToVisualExperience");
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="architectural-visualization"
      aria-labelledby="construction-visual-experience-heading"
      className="overflow-hidden bg-white/65 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16"
        >
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
              {t("eyebrow")}
            </p>
            <h2
              id="construction-visual-experience-heading"
              className="max-w-3xl text-balance text-4xl font-medium leading-[1.1] tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-6xl"
            >
              {t("title")}
            </h2>
          </div>

          <p className="max-w-xl text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9 lg:justify-self-end lg:pb-1">
            {t("description")}
          </p>
        </motion.header>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative mt-12 overflow-hidden rounded-2xl bg-neutral-100 sm:mt-16 sm:rounded-3xl"
        >
          <div className="relative aspect-[16/10] w-full sm:aspect-[16/8.5] lg:aspect-[16/7.5]">
            {constructionShowcaseImage ? (
              <Image
                src={constructionShowcaseImage}
                alt={t("imageAlt")}
                fill
                sizes="(min-width: 1440px) 1344px, calc(100vw - 40px)"
                className="object-contain"
                priority={false}
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="px-6 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400 sm:text-xs">
                  {t("imagePlaceholder")}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {capabilities.map(({ id, number, Icon }, index) => (
            <motion.article
              key={id}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : index * 0.07,
                ease: "easeOut",
              }}
              className={[
                "min-w-0 border-t border-black/10 py-6 sm:py-7 lg:py-8",
                index % 2 === 0 ? "sm:pe-7 lg:pe-6" : "sm:ps-7 lg:ps-6",
                index >= 2 ? "lg:border-s lg:ps-6" : "",
                index === 0 || index === 2 ? "lg:ps-0" : "",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium tabular-nums tracking-[0.14em] text-neutral-400">
                  {number}
                </span>
                <Icon
                  aria-hidden="true"
                  size={21}
                  strokeWidth={1.5}
                  className="shrink-0 text-neutral-500"
                />
              </div>

              <h3 className="mt-6 text-pretty text-xl font-medium tracking-[-0.04em] text-neutral-950 sm:text-2xl">
                {t(`services.${id}.title`)}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-600 sm:text-[15px] sm:leading-8">
                {t(`services.${id}.description`)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
