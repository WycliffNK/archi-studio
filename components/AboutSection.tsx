"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: "01",
    text: (
      <>
        <span className="text-white font-semibold">350+</span>{" "}
        very satisfied clients around the worldwide.
      </>
    ),
  },
  {
    number: "02",
    text: (
      <>
        <span className="text-white font-semibold">200+</span>{" "}
        good award winning architecture agency.
      </>
    ),
  },
  {
    number: "03",
    text: (
      <>
        <span className="text-white font-semibold">500+</span>{" "}
        building has been constructed with us.
      </>
    ),
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: leftRef.current, start: "top 85%" },
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        x: 40,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: rightRef.current, start: "top 85%" },
      });

      featuresRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#191919] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Top row */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-16 md:mb-20">

          {/* Left: signature SVG + heading */}
          <div ref={leftRef}>
            {/* Signature — SVG cursive path */}
            <svg
              viewBox="0 0 220 55"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-8 opacity-70"
              style={{ width: "180px", height: "45px" }}
            >
              <path
                d="M5 38 C15 10, 28 8, 38 28 C45 42, 52 44, 60 30 C68 16, 75 12, 85 32 C92 46, 100 48, 110 30 C118 16, 126 12, 136 30 C143 42, 152 46, 162 32 C170 20, 180 16, 195 30 C202 36, 208 38, 215 35"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 46 Q60 50, 120 46 Q170 42, 215 45"
                fill="none"
                stroke="white"
                strokeWidth="0.8"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>

            <h4 className="text-white font-semibold text-2xl md:text-3xl leading-snug">
              Delivering awesome quality, effective and inspiring built gorgeous space.
            </h4>
          </div>

          {/* Right: "16" circle + established text */}
          <div ref={rightRef} className="flex items-center gap-8 md:gap-12">

            {/* "16" over yellow circle */}
            <div
              className="relative flex-shrink-0 text-center"
              style={{ width: "210px", height: "210px" }}
            >
              {/* Yellow circle */}
              <div className="absolute bottom-0 left-0 w-full h-full rounded-full bg-[#efff02]" />
              {/* "16" text — overflows slightly above circle */}
              <span
                className="absolute left-0 w-full text-center font-antonio font-bold text-[#191919] leading-none z-10 select-none"
                style={{
                  fontSize: "clamp(120px, 14vw, 175px)",
                  letterSpacing: "-6px",
                  top: "-12px",
                }}
              >
                16
              </span>
            </div>

            <div>
              <span className="text-white text-sm font-semibold tracking-[1px] uppercase block mb-3">
                Established for 16 years.
              </span>
              <p className="text-[#737373] text-sm leading-relaxed max-w-xs">
                We are dedicated to providing outstanding architectural and design services that meet the functional and aesthetic.
              </p>
            </div>
          </div>
        </div>

        {/* Features row */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {features.map((f, i) => (
            <div
              key={f.number}
              ref={(el) => { featuresRef.current[i] = el; }}
              className="relative"
            >
              <div className="h-px bg-[#3E3E3E] w-full mb-6 hidden md:block" />
              <div className="flex items-start justify-between gap-4">
                <p className="text-[#737373] text-lg leading-relaxed flex-1">
                  {f.text}
                </p>
                <span className="text-[#efff02] font-medium text-lg flex-shrink-0 mt-0.5">
                  {f.number}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
