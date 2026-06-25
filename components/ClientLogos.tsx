"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  "BJARKE INGELS",
  "ZAHA HADID",
  "FOSTER + PARTNERS",
  "RENZO PIANO",
  "NORMAN FOSTER",
  "TADAO ANDO",
];

export default function ClientLogos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      );

      // Marquee
      const track = trackRef.current;
      if (!track) return;
      const totalWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: -totalWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allClients = [...clients, ...clients];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 border-y border-[#0a0a0a]/8 bg-white overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <div ref={trackRef} className="flex gap-0 whitespace-nowrap">
          {allClients.map((client, i) => (
            <div
              key={`${client}-${i}`}
              className="inline-flex items-center gap-16 px-14"
            >
              <span className="font-cormorant text-xl font-light tracking-[0.15em] text-[#0a0a0a]/30 hover:text-[#0a0a0a]/70 transition-colors duration-300 cursor-pointer select-none">
                {client}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]/20 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
