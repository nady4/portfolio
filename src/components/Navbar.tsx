import { component$, useSignal, useOnWindow, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { useTranslations, useLocale } from "~/routes/layout";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun.svg";
import "../styles/Navbar.scss";

export default component$(() => {
  const t = useTranslations().value;
  const lang = useLocale().value;
  const location = useLocation();

  const basePath = location.url.pathname;
  const hash = location.url.hash || "";

  const resumeFile = lang === "es" ? "/cv-es.pdf" : "/cv-en.pdf";

  const theme = useSignal<"dark" | "light">(
    typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "light"
      ? "light"
      : "dark",
  );

  const hideOptions = useSignal(false);
  const lastScrollY = useSignal(0);

  useOnWindow(
    "scroll",
    $(() => {
      if (window.innerWidth > 768) return;

      const currentY = window.scrollY;

      if (currentY > lastScrollY.value && currentY > 50) {
        hideOptions.value = true;
      } else {
        hideOptions.value = false;
      }

      lastScrollY.value = currentY;
    }),
  );

  const toggleTheme = $(() => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme.value;
    localStorage.setItem("theme", theme.value);
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
            href={`${basePath}?lang=es${hash}`}
            class={lang === "es" ? "lang-active" : ""}
          >
            ES
          </a>
          <a
            href={`${basePath}?lang=en${hash}`}
            class={lang === "en" ? "lang-active" : ""}
          >
            EN
          </a>
        </div>
      </div>

      <div class={`navbar-bottom ${hideOptions.value ? "collapsed" : ""}`}>
        <div class="options">
          <a href="/#home">{t.nav_home}</a>
          <a href="/#experience">{t.nav_experience}</a>
          <a href="/#education">{t.nav_education}</a>
          <a href="/#projects">{t.nav_projects}</a>
          <a href="/#certifications">{t.nav_certifications}</a>
          <a href="/#contact">{t.nav_contact}</a>
          <a href={resumeFile} download>
            {t.nav_resume}
          </a>
        </div>
      </div>
    </nav>
  );
});
