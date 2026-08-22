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
            <Signal code="05 / 09" tone="purple">
              portal de desarrolladores
            </Signal>
          </div>
          <h1>
            nady4 <span>/ desarrolladores</span>
          </h1>
          <p class="doc-page__intro">
            La superficie de API pública de nady4.com: documentación, spec
            OpenAPI y recursos legibles por máquinas.
          </p>
        </header>

        <div class="doc-prose">
          <section>
            <h2>01 / Inicio rápido</h2>
            <p>
              La API es pública y no requiere clave, registro ni OAuth. Podés
              empezar de inmediato:
            </p>
            <pre>
              <code>{`curl -X POST https://www.nady4.com/api/newsletter \\
  -H "Content-Type: application/json" \\
  -d '{"email":"you@example.com"}'`}</code>
            </pre>
            <p>
              Respuesta exitosa: <code>{'{ "ok": true }'}</code>
            </p>
          </section>

          <section>
            <h2>02 / Endpoint</h2>
            <h3>POST /api/newsletter</h3>
            <ul>
              <li>
                Suscribe una dirección de correo a la lista del newsletter.
              </li>
              <li>
                Cuerpo (JSON): <code>{'{"email": "you@example.com"}'}</code>
              </li>
              <li>
                Idempotente: suscribir el mismo correo dos veces no genera
                duplicados.
              </li>
            </ul>
            <h3>Formato de errores</h3>
            <p>
              Todos los errores son JSON con un código estable y una sugerencia
              de resolución:
            </p>
            <pre>
              <code>{`{
  "ok": false,
  "message": "invalid_email",
  "error": {
    "code": "invalid_email",
    "message": "The 'email' field is missing or not a valid email address.",
    "hint": "Use a valid address like you@example.com (max 254 characters)."
  }
}`}</code>
            </pre>
            <p>
              Códigos posibles: <code>invalid_body</code>,{" "}
              <code>invalid_email</code>, <code>method_not_allowed</code>,{" "}
              <code>not_found</code>, <code>storage_failure</code>.
            </p>
          </section>

          <section>
            <h2>03 / Spec y referencia</h2>
            <ul>
              <li>
                OpenAPI 3.1: <a href="/openapi.json">/openapi.json</a> ·{" "}
                <a href="/openapi.yaml">/openapi.yaml</a> — la definición
                completa de la API para herramientas y agentes.
              </li>
              <li>
                RFC 9728:{" "}
                <a href="/.well-known/oauth-protected-resource">
                  /.well-known/oauth-protected-resource
                </a>{" "}
                — metadatos del recurso protegido y alcances declarados.
              </li>
              <li>
                llms.txt: <a href="/llms.txt">/llms.txt</a> — guía del sitio
                para agentes.
              </li>
              <li>
                Sitemap: <a href="/sitemap.xml">/sitemap.xml</a> — todas las
                URLs indexables.
              </li>
            </ul>
          </section>

          <section>
            <h2>04 / Sandbox y límites</h2>
            <p>
              No hay entorno de staging separado: el endpoint de producción es
              también el sandbox, por lo que podés probar con tu propio correo
              sin riesgo. No hay límite de tasa documentado en el borde; si
              planeás suscribir muchos correos, avisá por{" "}
              <a href="mailto:dev@nady4.com">dev@nady4.com</a>.
            </p>
            <p>
              El contenido del sitio está licenciado como CC BY-SA 4.0; la API
              no requiere autenticación y todos los alcances declarados están
              vacíos por diseño (ver metadatos RFC 9728).
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
});

export const head: DocumentHead = {
  title: "Desarrolladores | nady4.com — Documentación API",
  meta: [
    {
      name: "description",
      content:
        "Portal de desarrolladores de nady4.com: inicio rápido de API pública sin claves, spec OpenAPI 3.1, metadatos de alcances RFC 9728 y recursos legibles por máquinas.",
    },
    { name: "robots", content: "index, follow" },
  ],
};
