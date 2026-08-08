import { readdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const candidates = [
  join(root, "dist", "assets"),
  join(root, ".vercel", "output", "static", "assets"),
];

const removed = [];
for (const assetsDir of candidates) {
  if (!existsSync(assetsDir)) continue;
  for (const file of readdirSync(assetsDir)) {
    if (file.endsWith("-bundle-graph.json")) {
      rmSync(join(assetsDir, file));
      removed.push(file);
    }
  }
}

if (removed.length > 0) {
  console.log(`cleanup: removed ${removed.length} bundle-graph file(s)`);
}
