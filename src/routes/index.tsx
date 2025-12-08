import { component$ } from "@builder.io/qwik";
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
