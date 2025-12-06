import { component$ } from "@builder.io/qwik";
import Hero from "../components/Hero";
import Projects from "~/components/Projects";
import Footer from "~/components/Footer";

export default component$(() => {
  return (
    <main>
      <Hero />
      <Projects />
      <Footer />
    </main>
  );
});
