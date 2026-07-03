import { component$ } from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
import "../styles/Footer.scss";
import GithubLogo from "../assets/github.svg";
import LinkedInLogo from "../assets/linkedIn.svg";
import XLogo from "../assets/x.svg";
import InstagramLogo from "../assets/ig.svg";

export default component$(() => {
  const t = useTranslations().value;

  return (
    <footer class="footer">
      <p class="footer-text">{t.footer_name}</p>
      <p class="footer-text">Buenos Aires, Argentina</p>
      <div class="footer-socials">
        <a
          href="https://github.com/nady4"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <img src={GithubLogo} alt="GitHub" width="32" height="32" />
        </a>
        <a
          href="https://www.linkedin.com/in/nady4"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <img src={LinkedInLogo} alt="LinkedIn" width="32" height="32" />
        </a>
        <a
          href="https://x.com/_nady4"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter) profile"
        >
          <img src={XLogo} alt="X" width="32" height="32" />
        </a>
        <a
          href="https://www.instagram.com/nady4_dev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram profile"
        >
          <img src={InstagramLogo} alt="Instagram" width="32" height="32" />
        </a>
      </div>
    </footer>
  );
});
