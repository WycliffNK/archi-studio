"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offices = [
  { city: "London", address: "14 Finsbury Square, EC2A 1BR", phone: "+44 20 7946 0301" },
  { city: "Paris", address: "8 Rue du Faubourg, 75008", phone: "+33 1 42 86 21 00" },
  { city: "Zurich", address: "Bahnhofstrasse 21, 8001", phone: "+41 44 211 22 33" },
];

const links = {
  Studio: ["About", "Careers", "Press", "Contact"],
  Services: ["Architecture", "Residential", "Interior", "Exterior"],
  Projects: ["Residential", "Commercial", "Cultural", "Public"],
};

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll("[data-footer-col]") || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="bg-[#0a0a0a] text-white pt-24 pb-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* CTA Banner */}
        <div
          data-footer-col
          className="border-b border-white/10 pb-20 mb-20"
        >
          <h2 className="font-cormorant font-light text-5xl md:text-7xl xl:text-8xl leading-none text-white mb-8 max-w-3xl">
            Ready to build something <em className="italic">extraordinary?</em>
          </h2>
          <button className="group flex items-center gap-4 text-white text-xs tracking-[0.25em] uppercase">
            <span className="border border-white/40 px-10 py-5 hover:bg-white hover:text-black transition-all duration-300">
              Start a Project
            </span>
          </button>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-12 mb-20">
          {/* Brand Column */}
          <div data-footer-col className="col-span-2 md:col-span-1 xl:col-span-2">
            <Link
              href="#"
              className="text-xl tracking-[0.2em] uppercase text-white font-light block mb-6"
            >
              ARCHI<span className="font-semibold">STUDIO</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-8">
              Award-winning architecture and interior design studio. Creating
              spaces that inspire, endure, and connect people to place.
            </p>
            <div className="flex gap-5">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((s) => (
                <Link
                  key={s}
                  href="#"
                  className="text-white/30 text-[10px] tracking-widest uppercase hover:text-white transition-colors"
                >
                  {s.slice(0, 2)}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} data-footer-col>
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/30 mb-6">
                {category}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-white/55 text-sm hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Offices */}
        <div
          data-footer-col
          className="grid md:grid-cols-3 gap-10 border-t border-white/10 pt-14 mb-14"
        >
          {offices.map((office) => (
            <div key={office.city}>
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/30 mb-4">
                {office.city}
              </p>
              <p className="text-white/55 text-sm leading-relaxed">
                {office.address}
              </p>
              <p className="text-white/35 text-sm mt-1">{office.phone}</p>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          data-footer-col
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-white/10 pt-8"
        >
          <p className="text-white/25 text-xs tracking-[0.1em]">
            © {new Date().getFullYear()} ArchiStudio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-white/25 text-xs tracking-[0.1em] hover:text-white/60 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
