import { component$, useSignal, useOnDocument, $ } from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
import Signal from "./Signal";
import "../styles/Projects.scss";

interface ProjectShot {
  src: string;
  alt: string;
}

type DescKey =
  | "project_calendar_desc"
  | "project_nyady_desc"
  | "project_nya_desc"
  | "project_dns_desc";

interface Project {
  favicon: string;
  name: string;
  descKey: DescKey;
  demo?: string;
  repos: { label: string; href: string }[];
  shots: ProjectShot[];
}

const projects: Project[] = [
  {
    favicon: "/projects/dns-monitor.png",
    name: "DNS Monitor",
    descKey: "project_dns_desc",
    demo: "https://dns.transistemas.org",
    repos: [
      { label: "Repo", href: "https://github.com/Transistemas-ac/dns-monitor" }
    ],
    shots: [
      {
        src: "https://raw.githubusercontent.com/Transistemas-ac/dns-monitor/main/docs/1.png",
        alt: "DNS Monitor landing page"
      },
      {
        src: "https://raw.githubusercontent.com/Transistemas-ac/dns-monitor/main/docs/2.png",
        alt: "DNS Monitor dashboard"
      },
      {
        src: "https://raw.githubusercontent.com/Transistemas-ac/dns-monitor/main/docs/3.png",
        alt: "DNS Monitor domain checks"
      },
      {
        src: "https://raw.githubusercontent.com/Transistemas-ac/dns-monitor/main/docs/4.png",
        alt: "DNS Monitor alert emails"
      },
      {
        src: "https://raw.githubusercontent.com/Transistemas-ac/dns-monitor/main/docs/5.png",
        alt: "DNS Monitor configuration"
      },
      {
        src: "https://raw.githubusercontent.com/Transistemas-ac/dns-monitor/main/docs/6.png",
        alt: "DNS Monitor status and health"
      }
    ]
  },
  {
    favicon: "/projects/calendar-money.svg",
    name: "Calendar Money",
    descKey: "project_calendar_desc",
    demo: "https://money.nady4.com",
    repos: [
      { label: "Repo Front", href: "https://github.com/nady4/calendar-money" },
      {
        label: "Repo Back",
        href: "https://github.com/nady4/calendar-money-api"
      }
    ],
    shots: [
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/landing.png",
        alt: "Calendar Money landing page"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/dashboard.png",
        alt: "Calendar Money dashboard"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/stats1.png",
        alt: "Calendar Money statistics"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/stats2.png",
        alt: "Calendar Money statistics breakdown"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/scan.png",
        alt: "Calendar Money receipt scanner"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/account.png",
        alt: "Calendar Money account settings"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/budgets.png",
        alt: "Calendar Money budgets"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/categories.png",
        alt: "Calendar Money categories"
      }
    ]
  },
  {
    favicon: "/projects/nyady.png",
    name: "NYADY",
    descKey: "project_nyady_desc",
    demo: "https://nyady.nady4.com",
    repos: [{ label: "Repo", href: "https://github.com/nady4/nyady" }],
    shots: [
      {
        src: "https://raw.githubusercontent.com/nady4/nyady/main/public/assets/screenshots/home.png",
        alt: "NYADY home page"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nyady/main/public/assets/screenshots/catalog.png",
        alt: "NYADY product catalog"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nyady/main/public/assets/screenshots/product.png",
        alt: "NYADY product detail"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nyady/main/public/assets/screenshots/cart.png",
        alt: "NYADY cart"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nyady/main/public/assets/screenshots/checkout.png",
        alt: "NYADY checkout"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nyady/main/public/assets/screenshots/orders.png",
        alt: "NYADY orders and tracking"
      }
    ]
  },
  {
    favicon: "/projects/nya-store.ico",
    name: "Nya Store",
    descKey: "project_nya_desc",
    demo: "https://nya.nady4.com",
    repos: [{ label: "Repo", href: "https://github.com/nady4/nya-store" }],
    shots: [
      {
        src: "https://raw.githubusercontent.com/nady4/nya-store/main/public/assets/docs/1.png",
        alt: "Nya Store catalog"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nya-store/main/public/assets/docs/4.png",
        alt: "Nya Store product page"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nya-store/main/public/assets/docs/6.png",
        alt: "Nya Store checkout"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nya-store/main/public/assets/docs/5.png",
        alt: "Nya Store orders"
      }
    ]
  }
];

export default component$(() => {
  const t = useTranslations().value;
  const lightboxSrc = useSignal<string | null>(null);
  const trackRefs = useSignal<HTMLDivElement[]>([]);

  useOnDocument(
    "keydown",
    $((event: KeyboardEvent) => {
      if (event.key === "Escape") lightboxSrc.value = null;
    })
  );

  const openLightbox = $((src: string) => {
    lightboxSrc.value = src;
  });

  const closeLightbox = $(() => {
    lightboxSrc.value = null;
  });

  const scrollBy = $((idx: number, dir: -1 | 1) => {
    const track = trackRefs.value[idx];
    if (!track) return;
    const amount = track.clientWidth * 0.85 * dir;
    track.scrollBy({ left: amount, behavior: "smooth" });
  });

  return (
    <>
      <section id="projects" class="projects-section section-shell">
        <header class="projects-head reveal">
          <div class="projects-head__meta">
            <Signal code="02 / 04" tone="purple">
              {t.projects_signal}
            </Signal>
            <span>{t.projects_index}</span>
          </div>
          <h2>
            {t.projects_title}
            <span> / {t.projects_suffix}</span>
          </h2>
          <p>{t.projects_intro}</p>
        </header>

        <div class="projects-stack">
          {projects.map((project, pIdx) => (
            <article
              key={project.name}
              class={`project-card project-card--${pIdx + 1} reveal`}
              id={`project-${pIdx}`}
            >
              <div class="project-card__edge" aria-hidden="true">
                <span>0{pIdx + 1}</span>
                <span>CASE</span>
                <span>{pIdx === 0 ? "LIVE" : "FILE"}</span>
              </div>

              <div class="project-card__body">
                <header class="project-header">
                  <div class="project-title">
                    <Signal
                      code={`CASE 0${pIdx + 1}`}
                      tone={
                        pIdx === 3 ? "red" : pIdx === 2 ? "green" : "purple"
                      }
                    >
                      {pIdx === 0 ? t.project_active : t.project_archived}
                    </Signal>
                    <h3>
                      <img
                        class="project-favicon"
                        src={project.favicon}
                        alt=""
                        width={28}
                        height={28}
                        loading="lazy"
                      />
                      <span class="project-name">{project.name}</span>
                    </h3>
                  </div>
                  <div class="project-links">
                    {project.demo && (
                      <a
                        class="project-link project-link--demo"
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.project_live_demo} ↗
                      </a>
                    )}
                    {project.repos.map((repo) => (
                      <a
                        key={repo.href}
                        class="project-link"
                        href={repo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {(repo.label === "Repo Front"
                          ? t.project_repo_front
                          : repo.label === "Repo Back"
                            ? t.project_repo_back
                            : t.project_repo) + " ↗"}
                      </a>
                    ))}
                  </div>
                </header>

                <p class="project-desc">{t[project.descKey]}</p>

                <div class="gallery">
                  <button
                    type="button"
                    class="gallery-nav gallery-nav--prev"
                    aria-label={`${t.project_previous} ${project.name}`}
                    onClick$={() => scrollBy(pIdx, -1)}
                  >
                    ←
                  </button>
                  <div
                    class="gallery-track"
                    ref={(el) => {
                      trackRefs.value[pIdx] = el;
                    }}
                  >
                    {project.shots.map((shot, shotIdx) => (
                      <figure class="shot" key={shot.src}>
                        <button
                          type="button"
                          class="shot-btn"
                          onClick$={() => openLightbox(shot.src)}
                          aria-label={`${t.project_inspect} ${shot.alt}`}
                        >
                          <img
                            src={shot.src}
                            alt={shot.alt}
                            loading="lazy"
                            width={960}
                            height={600}
                          />
                          <span class="shot-index" aria-hidden="true">
                            {String(shotIdx + 1).padStart(2, "0")}
                          </span>
                        </button>
                        <figcaption>{shot.alt}</figcaption>
                      </figure>
                    ))}
                  </div>
                  <button
                    type="button"
                    class="gallery-nav gallery-nav--next"
                    aria-label={`${t.project_next} ${project.name}`}
                    onClick$={() => scrollBy(pIdx, 1)}
                  >
                    →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {lightboxSrc.value && (
        <div
          class="lightbox"
          onClick$={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={t.project_screenshot_inspection}
        >
          <button
            type="button"
            class="lightbox-close"
            aria-label={t.project_close_screenshot}
            onClick$={closeLightbox}
          >
            ×
          </button>
          <img
            src={lightboxSrc.value}
            alt="Enlarged project screenshot"
            width={1280}
            height={800}
            onClick$={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
});
