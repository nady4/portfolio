import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import Navbar from "~/components/Navbar";
import Hero from "~/components/Hero";
import DataStream from "~/components/DataStream";
import Experience from "~/components/Experience";
import Education from "~/components/Education";
import Projects from "~/components/Projects";
import Skills from "~/components/Skills";
import Certifications from "~/components/Certifications";
import BlogSection from "~/components/BlogSection";
import Contact from "~/components/Contact";
import Footer from "~/components/Footer";
import { getAllPosts } from "~/lib/blog";

export const useBlogFeed = routeLoader$(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return getAllPosts().map(({ html, ...meta }) => meta);
});

export default component$(() => {
  const feed = useBlogFeed();

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
      <BlogSection posts={feed.value} />
      <Contact />
      <Footer />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Nadya Jerochim | Full Stack Engineer",
  meta: [
    {
      name: "description",
      content:
        "I build AI-powered products end-to-end, combining product thinking and software engineering to transform ideas into scalable, user-focused experiences.",
    },
    {
      property: "og:title",
      content: "Nadya Jerochim | Full Stack Engineer",
    },
    {
      property: "og:description",
      content:
        "I build AI-powered products end-to-end, combining product thinking and software engineering to transform ideas into scalable, user-focused experiences.",
    },
    { property: "og:image", content: "https://nady4.com/dev.png" },
    { property: "og:url", content: "https://nady4.com/" },
    { property: "og:type", content: "website" },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1024" },
    { property: "og:image:height", content: "1024" },
    { property: "og:locale", content: "en_US" },
    { property: "og:locale:alternate", content: "es_AR" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:site", content: "@_nady4" },
    {
      name: "twitter:title",
      content: "Nadya Jerochim | Full Stack Engineer",
    },
    {
      name: "twitter:description",
      content:
        "I build AI-powered products end-to-end, combining product thinking and software engineering to transform ideas into scalable, user-focused experiences.",
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
