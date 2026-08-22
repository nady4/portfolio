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
            <Signal code="02 / 09" tone="purple">
              {isEs ? "perfil profesional" : "professional profile"}
            </Signal>
          </div>
          <h1>
            nady4 <span>/ {isEs ? "sobre mí" : "about"}</span>
          </h1>
          <p class="doc-page__intro">
            {isEs
              ? "Ingeniera Full Stack que construye productos de principio a fin, con foco en integraciones con IA y sistemas que llegan a producción."
              : "Full Stack Engineer who builds products end-to-end, focused on AI integrations and systems that reach production."}
          </p>
        </header>

        <div class="doc-prose">
          <section>
            <h2>{isEs ? "01 / Quién soy" : "01 / Who I am"}</h2>
            <p>
              {isEs
                ? "Soy Nadya Jerochim, ingeniera full stack con base en Buenos Aires, Argentina. Mi trabajo conecta APIs de LLM y agentes con interfaces React o Next.js, servicios Node.js, bases de datos, APIs externas y flujos de negocio reales. El foco no es la demo: son features de IA en producción, asistentes inteligentes, tool calling, orquestación y automatización que la gente puede usar."
                : "I am Nadya Jerochim, a full stack engineer based in Buenos Aires, Argentina. My work connects LLM APIs and agents to React or Next.js interfaces, Node.js services, databases, external APIs, and real business workflows. The focus is not the demo: it is AI features in production, intelligent assistants, tool calling, orchestration, and automation that people can actually use."}
            </p>
            <p>
              {isEs
                ? "Trabajo como Full Stack Engineer en Transistemas, donde diseño y desarrollo aplicaciones full stack para clientes y ONG, modernizo infraestructura digital y lidero iniciativas de ciberseguridad, observabilidad y despliegue automatizado."
                : "I work as a Full Stack Engineer at Transistemas, where I design and build full-stack applications for clients and NGOs, modernize digital infrastructure, and lead cybersecurity, observability, and automated deployment initiatives."}
            </p>
          </section>

          <section>
            <h2>{isEs ? "02 / En qué me enfoco" : "02 / What I focus on"}</h2>
            <ul>
              <li>
                {isEs
                  ? "Productos full stack con IA: de la idea a producción, incluyendo arquitectura, base de datos, API y UX."
                  : "AI-enabled full-stack products: from idea to production, including architecture, database, API, and UX."}
              </li>
              <li>
                {isEs
                  ? "Integraciones con LLM: APIs de modelos, tool calling, agentes, MCP, RAG y automatización de flujos."
                  : "LLM integrations: model APIs, tool calling, agents, MCP, RAG, and workflow automation."}
              </li>
              <li>
                {isEs
                  ? "REST APIs y arquitecturas serverless (Cloudflare Workers, Vercel Edge, Node.js)."
                  : "REST APIs and serverless architectures (Cloudflare Workers, Vercel Edge, Node.js)."}
              </li>
              <li>
                {isEs
                  ? "E-commerce full stack: catálogos, carritos persistentes, pagos (Mercado Pago) y seguimiento de pedidos."
                  : "Full-stack e-commerce: catalogs, persistent carts, payments (Mercado Pago), and order tracking."}
              </li>
            </ul>
          </section>

          <section>
            <h2>{isEs ? "03 / Trayectoria" : "03 / Background"}</h2>
            <p>
              {isEs
                ? "Estudié la Licenciatura en Sistemas en la Universidad Nacional de Lanús (2019–2025) y me certifiqué en desarrollo full stack, testing QA, UX design y Scrum. Hablo español nativo e inglés con nivel C2."
                : "I studied for a Bachelor of Information Systems at the National University of Lanús (2019–2025) and hold certifications in full stack development, QA testing, UX design, and Scrum. I speak native Spanish and English at C2 level."}
            </p>
            <p>
              {isEs
                ? "Publico notas técnicas sobre ingeniería de productos con IA en el blog de este sitio, en inglés y español."
                : "I publish technical writing on AI product engineering on this site's blog, in English and Spanish."}
            </p>
          </section>

          <section>
            <h2>
              {isEs ? "04 / Cómo trabajar conmigo" : "04 / How to work with me"}
            </h2>
            <p>
              {isEs
                ? "Estoy disponible para proyectos full stack con IA, integraciones con LLM y automatización. Escribime a"
                : "I am available for AI full-stack projects, LLM integrations, and automation work. Write to me at"}{" "}
              <a href="mailto:dev@nady4.com">dev@nady4.com</a>{" "}
              {isEs ? "o usá la" : "or use the"}{" "}
              <a href={isEs ? "/es/contact" : "/contact"}>
                {isEs ? "página de contacto" : "contact page"}
              </a>
              {isEs
                ? ". También podés descargar mi CV:"
                : ". You can also download my resume:"}{" "}
              <a href="/cv-en.pdf">EN</a> / <a href="/cv-es.pdf">ES</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
});

export const head: DocumentHead = {
  title: "About | Nadya Jerochim — Full Stack Engineer",
  meta: [
    {
      name: "description",
      content:
        "About Nadya Jerochim, Full Stack Engineer in Buenos Aires: AI product engineering, LLM integrations, agents, full-stack e-commerce, and systems architecture.",
    },
    { name: "robots", content: "index, follow" },
  ],
};
