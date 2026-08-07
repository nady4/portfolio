import { component$ } from "@builder.io/qwik";
import { useTranslations, useLocale } from "~/routes/layout";
import Signal from "./Signal";
import "../styles/Education.scss";

export default component$(() => {
  const t = useTranslations().value;
  const lang = useLocale().value;

  const education = [
    {
      title: t.education_university,
      institution:
        lang === "en"
          ? "National University of Lanús"
          : "Universidad Nacional de Lanús",
      year: "2019 - 2025",
    },
    {
      title: t.education_highschool,
      institution: "Colegio Jesús María",
      year: "2011 - 2017",
    },
  ];

  return (
    <section id="education" class="education-section section-shell">
      <header class="education-head reveal">
        <Signal code="04 / 04" tone="green">
          {t.education_signal}
        </Signal>
        <h2>
          {t.education_title}
          <span> {t.education_suffix}</span>
        </h2>
      </header>

      <div class="education-list">
        {education.map((item, index) => (
          <article class="education-entry reveal" key={item.title}>
            <span class="education-entry__index">0{index + 1}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.institution}</p>
            </div>
            <time>{item.year}</time>
          </article>
        ))}
      </div>
    </section>
  );
});
