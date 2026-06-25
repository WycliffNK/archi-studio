"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offices = [
  {
    name: "Crafto - London",
    address: "401 Broadway, 24th floor, Orchard view, London, UK",
  },
  {
    name: "Crafto - France",
    address: "27 Eden walk eden centre, Orchard view, Paris, France",
  },
  {
    name: "Crafto - Switzerland",
    address: "701 Sondanella, 24th floor, Gunsberg, Switzerland",
  },
];

const navLinks = ["Home", "About", "Services", "Projects", "Articles", "Contact"];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = sectionRef.current?.querySelectorAll("[data-footer-col]");
      if (!cols?.length) return;

      gsap.from(cols, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="bg-[#1F1F1F] overflow-hidden"
      style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "30px 30px" }}
    >
      {/* Top CTA bar */}
      <div data-footer-col className="border-b border-[#3E3E3E] py-8 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <p className="text-[#737373] text-sm">
            Let&apos;s build something{" "}
            <span className="text-white">great together</span>
          </p>
          <div className="h-px w-16 bg-[#efff02] hidden sm:block flex-shrink-0" />
          <a
            href="mailto:hello@crafto.com"
            className="text-[#efff02] font-medium"
            style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
          >
            hello@crafto.com
          </a>
          <div className="sm:ml-auto">
            <Link href="#" className="text-white text-xl tracking-[0.1em]">
              CRAFTO
            </Link>
          </div>
        </div>
      </div>

      {/* Office addresses */}
      <div data-footer-col className="py-12 md:py-16 px-8 md:px-16 border-b border-[#3E3E3E]">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-8">
          {offices.map((office) => (
            <div key={office.name} className="text-center sm:text-left">
              <span className="text-white text-xs font-semibold tracking-[2px] uppercase block mb-3">
                {office.name}
              </span>
              <p className="text-[#737373] text-sm leading-relaxed">
                {office.address}
              </p>
            </div>
          ))}
          {/* Contact */}
          <div className="text-center sm:text-right">
            <a href="tel:+1235678901" className="text-white text-sm block mb-1 hover:text-[#efff02] transition-colors">
              + 123 567 8901
            </a>
            <a
              href="mailto:info@domain.com"
              className="text-white font-medium text-sm hover:text-[#efff02] transition-colors"
            >
              info@domain.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom nav + copyright */}
      <div data-footer-col className="py-6 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="text-[#737373] text-sm hover:text-white transition-colors duration-200"
              >
                {link}
              </Link>
            ))}
          </nav>
          <p className="text-[#737373] text-xs">
            © {new Date().getFullYear()} Crafto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
