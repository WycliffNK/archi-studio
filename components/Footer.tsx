"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offices = [
  {
    name: "Crafto – London",
    address: "401 Broadway, 24th floor,\nOrchard view, London, UK",
  },
  {
    name: "Crafto – France",
    address: "27 Eden walk eden centre,\nOrchard view, Paris, France",
  },
  {
    name: "Crafto – Switzerland",
    address: "701 Sondanella, 24th floor,\nGunsberg, Switzerland",
  },
];

const navLinks = ["Home", "About", "Services", "Projects", "Contact"];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-footer-col]", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
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

          {/* "Let's build something great together" */}
          <p className="text-[#737373] text-sm md:text-base">
            Let&apos;s build something{" "}
            <span className="text-white font-semibold">great together</span>
          </p>

          {/* Yellow separator line */}
          <div className="hidden md:block w-[70px] h-px bg-[#efff02] flex-shrink-0 mx-6 mt-[3px]" />

          {/* Email */}
          <a
            href="mailto:hello@crafto.com"
            className="text-[#efff02] font-medium hover:opacity-80 transition-opacity"
            style={{ fontSize: "clamp(18px, 1.8vw, 26px)" }}
          >
            hello@crafto.com
          </a>

          {/* Logo — pushed to far right */}
          <div className="md:ml-auto">
            <Link href="#">
              <Image
                src="/logo-footer.png"
                alt="Crafto"
                width={68}
                height={65}
                className="hover:opacity-80 transition-opacity"
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

          {/* Contact info */}
          <div>
            <a
              href="tel:+1235678901"
              className="text-white text-sm block mb-2 hover:text-[#efff02] transition-colors"
            >
              + 123 567 8901
            </a>
            <a
              href="mailto:info@domain.com"
              className="text-white text-sm border-b border-white hover:border-[#efff02] hover:text-[#efff02] transition-colors duration-300"
            >
              info@domain.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar — nav + copyright */}
      <div data-footer-col className="px-8 md:px-16 py-5">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
