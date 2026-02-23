import { component$ } from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
import "../styles/Education.scss";

export default component$(() => {
  const t = useTranslations().value;

  const education = [
    {
      key: "university",
      title: t.education_university,
      items: [
        {
          degree: t.education_university,
          institution: "Universidad Nacional de Lanús",
          year: "2019 - 2025",
        },
      ],
    },
    {
      key: "highschool",
      title: t.education_highschool,
      items: [
        {
          degree: t.education_highschool,
          institution: "Colegio Jesús María",
          year: "2011 - 2017",
        },
      ],
    },
  ];

  return (
    <div id="education" class="education-container">
      <h2>{t.education_title}</h2>
      <div class="education-list">
        {education.map((edu) => (
          <div key={edu.key} class="education-item">
            <h3>{edu.title}</h3>
            {edu.items.map((item, index) => (
              <div key={index} class="education-detail">
                <p>{item.institution}</p>
                <span>{item.year}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});
