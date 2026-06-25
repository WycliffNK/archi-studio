"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "ArchiStudio transformed our brief into something far beyond our expectations. The attention to light, material, and spatial flow is extraordinary. Our home feels like it was always meant to be this way.",
    name: "Herman Miller",
    role: "Private Client, London",
    initial: "HM",
  },
  {
    quote:
      "Working with ArchiStudio on our corporate headquarters was an absolute pleasure. They understood our brand language and translated it into a space that energises everyone who enters.",
    name: "Jonsan Donner",
    role: "CEO, Donner Capital",
    initial: "JD",
  },
  {
    quote:
      "The renovation of our heritage property required sensitivity and vision in equal measure. ArchiStudio delivered both. The result honours the past while feeling entirely of the moment.",
    name: "Mackangy Rose",
    role: "Director, Rose Foundation",
    initial: "MR",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 md:py-40 bg-[#f7f5f2] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div ref={headlineRef} className="mb-20">
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#0a0a0a]/50 mb-4">
            Testimonials
          </p>
          <h2 className="font-cormorant font-light text-5xl md:text-6xl xl:text-7xl leading-none text-[#0a0a0a]">
            What clients <em className="italic">say</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[#0a0a0a]/8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="bg-[#f7f5f2] p-10 md:p-12 flex flex-col justify-between gap-10"
            >
              {/* Quote mark */}
              <div>
                <span className="font-cormorant text-7xl text-[#0a0a0a]/15 leading-none block mb-6">
                  &ldquo;
                </span>
                <p className="text-[#0a0a0a]/70 text-base md:text-lg leading-relaxed font-light italic font-cormorant">
                  {t.quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-5 pt-8 border-t border-[#0a0a0a]/10">
                <div className="w-12 h-12 rounded-full bg-[#0a0a0a] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs tracking-widest font-light">
                    {t.initial}
                  </span>
                </div>
                <div>
                  <p className="text-[#0a0a0a] font-medium text-sm">{t.name}</p>
                  <p className="text-[#0a0a0a]/45 text-xs tracking-[0.1em]">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
