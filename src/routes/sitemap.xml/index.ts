import type { RequestHandler } from "@builder.io/qwik-city";
import { getAllPosts } from "~/lib/blog";

const SITE = "https://nady4.com";
const NS = "http://www.w3.org/1999/xhtml";

function xmlEscape(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toISODate(dateStr?: string) {
  if (!dateStr) return new Date().toISOString();
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

interface Alternate {
  hreflang: string;
  href: string;
}

function renderAlternates(alts: Alternate[]): string {
  return alts
    .map(
      (a) =>
        `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${xmlEscape(a.href)}"/>`,
    )
    .join("\n");
}

function altPair(en: string, es: string): Alternate[] {
  return [
    { hreflang: "en", href: `${SITE}${en}` },
    { hreflang: "es", href: `${SITE}${es}` },
    { hreflang: "x-default", href: `${SITE}${en}` },
  ];
}

const STATIC_PAGES: Array<{ en: string; es: string; lastmod: string }> = [
  { en: "/", es: "/es/", lastmod: "2026-08-22T00:00:00Z" },
  { en: "/about", es: "/es/about", lastmod: "2026-08-22T00:00:00Z" },
  { en: "/contact", es: "/es/contact", lastmod: "2026-08-22T00:00:00Z" },
  { en: "/privacy", es: "/es/privacy", lastmod: "2026-08-22T00:00:00Z" },
  { en: "/developers", es: "/es/developers", lastmod: "2026-08-22T00:00:00Z" },
  { en: "/blog/", es: "/es/blog/", lastmod: "2026-08-22T00:00:00Z" },
];

export const onGet: RequestHandler = ({ headers, send }) => {
  const posts = getAllPosts();
  const now = new Date().toISOString();

  type Entry = {
    loc: string;
    lastmod: string;
    alts: Alternate[];
  };

  const entries: Entry[] = [];
  for (const p of STATIC_PAGES) {
    entries.push({
      loc: `${SITE}${p.en}`,
      lastmod: p.lastmod || now,
      alts: altPair(p.en, p.es),
    });
    entries.push({
      loc: `${SITE}${p.es}`,
      lastmod: p.lastmod || now,
      alts: altPair(p.en, p.es),
    });
  }

  for (const p of posts) {
    entries.push({
      loc: `${SITE}/blog/${p.slug}/`,
      lastmod: toISODate(p.date),
      alts: altPair(`/blog/${p.slug}/`, `/es/blog/${p.slug}/`),
    });
    entries.push({
      loc: `${SITE}/es/blog/${p.slug}/`,
      lastmod: toISODate(p.date),
      alts: altPair(`/blog/${p.slug}/`, `/es/blog/${p.slug}/`),
    });
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:xhtml="${NS}">\n` +
    entries
      .map(
        (e) =>
          `  <url>\n` +
          `    <loc>${xmlEscape(e.loc)}</loc>\n` +
          `    <lastmod>${xmlEscape(e.lastmod)}</lastmod>\n` +
          renderAlternates(e.alts) +
          `\n  </url>`,
      )
      .join("\n") +
    `\n</urlset>\n`;

  headers.set("Content-Type", "application/xml; charset=utf-8");
  headers.set("Cache-Control", "public, max-age=0, s-maxage=3600");

  send(200, body);
};
