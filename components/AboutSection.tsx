"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: "01",
    text: (
      <>
        <span className="text-white font-semibold">350+</span> very satisfied clients around the worldwide.
      </>
    ),
  },
  {
    number: "02",
    text: (
      <>
        <span className="text-white font-semibold">200+</span> good award winning architecture agency.
      </>
    ),
  },
  {
    number: "03",
    text: (
      <>
        <span className="text-white font-semibold">500+</span> building has been constructed with us.
      </>
    ),
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: leftRef.current, start: "top 85%" },
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        x: 40,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: rightRef.current, start: "top 85%" },
      });

      featuresRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#191919] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Top row */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-16 md:mb-20">
          {/* Left: signature + heading */}
          <div ref={leftRef}>
            <div className="relative h-14 w-36 mb-8 opacity-60">
              <Image
                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=200&q=80"
                alt="Signature"
                fill
                className="object-contain grayscale"
                unoptimized
              />
            </div>
            <h4 className="text-white font-semibold text-2xl md:text-3xl leading-snug">
              Delivering awesome quality, effective and inspiring built gorgeous space.
            </h4>
          </div>

          {/* Right: 16 circle + established text */}
          <div ref={rightRef} className="flex items-center gap-8 md:gap-10">
            {/* "16" circle element */}
            <div className="relative flex-shrink-0">
              <div className="w-[130px] h-[130px] md:w-[160px] md:h-[160px] rounded-full bg-[#efff02] relative">
                <span
                  className="font-antonio font-bold text-[#191919] absolute left-1/2 -translate-x-1/2 leading-none"
                  style={{ fontSize: "clamp(80px, 10vw, 130px)", top: "-20px", letterSpacing: "-3px" }}
                >
                  16
                </span>
              </div>
            </div>
            <div>
              <span className="text-white text-sm font-semibold tracking-[1px] uppercase block mb-3">
                Established for 16 years.
              </span>
              <p className="text-[#737373] text-sm leading-relaxed max-w-xs">
                We are dedicated to providing outstanding architectural and design services that meet the functional and aesthetic.
              </p>
            </div>
          </div>
        </div>

        {/* Features row */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {features.map((f, i) => (
            <div
              key={f.number}
              ref={(el) => { featuresRef.current[i] = el; }}
              className="relative"
            >
              <div className="h-px bg-[#3E3E3E] w-full mb-6 hidden md:block" />
              <div className="flex items-start justify-between gap-4">
                <p className="text-[#737373] text-lg leading-relaxed flex-1">
                  {f.text}
                </p>
                <span className="text-[#efff02] font-medium text-lg flex-shrink-0 mt-0.5">
                  {f.number}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
