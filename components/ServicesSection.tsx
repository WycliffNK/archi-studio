"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Architecture",
    description: "Lorem ipsum consectetur elit do eiusmod tempor incididunt.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  },
  {
    title: "Residential space",
    description: "Lorem ipsum consectetur elit do eiusmod tempor incididunt.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
  },
  {
    title: "Interior design",
    description: "Lorem ipsum consectetur elit do eiusmod tempor incididunt.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  },
  {
    title: "Exterior planning",
    description: "Lorem ipsum consectetur elit do eiusmod tempor incididunt.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: headlineRef.current, start: "top 85%" },
      });

      gsap.from(sliderRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: sliderRef.current, start: "top 88%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cardWidth = 300;
  const gap = 35;

  const scrollTo = useCallback((index: number) => {
    if (!trackRef.current) return;
    const clamped = Math.max(0, Math.min(index, services.length - 1));
    setCurrent(clamped);
    gsap.to(trackRef.current, {
      x: -(clamped * (cardWidth + gap)),
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 40) {
      scrollTo(diff > 0 ? current + 1 : current - 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[#191919] py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div
          ref={headlineRef}
          className="grid md:grid-cols-2 gap-8 items-end mb-14"
        >
          <div>
            <span className="text-[#efff02] text-xs font-semibold tracking-[3px] uppercase block mb-3">
              Architecture services
            </span>
            <h4 className="text-white font-semibold text-2xl md:text-3xl leading-snug mb-0">
              Create functional and stylish modern buildings for you.
            </h4>
          </div>
          <div>
            <p className="text-[#737373] leading-relaxed">
              Our buildings combine minimalism and elegance of lines and shapes. We want them to be an integral part of the surrounding landscape.
            </p>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => { isDragging.current = false; }}
          style={{ cursor: "grab" }}
        >
          <div
            ref={trackRef}
            className="flex"
            style={{ gap: `${gap}px` }}
          >
            {services.map((service) => (
              <div
                key={service.title}
                className="flex-shrink-0 group"
                style={{ width: `${cardWidth}px` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: "380px" }}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                  {/* Icon */}
                  <div className="absolute top-8 left-8 text-white/70 group-hover:text-[#efff02] transition-colors duration-300">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="28" height="28" rx="1"/>
                      <path d="M2 12h28M12 2v28"/>
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Content */}
                <div className="bg-[#191919] py-6 px-0">
                  <a
                    href="#"
                    className="text-white text-xl font-medium block mb-3 hover:text-[#efff02] transition-colors duration-300"
                    style={{ fontSize: "22px" }}
                  >
                    {service.title}
                  </a>
                  <p className="text-[#737373] text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot navigation */}
        <div className="flex gap-2 mt-6">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to service ${i + 1}`}
              className={`transition-all duration-300 h-[2px] ${
                i === current ? "w-8 bg-[#efff02]" : "w-4 bg-[#3E3E3E]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
