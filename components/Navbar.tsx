"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

const navLinks = [
  { label: "Home",     href: "#"         },
  { label: "About",    href: "#about"    },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const leftColRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Initial header slide-in
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close-button scale animation — matches reference: scale(0.8)→scale(1), 0.5s delay
  useEffect(() => {
    const btn = closeBtnRef.current;
    if (!btn) return;
    if (menuOpen) {
      gsap.fromTo(btn,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, delay: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(btn, { scale: 0.8, opacity: 0, duration: 0.2, ease: "power2.in" });
    }
  }, [menuOpen]);

  // Animate links in when menu opens
  useEffect(() => {
    if (!menuOpen) return;
    const links = linkRefs.current.filter(Boolean);
    gsap.fromTo(
      links,
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power3.out", delay: 0.15 }
    );
    if (leftColRef.current) {
      gsap.fromTo(
        leftColRef.current.children,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.25 }
      );
    }
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    // Restore scroll immediately so scrollIntoView isn't blocked by overflow:hidden
    document.body.style.overflow = "";
    setMenuOpen(false);
    setTimeout(() => {
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

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

          <div className="w-[72px]" />
        </div>
      </header>

      {/* Hamburger — fades out when menu opens; reference push-button style */}
      <button
        onClick={() => setMenuOpen(true)}
        className={`fixed top-6 right-8 md:right-16 z-[70] py-1 transition-opacity duration-300 ${
          menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Open menu"
      >
        {/* 22×14px container — bottom bar is 14px (shorter), matching reference */}
        <div className="relative" style={{ width: 22, height: 14 }}>
          <span className="absolute top-0 left-0 right-0 h-[2px] bg-white" />
          <span className="absolute top-[6px] left-0 right-0 h-[2px] bg-white" />
          <span className="absolute bottom-0 left-0 h-[2px] bg-white" style={{ width: 14 }} />
        </div>
      </button>

      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-[#191919] flex flex-col transition-opacity duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundImage: "url('/vertical-lines.svg')",
          backgroundRepeat: "repeat",
          backgroundPosition: "center top",
        }}
      >
        {/* Close button — white circle, reference: right:50px top:50px w:40px h:40px, scale 0.8→1 w/ 0.5s delay */}
        <button
          ref={closeBtnRef}
          onClick={() => {
            document.body.style.overflow = "";
            setMenuOpen(false);
          }}
          className="absolute z-10 flex items-center justify-center bg-white text-[#191919] rounded-full hover:bg-[#efff02] transition-colors duration-300"
          style={{ right: 50, top: 50, width: 40, height: 40 }}
          aria-label="Close menu"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="1" y1="1" x2="12" y2="12" />
            <line x1="12" y1="1" x2="1" y2="12" />
          </svg>
        </button>

        <div className="relative flex-1 grid grid-cols-1 md:grid-cols-[3fr_2fr] overflow-hidden min-h-0">

          {/* Left panel — logo + contact */}
          <div ref={leftColRef} className="hidden md:flex flex-col justify-between px-14 lg:px-20 pt-20 pb-14">
            <div className="flex-shrink-0">
              <Image src="/logo-footer.png" alt="Logo" width={87} height={84} />
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div>
                <span className="text-[#efff02] text-[14px] tracking-[2px] uppercase font-semibold block mb-[5px]">
                  Let&apos;s Meet
                </span>
                <p className="text-[#737373] text-sm leading-relaxed w-[90%]">
                  27 Eden walk eden centre, Orchard, Paris, France
                </p>
              </div>
              <div>
                <span className="text-[#efff02] text-[14px] tracking-[2px] uppercase font-semibold block mb-[5px]">
                  Let&apos;s Talk
                </span>
                <a href="tel:1800222002" className="text-[#737373] hover:text-white transition-colors text-sm">
                  1-800-222-002
                </a><br />
                <a href="mailto:info@yourdomain.com" className="text-white text-sm border-b border-white hover:border-[#efff02] hover:text-[#efff02] transition-colors">
                  info@yourdomain.com
                </a>
              </div>
              <div>
                <span className="text-[#efff02] text-[14px] tracking-[2px] uppercase font-semibold block mb-[5px]">
                  Connect With Us
                </span>
                <div className="flex gap-4 mt-[15px]">
                  {[
                    <path key="fb" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
                    <><circle key="gb-c" cx="12" cy="12" r="10" /><path key="gb-p" d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" /></>,
                    <path key="tw" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />,
                    <><rect key="ig-r" x="2" y="2" width="20" height="20" rx="5" ry="5" /><path key="ig-p" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line key="ig-l" x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
                  ].map((icon, idx) => (
                    <a key={idx} href="#" className="text-white/40 hover:text-white transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={idx === 1 || idx === 3 ? "none" : "currentColor"} stroke={idx === 1 || idx === 3 ? "currentColor" : "none"} strokeWidth="2">
                        {icon}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right panel — Nav links */}
          <div className="flex flex-col justify-center px-8 md:px-10 lg:px-14 pt-24 md:pt-0 overflow-y-auto">
            <ul className="flex flex-col list-none p-0 m-0 group/nav">
              {navLinks.map((item, i) => (
                <li key={item.label}>
                  <a
                    ref={(el) => { linkRefs.current[i] = el; }}
                    href={item.href}
                    className={`block leading-[1.1] transition-colors duration-300 group-hover/nav:text-white/20 hover:!text-white ${
                      i === 0 ? "text-white/30" : "text-white"
                    }`}
                    style={{ fontSize: "clamp(34px, 5vw, 72px)", letterSpacing: "-0.5px", fontFamily: "var(--font-plus-jakarta), sans-serif", fontWeight: 600 }}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-white/[0.15] px-8 md:px-14 lg:px-20 py-4 hidden md:flex items-center justify-center gap-0">
          <p className="text-white/60 text-sm font-normal inline-block align-middle mb-0">
            Let&apos;s build something{" "}
            <span className="text-white">great together</span>
          </p>
          <div className="w-[70px] h-px bg-[#efff02] flex-shrink-0 mx-5 mt-[5px]" />
          <a href="mailto:hello@crafto.com" className="text-[#efff02] font-medium inline-block align-middle" style={{ fontSize: "26px" }}>
            hello@crafto.com
          </a>
        </div>
      </div>
    </>
  );
}
