"use client";

import { useId, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

const questionKeys = [
  "services",
  "clients",
  "process",
  "singleService",
  "timeline",
  "pricing",
  "earlyIdea",
] as const;

export function FAQSection() {
  const t = useTranslations("FAQ");
  const instanceId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby={`faq-heading-${instanceId}`}
      className="scroll-mt-24 border-y border-black/[0.04] bg-white/60 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 lg:px-12">
        <div className="flex flex-col items-start">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
            {t("eyebrow")}
          </p>

          <h2
            id={`faq-heading-${instanceId}`}
            className="max-w-xl text-balance text-4xl font-medium leading-[1.08] tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-6xl"
          >
            {t("title")}
          </h2>

          <p className="mt-6 max-w-lg text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9">
            {t("description")}
          </p>

          <div className="mt-10 border-t border-neutral-200 pt-5 lg:mt-auto lg:pt-8">
            <p className="text-sm font-medium text-neutral-900">
              {t("contactPrompt")}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-7 text-neutral-600">
              {t("contactDescription")}
            </p>
            <Link
              href="#contact"
              className="mt-4 inline-flex min-h-11 items-center gap-2 border-b border-neutral-900 pb-1 text-sm font-medium text-neutral-950 transition-colors duration-150 hover:border-neutral-400 hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 motion-reduce:transition-none"
            >
              {t("contactCta")}
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                strokeWidth={1.8}
                className="rtl:rotate-[-90deg]"
              />
            </Link>
          </div>
        </div>

        <div className="min-w-0 divide-y divide-neutral-200 border-t border-neutral-200">
          {questionKeys.map((questionKey, index) => {
            const isOpen = openIndex === index;
            const triggerId = `${instanceId}-faq-trigger-${index}`;
            const panelId = `${instanceId}-faq-panel-${index}`;

            return (
              <article key={questionKey} className="py-1">
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={t("toggleQuestion", {
                      question: t(`questions.${questionKey}.question`),
                    })}
                    onClick={() =>
                      setOpenIndex((current) =>
                        current === index ? null : index,
                      )
                    }
                    className="flex min-h-[76px] w-full items-center justify-between gap-5 py-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-900 sm:min-h-[84px] sm:py-6"
                  >
                    <span className="text-base font-medium leading-7 tracking-[-0.02em] text-neutral-950 sm:text-lg sm:leading-8">
                      {t(`questions.${questionKey}.question`)}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 motion-reduce:transition-none ${isOpen ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-700"}`}
                    >
                      <Plus
                        size={17}
                        strokeWidth={1.7}
                        className={`transition-transform duration-150 motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                  className="pb-6 pe-10 text-sm leading-7 text-neutral-600 sm:pb-7 sm:text-base sm:leading-8"
                >
                  {t(`questions.${questionKey}.answer`)}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
