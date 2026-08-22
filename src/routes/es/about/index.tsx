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
            <Signal code="02 / 09" tone="purple">
              perfil profesional
            </Signal>
          </div>
          <h1>
            nady4 <span>/ sobre mí</span>
          </h1>
          <p class="doc-page__intro">
            Ingeniera Full Stack que construye productos de principio a fin, con
            foco en integraciones con IA y sistemas que llegan a producción.
          </p>
        </header>

        <div class="doc-prose">
          <section>
            <h2>01 / Quién soy</h2>
            <p>
              Soy Nadya Jerochim, ingeniera full stack con base en Buenos Aires,
              Argentina. Mi trabajo conecta APIs de LLM y agentes con interfaces
              React o Next.js, servicios Node.js, bases de datos, APIs externas
              y flujos de negocio reales. El foco no es la demo: son features de
              IA en producción, asistentes inteligentes, tool calling,
              orquestación y automatización que la gente puede usar.
            </p>
            <p>
              Trabajo como Full Stack Engineer en Transistemas, donde diseño y
              desarrollo aplicaciones full stack para clientes y ONG, modernizo
              infraestructura digital y lidero iniciativas de ciberseguridad,
              observabilidad y despliegue automatizado.
            </p>
          </section>

          <section>
            <h2>02 / En qué me enfoco</h2>
            <ul>
              <li>
                Productos full stack con IA: de la idea a producción, incluyendo
                arquitectura, base de datos, API y UX.
              </li>
              <li>
                Integraciones con LLM: APIs de modelos, tool calling, agentes,
                MCP, RAG y automatización de flujos.
              </li>
              <li>
                REST APIs y arquitecturas serverless (Cloudflare Workers, Vercel
                Edge, Node.js).
              </li>
              <li>
                E-commerce full stack: catálogos, carritos persistentes, pagos
                (Mercado Pago) y seguimiento de pedidos.
              </li>
            </ul>
          </section>

          <section>
            <h2>03 / Trayectoria</h2>
            <p>
              Estudié la Licenciatura en Sistemas en la Universidad Nacional de
              Lanús (2019–2025) y me certifiqué en desarrollo full stack,
              testing QA, UX design y Scrum. Hablo español nativo e inglés con
              nivel C2.
            </p>
            <p>
              Publico notas técnicas sobre ingeniería de productos con IA en el
              blog de este sitio, en inglés y español.
            </p>
          </section>

          <section>
            <h2>04 / Cómo trabajar conmigo</h2>
            <p>
              Estoy disponible para proyectos full stack con IA, integraciones
              con LLM y automatización. Escribime a{" "}
              <a href="mailto:dev@nady4.com">dev@nady4.com</a> o usá la{" "}
              <a href="/es/contact">página de contacto</a>. También podés
              descargar mi CV: <a href="/cv-en.pdf">EN</a> /{" "}
              <a href="/cv-es.pdf">ES</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
});

export const head: DocumentHead = {
  title: "Sobre mí | Nadya Jerochim — Ingeniera Full Stack",
  meta: [
    {
      name: "description",
      content:
        "Sobre Nadya Jerochim, ingeniera full stack en Buenos Aires: ingeniería de productos con IA, integraciones con LLM, agentes, e-commerce full stack y arquitectura de sistemas.",
    },
    { name: "robots", content: "index, follow" },
  ],
};
