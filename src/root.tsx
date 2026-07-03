import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/RouterHead";
import "./global.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <meta
          name="google-site-verification"
          content="_Gebr9SHL1Tcx7xNKIcuHoaq1P64fGlHT6ZtpqfetYc"
        />
        <RouterHead />
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
      <body>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
