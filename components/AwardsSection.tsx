"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const awards = [
  {
    year: "2021",
    title: "Pritzker Architecture Prize",
    category: "Architecture Excellence",
    description: "Recognized for a lifetime of significant contributions to humanity through the art of architecture.",
  },
  {
    year: "2018",
    title: "Aga Khan Award for Architecture",
    category: "Cultural Significance",
    description: "Honoring projects that set new standards of excellence in architecture, planning, and preservation.",
  },
  {
    year: "2015",
    title: "RIBA Royal Gold Medal",
    category: "International Architecture",
    description: "The highest honor in British architecture, awarded for a body of work rather than a single project.",
  },
  {
    year: "2005",
    title: "Architectural Digest AD100",
    category: "Design Leadership",
    description: "Named among the world's most influential architects and interior designers shaping the built world.",
  },
];

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
          },
        }
      );

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const line = linesRef.current[i];

        gsap.fromTo(
          item,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
            },
          }
        );

        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              delay: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="py-28 md:py-40 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div ref={headlineRef} className="mb-20">
          <p className="text-[11px] tracking-[0.4em] uppercase text-white/30 mb-4">
            Recognition
          </p>
          <h2 className="font-cormorant font-light text-5xl md:text-6xl xl:text-7xl leading-none text-white">
            Awards &amp; <em className="italic">Accolades</em>
          </h2>
        </div>

        <div className="flex flex-col">
          {awards.map((award, i) => (
            <div
              key={award.year}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className="group relative"
            >
              <span
                ref={(el) => {
                  linesRef.current[i] = el;
                }}
                className="absolute top-0 left-0 w-full h-px bg-white/10 origin-left"
              />

              <div className="grid md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-12 py-10 md:py-12 group-hover:bg-white/3 transition-colors duration-500 px-0 md:px-2">
                <div>
                  <span className="font-cormorant text-white/30 text-5xl font-light group-hover:text-white/60 transition-colors duration-300">
                    {award.year}
                  </span>
                </div>

                <div>
                  <h3 className="text-white font-light text-xl mb-2 group-hover:italic transition-all duration-300">
                    {award.title}
                  </h3>
                  <p className="text-[11px] tracking-[0.25em] uppercase text-white/35">
                    {award.category}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-white/45 text-sm leading-relaxed max-w-sm">
                    {award.description}
                  </p>
                  <span className="hidden md:block text-white/20 text-2xl group-hover:text-white/60 group-hover:translate-x-2 transition-all duration-300">
                    →
                  </span>
                </div>
              </div>

              {i === awards.length - 1 && (
                <span className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
