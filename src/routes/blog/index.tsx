import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getAllPosts } from "~/lib/blog";
import Footer from "~/components/Footer";
import { useLocale } from "~/routes/layout";
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
  const lang = useLocale().value;

  return (
    <main class="blog-page">
      <h1>nady4</h1>

      <ul>
        {feed.value.map((p) => (
          <li key={p.slug}>
            <a href={`/blog/${p.slug}/`}>
              <strong>{p.title}</strong>
            </a>
            <p>{formatDate(p.date, lang)}</p>
            {p.description ? <p>{p.description}</p> : null}
          </li>
        ))}
      </ul>
      <Footer />
    </main>
  );
});
