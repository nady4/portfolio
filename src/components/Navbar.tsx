import { component$, useSignal, useOnWindow, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { useTranslations, useLocale } from "~/routes/layout";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun.svg";
import "../styles/Navbar.scss";

function localizedPath(pathname: string, target: "en" | "es"): string {
  if (pathname === "/" || pathname === "") return target === "es" ? "/es/" : "/";
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    if (target === "es") return pathname === "/es" ? "/es/" : pathname;
    return pathname === "/es" ? "/" : pathname.slice(3) || "/";
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    if (target === "es") {
      return pathname === "/en" ? "/es/" : `/es${pathname.slice(3)}`;
    }
    return pathname === "/en" ? "/" : pathname.slice(3) || "/";
  }
  return target === "es" ? `/es${pathname}` : pathname;
}

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

  const theme = useSignal<"dark" | "light">(
    typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "light"
      ? "light"
      : "dark"
  );

  const scrollOffset = useSignal(0);
  const lastScrollY = useSignal(0);

  useOnWindow(
    "scroll",
    $(() => {
      if (window.innerWidth > 768) return;

      const currY = window.scrollY;
      const isScrollingDown = currY > lastScrollY.value;
      lastScrollY.value = currY;

      // Show navbar when scrolling up or at top, hide when scrolling down
      if (isScrollingDown && currY > 50) {
        scrollOffset.value = 140;
      } else {
        scrollOffset.value = 0;
      }
    })
  );

  const toggleTheme = $(() => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme.value;
    localStorage.setItem("theme", theme.value);
  });

  const setLangCookie = $((target: "en" | "es") => {
    document.cookie = `lang=${target}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  });

  return (
    <nav class="navbar">
      <div class="navbar-top">
        <button
          type="button"
          class="dark-mode-toggle"
          onClick$={toggleTheme}
          aria-label="Toggle theme"
        >
          <img
            src={theme.value === "dark" ? Sun : Moon}
            alt={theme.value === "dark" ? "Light mode" : "Dark mode"}
            width={24}
            height={24}
          />
        </button>

        <div class="lang-switch">
          <a
            href={`${esPath}${hash}`}
            class={lang === "es" ? "lang-active" : ""}
            hreflang="es"
            onClick$={() => setLangCookie("es")}
          >
            ES
          </a>
          <a
            href={`${enPath}${hash}`}
            class={lang === "en" ? "lang-active" : ""}
            hreflang="en"
            onClick$={() => setLangCookie("en")}
          >
            EN
          </a>
        </div>
      </div>

      <div
        class={{
          "navbar-bottom": true,
          "navbar-bottom--hidden": scrollOffset.value > 0,
        }}
      >
        <div class="options">
          <a href={homeHref}>{t.nav_home}</a>
          <a href={projectsHref}>{t.nav_projects}</a>
          <a href={experienceHref}>{t.nav_experience}</a>
          <a href={educationHref}>{t.nav_education}</a>
          <a href={skillsHref}>{t.nav_skills}</a>
          <a href={certificationsHref}>{t.nav_certifications}</a>
          <a href={contactHref}>{t.nav_contact}</a>
          <a href={resumeFile} download>
            {t.nav_resume}
          </a>
        </div>
      </div>
    </nav>
  );
});
