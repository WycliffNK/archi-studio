"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home",     href: "#" },
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

const offices = [
  { name: "Crafto – London",      address: "401 Broadway, 24th floor,\nOrchard view, London, UK" },
  { name: "Crafto – France",      address: "27 Eden walk eden centre,\nOrchard view, Paris, France" },
  { name: "Crafto – Switzerland", address: "701 Sondanella, 24th floor,\nGunsberg, Switzerland" },
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
      <div data-footer-col className="px-8 md:px-16 py-10">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-0">

          <p className="text-[#737373]" style={{ fontSize: "clamp(14px, 1.2vw, 18px)" }}>
            Let&apos;s build something{" "}
            <span className="text-white font-semibold">great together</span>
          </p>

          <div className="hidden md:block w-[70px] h-px bg-[#efff02] flex-shrink-0 mx-6" />

          {/* Email — text-roll hover */}
          <a
            href="mailto:hello@crafto.com"
            className="group relative overflow-hidden inline-block"
            style={{ fontSize: "clamp(20px, 2vw, 30px)" }}
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
                width={80}
                height={78}
                className="hover:opacity-80 transition-opacity duration-300"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Office columns + contact */}
      <div data-footer-col className="px-8 md:px-16 py-12 md:py-16 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {offices.map((office) => (
            <div key={office.name}>
              <span className="text-white text-[13px] font-bold tracking-[2px] uppercase block mb-3">
                {office.name}
              </span>
              <p className="text-[#737373] leading-relaxed whitespace-pre-line" style={{ fontSize: "17px" }}>
                {office.address}
              </p>
            </div>
          ))}

          <div className="text-center sm:text-start lg:text-end" style={{ fontSize: "19px" }}>
            <a href="tel:+1235678901"
              className="text-white block mb-1 hover:text-[#efff02] transition-colors duration-300">
              + 123 567 8901
            </a>
            <a href="mailto:info@domain.com"
              className="text-white font-medium border-b border-white hover:border-[#efff02] hover:text-[#efff02] transition-colors duration-300">
              info@domain.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom nav bar */}
      <div data-footer-col className="px-8 md:px-16 py-5">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <nav className="flex items-center gap-6 md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#737373] hover:text-white text-[13px] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-[#737373] text-[13px]">
            © 2026 Crafto is Proudly Powered by{" "}
            <a href="#" className="text-white hover:text-[#efff02] transition-colors duration-300">
              ThemeZaa
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
