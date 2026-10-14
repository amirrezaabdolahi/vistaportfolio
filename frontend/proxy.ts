import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const middleware = createMiddleware(routing);

export default function proxy(request: Parameters<typeof middleware>[0]) {
  console.log("[proxy.ts] Request:", request.nextUrl.pathname);
  return middleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
