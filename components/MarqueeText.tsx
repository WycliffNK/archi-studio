"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MarqueeText() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 35,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => { tween.kill(); };
  }, []);

  const words = "we love  architecture  and  interior design".split("  ");
  const items = [...Array(6)].flatMap(() => words);

  return (
    <div className="bg-[#191919] overflow-hidden py-10 border-y border-[#3E3E3E]">
      <div ref={trackRef} className="flex whitespace-nowrap">
        {items.map((word, i) => (
          <span
            key={i}
            className={`font-bold select-none flex-shrink-0 px-8 ${
              i % 2 === 0
                ? "text-[#3E3E3E]"
                : "text-white"
            }`}
            style={{ fontSize: "clamp(60px, 8vw, 130px)", letterSpacing: "-3px" }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
