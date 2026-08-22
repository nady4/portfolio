import { type RequestHandler } from "@builder.io/qwik-city";
import { llmsTxt } from "~/lib/llms-txt";

export const onGet: RequestHandler = ({ headers, send }) => {
  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
  headers.set("Vary", "Accept-Encoding");
  send(200, llmsTxt);
};
