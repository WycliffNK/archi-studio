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
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: leftRef.current, start: "top 85%" },
      });

      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.from(row, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          delay: i * 0.12,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="bg-[#1F1F1F] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column */}
          <div ref={leftRef} className="lg:col-span-4">
            <span className="text-[#efff02] text-xs font-semibold tracking-[3px] uppercase block mb-4">
              International awards
            </span>
            <h4 className="text-white font-semibold text-xl md:text-2xl leading-snug mb-5">
              These awards reflect the hard work.
            </h4>
            <p className="text-[#737373] text-sm leading-relaxed">
              Our buildings combine minimalism &amp; elegance of lines and shapes. We want them to be an integral part of the surrounding landscape.
            </p>
          </div>

          {/* Right column — award rows */}
          <div className="lg:col-span-7 lg:col-start-6">
            {awards.map((award, i) => (
              <div
                key={award.year}
                ref={(el) => { rowsRef.current[i] = el; }}
                className={`flex items-center gap-6 md:gap-8 py-6 relative ${
                  i < awards.length - 1 ? "border-b border-[#3E3E3E]" : ""
                }`}
              >
                {/* Year */}
                <span className="text-[#efff02] font-semibold w-12 md:w-16 flex-shrink-0">
                  {award.year}
                </span>
                {/* Title */}
                <span className="text-white font-medium flex-1 text-sm md:text-base">
                  {award.title}
                </span>
                {/* Category */}
                <span className="text-[#737373] font-medium text-sm hidden md:block w-24 flex-shrink-0">
                  {award.category}
                </span>
                {/* Arrow */}
                <a
                  href="#"
                  className="text-white/50 hover:text-white transition-colors duration-300 flex-shrink-0"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
