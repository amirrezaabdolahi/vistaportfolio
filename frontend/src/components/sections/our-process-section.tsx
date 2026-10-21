"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Code2, PenTool, Rocket, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

const stages = [
  { id: "discover", number: "01", Icon: Search },
  { id: "strategizeDesign", number: "02", Icon: PenTool },
  { id: "buildValidate", number: "03", Icon: Code2 },
  { id: "launchImprove", number: "04", Icon: Rocket },
] as const;

type StageId = (typeof stages)[number]["id"];

function ProcessStage({
  id,
  number,
  Icon,
}: {
  id: StageId;
  number: string;
  Icon: (typeof stages)[number]["Icon"];
}) {
  const t = useTranslations("OurProcess");
  const stageRef = useRef<HTMLElement>(null);
  const isActive = useInView(stageRef, { amount: 0.35, once: false });
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      ref={stageRef}
      initial={reduceMotion ? false : { opacity: 0.45, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 pb-10 last:pb-0 md:block md:pb-0"
    >
      <div className="relative z-10 flex justify-center md:mb-5 md:justify-start">
        <span
          className={[
            "flex size-10 items-center justify-center rounded-full border bg-white transition-colors duration-300 motion-reduce:transition-none",
            isActive
              ? "border-neutral-900 text-neutral-950"
              : "border-neutral-200 text-neutral-400",
          ].join(" ")}
          aria-hidden="true"
        >
          <Icon size={17} strokeWidth={1.6} />
        </span>
      </div>

      <div className="min-w-0 md:pt-0">
        <p
          className={[
            "mb-3 text-xs font-semibold tabular-nums tracking-[0.16em] transition-colors duration-300 motion-reduce:transition-none",
            isActive ? "text-neutral-900" : "text-neutral-400",
          ].join(" ")}
        >
          {number} <span className="ms-2 font-normal tracking-[0.12em]">{t("stageLabel")}</span>
        </p>

        <h3 className="text-pretty text-xl font-medium tracking-[-0.04em] text-neutral-950 sm:text-2xl">
          {t(`stages.${id}.title`)}
        </h3>
        <p className="mt-3 text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
          {t(`stages.${id}.description`)}
        </p>

        <ul className="mt-4 space-y-2.5">
          {[0, 1, 2].map((index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-sm leading-6 text-neutral-500"
            >
              <span
                aria-hidden="true"
                className="mt-[0.62rem] size-1 shrink-0 rounded-full bg-neutral-300"
              />
              <span>{t(`stages.${id}.details.${index}`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function OurProcessSection() {
  const t = useTranslations("OurProcess");
  const locale = useLocale();
  const isRtl = locale === "fa";
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.78", "end 0.72"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.25,
  });

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="our-process-heading"
      className="scroll-mt-24 overflow-hidden bg-white/65 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid gap-7 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16"
        >
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 sm:text-sm">
                {t("eyebrow")}
              </p>
              <span aria-hidden="true" className="h-px w-8 bg-neutral-300" />
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400 sm:text-sm">
                {t("supportingLabel")}
              </p>
            </div>
            <h2
              id="our-process-heading"
              className="max-w-3xl text-balance text-4xl font-medium leading-[1.12] tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-6xl"
            >
              {t("title")}
            </h2>
          </div>

          <p className="max-w-xl text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9 lg:justify-self-end lg:pb-1">
            {t("description")}
          </p>
        </motion.div>

        <div className="relative mt-12 md:mt-16">
          <div
            aria-hidden="true"
            className="absolute bottom-5 start-[19px] top-5 w-px bg-neutral-200 md:hidden"
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-5 start-[19px] top-5 z-[1] w-px bg-neutral-900 md:hidden"
            style={
              reduceMotion
                ? { scaleY: 1, transformOrigin: "top" }
                : { scaleY: lineProgress, transformOrigin: "top" }
            }
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-5 hidden h-px bg-neutral-200 md:block"
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-5 hidden h-px bg-neutral-900 md:block"
            style={
              reduceMotion
                ? {
                    scaleX: 1,
                    transformOrigin: isRtl ? "right center" : "left center",
                  }
                : {
                    scaleX: lineProgress,
                    transformOrigin: isRtl ? "right center" : "left center",
                  }
            }
          />

          <div className="grid grid-cols-1 gap-0 md:grid-cols-4 md:gap-6 xl:gap-8">
            {stages.map((stage) => (
              <ProcessStage
                key={stage.id}
                id={stage.id}
                number={stage.number}
                Icon={stage.Icon}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-black/10 pt-8 sm:mt-20 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:pt-10">
          <p className="max-w-2xl text-balance text-xl font-medium leading-relaxed tracking-[-0.035em] text-neutral-900 sm:text-2xl">
            {t("closing")}
          </p>
          <Link
            href="#contact"
            className="mt-5 inline-flex min-h-11 w-fit items-center border-b border-neutral-400 pb-1 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 motion-reduce:transition-none sm:mt-0"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
