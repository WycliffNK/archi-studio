"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Atropos from "atropos/react";
import "atropos/css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: "350+", desc: "very satisfied clients around the worldwide.", label: "01" },
  { num: "200+", desc: "good award winning architecture agency.", label: "02" },
  { num: "500+", desc: "building has been constructed with us.", label: "03" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left col — fade + slide up
      gsap.from("[data-about-left]", {
        opacity: 0, y: 40, duration: 1, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: "[data-about-left]", start: "top 85%" },
      });

      // Right circle + text
      gsap.from("[data-about-circle]", {
        opacity: 0, y: -15, scale: 0.8, duration: 1, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: "[data-about-circle]", start: "top 85%" },
      });

      gsap.from("[data-about-right-text]", {
        opacity: 0, duration: 0.8, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: "[data-about-right-text]", start: "top 85%" },
      });

      // Stat rows — staggered
      gsap.from("[data-stat]", {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: "[data-stat]", start: "top 88%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#191919] overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage: "url('/dotted-pattern.svg')",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-8 md:px-16">

        {/* Top row */}
        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-20 mb-14 md:mb-16">

          {/* Left: signature image + heading */}
          <div data-about-left>
            <Image
              src="/signature.png"
              alt="Signature"
              width={136}
              height={13}
              className="mb-5"
              unoptimized
            />
            <h4
              className="text-white font-semibold leading-[1.15] mt-5 mb-0 w-[90%]"
              style={{ fontSize: "clamp(22px, 2.5vw, 34px)" }}
            >
              Delivering awesome quality, effective and inspiring built gorgeous space.
            </h4>
          </div>

          {/* Right: circle + established text */}
          <div className="flex items-center gap-8 md:gap-10">

            {/* Atropos 3D circle with "16" */}
            <div data-about-circle className="flex-shrink-0 text-center">
              <Atropos
                rotateTouch="scroll-y"
                shadow
                activeOffset={40}
                style={{ display: "inline-block", perspective: "500px" }}
              >
                {/* "16" at depth -5 — shifts less than the circle on hover, creating depth */}
                <div
                  data-atropos-offset="-5"
                  className="relative w-full"
                  style={{ top: "50px" }}
                >
                  <span
                    className="absolute left-0 w-full text-center font-bold text-[#191919] leading-none select-none"
                    style={{
                      fontSize: "clamp(130px, 11.5vw, 180px)",
                      letterSpacing: "-3px",
                    }}
                  >
                    16
                  </span>
                </div>
                {/* Yellow circle at default depth — floats in front of "16" on hover */}
                <span className="w-[150px] h-[150px] md:w-[170px] md:h-[170px] xl:w-[210px] xl:h-[210px] rounded-full inline-block bg-[#efff02]" />
              </Atropos>
            </div>

            {/* Established text */}
            <div data-about-right-text>
              <span className="text-white font-semibold text-[14px] uppercase tracking-[1px] block mb-[5px]">
                Established for 16 years.
              </span>
              <p className="text-[#737373] text-sm leading-relaxed w-[90%]">
                We are dedicated to providing outstanding architectural and design services that meet the functional and aesthetic.
              </p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-stat
              className="pr-12 md:pr-10"
            >
              {/* Top separator — hidden on first item mobile (matches reference d-none d-lg-block for first) */}
              <div className={`h-px bg-[#2a2a2a] w-full mb-6 ${i === 0 ? "hidden md:block" : "block"}`} />
              <div className="flex items-start justify-between gap-4 pb-2">
                <span className="text-[#737373] text-[18px] leading-[30px] w-[80%]">
                  <span className="text-white font-semibold">{s.num}</span> {s.desc}
                </span>
                <span className="text-[#efff02] font-medium text-[18px] flex-shrink-0">
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
