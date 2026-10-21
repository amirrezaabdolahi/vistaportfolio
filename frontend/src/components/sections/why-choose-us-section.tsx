"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  Layers3,
  Target,
  TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

const reasons = [
  { id: "strategy", number: "01", Icon: Target },
  { id: "designEngineering", number: "02", Icon: Layers3 },
  { id: "purposefulAI", number: "03", Icon: BrainCircuit },
  { id: "growth", number: "04", Icon: TrendingUp },
] as const;

export function WhyChooseUsSection() {
  const t = useTranslations("WhyChooseUs");
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="why-vista-heading"
      className="scroll-mt-24 overflow-hidden bg-neutral-50/75 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16"
        >
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
              {t("eyebrow")}
            </p>
            <h2
              id="why-vista-heading"
              className="max-w-3xl text-balance text-4xl font-medium leading-[1.12] tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-6xl"
            >
              {t("title")}
            </h2>
          </div>

          <p className="max-w-xl text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9 lg:justify-self-end lg:pb-1">
            {t("description")}
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:mt-20 md:grid-cols-2">
          {reasons.map(({ id, number, Icon }, index) => (
            <motion.article
              key={id}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: "easeOut",
              }}
              className={[
                "group relative min-w-0 border-t border-black/10 py-7 sm:py-8 lg:py-10",
                index % 2 === 0 ? "md:pe-8 lg:pe-12" : "md:ps-8 lg:ps-12",
                index >= 2 ? "md:border-t" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-5">
                <span className="pt-1 text-xs font-medium tabular-nums tracking-[0.14em] text-neutral-400">
                  {number}
                </span>
                <span className="inline-flex size-10 shrink-0 items-center justify-center text-neutral-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-neutral-950 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                  <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
                </span>
              </div>

              <h3 className="mt-6 max-w-md text-pretty text-2xl font-medium tracking-[-0.04em] text-neutral-950 sm:text-3xl">
                {t(`reasons.${id}.title`)}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
                {t(`reasons.${id}.description`)}
              </p>
              <span
                aria-hidden="true"
                className="mt-6 block h-px w-0 bg-neutral-900 transition-[width] duration-300 group-hover:w-12 motion-reduce:transition-none"
              />
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-black/10 pt-8 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:pt-10">
          <h3 className="text-balance text-2xl font-medium tracking-[-0.045em] text-neutral-950 sm:text-3xl">
            {t("closing")}
          </h3>
          <Link
            href="#contact"
            className="group inline-flex min-h-11 w-fit items-center gap-2 border-b border-neutral-400 pb-1 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 motion-reduce:transition-none"
          >
            {t("cta")}
            <ArrowUpRight
              aria-hidden="true"
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
