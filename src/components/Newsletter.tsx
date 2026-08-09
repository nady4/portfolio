import {
  $,
  component$,
  useSignal,
  type QRL,
} from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
import Signal from "./Signal";
import "../styles/Newsletter.scss";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "sending" | "success" | "invalid" | "error";

export default component$(() => {
  const t = useTranslations().value;
  const status = useSignal<Status>("idle");
  const email = useSignal("");

  const onSubmit: QRL<(e: SubmitEvent) => void> = $(
    async () => {
      const value = email.value.trim();

      if (!value || !EMAIL_RE.test(value)) {
        status.value = "invalid";
        return;
      }

      status.value = "sending";

      try {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: value }),
        });
        const body = await res.json();

        if (!res.ok || !body?.ok) {
          status.value = "error";
          return;
        }

        status.value = "success";
      } catch {
        status.value = "error";
      }
    }
  );

  return (
    <section class="newsletter" aria-labelledby="newsletter-title">
      <header class="newsletter__head">
        <Signal code="10 / 10" tone="purple">
          {t.newsletter_signal}
        </Signal>
        <h2 id="newsletter-title">{t.newsletter_title}</h2>
        <p>{t.newsletter_text}</p>
      </header>

      <form class="newsletter__form" preventdefault:submit onSubmit$={onSubmit} noValidate>
        <label class="newsletter__field">
          <span class="newsletter__field-label">{t.newsletter_field}</span>
          <input
            type="email"
            name="email"
            value={email.value}
            placeholder={t.newsletter_placeholder}
            autoComplete="email"
            required
            disabled={status.value === "sending" || status.value === "success"}
            onInput$={$((e: InputEvent) => {
              email.value = (e.target as HTMLInputElement).value;
              if (status.value !== "idle") status.value = "idle";
            })}
            aria-invalid={status.value === "invalid"}
          />
        </label>
        <button type="submit" disabled={status.value === "sending" || status.value === "success"}>
          {status.value === "sending" ? t.newsletter_sending : t.newsletter_button}
          <span aria-hidden="true">↗</span>
        </button>
      </form>

      <p
        class="newsletter__status"
        role="status"
        aria-live="polite"
        data-status={status.value}
      >
        {status.value === "success" && t.newsletter_success}
        {status.value === "invalid" && t.newsletter_invalid}
        {status.value === "error" && t.newsletter_error}
      </p>
    </section>
  );
});
