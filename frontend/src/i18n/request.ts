import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  // console.log("[request.ts] Requested Locale:", requestedLocale);
  // console.log("[request.ts] Resolved Locale:", locale);
  // console.log("[request.ts] Available Locales:", routing.locales);
  // console.log("[request.ts] Default Locale:", routing.defaultLocale);
  // console.log((await import(`../../messages/${locale}.json`)).default);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
