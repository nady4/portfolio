import { component$ } from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
import "../styles/Experience.scss";

export default component$(() => {
  const t = useTranslations().value;

  const experience1Lines = t.experience_1_desc
    .split("\n")
    .filter((line: string) => line.trim() !== "");

  const experience2Lines = t.experience_2_desc
    .split("\n")
    .filter((line: string) => line.trim() !== "");

  return (
    <div id="experience" class="experience-container">
      <h2>{t.experience_title}</h2>
      <div class="experience-item">
        <h3>{t.experience_1_title}</h3>
        <h4>{t.experience_1_company}</h4>
        <p class="experience-period">{t.experience_1_period}</p>
        <ul class="experience-list">
          {experience1Lines.map((line: string, index: number) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div>
      <div class="experience-item">
        <h3>{t.experience_2_title}</h3>
        <h4>{t.experience_2_company}</h4>
        <p class="experience-period">{t.experience_2_period}</p>
        <ul class="experience-list">
          {experience2Lines.map((line: string, index: number) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
});
