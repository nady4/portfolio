import MarkdownIt from "markdown-it";
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { Plugin } from "vite";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  category: "professional" | "personal";
  html: string;
};

const VIRTUAL_ID = "virtual:blog-content";
const RESOLVED_VIRTUAL_ID = "\0" + VIRTUAL_ID;

function parseFrontmatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, rawValue] = kv;
    const value = rawValue.trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else if (value.startsWith('"') && value.endsWith('"')) {
      data[key] = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      data[key] = value.slice(1, -1);
    } else {
      data[key] = value;
    }
  }
  return { data, content: raw.slice(match[0].length) };
}

export default function blogContent(): Plugin {
  const md = new MarkdownIt({ html: true, linkify: true, breaks: false });

  function loadPosts(): BlogPost[] {
    const contentDir = resolve(process.cwd(), "src/content/blog");
    let entries: string[];
    try {
      entries = readdirSync(contentDir).filter((f) => f.endsWith(".md"));
    } catch {
      return [];
    }

    const posts: BlogPost[] = entries.map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = readFileSync(join(contentDir, filename), "utf8");
      const { data, content } = parseFrontmatter(raw);

      const title = String(data.title ?? slug);
      const date = String(data.date ?? "");
      const description = data.description
        ? String(data.description)
        : undefined;
      const tags = Array.isArray(data.tags)
        ? data.tags.map(String)
        : undefined;
      const category =
        data.category === "personal" ? "personal" : "professional";

      return {
        slug,
        title,
        date,
        description,
        tags,
        category,
        html: md.render(content),
      };
    });

    return posts.sort((a, b) =>
      a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
    );
  }

  let cachedPosts: string | null = null;

  return {
    name: "blog-content",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID;
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_ID) return;
      if (!cachedPosts) cachedPosts = JSON.stringify(loadPosts());
      return `export const posts = ${cachedPosts};\n`;
    },
    configureServer(server) {
      const watchDir = resolve(process.cwd(), "src/content/blog");
      server.watcher.add(watchDir);
      const invalidate = () => {
        cachedPosts = null;
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", (p) => {
        if (p.startsWith(watchDir) && p.endsWith(".md")) invalidate();
      });
      server.watcher.on("unlink", (p) => {
        if (p.startsWith(watchDir) && p.endsWith(".md")) invalidate();
      });
      server.watcher.on("change", (p) => {
        if (p.startsWith(watchDir) && p.endsWith(".md")) invalidate();
      });
    },
  };
}
