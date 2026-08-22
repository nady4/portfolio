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
            <Signal code="04 / 09" tone="purple">
              {isEs ? "política de datos" : "data policy"}
            </Signal>
          </div>
          <h1>
            nady4 <span>/ {isEs ? "privacidad" : "privacy"}</span>
          </h1>
          <p class="doc-page__intro">
            {isEs
              ? "Qué datos se recopilan en este sitio y cómo se usan. Actualizado el 22 de agosto de 2026."
              : "What data this site collects and how it is used. Last updated August 22, 2026."}
          </p>
        </header>

        <div class="doc-prose">
          <section>
            <h2>{isEs ? "01 / Newsletter" : "01 / Newsletter"}</h2>
            <p>
              {isEs
                ? "Si te suscribís, guardamos tu dirección de correo en una base de datos remota (Upstash Redis) con el único propósito de enviarte avisos de nuevas publicaciones. No se comparte, no se vende y no se usa para nada más."
                : "If you subscribe, we store your email address in a remote database (Upstash Redis) for the single purpose of sending you notices of new posts. It is not shared, not sold, and used for nothing else."}
            </p>
            <p>
              {isEs
                ? "Podés darte de baja en cualquier momento respondiendo a cualquier correo del newsletter. La lista solo contiene direcciones; no se registra cuándo ni cuántas veces abrís los correos."
                : "You can unsubscribe at any time by replying to any newsletter email. The list only holds addresses; we do not track when or how often you open emails."}
            </p>
          </section>

          <section>
            <h2>{isEs ? "02 / Datos técnicos" : "02 / Technical data"}</h2>
            <ul>
              <li>
                {isEs
                  ? "Tema claro/oscuro: se guarda en localStorage de tu navegador y nunca sale de tu dispositivo."
                  : "Light/dark theme: stored in your browser's localStorage and never leaves your device."}
              </li>
              <li>
                {isEs
                  ? "Logs del servidor: la infraestructura (Vercel, Cloudflare) puede registrar direcciones IP y rutas solicitadas con fines de seguridad y operación."
                  : "Server logs: the infrastructure (Vercel, Cloudflare) may log IP addresses and requested paths for security and operational purposes."}
              </li>
              <li>
                {isEs
                  ? "Cookies: el sitio no usa cookies de seguimiento ni publicidad."
                  : "Cookies: the site uses no tracking or advertising cookies."}
              </li>
            </ul>
          </section>

          <section>
            <h2>
              {isEs ? "03 / Publicación de datos" : "03 / Data disclosure"}
            </h2>
            <p>
              {isEs
                ? "La información pública de contacto (correo dev@nady4.com, redes sociales) está publicada intencionalmente para permitir contacto profesional, y también se expone en formato estructurado JSON-LD para agentes e indexadores."
                : "Public contact information (dev@nady4.com, social profiles) is intentionally published to enable professional contact, and is also exposed in structured JSON-LD format for agents and indexers."}
            </p>
          </section>

          <section>
            <h2>
              {isEs ? "04 / Contacto de privacidad" : "04 / Privacy contact"}
            </h2>
            <p>
              {isEs
                ? "Por cualquier consulta sobre tus datos:"
                : "For any question about your data:"}{" "}
              <a href="mailto:dev@nady4.com">dev@nady4.com</a>.{" "}
              {isEs
                ? "Datos personales: Nadya Jerochim, Buenos Aires, Argentina."
                : "Data controller: Nadya Jerochim, Buenos Aires, Argentina."}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
});

export const head: DocumentHead = {
  title: "Privacy Policy | nady4.com",
  meta: [
    {
      name: "description",
      content:
        "Privacy policy for nady4.com: what data the newsletter stores, technical data handling, and how to contact the data controller.",
    },
    { name: "robots", content: "index, follow" },
  ],
};
