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

export const onGet: RequestHandler = ({ headers, send }) => {
  const posts = getAllPosts();
  const now = new Date().toISOString();

  type Entry = {
    loc: string;
    lastmod: string;
    alts: Alternate[];
  };

  const entries: Entry[] = [
    {
      loc: `${SITE}/`,
      lastmod: now,
      alts: [
        { hreflang: "en", href: `${SITE}/` },
        { hreflang: "es", href: `${SITE}/es/` },
        { hreflang: "x-default", href: `${SITE}/` },
      ],
    },
    {
      loc: `${SITE}/es/`,
      lastmod: now,
      alts: [
        { hreflang: "en", href: `${SITE}/` },
        { hreflang: "es", href: `${SITE}/es/` },
        { hreflang: "x-default", href: `${SITE}/` },
      ],
    },
    {
      loc: `${SITE}/blog/`,
      lastmod: now,
      alts: [
        { hreflang: "en", href: `${SITE}/blog/` },
        { hreflang: "es", href: `${SITE}/es/blog/` },
        { hreflang: "x-default", href: `${SITE}/blog/` },
      ],
    },
    {
      loc: `${SITE}/es/blog/`,
      lastmod: now,
      alts: [
        { hreflang: "en", href: `${SITE}/blog/` },
        { hreflang: "es", href: `${SITE}/es/blog/` },
        { hreflang: "x-default", href: `${SITE}/blog/` },
      ],
    },
  ];

  for (const p of posts) {
    entries.push({
      loc: `${SITE}/blog/${p.slug}/`,
      lastmod: toISODate(p.date),
      alts: [
        { hreflang: "en", href: `${SITE}/blog/${p.slug}/` },
        { hreflang: "es", href: `${SITE}/es/blog/${p.slug}/` },
        { hreflang: "x-default", href: `${SITE}/blog/${p.slug}/` },
      ],
    });
    entries.push({
      loc: `${SITE}/es/blog/${p.slug}/`,
      lastmod: toISODate(p.date),
      alts: [
        { hreflang: "en", href: `${SITE}/blog/${p.slug}/` },
        { hreflang: "es", href: `${SITE}/es/blog/${p.slug}/` },
        { hreflang: "x-default", href: `${SITE}/blog/${p.slug}/` },
      ],
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
