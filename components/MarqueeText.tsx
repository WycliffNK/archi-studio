"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MarqueeTextProps {
  text: string;
  dark?: boolean;
}

export default function MarqueeText({ text, dark = false }: MarqueeTextProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  const items = Array(8).fill(text);

  return (
    <div
      className={`overflow-hidden py-8 border-y ${
        dark
          ? "bg-[#0a0a0a] border-white/10"
          : "bg-white border-[#0a0a0a]/8"
      }`}
    >
      <div ref={trackRef} className="flex gap-0 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`font-cormorant text-5xl md:text-7xl font-light italic px-12 select-none ${
              dark ? "text-white/10" : "text-[#0a0a0a]/8"
            }`}
          >
            {item}
            <span
              className={`inline-block mx-12 w-4 h-4 rounded-full align-middle ${
                dark ? "bg-white/10" : "bg-[#0a0a0a]/8"
              }`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
