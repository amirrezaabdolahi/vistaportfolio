"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Languages } from "lucide-react";

import { routing, type AppLocale } from "@/i18n/routing";

const languages: { locale: AppLocale; label: string }[] = [
  { locale: "en", label: "EN" },
  { locale: "fa", label: "FA" },
  { locale: "de", label: "DE" },
  { locale: "it", label: "IT" },
  { locale: "es", label: "ES" },
];

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  function handleLanguageChange(nextLocale: AppLocale) {
    if (nextLocale === locale) return;

    // Replace the existing locale segment instead of passing an already
    // localized pathname into next-intl's locale-aware router.
    const segments = pathname.split("/");
    const currentLocaleIndex = segments.findIndex((segment, index) =>
      index === 1 && routing.locales.some((supportedLocale) => supportedLocale === segment)
    );

    if (currentLocaleIndex === 1) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }

    const nextPathname = segments.join("/") || `/${nextLocale}`;
    router.replace(nextPathname);
  }

  return (
    <div className="relative">
      <label htmlFor="language-select" className="sr-only">
        Select language
      </label>

      <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 transition-colors hover:border-black/20">
        <Languages size={16} aria-hidden="true" />

        <select
          id="language-select"
          value={locale}
          onChange={(event) =>
            handleLanguageChange(event.target.value as AppLocale)
          }
          className="cursor-pointer appearance-none bg-transparent text-sm font-medium outline-none"
          aria-label="Select language"
        >
          {languages.map(({ locale, label }) => (
            <option key={locale} value={locale}>
              {label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
