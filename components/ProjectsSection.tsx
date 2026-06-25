"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Leana Cagnotto",
    category: "Residential",
    description:
      "A sculptural villa perched on a hillside, where glass and concrete dissolve the boundary between interior and landscape.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80",
    year: "2024",
  },
  {
    title: "Morocco House",
    category: "Cultural",
    description:
      "An interpretive cultural center inspired by traditional Moroccan geometry, reimagined through a contemporary lens.",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80",
    year: "2023",
  },
  {
    title: "Melana House",
    category: "Residential",
    description:
      "Minimalist Nordic residence that celebrates raw materiality — timber, stone, and the soft Baltic light.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",
    year: "2023",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
          y: 80,
          opacity: 0,
          duration: 1,
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
    <section
      ref={sectionRef}
      id="projects"
      className="py-28 md:py-40 bg-white overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div
          ref={headlineRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#0a0a0a]/50 mb-4">
              Portfolio
            </p>
            <h2 className="font-cormorant font-light text-5xl md:text-6xl xl:text-7xl leading-none text-[#0a0a0a]">
              Featured <em className="italic">Projects</em>
            </h2>
          </div>
          <button className="self-start md:self-auto flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors group">
            View All Work
            <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-14" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group cursor-pointer"
            >
              <div
                className="relative overflow-hidden mb-6"
                style={{ height: i === 0 ? "520px" : "420px" }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-4 py-1">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#0a0a0a]/70">
                    {project.year}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="bg-white text-[#0a0a0a] px-8 py-4 text-xs tracking-[0.25em] uppercase">
                    Explore Project
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#0a0a0a]/40 mb-2">
                  {project.category}
                </p>
                <h3 className="font-cormorant text-3xl font-light text-[#0a0a0a] mb-3 group-hover:italic transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-[#0a0a0a]/55 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
