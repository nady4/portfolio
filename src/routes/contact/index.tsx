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
  const isEs = lang === "es";

  return (
    <>
      <Navbar />
      <main class="doc-page">
        <header class="doc-page__head">
          <div class="doc-page__back-row">
            <a href={homeHref}>&larr; {t.blog_back}</a>
            <Signal code="03 / 09" tone="purple">
              {isEs ? "canal abierto" : "open channel"}
            </Signal>
          </div>
          <h1>
            nady4 <span>/ {isEs ? "contacto" : "contact"}</span>
          </h1>
          <p class="doc-page__intro">
            {isEs
              ? "Disponible para productos full stack con IA, integraciones con LLM y automatización de flujos de trabajo."
              : "Available for AI full-stack products, LLM integrations, and workflow automation."}
          </p>
        </header>

        <div class="doc-prose">
          <section>
            <h2>{isEs ? "01 / Correo directo" : "01 / Direct email"}</h2>
            <p>
              {isEs
                ? "El canal principal para propuestas de trabajo, consultas técnicas y colaboraciones es"
                : "The primary channel for work proposals, technical questions, and collaborations is"}{" "}
              <a href="mailto:dev@nady4.com">dev@nady4.com</a>.
            </p>
            <p>
              {isEs
                ? "Ventana de respuesta estimada: 24—72 horas."
                : "Expected response window: 24—72 hours."}
            </p>
          </section>

          <section>
            <h2>
              {isEs ? "02 / Redes y perfiles" : "02 / Networks and profiles"}
            </h2>
            <ul>
              <li>
                GitHub: <a href="https://github.com/nady4">github.com/nady4</a>{" "}
                {isEs
                  ? "— código de proyectos y experimentos."
                  : "— project code and experiments."}
              </li>
              <li>
                LinkedIn:{" "}
                <a href="https://www.linkedin.com/in/nady4">
                  linkedin.com/in/nady4
                </a>{" "}
                {isEs
                  ? "— trayectoria y recomendaciones."
                  : "— career history and recommendations."}
              </li>
              <li>
                X: <a href="https://x.com/_nady4">@_nady4</a>{" "}
                {isEs
                  ? "— actualizaciones y notas breves."
                  : "— updates and short notes."}
              </li>
              <li>
                Instagram:{" "}
                <a href="https://www.instagram.com/nady4_dev">@nady4_dev</a>{" "}
                {isEs
                  ? "— detrás de escena del desarrollo."
                  : "— development behind the scenes."}
              </li>
            </ul>
          </section>

          <section>
            <h2>{isEs ? "03 / Currículum" : "03 / Resume"}</h2>
            <p>
              {isEs ? "Descargá el CV en" : "Download the resume in"}{" "}
              <a href="/cv-en.pdf">English</a> {isEs ? "o" : "or"}{" "}
              <a href="/cv-es.pdf">Español</a>.
            </p>
          </section>

          <section>
            <h2>{isEs ? "04 / Coordenadas" : "04 / Coordinates"}</h2>
            <p>
              {isEs
                ? "Buenos Aires, Argentina — trabajando remoto con equipos en cualquier zona horaria. Inglés (C2) y español nativo."
                : "Buenos Aires, Argentina — working remotely with teams in any timezone. English (C2) and native Spanish."}
            </p>
            <p>
              {isEs
                ? "Para consultas de prensa, privacidad o datos, usá el mismo correo; la política de privacidad del sitio está en"
                : "For press, privacy, or data questions use the same address; the site privacy policy lives at"}{" "}
              <a href={isEs ? "/es/privacy" : "/privacy"}>
                {isEs ? "política de privacidad" : "privacy policy"}
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
});

export const head: DocumentHead = {
  title: "Contact | Nadya Jerochim — Full Stack Engineer",
  meta: [
    {
      name: "description",
      content:
        "Contact Nadya Jerochim for AI full-stack products, LLM integrations, and workflow automation. Email dev@nady4.com — response within 24–72 hours.",
    },
    { name: "robots", content: "index, follow" },
  ],
};
