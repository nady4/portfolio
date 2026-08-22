import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocale, useTranslations } from "~/routes/layout";
import type { BlogPost } from "~/lib/blog";
import Signal from "./Signal";
import "../styles/BlogSection.scss";

type PostMeta = Omit<BlogPost, "html" | "markdown">;

interface BlogSectionProps {
  posts: PostMeta[];
}

const formatIndex = (n: number) => String(n).padStart(2, "0");

const SLIDE_SPEED = 50;

export default component$<BlogSectionProps>(({ posts }) => {
  const t = useTranslations().value;
  const lang = useLocale().value;
  const blogBase = lang === "es" ? "/es/blog" : "/blog";
  const viewportRef = useSignal<HTMLElement | undefined>(undefined);
  const trackRef = useSignal<HTMLElement | undefined>(undefined);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const viewport = viewportRef.value;
    const track = trackRef.value;
    if (!viewport || !track) return;

    let offset = 0;
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startOffset = 0;
    let lastTime = 0;
    let rafId = 0;

    const wrap = () => {
      const width = track.scrollWidth / 3;
      if (width > 0) {
        while (offset < -width) offset += width;
        while (offset > 0) offset -= width;
      }
    };

    const apply = () => {
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    const step = (now: number) => {
      if (!lastTime) lastTime = now;
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!dragging) offset -= SLIDE_SPEED * dt;
      wrap();
      apply();
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      moved = false;
      startX = e.clientX;
      startOffset = offset;
      if (e.pointerType === "mouse") {
        viewport.setPointerCapture(e.pointerId);
        e.preventDefault();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      offset = startOffset + dx;
      wrap();
      apply();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (viewport.hasPointerCapture(e.pointerId)) {
        viewport.releasePointerCapture(e.pointerId);
      }
    };

    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerUp);
    viewport.addEventListener("click", onClickCapture, true);

    cleanup(() => {
      cancelAnimationFrame(rafId);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerUp);
      viewport.removeEventListener("click", onClickCapture, true);
    });
  });

  return (
    <section id="blog" class="blog-section section-shell">
      <header class="blog-section__head reveal">
        <Signal code="07 / 09" tone="purple">
          {t.blog_signal}
        </Signal>
        <h2>
          <a href={`${blogBase}/`}>
            {t.nav_blog} <span aria-hidden="true">↗</span>
          </a>
        </h2>
      </header>

      <div class="blog-carousel reveal">
        <div class="blog-carousel__viewport" ref={viewportRef}>
          <ol class="blog-carousel__track" ref={trackRef}>
            {[0, 1, 2].flatMap((copy) =>
              posts.map((post, postIndex) => (
                <li
                  class="blog-section__entry"
                  key={`${post.slug}-${copy}`}
                  aria-hidden={copy === 0 ? undefined : "true"}
                >
                  <span class="blog-section__index">
                    {formatIndex(postIndex + 1)}
                  </span>
                  <a href={`${blogBase}/${post.slug}/`}>
                    {post.title} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              )),
            )}
          </ol>
        </div>
      </div>
    </section>
  );
});
