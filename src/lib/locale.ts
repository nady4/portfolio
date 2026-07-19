export type Locale = "en" | "es";

export function detectLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "en";
}

export function detectLocaleFromUrl(url: URL): Locale {
  return detectLocaleFromPathname(url.pathname);
}

export function localizedPath(pathname: string, target: Locale): string {
  if (pathname === "/" || pathname === "") return target === "es" ? "/es/" : "/";
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    if (target === "es") return pathname === "/es" ? "/es/" : pathname;
    return pathname === "/es" ? "/" : pathname.slice(3) || "/";
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    if (target === "es") {
      return pathname === "/en" ? "/es/" : `/es${pathname.slice(3)}`;
    }
    return pathname === "/en" ? "/" : pathname.slice(3) || "/";
  }
  return target === "es" ? `/es${pathname}` : pathname;
}
