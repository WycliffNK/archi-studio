"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

const navLinks = ["Home", "About", "Services", "Projects", "Articles", "Contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 py-6 px-8 md:px-16"
      >
        <div className="flex items-center justify-between relative">
          {/* Social Links - Left */}
          <div className="flex gap-6 text-[11px] tracking-[0.2em] text-white/60">
            {["Fb.", "Tw.", "In."].map((s) => (
              <Link
                key={s}
                href="#"
                className="hover:text-[#efff02] transition-colors duration-300"
              >
                {s}
              </Link>
            ))}
          </div>

          {/* Logo - Centered */}
          <Link
            href="#"
            className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity"
          >
            <Image src="/logo.svg" alt="Logo" width={52} height={52} priority />
          </Link>

          {/* Hamburger - Right */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] z-[60] relative"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[1.5px] bg-white transition-all duration-300 ${
                menuOpen ? "w-6 rotate-45 translate-y-[6.5px]" : "w-6"
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] bg-white transition-all duration-300 ${
                menuOpen ? "w-6 -rotate-45 -translate-y-[6.5px]" : "w-6"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#191919] flex flex-col justify-center transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-16 md:px-24 max-w-5xl">
          <ul className="flex flex-col gap-3 mb-16">
            {navLinks.map((item, i) => (
              <li key={item}>
                <Link
                  href="#"
                  className="font-antonio text-5xl md:text-7xl font-light text-white/25 hover:text-white transition-colors duration-300 block leading-tight"
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#3E3E3E] pt-8">
            <p className="text-[#737373] text-sm mb-2">
              Let&apos;s build something{" "}
              <span className="text-white">great together</span>
            </p>
            <a
              href="mailto:hello@crafto.com"
              className="text-[#efff02] text-2xl font-medium font-antonio"
            >
              hello@crafto.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
