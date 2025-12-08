import { component$ } from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
import "../styles/Hero.scss";

export default component$(() => {
  const t = useTranslations().value;

  return (
    <div id="home" class="hero-container">
      <div class="hero-left">
        <h1>{t.hero_title}</h1>
        <h2>{t.hero_subtitle}</h2>
        <p>{t.hero_desc}</p>
      </div>
      <div class="hero-right"></div>
    </div>
  );
});
