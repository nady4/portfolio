import type { RequestHandler } from "@builder.io/qwik-city";

export const MARKDOWN_MIME = "text/markdown";
export const HTML_MIME = "text/html";
export const JSON_MIME = "application/json";

export function acceptsMarkdown(acceptHeader: string | null | undefined): boolean {
  if (!acceptHeader) return false;
  const parts = acceptHeader.toLowerCase().split(",");
  return parts.some((part) => {
    const media = part.split(";")[0].trim();
    return media === MARKDOWN_MIME || media === "text/*";
  });
}

export function prefersMarkdown(acceptHeader: string | null | undefined): boolean {
  if (!acceptHeader) return false;
  const parts = acceptHeader.toLowerCase().split(",");
  const md = parts.findIndex((p) => p.split(";")[0].trim() === MARKDOWN_MIME);
  const html = parts.findIndex((p) => p.split(";")[0].trim() === HTML_MIME);
  if (md === -1 && html === -1) return false;
  if (md === -1) return false;
  if (html === -1) return true;
  return md <= html;
}

export interface NegotiatorOptions {
  accept: string | null | undefined;
  locale: "en" | "es";
  markdownFor: (locale: "en" | "es") => string;
}

export function negotiateMarkdown(opts: NegotiatorOptions): {
  serveMarkdown: boolean;
  markdown: string;
} {
  return {
    serveMarkdown: prefersMarkdown(opts.accept),
    markdown: opts.markdownFor(opts.locale),
  };
}

export function notFoundMarkdown(pathname: string, locale: "en" | "es"): string {
  const links =
    locale === "es"
      ? [
          ["Inicio", "https://www.nady4.com/"],
          ["Blog", "https://www.nady4.com/blog/"],
          ["Contacto", "https://www.nady4.com/contact"],
          ["Desarrolladores", "https://www.nady4.com/developers"],
          ["Mapa del sitio", "https://www.nady4.com/sitemap.xml"],
          ["llms.txt", "https://www.nady4.com/llms.txt"],
        ]
      : [
          ["Home", "https://www.nady4.com/"],
          ["Blog", "https://www.nady4.com/blog/"],
          ["Contact", "https://www.nady4.com/contact"],
          ["Developers", "https://www.nady4.com/developers"],
          ["Sitemap", "https://www.nady4.com/sitemap.xml"],
          ["llms.txt", "https://www.nady4.com/llms.txt"],
        ];

  return (
    `# 404 — Not Found\n\n` +
    `The page \`${pathname}\` you requested does not exist on nady4.com.\n\n` +
    (locale === "es"
      ? "¿Buscabas algo de nady4? Acá hay algunos lugares donde buscar a continuación:\n\n"
      : "Looking for something on nady4? Here is where to look next:\n\n") +
    links.map(([label, href]) => `- [${label}](${href})`).join("\n") +
    `\n\nFor agents: the full machine-readable index is at https://www.nady4.com/sitemap.xml and the site guide at https://www.nady4.com/llms.txt.\n`
  );
}

export function notFoundJson(pathname: string): string {
  return JSON.stringify(
    {
      ok: false,
      error: {
        code: "not_found",
        message: "No endpoint exists at this path.",
        hint: "See https://www.nady4.com/openapi.json for the full API surface, or https://www.nady4.com/llms.txt for the site index.",
        path: pathname,
      },
    },
    null,
    2,
  );
}

export function notFoundHtml(locale: "en" | "es"): string {
  const heading = locale === "es" ? "404 — No encontrado" : "404 — Not Found";
  const copy =
    locale === "es"
      ? "Esa página no existe en nady4.com."
      : "That page does not exist on nady4.com.";
  const links =
    locale === "es"
      ? [
          ["Inicio", "/"],
          ["Blog", "/blog/"],
          ["Contacto", "/contact"],
          ["Desarrolladores", "/developers"],
        ]
      : [
          ["Home", "/"],
          ["Blog", "/blog/"],
          ["Contact", "/contact"],
          ["Developers", "/developers"],
        ];
  return (
    `<!DOCTYPE html><html lang="${locale}"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<title>${heading}</title>` +
    `<style>body{color:#eef0e9;background-color:#111414;font-family:Arial,sans-serif;padding:2rem;}` +
    `h1{font-size:2rem}a{color:#a998ff;margin-right:1rem}</style>` +
    `</head><body><h1>${heading}</h1><p>${copy}</p><nav>` +
    links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("") +
    `</nav></body></html>`
  );
}
const NEGOTIATED_CACHE = "public, max-age=300, s-maxage=300";

export function negotiateHomepage(
  markdownFor: (locale: "en" | "es") => string,
): RequestHandler {
  return ({ request, headers, send, url }) => {
    const locale = url.pathname.startsWith("/es") ? "es" : "en";
    headers.set("Vary", "Accept, Accept-Encoding");
    if (!prefersMarkdown(request.headers.get("accept"))) return;
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("Cache-Control", NEGOTIATED_CACHE);
    send(200, markdownFor(locale));
  };
}

export function negotiateMarkdownPage(
  markdownFor: (locale: "en" | "es") => string,
): RequestHandler {
  return ({ request, headers, send, url }) => {
    const locale = url.pathname.startsWith("/es") ? "es" : "en";
    headers.set("Vary", "Accept, Accept-Encoding");
    if (!acceptsMarkdown(request.headers.get("accept"))) return;
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("Cache-Control", NEGOTIATED_CACHE);
    send(200, markdownFor(locale));
  };
}

export function postAsMarkdown(post: {
  title: string;
  date: string;
  description?: string;
  markdown: string;
}): string {
  const head = [`# ${post.title}`, ``, `- Date: ${post.date}`];
  if (post.description) head.push(`- Description: ${post.description}`);
  head.push(``, `---`, ``);
  return `${head.join("\n")}${post.markdown}\n`;
}
