import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { translations as t } from "~/lib/translations";
import { type Locale } from "~/lib/locale";
import { JsonLd } from "~/components/JsonLd";

function detectLocale(
  pathname: string,
  paramLang: string | null,
  cookieLang: string | null,
  acceptLanguage: string,
): Locale {
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";

  if (paramLang === "es" || paramLang === "en") return paramLang;
  if (cookieLang === "es" || cookieLang === "en") return cookieLang;

  return acceptLanguage.toLowerCase().startsWith("es") ? "es" : "en";
}

export const useLocale = routeLoader$(({ request, url, cookie }) => {
  const acceptLanguage = request.headers.get("accept-language") || "";
  return detectLocale(
    url.pathname,
    url.searchParams.get("lang"),
    cookie.get("lang")?.value ?? null,
    acceptLanguage,
  );
});

export const useTranslations = routeLoader$(({ request, url, cookie }) => {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const lang = detectLocale(
    url.pathname,
    url.searchParams.get("lang"),
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
    { name: "theme-color", content: "#161320" },
    {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1",
    },
  ],
};
