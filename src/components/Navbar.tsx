import {
  component$,
  useSignal,
  useVisibleTask$,
  useStore,
  $,
} from "@builder.io/qwik";
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

  const theme = useSignal<"dark" | "light">("dark");
  const initialized = useStore({ done: false });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    // Track lang to re-sync theme when component re-renders due to language change
    track(() => lang);

    // Always sync theme from document element (source of truth)
    const docTheme = document.documentElement.dataset.theme;
    if (docTheme === "light" || docTheme === "dark") {
      theme.value = docTheme;
      if (!initialized.done) {
        initialized.done = true;
      }
      return;
    }

    // Only initialize from localStorage on first run
    if (!initialized.done) {
      initialized.done = true;
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        theme.value = stored;
        document.documentElement.dataset.theme = stored;
      } else {
        document.documentElement.dataset.theme = theme.value;
      }
    }
  });

  const toggleTheme = $(() => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme.value;
    localStorage.setItem("theme", theme.value);
  });

  return (
    <nav class="navbar">
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
      <div class="options">
        <a href="/#home">{t.nav_home}</a>
        <a href="/#experience">{t.nav_experience}</a>
        <a href="/#projects">{t.nav_projects}</a>
        <a href="/#contact">{t.nav_contact}</a>
        <a href={resumeFile} download>
          {t.nav_resume}
        </a>
        <a href="/blog/">Blog</a>
      </div>
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
    </nav>
  );
});
