import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import { faviconHref } from "virtual:favicon-href";

export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  const canonicalUrl = `${loc.url.origin}${loc.url.pathname}`;

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={canonicalUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href={faviconHref} />
      <link rel="alternate icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#111414" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => {
        const { style, key, ...props } = s;
        return <style key={key} {...props} dangerouslySetInnerHTML={style} />;
      })}

      {head.scripts.map((s) => {
        const { script, key, ...props } = s;
        return <script key={key} {...props} dangerouslySetInnerHTML={script} />;
      })}
    </>
  );
});
