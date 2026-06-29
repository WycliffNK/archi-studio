"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    category: "Architecture",
    title: "Leana cagnotto",
    description: "Lorem ipsum is simply dummy text printing and lorem ipsum been.",
    image: "/home-08.jpg",
  },
  {
    category: "Landscape",
    title: "Morroco house",
    description: "Lorem dummy text ipsum is simply printing and lorem ipsum been.",
    image: "/home-09.jpg",
  },
  {
    category: "Interior",
    title: "Melana house",
    description: "Lorem ipsum is simply dummy text printing and lorem ipsum been.",
    image: "/home-10.jpg",
  },
];

const counters = [
  { value: 255, label: "Projects" },
  { value: 189, label: "Clients" },
  { value: 738, label: "Capture" },
  { value: 626, label: "Coffee" },
];

const testimonials = [
  {
    quote: "Crafto began as a collaborative architectural and landscape workshop, and has remained true to its trans disciplinary way of thinking since its inception",
    author: "Herman miller",
  },
  {
    quote: "Absolutely amazing theme, flexible and awesome design with possibilities. It's so very easy to use and to customize. Simply the great designs and best theme",
    author: "Jonsan donner",
  },
  {
    quote: "There are design companies and then there are user experience, design, consulting, interface design. Simply the great designs and best theme for fast loading",
    author: "Mackangy rose",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const counterEls = useRef<(HTMLSpanElement | null)[]>([]);

  const goTo = useCallback((next: number) => {
    if (isAnimatingRef.current || next === currentRef.current) return;
    isAnimatingRef.current = true;
    const curr = slidesRef.current[currentRef.current];
    const nextEl = slidesRef.current[next];
    if (!curr || !nextEl) return;

    currentRef.current = next;
    setCurrentSlide(next);

    gsap.set(nextEl, { zIndex: 10, opacity: 0 });
    gsap.set(curr, { zIndex: 5 });

    gsap.timeline({
      onComplete: () => {
        gsap.set(curr, { zIndex: 0 });
        gsap.set(nextEl, { zIndex: 1 });
        isAnimatingRef.current = false;
      },
    }).to(nextEl, { opacity: 1, duration: 0.8, ease: "power2.inOut" });
  }, []);

  useEffect(() => {
    const firstSlide = slidesRef.current[0];
    if (firstSlide) gsap.set(firstSlide, { zIndex: 1, opacity: 1 });

    timerRef.current = setInterval(() => {
      goTo((currentRef.current + 1) % projects.length);
    }, 4000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [goTo]);

  const nav = (dir: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo((currentRef.current + dir + projects.length) % projects.length);
    timerRef.current = setInterval(() => {
      goTo((currentRef.current + 1) % projects.length);
    }, 4000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      counterEls.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            const counter = { val: 0 };
            gsap.to(counter, {
              val: counters[i].value,
              duration: 2.5,
              ease: "power2.out",
              onUpdate() {
                if (el) el.textContent = Math.round(counter.val).toString();
              },
            });
          },
          once: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const progress = ((currentTestimonial + 1) / testimonials.length) * 100;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-[#191919] pb-0"
      style={{
        backgroundImage: "url('/dotted-pattern.svg')",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-8 md:px-16">

        {/* Slider row — overlap-section: pulls up 278px into the Awards section */}
        <div style={{ marginTop: "-278px" }}>
          <div className="relative">

            {/* Vertical "RECENT PROJECTS" label — bg-base-color, absolute left */}
            <div
              className="absolute top-0 left-[15px] bg-[#efff02] flex items-center justify-center z-10"
              style={{ width: "50px", height: "270px", padding: "10px" }}
            >
              <span
                className="font-bold text-[#191919] uppercase select-none"
                style={{
                  fontSize: "14px",
                  letterSpacing: "2px",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                Recent projects
              </span>
            </div>

            {/* Slider — data-cursor-drag: matches Crafto .text-slider-style-04.magic-cursor.drag-cursor → 140px "< DRAG >" */}
            <div data-cursor-drag className="relative overflow-hidden" style={{ height: "clamp(400px, 55vh, 650px)" }}>
              {projects.map((project, i) => (
                <div
                  key={project.title}
                  ref={(el) => { slidesRef.current[i] = el; }}
                  className="absolute inset-0"
                  style={{ zIndex: 0, opacity: 0 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/20" />

                  {/* White info card — bottom right: col-lg-5 col-md-7 */}
                  <div className="absolute bottom-0 right-0 z-10 w-full md:w-7/12 lg:w-5/12">
                    <div className="bg-white p-10 lg:p-12">
                      <span className="text-[#191919] text-[15px] font-bold tracking-[1px] uppercase block mb-3">
                        {project.category}
                      </span>
                      <h2
                        className="font-antonio text-[#191919] font-semibold mb-[20px] leading-tight"
                        style={{ fontSize: "clamp(28px, 3vw, 42px)", letterSpacing: "-2px" }}
                      >
                        {project.title}
                      </h2>
                      <p className="text-[#737373] text-sm leading-relaxed mb-6 w-[90%]">
                        {project.description}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center gap-3 text-[#191919] font-extrabold text-sm hover:gap-5 transition-all duration-300"
                      >
                        Explore project
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* Nav buttons — slider-navigation-style-07: small dark-gray squares, bottom-left after label */}
              <div className="absolute bottom-0 left-[65px] z-20 flex">
                <button
                  onClick={() => nav(-1)}
                  className="w-10 h-10 bg-[#191919] text-white flex items-center justify-center hover:bg-[#3E3E3E] transition-colors duration-300"
                  aria-label="Previous"
                >
                  {/* bi-arrow-down-left ↙ */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <line x1="17" y1="7" x2="7" y2="17" />
                    <polyline points="7 7 7 17 17 17" />
                  </svg>
                </button>
                <button
                  onClick={() => nav(1)}
                  className="w-10 h-10 bg-[#191919] text-white flex items-center justify-center hover:bg-[#3E3E3E] transition-colors duration-300"
                  aria-label="Next"
                >
                  {/* bi-arrow-up-right ↗ */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="17 17 17 7 7 7" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Counter row — counter-style-04: large alt-font numbers, yellow labels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-16 md:pt-20 mb-16 md:mb-20">
          {counters.map((c, i) => (
            <div key={c.label} className="last:[&>p]:mb-0">
              <div className="flex items-start justify-center mb-2">
                <h1
                  className="font-antonio text-white font-light mb-0 leading-none"
                  style={{ fontSize: "clamp(50px, 6vw, 76px)" }}
                >
                  <span ref={(el) => { counterEls.current[i] = el; }}>0</span>
                  <span>+</span>
                </h1>
              </div>
              <span className="text-[#efff02] text-[13px] font-semibold tracking-[2px] uppercase block">
                {c.label}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonials — testimonials-style-10: col-xl-9 col-lg-10 centered */}
        {/* data-cursor-slider: matches Crafto .magic-cursor.pt-9.pb-6 (no drag class) → 70px dark circle ← → */}
        <div className="flex justify-center pb-16 md:pb-20">
          <div data-cursor-slider className="relative w-full lg:w-10/12 xl:w-9/12 pt-9 pb-6 px-4 md:px-16">

            {/* Left arrow nav */}
            <button
              onClick={() => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white hover:text-[#efff02] transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>

            {/* Testimonial text */}
            <div className="relative text-center overflow-hidden" style={{ minHeight: "120px" }}>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="transition-all duration-500 absolute inset-0 flex items-center justify-center"
                  style={{ opacity: i === currentTestimonial ? 1 : 0 }}
                >
                  <h5
                    className="font-antonio text-white font-extralight mb-0 text-center w-[90%] mx-auto"
                    style={{ fontSize: "clamp(18px, 2vw, 26px)", lineHeight: "48px", fontWeight: 100 }}
                  >
                    {t.quote}{" "}
                    <span className="text-[#efff02]">- {t.author}</span>
                  </h5>
                </div>
              ))}
            </div>

            {/* Right arrow nav */}
            <button
              onClick={() => setCurrentTestimonial((p) => (p + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-[#efff02] transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            {/* Number progress pagination */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className="text-white text-[15px] font-semibold">
                {String(currentTestimonial + 1).padStart(2, "0")}
              </span>
              <div className="w-32 h-px bg-[#3E3E3E] relative overflow-hidden">
                <div
                  className="h-full bg-white/60 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-white text-[15px] font-semibold">
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
