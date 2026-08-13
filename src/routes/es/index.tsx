import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Navbar from "~/components/Navbar";
import Hero from "~/components/Hero";
import DataStream from "~/components/DataStream";
import Experience from "~/components/Experience";
import Education from "~/components/Education";
import Projects from "~/components/Projects";
import Skills from "~/components/Skills";
import Certifications from "~/components/Certifications";
import Contact from "~/components/Contact";
import Footer from "~/components/Footer";

export default component$(() => {
  return (
    <main>
      <Navbar />
      <Hero />
      <DataStream />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Nadya Jerochim | Ingeniera Full Stack",
  meta: [
    {
      name: "description",
      content:
        "Construyo productos de principio a fin, combinando pensamiento de producto, UX, ingeniería full stack, integraciones con IA y arquitectura de sistemas. Haciendo el futuro incierto más fácil de navegar.",
    },
    {
      property: "og:title",
      content: "Nadya Jerochim | Ingeniera Full Stack",
    },
    {
      property: "og:description",
      content:
        "Construyo productos de principio a fin, combinando pensamiento de producto, UX, ingeniería full stack, integraciones con IA y arquitectura de sistemas. Haciendo el futuro incierto más fácil de navegar.",
    },
    { property: "og:image", content: "https://nady4.com/dev.png" },
    { property: "og:url", content: "https://nady4.com/es/" },
    { property: "og:type", content: "website" },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1024" },
    { property: "og:image:height", content: "1024" },
    { property: "og:locale", content: "es_AR" },
    { property: "og:locale:alternate", content: "en_US" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:site", content: "@_nady4" },
    {
      name: "twitter:title",
      content: "Nadya Jerochim | Ingeniera Full Stack",
    },
    {
      name: "twitter:description",
      content:
        "Construyo productos de principio a fin, combinando pensamiento de producto, UX, ingeniería full stack, integraciones con IA y arquitectura de sistemas. Haciendo el futuro incierto más fácil de navegar.",
    },
    { name: "twitter:image", content: "https://nady4.com/dev.png" },
    { name: "author", content: "Nadya Jerochim" },
    { name: "robots", content: "index, follow" },
    { name: "theme-color", content: "#111414" },
  ],
  links: [
    { rel: "alternate", hreflang: "en", href: "https://nady4.com/" },
    { rel: "alternate", hreflang: "es", href: "https://nady4.com/es/" },
    { rel: "alternate", hreflang: "x-default", href: "https://nady4.com/" },
  ],
};
