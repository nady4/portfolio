import { component$ } from "@builder.io/qwik";
import "../styles/Projects.scss";

export default component$(() => {
  return (
    <div id="projects" class="projects-container">
      <h1>Projects</h1>
      <div class="projects-list">
        <div class="project">
          <h2>🐱 Nya Store</h2>
          <p>
            Full Stack e-commerce platform using Next.js 15 (App Router),
            TypeScript, Prisma ORM, PostgreSQL, Redux Toolkit, and a complete
            Mercado Pago payment integration (checkout + redirect flows +
            webhooks). It handles authentication with NextAuth.js + JWT
            sessions.
          </p>
          <div class="links-container">
            <a href="https://nya.nady4.com" target="_blank">
              Demo
            </a>
            <a href="https://github.com/nady4/nya-store" target="_blank">
              Repo
            </a>
          </div>
        </div>
        <div class="project">
          <h2>💸 Calendar Money</h2>
          <p>
            Full-stack cash-flow management web application built using
            TypeScript, Vite, Node.js, Express and MongoDB. Handles
            authorization and authentication via JWT and provides detailed
            financial analytics with charts.
          </p>
          <div class="links-container">
            <a href="https://money.nady4.com" target="_blank">
              Demo
            </a>
            <a href="https://github.com/nady4/calendar-money" target="_blank">
              Repo Front
            </a>
            <a
              href="https://github.com/nady4/calendar-money-api"
              target="_blank"
            >
              Repo Back
            </a>
          </div>
        </div>
        <div class="project">
          <h2>👁️ DNS Monitor</h2>
          <p>
            Cloudflare Worker para recibir notificaciones por email cuando hay
            un cambio en los DNS o nameservers del dominio configurado
          </p>
          <div class="links-container">
            <a
              href="https://github.com/Transistemas-ac/dns-monitor"
              target="_blank"
            >
              Repo
            </a>
          </div>
        </div>
        <div class="project">
          <h2>🔗 DS Invite</h2>
          <p>
            Servicio en Cloudflare Workers que genera URLs temporales para que
            estudiantes puedan acceder a los canales exclusivos del servidor de
            Discord. Incluye autenticación OAuth2, sesiones firmadas y
            validación segura de tokens con tiempo de expiración.
          </p>
          <div class="links-container">
            <a href="https://ds.transistemas.com" target="_blank">
              Demo
            </a>
            <a href="https://github.com/nady4/ds-invite" target="_blank">
              Repo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
