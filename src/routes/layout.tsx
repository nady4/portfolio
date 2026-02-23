import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { translations as t } from "~/lib/translations";

export const useLocale = routeLoader$(({ request, url }) => {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const paramLang = url.searchParams.get("lang");

  if (paramLang === "es" || paramLang === "en") {
    return paramLang;
  }

  return acceptLanguage.toLowerCase().startsWith("es") ? "es" : "en";
});

export const useTranslations = routeLoader$(({ request, url }) => {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const paramLang = url.searchParams.get("lang");

  const lang =
    paramLang === "es" || paramLang === "en"
      ? paramLang
      : acceptLanguage.toLowerCase().startsWith("es")
        ? "es"
        : "en";

  return t[lang];
});

export default component$(() => {
  return <Slot />;
});

export const head: DocumentHead = {
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#161320" },
  ],
  links: [
    { rel: "icon", href: "/favicon.svg" },
    { rel: "canonical", href: "https://nady4.com/" },
  ],
  scripts: [
    {
      props: {
        type: "application/ld+json",
        dangerouslySetInnerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Nadya Jerochim",
          url: "https://nady4.com/",
          jobTitle: "Full Stack Developer",
          sameAs: [
            "https://github.com/nady4",
            "https://linkedin.com/in/nady4",
            "https://x.com/_nady4",
            "https://www.instagram.com/nady4_dev",
          ],
        }),
      },
    },
  ],
};
