"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

const slides = [
  {
    id: "01",
    title: "Malena house",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
  },
  {
    id: "02",
    title: "Rustic interior",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  },
  {
    id: "03",
    title: "Monzo office",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
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

  useEffect(() => {
    const firstSlide = slidesElRef.current[0];
    if (!firstSlide) return;

    gsap.set(firstSlide, { zIndex: 1, opacity: 1 });
    gsap.fromTo(
      firstSlide.querySelectorAll("[data-slide-text]"),
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.14, ease: "power3.out", delay: 0.9 }
    );

    timerRef.current = setInterval(() => {
      goTo((currentRef.current + 1) % slides.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goTo]);

  const goToSlide = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(i);
    timerRef.current = setInterval(() => {
      goTo((currentRef.current + 1) % slides.length);
    }, 6000);
  };

  const nextSlide = () => goToSlide((currentRef.current + 1) % slides.length);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#191919]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          ref={(el) => { slidesElRef.current[index] = el; }}
          className="absolute inset-0"
          style={{ zIndex: 0, opacity: 0 }}
        >
          {/* Background image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            unoptimized
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* Slide number — outline, left side */}
          <div
            data-slide-text
            className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 font-antonio font-bold leading-none select-none pointer-events-none hidden md:block"
            style={{
              fontSize: "clamp(120px, 14vw, 200px)",
              WebkitTextStroke: "2px #efff02",
              color: "transparent",
              letterSpacing: "-3px",
            }}
          >
            {slide.id}
          </div>

          {/* Title + button — bottom left */}
          <div className="absolute bottom-24 md:bottom-32 left-8 md:left-32 xl:left-44 max-w-2xl">
            <h1
              data-slide-text
              className="font-antonio text-white font-medium leading-none mb-8"
              style={{
                fontSize: "clamp(80px, 11vw, 170px)",
                letterSpacing: "-6px",
              }}
            >
              {slide.title}
            </h1>
            <div data-slide-text>
              <a
                href="#"
                className="inline-flex items-center gap-4 text-white text-sm tracking-[0.15em] uppercase font-medium hover:opacity-70 transition-opacity duration-300"
              >
                <span className="w-12 h-12 border border-white/50 rounded-full flex items-center justify-center flex-shrink-0 hover:border-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Explore project</span>
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Right side nav — yellow slide number + white arrow button, side by side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-row items-stretch">
        {/* Yellow box — next slide number */}
        <div
          className="w-28 h-28 lg:w-32 lg:h-32 bg-[#efff02] flex items-center justify-center font-antonio font-bold text-[#191919] select-none"
          style={{ fontSize: "clamp(28px, 3vw, 40px)", letterSpacing: "-2px" }}
        >
          {slides[(displayCurrent + 1) % slides.length].id}
        </div>
        {/* White button — next slide arrow */}
        <button
          onClick={nextSlide}
          className="w-28 h-28 lg:w-32 lg:h-32 bg-white flex items-center justify-center hover:bg-[#efff02] transition-colors duration-300"
          aria-label="Next slide"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-[#191919]">
            <path d="M4 11h14M13 5l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dot navigation */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 md:hidden">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-500 ${
              i === displayCurrent ? "w-1 h-10 bg-[#efff02]" : "w-1 h-5 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-6 left-8 md:left-16 z-20">
        <p className="text-white/35 text-[11px] tracking-[0.3em] uppercase">
          Let&apos;s build something great together
        </p>
      </div>

      {/* Slide counter — bottom right */}
      <div className="absolute bottom-6 right-24 z-20 hidden md:flex items-baseline gap-1">
        <span className="font-antonio text-3xl text-white/80 font-light">
          {slides[displayCurrent].id}
        </span>
        <span className="text-white/30 text-sm">/ 03</span>
      </div>
    </section>
  );
}
