"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Architecture",
    description: "Lorem ipsum consectetur elit do eiusmod tempor incididunt.",
    image: "/home-04.jpg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Residential space",
    description: "Lorem ipsum consectetur elit do eiusmod tempor incididunt.",
    image: "/home-05.jpg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "Interior design",
    description: "Lorem ipsum consectetur elit do eiusmod tempor incididunt.",
    image: "/home-06.jpg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
      </svg>
    ),
  },
  {
    title: "Exterior planning",
    description: "Lorem ipsum consectetur elit do eiusmod tempor incididunt.",
    image: "/home-07.jpg",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    ),
  },
];

const clients = [
  { src: "/clients-38.png", yDir: -1 },
  { src: "/clients-39.png", yDir: 1 },
  { src: "/clients-40.png", yDir: -1 },
  { src: "/clients-41.png", yDir: 1 },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const clientRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-srv-header]", {
        opacity: 0, x: 50, duration: 1.2, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: "[data-srv-header]", start: "top 85%" },
      });

      gsap.from("[data-srv-slider]", {
        opacity: 0, x: 150, duration: 1.2, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: "[data-srv-slider]", start: "top 88%" },
      });

      clients.forEach((c, i) => {
        const el = clientRefs.current[i];
        if (!el) return;
        gsap.fromTo(el,
          { y: c.yDir * -20 },
          {
            y: c.yDir * 20, ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[#191919] overflow-hidden"
      style={{
        backgroundImage: "url('/dotted-pattern.svg')",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Header row — align-items-end mb-6 */}
      <div className="max-w-[1320px] mx-auto px-8 md:px-16 pt-20 md:pt-28">
        <div data-srv-header className="grid md:grid-cols-[6fr_5fr] gap-10 items-end mb-[50px] md:mb-[70px]">
          {/* col-md-6: label + h4 */}
          <div>
            <span className="text-[#efff02] text-[12px] font-semibold tracking-[3px] uppercase block mb-[5px]">
              Architecture services
            </span>
            <h4 className="text-white font-semibold leading-tight mb-0" style={{ fontSize: "clamp(22px, 2.5vw, 30px)" }}>
              Create functional and stylish modern buildings for you.
            </h4>
          </div>
          {/* col-md-5 offset-md-1: description */}
          <div>
            <p className="text-[#737373] leading-relaxed w-4/5 xl:w-[85%] lg:w-full mb-0">
              Our buildings combine minimalism and elegance of lines and shapes. We want them to be an integral part of the surrounding landscape.
            </p>
          </div>
        </div>
      </div>

      {/* Slider row — outside-box-right-30: extends 30% past the container right edge */}
      <div data-srv-slider className="max-w-[1320px] mx-auto px-8 md:px-16 mb-[70px] md:mb-[90px]">
        {/* outside-box-right-30 sm-outside-box-right-0 */}
        <div className="mr-0 md:mr-[-30%]">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={35}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 3 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            style={{ overflow: "visible" }}
          >
            {services.map((service) => (
              <SwiperSlide key={service.title}>
                {/* interactive-banner-style-06 */}
                <div className="relative overflow-hidden group" style={{ height: "450px" }}>

                  {/* interactive-banners-image */}
                  <div className="absolute inset-0">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* overlay-bg bg-gradient-dark-transparent opacity-light */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-60" />
                    {/* banners-icon position-absolute top-60px left-60px lg-top-30px lg-left-30px */}
                    <a
                      href="#"
                      className="absolute top-[60px] left-[60px] lg:top-[30px] lg:left-[30px] text-white hover:text-[#efff02] transition-colors duration-300 z-10"
                      aria-label={service.title}
                    >
                      {service.icon}
                    </a>
                  </div>

                  {/* interactive-banners-content p-60px lg-p-30px */}
                  <div className="absolute bottom-0 left-0 right-0 p-[60px] lg:p-[30px] z-10">
                    <a
                      href="#"
                      className="text-white font-medium block mb-[10px] hover:text-[#efff02] transition-colors duration-300"
                      style={{ fontSize: "22px" }}
                    >
                      {service.title}
                    </a>
                    <p className="text-white/70 text-sm leading-relaxed w-[95%] lg:w-full mb-0">
                      {service.description}
                    </p>
                  </div>

                  {/* box-overlay bg-gradient-dark-transparent — darkens card on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[5]" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Clients row — row-cols-lg-4 clients-style-06 */}
      <div className="max-w-[1320px] mx-auto px-8 md:px-16 pb-20 md:pb-28">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {clients.map((client, i) => (
            <div
              key={i}
              ref={(el) => { clientRefs.current[i] = el; }}
              className="text-center flex items-center justify-center"
            >
              <a href="#">
                <Image
                  src={client.src}
                  alt={`Client ${i + 1}`}
                  width={160}
                  height={60}
                  className="object-contain opacity-50 hover:opacity-100 transition-opacity duration-300"
                  unoptimized
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
