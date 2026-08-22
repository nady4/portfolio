import { type RequestHandler } from "@builder.io/qwik-city";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUBSCRIBERS_KEY = "newsletter:subscribers";

const isValidEmail = (value: string) =>
  value.length <= 254 && EMAIL_RE.test(value);

function errorJson(code: string, message: string, hint: string) {
  return {
    ok: false,
    message: code,
    error: { code, message, hint },
  };
}

export const onPost: RequestHandler = async ({ request, json }) => {
  let email: string | undefined;

  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : undefined;
  } catch {
    json(
      400,
      errorJson(
        "invalid_body",
        "The request body must be a JSON object with an 'email' string field.",
        'Send: {"email":"you@example.com"} with Content-Type: application/json.',
      ),
    );
    return;
  }

  if (!email || !isValidEmail(email)) {
    json(
      400,
      errorJson(
        "invalid_email",
        "The 'email' field is missing or not a valid email address.",
        "Use a valid address like you@example.com (max 254 characters).",
      ),
    );
    return;
  }

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    json(
      500,
      errorJson(
        "storage_failure",
        "The newsletter storage backend is not configured.",
        "Retry later; if the problem persists, contact dev@nady4.com.",
      ),
    );
    return;
  }

  try {
    const res = await fetch(
      `${url}/sadd/${SUBSCRIBERS_KEY}/${encodeURIComponent(
        email.toLowerCase(),
      )}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!res.ok) {
      json(
        500,
        errorJson(
          "storage_failure",
          "The newsletter storage backend returned an error.",
          "Retry later; if the problem persists, contact dev@nady4.com.",
        ),
      );
      return;
    }
  } catch {
    json(
      500,
      errorJson(
        "storage_failure",
        "The newsletter storage backend is unreachable.",
        "Retry later; if the problem persists, contact dev@nady4.com.",
      ),
    );
    return;
  }

  json(200, { ok: true });
};

export const onGet: RequestHandler = ({ json }) => {
  json(
    405,
    errorJson(
      "method_not_allowed",
      "Only POST is supported on this endpoint.",
      'Send a POST request with Content-Type: application/json and a JSON body {"email":"you@example.com"}.',
    ),
  );
};

export const onPut: RequestHandler = ({ json }) => {
  json(
    405,
    errorJson(
      "method_not_allowed",
      "Only POST is supported on this endpoint.",
      'Send a POST request with Content-Type: application/json and a JSON body {"email":"you@example.com"}.',
    ),
  );
};

export const onDelete: RequestHandler = ({ json }) => {
  json(
    405,
    errorJson(
      "method_not_allowed",
      "Only POST is supported on this endpoint.",
      'Send a POST request with Content-Type: application/json and a JSON body {"email":"you@example.com"}.',
    ),
  );
};

export const onPatch: RequestHandler = ({ json }) => {
  json(
    405,
    errorJson(
      "method_not_allowed",
      "Only POST is supported on this endpoint.",
      'Send a POST request with Content-Type: application/json and a JSON body {"email":"you@example.com"}.',
    ),
  );
};
