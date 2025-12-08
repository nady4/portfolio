import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import "./global.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <title>Nadya Jerochim</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Ensure theme is applied ASAP to avoid flashes on navigation */}
        <script
          dangerouslySetInnerHTML={`
            (function () {
              try {
                var t = localStorage.getItem('theme');
                if (t === 'light' || t === 'dark') {
                  document.documentElement.dataset.theme = t;
                }
              } catch (e) {}
            })();
          `}
        />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
