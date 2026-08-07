import { component$ } from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
import Signal from "./Signal";
import "../styles/Certifications.scss";

interface Certification {
  title: string;
  institution: string;
}

export default component$(() => {
  const t = useTranslations().value;
  const certifications: Certification[] = [
    { title: "Full Stack Developer", institution: "ZTM Academy" },
    { title: "Testing QA", institution: "Instituto Web" },
    { title: "UX Design", institution: "Platzi" },
    { title: "Scrum Foundation Professional", institution: "Certiprof" },
    { title: "English C2 Proficiency", institution: "EF Education First" },
  ];

  return (
    <section id="certifications" class="certifications-section section-shell">
      <header class="certifications-head reveal">
        <Signal code="06 / 09" tone="red">
          {t.certifications_signal}
        </Signal>
        <h2>
          {t.nav_certifications}
          <span> {t.certifications_suffix}</span>
        </h2>
      </header>

      <ol class="certifications-list">
        {certifications.map((certification, index) => (
          <li class="certification-entry reveal" key={certification.title}>
            <span class="certification-entry__index">0{index + 1}</span>
            <h3>{certification.title}</h3>
            <p>{certification.institution}</p>
            <span class="certification-entry__status">
              {t.certifications_status}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
});
