"use client";

import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("Contact");
  const nav = useTranslations("Navbar");

  return (
    <footer className="border-t border-black/[0.06] bg-white/95">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <Link href="/" aria-label="Vista home" className="text-xl font-semibold tracking-[-0.06em] text-neutral-950">
          vista<span className="text-neutral-400">.</span>
        </Link>
        <nav aria-label={t("footerNavigation")} className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-600">
          <Link href="#services" className="transition-colors hover:text-neutral-950">{nav("services")}</Link>
          <Link href="#work" className="transition-colors hover:text-neutral-950">{nav("work")}</Link>
          <Link href="#about" className="transition-colors hover:text-neutral-950">{nav("about")}</Link>
          <Link href="#faq" className="transition-colors hover:text-neutral-950">{nav("faq")}</Link>
          <Link href="#contact" className="transition-colors hover:text-neutral-950">{nav("contact")}</Link>
        </nav>
        <div className="flex items-center justify-between gap-5 text-xs text-neutral-500 md:justify-end">
          <span>© {new Date().getFullYear()} Vista. {t("copyright")}</span>
          <a href="#home" className="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-950">
            {t("backToTop")} <ArrowUp aria-hidden="true" size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
