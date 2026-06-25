"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rightRef.current, {
        opacity: 0,
        x: 40,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: rightRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="p-0 bg-[#191919] overflow-hidden">
      <div className="flex flex-col md:flex-row h-auto md:h-[500px]">
        {/* Left: image */}
        <div className="relative w-full md:w-1/2 h-[350px] md:h-full">
          <Image
            src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80"
            alt="Architecture"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Right: nero-grey panel */}
        <div
          ref={rightRef}
          className="relative w-full md:w-1/2 bg-[#1F1F1F] flex flex-col items-center justify-center py-16 md:py-0 overflow-hidden"
        >
          {/* Play button */}
          <a
            href="https://www.youtube.com/watch?v=cfXHhfNy7tU"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-16 h-16 border-2 border-[#efff02] rounded-full flex items-center justify-center mb-8 hover:bg-[#efff02]/10 transition-colors duration-300 z-10"
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path d="M2 2l14 8-14 8V2z" fill="#efff02" />
            </svg>
          </a>

          {/* "we create modernity" */}
          <h2
            className="font-antonio font-medium text-center leading-tight z-10 px-8"
            style={{ fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "-2px" }}
          >
            we create{" "}
            <span className="text-white">modernity</span>
          </h2>

          {/* "architecture" outline text at bottom */}
          <div
            className="absolute bottom-[-20px] left-0 right-0 text-center font-antonio font-bold select-none pointer-events-none leading-none"
            style={{
              fontSize: "clamp(80px, 12vw, 140px)",
              WebkitTextStroke: "1px rgba(255,255,255,0.15)",
              color: "transparent",
              letterSpacing: "-3px",
            }}
          >
            architecture
          </div>
        </div>
      </div>
    </section>
  );
}
