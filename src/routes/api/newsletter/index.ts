import { type RequestHandler } from "@builder.io/qwik-city";
import { kv } from "@vercel/kv";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUBSCRIBERS_KEY = "newsletter:subscribers";

const isValidEmail = (value: string) =>
  value.length <= 254 && EMAIL_RE.test(value);

export const onPost: RequestHandler = async ({ request, json }) => {
  let email: string | undefined;

  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : undefined;
  } catch {
    json(400, { ok: false, message: "invalid_body" });
    return;
  }

  if (!email || !isValidEmail(email)) {
    json(400, { ok: false, message: "invalid_email" });
    return;
  }

  try {
    await kv.sadd(SUBSCRIBERS_KEY, email.toLowerCase());
  } catch {
    json(500, { ok: false, message: "storage_failure" });
    return;
  }

  json(200, { ok: true });
};

export const onGet: RequestHandler = ({ json }) => {
  json(405, { ok: false, message: "method_not_allowed" });
};
