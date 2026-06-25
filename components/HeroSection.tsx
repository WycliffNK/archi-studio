"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

const slides = [
  {
    id: "01",
    title: "Malena House",
    subtitle: "Residential Design",
    description:
      "A stunning modern residence that redefines the boundaries of contemporary living.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
  },
  {
    id: "02",
    title: "Rustic Interior",
    subtitle: "Interior Design",
    description:
      "Blending natural materials with modern aesthetics for timeless interior spaces.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  },
  {
    id: "03",
    title: "Monzo Office",
    subtitle: "Commercial Space",
    description:
      "Innovative workspace design that fosters creativity and collaboration.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
  },
];

export default function HeroSection() {
  const [displayCurrent, setDisplayCurrent] = useState(0);
  const slidesElRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    if (isAnimatingRef.current || next === currentRef.current) return;
    isAnimatingRef.current = true;

    const currentEl = slidesElRef.current[currentRef.current];
    const nextEl = slidesElRef.current[next];
    if (!currentEl || !nextEl) return;

    const prev = currentRef.current;
    currentRef.current = next;
    setDisplayCurrent(next);

    gsap.set(nextEl, { zIndex: 10, opacity: 0 });
    gsap.set(currentEl, { zIndex: 5 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentEl, { zIndex: 0 });
        gsap.set(nextEl, { zIndex: 1 });
        isAnimatingRef.current = false;
        void prev;
      },
    });

    tl.to(currentEl.querySelectorAll("[data-slide-text]"), {
      y: -50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: "power2.in",
    })
      .to(nextEl, { opacity: 1, duration: 0.9, ease: "power2.inOut" }, "<0.1")
      .fromTo(
        nextEl.querySelectorAll("[data-slide-text]"),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" },
        "<0.35"
      );
  }, []);

  const resetTimer = useCallback(
    (next?: number) => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        goTo((currentRef.current + 1) % slides.length);
      }, 6000);
      if (next !== undefined) goTo(next);
    },
    [goTo]
  );

  // Initial entrance animation
  useEffect(() => {
    const firstSlide = slidesElRef.current[0];
    if (!firstSlide) return;

    gsap.set(firstSlide, { zIndex: 1, opacity: 1 });

    gsap.fromTo(
      firstSlide.querySelectorAll("[data-slide-text]"),
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: "power3.out", delay: 0.8 }
    );

    // Start auto-advance
    timerRef.current = setInterval(() => {
      goTo((currentRef.current + 1) % slides.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goTo]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          ref={(el) => {
            slidesElRef.current[index] = el;
          }}
          className="absolute inset-0"
          style={{ zIndex: 0, opacity: 0 }}
        >
          {/* Background */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover scale-105"
            priority={index === 0}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Text Content */}
          <div className="absolute bottom-28 left-8 md:left-20 max-w-2xl">
            <p
              data-slide-text
              className="text-white/60 text-xs tracking-[0.4em] uppercase mb-5"
            >
              {slide.subtitle}
            </p>
            <h1
              data-slide-text
              className="text-white font-cormorant font-light text-6xl md:text-8xl xl:text-[7rem] leading-none mb-6"
            >
              {slide.title}
            </h1>
            <p
              data-slide-text
              className="text-white/65 text-base md:text-lg leading-relaxed max-w-md mb-8"
            >
              {slide.description}
            </p>
            <div data-slide-text>
              <button className="group inline-flex items-center gap-4 text-white text-xs tracking-[0.25em] uppercase border border-white/50 px-8 py-4 hover:bg-white hover:text-black transition-all duration-400">
                Explore Project
                <span className="w-4 h-px bg-current transition-all duration-300 group-hover:w-8" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Counter */}
      <div className="absolute right-8 md:right-20 bottom-28 z-20 flex items-baseline gap-2">
        <span className="text-white font-cormorant text-5xl font-light">
          {slides[displayCurrent].id}
        </span>
        <span className="text-white/40 text-sm">
          / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Dot Navigation */}
      <div className="absolute right-8 md:right-20 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => resetTimer(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-px rounded-full transition-all duration-500 ${
              i === displayCurrent
                ? "h-14 bg-white"
                : "h-7 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Tagline bottom */}
      <div className="absolute bottom-8 left-8 md:left-20 z-20">
        <p className="text-white/35 text-[11px] tracking-[0.3em] uppercase">
          Let&apos;s build something great together
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/60 animate-[slideDown_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
