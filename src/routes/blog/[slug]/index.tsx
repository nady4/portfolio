import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getPostBySlug } from "~/lib/blog";
import "~/styles/Post.scss";

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

  if (!post.value) {
    return (
      <main>
        <h1>404</h1>
        <p>No existe ese post.</p>
      </main>
    );
  }

  return (
    <main class="post-page">
      <a href="/blog/" class="back-link">
        &larr; Volver
      </a>
      <h1>{post.value.title}</h1>
      <div>{post.value.date}</div>

      <article dangerouslySetInnerHTML={post.value.html} />
    </main>
  );
});
