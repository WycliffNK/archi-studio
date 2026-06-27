"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row horizontal parallax: x -110px (entering) → -30px (exiting)
      gsap.fromTo(rowRef.current,
        { x: -110 },
        {
          x: -30, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // "architecture" text: scale 1.6 → 1.0 as section scrolls
      gsap.fromTo(archRef.current,
        { scale: 1.6 },
        {
          scale: 1, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Right panel: play button scales in with elastic bounce
      gsap.from("[data-video-play]", {
        scale: 0.4, opacity: 0, duration: 0.9, ease: "back.out(1.7)",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      // Right panel: heading slides up from below
      gsap.from("[data-video-heading]", {
        y: 40, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.2,
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="p-0 bg-[#191919] overflow-hidden"
      style={{
        backgroundImage: "url('/dotted-pattern.svg')",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Row — wider than viewport due to parallax offset; section overflow-hidden clips it */}
      <div
        ref={rowRef}
        className="flex flex-col md:flex-row items-stretch h-auto md:h-[500px] w-full"
        style={{ willChange: "transform" }}
      >
        {/* Left: cover background image — col-md-6 */}
        <div
          className="w-full md:w-1/2 flex-shrink-0 h-[350px] xs:h-[350px] sm:h-[400px] md:h-full"
          style={{
            backgroundImage: "url('/home-02.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Right: nero-grey panel — col-lg-4 col-md-6 — data-cursor-play: expands ring with ▶ */}
        <div data-cursor-play className="relative w-full md:w-1/2 lg:w-1/3 flex-shrink-0 bg-[#1a1a1a] h-auto sm:h-[350px] md:h-full flex flex-col items-center justify-center py-16 md:py-0 overflow-hidden">

          {/* Play button — border border-2 border-color-base-color rounded-circle video-icon-large */}
          <a
            data-video-play
            href="https://www.youtube.com/watch?v=cfXHhfNy7tU"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-20 h-20 border-2 border-[#efff02] rounded-full flex items-center justify-center mb-[10px] hover:bg-[#efff02]/10 transition-colors duration-300 z-10"
            aria-label="Play video"
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path d="M2 2l14 8-14 8V2z" fill="#efff02" />
            </svg>
          </a>

          {/* h2 — fs-60 fw-500 text-center w-50 xl-w-80 ls-minus-2px */}
          <h2
            data-video-heading
            className="text-white font-medium text-center leading-tight z-10 w-1/2 xl:w-4/5"
            style={{ fontSize: "60px", letterSpacing: "-2px" }}
          >
            we create{" "}
            <span className="text-white">modernity</span>
          </h2>

          {/* "architecture" outline text — position-absolute bottom-minus-20px, fs-140, text-outline white */}
          <div
            ref={archRef}
            className="absolute left-0 right-0 text-center select-none pointer-events-none leading-none"
            style={{
              bottom: "-20px",
              fontSize: "clamp(100px, 12vw, 140px)",
              letterSpacing: "-3px",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.35)",
            }}
          >
            architecture
          </div>
        </div>
      </div>
    </section>
  );
}
