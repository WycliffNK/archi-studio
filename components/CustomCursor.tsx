"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power1.out",
      });

      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onEnterLink = () => {
      gsap.to(ring, { scale: 2, opacity: 0.5, duration: 0.3 });
      gsap.to(dot, { scale: 0.4, duration: 0.3 });
    };

    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    document.addEventListener("mousemove", onMove);

    const links = document.querySelectorAll("a, button");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-black rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
