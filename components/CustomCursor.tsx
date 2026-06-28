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
    let zoneMode: "default" | "drag" | "slider" | "play" | "dark" = "default";

    // ─── style helpers ─────────────────────────────────────────────────────
    const applyDefault = () => {
      gsap.to(ring, {
        width: 34, height: 34, scale: 1,
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.8)",
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
        duration: 0.35, ease: "power2.out", overwrite: "auto",
      });
      gsap.to(inner, { opacity: 0, fontSize: "10px", duration: 0.2, overwrite: "auto" });
    };

    // drag-cursor: matches Crafto .magic-drag-cursor — 140px filled blurred dark circle + "< DRAG >"
    const applyDrag = () => {
      gsap.to(ring, {
        width: 140, height: 140, scale: 1,
        borderWidth: 0,
        borderColor: "transparent",
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(10px)",
        duration: 0.4, ease: "power2.out", overwrite: "auto",
      });
      inner.textContent = "< DRAG >";
      gsap.to(inner, {
        opacity: 1, fontSize: "11px",
        duration: 0.25, overwrite: "auto",
      });
    };

    // slider cursor: matches Crafto regular .magic-cursor (no drag) — 70px dark circle + arrows
    const applySlider = () => {
      gsap.to(ring, {
        width: 70, height: 70, scale: 1,
        borderWidth: 0,
        borderColor: "transparent",
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(6px)",
        duration: 0.35, ease: "power2.out", overwrite: "auto",
      });
      inner.textContent = "←  →";
      gsap.to(inner, {
        opacity: 1, fontSize: "12px",
        duration: 0.2, overwrite: "auto",
      });
    };

    // play cursor: yellow ring with ▶ for video panel
    const applyPlay = () => {
      gsap.to(ring, {
        width: 80, height: 80, scale: 1,
        borderWidth: 2,
        borderColor: "#efff02",
        backgroundColor: "rgba(239,255,2,0.08)",
        backdropFilter: "blur(0px)",
        duration: 0.4, ease: "power2.out", overwrite: "auto",
      });
      inner.textContent = "▶";
      gsap.to(inner, { opacity: 1, fontSize: "14px", duration: 0.25, overwrite: "auto" });
    };

    // dark cursor: for white/light bg areas (projects white card)
    const applyDark = () => {
      gsap.to(ring, {
        width: 34, height: 34, scale: 1,
        borderWidth: 2,
        borderColor: "rgba(25,25,25,0.55)",
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
        duration: 0.35, ease: "power2.out", overwrite: "auto",
      });
      gsap.to(inner, { opacity: 0, duration: 0.2, overwrite: "auto" });
    };

    // link hover: yellow scaled ring (better UX than Crafto's hide)
    const applyLink = (isDark: boolean) => {
      gsap.to(ring, {
        width: 34, height: 34, scale: 1.6,
        borderWidth: 2,
        borderColor: isDark ? "#191919" : "#efff02",
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
        duration: 0.3, ease: "power2.out", overwrite: "auto",
      });
      gsap.to(inner, { opacity: 0, duration: 0.15, overwrite: "auto" });
    };

    const restoreZone = () => {
      if (zoneMode === "drag") applyDrag();
      else if (zoneMode === "slider") applySlider();
      else if (zoneMode === "play") applyPlay();
      else if (zoneMode === "dark") applyDark();
      else applyDefault();
    };

    // ─── mouse move ────────────────────────────────────────────────────────
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

    // ─── zone handlers ─────────────────────────────────────────────────────
    const onEnterDrag   = () => { zoneMode = "drag";   applyDrag(); };
    const onLeaveDrag   = () => { zoneMode = "default"; applyDefault(); };
    const onEnterSlider = () => { zoneMode = "slider"; applySlider(); };
    const onLeaveSlider = () => { zoneMode = "default"; applyDefault(); };
    const onEnterPlay   = () => { zoneMode = "play";   applyPlay(); };
    const onLeavePlay   = () => { zoneMode = "default"; applyDefault(); };
    const onEnterDark   = () => { zoneMode = "dark";   applyDark(); };
    const onLeaveDark   = () => { zoneMode = "default"; applyDefault(); };
    const onEnterLink   = () => applyLink(zoneMode === "dark");
    const onLeaveLink   = () => restoreZone();

    // ─── listener management ───────────────────────────────────────────────
    let links: Element[] = [], drags: Element[] = [], sliders: Element[] = [],
        plays: Element[] = [], darks: Element[] = [];

    const detach = () => {
      links.forEach(el   => { el.removeEventListener("mouseenter", onEnterLink);   el.removeEventListener("mouseleave", onLeaveLink); });
      drags.forEach(el   => { el.removeEventListener("mouseenter", onEnterDrag);   el.removeEventListener("mouseleave", onLeaveDrag); });
      sliders.forEach(el => { el.removeEventListener("mouseenter", onEnterSlider); el.removeEventListener("mouseleave", onLeaveSlider); });
      plays.forEach(el   => { el.removeEventListener("mouseenter", onEnterPlay);   el.removeEventListener("mouseleave", onLeavePlay); });
      darks.forEach(el   => { el.removeEventListener("mouseenter", onEnterDark);   el.removeEventListener("mouseleave", onLeaveDark); });
    };

    const attach = () => {
      detach();
      links   = [...document.querySelectorAll("a, button")];
      drags   = [...document.querySelectorAll("[data-cursor-drag]")];
      sliders = [...document.querySelectorAll("[data-cursor-slider]")];
      plays   = [...document.querySelectorAll("[data-cursor-play]")];
      darks   = [...document.querySelectorAll("[data-cursor-dark]")];

      links.forEach(el   => { el.addEventListener("mouseenter", onEnterLink);   el.addEventListener("mouseleave", onLeaveLink); });
      drags.forEach(el   => { el.addEventListener("mouseenter", onEnterDrag);   el.addEventListener("mouseleave", onLeaveDrag); });
      sliders.forEach(el => { el.addEventListener("mouseenter", onEnterSlider); el.addEventListener("mouseleave", onLeaveSlider); });
      plays.forEach(el   => { el.addEventListener("mouseenter", onEnterPlay);   el.addEventListener("mouseleave", onLeavePlay); });
      darks.forEach(el   => { el.addEventListener("mouseenter", onEnterDark);   el.addEventListener("mouseleave", onLeaveDark); });
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
        className="text-white font-bold select-none tracking-widest leading-none text-center"
        style={{ opacity: 0, fontSize: "10px", letterSpacing: "2px", wordSpacing: "3px" }}
      />
    </div>
  );
}
