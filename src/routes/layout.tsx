import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { translations as t } from "~/lib/translations";
import {
  detectLocaleFromPathname,
  type Locale,
  localizedPath,
} from "~/lib/locale";
import { JsonLd } from "~/components/JsonLd";

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

export const useLocale = routeLoader$(({ url }) => {
  return detectLocaleFromPathname(url.pathname);
});

export const useTranslations = routeLoader$(({ url }) => {
  const lang = detectLocaleFromPathname(url.pathname);
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
  links: [
    { rel: "llms.txt", href: "/llms.txt" },
    { rel: "sitemap", href: "/sitemap.xml" },
  ],
};
