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
      // Left col: slides in from left + fades
      gsap.from(leftRef.current, {
        opacity: 0, x: -40, duration: 1.1, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: leftRef.current, start: "top 85%" },
      });

      // Award rows: stagger up from below (translateY [30→0] matching data-anime pattern)
      gsap.from(rowsRef.current.filter(Boolean), {
        opacity: 0, y: 30, duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
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
      {/* overlap-gap-section: top padding so content sits in upper portion */}
      <div className="max-w-[1320px] mx-auto px-8 md:px-16 pt-20 md:pt-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-0">

          {/* col-lg-4: label + h4 + paragraph */}
          <div ref={leftRef} className="lg:col-span-4">
            <span className="text-[#efff02] text-[12px] font-semibold tracking-[3px] uppercase block mb-[5px]">
              International awards
            </span>
            <h4
              className="text-white font-semibold leading-snug mb-[20px]"
              style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
            >
              These awards reflect the hard work.
            </h4>
            <p className="text-[#737373] text-sm leading-relaxed">
              Our buildings combine minimalism &amp; elegance of lines and shapes. We want them
              to be an integral part of the surrounding landscape.
            </p>
          </div>

          {/* col-lg-7 offset-lg-1: award rows */}
          <div className="lg:col-span-7 lg:col-start-6">
            {awards.map((award, i) => (
              <div
                key={award.year}
                ref={(el) => { rowsRef.current[i] = el; }}
                className={`grid items-center py-[25px] pr-10 md:pr-0 relative ${
                  i < awards.length - 1 ? "border-b border-[#3E3E3E]" : ""
                }`}
                style={{ gridTemplateColumns: "2fr 6fr 3fr 1fr" }}
              >
                {/* col-md-2: year */}
                <span className="font-semibold text-[#efff02]">{award.year}</span>

                {/* col-md-6: title */}
                <span className="text-white font-medium" style={{ fontSize: "17px" }}>
                  {award.title}
                </span>

                {/* col-md-3: category — hidden on mobile */}
                <span className="text-[#737373] font-medium text-sm hidden md:block">
                  {award.category}
                </span>

                {/* col-md-1: arrow — absolute right-0 on mobile, inline on md+ */}
                <a
                  href="#"
                  className="text-white hover:text-[#efff02] transition-colors duration-300 flex justify-end absolute right-0 md:static"
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
