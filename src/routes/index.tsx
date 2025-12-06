import { component$ } from "@builder.io/qwik";
import Navbar from "~/components/Navbar";
import Hero from "~/components/Hero";
import Projects from "~/components/Projects";
import Contact from "~/components/Contact";
import Footer from "~/components/Footer";

export default component$(() => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
});
