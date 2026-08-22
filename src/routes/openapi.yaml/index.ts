import { type RequestHandler } from "@builder.io/qwik-city";
import { buildOpenApiYaml } from "~/lib/openapi";

export const onGet: RequestHandler = ({ headers, send }) => {
  headers.set("Content-Type", "text/yaml; charset=utf-8");
  headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
  send(200, buildOpenApiYaml());
};
