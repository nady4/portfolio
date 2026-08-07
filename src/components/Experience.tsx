import { component$ } from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
import Signal from "./Signal";
import "../styles/Experience.scss";

export default component$(() => {
  const t = useTranslations().value;

  const experiences = [
    {
      title: t.experience_1_title,
      company: t.experience_1_company,
      period: t.experience_1_period,
      description: t.experience_1_desc,
    },
    {
      title: t.experience_2_title,
      company: t.experience_2_company,
      period: t.experience_2_period,
      description: t.experience_2_desc,
    },
  ];

  return (
    <section id="experience" class="experience-section section-shell">
      <header class="experience-head reveal">
        <Signal code="03 / 04" tone="red">
          {t.experience_signal}
        </Signal>
        <h2>
          {t.experience_title}
          <span> {t.experience_suffix}</span>
        </h2>
      </header>

      <div class="experience-list">
        {experiences.map((experience, index) => {
          const lines = experience.description
            .split("\n")
            .filter((line: string) => line.trim() !== "");

          return (
            <article class="experience-entry reveal" key={experience.title}>
              <div class="experience-entry__index" aria-hidden="true">
                0{index + 1}
              </div>
              <div class="experience-entry__body">
                <header>
                  <div>
                    <h3>{experience.title}</h3>
                    <h4>{experience.company}</h4>
                  </div>
                  <p class="experience-period">{experience.period}</p>
                </header>
                <ul>
                  {lines.map((line: string, lineIndex: number) => (
                    <li key={lineIndex}>
                      <span aria-hidden="true">+</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
});
