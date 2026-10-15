import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

type ServiceId =
  | "webDevelopment"
  | "uiUxDesign"
  | "aiAutomation"
  | "seoMarketing"
  | "itConsulting";

type ServiceCardProps = {
  id: ServiceId;
  number: string;
  image: string;
  layout: "wide" | "narrow" | "horizontal";
};

const layoutClasses: Record<ServiceCardProps["layout"], string> = {
  wide: "md:col-span-2 xl:col-span-7",
  narrow: "md:col-span-1 xl:col-span-5",
  horizontal: "md:col-span-2 xl:col-span-12",
};

const imageSizes: Record<ServiceCardProps["layout"], string> = {
  wide: "(min-width: 1280px) 58vw, (min-width: 768px) 90vw, 100vw",
  narrow: "(min-width: 1280px) 42vw, (min-width: 768px) 45vw, 100vw",
  horizontal: "(min-width: 1280px) 40vw, 100vw",
};

export function ServiceCard({
  id,
  number,
  image,
  layout,
}: ServiceCardProps) {
  const t = useTranslations("Services");
  const title = t(`${id}.title`);
  const isHorizontal = layout === "horizontal";

  return (
    <article className={`group min-w-0 ${layoutClasses[layout]}`}>
      <div
        className={
          isHorizontal
            ? "grid gap-6 border-t border-black/10 pt-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-10"
            : "h-full"
        }
      >
        <div
          className={
            isHorizontal
              ? "relative aspect-[4/3] overflow-hidden rounded-xl border border-black/[0.06] bg-neutral-100 md:aspect-[1.35/1]"
              : `relative overflow-hidden rounded-xl border border-black/[0.06] bg-neutral-100 ${layout === "wide" ? "aspect-[1.65/1] sm:aspect-[1.8/1]" : "aspect-[1.15/1] sm:aspect-[1.25/1]"}`
          }
        >
          <Image
            src={image}
            alt={t(`${id}.imageAlt`)}
            fill
            sizes={imageSizes[layout]}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] group-focus-within:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-within:scale-100"
          />
        </div>

        <div className={isHorizontal ? "py-1 md:py-5" : "pt-5"}>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-medium tabular-nums tracking-[0.12em] text-neutral-400">
              {number}
            </span>

            <Link
              href="#contact"
              aria-label={t("inquireAbout", { service: title })}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-neutral-700 transition-colors duration-200 hover:border-black hover:bg-neutral-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <ArrowUpRight
                aria-hidden="true"
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:-translate-y-0"
              />
            </Link>
          </div>

          <h3 className="mt-4 text-2xl font-medium tracking-[-0.04em] text-neutral-950 sm:text-[1.75rem]">
            {title}
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
            {t(`${id}.description`)}
          </p>
        </div>
      </div>
    </article>
  );
}
