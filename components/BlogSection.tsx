"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    category: "Architect",
    title: "Everything designed things are designed.",
    image: "/blog-01.jpg",
  },
  {
    category: "Interior",
    title: "Teamwork is essential for small teams challenges.",
    image: "/blog-02.jpg",
  },
  {
    category: "Landscape",
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
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: headlineRef.current, start: "top 85%" },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 70,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.15,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });

      // Ghost "architecture" text: parallax scrub — drifts up as section scrolls
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
        {/* Header */}
        <div
          ref={headlineRef}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[#efff02] text-xs font-semibold tracking-[3px] uppercase block mb-3">
            Architecture news
          </span>
          <h4 className="text-white font-semibold text-2xl md:text-3xl">
            Latest articles
          </h4>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {articles.map((article, i) => (
            <article
              key={article.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ height: "420px" }}
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-12">
                <div>
                  <span className="bg-white text-[#191919] text-xs font-bold uppercase tracking-[1px] px-4 py-1.5 rounded-full inline-block">
                    {article.category}
                  </span>
                </div>
                <a
                  href="#"
                  className="text-white font-medium text-lg leading-snug hover:text-[#efff02] transition-colors duration-300 block"
                  style={{ fontSize: "22px" }}
                >
                  {article.title}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* "architecture" outline text at bottom — parallax scrub via archRef */}
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
