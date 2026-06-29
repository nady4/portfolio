import { component$ } from "@builder.io/qwik";
import { useTranslations, useLocale } from "~/routes/layout";
import devImage from "~/assets/dev.png?url";
import "../styles/Hero.scss";

export default component$(() => {
  const t = useTranslations().value;
  const lang = useLocale().value;

  return (
    <section id="home" class="hero-container">
      <div class="hero-left">
        <h1>{t.hero_title}</h1>
        <h2>{t.hero_subtitle}</h2>
        <p>{t.hero_desc}</p>
        <div class="hero-cta">
          <a href="/#projects" class="hero-btn primary">
            {t.nav_projects} →
          </a>
          <a
            href={lang === "es" ? "/cv-es.pdf" : "/cv-en.pdf"}
            download
            class="hero-btn ghost"
          >
            {t.nav_resume}
          </a>
        </div>
      </div>
      <div class="hero-right">
        <div class="hero-glow" />
        <img src={devImage} width={450} height={450} alt="Developer" />
      </div>
    </section>
  );
});
