import { component$ } from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
import "../styles/Projects.scss";

export default component$(() => {
  const t = useTranslations().value;

  return (
    <div id="projects" class="projects-container">
      <h1>{t.projects_title}</h1>
      <div class="projects-list">
        <div class="project">
          <h2>🐱 Nya Store</h2>
          <p>{t.project_nya_desc}</p>
          <div class="links-container">
            <a href="https://nya.nady4.com" target="_blank">
              Demo
            </a>
            <a href="https://github.com/nady4/nya-store" target="_blank">
              Repo
            </a>
          </div>
        </div>
        <div class="project">
          <h2>💸 Calendar Money</h2>
          <p>{t.project_calendar_desc}</p>
          <div class="links-container">
            <a href="https://money.nady4.com" target="_blank">
              Demo
            </a>
            <a href="https://github.com/nady4/calendar-money" target="_blank">
              Repo Front
            </a>
            <a
              href="https://github.com/nady4/calendar-money-api"
              target="_blank"
            >
              Repo Back
            </a>
          </div>
        </div>
        <div class="project">
          <h2>👁️ DNS Monitor</h2>
          <p>{t.project_dns_desc}</p>
          <div class="links-container">
            <a
              href="https://github.com/Transistemas-ac/dns-monitor"
              target="_blank"
            >
              Repo
            </a>
          </div>
        </div>
        <div class="project">
          <h2>🔗 DS Invite</h2>
          <p>{t.project_ds_desc}</p>
          <div class="links-container">
            <a href="https://ds.transistemas.com" target="_blank">
              Demo
            </a>
            <a
              href="https://github.com/Transistemas-ac/ds-invite"
              target="_blank"
            >
              Repo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
