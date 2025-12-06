import { component$ } from "@builder.io/qwik";
import "../styles/Footer.scss";
import GithubLogo from "../assets/github.svg";
import LinkedInLogo from "../assets/linkedIn.svg";

export default component$(() => {
  return (
    <footer class="footer">
      <p class="footer-text">Nadya Jerochim</p>
      <p class="footer-text">dev@nady4.com</p>
      <a href="https://github.com/nady4" target="_blank">
        <img src={GithubLogo} alt="Github" width="32" height="32" />
      </a>
      <a href="https://www.linkedin.com/in/nady4" target="_blank">
        <img src={LinkedInLogo} alt="LinkedIn" width="32" height="32" />
      </a>
    </footer>
  );
});
