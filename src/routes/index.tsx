import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Navbar from "~/components/Navbar";
import Hero from "~/components/Hero";
import Experience from "~/components/Experience";
import Skills from "~/components/Skills";
import Projects from "~/components/Projects";
import Contact from "~/components/Contact";
import Footer from "~/components/Footer";

export default component$(() => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Nadya Jerochim - Full Stack Developer",
  meta: [
    {
      name: "description",
      content:
        "Full Stack Developer experienced in building web apps and serverless services with React, Node.js, TypeScript and Next.js.",
    },

    { property: "og:title", content: "Nadya Jerochim - Full Stack Developer" },
    {
      property: "og:description",
      content:
        "Full Stack Developer experienced in building web apps and serverless services with React, Node.js, TypeScript and Next.js.",
    },
    { property: "og:image", content: "https://nady4.com/dev.png" },
    { property: "og:url", content: "https://nady4.com/" },
    { property: "og:type", content: "website" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: "https://nady4.com/dev.png" },
  ],
};
