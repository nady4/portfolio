import { component$ } from "@builder.io/qwik";
import "../styles/Contact.scss";

export default component$(() => {
  return (
    <div id="contact" class="contact-container">
      <h3>Contact</h3>
      <p>
        Send me an email at <a href="mailto:dev@nady4.com">dev@nady4.com</a>
      </p>
    </div>
  );
});
