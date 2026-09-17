"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Container from "@/components/Container";

/* ========================================================================== */
/* 4 CORE ENGINEERING STORYTELLING STAGES                                     */
/* ========================================================================== */
export interface EngineeringStage {
  id: string;
  index: string;
  stepNum: string;
  tag: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  zoneName: string;
  centerCoord: { x: number; y: number };
  accentColor: string;
  fluidProgressPct: number;
}

export const ENGINEERING_STAGES: EngineeringStage[] = [
  {
    id: "consistent-performance",
    index: "01",
    stepNum: "01",
    tag: "CONSISTENT PERFORMANCE",
    shortLabel: "Consistency",
    title: "Laminar Flow & Steady Hydraulic Pressure",
    subtitle: "High-Velocity Circuit Stability",
    description:
      "Formulated with shear-stable polymers and rapid air-release additives to sustain uniform laminar flow. The fluid resists cavitation and pressure drops under continuous high-velocity circulation.",
    highlight: "ZERO CAVITATION",
    zoneName: "LAMINAR CONDUIT",
    centerCoord: { x: 175, y: 220 },
    accentColor: "#D98A3D", // Oil Gold
    fluidProgressPct: 25,
  },
  {
    id: "thermal-stability",
    index: "02",
    stepNum: "02",
    tag: "THERMAL STABILITY",
    shortLabel: "Thermal",
    title: "Molecular Resilience Under Extreme Heat",
    subtitle: "Thermal Shear & Oxidation Resistance",
    description:
      "High-viscosity-index synthetic base stocks resist molecular degradation in severe high-temperature environments, preventing oil thinning, thermal oxidation, and varnish formation.",
    highlight: "HIGH-VI RETENTION",
    zoneName: "THERMAL JACKET",
    centerCoord: { x: 410, y: 310 },
    accentColor: "#E8A855", // Amber
    fluidProgressPct: 52,
  },
  {
    id: "engineered-protection",
    index: "03",
    stepNum: "03",
    tag: "ENGINEERED PROTECTION",
    shortLabel: "Protection",
    title: "Hydrodynamic Boundary Layer Defense",
    subtitle: "Continuous Metal-to-Metal Shielding",
    description:
      "Polar anti-wear compounds bond to metallic contact surfaces under extreme loads, creating an unyielding micro-film cushion that completely prevents metal-to-metal contact and micro-pitting.",
    highlight: "SURFACE SEPARATION",
    zoneName: "BEARING INTERFACE",
    centerCoord: { x: 650, y: 200 },
    accentColor: "#D98A3D", // Oil Gold
    fluidProgressPct: 76,
  },
  {
    id: "quality-focus",
    index: "04",
    stepNum: "04",
    tag: "QUALITY FOCUS",
    shortLabel: "Quality",
    title: "Precision Formulation & Spectroscopic Audit",
    subtitle: "Multi-Point Purity Calibration",
    description:
      "Every batch undergoes automated kinematic calibration and spectroscopic fingerprinting to guarantee unvarying chemical purity and viscosity repeatability across every drum.",
    highlight: "100% BATCH AUDIT",
    zoneName: "OPTICAL CELL",
    centerCoord: { x: 865, y: 220 },
    accentColor: "#B5502B", // Rust
    fluidProgressPct: 100,
  },
];

/* Waypoints defining the primary heavy industrial pipeline */
const MAIN_PIPE_WAYPOINTS = [
  { x: 25, y: 220 },
  { x: 100, y: 220 },
  { x: 175, y: 220 }, // Zone 1: Laminar Conduit
  { x: 250, y: 220 },
  { x: 300, y: 225 }, // Bend start
  { x: 335, y: 255 }, // Mandrel elbow
  { x: 360, y: 300 }, // Downwards bend
  { x: 410, y: 310 }, // Zone 2: Thermal Jacket
  { x: 470, y: 310 },
  { x: 515, y: 295 }, // Bend start upwards
  { x: 550, y: 245 }, // Elbow upward
  { x: 590, y: 205 }, // Approach Zone 3
  { x: 650, y: 200 }, // Zone 3: Mechanical Bearing Interface
  { x: 720, y: 205 },
  { x: 765, y: 218 }, // S-step transition
  { x: 810, y: 220 },
  { x: 865, y: 220 }, // Zone 4: Optical Quality Inspection Cell
  { x: 925, y: 220 },
  { x: 975, y: 220 }, // Discharge
];

interface PathSample {
  x: number;
  y: number;
  nx: number;
  ny: number;
  angle: number;
}

/* Pre-compute 320 equidistant samples along a Catmull-Rom spline */
function generatePipePathSamples(count = 320): PathSample[] {
  const pts = MAIN_PIPE_WAYPOINTS;
  const rawPoints: { x: number; y: number }[] = [];

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

    const segments = 25;
    for (let s = 0; s < segments; s++) {
      const t = s / segments;
      const t2 = t * t;
      const t3 = t2 * t;

      const x =
        0.5 *
        (2 * p1.x +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
      const y =
        0.5 *
        (2 * p1.y +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);

      rawPoints.push({ x, y });
    }
  }
  rawPoints.push(pts[pts.length - 1]);

  const samples: PathSample[] = [];
  const step = (rawPoints.length - 1) / (count - 1);

  for (let i = 0; i < count; i++) {
    const index = Math.min(rawPoints.length - 1, Math.round(i * step));
    const curr = rawPoints[index];
    const next = rawPoints[Math.min(rawPoints.length - 1, index + 1)];
    const prev = rawPoints[Math.max(0, index - 1)];

    const dx = next.x - prev.x || 1;
    const dy = next.y - prev.y || 0;
    const len = Math.hypot(dx, dy) || 1;

    // Unit normal vector (perpendicular to pipe axis)
    const nx = -dy / len;
    const ny = dx / len;
    const angle = Math.atan2(dy, dx);

    samples.push({ x: curr.x, y: curr.y, nx, ny, angle });
  }

  return samples;
}

const PIPE_SAMPLES = generatePipePathSamples(320);

/* Internal micro-flow particle structure */
interface FluidFilament {
  s: number; // 0 to 1 along curve
  offset: number; // -0.42 to +0.42 across inner channel
  speed: number;
  length: number;
  width: number;
  opacity: number;
}

function initFluidFilaments(count = 42): FluidFilament[] {
  const filaments: FluidFilament[] = [];
  for (let i = 0; i < count; i++) {
    filaments.push({
      s: Math.random(),
      offset: (Math.random() - 0.5) * 0.76,
      speed: 0.0016 + Math.random() * 0.0024,
      length: 12 + Math.random() * 26,
      width: 1.2 + Math.random() * 2.0,
      opacity: 0.4 + Math.random() * 0.55,
    });
  }
  return filaments;
}

/* ========================================================================== */
/* INDUSTRIAL PIPELINE CANVAS VISUAL ENGINE                                   */
/* ========================================================================== */
interface IndustrialPipelineVisualProps {
  activeStageIndex: number;
  progressPercent: number; // 0 to 100
}

function IndustrialPipelineVisual({
  activeStageIndex,
  progressPercent,
}: IndustrialPipelineVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const filamentsRef = useRef<FluidFilament[]>(initFluidFilaments(44));
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);
  const prefersReducedMotion = useReducedMotion();

  // Mutable refs for 60fps render loop
  const activeStageIndexRef = useRef(activeStageIndex);
  activeStageIndexRef.current = activeStageIndex;

  const targetProgressRef = useRef(progressPercent);
  targetProgressRef.current = progressPercent;

  const animatedProgressRef = useRef(progressPercent);
  const currentReticleCoord = useRef({ x: 175, y: 220 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let time = 0;

    const render = () => {
      if (!isVisibleRef.current) {
        animFrameIdRef.current = requestAnimationFrame(render);
        return;
      }

      time += prefersReducedMotion ? 0 : 0.018;

      const currentActiveIndex = activeStageIndexRef.current;
      const targetReticleCoord = ENGINEERING_STAGES[currentActiveIndex].centerCoord;

      // Reticle smooth tracking
      currentReticleCoord.current.x +=
        (targetReticleCoord.x - currentReticleCoord.current.x) * 0.12;
      currentReticleCoord.current.y +=
        (targetReticleCoord.y - currentReticleCoord.current.y) * 0.12;

      // Fluid progress smooth easing
      animatedProgressRef.current +=
        (targetProgressRef.current - animatedProgressRef.current) * 0.08;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const logicalW = 1000;
      const logicalH = 500;

      if (canvas.width !== logicalW * dpr || canvas.height !== logicalH * dpr) {
        canvas.width = logicalW * dpr;
        canvas.height = logicalH * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, logicalW, logicalH);

      const targetProgress = Math.min(100, Math.max(18, animatedProgressRef.current));
      const maxSampleIndex = Math.min(
        PIPE_SAMPLES.length - 1,
        Math.max(15, Math.round((targetProgress / 100) * (PIPE_SAMPLES.length - 1)))
      );

      /* ---------------------------------------------------------------------- */
      /* 1. ARCHITECTURAL BED & MOUNTING STANCHIONS                             */
      /* ---------------------------------------------------------------------- */
      ctx.strokeStyle = "rgba(26, 26, 26, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(30, 100);
      ctx.lineTo(970, 100);
      ctx.moveTo(30, 420);
      ctx.lineTo(970, 420);
      ctx.stroke();

      // Vertical stage reference markers
      ENGINEERING_STAGES.forEach((stg, i) => {
        const x = stg.centerCoord.x;
        ctx.strokeStyle = "rgba(26, 26, 26, 0.08)";
        ctx.setLineDash([2, 5]);
        ctx.beginPath();
        ctx.moveTo(x, 40);
        ctx.lineTo(x, 460);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.font = "500 9px monospace";
        ctx.fillStyle = i === currentActiveIndex ? "#D98A3D" : "rgba(26, 26, 26, 0.35)";
        ctx.textAlign = "center";
        ctx.fillText(`ZONE 0${i + 1}`, x, 32);
      });

      // Heavy mounting stanchions / floor support saddles
      const stanchionPositions = [
        { x: 100, pipeY: 220, floorY: 420 },
        { x: 260, pipeY: 220, floorY: 420 },
        { x: 490, pipeY: 310, floorY: 420 },
        { x: 740, pipeY: 205, floorY: 420 },
        { x: 935, pipeY: 220, floorY: 420 },
      ];

      stanchionPositions.forEach((st) => {
        // Steel pillar column
        const pillarGrad = ctx.createLinearGradient(st.x - 7, 0, st.x + 7, 0);
        pillarGrad.addColorStop(0, "#18181B");
        pillarGrad.addColorStop(0.35, "#3F3F46");
        pillarGrad.addColorStop(0.7, "#27272A");
        pillarGrad.addColorStop(1, "#09090B");

        ctx.fillStyle = pillarGrad;
        ctx.fillRect(st.x - 6, st.pipeY + 28, 12, st.floorY - (st.pipeY + 28));

        // Saddle clamp band embracing the pipe
        ctx.fillStyle = "#27272A";
        ctx.strokeStyle = "#52525B";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(st.x, st.pipeY, 32, 0.15 * Math.PI, 0.85 * Math.PI);
        ctx.stroke();

        // Floor baseplate with anchor bolts
        ctx.fillStyle = "#1F1F23";
        ctx.fillRect(st.x - 16, st.floorY - 6, 32, 6);
        ctx.fillStyle = "#71717A";
        ctx.fillRect(st.x - 12, st.floorY - 8, 3, 2);
        ctx.fillRect(st.x + 9, st.floorY - 8, 3, 2);
      });

      /* ---------------------------------------------------------------------- */
      /* 2. SECONDARY METALLIC BYPASS LINE (DEPTH & INDUSTRIAL MASS)            */
      /* ---------------------------------------------------------------------- */
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(60, 220);
      ctx.lineTo(60, 390);
      ctx.lineTo(260, 390);
      ctx.quadraticCurveTo(310, 390, 340, 420);
      ctx.lineTo(640, 420);
      ctx.quadraticCurveTo(700, 420, 725, 360);
      ctx.lineTo(725, 205);

      // Secondary pipe drop shadow
      ctx.strokeStyle = "rgba(10, 10, 15, 0.15)";
      ctx.lineWidth = 26;
      ctx.stroke();

      // Secondary pipe steel gradient
      const secPipeGrad = ctx.createLinearGradient(0, 390 - 12, 0, 390 + 12);
      secPipeGrad.addColorStop(0, "#18181B");
      secPipeGrad.addColorStop(0.3, "#3F3F46");
      secPipeGrad.addColorStop(0.6, "#27272A");
      secPipeGrad.addColorStop(1, "#09090B");
      ctx.strokeStyle = secPipeGrad;
      ctx.lineWidth = 20;
      ctx.stroke();

      // Secondary pipe center specular line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Miniature pressure balance valve on secondary line
      ctx.fillStyle = "#27272A";
      ctx.strokeStyle = "#52525B";
      ctx.lineWidth = 1;
      ctx.fillRect(200, 378, 20, 24);
      ctx.strokeRect(200, 378, 20, 24);
      // Handwheel on valve
      ctx.fillStyle = "#B5502B";
      ctx.fillRect(205, 370, 10, 4);
      ctx.strokeRect(205, 370, 10, 4);

      /* ---------------------------------------------------------------------- */
      /* 3. PRIMARY PIPE AMBIENT DROP SHADOW & RECESSED BED                     */
      /* ---------------------------------------------------------------------- */
      ctx.beginPath();
      for (let i = 0; i < PIPE_SAMPLES.length; i++) {
        const pt = PIPE_SAMPLES[i];
        if (i === 0) ctx.moveTo(pt.x, pt.y + 18);
        else ctx.lineTo(pt.x, pt.y + 18);
      }
      ctx.strokeStyle = "rgba(20, 20, 26, 0.18)";
      ctx.lineWidth = 66;
      ctx.stroke();

      // Recessed inner conduit channel (dark hollow core bed)
      ctx.beginPath();
      for (let i = 0; i < PIPE_SAMPLES.length; i++) {
        const pt = PIPE_SAMPLES[i];
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = "#0E0E12";
      ctx.lineWidth = 44;
      ctx.stroke();

      /* ---------------------------------------------------------------------- */
      /* 4. DYNAMIC FLOWING AMBER LUBRICANT (KENZOIL BRAND CORE)                */
      /* ---------------------------------------------------------------------- */
      if (maxSampleIndex > 2) {
        // 4A. Base Volumetric Liquid Body (40px width inside 42px lumen)
        ctx.beginPath();
        for (let i = 0; i <= maxSampleIndex; i++) {
          const pt = PIPE_SAMPLES[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }

        const oilBodyGrad = ctx.createLinearGradient(30, 220, 970, 220);
        oilBodyGrad.addColorStop(0, "#8A3810");
        oilBodyGrad.addColorStop(0.2, "#C2671A");
        oilBodyGrad.addColorStop(0.5, "#D97706");
        oilBodyGrad.addColorStop(0.75, "#F59E0B");
        oilBodyGrad.addColorStop(1, "#B45309");

        ctx.strokeStyle = oilBodyGrad;
        ctx.lineWidth = 40;
        ctx.stroke();

        // 4B. Glowing Inner Liquid Layer (26px width)
        ctx.strokeStyle = "rgba(245, 158, 11, 0.82)";
        ctx.lineWidth = 26;
        ctx.stroke();

        // 4C. Radiant Luminous Liquid Core (10px width)
        ctx.strokeStyle = "rgba(254, 243, 199, 0.94)";
        ctx.lineWidth = 10;
        ctx.stroke();

        // 4D. Dynamic Specular Sheen Bands
        if (!prefersReducedMotion) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
          ctx.lineWidth = 2.5;
          for (let sIdx = 0; sIdx < 3; sIdx++) {
            const sT = ((time * 0.14 + sIdx * 0.33) % (targetProgress / 100));
            const sSampleIdx = Math.min(
              maxSampleIndex - 8,
              Math.max(4, Math.round(sT * (PIPE_SAMPLES.length - 1)))
            );

            if (sSampleIdx > 0 && sSampleIdx < maxSampleIndex - 6) {
              ctx.beginPath();
              const start = PIPE_SAMPLES[sSampleIdx];
              const mid = PIPE_SAMPLES[sSampleIdx + 4];
              const end = PIPE_SAMPLES[sSampleIdx + 8];

              ctx.moveTo(start.x + start.nx * 6, start.y + start.ny * 6);
              ctx.quadraticCurveTo(
                mid.x + mid.nx * 6,
                mid.y + mid.ny * 6,
                end.x + end.nx * 6,
                end.y + end.ny * 6
              );
              ctx.stroke();
            }
          }
        }

        // 4E. Continuous Micro-Flow Streaming Filaments & Streaks
        const filaments = filamentsRef.current;
        const progressFraction = targetProgress / 100;

        filaments.forEach((fil) => {
          if (!prefersReducedMotion) {
            fil.s += fil.speed;
            if (fil.s > progressFraction) {
              fil.s = 0;
              fil.offset = (Math.random() - 0.5) * 0.72;
            }
          }

          const sampleIdx = Math.min(
            maxSampleIndex - 2,
            Math.max(0, Math.round(fil.s * (PIPE_SAMPLES.length - 1)))
          );
          const p1 = PIPE_SAMPLES[sampleIdx];
          const nextSampleIdx = Math.min(
            maxSampleIndex,
            sampleIdx + Math.max(2, Math.round(fil.length / 5))
          );
          const p2 = PIPE_SAMPLES[nextSampleIdx];

          const fx1 = p1.x + p1.nx * (fil.offset * 32);
          const fy1 = p1.y + p1.ny * (fil.offset * 32);
          const fx2 = p2.x + p2.nx * (fil.offset * 32);
          const fy2 = p2.y + p2.ny * (fil.offset * 32);

          ctx.strokeStyle = `rgba(254, 240, 138, ${fil.opacity * 0.85})`;
          ctx.lineWidth = fil.width;
          ctx.beginPath();
          ctx.moveTo(fx1, fy1);
          ctx.lineTo(fx2, fy2);
          ctx.stroke();
        });

        // 4F. Leading Meniscus Tip
        const tipPt = PIPE_SAMPLES[maxSampleIndex];
        ctx.fillStyle = "#FEF3C7";
        ctx.beginPath();
        ctx.arc(tipPt.x, tipPt.y, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(217, 138, 61, 0.4)";
        ctx.beginPath();
        ctx.arc(tipPt.x, tipPt.y, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ---------------------------------------------------------------------- */
      /* 5. SOLID METALLIC PIPE COVER SECTIONS (ENCLOSED PIPE RUNS)             */
      /* ---------------------------------------------------------------------- */
      // The pipe is solid dark steel between cutaways.
      // Cutaways are open at:
      // Zone 1: 25..80
      // Zone 2: 110..165
      // Zone 3: 195..245
      // Zone 4: 265..305
      const solidSegments = [
        { start: 0, end: 25 },
        { start: 80, end: 110 },
        { start: 165, end: 195 },
        { start: 245, end: 265 },
        { start: 305, end: 319 },
      ];

      solidSegments.forEach((seg) => {
        ctx.beginPath();
        for (let i = seg.start; i <= seg.end; i++) {
          const pt = PIPE_SAMPLES[i];
          if (i === seg.start) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = "#1C1C20";
        ctx.lineWidth = 42;
        ctx.stroke();

        // Longitudinal brushed-steel highlight on solid cover
        ctx.beginPath();
        for (let i = seg.start; i <= seg.end; i++) {
          const pt = PIPE_SAMPLES[i];
          const hx = pt.x + pt.nx * 7;
          const hy = pt.y + pt.ny * 7;
          if (i === seg.start) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.strokeStyle = "rgba(113, 113, 122, 0.28)";
        ctx.lineWidth = 10;
        ctx.stroke();
      });

      /* ---------------------------------------------------------------------- */
      /* 6. TOP & BOTTOM SOLID METALLIC PIPE WALLS (CONTINUOUS FRAME)           */
      /* ---------------------------------------------------------------------- */
      // 6A. Top Solid Steel Wall (from +20 to +29px offset, thickness 9px)
      ctx.beginPath();
      for (let i = 0; i < PIPE_SAMPLES.length; i++) {
        const pt = PIPE_SAMPLES[i];
        const wx = pt.x + pt.nx * 24.5;
        const wy = pt.y + pt.ny * 24.5;
        if (i === 0) ctx.moveTo(wx, wy);
        else ctx.lineTo(wx, wy);
      }
      ctx.strokeStyle = "#27272A";
      ctx.lineWidth = 9;
      ctx.stroke();

      // Top outer rim specular highlight
      ctx.beginPath();
      for (let i = 0; i < PIPE_SAMPLES.length; i++) {
        const pt = PIPE_SAMPLES[i];
        const wx = pt.x + pt.nx * 28;
        const wy = pt.y + pt.ny * 28;
        if (i === 0) ctx.moveTo(wx, wy);
        else ctx.lineTo(wx, wy);
      }
      ctx.strokeStyle = "rgba(244, 244, 245, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Top inner chamfer bevel line (visible cut edge)
      ctx.beginPath();
      for (let i = 0; i < PIPE_SAMPLES.length; i++) {
        const pt = PIPE_SAMPLES[i];
        const wx = pt.x + pt.nx * 20.5;
        const wy = pt.y + pt.ny * 20.5;
        if (i === 0) ctx.moveTo(wx, wy);
        else ctx.lineTo(wx, wy);
      }
      ctx.strokeStyle = "rgba(161, 161, 170, 0.45)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 6B. Bottom Solid Steel Wall (from -20 to -29px offset, thickness 9px)
      ctx.beginPath();
      for (let i = 0; i < PIPE_SAMPLES.length; i++) {
        const pt = PIPE_SAMPLES[i];
        const wx = pt.x - pt.nx * 24.5;
        const wy = pt.y - pt.ny * 24.5;
        if (i === 0) ctx.moveTo(wx, wy);
        else ctx.lineTo(wx, wy);
      }
      ctx.strokeStyle = "#18181B";
      ctx.lineWidth = 9;
      ctx.stroke();

      // Bottom inner chamfer bevel line
      ctx.beginPath();
      for (let i = 0; i < PIPE_SAMPLES.length; i++) {
        const pt = PIPE_SAMPLES[i];
        const wx = pt.x - pt.nx * 20.5;
        const wy = pt.y - pt.ny * 20.5;
        if (i === 0) ctx.moveTo(wx, wy);
        else ctx.lineTo(wx, wy);
      }
      ctx.strokeStyle = "rgba(82, 82, 91, 0.5)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 6C. Cutaway Window Opening Bevel Caps
      const cutawayWindows = [
        { start: 25, end: 80 },
        { start: 110, end: 165 },
        { start: 195, end: 245 },
        { start: 265, end: 305 },
      ];

      cutawayWindows.forEach((win) => {
        // Start cut chamfer line
        const pStart = PIPE_SAMPLES[win.start];
        ctx.strokeStyle = "#52525B";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pStart.x + pStart.nx * 20, pStart.y + pStart.ny * 20);
        ctx.lineTo(pStart.x - pStart.nx * 20, pStart.y - pStart.ny * 20);
        ctx.stroke();

        // End cut chamfer line
        const pEnd = PIPE_SAMPLES[win.end];
        ctx.beginPath();
        ctx.moveTo(pEnd.x + pEnd.nx * 20, pEnd.y + pEnd.ny * 20);
        ctx.lineTo(pEnd.x - pEnd.nx * 20, pEnd.y - pEnd.ny * 20);
        ctx.stroke();

        // Borosilicate glass reflection diagonal glint
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(pStart.x + 10, pStart.y - 15);
        ctx.lineTo(pStart.x + 35, pStart.y + 15);
        ctx.stroke();
      });

      /* ---------------------------------------------------------------------- */
      /* 7. BOLTED FLANGES & MECHANICAL COLLARS                                 */
      /* ---------------------------------------------------------------------- */
      const flangeIndices = [12, 80, 110, 165, 195, 245, 265, 312];

      flangeIndices.forEach((idx) => {
        const pt = PIPE_SAMPLES[idx];
        const hLen = 34; // 68px collar height
        const thickness = 10;

        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.angle);

        // Flange collar rectangle
        const fGrad = ctx.createLinearGradient(0, -hLen, 0, hLen);
        fGrad.addColorStop(0, "#18181B");
        fGrad.addColorStop(0.2, "#52525B");
        fGrad.addColorStop(0.5, "#27272A");
        fGrad.addColorStop(0.8, "#18181B");
        fGrad.addColorStop(1, "#09090B");

        ctx.fillStyle = fGrad;
        ctx.fillRect(-thickness / 2, -hLen, thickness, hLen * 2);

        // Bevel edge stroke
        ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
        ctx.lineWidth = 1;
        ctx.strokeRect(-thickness / 2, -hLen, thickness, hLen * 2);

        // 4 Raised bolt studs with highlight glints
        const boltOffsets = [-24, -12, 12, 24];
        boltOffsets.forEach((bo) => {
          ctx.fillStyle = "#18181B";
          ctx.beginPath();
          ctx.arc(0, bo, 3.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#A1A1AA";
          ctx.beginPath();
          ctx.arc(-0.8, bo - 0.8, 1.6, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      });

      /* ---------------------------------------------------------------------- */
      /* 8. CINEMATIC ENVIRONMENTAL SCENE 01: LAMINAR CONDUIT (ZONE 1)          */
      /* ---------------------------------------------------------------------- */
      const isZ1Active = currentActiveIndex === 0;
      const z1X = 175;
      const z1Y = 220;

      // Flow straightening guide rails
      ctx.strokeStyle = isZ1Active ? "rgba(217, 138, 61, 0.75)" : "rgba(26, 26, 26, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(z1X - 58, z1Y - 20);
      ctx.lineTo(z1X + 58, z1Y - 20);
      ctx.moveTo(z1X - 58, z1Y + 20);
      ctx.lineTo(z1X + 58, z1Y + 20);
      ctx.stroke();

      // Parallel laminar streamlines
      const z1Offsets = [-12, -6, 0, 6, 12];
      z1Offsets.forEach((offset, idx) => {
        ctx.strokeStyle = isZ1Active ? "rgba(245, 158, 11, 0.45)" : "rgba(26, 26, 26, 0.12)";
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(z1X - 52, z1Y + offset);
        ctx.lineTo(z1X + 52, z1Y + offset);
        ctx.stroke();
        ctx.setLineDash([]);

        // Directional velocity chevrons moving in laminar synchrony
        if (isZ1Active && !prefersReducedMotion) {
          const chevX = z1X - 40 + (((time * 42 + idx * 16) % 80));
          ctx.fillStyle = "#D98A3D";
          ctx.beginPath();
          ctx.moveTo(chevX, z1Y + offset - 3);
          ctx.lineTo(chevX + 4, z1Y + offset);
          ctx.lineTo(chevX, z1Y + offset + 3);
          ctx.fill();
        }
      });

      ctx.font = "600 8.5px monospace";
      ctx.fillStyle = isZ1Active ? "#D98A3D" : "rgba(26, 26, 26, 0.4)";
      ctx.textAlign = "center";
      ctx.fillText("LAMINAR STABILIZER // ZERO CAVITATION", z1X, z1Y + 48);

      /* ---------------------------------------------------------------------- */
      /* 9. CINEMATIC ENVIRONMENTAL SCENE 02: THERMAL JACKET (ZONE 2)           */
      /* ---------------------------------------------------------------------- */
      const isZ2Active = currentActiveIndex === 1;
      const z2Intensity = isZ2Active ? 1 : 0.4;
      const z2X = 410;
      const z2Y = 310;

      // Industrial thermal heating jacket surrounding the pipe
      // Deep atmospheric heat bloom
      const heatGrad = ctx.createRadialGradient(z2X, z2Y, 15, z2X, z2Y, 110);
      heatGrad.addColorStop(0, `rgba(234, 88, 12, ${0.32 * z2Intensity})`);
      heatGrad.addColorStop(0.45, `rgba(217, 119, 6, ${0.16 * z2Intensity})`);
      heatGrad.addColorStop(1, "rgba(234, 88, 12, 0)");

      ctx.fillStyle = heatGrad;
      ctx.beginPath();
      ctx.arc(z2X, z2Y, 110, 0, Math.PI * 2);
      ctx.fill();

      // Heavy Thermal Furnace Jacket Cowl
      const cowlWidth = 96;
      const cowlHeight = 74;
      ctx.strokeStyle = isZ2Active ? "rgba(234, 88, 12, 0.75)" : "rgba(26, 26, 26, 0.35)";
      ctx.lineWidth = 1.8;
      ctx.strokeRect(z2X - cowlWidth / 2, z2Y - cowlHeight / 2, cowlWidth, cowlHeight);

      // Induction heating coil ribs on the jacket
      ctx.strokeStyle = isZ2Active ? "rgba(245, 158, 11, 0.6)" : "rgba(26, 26, 26, 0.25)";
      ctx.lineWidth = 1.2;
      for (let rx = -36; rx <= 36; rx += 12) {
        ctx.beginPath();
        ctx.moveTo(z2X + rx, z2Y - cowlHeight / 2);
        ctx.lineTo(z2X + rx, z2Y - 29);
        ctx.moveTo(z2X + rx, z2Y + 29);
        ctx.lineTo(z2X + rx, z2Y + cowlHeight / 2);
        ctx.stroke();
      }

      // Concentric expanding radiant heat wave contours
      for (let rIdx = 0; rIdx < 3; rIdx++) {
        const ringProgress = ((time * 0.35 + rIdx * 0.33) % 1);
        const radius = 35 + ringProgress * 75;
        const ringAlpha = Math.sin(ringProgress * Math.PI) * 0.42 * z2Intensity;

        ctx.strokeStyle = `rgba(220, 38, 38, ${ringAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.arc(z2X, z2Y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Ascending thermal energy motes
      if (!prefersReducedMotion) {
        for (let m = 0; m < 7; m++) {
          const mTime = (time * 0.6 + m * 0.45) % 1;
          const mx = z2X + Math.sin(time * 2 + m * 1.5) * 44;
          const my = z2Y + 50 - mTime * 100;
          const mAlpha = Math.sin(mTime * Math.PI) * 0.55 * z2Intensity;

          ctx.fillStyle = `rgba(245, 158, 11, ${mAlpha})`;
          ctx.beginPath();
          ctx.arc(mx, my, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.font = "600 8.5px monospace";
      ctx.fillStyle = isZ2Active ? "#B5502B" : "rgba(26, 26, 26, 0.4)";
      ctx.textAlign = "center";
      ctx.fillText("THERMAL JACKET // HIGH-VI RETENTION", z2X, z2Y + 56);

      /* ---------------------------------------------------------------------- */
      /* 10. CINEMATIC ENVIRONMENTAL SCENE 03: BEARING INTERFACE (ZONE 3)       */
      /* ---------------------------------------------------------------------- */
      const isZ3Active = currentActiveIndex === 2;
      const z3X = 650;
      const z3Y = 200;

      // Two massive machined forged-steel contact shoes pushing together
      const blockGap = isZ3Active ? 28 : 34;
      const upperBlockY = z3Y - blockGap;
      const lowerBlockY = z3Y + blockGap;

      // Upper forged shoe
      ctx.fillStyle = "#232326";
      ctx.strokeStyle = isZ3Active ? "rgba(217, 138, 61, 0.65)" : "rgba(26, 26, 26, 0.35)";
      ctx.lineWidth = 1.4;

      ctx.beginPath();
      ctx.moveTo(z3X - 52, upperBlockY - 38);
      ctx.lineTo(z3X + 52, upperBlockY - 38);
      ctx.lineTo(z3X + 52, upperBlockY - 12);
      ctx.lineTo(z3X + 34, upperBlockY);
      ctx.lineTo(z3X - 34, upperBlockY);
      ctx.lineTo(z3X - 52, upperBlockY - 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Machined micro-groove texture (upper)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 1;
      for (let g = -26; g <= 26; g += 9) {
        ctx.beginPath();
        ctx.moveTo(z3X + g - 5, upperBlockY - 26);
        ctx.lineTo(z3X + g + 5, upperBlockY - 8);
        ctx.stroke();
      }

      // Lower forged shoe
      ctx.beginPath();
      ctx.moveTo(z3X - 52, lowerBlockY + 38);
      ctx.lineTo(z3X + 52, lowerBlockY + 38);
      ctx.lineTo(z3X + 52, lowerBlockY + 12);
      ctx.lineTo(z3X + 34, lowerBlockY);
      ctx.lineTo(z3X - 34, lowerBlockY);
      ctx.lineTo(z3X - 52, lowerBlockY + 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Machined micro-groove texture (lower)
      for (let g = -26; g <= 26; g += 9) {
        ctx.beginPath();
        ctx.moveTo(z3X + g - 5, lowerBlockY + 8);
        ctx.lineTo(z3X + g + 5, lowerBlockY + 26);
        ctx.stroke();
      }

      // Load vectors & hydrodynamic boundary cushion
      if (isZ3Active) {
        ctx.strokeStyle = "#E8A855";
        ctx.lineWidth = 1.6;
        // Upper load arrow
        ctx.beginPath();
        ctx.moveTo(z3X, upperBlockY - 14);
        ctx.lineTo(z3X, upperBlockY - 3);
        ctx.stroke();
        // Lower load arrow
        ctx.beginPath();
        ctx.moveTo(z3X, lowerBlockY + 14);
        ctx.lineTo(z3X, lowerBlockY + 3);
        ctx.stroke();

        // High-pressure hydrodynamic cushion highlight in interface gap
        ctx.fillStyle = "rgba(232, 168, 85, 0.16)";
        ctx.fillRect(z3X - 44, z3Y - 14, 88, 28);
      }

      ctx.font = "600 8.5px monospace";
      ctx.fillStyle = isZ3Active ? "#D98A3D" : "rgba(26, 26, 26, 0.4)";
      ctx.textAlign = "center";
      ctx.fillText("BEARING INTERFACE // SURFACE SEPARATION", z3X, lowerBlockY + 52);

      /* ---------------------------------------------------------------------- */
      /* 11. CINEMATIC ENVIRONMENTAL SCENE 04: OPTICAL INSPECTION (ZONE 4)      */
      /* ---------------------------------------------------------------------- */
      const isZ4Active = currentActiveIndex === 3;
      const z4Intensity = isZ4Active ? 1 : 0.4;
      const z4X = 865;
      const z4Y = 220;

      // Heavy optical sensor housing collar around pipe
      ctx.strokeStyle = isZ4Active ? "rgba(181, 80, 43, 0.85)" : "rgba(26, 26, 26, 0.3)";
      ctx.lineWidth = 1.6;
      // Laser Emitter (top)
      ctx.fillStyle = "#1F1F23";
      ctx.fillRect(z4X - 26, z4Y - 54, 52, 16);
      ctx.strokeRect(z4X - 26, z4Y - 54, 52, 16);
      // Optical Receiver (bottom)
      ctx.fillRect(z4X - 26, z4Y + 38, 52, 16);
      ctx.strokeRect(z4X - 26, z4Y + 38, 52, 16);

      // Sweeping luminous optical laser scan beam
      const sweepOffset = isZ4Active && !prefersReducedMotion ? Math.sin(time * 2.5) * 22 : 0;
      const scanX = z4X + sweepOffset;

      const beamGrad = ctx.createLinearGradient(scanX, z4Y - 38, scanX, z4Y + 38);
      beamGrad.addColorStop(0, `rgba(220, 38, 38, ${0.85 * z4Intensity})`);
      beamGrad.addColorStop(0.5, `rgba(251, 191, 36, ${0.95 * z4Intensity})`);
      beamGrad.addColorStop(1, `rgba(220, 38, 38, ${0.85 * z4Intensity})`);

      ctx.strokeStyle = beamGrad;
      ctx.lineWidth = isZ4Active ? 2.2 : 1;
      ctx.beginPath();
      ctx.moveTo(scanX, z4Y - 38);
      ctx.lineTo(scanX, z4Y + 38);
      ctx.stroke();

      // Optical flare pulse at scan center
      if (isZ4Active) {
        ctx.fillStyle = "rgba(254, 240, 138, 0.9)";
        ctx.beginPath();
        ctx.arc(scanX, z4Y, 3.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.font = "600 8.5px monospace";
      ctx.fillStyle = isZ4Active ? "#B5502B" : "rgba(26, 26, 26, 0.4)";
      ctx.textAlign = "center";
      ctx.fillText("SPECTROSCOPIC AUDIT // 100% VERIFIED", z4X, z4Y + 68);

      /* ---------------------------------------------------------------------- */
      /* 12. PRECISION ACTIVE TARGETING RETICLE                                 */
      /* ---------------------------------------------------------------------- */
      const reticleX = currentReticleCoord.current.x;
      const reticleY = currentReticleCoord.current.y;
      const activeColor = ENGINEERING_STAGES[currentActiveIndex].accentColor;

      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 1.5;

      const bSize = 24;
      const bLen = 8;
      // Top-Left
      ctx.beginPath();
      ctx.moveTo(reticleX - bSize, reticleY - bSize + bLen);
      ctx.lineTo(reticleX - bSize, reticleY - bSize);
      ctx.lineTo(reticleX - bSize + bLen, reticleY - bSize);
      // Top-Right
      ctx.moveTo(reticleX + bSize - bLen, reticleY - bSize);
      ctx.lineTo(reticleX + bSize, reticleY - bSize);
      ctx.lineTo(reticleX + bSize, reticleY - bSize + bLen);
      // Bottom-Left
      ctx.moveTo(reticleX - bSize, reticleY + bSize - bLen);
      ctx.lineTo(reticleX - bSize, reticleY + bSize);
      ctx.lineTo(reticleX - bSize + bLen, reticleY + bSize);
      // Bottom-Right
      ctx.moveTo(reticleX + bSize - bLen, reticleY + bSize);
      ctx.lineTo(reticleX + bSize, reticleY + bSize);
      ctx.lineTo(reticleX + bSize, reticleY + bSize - bLen);
      ctx.stroke();

      // Center crosshair ring
      ctx.strokeStyle = "rgba(217, 138, 61, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(reticleX, reticleY, 13, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = activeColor;
      ctx.beginPath();
      ctx.arc(reticleX, reticleY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto max-h-[480px] drop-shadow-[0_20px_40px_rgba(26,26,26,0.08)]"
        style={{ aspectRatio: "1000 / 500" }}
      />
    </div>
  );
}

/* ========================================================================== */
/* EDITORIAL INFORMATION PANEL (CLEAN, AUTHENTIC, 2-3 SEC READABILITY)        */
/* ========================================================================== */
interface TelemetryReadoutProps {
  stage: EngineeringStage;
}

function TelemetryReadout({ stage }: TelemetryReadoutProps) {
  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative rounded-xl border border-charcoal/10 bg-white/95 p-5 sm:p-6 backdrop-blur-md shadow-[0_12px_32px_rgba(26,26,26,0.06)]"
        >
          {/* Stage Index & Formulation Highlight Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-charcoal/10 pb-3">
            <div className="flex items-center gap-2">
              <span
                className="flex h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: stage.accentColor }}
              />
              <span className="font-mono text-xs font-semibold tracking-wider text-charcoal">
                STAGE {stage.index} // {stage.tag}
              </span>
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-oil-gold border border-oil-gold/30 bg-oil-gold/10 px-2.5 py-0.5 rounded-full font-semibold">
              {stage.highlight}
            </span>
          </div>

          {/* Hero Headline & Editorial Explanation */}
          <div className="mt-4">
            <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-charcoal leading-snug">
              {stage.title}
            </h3>
            <p className="mt-1 font-mono text-xs font-medium text-oil-gold">
              {stage.subtitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-charcoal-light/80">
              {stage.description}
            </p>
          </div>

          {/* Environment Status Tag */}
          <div className="mt-4 pt-3 border-t border-charcoal/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-charcoal-light/60">
            <span className="text-[10px] uppercase tracking-wider text-charcoal-light/50">
              ACTIVE ENVIRONMENT:
            </span>
            <span className="text-charcoal font-medium text-[11px]">
              {stage.zoneName}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ========================================================================== */
/* INTERACTIVE STAGE SCRUBBER BAR                                             */
/* ========================================================================== */
interface ScrubberProps {
  stages: EngineeringStage[];
  activeStageIndex: number;
  onSelectStage: (index: number) => void;
  progressPercent: number;
}

function StageScrubber({
  stages,
  activeStageIndex,
  onSelectStage,
  progressPercent,
}: ScrubberProps) {
  return (
    <div className="w-full mt-4">
      {/* Progress Track */}
      <div className="relative h-1.5 w-full rounded-full bg-charcoal/10 overflow-hidden mb-3">
        <motion.div
          className="absolute top-0 bottom-0 left-0 bg-oil-gold rounded-full"
          style={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.15, ease: "linear" }}
        />
      </div>

      {/* Stage Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stages.map((stage, idx) => {
          const isActive = idx === activeStageIndex;
          const isPassed = idx <= activeStageIndex;

          return (
            <button
              key={stage.id}
              onClick={() => onSelectStage(idx)}
              className={`group flex flex-col items-start p-2.5 rounded-lg text-left transition-all duration-200 border cursor-pointer ${
                isActive
                  ? "bg-charcoal text-offwhite border-charcoal shadow-sm"
                  : "bg-white/70 text-charcoal border-charcoal/10 hover:border-oil-gold/40 hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-1.5 w-full justify-between">
                <span
                  className={`font-mono text-[10px] ${
                    isActive ? "text-oil-gold-light font-bold" : "text-charcoal-light/50"
                  }`}
                >
                  0{idx + 1}
                </span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive
                      ? "bg-oil-gold"
                      : isPassed
                      ? "bg-oil-gold/50"
                      : "bg-charcoal/20"
                  }`}
                />
              </div>
              <span
                className={`text-[11px] font-semibold mt-1 truncate w-full ${
                  isActive ? "text-offwhite" : "text-charcoal"
                }`}
              >
                {stage.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ========================================================================== */
/* MAIN WHY KENZOIL SECTION                                                   */
/* ========================================================================== */
export default function WhyKenzoil() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isManualOverride, setIsManualOverride] = useState(false);

  // Scroll tracking across the pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const [fluidProgress, setFluidProgress] = useState(25);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (isManualOverride) return;

      // Map progress 0..1 to percentage 25..100
      const pct = Math.min(100, Math.max(25, latest * 100));
      setFluidProgress(pct);

      // Determine active stage based on scroll depth
      if (latest < 0.25) {
        setActiveStageIndex(0);
      } else if (latest < 0.5) {
        setActiveStageIndex(1);
      } else if (latest < 0.75) {
        setActiveStageIndex(2);
      } else {
        setActiveStageIndex(3);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, isManualOverride]);

  // Click on stage scrubber to navigate
  const handleSelectStage = useCallback((index: number) => {
    setIsManualOverride(true);
    setActiveStageIndex(index);
    const targetPct = ENGINEERING_STAGES[index].fluidProgressPct;
    setFluidProgress(targetPct);

    // Smoothly scroll to the corresponding section depth if on desktop
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (totalHeight > 0) {
        const targetScrollY = containerTop + (index / 3) * totalHeight;
        window.scrollTo({ top: targetScrollY, behavior: "smooth" });
      }
    }

    setTimeout(() => {
      setIsManualOverride(false);
    }, 1400);
  }, []);

  return (
    <section
      id="why-kenzoil"
      ref={containerRef}
      className="relative w-full bg-background"
    >
      {/* 
        Scroll Track: 
        Desktop uses 300vh for a rich, controlled scroll story;
        Mobile uses natural flow without clipping.
      */}
      <div className="relative min-h-auto lg:min-h-[300vh] w-full">
        {/* Sticky Pinned Viewport Container */}
        <div className="relative lg:sticky lg:top-0 w-full min-h-auto lg:min-h-screen flex flex-col justify-between py-6 sm:py-8 lg:py-12 lg:overflow-hidden">
          {/* SECTION HEADER & EDITORIAL INTRO */}
          <Container className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 pb-3 sm:pb-4 border-b border-charcoal/10">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-oil-gold font-medium">
                  WHY KENZOIL
                </span>
                <h2 className="mt-1 font-serif text-2xl font-normal tracking-tight text-charcoal sm:text-4xl md:text-5xl leading-[1.08]">
                  Engineered to Perform.
                </h2>
              </div>
              <p className="max-w-md text-xs sm:text-sm md:text-base text-charcoal-light/80 leading-relaxed">
                Lubrication solutions engineered to preserve mechanical interfaces, sustain laminar pressure, and perform under severe operational loads.
              </p>
            </div>
          </Container>

          {/* MAIN INTERACTIVE COCKPIT / CONSOLE (SIDE-BY-SIDE ON DESKTOP) */}
          <Container className="relative z-10 my-auto py-3 sm:py-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
              {/* Left Column (5 Cols): Telemetry HUD & Stage Scrubber */}
              <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
                <TelemetryReadout stage={ENGINEERING_STAGES[activeStageIndex]} />
                <StageScrubber
                  stages={ENGINEERING_STAGES}
                  activeStageIndex={activeStageIndex}
                  onSelectStage={handleSelectStage}
                  progressPercent={fluidProgress}
                />
              </div>

              {/* Right Column (7 Cols): The Industrial Pipeline Visual Canvas */}
              <div className="lg:col-span-7 order-1 lg:order-2 flex items-center justify-center">
                <IndustrialPipelineVisual
                  activeStageIndex={activeStageIndex}
                  progressPercent={fluidProgress}
                />
              </div>
            </div>
          </Container>

          {/* BOTTOM TELEMETRY STATUS BAR */}
          <Container className="relative z-10 pt-3 border-t border-charcoal/5 hidden lg:block">
            <div className="flex items-center justify-between text-[11px] font-mono text-charcoal-light/50">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-oil-gold animate-pulse" />
                HYDRODYNAMIC TELEMETRY ACTIVE
              </span>
              <span>SCROLL OR SELECT STAGES TO ADVANCE FLOW</span>
              <span>KENZOIL INDUSTRIAL FORMULATION SYSTEM</span>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
