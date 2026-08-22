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
            <Signal code="04 / 09" tone="purple">
              política de datos
            </Signal>
          </div>
          <h1>
            nady4 <span>/ privacidad</span>
          </h1>
          <p class="doc-page__intro">
            Qué datos se recopilan en este sitio y cómo se usan. Actualizado el
            22 de agosto de 2026.
          </p>
        </header>

        <div class="doc-prose">
          <section>
            <h2>01 / Newsletter</h2>
            <p>
              Si te suscribís, guardamos tu dirección de correo en una base de
              datos remota (Upstash Redis) con el único propósito de enviarte
              avisos de nuevas publicaciones. No se comparte, no se vende y no
              se usa para nada más.
            </p>
            <p>
              Podés darte de baja en cualquier momento respondiendo a cualquier
              correo del newsletter. La lista solo contiene direcciones; no se
              registra cuándo ni cuántas veces abrís los correos.
            </p>
          </section>

          <section>
            <h2>02 / Datos técnicos</h2>
            <ul>
              <li>
                Tema claro/oscuro: se guarda en localStorage de tu navegador y
                nunca sale de tu dispositivo.
              </li>
              <li>
                Logs del servidor: la infraestructura (Vercel, Cloudflare) puede
                registrar direcciones IP y rutas solicitadas con fines de
                seguridad y operación.
              </li>
              <li>
                Cookies: el sitio no usa cookies de seguimiento ni publicidad.
              </li>
            </ul>
          </section>

          <section>
            <h2>03 / Publicación de datos</h2>
            <p>
              La información pública de contacto (correo dev@nady4.com, redes
              sociales) está publicada intencionalmente para permitir contacto
              profesional, y también se expone en formato estructurado JSON-LD
              para agentes e indexadores.
            </p>
          </section>

          <section>
            <h2>04 / Contacto de privacidad</h2>
            <p>
              Por cualquier consulta sobre tus datos:{" "}
              <a href="mailto:dev@nady4.com">dev@nady4.com</a>. Datos
              personales: Nadya Jerochim, Buenos Aires, Argentina.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
});

export const head: DocumentHead = {
  title: "Política de Privacidad | nady4.com",
  meta: [
    {
      name: "description",
      content:
        "Política de privacidad de nady4.com: qué datos guarda el newsletter, manejo de datos técnicos y cómo contactar al responsable de datos.",
    },
    { name: "robots", content: "index, follow" },
  ],
};
