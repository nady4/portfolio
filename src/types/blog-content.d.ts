declare module "virtual:blog-content" {
  import type { BlogPost } from "../vite-plugins/blog-content";
  export const posts: BlogPost[];
}
