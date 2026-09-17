"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import KenzoilLogo from "@/components/KenzoilLogo";
import Container from "@/components/Container";

/* ========================================================================== */
/* FLOATING AMBIENT OIL PARTICLES AROUND LOGO                                 */
/* ========================================================================== */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

function AmbientParticles({ opacity }: { opacity: MotionValue<number> }) {
  const particles: Particle[] = useMemo(() => {
    // 24 restrained micro-particles: 12 amber/gold, 12 electric/cyan
    // Deterministic pseudo-randomness ensures 100% identical SSR & client hydration
    const items: Particle[] = [];
    for (let i = 0; i < 24; i++) {
      const isAmber = i % 2 === 0;
      // Deterministic angle & distance based on index sine hashing
      const seed = Math.sin(i * 12.9898) * 43758.5453;
      const pseudoRand1 = seed - Math.floor(seed);
      const seed2 = Math.cos(i * 78.233) * 43758.5453;
      const pseudoRand2 = seed2 - Math.floor(seed2);

      const angle = (i / 24) * Math.PI * 2 + (pseudoRand1 * 0.4 - 0.2);
      const dist = 180 + pseudoRand2 * 220;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist * 0.72; // slight perspective flattening

      items.push({
        id: i,
        x,
        y,
        size: 2 + pseudoRand1 * 2.5,
        color: isAmber
          ? "rgba(245, 158, 11, 0.75)"
          : "rgba(2, 132, 199, 0.75)",
        duration: 4 + pseudoRand2 * 3,
        delay: pseudoRand1 * 2,
        driftX: (pseudoRand1 - 0.5) * 30,
        driftY: (pseudoRand2 - 0.5) * 30,
      });
    }
    return items;
  }, []);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            left: `calc(50% + ${p.x}px)`,
            top: `calc(50% + ${p.y}px)`,
          }}
          animate={{
            x: [0, p.driftX, 0],
            y: [0, p.driftY, 0],
            opacity: [0.25, 0.85, 0.25],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </motion.div>
  );
}

/* ========================================================================== */
/* CINEMATIC LOGO REVEAL COMPONENT                                            */
/* ========================================================================== */
export default function CinematicLogoReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track scroll through the 320vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll spring for cinematic inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  const progress = prefersReducedMotion ? scrollYProgress : smoothProgress;

  /* -------------------------------------------------------------------------- */
  /* MOTION TRANSFORMATIONS                                                     */
  /* -------------------------------------------------------------------------- */

  // Background Tone Transition:
  // 0.00 - 0.25: #F7F5F2 (Clean off-white seamlessly extending WhyKenzoil)
  // 0.25 - 0.65: Rich cinematic transition into deep obsidian/graphite #0A0C0F
  // 0.65 - 1.00: Solid dark industrial stage
  const bgColor = useTransform(
    progress,
    [0.22, 0.62],
    ["#F7F5F2", "#0A0C0F"]
  );

  // Initial Content (Eyebrow, Title, Crosshairs, Telemetry):
  // 0.00 - 0.18: Visible & crisp
  // 0.18 - 0.42: Collapses inward toward (50%, 50%), fades, blurs
  const initialOpacity = useTransform(progress, [0.12, 0.38], [1, 0]);
  const initialScale = useTransform(progress, [0.12, 0.38], [1, 0.65]);
  const initialBlur = useTransform(progress, [0.15, 0.38], [0, 8]);
  const initialY = useTransform(progress, [0.12, 0.38], [0, -35]);

  // Central Concentric Guide Rings:
  const guideRingsScale = useTransform(progress, [0.08, 0.48], [1, 0.15]);
  const guideRingsOpacity = useTransform(
    progress,
    [0.05, 0.28, 0.44],
    [0.35, 0.6, 0]
  );
  const guideRingsRotate = useTransform(progress, [0, 0.55], [0, 90]);

  // Cinematic Camera Zoom (Radial expansion lines / Perspective tunnel):
  // 0.36 - 0.70: Dramatic camera rush into the center
  const tunnelScale = useTransform(progress, [0.34, 0.68], [0.5, 3.2]);
  const tunnelOpacity = useTransform(
    progress,
    [0.32, 0.48, 0.68],
    [0, 0.75, 0]
  );

  // HERO KENZOIL EMBLEM EMERGENCE:
  // 0.52: Hidden in center depth
  // 0.58 - 0.82: Emerges from the spatial transition, scales up, sharpens
  // 0.82 - 1.00: Reaches hero presence and gently settles
  const logoScale = useTransform(
    progress,
    [0.52, 0.7, 0.82, 0.94],
    [0.22, 0.82, 1.04, 1.0]
  );
  const logoOpacity = useTransform(progress, [0.52, 0.68], [0, 1]);
  const logoZIndex = useTransform(progress, [0.52, 0.58], [0, 30]);

  // Ambient Brand Halo (Amber on left, Cyan/Cobalt on right):
  const glowOpacity = useTransform(progress, [0.62, 0.8, 1.0], [0, 1, 0.9]);
  const glowScale = useTransform(progress, [0.62, 0.86], [0.5, 1.25]);

  // Settled Brand Editorial & Specifications:
  // Appears once logo is in hero state (0.80 - 0.92)
  const brandDetailsOpacity = useTransform(progress, [0.8, 0.9], [0, 1]);
  const brandDetailsY = useTransform(progress, [0.8, 0.9], [22, 0]);

  return (
    <section
      id="cinematic-identity"
      ref={containerRef}
      className="relative w-full"
    >
      {/* 
        Scroll Track: 320vh allows a cinematic, unhurried progression.
      */}
      <div className="relative min-h-[300vh] lg:min-h-[330vh] w-full">
        {/* Sticky Pinned Viewport Stage with Solid Transitioning Background */}
        <motion.div
          style={{
            backgroundColor: isMounted ? bgColor : "#F7F5F2",
          }}
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none"
        >
          {/* ============================================================== */}
          {/* LAYER 1: ATMOSPHERIC LIGHTING & VIGNETTE                       */}
          {/* ============================================================== */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              opacity: useTransform(progress, [0.32, 0.62], [0, 1]),
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(18, 24, 33, 0.9) 0%, rgba(8, 10, 14, 0.98) 75%, #060709 100%)",
            }}
          />

          {/* ============================================================== */}
          {/* LAYER 2: INITIAL CLEAN STATE (OFF-WHITE FRAMING)                */}
          {/* ============================================================== */}
          <motion.div
            style={{
              opacity: initialOpacity,
              scale: initialScale,
              y: initialY,
            }}
            className="absolute inset-0 flex flex-col justify-center py-10 sm:py-14 md:py-16 pointer-events-none z-10"
          >
            {/* Central Typography Framing */}
            <Container className="w-full text-center flex flex-col items-center my-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-charcoal/5 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-charcoal mb-4 sm:mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-oil-gold" />
                THE PINNACLE OF FORMULATION
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-[1.08] max-w-2xl">
                The Mark of Pure Engineering
              </h2>

              <p className="mt-4 sm:mt-5 max-w-lg text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
                Decades of lubrication science and severe-duty performance
                distilled into a singular emblem of unyielding reliability.
              </p>

              {/* Inward Focus Prompt */}
              <div className="mt-8 flex flex-col items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-charcoal/60">
                <span>SCROLL TO EXPLORE IDENTITY</span>
                <div className="w-px h-6 bg-charcoal/25 animate-pulse" />
              </div>
            </Container>
          </motion.div>

          {/* ============================================================== */}
          {/* LAYER 3: CONCENTRIC GUIDE RINGS & FOCUS RETICLE                 */}
          {/* ============================================================== */}
          <motion.div
            aria-hidden="true"
            style={{
              scale: guideRingsScale,
              opacity: guideRingsOpacity,
              rotate: guideRingsRotate,
            }}
            className="absolute pointer-events-none flex items-center justify-center z-10"
          >
            {/* Outer Precision Reticle */}
            <div className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] md:w-[580px] md:h-[580px] rounded-full border border-dashed border-charcoal/20 flex items-center justify-center">
              {/* Mid Dial */}
              <div className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-charcoal/15 flex items-center justify-center relative">
                {/* 4 Cardinal Tick Marks */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-oil-gold" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-oil-gold" />
                <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-0.5 bg-sky-500" />
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-0.5 bg-sky-500" />

                {/* Inner Focal Circle */}
                <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px] rounded-full border border-charcoal/25 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-oil-gold animate-ping" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ============================================================== */}
          {/* LAYER 4: CINEMATIC ZOOM TUNNEL & CONDUIT RUSH                   */}
          {/* ============================================================== */}
          <motion.div
            aria-hidden="true"
            style={{
              scale: tunnelScale,
              opacity: tunnelOpacity,
            }}
            className="absolute pointer-events-none w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] md:w-[900px] md:h-[900px] flex items-center justify-center z-15"
          >
            <svg
              viewBox="0 0 800 800"
              className="w-full h-full opacity-40 stroke-current text-offwhite"
              fill="none"
            >
              {/* Perspective Radiating Rays into Center */}
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i / 16) * 360;
                const rad = (angle * Math.PI) / 180;
                const x1 = 400 + Math.cos(rad) * 90;
                const y1 = 400 + Math.sin(rad) * 90;
                const x2 = 400 + Math.cos(rad) * 380;
                const y2 = 400 + Math.sin(rad) * 380;
                const isAmber = i % 2 === 0;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={
                      isAmber
                        ? "rgba(245, 158, 11, 0.45)"
                        : "rgba(2, 132, 199, 0.45)"
                    }
                    strokeWidth={isAmber ? "1.5" : "1"}
                    strokeDasharray="6 12"
                  />
                );
              })}

              {/* Tunnel Depth Rings */}
              <circle
                cx="400"
                cy="400"
                r="180"
                stroke="rgba(245, 158, 11, 0.25)"
                strokeWidth="1"
              />
              <circle
                cx="400"
                cy="400"
                r="280"
                stroke="rgba(2, 132, 199, 0.25)"
                strokeWidth="1"
              />
              <circle
                cx="400"
                cy="400"
                r="380"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1"
              />
            </svg>
          </motion.div>

          {/* ============================================================== */}
          {/* LAYER 5: AMBIENT OIL PARTICLES (RESTRAINED FLUID MOTES)         */}
          {/* ============================================================== */}
          <AmbientParticles
            opacity={useTransform(progress, [0.62, 0.82, 1.0], [0, 0.9, 0.75])}
          />

          {/* ============================================================== */}
          {/* LAYER 6: HERO KENZOIL EMBLEM & DUAL BRAND LIGHTING             */}
          {/* ============================================================== */}
          <div className="relative flex flex-col items-center justify-center z-25">
            {/* Dual Directional Aura (Amber Left, Cobalt Right) with Gentle Breathing */}
            <motion.div
              aria-hidden="true"
              style={{
                opacity: glowOpacity,
                scale: glowScale,
              }}
              animate={
                isMounted
                  ? {
                      scale: [1, 1.04, 1],
                      opacity: [0.85, 1, 0.85],
                    }
                  : undefined
              }
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute pointer-events-none -z-10 w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px]"
            >
              {/* Amber Left Halo */}
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 35% 50%, rgba(245, 158, 11, 0.42) 0%, rgba(217, 138, 61, 0.18) 45%, transparent 70%)",
                }}
              />
              {/* Cobalt Right Halo */}
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 65% 50%, rgba(2, 132, 199, 0.42) 0%, rgba(29, 78, 216, 0.18) 45%, transparent 70%)",
                }}
              />
              {/* Secondary Soft Core Bloom */}
              <div
                className="absolute inset-[20%] rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.16) 0%, transparent 65%)",
                }}
              />
            </motion.div>

            {/* The Precision Vector Logo Emblem */}
            <motion.div
              style={{
                scale: logoScale,
                opacity: logoOpacity,
                zIndex: logoZIndex,
              }}
              className="relative flex items-center justify-center will-change-transform"
            >
              {/* Responsive Logo Container */}
              <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] lg:w-[280px] lg:h-[280px] relative flex items-center justify-center">
                <KenzoilLogo
                  size="100%"
                  className="transition-transform duration-300"
                />

                {/* Subtle Specular Ambient Rim Glint */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.5), 0 20px 50px rgba(0,0,0,0.6)",
                  }}
                />
              </div>
            </motion.div>

            {/* ============================================================== */}
            {/* LAYER 7: SETTLED BRAND EDITORIAL & SPECIFICATION DETAILS       */}
            {/* ============================================================== */}
            <motion.div
              style={{
                opacity: brandDetailsOpacity,
                y: brandDetailsY,
              }}
              className="mt-6 sm:mt-8 md:mt-10 flex flex-col items-center text-center px-4 max-w-xl will-change-transform"
            >
              {/* Industrial Brand Wordmark */}
              <div className="flex items-center gap-3">
                <span className="h-px w-6 sm:w-10 bg-oil-gold/60" />
                <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-[0.25em] text-offwhite drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  KENZOIL
                </h3>
                <span className="h-px w-6 sm:w-10 bg-sky-500/60" />
              </div>

              {/* Sub-label */}
              <p className="mt-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-offwhite/70">
                Advanced Lubrication Engineering
              </p>

              {/* Short manifesto tag */}
              <p className="mt-3 text-xs sm:text-sm text-offwhite/60 leading-relaxed max-w-md hidden sm:block">
                Precision-engineered molecular formulations designed to conquer
                extreme thermal friction, sustain hydraulic velocity, and
                protect heavy industrial infrastructure.
              </p>

              {/* Quality & Grade Badges */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-offwhite/70">
                <span className="px-3 py-1 rounded-sm border border-offwhite/15 bg-charcoal-light/60">
                  BATCH KINEMATIC AUDITED
                </span>
                <span className="px-3 py-1 rounded-sm border border-oil-gold/40 bg-oil-gold/15 text-oil-gold-light font-medium">
                  HEAVY INDUSTRIAL GRADE
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
