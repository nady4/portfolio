import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Signal from "~/components/Signal";
import { useLocale, useTranslations } from "~/routes/layout";
import "~/styles/Document.scss";

export default component$(() => {
  const lang = useLocale().value;
  const t = useTranslations().value;
  const homeHref = lang === "es" ? "/es/" : "/";

  return (
    <>
      <Navbar />
      <main class="doc-page">
        <header class="doc-page__head">
          <div class="doc-page__back-row">
            <a href={homeHref}>&larr; {t.blog_back}</a>
            <Signal code="03 / 09" tone="purple">
              canal abierto
            </Signal>
          </div>
          <h1>
            nady4 <span>/ contacto</span>
          </h1>
          <p class="doc-page__intro">
            Disponible para productos full stack con IA, integraciones con LLM y
            automatización de flujos de trabajo.
          </p>
        </header>

        <div class="doc-prose">
          <section>
            <h2>01 / Correo directo</h2>
            <p>
              El canal principal para propuestas de trabajo, consultas técnicas
              y colaboraciones es{" "}
              <a href="mailto:dev@nady4.com">dev@nady4.com</a>.
            </p>
            <p>Ventana de respuesta estimada: 24—72 horas.</p>
          </section>

          <section>
            <h2>02 / Redes y perfiles</h2>
            <ul>
              <li>
                GitHub: <a href="https://github.com/nady4">github.com/nady4</a>{" "}
                — código de proyectos y experimentos.
              </li>
              <li>
                LinkedIn:{" "}
                <a href="https://www.linkedin.com/in/nady4">
                  linkedin.com/in/nady4
                </a>{" "}
                — trayectoria y recomendaciones.
              </li>
              <li>
                X: <a href="https://x.com/_nady4">@_nady4</a> — actualizaciones
                y notas breves.
              </li>
              <li>
                Instagram:{" "}
                <a href="https://www.instagram.com/nady4_dev">@nady4_dev</a> —
                detrás de escena del desarrollo.
              </li>
            </ul>
          </section>

          <section>
            <h2>03 / Currículum</h2>
            <p>
              Descargá el CV en <a href="/cv-en.pdf">English</a> o{" "}
              <a href="/cv-es.pdf">Español</a>.
            </p>
          </section>

          <section>
            <h2>04 / Coordenadas</h2>
            <p>
              Buenos Aires, Argentina — trabajando remoto con equipos en
              cualquier zona horaria. Inglés (C2) y español nativo.
            </p>
            <p>
              Para consultas de prensa, privacidad o datos, usá el mismo correo;
              la política de privacidad del sitio está en{" "}
              <a href="/es/privacy">política de privacidad</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
});

export const head: DocumentHead = {
  title: "Contacto | Nadya Jerochim — Ingeniera Full Stack",
  meta: [
    {
      name: "description",
      content:
        "Contactá a Nadya Jerochim para productos full stack con IA, integraciones con LLM y automatización. Correo dev@nady4.com — respuesta en 24–72 horas.",
    },
    { name: "robots", content: "index, follow" },
  ],
};
