import { component$ } from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
import "../styles/Contact.scss";

export default component$(() => {
  const t = useTranslations().value;

  return (
    <div id="contact" class="contact-container">
      <h3>{t.contact_title}</h3>
      <p>
        {t.contact_text} <a href="mailto:dev@nady4.com">dev@nady4.com</a>
      </p>
    </div>
  );
});
