import { component$, useSignal, $ } from "@builder.io/qwik";
import { useTranslations } from "~/routes/layout";
import "../styles/Projects.scss";

interface ProjectShot {
  src: string;
  alt: string;
}

type DescKey =
  | "project_calendar_desc"
  | "project_nyady_desc"
  | "project_nya_desc"
  | "project_ds_desc";

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
        alt: "Landing"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/dashboard.png",
        alt: "Dashboard"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/stats1.png",
        alt: "Stats"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/stats2.png",
        alt: "Stats breakdown"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/scan.png",
        alt: "Scan"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/account.png",
        alt: "Account"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/budgets.png",
        alt: "Budgets"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/calendar-money/main/public/assets/docs/categories.png",
        alt: "Categories"
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
        alt: "Home"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nyady/main/public/assets/screenshots/catalog.png",
        alt: "Catalog"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nyady/main/public/assets/screenshots/product.png",
        alt: "Product"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nyady/main/public/assets/screenshots/cart.png",
        alt: "Cart"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nyady/main/public/assets/screenshots/checkout.png",
        alt: "Checkout"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nyady/main/public/assets/screenshots/orders.png",
        alt: "Orders & tracking"
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
        alt: "Catalog"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nya-store/main/public/assets/docs/4.png",
        alt: "Product"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nya-store/main/public/assets/docs/6.png",
        alt: "Checkout"
      },
      {
        src: "https://raw.githubusercontent.com/nady4/nya-store/main/public/assets/docs/5.png",
        alt: "Orders"
      }
    ]
  },
  {
    favicon: "/projects/ds-invite.png",
    name: "DS Invite",
    descKey: "project_ds_desc",
    demo: "https://ds.transistemas.org",
    repos: [
      { label: "Repo", href: "https://github.com/Transistemas-ac/ds-invite" }
    ],
    shots: [
      {
        src: "https://raw.githubusercontent.com/Transistemas-ac/ds-invite/main/public/1.png",
        alt: "Landing page"
      },
      {
        src: "https://raw.githubusercontent.com/Transistemas-ac/ds-invite/main/public/3.png",
        alt: "Bot"
      },
      {
        src: "https://raw.githubusercontent.com/Transistemas-ac/ds-invite/main/public/2.png",
        alt: "Worker"
      }
    ]
  }
];

export default component$(() => {
  const t = useTranslations().value;
  const lightboxSrc = useSignal<string | null>(null);
  const trackRefs = useSignal<HTMLDivElement[]>([]);
  const activeIdx = useSignal(0);

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
      <section id="projects" class="projects-section">
        <header class="projects-head">
          <h2 class="projects-head__title">{t.projects_title}</h2>
        </header>

        <div class="projects-stack">
          {projects.map((project, pIdx) => (
            <article
              key={pIdx}
              class="project-card"
              id={`project-${pIdx}`}
              onMouseEnter$={() => {
                activeIdx.value = pIdx;
              }}
            >
              <div class="project-header">
                <h2>
                  <img
                    class="project-favicon"
                    src={project.favicon}
                    alt=""
                    width={28}
                    height={28}
                    loading="lazy"
                  />
                  {project.name}
                </h2>
                <div class="project-links">
                  {project.demo && (
                    <a
                      class="project-link demo"
                      href={project.demo}
                      target="_blank"
                      rel="noopener"
                    >
                      Demo ↗
                    </a>
                  )}
                  {project.repos.map((repo) => (
                    <a
                      key={repo.href}
                      class="project-link"
                      href={repo.href}
                      target="_blank"
                      rel="noopener"
                    >
                      {repo.label} ↗
                    </a>
                  ))}
                </div>
              </div>

              <p class="project-desc">{t[project.descKey]}</p>

              <div class="gallery">
                <button
                  type="button"
                  class="gallery-nav prev"
                  aria-label="Previous screenshot"
                  onClick$={() => scrollBy(pIdx, -1)}
                >
                  ‹
                </button>
                <div
                  class="gallery-track"
                  ref={(el) => {
                    trackRefs.value[pIdx] = el;
                  }}
                >
                  {project.shots.map((shot) => (
                    <figure class="shot" key={shot.src}>
                      <button
                        type="button"
                        class="shot-btn"
                        onClick$={() => openLightbox(shot.src)}
                        aria-label={`Enlarge ${shot.alt}`}
                      >
                        <img
                          src={shot.src}
                          alt={shot.alt}
                          loading="lazy"
                          width={960}
                          height={600}
                        />
                      </button>
                      <figcaption>{shot.alt}</figcaption>
                    </figure>
                  ))}
                </div>
                <button
                  type="button"
                  class="gallery-nav next"
                  aria-label="Next screenshot"
                  onClick$={() => scrollBy(pIdx, 1)}
                >
                  ›
                </button>
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
        >
          <button
            type="button"
            class="lightbox-close"
            aria-label="Close"
            onClick$={closeLightbox}
          >
            ×
          </button>
          <img
            src={lightboxSrc.value}
            alt="Enlarged screenshot"
            width={1280}
            height={800}
          />
        </div>
      )}
    </>
  );
});
