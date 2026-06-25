"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 16, label: "Years Established", suffix: "" },
  { value: 350, label: "Satisfied Clients", suffix: "+" },
  { value: 200, label: "Awards Won", suffix: "+" },
  { value: 500, label: "Buildings Built", suffix: "+" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: headlineRef.current, start: "top 85%" },
      });

      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1.2,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: lineRef.current, start: "top 85%" },
      });

      gsap.from(imageRef.current, {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.2,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: imageRef.current, start: "top 80%" },
      });

      statsRef.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].value;
        const numEl = el.querySelector("[data-count]");
        if (!numEl) return;

        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            const counter = { val: 0 };
            gsap.to(counter, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate() {
                numEl.textContent = Math.round(counter.val).toString();
              },
            });
          },
          once: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-28 md:py-40 bg-white overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left Column */}
          <div>
            <div className="mb-10 overflow-hidden">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#0a0a0a]/50 mb-6">
                About the Studio
              </p>
              <span
                ref={lineRef}
                className="block h-px w-16 bg-[#0a0a0a] mb-8 origin-left"
              />
            </div>

            <div ref={headlineRef} className="mb-12">
              <h2 className="font-cormorant font-light text-5xl md:text-6xl xl:text-7xl leading-[1.1] text-[#0a0a0a]">
                We create spaces that{" "}
                <em className="italic">inspire</em> and endure
              </h2>
            </div>

            <p className="text-[#0a0a0a]/60 leading-relaxed text-base md:text-lg max-w-lg mb-10">
              For over sixteen years, ArchiStudio has been crafting remarkable
              architectural experiences that stand the test of time. Our
              philosophy merges form with function, creating environments that
              resonate deeply with those who inhabit them.
            </p>

            <button className="group flex items-center gap-4 text-[#0a0a0a] text-xs tracking-[0.25em] uppercase">
              <span className="border border-[#0a0a0a] px-8 py-4 hover:bg-[#0a0a0a] hover:text-white transition-all duration-300">
                Discover More
              </span>
            </button>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-12">
            <div ref={imageRef} className="relative h-72 md:h-96 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80"
                alt="Architecture studio"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => { statsRef.current[i] = el; }}
                  className="border-t border-[#0a0a0a]/10 pt-6"
                >
                  <p className="font-cormorant font-light text-5xl md:text-6xl text-[#0a0a0a] leading-none mb-2">
                    <span data-count>0</span>
                    <span>{stat.suffix}</span>
                  </p>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#0a0a0a]/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
