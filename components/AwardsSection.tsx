"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const awards = [
  { year: "2005", title: "Architecture project of the year", category: "Architecture" },
  { year: "2010", title: "Best Interior of the day", category: "Interior" },
  { year: "2018", title: "Best project of the year", category: "Landscape" },
  { year: "2021", title: "Best project of the month", category: "Architecture" },
];

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0, x: -40, duration: 1.1, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: leftRef.current, start: "top 85%" },
      });
      gsap.from(rowsRef.current.filter(Boolean), {
        opacity: 0, y: 30, duration: 0.7, stagger: 0.12, ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="bg-[#1F1F1F] relative"
      style={{
        minHeight: "858px",
        backgroundImage: "url('/dotted-pattern.svg')",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-8 md:px-16 pt-20 md:pt-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-0">

          <div ref={leftRef} className="lg:col-span-4">
            <span className="text-[#efff02] text-[12px] font-semibold tracking-[3px] uppercase block mb-[5px]">
              International awards
            </span>
            <h4 className="text-white font-semibold leading-snug mb-[20px]"
              style={{ fontSize: "clamp(20px, 2vw, 26px)" }}>
              These awards reflect the hard work.
            </h4>
            <p className="text-[#737373] text-sm leading-relaxed">
              Our buildings combine minimalism &amp; elegance of lines and shapes. We want them
              to be an integral part of the surrounding landscape.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {awards.map((award, i) => (
              <div
                key={award.year}
                ref={(el) => { rowsRef.current[i] = el; }}
                className={`group relative grid items-center py-[25px] pr-10 md:pr-0 overflow-hidden cursor-pointer ${
                  i < awards.length - 1 ? "border-b border-[#3E3E3E]" : ""
                }`}
                style={{ gridTemplateColumns: "2fr 6fr 3fr 1fr" }}
              >
                {/* Hover background — slides in from left */}
                <div className="absolute inset-0 bg-[#2a2a2a] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out -z-10"
                  style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }} />

                <span className="font-semibold text-[#efff02] transition-all duration-300 group-hover:pl-2">
                  {award.year}
                </span>

                <span className="text-white font-medium transition-all duration-300 group-hover:pl-2"
                  style={{ fontSize: "17px" }}>
                  {award.title}
                </span>

                <span className="text-[#737373] font-medium text-sm hidden md:block transition-colors duration-300 group-hover:text-white/60">
                  {award.category}
                </span>

                {/* Arrow — slides right on hover */}
                <a href="#"
                  className="text-white flex justify-end absolute right-0 md:static transition-all duration-300 group-hover:text-[#efff02] group-hover:translate-x-1"
                  onClick={(e) => e.preventDefault()}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
