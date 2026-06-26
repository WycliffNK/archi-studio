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
      <header ref={navRef} className="absolute top-0 left-0 right-0 z-50 py-6 px-8 md:px-16">
        <div className="flex items-center justify-between relative">
          {/* Social Links — Left */}
          <div className="flex gap-6 text-[11px] tracking-[0.2em] text-white/60">
            {["Fb.", "Tw.", "In."].map((s) => (
              <Link key={s} href="#" className="hover:text-[#efff02] transition-colors duration-300">
                {s}
              </Link>
            ))}
          </div>

          {/* Logo — Centered */}
          <Link href="#" className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Logo" width={52} height={50} priority />
          </Link>

          {/* Hamburger — Right (hidden when menu open) */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`flex flex-col gap-[5px] z-[60] relative transition-opacity duration-200 ${
              menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            aria-label="Open menu"
          >
            <span className="block w-6 h-[1.5px] bg-white" />
            <span className="block w-6 h-[1.5px] bg-white" />
            <span className="block w-6 h-[1.5px] bg-white" />
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu — z-[60] so it sits above the absolute header (z-50) */}
      <div
        className={`fixed inset-0 z-[60] bg-[#191919] flex flex-col transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundImage: "url('/vertical-lines.svg')", backgroundRepeat: "repeat", backgroundPosition: "center top" }}
      >
        {/* Close button — top right white square (matches reference .close-menu bg-white) */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-7 right-7 md:top-8 md:right-8 z-50 w-11 h-11 rounded-full bg-white flex items-center justify-center hover:bg-[#efff02] transition-colors duration-300"
          aria-label="Close menu"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="#191919" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* Content grid — left 8fr info, right 3fr nav (matches reference col-lg-8 / col-lg-3 offset-1) */}
        <div className="relative flex-1 grid grid-cols-1 md:grid-cols-[8fr_4fr] overflow-hidden min-h-0">

          {/* Left panel — Footer logo + contact info rows */}
          <div className="hidden md:flex flex-col justify-between px-14 lg:px-20 pt-20 pb-10">

            {/* Footer logo */}
            <div className="flex-shrink-0">
              <Image src="/logo-footer.png" alt="Logo" width={87} height={84} />
            </div>

            {/* Contact info — 3 columns matching reference */}
            <div className="grid grid-cols-3 gap-8 mt-10">
              <div>
                {/* fs-14 fw-600 ls-2px text-uppercase mb-5px */}
                <span className="text-[#efff02] text-[14px] tracking-[2px] uppercase font-semibold block mb-[5px]">
                  Let&apos;s Meet
                </span>
                {/* w-90 md-w-80 */}
                <p className="text-[#737373] text-sm leading-relaxed w-[90%]">
                  27 Eden walk eden centre,<br />Orchard, Paris, France
                </p>
              </div>

              <div>
                <span className="text-[#efff02] text-[14px] tracking-[2px] uppercase font-semibold block mb-[5px]">
                  Let&apos;s Talk
                </span>
                {/* text-white-hover: gray default, white on hover */}
                <a href="tel:1800222002" className="text-[#737373] hover:text-white transition-colors text-sm block mb-1">
                  1-800-222-002
                </a>
                {/* text-decoration-line-bottom text-white: white with bottom border */}
                <a href="mailto:info@yourdomain.com" className="text-white text-sm border-b border-white hover:border-[#efff02] hover:text-[#efff02] transition-colors">
                  info@yourdomain.com
                </a>
              </div>

              <div>
                <span className="text-[#efff02] text-[14px] tracking-[2px] uppercase font-semibold block mb-[5px]">
                  Connect With Us
                </span>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="text-white/40 hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                  </a>
                  <a href="#" className="text-white/40 hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" /></svg>
                  </a>
                  <a href="#" className="text-white/40 hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                  </a>
                  <a href="#" className="text-white/40 hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel — Nav links with mCS-light style scrollbar for overflow */}
          <div className="flex flex-col justify-center px-8 md:px-10 lg:px-14 pt-24 md:pt-0 overflow-y-auto [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:min-h-[30px] hover:[&::-webkit-scrollbar-thumb]:bg-white/50">
            <ul className="flex flex-col list-none p-0 m-0 group/nav">
              {navLinks.map((item, i) => (
                <li key={item}>
                  <Link
                    href="#"
                    className={`font-antonio font-light block leading-[1.05] transition-colors duration-300 group-hover/nav:text-white/30 hover:!text-white ${
                      i === 0 ? "text-white" : "text-white/50"
                    }`}
                    style={{
                      fontSize: "clamp(40px, 5.5vw, 80px)",
                      letterSpacing: "-0.5px",
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar — col-12 menu-text border-top d-none d-md-inline-block text-center */}
        <div className="relative border-t border-white/[0.08] px-8 md:px-14 lg:px-20 py-3 hidden md:flex items-center justify-center gap-0">
          {/* h6 fw-400 align-middle */}
          <p className="text-white/60 text-sm font-normal inline-block align-middle mb-0">
            Let&apos;s build something{" "}
            <span className="text-white">great together</span>
          </p>
          {/* separator-line-1px w-70px bg-base-color ms-20px me-20px mt-5px */}
          <div className="w-[70px] h-px bg-[#efff02] flex-shrink-0 mx-5 mt-[5px]" />
          {/* fs-26 fw-500 text-base-color */}
          <a href="mailto:hello@crafto.com" className="text-[#efff02] font-medium inline-block align-middle" style={{ fontSize: "26px" }}>
            hello@crafto.com
          </a>
        </div>
      </div>
    </>
  );
}
