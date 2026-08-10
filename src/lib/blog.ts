import { posts } from "virtual:blog-content";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  category: "professional" | "personal";
  html: string;
};

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getAllPostsMeta(): Omit<BlogPost, "html">[] {
  return posts.map(({ html, ...meta }) => {
    void html;
    return meta;
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  return posts.find((p) => p.slug === slug) ?? null;
}
