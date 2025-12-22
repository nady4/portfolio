import matter from "gray-matter";
import MarkdownIt from "markdown-it";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  html: string;
  raw: string;
};

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: false,
});

const modules = import.meta.glob("/src/content/blog/*.md", {
  eager: true,
  as: "raw",
}) as Record<string, string>;

function filenameToSlug(path: string) {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

function parsePost(slug: string, raw: string): BlogPost {
  const { data, content } = matter(raw);

  const title = String(data.title ?? slug);
  const date = String(data.date ?? "");
  const description = data.description ? String(data.description) : undefined;
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : undefined;

  return {
    slug,
    title,
    date,
    description,
    tags,
    raw,
    html: md.render(content),
  };
}

export function getAllPosts(): Omit<BlogPost, "raw">[] {
  const posts = Object.entries(modules).map(([path, raw]) =>
    parsePost(filenameToSlug(path), raw),
  );

  return posts
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .map(({ raw, ...rest }) => rest);
}

export function getPostBySlug(slug: string): Omit<BlogPost, "raw"> | null {
  const entry = Object.entries(modules).find(([path]) =>
    path.endsWith(`/${slug}.md`),
  );

  if (!entry) return null;

  const [, raw] = entry;
  const { raw: _raw, ...post } = parsePost(slug, raw);
  return post;
}
