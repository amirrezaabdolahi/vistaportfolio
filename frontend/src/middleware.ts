import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const proxy = createMiddleware(routing);

export default function middleware(request: Parameters<typeof proxy>[0]) {
  console.log("[middleware.ts] Request:", request.nextUrl.pathname);
  return proxy(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
