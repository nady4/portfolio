import { type RequestHandler } from "@builder.io/qwik-city";
import {
  acceptsMarkdown,
  notFoundHtml,
  notFoundJson,
  notFoundMarkdown,
} from "~/lib/markdown-negotiation";

export const onRequest: RequestHandler = ({ request, url, headers, send }) => {
  const locale = url.pathname.startsWith("/es") ? "es" : "en";
  const accept = request.headers.get("accept");

  if (url.pathname.startsWith("/api/")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
    headers.set("Cache-Control", "no-store");
    send(404, notFoundJson(url.pathname));
    return;
  }

  if (acceptsMarkdown(accept)) {
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("Vary", "Accept, Accept-Encoding");
    send(404, notFoundMarkdown(url.pathname, locale));
    return;
  }

  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  send(404, notFoundHtml(locale));
};
