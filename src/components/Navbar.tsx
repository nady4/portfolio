import {
  component$,
  isBrowser,
  useSignal,
  useTask$,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { useTranslations, useLocale } from "~/routes/layout";
import { localizedPath } from "~/lib/locale";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun.svg";
import "../styles/Navbar.scss";

const sectionIds = [
  "home",
  "projects",
  "experience",
  "education",
  "skills",
  "certifications",
  "contact",
] as const;

type SectionId = (typeof sectionIds)[number];

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
  const activeSection = useSignal<SectionId>("home");

  useTask$(() => {
    if (!isBrowser) return;
    theme.value =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
  });

  // IntersectionObserver needs the browser DOM and is intentionally initialized once.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    if (!isHome) return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const visibleSections = new Set<string>();
    const navbarHeight =
      document.querySelector<HTMLElement>(".navbar")?.offsetHeight ?? 78;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
          } else {
            visibleSections.delete(entry.target.id);
          }
        }

        const currentSection = sections
          .filter((section) => visibleSections.has(section.id))
          .sort(
            (a, b) =>
              a.getBoundingClientRect().top - b.getBoundingClientRect().top,
          )[0];

        if (currentSection) {
          activeSection.value = currentSection.id as SectionId;
        }
      },
      {
        rootMargin: `-${navbarHeight}px 0px -65% 0px`,
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    cleanup(() => observer.disconnect());
  });

  const toggleTheme = $(() => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme.value;
    localStorage.setItem("theme", theme.value);
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
            >
              ES
            </a>
            <a
              href={`${enPath}${hash}`}
              class={lang === "en" ? "is-active" : ""}
              hreflang="en"
            >
              EN
            </a>
          </div>
        </div>
      </div>

      <div class="navbar__nav-row">
        <span class="navbar__nav-index">01—09</span>
        <div class="navbar__links">
          <a
            class={isHome && activeSection.value === "home" ? "is-current" : ""}
            href={homeHref}
          >
            {t.nav_home}
          </a>
          <a
            class={
              isHome && activeSection.value === "projects" ? "is-current" : ""
            }
            href={projectsHref}
          >
            {t.nav_projects}
          </a>
          <a
            class={
              isHome && activeSection.value === "experience" ? "is-current" : ""
            }
            href={experienceHref}
          >
            {t.nav_experience}
          </a>
          <a
            class={
              isHome && activeSection.value === "education" ? "is-current" : ""
            }
            href={educationHref}
          >
            {t.nav_education}
          </a>
          <a
            class={
              isHome && activeSection.value === "skills" ? "is-current" : ""
            }
            href={skillsHref}
          >
            {t.nav_skills}
          </a>
          <a
            class={
              isHome && activeSection.value === "certifications"
                ? "is-current"
                : ""
            }
            href={certificationsHref}
          >
            {t.nav_certifications}
          </a>
          <a class={isBlog ? "is-current" : ""} href={blogHref}>
            {t.nav_blog}
          </a>
          <a
            class={
              isHome && activeSection.value === "contact" ? "is-current" : ""
            }
            href={contactHref}
          >
            {t.nav_contact}
          </a>
          <a class="navbar__resume" href={resumeFile} download>
            {t.nav_resume} /
          </a>
        </div>
      </div>
    </nav>
  );
});
