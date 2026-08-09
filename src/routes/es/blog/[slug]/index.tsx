import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getPostBySlug } from "~/lib/blog";
import { JsonLd } from "~/components/JsonLd";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Newsletter from "~/components/Newsletter";
import { useTranslations } from "~/routes/layout";
import "~/styles/Post.scss";

const formatDate = (date: string) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}-${d.getFullYear()}`;
};

export const useBlogPost = routeLoader$(({ params, status }) => {
  const post = getPostBySlug(params.slug);

  if (!post) {
    status(404);
    return null;
  }

  return post;
});

export default component$(() => {
  const post = useBlogPost();
  const t = useTranslations().value;

  if (!post.value) {
    return (
      <>
        <Navbar />
        <main class="post-page post-page--404">
          <h1>404</h1>
          <p>No existe ese post.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <JsonLd
        post={{
          slug: post.value.slug,
          title: post.value.title,
          date: post.value.date,
          description: post.value.description,
        }}
      />
      <Navbar />
      <main class="post-page">
        <header class="post-page__head">
          <div class="post-page__meta">
            <a href="/es/blog/" class="back-link">
              &larr; {t.blog_back}
            </a>
            <time dateTime={post.value.date}>{formatDate(post.value.date)}</time>
          </div>
          <h1>{post.value.title}</h1>
        </header>
        <article dangerouslySetInnerHTML={post.value.html} />
        <footer class="post-page__signature">
          <span class="post-page__author">Nadya Jerochim</span>
          <time class="post-page__date" dateTime={post.value.date}>
            {formatDate(post.value.date)}
          </time>
        </footer>
        <Newsletter />
      </main>
      <Footer />
    </>
  );
});

export const head: DocumentHead = ({ resolveValue, params }) => {
  const post = resolveValue(useBlogPost);
  if (!post) {
    return { title: "404" };
  }
  const slug = params.slug;
  return {
    title: post.title,
    meta: [
      {
        name: "description",
        content:
          post.description ??
          "Notas técnicas sobre ingeniería de productos full stack con IA por Nadya Jerochim.",
      },
      { name: "author", content: "Nadya Jerochim" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "article" },
      { property: "og:title", content: post.title },
      {
        property: "og:description",
        content:
          post.description ??
          "Notas técnicas sobre ingeniería de productos full stack con IA por Nadya Jerochim.",
      },
      {
        property: "og:url",
        content: `https://nady4.com/es/blog/${slug}/`,
      },
      { property: "og:locale", content: "es_AR" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:image", content: "https://nady4.com/dev.png" },
      { property: "og:image:alt", content: "Nadya Jerochim" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: post.title },
      {
        name: "twitter:description",
        content:
          post.description ??
          "Notas técnicas sobre ingeniería de productos full stack con IA por Nadya Jerochim.",
      },
      { name: "twitter:image", content: "https://nady4.com/dev.png" },
      { name: "twitter:image:alt", content: "Nadya Jerochim" },
    ],
    links: [
      {
        rel: "alternate",
        hreflang: "en",
        href: `https://nady4.com/blog/${slug}/`,
      },
      {
        rel: "alternate",
        hreflang: "es",
        href: `https://nady4.com/es/blog/${slug}/`,
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: `https://nady4.com/blog/${slug}/`,
      },
    ],
  };
};
