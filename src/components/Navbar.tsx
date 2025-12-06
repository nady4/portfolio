import { component$ } from "@builder.io/qwik";
import "../styles/Navbar.scss";

export default component$(() => {
  return (
    <nav class="navbar">
      <a href="#home">Home</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
      <a href="/cv-en.pdf" download>
        Resume
      </a>
    </nav>
  );
});
