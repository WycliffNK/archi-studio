"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeText() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;

    const ctx = gsap.context(() => {
      gsap.from(wrapRef.current, {
        opacity: 0, y: 30, duration: 0.9, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: wrapRef.current, start: "top 92%" },
      });
    });

    tweenRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 35,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => { tweenRef.current?.kill(); ctx.revert(); };
  }, []);

  const words = "we love  architecture  and  interior design".split("  ");
  const items = [...Array(6)].flatMap(() => words);

  return (
    <div ref={wrapRef} className="bg-[#191919] py-10 border-y border-[#3E3E3E] cursor-default relative">

      {/* Rotating award badge — top-right, bleeds above section */}
      <div className="absolute right-4 md:right-16 lg:right-20 -top-16 z-10 w-[150px] md:w-[190px] pointer-events-none select-none">
        <div className="relative w-full aspect-square">
          <Image
            src="/home-11.png"
            alt="Award winning architecture agency London"
            fill
            className="object-contain"
            style={{ animation: "badge-rotation 14s linear infinite" }}
            unoptimized
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[42%] h-[42%] relative">
              <Image src="/home-12.png" alt="" fill className="object-contain" unoptimized />
            </div>
          </div>
        </div>
      </div>

      {/* Ticker — overflow hidden only here so badge isn't clipped */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.resume()}
      >
        <div ref={trackRef} className="flex whitespace-nowrap">
          {items.map((word, i) => (
            <span
              key={i}
              className={`font-bold select-none flex-shrink-0 px-8 transition-colors duration-300 ${
                i % 2 === 0 ? "text-[#3E3E3E] hover:text-white/20" : "text-white hover:text-[#efff02]"
              }`}
              style={{ fontSize: "clamp(60px, 8vw, 130px)", letterSpacing: "-3px" }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
