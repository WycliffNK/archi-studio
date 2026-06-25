"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "RENZO" },
  { name: "NORMAN" },
  { name: "ZAHA" },
  { name: "FOSTER" },
];

export default function ClientLogos() {
  const sectionRef = useRef<HTMLElement>(null);
  const logosRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      logosRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: i % 2 === 0 ? -20 : 20,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#191919] py-14 md:py-16 border-t border-[#3E3E3E]"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {clients.map((client, i) => (
            <div
              key={client.name}
              ref={(el) => { logosRef.current[i] = el; }}
              className="opacity-30 hover:opacity-60 transition-opacity duration-300"
            >
              <span className="font-antonio text-white text-2xl tracking-[4px] font-bold">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
