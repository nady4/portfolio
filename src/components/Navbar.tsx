import {
  component$,
  isBrowser,
  useSignal,
  useTask$,
  $,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { useTranslations, useLocale } from "~/routes/layout";
import { localizedPath } from "~/lib/locale";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun.svg";
import "../styles/Navbar.scss";

export default component$(() => {
  const t = useTranslations().value;
  const lang = useLocale().value;
  const location = useLocation();

  const basePath = location.url.pathname;
  const hash = location.url.hash || "";
  const esPath = localizedPath(basePath, "es");
  const enPath = localizedPath(basePath, "en");

  const resumeFile = lang === "es" ? "/cv-es.pdf" : "/cv-en.pdf";
  const homeHref = lang === "es" ? "/es/" : "/";
  const projectsHref = lang === "es" ? "/es/#projects" : "/#projects";
  const experienceHref = lang === "es" ? "/es/#experience" : "/#experience";
  const educationHref = lang === "es" ? "/es/#education" : "/#education";
  const skillsHref = lang === "es" ? "/es/#skills" : "/#skills";
  const certificationsHref =
    lang === "es" ? "/es/#certifications" : "/#certifications";
  const contactHref = lang === "es" ? "/es/#contact" : "/#contact";
  const blogHref = lang === "es" ? "/es/blog/" : "/blog/";
  const isHome = basePath === "/" || basePath === "/es/";
  const isBlog =
    basePath.startsWith("/blog") || basePath.startsWith("/es/blog");

  const theme = useSignal<"dark" | "light">("dark");

  useTask$(() => {
    if (!isBrowser) return;
    theme.value =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
  });

  const toggleTheme = $(() => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme.value;
    localStorage.setItem("theme", theme.value);
  });

  const setLangCookie = $((target: "en" | "es") => {
    document.cookie = `lang=${target}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  });

  return (
    <nav class="navbar" aria-label="Primary navigation">
      <div class="navbar__masthead">
        <a
          class="navbar__identity"
          href={homeHref}
          aria-label="Nadya Jerochim home"
        >
          <span class="navbar__mark">N4</span>
          <span class="navbar__name">NADYA JEROCHIM</span>
        </a>

        <div class="navbar__meta" aria-label="Archive status">
          <span>BA / AR</span>
          <span>FIELD 01</span>
          <span class="navbar__live">LIVE INDEX</span>
        </div>

        <div class="navbar__controls">
          <button
            type="button"
            class="navbar__theme"
            onClick$={toggleTheme}
            aria-label={
              theme.value === "dark" ? "Use light theme" : "Use dark theme"
            }
          >
            <img
              src={theme.value === "dark" ? Sun : Moon}
              alt={theme.value === "dark" ? "Light mode" : "Dark mode"}
              width={24}
              height={24}
            />
          </button>

          <div class="navbar__language" aria-label="Language">
            <a
              href={`${esPath}${hash}`}
              class={lang === "es" ? "is-active" : ""}
              hreflang="es"
              onClick$={() => setLangCookie("es")}
            >
              ES
            </a>
            <a
              href={`${enPath}${hash}`}
              class={lang === "en" ? "is-active" : ""}
              hreflang="en"
              onClick$={() => setLangCookie("en")}
            >
              EN
            </a>
          </div>
        </div>
      </div>

      <div class="navbar__nav-row">
        <span class="navbar__nav-index">01—09</span>
        <div class="navbar__links">
          <a class={isHome ? "is-current" : ""} href={homeHref}>
            {t.nav_home}
          </a>
          <a href={projectsHref}>{t.nav_projects}</a>
          <a href={experienceHref}>{t.nav_experience}</a>
          <a href={educationHref}>{t.nav_education}</a>
          <a href={skillsHref}>{t.nav_skills}</a>
          <a href={certificationsHref}>{t.nav_certifications}</a>
          <a class={isBlog ? "is-current" : ""} href={blogHref}>
            {t.nav_blog}
          </a>
          <a href={contactHref}>{t.nav_contact}</a>
          <a class="navbar__resume" href={resumeFile} download>
            {t.nav_resume} /
          </a>
        </div>
      </div>
    </nav>
  );
});
