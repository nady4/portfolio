import { describe, expect, test } from "bun:test";
import { buildOpenApi, buildOpenApiYaml, toYaml } from "./openapi";
import { homepageMarkdown, llmsTxt } from "./llms-txt";
import {
  acceptsMarkdown,
  notFoundHtml,
  notFoundJson,
  notFoundMarkdown,
  postAsMarkdown,
  prefersMarkdown,
} from "./markdown-negotiation";

describe("llms.txt", () => {
  test("contains the site identity", () => {
    expect(llmsTxt).toContain("# nady4.com");
    expect(llmsTxt).toContain("Nadya Jerochim");
  });

  test("has agent guidance (when to use)", () => {
    expect(llmsTxt).toContain("## When to use this");
    expect(llmsTxt).toContain("dev@nady4.com");
  });

  test("lists developer resources", () => {
    expect(llmsTxt).toContain("/openapi.json");
    expect(llmsTxt).toContain("/openapi.yaml");
    expect(llmsTxt).toContain("/developers");
    expect(llmsTxt).toContain("/.well-known/oauth-protected-resource");
    expect(llmsTxt).toContain("/sitemap.xml");
  });

  test("documents the keyless API and onboarding", () => {
    expect(llmsTxt).toContain("POST /api/newsletter");
    expect(llmsTxt).toContain("No API key");
  });

  test("links trust anchor pages", () => {
    expect(llmsTxt).toContain("/about");
    expect(llmsTxt).toContain("/contact");
    expect(llmsTxt).toContain("/privacy");
  });

  test("homepageMarkdown produces markdown for both locales", () => {
    expect(homepageMarkdown("en")).toContain("# nady4.com");
    expect(homepageMarkdown("es")).toContain("Versión en español");
  });
});

describe("OpenAPI spec", () => {
  const spec = buildOpenApi();

  test("is OpenAPI 3.1 with identity", () => {
    expect(spec.openapi).toBe("3.1.0");
    expect(spec.info.title).toBe("nady4.com API");
    expect(spec.info.version).toBe("1.0.0");
    expect(spec.info.contact).toMatchObject({ email: "dev@nady4.com" });
    expect(spec.servers.some((s) => s.url === "https://www.nady4.com")).toBe(
      true,
    );
  });

  test("every operation has a unique operationId and description", () => {
    const seen = new Set<string>();
    for (const [path, item] of Object.entries(spec.paths)) {
      for (const [method, op] of Object.entries(item)) {
        expect(op).toHaveProperty("operationId");
        expect(op).toHaveProperty("description");
        expect(op).toHaveProperty("summary");
        expect(op).toHaveProperty("responses");
        expect(seen.has(op.operationId)).toBe(false);
        seen.add(op.operationId);
        expect(path).toBeTruthy();
        expect(method).toMatch(/^(get|post|put|patch|delete)$/);
      }
    }
    expect(seen.size).toBeGreaterThanOrEqual(6);
  });

  test("newsletter endpoint is fully documented with typed schemas", () => {
    const op = spec.paths["/api/newsletter"].post as any;
    expect(op.operationId).toBe("subscribeToNewsletter");
    expect(op.security).toEqual([]);
    expect(op.requestBody.content["application/json"].schema.required).toContain(
      "email",
    );
    for (const code of ["200", "400", "405", "500"]) {
      expect(op.responses[code]).toBeDefined();
    }
  });

  test("all operations declare security: [] (public API)", () => {
    for (const item of Object.values(spec.paths)) {
      for (const op of Object.values(item)) {
        expect((op as any).security).toEqual([]);
      }
    }
  });

  test("serializes to valid-looking YAML", () => {
    const yaml = buildOpenApiYaml();
    expect(yaml.startsWith("openapi: 3.1.0")).toBe(true);
    expect(yaml).toContain("title: nady4.com API");
    expect(yaml).toContain("operationId: subscribeToNewsletter");
    expect(yaml).not.toContain("undefined");
    expect(yaml).not.toContain("[object Object]");
  });

  test("toYaml handles arrays, nested objects, and multiline strings", () => {
    const yaml = toYaml({
      openapi: "3.1.0",
      info: { title: "t", description: "line1\nline2" },
      servers: [{ url: "https://x", description: "d" }],
      paths: {},
      components: { securitySchemes: {} },
    });
    expect(yaml).toContain("servers:");
    expect(yaml).toContain('url: "https://x"');
    expect(yaml).toContain("|");
    expect(yaml).toContain("line1");
    expect(yaml).toContain("line2");
  });
});

describe("markdown negotiation", () => {
  test("acceptsMarkdown matches explicit markdown types only", () => {
    expect(acceptsMarkdown("text/markdown")).toBe(true);
    expect(acceptsMarkdown("text/markdown, text/html")).toBe(true);
    expect(acceptsMarkdown("text/*")).toBe(true);
    expect(acceptsMarkdown("application/json")).toBe(false);
    expect(acceptsMarkdown(null)).toBe(false);
    expect(acceptsMarkdown("text/html;q=0.9, */*;q=0.8")).toBe(false);
    expect(acceptsMarkdown("*/*")).toBe(false);
  });

  test("prefersMarkdown requires markdown to be explicitly preferred", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
    expect(prefersMarkdown("text/markdown, text/html;q=0.9")).toBe(true);
    expect(prefersMarkdown("text/html, text/markdown;q=0.5")).toBe(false);
    expect(prefersMarkdown("text/html")).toBe(false);
  });

  test("404 markdown body points agents at recovery resources", () => {
    const body = notFoundMarkdown("/nope", "en");
    expect(body).toContain("404");
    expect(body).toContain("/sitemap.xml");
    expect(body).toContain("/llms.txt");
    const es = notFoundMarkdown("/nope", "es");
    expect(es).toContain("Mapa del sitio");
  });

  test("404 JSON body is parseable and structured", () => {
    const parsed = JSON.parse(notFoundJson("/api/nope"));
    expect(parsed.ok).toBe(false);
    expect(parsed.error.code).toBe("not_found");
    expect(parsed.error.hint).toContain("/openapi.json");
  });

  test("404 HTML body is valid html with status semantics", () => {
    const html = notFoundHtml("en");
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("404");
    expect(html).toContain("href=");
  });

  test("postAsMarkdown wraps raw post content", () => {
    const md = postAsMarkdown({
      title: "Hello",
      date: "2026-01-01",
      description: "A test post",
      markdown: "## Section\n\ncontent here",
    });
    expect(md).toContain("# Hello");
    expect(md).toContain("2026-01-01");
    expect(md).toContain("## Section");
    expect(md).toContain("content here");
  });
});