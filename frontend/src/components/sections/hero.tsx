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

      <div className="mx-auto grid min-h-[calc(100svh-76px)] max-w-[1440px] items-center gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-12 lg:py-20">
        <div className="relative z-10 max-w-3xl">
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

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              nativeButton={false}
              size="lg"
              className="h-13 rounded-full px-6 text-sm font-medium"
              render={<Link href="#contact" />}
            >
              {t("primaryCta")}
              <ArrowUpRight className="ms-1 size-4" />
            </Button>

            <Button
              nativeButton={false}
              variant="outline"
              size="lg"
              className="h-13 rounded-full border-black/10 bg-white/70 px-6 text-sm font-medium hover:bg-neutral-50"
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

        <div className="relative mx-auto w-full max-w-[560px] lg:ms-auto">
          <div className="relative aspect-[0.92/1] overflow-hidden rounded-[2rem] border border-black/[0.06]  p-5 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,1),rgba(247,247,245,0.1)_65%)]" />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                    VISTA / 001
                  </p>
                  <p className="mt-2 text-sm font-medium text-neutral-800">
                    {t("visualLabel")}
                  </p>
                </div>

                <div className="flex size-10 items-center justify-center rounded-full border border-black/[0.08] bg-white/80">
                  <ArrowUpRight
                    size={18}
                    className="-rotate-45 text-neutral-700"
                  />
                </div>
              </div>

              <div className="relative mx-auto flex aspect-square w-full max-w-[330px] items-center justify-center">
                <div className="absolute inset-[8%] rounded-full border border-black/[0.08]" />
                <div className="absolute inset-[19%] rounded-full border border-black/[0.09]" />
                <div className="absolute inset-[30%] rounded-full border border-black/[0.1]" />
                <div className="absolute h-[88%] w-px bg-black/[0.08]" />
                <div className="absolute h-px w-[88%] bg-black/[0.08]" />
                <div className="absolute inset-[12%] rotate-45 rounded-[2rem] border border-black/[0.12]" />
                <div className="absolute inset-[22%] -rotate-12 rounded-[2rem] border border-black/[0.12]" />

                <div className="relative flex size-[36%] items-center justify-center rounded-[1.75rem] border border-white/20 bg-neutral-950 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
                  <div className="absolute inset-2 rounded-[1.2rem] border border-white/10" />
                  <span className="text-5xl font-medium tracking-[-0.1em] text-white">
                    <Image alt="" src="/logo.png" width={120} height={120} />
                  </span>
                </div>

                <span className="absolute right-[9%] top-[23%] size-3 rounded-full border-2 border-[#F7F7F5] bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.1)]" />
                <span className="absolute bottom-[16%] left-[15%] size-2 rounded-full bg-neutral-400" />
                <span className="absolute left-[23%] top-[12%] size-1.5 rounded-full bg-neutral-300" />
              </div>

              <div className="flex items-end justify-between gap-4 border-t border-black/[0.08] pt-5">
                <div>
                  <p className="text-xs text-neutral-500">{t("statLabel")}</p>
                  <p className="mt-1 text-lg font-medium tracking-tight text-neutral-900">
                    {t("statValue")}
                  </p>
                </div>

                <p className="max-w-[150px] text-end text-xs leading-5 text-neutral-500">
                  {t("visualCaption")}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -start-3 flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:-start-6 sm:p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-neutral-950 text-white">
              <ArrowUpRight size={18} />
            </div>

            <div>
              <p className="text-xs text-neutral-500">{t("floatingLabel")}</p>
              <p className="mt-1 text-sm font-medium text-neutral-900">
                {t("floatingValue")}
              </p>
            </div>
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
