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
      // Reference: opacity only, easeOutQuad (power2.out), 600ms
      gsap.from("[data-about-left]", {
        opacity: 0, duration: 0.6, ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: "[data-about-left]", start: "top 85%" },
      });
      // Reference: translateY -15→0 (slides down from above), scale 0.8→1, opacity
      gsap.from("[data-about-circle]", {
        opacity: 0, y: -15, scale: 0.8, duration: 0.6, ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: "[data-about-circle]", start: "top 85%" },
      });
      gsap.from("[data-about-right-text]", {
        opacity: 0, duration: 0.6, ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: "[data-about-right-text]", start: "top 85%" },
      });
      // Reference: opacity only, stagger 300ms each child
      gsap.from("[data-stat]", {
        opacity: 0, duration: 0.6, stagger: 0.3, ease: "power2.out",
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

        {/* Top row — left col + right col side by side at lg */}
        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-20 mb-14 md:mb-16">

          {/* Left: signature + heading — col-lg-6 md-mb-50px sm-mb-40px text-center text-sm-start */}
          <div data-about-left className="text-center sm:text-left mb-10 sm:mb-10 lg:mb-0">
            <Image
              src="/signature.png"
              alt="Signature"
              width={272}
              height={25}
              className="max-w-[272px] w-auto inline-block"
              unoptimized
            />
            <h4
              className="text-white font-semibold leading-[1.2] mt-5 mb-0 w-[90%] lg:w-full"
              style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
            >
              Delivering awesome quality, effective and inspiring built gorgeous space.
            </h4>
          </div>

          {/* Right: atropos circle + established text */}
          <div className="flex items-center justify-center sm:justify-start gap-8 md:gap-10">

            {/* Atropos 3D circle — col-xl-6 col-lg-5 col-sm-4 */}
            <div data-about-circle className="flex-shrink-0 text-center">
              <Atropos
                rotateTouch="scroll-y"
                shadow
                activeOffset={40}
                style={{ display: "inline-block", perspective: "500px" }}
              >
                {/* "16" at depth -5: lags behind the circle on tilt = depth illusion */}
                <div
                  data-atropos-offset="-5"
                  className="relative w-full"
                  style={{ top: "50px" }}
                >
                  <span
                    className="absolute left-0 w-full text-center font-bold text-[#191919] leading-none select-none"
                    style={{ fontSize: "clamp(130px, 11.5vw, 180px)", letterSpacing: "-3px" }}
                  >
                    16
                  </span>
                </div>
                {/* Yellow circle at default depth — appears in front on hover */}
                <span className="w-[150px] h-[150px] md:w-[170px] md:h-[170px] xl:w-[210px] xl:h-[210px] rounded-full inline-block bg-[#efff02]" />
              </Atropos>
            </div>

            {/* "Established for 16 years." text — col-xl-6 col-lg-7 col-sm-8 text-center text-sm-start */}
            <div data-about-right-text className="text-center sm:text-left">
              {/* fs-14 text-uppercase ls-1px text-white fw-600 d-block mb-5px */}
              <span className="text-[14px] uppercase tracking-[1px] text-white font-semibold block mb-[5px]">
                Established for 16 years.
              </span>
              {/* w-90 lg-w-100 */}
              <p className="text-[#737373] text-sm leading-relaxed w-[90%] lg:w-full">
                We are dedicated to providing outstanding architectural and design services that meet the functional and aesthetic.
              </p>
            </div>
          </div>
        </div>

        {/* Stats row — row-cols-1 row-cols-lg-3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-stat
              className="pr-12 mb-[30px] lg:mb-0"
            >
              {/* separator-line-1px bg-charcoal-grey mb-25px — first item d-none d-lg-block */}
              <div className={`h-px bg-[#333333] w-full mb-[25px] ${i === 0 ? "hidden lg:block" : "block"}`} />
              {/* feature-box feature-box-left-icon: content left, icon number right */}
              <div className="flex items-start justify-between gap-4">
                {/* text-medium-gray fs-18 lh-30 w-80 sm-w-90 d-block */}
                <span className="text-[#737373] text-[18px] leading-[30px] w-[80%] sm:w-[90%] block">
                  <span className="text-white font-semibold">{s.num}</span>{" "}
                  {s.desc}
                </span>
                {/* fs-18 fw-500 text-base-color */}
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
