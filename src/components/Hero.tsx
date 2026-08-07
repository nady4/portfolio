import { component$ } from "@builder.io/qwik";
import { useTranslations, useLocale } from "~/routes/layout";
import devImage from "~/assets/dev.png?url";
import Signal from "./Signal";
import "../styles/Hero.scss";

export default component$(() => {
  const t = useTranslations().value;
  const lang = useLocale().value;
  const [firstName, ...rest] = t.hero_title.split(" ");
  const lastName = rest.join(" ");
  const projectsHref = lang === "es" ? "/es/#projects" : "/#projects";
  const resumeFile = lang === "es" ? "/cv-es.pdf" : "/cv-en.pdf";

  return (
    <section id="home" class="hero-section section-shell">
      <aside class="hero__serial" aria-hidden="true">
        <span>ARCHIVE / 001</span>
        <span>25° 20′ S</span>
        <span>BUENOS AIRES</span>
      </aside>

      <div class="hero__copy reveal">
        <Signal code="N4.000" tone="purple">
          {t.hero_signal}
        </Signal>
        <p class="hero__kicker">{t.hero_kicker}</p>
        <h1>
          <span>{firstName}</span>
          <span class="hero__title-serif">{lastName}</span>
        </h1>
        <p class="hero__role">
          {t.hero_subtitle} <span aria-hidden="true">/</span>{" "}
          {t.hero_role_detail}
        </p>
        <p class="hero__description">{t.hero_desc}</p>
        <div class="hero__actions">
          <a class="hero__button hero__button--primary" href={projectsHref}>
            {t.nav_projects} <span aria-hidden="true">↘</span>
          </a>
          <a class="hero__button hero__button--text" href={resumeFile} download>
            {t.nav_resume} <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div class="hero__footnote">
          <span>{t.hero_footnote}</span>
          <span class="hero__footnote-line" aria-hidden="true" />
          <span>2026 / 01</span>
        </div>
      </div>

      <figure class="hero__figure reveal">
        <div class="hero__image-frame">
          <img
            src={devImage}
            width={450}
            height={450}
            fetchPriority="high"
            alt={t.hero_image_alt}
          />
          <div class="hero__scanlines" aria-hidden="true" />
          <div class="hero__artifacts" aria-hidden="true">
            <span class="pixel pixel--one" />
            <span class="pixel pixel--two" />
            <span class="pixel pixel--three" />
            <span class="pixel pixel--four" />
            <span class="pixel pixel--five" />
            <span class="pixel pixel--six" />
            <span class="pixel pixel--seven" />
          </div>
          <span class="hero__crosshair hero__crosshair--top" aria-hidden="true">
            +
          </span>
          <span
            class="hero__crosshair hero__crosshair--bottom"
            aria-hidden="true"
          >
            +
          </span>
        </div>
        <figcaption class="hero__caption">
          <span>PORTRAIT / RAW SIGNAL</span>
          <span>IMG_001 / 1BIT</span>
        </figcaption>
      </figure>

      <div class="hero__status" aria-label="System status">
        <Signal code="SYS" tone="green">
          {t.hero_status_label}
        </Signal>
        <p>{t.hero_status}</p>
        <span class="hero__status-code">01101001 01101110 01100100</span>
      </div>
    </section>
  );
});
