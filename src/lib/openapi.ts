export const OPENAPI_VERSION = "3.1.0";

export interface OpenApiDocument {
  openapi: string;
  info: Record<string, unknown>;
  servers: Array<{ url: string; description: string }>;
  paths: Record<string, Record<string, unknown>>;
  components: Record<string, unknown>;
  security?: unknown[];
}

const SITE = "https://www.nady4.com";

function jsonErrorResponse(
  description: string,
  messageExample: string,
  codeExample: string,
) {
  return {
    description,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["ok", "message"],
          properties: {
            ok: { type: "boolean", const: false },
            message: {
              type: "string",
              description: "Stable machine-readable error code.",
              example: messageExample,
            },
            error: {
              type: "object",
              properties: {
                code: { type: "string", example: codeExample },
                message: { type: "string" },
                hint: {
                  type: "string",
                  description: "Resolution guidance for the caller.",
                },
              },
            },
          },
        },
      },
    },
  };
}

export function buildOpenApi(): OpenApiDocument {
  return {
    openapi: OPENAPI_VERSION,
    info: {
      title: "nady4.com API",
      summary:
        "Public API surface of the nady4.com portfolio site, including the newsletter subscription endpoint and machine-readable site resources.",
      description:
        "nady4.com exposes a small, fully public API. No API key, OAuth token, or registration is required today: every endpoint is unauthenticated and declared with `security: []`.\n\nScoped permissions are declared in the RFC 9728 protected-resource metadata at https://www.nady4.com/.well-known/oauth-protected-resource (`scopes_supported` is currently empty — the API is public). If authenticated endpoints are added later, their OAuth scopes will be declared there and mirrored in this spec's security schemes.\n\nError responses are always JSON objects with a stable `message` code and an optional structured `error` object containing `code`, `message`, and `hint`.",
      version: "1.0.0",
      contact: {
        name: "Nadya Jerochim",
        email: "dev@nady4.com",
        url: `${SITE}/contact`,
      },
      license: {
        name: "CC BY-SA 4.0",
        url: "https://creativecommons.org/licenses/by-sa/4.0/",
      },
    },
    servers: [
      { url: SITE, description: "Production (canonical, www)" },
      { url: "https://nady4.com", description: "Production (apex, redirects to www)" },
    ],
    paths: {
      "/api/newsletter": {
        post: {
          operationId: "subscribeToNewsletter",
          summary: "Subscribe an email address to the newsletter",
          description:
            "Adds an email address to the nady4.com newsletter subscriber list. The endpoint is public and rate-unlimited at the edge; it requires no authentication. Returns 200 with `{ok:true}` on success. Duplicate subscriptions are idempotent (the backing store is a set).",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      maxLength: 254,
                      description: "Subscriber email address, trimmed before validation.",
                      example: "you@example.com",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Subscribed successfully.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["ok"],
                    properties: { ok: { type: "boolean", const: true } },
                  },
                },
              },
            },
            "400": jsonErrorResponse(
              "Invalid or missing email address.",
              "invalid_email",
              "invalid_email",
            ),
            "405": jsonErrorResponse(
              "Method not allowed (only POST is supported).",
              "method_not_allowed",
              "method_not_allowed",
            ),
            "500": jsonErrorResponse(
              "Storage backend unavailable.",
              "storage_failure",
              "storage_failure",
            ),
          },
          security: [],
        },
      },
      "/openapi.json": {
        get: {
          operationId: "getOpenApiJson",
          summary: "OpenAPI 3.1 specification (JSON)",
          description:
            "Returns this specification. Agents use it to discover the API surface automatically.",
          responses: {
            "200": {
              description: "OpenAPI document, serialized as JSON.",
              content: { "application/json": { schema: { type: "object" } } },
            },
          },
          security: [],
        },
      },
      "/openapi.yaml": {
        get: {
          operationId: "getOpenApiYaml",
          summary: "OpenAPI 3.1 specification (YAML)",
          description:
            "Returns this specification, serialized as YAML for tooling that prefers it.",
          responses: {
            "200": {
              description: "OpenAPI document, serialized as YAML.",
              content: { "text/yaml": { schema: { type: "string" } } },
            },
          },
          security: [],
        },
      },
      "/llms.txt": {
        get: {
          operationId: "getLlmstxt",
          summary: "Agent-facing site guide (llms.txt)",
          description:
            "Markdown guide describing when to use the site, its developer resources, and the API. Follows the llms.txt convention.",
          responses: {
            "200": {
              description: "Markdown site guide.",
              content: { "text/markdown": { schema: { type: "string" } } },
            },
          },
          security: [],
        },
      },
      "/sitemap.xml": {
        get: {
          operationId: "getSitemap",
          summary: "XML sitemap",
          description:
            "Lists all indexable URLs with lastmod dates and hreflang alternates.",
          responses: {
            "200": {
              description: "Sitemap XML document.",
              content: { "application/xml": { schema: { type: "string" } } },
            },
          },
          security: [],
        },
      },
      "/.well-known/oauth-protected-resource": {
        get: {
          operationId: "getProtectedResourceMetadata",
          summary: "RFC 9728 protected-resource metadata",
          description:
            "Machine-readable declaration of the API's scoped permissions. `scopes_supported` is currently empty because the API is fully public.",
          responses: {
            "200": {
              description: "Protected-resource metadata document.",
              content: { "application/json": { schema: { type: "object" } } },
            },
          },
          security: [],
        },
      },
    },
    components: {
      securitySchemes: {},
    },
    security: [],
  };
}

function yamlScalar(value: unknown, indent: number): string {
  const pad = "  ".repeat(indent);
  if (typeof value === "string") {
    if (value === "") return `${pad}""`;
    if (value.includes("\n")) {
      return `${pad}|\n${value
        .split("\n")
        .map((line) => `  ${"  ".repeat(indent)}${line}`)
        .join("\n")}`;
    }
    if (/[:#\[\]{},&*!|>'"%@`?]/.test(value) || /^\s|\s$/.test(value)) {
      return `${pad}${JSON.stringify(value)}`;
    }
    return `${pad}${value}`;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return `${pad}${String(value)}`;
  }
  if (value === null) return `${pad}null`;
  return `${pad}${JSON.stringify(value)}`;
}

export function toYaml(doc: OpenApiDocument): string {
  const lines: string[] = [];
  const emit = (key: string, value: unknown, indent: number) => {
    const pad = "  ".repeat(indent);
    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${pad}${key}: []`);
        return;
      }
      lines.push(`${pad}${key}:`);
      for (const item of value) {
        if (item !== null && typeof item === "object") {
          lines.push(`${pad}  -`);
          for (const [k, v] of Object.entries(item as Record<string, unknown>)) {
            emit(k, v, indent + 2);
          }
        } else {
          lines.push(`${pad}  - ${yamlScalar(item, indent).trim()}`);
        }
      }
      return;
    }
    if (value !== null && typeof value === "object") {
      const entries = Object.entries(value as Record<string, unknown>);
      if (entries.length === 0) {
        lines.push(`${pad}${key}: {}`);
        return;
      }
      lines.push(`${pad}${key}:`);
      for (const [k, v] of entries) emit(k, v, indent + 1);
      return;
    }
    lines.push(yamlScalar(value, indent).replace(/^(\s*)/, `$1${key}: `));
  };

  for (const [k, v] of Object.entries(doc)) emit(k, v, 0);
  return `${lines.join("\n")}\n`;
}

export function buildOpenApiYaml(): string {
  return toYaml(buildOpenApi());
}