"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offices = [
  { name: "Crafto – London",      address: "401 Broadway, 24th floor,\nOrchard view, London, UK" },
  { name: "Crafto – France",      address: "27 Eden walk eden centre,\nOrchard view, Paris, France" },
  { name: "Crafto – Switzerland", address: "701 Sondanella, 24th floor,\nGunsberg, Switzerland" },
];

const navLinks = ["Home", "About", "Services", "Projects", "Contact"];

const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-footer-col]", {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="bg-[#1F1F1F]"
      style={{
        backgroundImage: "url('/dotted-pattern.svg')",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat",
      }}
    >
      {/* CTA bar */}
      <div data-footer-col className="border-b border-white/[0.08] px-8 md:px-16 py-10">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-0">

          <p className="text-[#737373] text-sm md:text-base">
            Let&apos;s build something{" "}
            <span className="text-white font-semibold">great together</span>
          </p>

          <div className="hidden md:block w-[70px] h-px bg-[#efff02] flex-shrink-0 mx-6 mt-[3px]" />

          {/* Email — text-roll hover */}
          <a
            href="mailto:hello@crafto.com"
            className="group relative overflow-hidden inline-block"
            style={{ fontSize: "clamp(18px, 1.8vw, 26px)" }}
          >
            <span className="block text-[#efff02] font-medium transition-transform duration-500 group-hover:-translate-y-full"
              style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}>
              hello@crafto.com
            </span>
            <span className="absolute inset-0 block text-[#efff02] font-medium translate-y-full transition-transform duration-500 group-hover:translate-y-0"
              style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}>
              hello@crafto.com
            </span>
          </a>

          {/* Logo — pushed to far right */}
          <div className="md:ml-auto">
            <Link href="#">
              <Image
                src="/logo-footer.png"
                alt="Crafto"
                width={68}
                height={65}
                className="hover:opacity-80 transition-opacity duration-300"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Office columns + contact */}
      <div data-footer-col className="border-b border-white/[0.08] px-8 md:px-16 py-12 md:py-16">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {offices.map((office) => (
            <div key={office.name}>
              <span className="text-white text-xs font-bold tracking-[2px] uppercase block mb-3">
                {office.name}
              </span>
              <p className="text-[#737373] text-sm leading-relaxed whitespace-pre-line">
                {office.address}
              </p>
            </div>
          ))}

          <div>
            <a href="tel:+1235678901"
              className="text-white text-sm block mb-2 hover:text-[#efff02] transition-colors duration-300">
              + 123 567 8901
            </a>
            <a href="mailto:info@domain.com"
              className="text-white text-sm border-b border-white hover:border-[#efff02] hover:text-[#efff02] transition-colors duration-300">
              info@domain.com
            </a>

            {/* Social icons */}
            <div className="flex gap-4 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:border-[#efff02] hover:text-[#efff02] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div data-footer-col className="px-8 md:px-16 py-5">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="relative text-[#737373] text-sm group overflow-hidden inline-block"
              >
                <span className="block transition-transform duration-300 group-hover:-translate-y-full"
                  style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}>
                  {link}
                </span>
                <span className="absolute inset-0 block text-white translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                  style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}>
                  {link}
                </span>
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
