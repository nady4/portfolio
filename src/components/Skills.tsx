import { component$ } from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
import Signal from "./Signal";
import "../styles/Skills.scss";

export default component$(() => {
  const t = useTranslations().value;

  const skills = [
    {
      key: "languages",
      title: t.skill_category_languages,
      items: [
        "TypeScript",
        "JavaScript",
        "Python",
        "Java",
        "SQL",
        "HTML5",
        "CSS3",
        "SASS/SCSS"
      ]
    },
    {
      key: "frontend",
      title: t.skill_category_frontend,
      items: [
        "React",
        "Next.js",
        "Astro",
        "Vite",
        "Redux Toolkit",
        "TanStack Query",
        "Zustand",
        "Tailwind CSS"
      ]
    },
    {
      key: "backend",
      title: t.skill_category_backend,
      items: [
        "Node.js",
        "Express",
        "REST API Design",
        "Prisma ORM",
        "Cloudflare Workers",
        "Serverless",
        "JWT Auth",
        "OAuth2"
      ]
    },
    {
      key: "databases",
      title: t.skill_category_databases,
      items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "NoSQL"]
    },
    {
      key: "devops",
      title: t.skill_category_devops,
      items: [
        "Docker",
        "GitHub Actions",
        "CI/CD",
        "Cloudflare Firewall",
        "DNS",
        "Email Routing"
      ]
    },
    {
      key: "testing",
      title: t.skill_category_testing,
      items: ["Jest", "Cypress", "Vitest", "Playwright"]
    },
    {
      key: "tools",
      title: t.skill_category_tools,
      items: ["Git", "Figma", "n8n", "Notion", "Scrum", "Agile"]
    },
    {
      key: "ai",
      title: t.skill_category_ai,
      items: [
        "LLM APIs integration",
        "Prompt engineering",
        "Tool calling",
        "Agent orchestration",
        "MCP",
        "RAG",
        "Workflow automations"
      ]
    },
    {
      key: "spoken_languages",
      title: t.skill_category_spoken_languages,
      items: ["English (C2)", "Spanish (Native)"]
    }
  ];

  return (
    <section id="skills" class="skills-section section-shell">
      <header class="skills-head reveal">
        <Signal code="05 / 09" tone="purple">
          {t.skills_signal}
        </Signal>
        <h2>
          {t.skills_title}
          <span> {t.skills_suffix}</span>
        </h2>
      </header>

      <div class="skills-grid">
        {skills.map((category, index) => (
          <article class="skill-category reveal" key={category.key}>
            <div class="skill-category__top">
              <span>0{index + 1}</span>
              <span>INDEXED</span>
            </div>
            <h3>{category.title}</h3>
            <ul>
              {category.items.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
});
