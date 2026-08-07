import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getAllPosts } from "~/lib/blog";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import Signal from "~/components/Signal";
import { useLocale, useTranslations } from "~/routes/layout";
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
  const t = useTranslations().value;
  const basePath = lang === "es" ? "/es/blog" : "/blog";
  const homeHref = lang === "es" ? "/es/" : "/";

  return (
    <>
      <Navbar />
      <main class="blog-page">
        <header class="blog-page__head">
          <div class="blog-page__back-row">
            <a href={homeHref}>&larr; {t.blog_back}</a>
            <Signal code="07 / 09" tone="purple">
              {t.blog_signal}
            </Signal>
          </div>
          <h1>
            nady4 <span>/ BLOG</span>
          </h1>
          <p>{t.blog_intro}</p>
        </header>

        <ol class="blog-list">
          {feed.value.map((p, index) => (
            <li key={p.slug}>
              <div class="blog-entry__meta">
                <span>0{index + 1}</span>
                <time dateTime={p.date}>{formatDate(p.date, lang)}</time>
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

export const head: DocumentHead = () => {
  return {
    title: "Nadya Jerochim | Blog",
    meta: [
      {
        name: "description",
        content:
          "Technical notes on building production AI products with React, Next.js, Node.js, LLM integrations, agents, and automation.",
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
};
