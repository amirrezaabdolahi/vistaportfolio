"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ArrowUpRight } from "lucide-react";

import { LanguageSwitcher } from "./language-switcher";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navigationItems = [
  { key: "services", href: "#services" },
  { key: "work", href: "#work" },
  { key: "whyVista", href: "#why-vista" },
  { key: "process", href: "#process" },
  { key: "about", href: "#about" },
  { key: "faq", href: "#faq" },
] as const;

export function Navbar() {
  const t = useTranslations("Navbar");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header id="top" className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Vista home"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="flex size-9 shrink-0 items-center justify-center">
            <Image
              alt=""
              src="/vista-mark.svg"
              width={36}
              height={36}
              priority
              className="size-9 object-contain"
            />
          </span>

          <span className="text-xl font-semibold tracking-[-0.06em]">
            vista
            <span className="text-neutral-400">.</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm text-neutral-600 transition-colors hover:text-black"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />

          <Button
            nativeButton={false}
            className="h-11 rounded-full px-5"
            render={<Link href="#contact" />}
          >
            {t("cta")}
            <ArrowUpRight className="ms-1 size-4" />
          </Button>
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full border border-black/10 md:hidden"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-black/[0.06] bg-white px-5 py-6 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-5">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm text-neutral-700"
              >
                {t(item.key)}
              </Link>
            ))}

            <div className="flex items-center justify-between gap-4 border-t border-black/[0.06] pt-5">
              <LanguageSwitcher />

              <Button
                nativeButton={false}
                className="rounded-full"
                render={
                  <Link href="#contact" onClick={() => setIsMenuOpen(false)} />
                }
              >
                {t("cta")}
                <ArrowUpRight className="ms-1 size-4" />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
