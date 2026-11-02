import type { MetadataRoute } from "next";

const SITE_URL = "https://www.vistateam.tech";

const locales = ["en", "fa", "de", "it", "es"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    en: `${SITE_URL}/en`,
    fa: `${SITE_URL}/fa`,
    de: `${SITE_URL}/de`,
    it: `${SITE_URL}/it`,
    es: `${SITE_URL}/es`,
    "x-default": `${SITE_URL}/en`,
  };

  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: {
      languages,
    },
  }));
}
