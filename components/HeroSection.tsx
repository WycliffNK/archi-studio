"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

const slides = [
  {
    id: "01",
    title: "Malena house",
    image: "https://craftohtml.themezaa.com/images/demo-architecture-rev-slider-01.jpg",
  },
  {
    id: "02",
    title: "Rustic interior",
    image: "https://craftohtml.themezaa.com/images/demo-architecture-rev-slider-02.jpg",
  },
  {
    id: "03",
    title: "Monzo office",
    image: "https://craftohtml.themezaa.com/images/demo-architecture-rev-slider-03.jpg",
  },
];

function SplitWords({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, wi) => (
        <span key={wi} style={{ display: "block" }}>{word}</span>
      ))}
    </>
  );
}

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

    const nextKb = nextEl.querySelector("[data-kb]");
    if (nextKb) gsap.set(nextKb, { filter: "blur(10px)", x: 60, y: 60 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentEl, { zIndex: 0 });
        gsap.set(nextEl, { zIndex: 1 });
        isAnimatingRef.current = false;
        void prev;
      },
    });

    tl.to(currentEl.querySelectorAll("[data-slide-text]"), {
      y: -50, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power2.in",
    })
      .to(nextEl, { opacity: 1, duration: 0.9, ease: "power2.inOut" }, "<0.1")
      .to(nextKb, { filter: "blur(0px)", x: 0, y: 0, duration: 2.5, ease: "power3.inOut" }, "<")
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
    const firstKb = firstSlide.querySelector("[data-kb]");
    if (firstKb) {
      gsap.fromTo(firstKb,
        { filter: "blur(10px)", x: 60, y: 60 },
        { filter: "blur(0px)", x: 0, y: 0, duration: 2.5, ease: "power3.inOut", delay: 0.3 }
      );
    }
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
          {/* Background image — Ken Burns wrapper */}
          <div data-kb className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              unoptimized
            />
          </div>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* Slide number — outline, left side */}
          <div
            data-slide-text
            className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 font-bold leading-none select-none pointer-events-none hidden md:block"
            style={{
              fontSize: "clamp(120px, 14vw, 200px)",
              WebkitTextStroke: "2px #efff02",
              color: "transparent",
              letterSpacing: "0px",
            }}
          >
            {slide.id}
          </div>

          {/* Title + button — bottom left */}
          <div className="absolute bottom-24 md:bottom-32 left-8 md:left-32 xl:left-44 max-w-2xl">
            <h1
              data-slide-text
              className="text-white font-medium leading-none mb-8"
              style={{
                fontSize: "clamp(80px, 11vw, 170px)",
                letterSpacing: "clamp(-6px, -0.84vw, -12px)",
              }}
            >
              <SplitWords text={slide.title} />
            </h1>
            <div data-slide-text>
              <a
                href="#"
                className="group inline-flex items-center gap-4 text-white text-sm tracking-[0.15em] uppercase font-medium"
              >
                {/* Circle — fills white on hover, clips both arrows */}
                <span className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-white/50 group-hover:border-white group-hover:bg-white transition-colors duration-500">
                  {/* Arrow 1 — exits top-right on hover */}
                  <span
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
                    style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
                  >
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      className="transition-transform duration-500 group-hover:translate-x-full group-hover:-translate-y-full"
                      style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {/* Arrow 2 — enters from bottom-left on hover */}
                  <span
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      className="transition-transform duration-500 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0"
                      style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </span>
                {/* Text roll — exits up, clone enters from below */}
                <span className="relative overflow-hidden block">
                  <span
                    className="block transition-transform duration-500 group-hover:-translate-y-full"
                    style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
                  >
                    Explore project
                  </span>
                  <span
                    className="absolute inset-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0"
                    style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
                  >
                    Explore project
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Right side nav — yellow slide number + white arrow button, side by side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-row items-stretch">
        {/* Yellow box — next slide number */}
        <div
          className="bg-[#efff02] flex items-center justify-center font-bold text-[#191919] select-none"
          style={{ width: "120px", height: "120px", fontSize: "40px", letterSpacing: "-3px" }}
        >
          {slides[(displayCurrent + 1) % slides.length].id}
        </div>
        {/* White button — black wipe left→right on hover, arrow inverts via mix-blend-difference */}
        <button
          onClick={nextSlide}
          className="group bg-white relative overflow-hidden flex items-center justify-center"
          style={{ width: "120px", height: "120px" }}
          aria-label="Next slide"
        >
          {/* Black wipe overlay — scales from left on hover */}
          <span
            className="absolute inset-0 bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
          />
          {/* Arrow — mix-blend-difference: appears dark on white, white on black */}
          <svg
            width="22" height="22" viewBox="0 0 22 22" fill="none"
            className="relative z-10 mix-blend-difference"
          >
            <path d="M4 11h14M13 5l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

    </section>
  );
}
