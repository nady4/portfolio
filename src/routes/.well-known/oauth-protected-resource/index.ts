import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = ({ json }) => {
  json(200, {
    resource: "https://www.nady4.com/api",
    authorization_servers: [],
    scopes_supported: [],
    bearer_methods_supported: ["header"],
    resource_signing_alg_values_supported: [],
    description:
      "The nady4.com API surface (https://www.nady4.com/openapi.json) is fully public: every operation declares security: [] and requires no scopes. scopes_supported is intentionally empty. If authenticated endpoints are added, their least-privilege scopes will be declared here first.",
  });
};
