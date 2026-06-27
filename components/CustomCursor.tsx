"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const inner = innerRef.current;
    if (!ring || !inner) return;

    let raf = 0;
    let tx = -100, ty = -100;
    // Tracks the zone the cursor is currently inside
    let zoneMode: "default" | "drag" | "play" | "dark" = "default";

    // ─── low-level style helpers ───────────────────────────────────────
    const applyDefault = () => {
      gsap.to(ring, {
        width: 34, height: 34, scale: 1,
        borderColor: "rgba(255,255,255,0.8)",
        backgroundColor: "transparent",
        duration: 0.35, ease: "power2.out", overwrite: "auto",
      });
      gsap.to(inner, { opacity: 0, duration: 0.2, overwrite: "auto" });
    };

    const applyDark = () => {
      gsap.to(ring, {
        width: 34, height: 34, scale: 1,
        borderColor: "rgba(25,25,25,0.55)",
        backgroundColor: "transparent",
        duration: 0.35, ease: "power2.out", overwrite: "auto",
      });
      gsap.to(inner, { opacity: 0, duration: 0.2, overwrite: "auto" });
    };

    const applyDrag = () => {
      gsap.to(ring, {
        width: 72, height: 72, scale: 1,
        borderColor: "rgba(255,255,255,0.65)",
        backgroundColor: "transparent",
        duration: 0.4, ease: "power2.out", overwrite: "auto",
      });
      inner.textContent = "← →";
      gsap.to(inner, { opacity: 1, duration: 0.25, overwrite: "auto" });
    };

    const applyPlay = () => {
      gsap.to(ring, {
        width: 80, height: 80, scale: 1,
        borderColor: "#efff02",
        backgroundColor: "rgba(239,255,2,0.08)",
        duration: 0.4, ease: "power2.out", overwrite: "auto",
      });
      inner.textContent = "▶";
      gsap.to(inner, { opacity: 1, duration: 0.25, overwrite: "auto" });
    };

    const applyLink = (isDarkZone: boolean) => {
      gsap.to(ring, {
        width: 34, height: 34, scale: 1.6,
        borderColor: isDarkZone ? "#191919" : "#efff02",
        backgroundColor: "transparent",
        duration: 0.3, ease: "power2.out", overwrite: "auto",
      });
      gsap.to(inner, { opacity: 0, duration: 0.15, overwrite: "auto" });
    };

    // Restore to whatever zone we're currently inside
    const restoreZone = () => {
      if (zoneMode === "drag") applyDrag();
      else if (zoneMode === "play") applyPlay();
      else if (zoneMode === "dark") applyDark();
      else applyDefault();
    };

    // ─── mouse move ───────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        gsap.to(ring, {
          x: tx, y: ty,
          duration: 0.55, ease: "power2.out", overwrite: "auto",
        });
      });
    };

    // ─── zone handlers ────────────────────────────────────────────────
    const onEnterDrag = () => { zoneMode = "drag"; applyDrag(); };
    const onLeaveDrag = () => { zoneMode = "default"; applyDefault(); };

    const onEnterPlay = () => { zoneMode = "play"; applyPlay(); };
    const onLeavePlay = () => { zoneMode = "default"; applyDefault(); };

    const onEnterDark = () => { zoneMode = "dark"; applyDark(); };
    const onLeaveDark = () => { zoneMode = "default"; applyDefault(); };

    // ─── link/button handlers (overlay on top of zone) ────────────────
    const onEnterLink = () => applyLink(zoneMode === "dark");
    const onLeaveLink = () => restoreZone();

    // ─── listener attachment ──────────────────────────────────────────
    let links: Element[] = [];
    let drags: Element[] = [];
    let plays: Element[] = [];
    let darks: Element[] = [];

    const detach = () => {
      links.forEach(el => { el.removeEventListener("mouseenter", onEnterLink); el.removeEventListener("mouseleave", onLeaveLink); });
      drags.forEach(el => { el.removeEventListener("mouseenter", onEnterDrag); el.removeEventListener("mouseleave", onLeaveDrag); });
      plays.forEach(el => { el.removeEventListener("mouseenter", onEnterPlay); el.removeEventListener("mouseleave", onLeavePlay); });
      darks.forEach(el => { el.removeEventListener("mouseenter", onEnterDark); el.removeEventListener("mouseleave", onLeaveDark); });
    };

    const attach = () => {
      detach();
      links = [...document.querySelectorAll("a, button")];
      drags = [...document.querySelectorAll("[data-cursor-drag]")];
      plays = [...document.querySelectorAll("[data-cursor-play]")];
      darks = [...document.querySelectorAll("[data-cursor-dark]")];

      links.forEach(el => { el.addEventListener("mouseenter", onEnterLink); el.addEventListener("mouseleave", onLeaveLink); });
      drags.forEach(el => { el.addEventListener("mouseenter", onEnterDrag); el.addEventListener("mouseleave", onLeaveDrag); });
      plays.forEach(el => { el.addEventListener("mouseenter", onEnterPlay); el.addEventListener("mouseleave", onLeavePlay); });
      darks.forEach(el => { el.addEventListener("mouseenter", onEnterDark); el.addEventListener("mouseleave", onLeaveDark); });
    };

    document.addEventListener("mousemove", onMove);
    attach();

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      detach();
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ringRef}
      id="ball-cursor"
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
      style={{
        width: "34px",
        height: "34px",
        border: "2px solid rgba(255,255,255,0.8)",
        background: "transparent",
        translate: "none",
        transform: "translate(-50%, -50%) translate3d(-100px, -100px, 0)",
        willChange: "transform",
      }}
    >
      <span
        ref={innerRef}
        className="text-white text-[10px] font-semibold select-none tracking-widest leading-none"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
