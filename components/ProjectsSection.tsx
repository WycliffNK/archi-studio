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
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80",
  },
  {
    category: "Landscape",
    title: "Morroco house",
    description: "Lorem dummy text ipsum is simply printing and lorem ipsum been.",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1920&q=80",
  },
  {
    category: "Interior",
    title: "Melana house",
    description: "Lorem ipsum is simply dummy text printing and lorem ipsum been.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
  },
];

const counters = [
  { value: 255, label: "Projects", suffix: "+" },
  { value: 189, label: "Clients", suffix: "+" },
  { value: 738, label: "Capture", suffix: "+" },
  { value: 626, label: "Coffee", suffix: "+" },
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
    })
      .to(nextEl, { opacity: 1, duration: 0.8, ease: "power2.inOut" });
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

  // Counters animation
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

  // Testimonial auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-[#191919] pb-0 overflow-hidden"
    >
      {/* Projects slider */}
      <div className="relative">
        {/* Vertical "Recent projects" label */}
        <div className="absolute top-0 left-0 z-10 h-[270px] w-[50px] bg-[#efff02] flex items-center justify-center">
          <span
            className="font-antonio font-bold text-[#191919] uppercase tracking-[2px] select-none"
            style={{
              fontSize: "13px",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            Recent projects
          </span>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden" style={{ height: "clamp(450px, 60vh, 700px)" }}>
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
              <div className="absolute inset-0 bg-black/30" />

              {/* White content box — bottom right */}
              <div className="absolute bottom-0 right-0 z-10 w-full md:w-5/12 lg:w-[40%]">
                <div className="bg-white p-10 md:p-12">
                  <span className="text-[#191919] text-sm font-bold tracking-[1px] uppercase block mb-3">
                    {project.category}
                  </span>
                  <h2
                    className="font-antonio text-[#191919] font-semibold mb-5 leading-tight"
                    style={{ fontSize: "clamp(28px, 3vw, 42px)", letterSpacing: "-2px" }}
                  >
                    {project.title}
                  </h2>
                  <p className="text-[#737373] text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 text-[#191919] font-bold text-sm hover:gap-5 transition-all duration-300"
                  >
                    Explore project
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Nav buttons */}
          <div className="absolute bottom-0 left-[50px] z-20 flex">
            <button
              onClick={() => nav(-1)}
              className="w-10 h-10 bg-[#191919] text-white flex items-center justify-center hover:bg-[#3E3E3E] transition-colors duration-300"
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => nav(1)}
              className="w-10 h-10 bg-[#191919] text-white flex items-center justify-center hover:bg-[#3E3E3E] transition-colors duration-300"
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Dot indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`h-[2px] transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-[#efff02]" : "w-4 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Counters */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {counters.map((c, i) => (
            <div key={c.label}>
              <div className="flex items-start justify-center gap-1 mb-2">
                <span
                  ref={(el) => { counterEls.current[i] = el; }}
                  className="font-antonio text-white font-light"
                  style={{ fontSize: "clamp(50px, 6vw, 80px)", lineHeight: 1 }}
                >
                  0
                </span>
                <span
                  className="font-antonio text-white font-light"
                  style={{ fontSize: "clamp(50px, 6vw, 80px)", lineHeight: 1 }}
                >
                  {c.suffix}
                </span>
              </div>
              <span className="text-[#efff02] text-xs font-semibold tracking-[2px] uppercase">
                {c.label}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="pt-16 md:pt-20 pb-4">
          <div className="max-w-4xl mx-auto text-center relative px-12 md:px-20">
            {/* Left arrow */}
            <button
              onClick={() => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  i === currentTestimonial ? "opacity-100" : "opacity-0 absolute inset-0"
                }`}
              >
                <p
                  className="font-antonio text-white font-extralight leading-snug"
                  style={{ fontSize: "clamp(20px, 2.5vw, 28px)", lineHeight: "1.7" }}
                >
                  {t.quote}{" "}
                  <span className="text-[#efff02]">- {t.author}</span>
                </p>
              </div>
            ))}

            {/* Right arrow */}
            <button
              onClick={() => setCurrentTestimonial((p) => (p + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Progress line */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <span className="text-white/40 text-sm font-semibold">
              {String(currentTestimonial + 1).padStart(2, "0")}
            </span>
            <div className="w-32 h-px bg-[#3E3E3E] relative overflow-hidden">
              <div
                className="h-full bg-white/60 transition-all duration-300"
                style={{ width: `${((currentTestimonial + 1) / testimonials.length) * 100}%` }}
              />
            </div>
            <span className="text-white/40 text-sm font-semibold">
              {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
