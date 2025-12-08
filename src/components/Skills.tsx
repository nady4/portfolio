import { component$ } from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
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
        "SQL",
        "Java",
        "Python",
        "HTML5",
        "CSS3",
        "SASS/SCSS",
      ],
    },
    {
      key: "frontend",
      title: t.skill_category_frontend,
      items: [
        "React",
        "Next.js",
        "Redux Toolkit",
        "React Query",
        "Tailwind CSS",
        "Vite",
      ],
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
        "JWT Auth",
        "OAuth2",
      ],
    },
    {
      key: "databases",
      title: t.skill_category_databases,
      items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "NoSQL"],
    },
    {
      key: "devops",
      title: t.skill_category_devops,
      items: [
        "Docker",
        "GitHub Actions",
        "Cloudflare (DNS, Workers, Firewall, Email Routing)",
      ],
    },
    {
      key: "testing",
      title: t.skill_category_testing,
      items: ["Jest", "Cypress", "Vitest", "Playwright"],
    },
    {
      key: "tools",
      title: t.skill_category_tools,
      items: ["Git", "Figma", "Notion", "Scrum", "Agile"],
    },
    {
      key: "spoken_languages",
      title: t.skill_category_spoken_languages,
      items: ["English (C2)", "Spanish (Native)"],
    },
  ];

  return (
    <div id="skills" class="skills-container">
      <h2>{t.skills_title}</h2>
      <div class="skills-grid">
        {skills.map((category) => (
          <div key={category.key} class="skill-category">
            <h3>{category.title}</h3>
            <div class="skill-items">
              {category.items.map((skill, index) => (
                <span key={index} class="skill-item">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
