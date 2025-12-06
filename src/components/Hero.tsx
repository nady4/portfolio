import { component$ } from "@builder.io/qwik";
import "../styles/Hero.scss";

export default component$(() => {
  return (
    <div id="home" class="hero-container">
      <div class="hero-left">
        <h1>Nadya Jerochim</h1>
        <h2>Full Stack Developer</h2>
      </div>
      <div class="hero-right"></div>
    </div>
  );
});
