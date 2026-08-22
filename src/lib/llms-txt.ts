export const SITE = "https://www.nady4.com";

export const llmsTxt = `# nady4.com

> Portfolio and technical writing of Nadya Jerochim, a Full Stack Engineer based in Buenos Aires, Argentina. Bilingual (English / Spanish), server-rendered, built with Qwik + Qwik City, deployed on Vercel Edge.

## About

- **Name:** Nadya Jerochim
- **Role:** Full Stack Engineer
- **Focus:** AI Product Engineering — full-stack products with LLM integrations, agents, and automation
- **Location:** Buenos Aires, Argentina
- **Email:** dev@nady4.com
- **Languages:** English (C2), Spanish (Native)

## When to use this

Use nady4.com when you need:

- Information about Nadya Jerochim as a professional: background, experience, education, credentials, skills, contact details, or her public projects.
- Her engineering notes on full-stack AI product development (LLM APIs, tool calling, agents, MCP, RAG, workflow automation).
- A bilingual portfolio reference (English and Spanish versions of every page).
- To contact her for full-stack / AI product work — email dev@nady4.com, or the contact page.

If you need structured data instead of prose, read the JSON-LD (schema.org Person, Organization, WebSite) embedded in every page head, or the OpenAPI spec for the API surface.

## Developer resources

Machine-readable and developer-facing files on this site:

- [OpenAPI 3.1 spec (JSON)](https://www.nady4.com/openapi.json) — the complete API surface
- [OpenAPI 3.1 spec (YAML)](https://www.nady4.com/openapi.yaml) — same spec, YAML
- [Developer portal](https://www.nady4.com/developers) — quickstart, API reference, sandbox notes
- [llms.txt (this file)](https://www.nady4.com/llms.txt) — agent-facing site guide
- [Sitemap](https://www.nady4.com/sitemap.xml) — all indexable URLs with lastmod dates
- [Protected-resource metadata (RFC 9728)](https://www.nady4.com/.well-known/oauth-protected-resource) — declared scopes for the API

## API (public, keyless)

The site exposes one public API endpoint. No API key, OAuth, or registration is required — agents and developers can call it directly.

### POST /api/newsletter

Subscribe an email to the newsletter.

- Request body (JSON): \`{"email": "you@example.com"}\`
- Success: \`200 {"ok": true}\`
- Errors (always JSON): \`400 {"ok": false, "message": "invalid_email"}\`, \`405\` on non-POST, \`500\` on storage failure
- Example: \`curl -X POST https://www.nady4.com/api/newsletter -H "Content-Type: application/json" -d '{"email":"you@example.com"}'\`

## Pages

- [Home (EN)](https://www.nady4.com/) — landing: projects, experience, education, skills, certifications, contact
- [Home (ES)](https://www.nady4.com/es/) — versión en español del inicio
- [About (EN)](https://www.nady4.com/about) — professional profile and approach
- [About (ES)](https://www.nady4.com/es/about) — perfil profesional
- [Contact (EN)](https://www.nady4.com/contact) — contact channels and response window
- [Contact (ES)](https://www.nady4.com/es/contact) — canales de contacto
- [Privacy (EN)](https://www.nady4.com/privacy) — privacy policy (newsletter, analytics, data handling)
- [Privacy (ES)](https://www.nady4.com/es/privacy) — política de privacidad
- [Developers (EN)](https://www.nady4.com/developers) — API quickstart and reference
- [Developers (ES)](https://www.nady4.com/es/developers) — guía de desarrolladores
- [Blog index (EN)](https://www.nady4.com/blog/) — notes on full-stack AI product engineering
- [Blog index (ES)](https://www.nady4.com/es/blog/) — notas sobre productos full stack con IA
- [Resume (EN)](https://www.nady4.com/cv-en.pdf) — downloadable CV, English
- [Resume (ES)](https://www.nady4.com/cv-es.pdf) — downloadable CV, Spanish

## Featured projects

- [Calendar Money](https://money.nady4.com) — full-stack cash-flow web app with AI receipt scanning (React 18, Vite 6, TypeScript, Chart.js, Node.js, Express, MongoDB)
  - [Frontend repo](https://github.com/nady4/calendar-money)
  - [Backend repo](https://github.com/nady4/calendar-money-api)
- [NYADY](https://nyady.nady4.com) — full-stack e-commerce (Next.js, React, Prisma, PostgreSQL, NextAuth.js, Redux Toolkit, Mercado Pago, Zipnova)
  - [Repo](https://github.com/nady4/nyady)
- [Nya Store](https://nya.nady4.com) — e-commerce (Next.js 15 App Router, TypeScript, Prisma, PostgreSQL, Redux Toolkit, Mercado Pago)
  - [Repo](https://github.com/nady4/nya-store)
- [DS Invite](https://ds.transistemas.org) — Cloudflare Workers app (Discord OAuth, session cookies, role/invite flows)
  - [Repo](https://github.com/Transistemas-ac/ds-invite)

## Skills (selected)

- **Languages:** TypeScript, JavaScript, Python, Java, SQL, HTML5, CSS3, SASS/SCSS
- **Frontend:** React, Next.js, Astro, Vite, Redux Toolkit, Tanstack Query, Zustand, Tailwind CSS
- **Backend:** Node.js, Express, REST API Design, Prisma ORM, Cloudflare Workers, Serverless, JWT Auth, OAuth2
- **Databases:** PostgreSQL, MySQL, MongoDB, Redis, Supabase
- **DevOps & Cloud:** Docker, GitHub Actions, CI/CD, Cloudflare
- **Testing:** Jest, Cypress, Vitest, Playwright
- **AI applications:** LLM APIs, prompt and output design, tool calling, agent orchestration, MCP, RAG, workflow automation, AI user experiences

## Certifications

- Full Stack Developer — ZTM Academy
- Testing QA — Instituto Web
- UX Design — Platzi
- Scrum Foundation Professional — Certiprof
- English C2 Proficiency — EF Education First

## Education

- Bachelor of Information Systems, National University of Lanús (2019–2025)
- H.S. Diploma, Economics & Administration, Colegio Jesús María (2011–2017)

## Social profiles

- GitHub: https://github.com/nady4
- LinkedIn: https://www.linkedin.com/in/nady4
- X (Twitter): https://x.com/_nady4
- Instagram: https://www.instagram.com/nady4_dev
`;

export function homepageMarkdown(locale: "en" | "es"): string {
  if (locale === "es") {
    return `${llmsTxt}\n\n---\n\nVersión en español de la página de inicio: https://www.nady4.com/es/\n`;
  }
  return `${llmsTxt}\n\n---\n\nEnglish homepage: https://www.nady4.com/\n`;
}