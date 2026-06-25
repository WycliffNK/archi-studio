"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Architecture",
    description:
      "Full-spectrum architectural design from concept to completion, blending innovation with structural excellence.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    number: "01",
  },
  {
    title: "Residential Space",
    description:
      "Bespoke residential designs tailored to your lifestyle, creating homes that reflect your unique vision.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    number: "02",
  },
  {
    title: "Interior Design",
    description:
      "Thoughtful interior spaces that balance aesthetics, function, and the subtle language of material.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    number: "03",
  },
  {
    title: "Exterior Planning",
    description:
      "Integrated landscape and exterior design that extends your living space into the natural world.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    number: "04",
  },
];

export default function ServicesSection() {
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
          duration: 0.9,
          delay: i * 0.1,
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
      id="services"
      className="py-28 md:py-40 bg-[#f7f5f2] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div ref={headlineRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#0a0a0a]/50 mb-4">
              What We Do
            </p>
            <h2 className="font-cormorant font-light text-5xl md:text-6xl xl:text-7xl leading-none text-[#0a0a0a]">
              We create <em className="italic">modernity</em>
            </h2>
          </div>
          <p className="text-[#0a0a0a]/55 max-w-xs text-sm leading-relaxed">
            Four core disciplines that together form a complete vision for the built environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-px bg-[#0a0a0a]/8">
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative bg-[#f7f5f2] overflow-hidden cursor-pointer"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <span className="absolute top-5 right-5 font-cormorant text-white/40 text-4xl font-light">
                  {service.number}
                </span>
              </div>

              <div className="p-8">
                <h3 className="font-cormorant text-2xl font-light text-[#0a0a0a] mb-3 group-hover:italic transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-[#0a0a0a]/55 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-[#0a0a0a]/60 group-hover:text-[#0a0a0a] transition-colors duration-300">
                  <span>Learn More</span>
                  <span className="w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
