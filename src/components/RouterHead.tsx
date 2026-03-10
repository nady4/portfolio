import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";

export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#1a1a2e" />

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
