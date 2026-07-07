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
      id="about"
      className="bg-[#191919] overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage: "url('/dotted-pattern.svg')",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-8 md:px-16">

        {/* Top row — mb-5 sm-mb-30px: base=30px, sm+(640px)=48px */}
        <div className="grid lg:grid-cols-2 items-center mb-[30px] sm:mb-12">

          {/* Left: col-lg-6 md-mb-50px sm-mb-40px text-center text-sm-start */}
          {/* md-mb-50px (≤767px)=50px, sm-mb-40px (≤575px)=40px → Tailwind: base=40px, sm=50px, lg=0 */}
          <div data-about-left className="text-center sm:text-left mb-[40px] sm:mb-[50px] lg:mb-0">
            <Image
              src="/signature.png"
              alt="Signature"
              width={272}
              height={25}
              className="max-w-[272px] w-auto inline-block"
              unoptimized
            />
            {/* w-90 lg-w-100: default=90%, ≤991px=100% → Tailwind: base=100%, lg=90% */}
            <h4
              className="text-white font-semibold leading-[1.2] mt-5 mb-0 w-full lg:w-[90%]"
              style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
            >
              Delivering awesome quality, effective and inspiring built gorgeous space.
            </h4>
          </div>

          {/* Right: col-lg-6 — inner 12-col grid matching col-xl-6/lg-5/sm-4 + col-xl-6/lg-7/sm-8 */}
          <div>
            <div className="grid grid-cols-12 items-center">

              {/* Circle: col-xl-6 col-lg-5 col-sm-4, xs-mb-15px, text-center text-sm-start text-lg-center */}
              {/* position-relative + transform-3d (preserve-3d) = Crafto classes on the col */}
              <div
                data-about-circle
                className="col-span-12 sm:col-span-4 lg:col-span-5 xl:col-span-6 relative text-center sm:text-left lg:text-center mb-[15px] sm:mb-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Atropos
                  shadow
                  rotateTouch
                  duration={300}
                  innerClassName="text-center"
                  style={{ display: "inline-block" }}
                  {...{ 'data-atropos-perspective': 500 }}
                >
                  {/* top-50px default, lg-top-30px (≤991px), md-top-40px (≤767px) → Tailwind: base=40px, md=30px, lg=50px */}
                  <div
                    data-atropos-offset="-5"
                    className="relative w-full top-[40px] md:top-[30px] lg:top-[50px]"
                  >
                    {/* fs-180 default, lg-fs-130 (≤991px), md-fs-150 (≤767px) → Tailwind: base=150px, md=130px, lg=180px */}
                    <span
                      className="absolute left-0 w-full text-center font-antonio font-bold text-[#191919] leading-none select-none text-[150px] md:text-[130px] lg:text-[180px]"
                      style={{ letterSpacing: "-3px" }}
                    >
                      16
                    </span>
                  </div>
                  {/* w-210px default, lg-w-150px (≤991px), md-w-170px (≤767px), sm-w-150px (≤575px) → Tailwind: base=150px, sm=170px, md=150px, lg=210px */}
                  <span className="w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] md:w-[150px] md:h-[150px] lg:w-[210px] lg:h-[210px] rounded-full inline-block bg-[#efff02]" />
                </Atropos>
              </div>

              {/* Text: col-xl-6 col-lg-7 col-sm-8 text-center text-sm-start */}
              <div
                data-about-right-text
                className="col-span-12 sm:col-span-8 lg:col-span-7 xl:col-span-6 text-center sm:text-left"
              >
                <span className="text-[14px] uppercase tracking-[1px] text-white font-semibold block mb-[5px]">
                  Established for 16 years.
                </span>
                {/* w-90 lg-w-100: default=90%, ≤991px=100% → Tailwind: base=100%, lg=90% */}
                <p className="text-[#737373] text-sm leading-relaxed w-full lg:w-[90%]">
                  We are dedicated to providing outstanding architectural and design services that meet the functional and aesthetic.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row — row-cols-1 row-cols-lg-3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-stat
              className={`pr-12 ${i < 2 ? "mb-[30px] md:mb-0" : ""}`}
            >
              {/* separator-line-1px bg-charcoal-grey mb-25px — first item d-none d-lg-block */}
              <div className={`h-px bg-[#333333] w-full mb-[25px] ${i === 0 ? "hidden lg:block" : "block"}`} />
              {/* feature-box feature-box-left-icon: content left, icon number right */}
              <div className="flex items-start justify-between">
                {/* text-medium-gray fs-18 lh-30 w-80 sm-w-90 d-block: default=90%, sm+(640px)=80% */}
                <span className="text-[#737373] text-[18px] leading-[30px] w-[90%] sm:w-[80%] block">
                  <span className="text-white font-semibold">{s.num}</span>{" "}
                  {s.desc}
                </span>
                {/* fs-18 fw-500 text-base-color */}
                <span className="text-[#efff02] font-bebas text-[18px] flex-shrink-0">
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
