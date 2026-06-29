"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const ballRef  = useRef<HTMLDivElement>(null);
  const ballInnerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot   = dotRef.current;
    const outer = outerRef.current;
    const ball  = ballRef.current;
    const bi    = ballInnerRef.current;
    if (!dot || !outer || !ball || !bi) return;

    let raf = 0;
    let zoneMode: "default" | "drag" | "slider" | "play" = "default";

    // Center all elements at cursor; start off-screen and invisible
    gsap.set([dot, outer, ball], { xPercent: -50, yPercent: -50, x: -200, y: -200 });
    gsap.set(dot,  { width: 6,  height: 6,  opacity: 0, scale: 1 });
    gsap.set(outer,{ width: 30, height: 30, opacity: 0, scale: 1 });
    gsap.set(ball, { width: 34, height: 34, opacity: 0, scale: 0, borderWidth: 0 });
    gsap.set(bi,   { opacity: 0 });

    // ─── custom cursor (yellow dot + ring) ─────────────────────────
    const showCustom = (linkHover = false) => {
      gsap.to(dot,  { width: linkHover ? 20 : 6, height: linkHover ? 20 : 6, opacity: 1, scale: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
      gsap.to(outer,{ opacity: 0.8, scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    };

    const hideCustom = () => {
      gsap.to(dot,  { opacity: 0, scale: 0, duration: 0.2, overwrite: "auto" });
      gsap.to(outer,{ opacity: 0, scale: 0, duration: 0.2, overwrite: "auto" });
    };

    // ─── ball cursor states ────────────────────────────────────────
    const showBall = (w: number, h: number, bw: number, bc: string, bg: string, blur: string, text: string) => {
      hideCustom();
      gsap.to(ball, { width: w, height: h, opacity: 1, scale: 1, borderWidth: bw, borderColor: bc, backgroundColor: bg, backdropFilter: blur, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      bi.textContent = text;
      gsap.to(bi, { opacity: text ? 1 : 0, duration: 0.25, overwrite: "auto" });
    };

    const hideBall = () => {
      gsap.to(ball, { opacity: 0, scale: 0, duration: 0.35, ease: "power2.in", overwrite: "auto" });
      gsap.to(bi,   { opacity: 0, duration: 0.15, overwrite: "auto" });
    };

    // ─── zone state appliers ──────────────────────────────────────
    const applyDefault = () => { hideBall(); showCustom(false); };
    const applyDrag    = () => showBall(140, 140, 0, "transparent", "rgba(0,0,0,0.55)", "blur(10px)", "< DRAG >");
    const applySlider  = () => showBall(70,  70,  0, "transparent", "rgba(0,0,0,0.7)",  "blur(6px)",  "←  →");
    const applyPlay    = () => showBall(80,  80,  2, "#efff02",      "rgba(239,255,2,0.08)", "blur(0px)", "▶");

    const applyLink    = () => { if (zoneMode === "default") showCustom(true); };
    const restoreLink  = () => { if (zoneMode === "default") showCustom(false); };

    const restoreZone  = () => {
      if      (zoneMode === "drag")   applyDrag();
      else if (zoneMode === "slider") applySlider();
      else if (zoneMode === "play")   applyPlay();
      else applyDefault();
    };

    // ─── mouse move ───────────────────────────────────────────────
    let tx = -200, ty = -200, firstMove = true;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (firstMove) {
          // Snap to position on first move so cursor doesn't slide in from off-screen
          gsap.set([dot, outer, ball], { x: tx, y: ty });
          applyDefault();
          firstMove = false;
        }
        gsap.to(dot,  { x: tx, y: ty, duration: 0.1,  ease: "power2.out", overwrite: "auto" });
        gsap.to(outer,{ x: tx, y: ty, duration: 0.45, ease: "power2.out", overwrite: "auto" });
        gsap.to(ball, { x: tx, y: ty, duration: 0.55, ease: "power2.out", overwrite: "auto" });
      });
    };

    // ─── zone handlers ────────────────────────────────────────────
    const onEnterDrag   = () => { zoneMode = "drag";   applyDrag(); };
    const onLeaveDrag   = () => { zoneMode = "default"; applyDefault(); };
    const onEnterSlider = () => { zoneMode = "slider"; applySlider(); };
    const onLeaveSlider = () => { zoneMode = "default"; applyDefault(); };
    const onEnterPlay   = () => { zoneMode = "play";   applyPlay(); };
    const onLeavePlay   = () => { zoneMode = "default"; applyDefault(); };
    const onEnterLink   = () => applyLink();
    const onLeaveLink   = () => restoreLink();

    // ─── listener management ──────────────────────────────────────
    let links: Element[] = [], drags: Element[] = [], sliders: Element[] = [], plays: Element[] = [];

    const detach = () => {
      links.forEach  (el => { el.removeEventListener("mouseenter", onEnterLink);   el.removeEventListener("mouseleave", onLeaveLink); });
      drags.forEach  (el => { el.removeEventListener("mouseenter", onEnterDrag);   el.removeEventListener("mouseleave", onLeaveDrag); });
      sliders.forEach(el => { el.removeEventListener("mouseenter", onEnterSlider); el.removeEventListener("mouseleave", onLeaveSlider); });
      plays.forEach  (el => { el.removeEventListener("mouseenter", onEnterPlay);   el.removeEventListener("mouseleave", onLeavePlay); });
    };

    const attach = () => {
      detach();
      links   = [...document.querySelectorAll("a, button")];
      drags   = [...document.querySelectorAll("[data-cursor-drag]")];
      sliders = [...document.querySelectorAll("[data-cursor-slider]")];
      plays   = [...document.querySelectorAll("[data-cursor-play]")];

      links.forEach  (el => { el.addEventListener("mouseenter", onEnterLink);   el.addEventListener("mouseleave", onLeaveLink); });
      drags.forEach  (el => { el.addEventListener("mouseenter", onEnterDrag);   el.addEventListener("mouseleave", onLeaveDrag); });
      sliders.forEach(el => { el.addEventListener("mouseenter", onEnterSlider); el.addEventListener("mouseleave", onLeaveSlider); });
      plays.forEach  (el => { el.addEventListener("mouseenter", onEnterPlay);   el.addEventListener("mouseleave", onLeavePlay); });
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
    <>
      {/* circle-cursor-inner: yellow dot, follows cursor immediately */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{ width: "6px", height: "6px", backgroundColor: "#efff02", opacity: 0, willChange: "transform" }}
      />
      {/* circle-cursor-outer: yellow ring, lags slightly */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{ width: "30px", height: "30px", border: "1px solid #efff02", backgroundColor: "transparent", opacity: 0, willChange: "transform" }}
      />
      {/* ball cursor: hidden until zone entry */}
      <div
        ref={ballRef}
        id="ball-cursor"
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full flex items-center justify-center"
        style={{ width: "34px", height: "34px", backgroundColor: "transparent", opacity: 0, willChange: "transform" }}
      >
        <span
          ref={ballInnerRef}
          className="text-white font-bold select-none tracking-widest leading-none text-center"
          style={{ fontSize: "11px", letterSpacing: "2px", wordSpacing: "3px" }}
        />
      </div>
    </>
  );
}
