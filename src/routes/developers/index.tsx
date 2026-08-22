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
            <Signal code="05 / 09" tone="purple">
              {isEs ? "portal de desarrolladores" : "developer portal"}
            </Signal>
          </div>
          <h1>
            nady4 <span>/ {isEs ? "desarrolladores" : "developers"}</span>
          </h1>
          <p class="doc-page__intro">
            {isEs
              ? "La superficie de API pública de nady4.com: documentación, spec OpenAPI y recursos legibles por máquinas."
              : "The public API surface of nady4.com: documentation, the OpenAPI spec, and machine-readable resources."}
          </p>
        </header>

        <div class="doc-prose">
          <section>
            <h2>{isEs ? "01 / Inicio rápido" : "01 / Quickstart"}</h2>
            <p>
              {isEs
                ? "La API es pública y no requiere clave, registro ni OAuth. Podés empezar de inmediato:"
                : "The API is public — no key, registration, or OAuth required. You can start immediately:"}
            </p>
            <pre>
              <code>{`curl -X POST https://www.nady4.com/api/newsletter \\
  -H "Content-Type: application/json" \\
  -d '{"email":"you@example.com"}'`}</code>
            </pre>
            <p>
              {isEs ? "Respuesta exitosa:" : "Successful response:"}{" "}
              <code>{'{ "ok": true }'}</code>
            </p>
          </section>

          <section>
            <h2>{isEs ? "02 / Endpoint" : "02 / Endpoint"}</h2>
            <h3>POST /api/newsletter</h3>
            <ul>
              <li>
                {isEs
                  ? "Suscribe una dirección de correo a la lista del newsletter."
                  : "Subscribes an email address to the newsletter list."}
              </li>
              <li>
                {isEs ? "Cuerpo (JSON):" : "Body (JSON):"}{" "}
                <code>{'{"email": "you@example.com"}'}</code>
              </li>
              <li>
                {isEs
                  ? "Idempotente: suscribir el mismo correo dos veces no genera duplicados."
                  : "Idempotent: subscribing the same address twice does not create duplicates."}
              </li>
            </ul>
            <h3>{isEs ? "Formato de errores" : "Error format"}</h3>
            <p>
              {isEs
                ? "Todos los errores son JSON con un código estable y una sugerencia de resolución:"
                : "All errors are JSON with a stable code and a resolution hint:"}
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
              {isEs ? "Códigos posibles:" : "Possible codes:"}{" "}
              <code>invalid_body</code>, <code>invalid_email</code>,{" "}
              <code>method_not_allowed</code>, <code>not_found</code>,{" "}
              <code>storage_failure</code>.
            </p>
          </section>

          <section>
            <h2>
              {isEs ? "03 / Spec y referencia" : "03 / Spec and reference"}
            </h2>
            <ul>
              <li>
                OpenAPI 3.1: <a href="/openapi.json">/openapi.json</a> ·{" "}
                <a href="/openapi.yaml">/openapi.yaml</a>{" "}
                {isEs
                  ? "— la definición completa de la API para herramientas y agentes."
                  : "— the full API definition for tooling and agents."}
              </li>
              <li>
                RFC 9728:{" "}
                <a href="/.well-known/oauth-protected-resource">
                  /.well-known/oauth-protected-resource
                </a>{" "}
                {isEs
                  ? "— metadatos del recurso protegido y alcances declarados."
                  : "— protected-resource metadata and declared scopes."}
              </li>
              <li>
                llms.txt: <a href="/llms.txt">/llms.txt</a>{" "}
                {isEs
                  ? "— guía del sitio para agentes."
                  : "— the agent-facing site guide."}
              </li>
              <li>
                Sitemap: <a href="/sitemap.xml">/sitemap.xml</a>{" "}
                {isEs
                  ? "— todas las URLs indexables."
                  : "— all indexable URLs."}
              </li>
            </ul>
          </section>

          <section>
            <h2>
              {isEs ? "04 / Sandbox y límites" : "04 / Sandbox and limits"}
            </h2>
            <p>
              {isEs
                ? "No hay entorno de staging separado: el endpoint de producción es también el sandbox, por lo que podés probar con tu propio correo sin riesgo. No hay límite de tasa documentado en el borde; si planeás suscribir muchos correos, avisá por"
                : "There is no separate staging environment: the production endpoint doubles as the sandbox, so you can test with your own address risk-free. There is no documented rate limit at the edge; if you plan to subscribe many addresses, give a heads-up via"}{" "}
              <a href="mailto:dev@nady4.com">dev@nady4.com</a>.
            </p>
            <p>
              {isEs
                ? "El contenido del sitio está licenciado como CC BY-SA 4.0; la API no requiere autenticación y todos los alcances declarados están vacíos por diseño (ver metadatos RFC 9728)."
                : "Site content is licensed CC BY-SA 4.0; the API requires no authentication and all declared scopes are empty by design (see the RFC 9728 metadata)."}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
});

export const head: DocumentHead = {
  title: "Developers | nady4.com — API Docs",
  meta: [
    {
      name: "description",
      content:
        "Developer portal for nady4.com: public keyless API quickstart, OpenAPI 3.1 spec, RFC 9728 scope metadata, and machine-readable resources for agents.",
    },
    { name: "robots", content: "index, follow" },
  ],
};
