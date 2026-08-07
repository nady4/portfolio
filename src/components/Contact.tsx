import { component$ } from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
import Signal from "./Signal";
import "../styles/Contact.scss";

export default component$(() => {
  const t = useTranslations().value;

  return (
    <section id="contact" class="contact-section section-shell">
      <div class="contact__signal reveal">
        <Signal code="07 / 09" tone="green">
          {t.contact_signal}
        </Signal>
        <span>{t.contact_response}</span>
      </div>
      <div class="contact__copy reveal">
        <h2>{t.contact_title}</h2>
        <p>{t.contact_text}</p>
        <a href="mailto:dev@nady4.com">
          dev@nady4.com <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div class="contact__coordinates" aria-hidden="true">
        <span>{t.contact_coordinates}</span>
        <span>34° 36′ 12″ S</span>
        <span>58° 22′ 54″ W</span>
      </div>
    </section>
  );
});
