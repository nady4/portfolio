import type { RequestHandler } from "@builder.io/qwik-city";
import { getAllPosts } from "~/lib/blog";

const SITE = "https://nady4.com";

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

export const onGet: RequestHandler = ({ headers, send }) => {
  const staticUrls = [
    { loc: `${SITE}/`, lastmod: new Date().toISOString() },
    { loc: `${SITE}/blog/`, lastmod: new Date().toISOString() },
  ];

  const posts = getAllPosts();
  const postUrls = posts.map((p) => ({
    loc: `${SITE}/blog/${p.slug}/`,
    lastmod: toISODate(p.date),
  }));

  const urls = [...staticUrls, ...postUrls];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n` +
          `    <loc>${xmlEscape(u.loc)}</loc>\n` +
          `    <lastmod>${xmlEscape(u.lastmod)}</lastmod>\n` +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  headers.set("Content-Type", "application/xml; charset=utf-8");
  headers.set("Cache-Control", "public, max-age=0, s-maxage=3600");

  send(200, body);
};
