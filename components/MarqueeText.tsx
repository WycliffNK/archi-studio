"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeText() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { x: 100, scale: 1.5 },
        {
          x: -200, scale: 0.7, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#191919] relative py-12 md:py-16"
      style={{
        backgroundImage: "url('/dotted-pattern.svg')",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat",
      }}
    >
      <div
        ref={textRef}
        className="font-antonio font-semibold text-center whitespace-nowrap mb-5"
        style={{
          fontSize: "clamp(80px, 12vw, 180px)",
          color: "#3E3E3E",
          letterSpacing: "-7px",
          transformOrigin: "center center",
        }}
      >
        <span style={{ WebkitTextStroke: "1px white", color: "transparent" }}>
          we love
        </span>
        {" "}architecture{" "}
        <span style={{ WebkitTextStroke: "1px white", color: "transparent" }}>
          and
        </span>
        {" "}interior
      </div>

      {/* Rotating award badge - right side, bleeds above section */}
      <div className="absolute right-4 md:right-[72px] -top-12 z-10 w-[150px] md:w-[190px] pointer-events-none select-none">
        <div className="relative w-full aspect-square">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <defs>
              {/* Clockwise circle path starting at 12 o'clock, radius 84 */}
              <path id="marqueeBadgePath" d="M 100,16 A 84,84 0 1 1 99.99,16" />
            </defs>

            {/* Spinning outer ring: white circle + curved text */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 100 100;360 100 100"
                dur="14s"
                repeatCount="indefinite"
              />
              <circle cx="100" cy="100" r="98" fill="white" />
              <text
                fill="#191919"
                fontSize="9"
                fontWeight="700"
                letterSpacing="3"
                fontFamily="Arial, sans-serif"
              >
                <textPath
                  href="#marqueeBadgePath"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  WINNING ARCHITECTURE AGENCY · LONDON · THOUSAND OF AWARD ·
                </textPath>
              </text>
            </g>

            {/* Static center: yellow circle + bold "1" */}
            <circle cx="100" cy="100" r="47" fill="#efff02" />
            <text
              x="100"
              y="100"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#191919"
              fontSize="64"
              fontWeight="900"
              fontFamily="Arial, sans-serif"
            >
              1
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
