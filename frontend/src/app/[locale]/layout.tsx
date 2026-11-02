import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import "../globals.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://www.vistateam.tech";

const proximaNova = localFont({
  src: [
    {
      path: "../../../public/fonts/ProximaNova/ProximaNovaRegular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ProximaNova/ProximaNovaBold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ProximaNova/ProximaNovaBlack.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-proxima-nova",
  display: "swap",
});

const estedad = localFont({
  src: [
    {
      path: "../../../public/fonts/Estedad/Estedad-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Estedad/Estedad-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Estedad/Estedad-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Estedad/Estedad-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-estedad",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = localFont({
  src: [
    {
      path: "../../../public/fonts/Inter/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Inter/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Inter/Inter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Inter/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const localeMetadata = {
  en: {
    title: "Vista | Creative Content & Digital Experiences",
    description:
      "We create compelling visual content, cinematic videos, creative campaigns, and digital experiences that help brands stand out and grow.",
    ogLocale: "en_US",
  },
  fa: {
    title: "ویستا | تولید محتوای خلاقانه و راهکارهای دیجیتال",
    description:
      "ویستا با تولید محتوای حرفه‌ای، ویدیوهای سینمایی و کمپین‌های خلاقانه به برندها کمک می‌کند متمایز دیده شوند و رشد کنند.",
    ogLocale: "fa_IR",
  },
  de: {
    title: "Vista | Kreative Inhalte & Digitale Erlebnisse",
    description:
      "Wir erstellen hochwertige visuelle Inhalte, cineastische Videos und kreative Kampagnen, die Marken sichtbar machen und wachsen lassen.",
    ogLocale: "de_DE",
  },
  it: {
    title: "Vista | Contenuti Creativi ed Esperienze Digitali",
    description:
      "Creiamo contenuti visivi di qualità, video cinematografici e campagne creative per aiutare i brand a distinguersi e crescere.",
    ogLocale: "it_IT",
  },
  es: {
    title: "Vista | Contenido Creativo y Experiencias Digitales",
    description:
      "Creamos contenido visual de calidad, vídeos cinematográficos y campañas creativas para ayudar a las marcas a destacar y crecer.",
    ogLocale: "es_ES",
  },
} as const;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  // if (!hasLocale(routing.locales, locale)) {
  //   notFound();
  // }

  const current = localeMetadata[locale as keyof typeof localeMetadata];

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      absolute: current.title,
    },

    description: current.description,

    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fa: "/fa",
        de: "/de",
        it: "/it",
        es: "/es",
        "x-default": "/en",
      },
    },

    openGraph: {
      title: current.title,
      description: current.description,
      url: `${SITE_URL}/${locale}`,
      siteName: "Vista",
      locale: current.ogLocale,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Vista — Create. Innovate. Grow.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: current.title,
      description: current.description,
      images: ["/og-image.png"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // if (!hasLocale(routing.locales, locale)) {
  //   notFound();
  // }

  setRequestLocale(locale);

  const messages = await getMessages();
  const isRtl = locale === "fa";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        estedad.variable,
        geistSans.variable,
        geistMono.variable,
        proximaNova.variable,
        inter.variable,
        isRtl
          ? "font-[family-name:var(--font-estedad)]"
          : "font-[family-name:var(--font-proxima-nova)]",
      )}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
