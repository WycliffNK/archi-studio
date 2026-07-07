"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    category: "Architect",
    date: "28 Mar 2024",
    title: "Everything designed things are designed.",
    image: "/blog-01.jpg",
  },
  {
    category: "Interior",
    date: "15 Apr 2024",
    title: "Teamwork is essential for small teams challenges.",
    image: "/blog-02.jpg",
  },
  {
    category: "Landscape",
    date: "02 May 2024",
    title: "Some people just try to celebrate joys of life.",
    image: "/blog-03.jpg",
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const archRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: headlineRef.current, start: "top 85%" },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 70, opacity: 0, duration: 0.9, delay: i * 0.15, ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });

      gsap.fromTo(archRef.current,
        { y: 60 },
        {
          y: -40, ease: "none",
          scrollTrigger: {
            trigger: archRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="articles"
      className="bg-[#191919] py-20 md:py-28 overflow-hidden relative"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div ref={headlineRef} className="text-center mb-12 md:mb-16">
          <span className="text-[#efff02] text-xs font-semibold tracking-[3px] uppercase block mb-3">
            Architecture news
          </span>
          <h4 className="text-white font-semibold text-2xl md:text-3xl">
            Latest articles
          </h4>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {articles.map((article, i) => (
            <article
              key={article.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ height: "420px" }}
            >
              {/* Image — zooms on hover */}
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                unoptimized
              />

              {/* Gradient overlay — deepens on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

              {/* Category + date — top left */}
              <div className="absolute top-8 left-8 z-10 flex items-center gap-3">
                <span className="text-[#efff02] text-[11px] font-semibold tracking-[2px] uppercase">
                  {article.category}
                </span>
                <span className="text-white/30 text-[11px]">—</span>
                <span className="text-white/50 text-[11px]">{article.date}</span>
              </div>

              {/* Bottom content — slides up on hover to reveal "Read more" */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-10 translate-y-[44px] group-hover:translate-y-0 transition-transform duration-500"
                style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}>
                <a
                  href="#"
                  className="text-white font-medium leading-snug block mb-5 transition-colors duration-300 group-hover:text-white"
                  style={{ fontSize: "20px" }}
                  onClick={(e) => e.preventDefault()}
                >
                  {article.title}
                </a>

                {/* "Read more" — fades in as content slides up */}
                <a
                  href="#"
                  className="inline-flex items-center gap-3 text-[#efff02] text-[12px] font-semibold tracking-[1px] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                  onClick={(e) => e.preventDefault()}
                >
                  Read more
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Outline "architecture" text — parallax scrub */}
      <div
        ref={archRef}
        className="text-center font-bold select-none pointer-events-none leading-none overflow-hidden"
        style={{
          fontSize: "clamp(80px, 13vw, 200px)",
          WebkitTextStroke: "1px #3E3E3E",
          color: "transparent",
          letterSpacing: "-5px",
        }}
      >
        architecture
      </div>
    </section>
  );
}
