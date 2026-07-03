/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import {
  renderToStream,
  type RenderToStreamOptions,
} from "@builder.io/qwik/server";
import Root from "./root";

function detectLangFromUrl(url: string | undefined): string {
  if (!url) return "en";
  try {
    const u = new URL(url);
    if (u.pathname === "/es" || u.pathname.startsWith("/es/")) return "es";
    if (u.pathname === "/en" || u.pathname.startsWith("/en/")) return "en";
  } catch {
    return "en";
  }
  return "en";
}

export default function (opts: RenderToStreamOptions) {
  const requestUrl =
    (opts.serverData?.url as string | undefined) ??
    (opts as { url?: string }).url;
  const lang = detectLangFromUrl(requestUrl);

  return renderToStream(<Root />, {
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang,
      ...opts.containerAttributes,
    },
    serverData: {
      ...opts.serverData,
    },
  });
}
