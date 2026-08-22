import { component$ } from "@builder.io/qwik";
import { useTranslations, useLocale } from "~/routes/layout";
import Signal from "./Signal";
import "../styles/Footer.scss";
import GithubLogo from "../assets/github.svg";
import LinkedInLogo from "../assets/linkedIn.svg";
import XLogo from "../assets/x.svg";

export default component$(() => {
  const t = useTranslations().value;
  const lang = useLocale().value;
  const blogHref = lang === "es" ? "/es/blog/" : "/blog/";
  const aboutHref = lang === "es" ? "/es/about" : "/about";
  const contactHref = lang === "es" ? "/es/contact" : "/contact";
  const privacyHref = lang === "es" ? "/es/privacy" : "/privacy";
  const developersHref = lang === "es" ? "/es/developers" : "/developers";

  return (
    <footer class="footer">
      <div class="footer__inner section-shell">
        <div class="footer__top">
          <Signal code="09 / 09" tone="ink">
            {t.footer_signal}
          </Signal>
          <a class="footer__blog" href={blogHref}>
            {t.nav_blog} ↗
          </a>
        </div>
        <div class="footer__links">
          <div class="footer__links-col">
            <span class="footer__links-label">{t.footer_links}</span>
            <a href={aboutHref}>{t.nav_about}</a>
            <a href={blogHref}>{t.nav_blog}</a>
            <a href={developersHref}>{t.nav_developers}</a>
            <a href={contactHref}>{t.nav_contact}</a>
            <a href={privacyHref}>{lang === "es" ? "Privacidad" : "Privacy"}</a>
          </div>
          <div class="footer__links-col">
            <span class="footer__links-label">{t.footer_machine}</span>
            <a href="/openapi.json">OpenAPI / JSON</a>
            <a href="/openapi.yaml">OpenAPI / YAML</a>
            <a href="/llms.txt">llms.txt</a>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
        </div>
        <div class="footer__bottom">
          <div class="footer__identity">
            <strong>{t.footer_name}</strong>
            <a href="mailto:dev@nady4.com">{t.footer_mail}</a>
            <span>Buenos Aires, Argentina</span>
          </div>
          <div class="footer__socials">
            <a
              href="https://github.com/nady4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <img src={GithubLogo} alt="GitHub" width="24" height="24" />
            </a>
            <a
              href="https://www.linkedin.com/in/nady4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <img src={LinkedInLogo} alt="LinkedIn" width="24" height="24" />
            </a>
            <a
              href="https://x.com/_nady4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X profile"
            >
              <img src={XLogo} alt="X" width="24" height="24" />
            </a>
          </div>
          <span class="footer__year">© 2026 / N4</span>
        </div>
      </div>
    </footer>
  );
});
