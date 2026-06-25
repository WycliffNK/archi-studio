"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const navLinks = ["Home", "About", "Services", "Projects", "Articles", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#"
            className={`text-xl tracking-[0.2em] uppercase font-light transition-colors duration-300 ${
              scrolled ? "text-[#0a0a0a]" : "text-white"
            }`}
          >
            ARCHI<span className="font-semibold">STUDIO</span>
          </Link>

          {/* Desktop Nav */}
          <ul
            className={`hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
              scrolled ? "text-[#0a0a0a]" : "text-white"
            }`}
          >
            {navLinks.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="relative group py-1 hover:opacity-70 transition-opacity"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Icons */}
          <div
            className={`hidden md:flex gap-5 text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
              scrolled ? "text-[#0a0a0a]" : "text-white"
            }`}
          >
            {["Fb", "Tw", "Ig"].map((s) => (
              <Link key={s} href="#" className="hover:opacity-60 transition-opacity">
                {s}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden flex flex-col gap-1.5 transition-colors duration-300 ${
              scrolled ? "text-[#0a0a0a]" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-current transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center px-12 transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-8">
          {navLinks.map((item, i) => (
            <li
              key={item}
              className="overflow-hidden"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <Link
                href="#"
                className="text-white text-4xl font-cormorant font-light hover:opacity-60 transition-opacity block"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex gap-6">
          {["Facebook", "Twitter", "Instagram"].map((s) => (
            <Link
              key={s}
              href="#"
              className="text-white/40 text-xs tracking-widest uppercase hover:text-white transition-colors"
            >
              {s}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
