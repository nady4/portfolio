import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAllPosts } from "~/lib/blog";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import Signal from "~/components/Signal";
import { useTranslations } from "~/routes/layout";
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
  const t = useTranslations().value;
  const basePath = "/es/blog";

  return (
    <>
      <Navbar />
      <main class="blog-page">
        <header class="blog-page__head">
          <div class="blog-page__back-row">
            <a href="/es/">&larr; {t.blog_back}</a>
            <Signal code="08 / 09" tone="purple">
              {t.blog_signal}
            </Signal>
          </div>
          <h1>
            nady4 <span>/ NOTAS</span>
          </h1>
          <p>{t.blog_intro}</p>
        </header>

        <ol class="blog-list">
          {feed.value.map((p, index) => (
            <li key={p.slug}>
              <div class="blog-entry__meta">
                <span>0{index + 1}</span>
                <time dateTime={p.date}>{formatDate(p.date, "es")}</time>
              </div>
              <div class="blog-entry__copy">
                <a href={`${basePath}/${p.slug}/`}>
                  <strong>{p.title}</strong>
                  <span aria-hidden="true">↗</span>
                </a>
                {p.description ? <p>{p.description}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </>
  );
});

export const head: DocumentHead = {
  title: "Nadya Jerochim | Notas de ingeniería Full Stack con IA",
  meta: [
    {
      name: "description",
      content:
        "Notas técnicas sobre productos web con IA, integraciones con LLM, agentes y automatización de flujos.",
    },
    { name: "robots", content: "index, follow" },
  ],
  links: [
    { rel: "alternate", hreflang: "en", href: "https://nady4.com/blog/" },
    { rel: "alternate", hreflang: "es", href: "https://nady4.com/es/blog/" },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://nady4.com/blog/",
    },
  ],
};
