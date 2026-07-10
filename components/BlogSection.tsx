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
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading children stagger (label + h4)
      if (headlineRef.current) {
        gsap.from(Array.from(headlineRef.current.children), {
          y: 50, opacity: 0, duration: 0.6, stagger: 0.3, ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%" },
        });
      }

      // Cards stagger
      gsap.from(cardsRef.current.filter(Boolean), {
        y: 50, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="articles"
      className="bg-[#191919] pt-0 pb-0 relative"
      style={{
        backgroundImage: "url('/dotted-pattern.svg')",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-8 md:px-16 pt-16 md:pt-20">

        {/* Heading */}
        <div ref={headlineRef} className="text-center mb-4 md:mb-6">
          <span className="text-[#efff02] text-[12px] font-semibold tracking-[3px] uppercase block mb-2">
            Architecture news
          </span>
          <h4 className="text-white font-semibold" style={{ fontSize: "clamp(22px, 2.5vw, 30px)" }}>
            Latest articles
          </h4>
        </div>

        {/* Cards grid — 3 columns matching blog-metro grid-3col */}
        <ul className="grid md:grid-cols-3 gap-8 mb-16 list-none p-0">
          {articles.map((article, i) => (
            <li
              key={article.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative overflow-hidden"
              style={{ height: "420px" }}
            >
              {/* Image — zooms on hover */}
              <div className="absolute inset-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  unoptimized
                />
                {/* blog-overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              </div>

              {/* figcaption — flex col justify-end, category floats top via mb-auto */}
              <div className="absolute inset-0 flex flex-col justify-end p-10 z-10">
                {/* Category pill — mb-auto pushes it to the top */}
                <div className="mb-auto">
                  <a
                    href="#"
                    className="bg-white text-[#191919] text-[11px] font-bold uppercase tracking-[1px] px-4 py-[7px] inline-block"
                    onClick={(e) => e.preventDefault()}
                  >
                    {article.category}
                  </a>
                </div>
                {/* Title at bottom */}
                <a
                  href="#"
                  className="text-white font-medium leading-snug block hover:text-[#efff02] transition-colors duration-300"
                  style={{ fontSize: "22px" }}
                  onClick={(e) => e.preventDefault()}
                >
                  {article.title}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
