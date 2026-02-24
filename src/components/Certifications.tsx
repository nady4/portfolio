import { component$ } from "@builder.io/qwik";
import "../styles/Certifications.scss";

interface Certification {
  title: string;
  institution: string;
}

export default component$(() => {
  const certifications: Certification[] = [
    {
      title: "Full Stack Developer",
      institution: "ZTM Academy",
    },
    {
      title: "Testing QA",
      institution: "Instituto Web",
    },
    {
      title: "UX Design",
      institution: "Platzi",
    },
    {
      title: "Scrum Foundation Professional",
      institution: "Certiprof",
    },
    {
      title: "English C2 Proficiency",
      institution: "EF Education First",
    },
  ];

  return (
    <div id="certifications" class="certifications-container">
      <h2>Certifications</h2>
      <div class="certifications-list">
        {certifications.map((cert, index) => (
          <div key={index} class="certifications-item">
            <h3>{cert.title}</h3>
            <p>{cert.institution}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
