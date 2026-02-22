import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

export const useLocale = routeLoader$(({ request, url }) => {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const paramLang = url.searchParams.get("lang");

  if (paramLang === "es" || paramLang === "en") {
    return paramLang;
  }

  return acceptLanguage.toLowerCase().startsWith("es") ? "es" : "en";
});

export const useTranslations = routeLoader$(({ request, url }) => {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const paramLang = url.searchParams.get("lang");

  const lang =
    paramLang === "es" || paramLang === "en"
      ? paramLang
      : acceptLanguage.toLowerCase().startsWith("es")
        ? "es"
        : "en";

  const t = {
    en: {
      nav_home: "Home",
      nav_experience: "Experience",
      nav_projects: "Projects",
      nav_contact: "Contact",
      nav_resume: "Resume",
      skills_title: "Skills",
      skill_category_frontend: "Frontend",
      skill_category_languages: "Languages",
      skill_category_devops: "DevOps & Cloud",
      skill_category_testing: "Testing",
      skill_category_backend: "Backend",
      skill_category_databases: "Databases",
      skill_category_tools: "Tools",
      skill_category_spoken_languages: "Spoken Languages",
      skill_category_ai: "AI",
      hero_title: "Nadya Jerochim",
      hero_subtitle: "Full Stack Developer",
      hero_desc:
        "Experienced in building web apps and serverless services with React, Node.js, TypeScript and Next.js, working across SQL/NoSQL databases, clean architecture, documentation and agile collaboration.",
      experience_title: "Experience",
      experience_1_title: "Full Stack Developer",
      experience_1_company: "Transistemas",
      experience_1_period: "Dec 2024 - Present",
      experience_1_desc:
        "Design and implementation of the organization's full-stack course and student management app.\nMaintenance and implementation of new requirements for the institutional website.\nMigration from bundler to Vite, hosting to Vercel, and DNS provider to Cloudflare.\nDevelopment of Cloudflare Workers for monitoring DNS and nameserver configurations.\nImplementation of custom email routing using SMTP and POP3.\nDeployment automation, firewall configuration, and observability.\nProject documentation covering internal architecture, DNS configurations, deployments, and security policies.",
      experience_2_title: "Development Team Coordinator",
      experience_2_company: "Transistemas",
      experience_2_period: "July 2025 - Present",
      experience_2_desc:
        "Cross-team coordination between Development, Design, Education, and Communications to assess organizational needs and propose potential software solutions.\nRecruitment, selection, and training of new members for the development team.\nProject management and technical task tracking through GitHub and Notion.\nContact with other organizations to offer our services, train them in their use, and provide ongoing technical support\nLeadership of cybersecurity initiatives and modernization of the organization’s digital infrastructure.",
      projects_title: "Projects",
      project_nya_desc:
        "Full Stack e-commerce platform using Next.js 15 (App Router), TypeScript, Prisma ORM, PostgreSQL, Redux Toolkit, and a complete Mercado Pago payment integration (checkout + redirect flows + webhooks). It handles authentication with NextAuth.js + JWT sessions.",
      project_calendar_desc:
        "Full-stack cash-flow management web application built using TypeScript, Vite, Node.js, Express and MongoDB. Handles authorization and authentication via JWT and provides detailed financial analytics with charts.",
      project_dns_desc:
        "Serverless DNS-monitoring system using Cloudflare Workers that checks internal DNS records and nameserver status every 10 minutes, sending email alerts when changes occur. It also uses KV Storage to keep historical snapshots for accurate diff tracking.",
      project_ds_desc:
        "Cloudflare Workers project handling Discord OAuth login, session cookie creation/validation, and role/invite request flows. Serves a lightweight frontend and provides protected API endpoints with modular controllers and utilities for encryption and cookie handling.",
      contact_title: "Contact",
      contact_text: "Send me an email at",
      footer_name: "Nadya Jerochim",
      footer_mail: "dev@nady4.com",
    },
    es: {
      nav_home: "Inicio",
      nav_experience: "Experiencia",
      nav_projects: "Proyectos",
      nav_contact: "Contacto",
      nav_resume: "Currículum",
      skills_title: "Habilidades",
      skill_category_frontend: "Frontend",
      skill_category_languages: "Lenguajes",
      skill_category_devops: "DevOps y Cloud",
      skill_category_testing: "Testing",
      skill_category_backend: "Backend",
      skill_category_databases: "Bases de Datos",
      skill_category_tools: "Herramientas",
      skill_category_spoken_languages: "Idiomas",
      skill_category_ai: "IA",
      hero_title: "Nadya Jerochim",
      hero_subtitle: "Full Stack Developer",
      hero_desc:
        "Experiencia construyendo aplicaciones web y servicios serverless con React, Node.js, TypeScript y Next.js, trabajando con bases de datos SQL/NoSQL, arquitectura limpia, documentación clara y colaboración en equipos ágiles.",
      experience_title: "Experiencia",
      experience_1_title: "Full Stack Developer",
      experience_1_company: "Transistemas",
      experience_1_period: "Dec 2024 - Presente",
      experience_1_desc:
        "Diseño e implementación fullstack de la app de gestión de cursos y estudiantes de la organización.\nMantenimiento e implementación de nuevos requerimientos en la web institucional.\nMigración de bundler a Vite, hosting a Vercel y proveedor de DNS a Cloudflare.\nDesarrollo de Workers para observabilidad de configuraciones DNS y nameservers.\nImplementación de routing de correos personalizados usando SMTP y POP3.\nAutomatización de despliegues, configuración del firewall y observabilidad.\nDocumentación de proyectos, arquitectura interna, configuraciones DNS, despliegues y políticas de seguridad.",
      experience_2_title: "Coordinadora del Equipo de Desarrollo",
      experience_2_company: "Transistemas",
      experience_2_period: "Julio 2025 - Presente",
      experience_2_desc:
        "Coordinación entre equipos de Desarrollo, Diseño, Educación y Comunicación para evaluar necesidades de la organización y proponer posibles soluciones de software.\nRecrutamiento, selección y capacitación de nuevos integrantes para el equipo de desarrollo.\nGestión de proyectos y seguimiento de tareas técnicas a través de GitHub y Notion.\nContacto con otras organizaciones para ofrecerles nuestros servicios, capacitarlas en su uso y brindar soporte técnico continuo.\nLiderazgo de iniciativas de ciberseguridad y modernización de la infraestructura digital de la organización.",
      projects_title: "Proyectos",
      project_nya_desc:
        "Plataforma e-commerce Full Stack construida con Next.js 15 (App Router), TypeScript, Prisma ORM, PostgreSQL, Redux Toolkit e integración completa con Mercado Pago (checkout + redirect + webhooks). Maneja autenticación con NextAuth.js y sesiones JWT.",
      project_calendar_desc:
        "Aplicación web full-stack para gestión de flujo de caja creada con TypeScript, Vite, Node.js, Express y MongoDB. Maneja autenticación y autorización con JWT y provee analíticas financieras detalladas con gráficos.",
      project_dns_desc:
        "Sistema serverless de monitoreo DNS usando Cloudflare Workers que verifica los registros DNS internos y el estado de los nameservers cada 10 minutos, enviando alertas por correo cuando se detectan cambios. También utiliza KV Storage para mantener snapshots históricos y realizar comparaciones precisas.",
      project_ds_desc:
        "Proyecto en Cloudflare Workers que maneja inicio de sesión vía OAuth de Discord, creación/validación de cookies de sesión y flujos de solicitud de roles/invitaciones. La app sirve un pequeño frontend y expone endpoints protegidos con controladores modulares y utilidades auxiliares de encriptación y manejo de cookies.",
      contact_title: "Contacto",
      contact_text: "Envíame un email a",
      footer_name: "Nadya Jerochim",
      footer_mail: "dev@nady4.com",
    },
  };

  return t[lang];
});

export default component$(() => {
  return <Slot />;
});

export const head: DocumentHead = {
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#0f172a" },
  ],
  links: [
    { rel: "icon", href: "/favicon.png" },
    { rel: "canonical", href: "https://nady4.com/" },
  ],
  scripts: [
    {
      props: {
        type: "application/ld+json",
        dangerouslySetInnerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Nadya Jerochim",
          url: "https://nady4.com/",
          jobTitle: "Full Stack Developer",
          sameAs: [
            "https://github.com/yourgithub",
            "https://linkedin.com/in/yourlinkedin",
          ],
        }),
      },
    },
  ],
};
