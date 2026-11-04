"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

// Add the single before/after image URL here when it is ready.
const transformationImageUrl = "/inputtocamin.webp";

export function FromInputToCampaign() {
  const t = useTranslations("FromInputToCampaign");
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="from-input-to-campaign"
      aria-labelledby="from-input-to-campaign-heading"
      className="overflow-hidden bg-neutral-950 py-24 text-white sm:py-28 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/75">
              <Sparkles aria-hidden="true" size={16} strokeWidth={1.5} />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55 sm:text-sm">
              {t("eyebrow")}
            </p>
          </div>

          <h2
            id="from-input-to-campaign-heading"
            className="text-balance text-4xl font-medium leading-[1.08] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl"
          >
            {t("title")}
          </h2>

          <p className="mt-6 max-w-lg text-base leading-8 text-white/65 sm:text-lg sm:leading-9">
            {t("description")}
          </p>

          <Link
            href="#contact"
            className="group mt-9 inline-flex min-h-11 items-center gap-2 border-b border-white/35 pb-1 text-sm font-medium text-white transition-colors hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 motion-reduce:transition-none"
          >
            {t("cta")}
            <ArrowUpRight
              aria-hidden="true"
              size={17}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-[2rem] border border-white/[0.08] sm:-inset-5" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/[0.06] sm:rounded-3xl">
            {transformationImageUrl ? (
              <Image
                src={transformationImageUrl}
                alt={t("imageAlt")}
                width={100}
                height={100}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover w-full h-full"
                priority={false}
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
                  {t("imagePlaceholder")}
                </span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/55 to-transparent p-5 sm:p-7">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/75">
                {t("visualLabel")}
              </span>
              <span className="text-xs tabular-nums text-white/55">
                01 / 01
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
