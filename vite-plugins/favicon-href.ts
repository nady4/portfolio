import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";

const FAVICON_PATH = "public/favicon.svg";
const VIRTUAL_ID = "virtual:favicon-href";
const RESOLVED_VIRTUAL_ID = "\0" + VIRTUAL_ID;

export default function faviconHref(): Plugin {
  function computeHref(): string {
    const absPath = resolve(process.cwd(), FAVICON_PATH);
    const content = readFileSync(absPath);
    const hash = createHash("sha256").update(content).digest("hex").slice(0, 8);
    return `/favicon.svg?v=${hash}`;
  }

  let cachedHref: string | null = null;

  return {
    name: "favicon-href",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID;
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_ID) return;
      if (!cachedHref) cachedHref = computeHref();
      return `export const faviconHref = ${JSON.stringify(cachedHref)};\n`;
    },
    configureServer(server) {
      const absWatch = resolve(process.cwd(), FAVICON_PATH);
      const invalidate = () => {
        cachedHref = null;
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.add(absWatch);
      server.watcher.on("change", (p) => {
        if (p === absWatch) invalidate();
      });
    },
  };
}
