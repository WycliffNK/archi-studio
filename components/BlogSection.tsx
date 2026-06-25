"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    category: "Architecture",
    title: "The New Language of Sustainable Architecture",
    excerpt:
      "How contemporary architects are reimagining what it means to build responsibly — without sacrificing beauty.",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
    date: "June 12, 2025",
    readTime: "6 min read",
  },
  {
    category: "Interior Design",
    title: "Material Honesty: The Case for Raw Surfaces",
    excerpt:
      "Exposed concrete, raw steel, unfinished timber — why the most refined interiors often embrace imperfection.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    date: "May 28, 2025",
    readTime: "4 min read",
  },
  {
    category: "Urban Planning",
    title: "Designing Cities for the Climate Emergency",
    excerpt:
      "From flood-resilient public spaces to biophilic urbanism — the strategies shaping tomorrow's cities.",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    date: "May 14, 2025",
    readTime: "8 min read",
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="articles" className="py-28 md:py-40 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div
          ref={headlineRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#0a0a0a]/50 mb-4">
              Journal
            </p>
            <h2 className="font-cormorant font-light text-5xl md:text-6xl xl:text-7xl leading-none text-[#0a0a0a]">
              Latest <em className="italic">Articles</em>
            </h2>
          </div>
          <button className="self-start md:self-auto flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors group">
            All Articles
            <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-14" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {articles.map((article, i) => (
            <article
              key={article.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden mb-7">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute bottom-5 left-5">
                  <span className="bg-white text-[#0a0a0a] text-[10px] tracking-[0.25em] uppercase px-4 py-2">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-[11px] tracking-[0.15em] text-[#0a0a0a]/40">{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-[#0a0a0a]/20" />
                <span className="text-[11px] tracking-[0.15em] text-[#0a0a0a]/40">{article.readTime}</span>
              </div>

              <h3 className="font-cormorant text-2xl font-light text-[#0a0a0a] leading-snug mb-4 group-hover:italic transition-all duration-300">
                {article.title}
              </h3>
              <p className="text-[#0a0a0a]/55 text-sm leading-relaxed mb-6">{article.excerpt}</p>

              <div className="flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-[#0a0a0a]/50 group-hover:text-[#0a0a0a] transition-colors">
                Read Article
                <span className="w-5 h-px bg-current transition-all duration-300 group-hover:w-10" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
