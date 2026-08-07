import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { translations as t } from "~/lib/translations";
import { type Locale, localizedPath } from "~/lib/locale";
import { JsonLd } from "~/components/JsonLd";

function detectLocale(
  pathname: string,
  cookieLang: string | null,
  acceptLanguage: string,
): Locale {
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";

  if (cookieLang === "es" || cookieLang === "en") return cookieLang;

  return acceptLanguage.toLowerCase().startsWith("es") ? "es" : "en";
}

export const onRequest: RequestHandler = ({ url, redirect }) => {
  const langParam = url.searchParams.get("lang");
  if (langParam !== "en" && langParam !== "es") return;

  const target = langParam as Locale;
  const targetPath = localizedPath(url.pathname, target);

  const remaining = new URLSearchParams(url.search);
  remaining.delete("lang");
  const remainingSearch = remaining.toString();
  const search = remainingSearch ? `?${remainingSearch}` : "";
  const hash = url.hash || "";

  throw redirect(301, `${targetPath}${search}${hash}`);
};

export const useLocale = routeLoader$(({ request, url, cookie }) => {
  const acceptLanguage = request.headers.get("accept-language") || "";
  return detectLocale(
    url.pathname,
    cookie.get("lang")?.value ?? null,
    acceptLanguage,
  );
});

export const useTranslations = routeLoader$(({ request, url, cookie }) => {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const lang = detectLocale(
    url.pathname,
    cookie.get("lang")?.value ?? null,
    acceptLanguage,
  );
  return t[lang];
});

export default component$(() => {
  return (
    <>
      <JsonLd />
      <Slot />
    </>
  );
});

export const head: DocumentHead = {
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#111414" },
    {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1",
    },
  ],
};
