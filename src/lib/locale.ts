export type Locale = "en" | "es";

export function detectLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "en";
}

export function detectLocaleFromUrl(url: URL): Locale {
  return detectLocaleFromPathname(url.pathname);
}
