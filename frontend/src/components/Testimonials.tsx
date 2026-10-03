import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { testimonials } from "../data/site";
import type { Testimonial } from "../data/site";

const getPerView = () =>
  typeof window === "undefined"
    ? 3
    : window.innerWidth <= 700
      ? 1
      : window.innerWidth <= 1100
        ? 2
        : 3;

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

const Stars = () => (
  <span className="testimonial-stars" aria-label="Rated 5 out of 5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
    ))}
  </span>
);

const Card = ({
  testimonial,
  index,
  center,
}: {
  testimonial: Testimonial;
  index: number;
  center: boolean;
}) => (
  <article
    className={`testimonial-card ${center ? "is-center" : ""}`}
    data-testid={`testimonial-card-${index + 1}`}
  >
    <Stars />
    <p className="testimonial-quote">“{testimonial.quote}”</p>
    <div className="testimonial-person">
      <span className="testimonial-avatar" aria-hidden="true">
        {initials(testimonial.name)}
      </span>
      <div>
        <p className="testimonial-name">{testimonial.name}</p>
        <p className="testimonial-meta">{testimonial.meta}</p>
      </div>
    </div>
  </article>
);

export const Testimonials = () => {
  const [perView, setPerView] = useState(getPerView);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => setPerView(getPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const slides = useMemo(() => {
    const chunks: Testimonial[][] = [];
    for (let i = 0; i < testimonials.length; i += perView) {
      chunks.push(testimonials.slice(i, i + perView));
    }
    return chunks;
  }, [perView]);

  useEffect(() => {
    setPage((p) => Math.min(p, slides.length - 1));
  }, [slides.length]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = setInterval(
      () => setPage((p) => (p + 1) % slides.length),
      4200,
    );
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const go = (direction: number) =>
    setPage((p) => (p + direction + slides.length) % slides.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current !== null) {
      const delta = e.changedTouches[0].clientX - touchX.current;
      if (delta < -45) go(1);
      else if (delta > 45) go(-1);
    }
    touchX.current = null;
    setPaused(false);
  };

  return (
    <section
      className="testimonials section-pad"
      data-testid="testimonials-section"
    >
      <Reveal className="section-kicker">
        <span>05</span>
        <span>Kind words</span>
      </Reveal>
      <div className="testimonials-heading">
        <Reveal as="h2" className="display-heading">
          What our
          <br />
          <em>clients say.</em>
        </Reveal>
        <Reveal as="p" className="muted" delay={0.1}>
          Genuine experiences from the homes
          <br />
          and spaces we have shaped.
        </Reveal>
      </div>

      <div
        className="testimonial-viewport"
        data-testid="testimonial-slider"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="testimonial-track"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {slides.map((chunk, slideIndex) => (
            <div
              className="testimonial-slide"
              style={{ "--per-view": perView } as React.CSSProperties}
              key={slideIndex}
              aria-hidden={slideIndex !== page}
            >
              {chunk.map((t, i) => (
                <Card
                  key={t.name}
                  testimonial={t}
                  index={slideIndex * perView + i}
                  center={perView === 3 && i === 1}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="testimonial-nav">
        <div className="testimonial-dots" data-testid="testimonial-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === page ? "active" : ""}`}
              onClick={() => setPage(i)}
              data-testid={`testimonial-dot-${i + 1}`}
              aria-label={`Go to testimonial page ${i + 1}`}
            />
          ))}
        </div>
        <div className="slider-controls">
          <button
            onClick={() => go(-1)}
            data-testid="testimonial-prev-button"
            aria-label="Previous testimonials"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => go(1)}
            data-testid="testimonial-next-button"
            aria-label="Next testimonials"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};
