import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAllPosts } from "~/lib/blog";
import Footer from "~/components/Footer";
import "~/styles/Blog.scss";

export const useBlogFeed = routeLoader$(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return getAllPosts().map(({ html, ...meta }) => meta);
});

const formatDate = (date: string, lang: string) => {
  const locale = lang === "es" ? "es-AR" : "en-US";
  return new Date(date).toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default component$(() => {
  const feed = useBlogFeed();
  const basePath = "/es/blog";

  return (
    <main class="blog-page">
      <p>
        <a href="/es/">&larr; Inicio</a>
      </p>
      <h1>nady4</h1>

      <ul>
        {feed.value.map((p) => (
          <li key={p.slug}>
            <a href={`${basePath}/${p.slug}/`}>
              <strong>{p.title}</strong>
            </a>
            <p>{formatDate(p.date, "es")}</p>
            {p.description ? <p>{p.description}</p> : null}
          </li>
        ))}
      </ul>
      <Footer />
    </main>
  );
});

export const head: DocumentHead = {
  title: "nady4",
  meta: [
    {
      name: "description",
      content:
        "Full Stack Developer experienced in building web apps and serverless services with React, Node.js, TypeScript and Next.js.",
    },
    { name: "robots", content: "index, follow" },
  ],
  links: [
    { rel: "alternate", hreflang: "en", href: "https://nady4.com/blog/" },
    { rel: "alternate", hreflang: "es", href: "https://nady4.com/es/blog/" },
    { rel: "alternate", hreflang: "x-default", href: "https://nady4.com/blog/" },
  ],
};
