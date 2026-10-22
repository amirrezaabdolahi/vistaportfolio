"use client";

import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section id="home" className="relative isolate overflow-hidden ">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(0,0,0,0.035),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      </div>

      <div className="mx-auto grid min-h-[calc(100svh-76px)] max-w-[1440px] items-center px-5 py-20 sm:px-8 sm:py-24  lg:gap-10 lg:px-12 lg:py-20">
        <div className="relative z-10 w-full! flex flex-col items-center text-center ">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white/80 px-3.5 py-2 shadow-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>

            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-600 sm:text-xs">
              {t("eyebrow")}
            </span>
          </div>

          <h1 className="max-w-3xl text-[clamp(2.75rem,6.2vw,5.75rem)] font-medium leading-[1.08] tracking-[-0.065em] text-neutral-950">
            {t("title")}
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9">
            {t("description")}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center w-full sm:w-auto">
            <Button
              nativeButton={false}
              size="lg"
              className="h-13 rounded-full px-6 text-sm font-medium w-full! sm:w-auto! "
              render={<Link href="#contact" />}
            >
              {t("primaryCta")}
              <ArrowUpRight className="ms-1 size-4" />
            </Button>

            <Button
              nativeButton={false}
              variant="outline"
              size="lg"
              className="h-13 rounded-full border-black/10 bg-white/70 px-6 text-sm w-full!  sm:w-auto! font-medium hover:bg-neutral-50"
              render={<Link href="#work" />}
            >
              {t("secondaryCta")}
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-neutral-500">
            <span className="flex size-5 items-center justify-center rounded-full border border-black/10">
              <Plus size={12} />
            </span>
            <span>{t("availability")}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] items-center justify-between border-t border-black/[0.06] px-5 py-5 sm:px-8 lg:px-12">
        <span className="text-xs text-neutral-400">{t("footerTagline")}</span>

        <a
          href="#services"
          className="flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-black"
        >
          <span>{t("discover")}</span>
          <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
