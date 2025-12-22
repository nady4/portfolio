import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getAllPosts } from "~/lib/blog";

export const useBlogFeed = routeLoader$(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return getAllPosts().map(({ html, ...meta }) => meta);
});

export default component$(() => {
  const feed = useBlogFeed();

  return (
    <main>
      <h1>Blog</h1>

      <ul>
        {feed.value.map((p) => (
          <li key={p.slug}>
            <a href={`/blog/${p.slug}/`}>
              <strong>{p.title}</strong>
            </a>
            <div>{p.date}</div>
            {p.description ? <p>{p.description}</p> : null}
          </li>
        ))}
      </ul>
    </main>
  );
});
