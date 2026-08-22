import { type RequestHandler } from "@builder.io/qwik-city";
import { buildOpenApi } from "~/lib/openapi";

export const onGet: RequestHandler = ({ json }) => {
  json(200, buildOpenApi());
};
