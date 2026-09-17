"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/Container";
import KenzoilLogo from "@/components/KenzoilLogo";
import { siteInfo } from "@/lib/site";

/* ========================================================================== */
/* 4 CORE PRINCIPLES WITH SCIENTIFIC TELEMETRY                                */
/* ========================================================================== */
interface Principle {
  id: string;
  title: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    id: "precision",
    title: "Precision Viscosity Matching",
    description:
      "Formulated to match precise clearances, speeds, and shear rates under operational load.",
  },
  {
    id: "boundary-defense",
    title: "Boundary Layer Protection",
    description:
      "Polar anti-wear compounds anchor to metallic asperities to eliminate surface contact.",
  },
  {
    id: "thermal-endurance",
    title: "Thermal Shear Endurance",
    description:
      "High-viscosity-index base stocks resist oxidation, thermal thinning, and oil breakdown.",
  },
  {
    id: "repeatability",
    title: "Batch Repeatability & Purity",
    description:
      "Audited blending processes guarantee consistent viscosity and performance across every batch.",
  },
];

/* ========================================================================== */
/* REAL-WORLD APPLICATION SECTORS (ALL GROUNDED IN ACTUAL PRODUCTS)           */
/* ========================================================================== */
interface ProtectedEnvironment {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  operatingEnvironment: string;
  formulations: string[];
  ambientColor: string;
  badge: string;
}

const PROTECTED_ENVIRONMENTS: ProtectedEnvironment[] = [
  {
    id: "heavy-transport",
    title: "Heavy Transport & Fleets",
    category: "Commercial Road & Heavy Haulage",
    subtitle: "High-output turbo diesel powertrains, multi-axle drivelines & heavy transport.",
    description:
      "Engineered for high-torque turbo diesel engines, multi-axle haulers, and severe continuous transport operating across high ambient dust and temperature gradients.",
    operatingEnvironment: "Severe thermal oxidation, high soot loading & 100,000+ km drain intervals",
    formulations: ["CF-4 15W-40 Super Fleet", "Super MG 20W-50", "Transfluid A Driveline", "Heavy Duty Coolant"],
    ambientColor: "#F59E0B",
    badge: "HEAVY TRANSPORT",
  },
  {
    id: "industrial-hydraulics",
    title: "Industrial Hydraulics & Plant Machinery",
    category: "Severe-Duty Hydraulic & Gear Systems",
    subtitle: "Severe-duty pumps, proportional valves & high-tonnage stamping presses.",
    description:
      "Formulated with balanced anti-wear zinc chemistry and shear-stable polymers to eliminate cavitation, resist continuous 350+ bar shock loads, and protect critical proportional valves.",
    operatingEnvironment: "350+ bar operating pressure, continuous shear & rapid thermal shock",
    formulations: ["Hydraulic AW 32 / 46 / 68", "EP Industrial Gear Oils", "Circulating Oils", "Vacuum Compressor Oils"],
    ambientColor: "#0284C7",
    badge: "INDUSTRIAL HYDRAULICS",
  },
  {
    id: "textile-machinery",
    title: "High-Speed Textile Machinery",
    category: "Precision High-RPM Spindles & Looms",
    subtitle: "High-RPM ring spinning frames, modern looms & knitting assemblies.",
    description:
      "Ultra-pure, transparent lubricant matrices engineered for high-RPM ring spinning spindles and precision looms. Delivers near-zero drag, instant heat dissipation, and zero staining on processed fabric.",
    operatingEnvironment: "15,000–25,000 RPM continuous velocity & zero-stain fabric tolerance",
    formulations: ["Kenzoil Spin Oil 12 / 22", "Anti-Wear Looms Oils", "High-Speed Knitting Fluids"],
    ambientColor: "#10B981",
    badge: "TEXTILE MACHINERY",
  },
  {
    id: "metal-machining",
    title: "Metalworking & Machining",
    category: "CNC Milling, Broaching & Extreme Forming",
    subtitle: "CNC milling, broaching, tapping, turning & heavy metal forming operations.",
    description:
      "Extreme-pressure micro-emulsions and neat cutting oils designed to flood the tool-workpiece interface, eliminate tool welding under high feed rates, and deliver fine surface finishes.",
    operatingEnvironment: "Flash shear contact temperatures (~800°C) & high-velocity chip removal",
    formulations: ["Soluble Cutting Fluids", "Neat Cutting Oils", "Industrial Rust Preventatives"],
    ambientColor: "#E11D48",
    badge: "METALWORKING",
  },
  {
    id: "thermal-electrical",
    title: "Thermal & Electrical Systems",
    category: "Dielectric Insulation & Heat Transfer Boilers",
    subtitle: "Heat transfer thermic boilers, high-voltage transformers & switchgear.",
    description:
      "High thermal stability thermic heat transfer fluids with low vapor pressure, paired with high-dielectric-strength transformer insulating fluids engineered for power distribution systems.",
    operatingEnvironment: "Bulk fluid temperatures up to 320°C & 50+ kV/cm dielectric breakdown barrier",
    formulations: ["Thermic Fluid 32", "Transformer Insulating Oil", "Rubber Process Oils"],
    ambientColor: "#8B5CF6",
    badge: "THERMAL & ELECTRICAL",
  },
];

/* ========================================================================== */
/* MACRO HYDRODYNAMIC BOUNDARY VISUALIZATION COMPONENT                        */
/* ========================================================================== */
function MacroHydrodynamicVisual({
  activePrinciple,
}: {
  activePrinciple: Principle;
}) {
  const prefersReducedMotion = useReducedMotion();
  const idPrefix = useId().replace(/:/g, "_");

  return (
    <div className="relative w-full rounded-sm border border-offwhite/10 bg-charcoal/80 p-5 sm:p-7 md:p-9 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(217, 138, 61, 0.6) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(2, 132, 199, 0.6) 0%, transparent 70%)",
        }}
      />

      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-offwhite/10 pb-3 text-xs font-mono text-offwhite/60">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-oil-gold" />
          <span>Hydrodynamic Film Boundary</span>
        </span>
        <span className="text-oil-gold/80 font-medium">Molecular Fluid Separation</span>
      </div>

      {/* SCIENTIFIC METALLIC SURFACE & AMBER FLUID CROSS-SECTION */}
      <div className="relative my-6 h-64 sm:h-72 w-full rounded-sm border border-offwhite/10 bg-[#07080B] flex flex-col justify-between overflow-hidden">
        {/* Subtle engineering grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* TOP METALLIC SURFACE (SLIDING RIGHT) */}
        <div className="relative w-full h-20 sm:h-22 bg-gradient-to-b from-[#2A2E36] via-[#1E222A] to-[#12151B] border-b border-offwhite/20 shadow-md flex flex-col justify-end overflow-hidden">
          {/* Metallic brushed lines moving right */}
          <motion.div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(255,255,255,0.15) 13px, transparent 14px)",
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    x: [0, 60],
                  }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Micro-asperity peaks on metal edge */}
          <svg
            viewBox="0 0 1000 12"
            className="w-full h-3 text-offwhite/20 fill-current"
            preserveAspectRatio="none"
          >
            <path d="M 0,0 L 0,10 Q 50,4 100,10 T 200,8 T 300,11 T 400,7 T 500,10 T 600,8 T 700,10 T 800,7 T 900,9 T 1000,10 L 1000,0 Z" />
          </svg>

          <div className="absolute top-2.5 left-4 text-[11px] font-mono tracking-wider text-offwhite/75 font-medium">
            Upper Metal Surface
          </div>
        </div>

        {/* THE HYDRODYNAMIC AMBER LUBRICANT FILM (HERO FLUID BARRIER) */}
        <div className="relative w-full h-24 sm:h-28 flex items-center justify-center overflow-hidden">
          {/* Fluid glow backdrop */}
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "linear-gradient(90deg, rgba(217,138,61,0.15) 0%, rgba(245,158,11,0.35) 50%, rgba(217,138,61,0.15) 100%)",
            }}
          />

          {/* Laminar Fluid Shear Lines */}
          <svg
            viewBox="0 0 1000 80"
            className="absolute inset-0 w-full h-full stroke-current"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`${idPrefix}-fluid-flow`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#EA580C" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Multiple shear streamline layers */}
            {[20, 35, 50, 65].map((y, idx) => (
              <motion.path
                key={idx}
                d={`M 0,${y} Q 250,${y - 4} 500,${y + 2} T 1000,${y}`}
                stroke={`url(#${idPrefix}-fluid-flow)`}
                strokeWidth={idx === 2 ? "2" : "1.2"}
                strokeDasharray="16 8"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        strokeDashoffset: [0, -96],
                      }
                }
                transition={{
                  duration: 1.8 + idx * 0.4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </svg>

          {/* Polar Anti-Wear Molecular Nodes (Floating in shear) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-around px-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_8px_#F59E0B]"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        x: [0, 20, 0],
                        y: [(i % 2 === 0 ? -4 : 4), (i % 2 === 0 ? 4 : -4), (i % 2 === 0 ? -4 : 4)],
                        opacity: [0.6, 1, 0.6],
                      }
                }
                transition={{
                  duration: 2.5 + (i % 3) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Central Callout Tag */}
          <div className="relative z-10 px-3.5 py-1.5 rounded-full border border-oil-gold/40 bg-[#0A0C0F]/90 backdrop-blur-md shadow-lg text-[10px] sm:text-[11px] font-mono tracking-wider text-oil-gold-light flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>UNBROKEN HYDRODYNAMIC FILM • ZERO METAL CONTACT</span>
          </div>
        </div>

        {/* BOTTOM METALLIC SURFACE (SLIDING LEFT) */}
        <div className="relative w-full h-20 sm:h-22 bg-gradient-to-t from-[#2A2E36] via-[#1E222A] to-[#12151B] border-t border-offwhite/20 shadow-md flex flex-col justify-start overflow-hidden">
          {/* Micro-asperity peaks on metal edge */}
          <svg
            viewBox="0 0 1000 12"
            className="w-full h-3 text-offwhite/20 fill-current"
            preserveAspectRatio="none"
          >
            <path d="M 0,12 L 0,2 Q 50,8 100,2 T 200,4 T 300,1 T 400,5 T 500,2 T 600,4 T 700,2 T 800,5 T 900,3 T 1000,2 L 1000,12 Z" />
          </svg>

          {/* Metallic brushed lines moving left */}
          <motion.div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(255,255,255,0.15) 13px, transparent 14px)",
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    x: [0, -60],
                  }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="absolute bottom-2.5 left-4 text-[11px] font-mono tracking-wider text-offwhite/75 font-medium">
            Lower Metal Surface
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* HERO INDUSTRIAL ENVIRONMENT VISUAL COMPONENT                               */
/* ========================================================================== */
function HeroEnvironmentVisual({
  environment,
}: {
  environment: ProtectedEnvironment;
}) {
  const prefersReducedMotion = useReducedMotion();
  const id = useId().replace(/:/g, "_");

  return (
    <div className="relative w-full rounded-sm border border-offwhite/15 bg-charcoal/90 p-5 sm:p-7 md:p-8 backdrop-blur-md overflow-hidden shadow-2xl min-h-[460px] sm:min-h-[500px] flex flex-col justify-between">
      {/* Dynamic ambient atmospheric lighting reacting to active environment */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-25"
        style={{
          background: `radial-gradient(circle, ${environment.ambientColor} 0%, transparent 70%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-15"
        style={{
          background: `radial-gradient(circle, ${environment.ambientColor} 0%, transparent 70%)`,
        }}
      />

      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Canvas Top Bar: Category badge & Active Environment indicator */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-offwhite/10 pb-4">
        <div className="flex items-center gap-2.5">
          <span
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ backgroundColor: environment.ambientColor }}
          />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-offwhite">
            {environment.title}
          </span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-oil-gold font-medium">
          {environment.category}
        </span>
      </div>

      {/* Canvas Center: Authentic Industrial Machinery Schematic SVG */}
      <div className="relative z-10 my-6 h-56 sm:h-64 w-full flex items-center justify-center rounded-sm border border-offwhite/10 bg-[#07080B]/90 overflow-hidden">
        {environment.id === "heavy-transport" && (
          /* Heavy Transport: Piston-Cylinder Combustion & Hydrodynamic Skirt Film */
          <svg
            viewBox="0 0 500 240"
            className="w-full h-full p-4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`${id}-combustion`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EA580C" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </linearGradient>
              <linearGradient id={`${id}-oilfilm`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Cylinder Wall Bore (Left & Right) */}
            <rect x="70" y="20" width="30" height="200" fill="#181B22" stroke="#333A48" strokeWidth="2" />
            <rect x="400" y="20" width="30" height="200" fill="#181B22" stroke="#333A48" strokeWidth="2" />

            {/* Cylinder Wall Honing Hatch Lines */}
            <path d="M 70 40 L 100 70 M 70 80 L 100 110 M 70 120 L 100 150 M 70 160 L 100 190" stroke="#444C5E" strokeWidth="1" />
            <path d="M 400 40 L 430 70 M 400 80 L 430 110 M 400 120 L 430 150 M 400 160 L 430 190" stroke="#444C5E" strokeWidth="1" />

            {/* Hydrodynamic Oil Film along Cylinder Walls */}
            <rect x="100" y="20" width="6" height="200" fill={`url(#${id}-oilfilm)`} />
            <rect x="394" y="20" width="6" height="200" fill={`url(#${id}-oilfilm)`} />

            {/* Combustion Glow Top Chamber */}
            <rect x="106" y="20" width="288" height="40" fill={`url(#${id}-combustion)`} />

            {/* Piston Body (Reciprocating Stroke) */}
            <motion.g
              animate={prefersReducedMotion ? undefined : { y: [0, 24, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Piston Crown */}
              <rect x="110" y="60" width="280" height="110" rx="3" fill="#232833" stroke="#5A6478" strokeWidth="2" />
              {/* Piston Compression Rings */}
              <rect x="108" y="70" width="284" height="4" fill="#94A3B8" />
              <rect x="108" y="80" width="284" height="4" fill="#94A3B8" />
              <rect x="108" y="90" width="284" height="6" fill="#F59E0B" />
              {/* Piston Skirt Recesses */}
              <rect x="130" y="110" width="40" height="50" rx="2" fill="#15181F" />
              <rect x="330" y="110" width="40" height="50" rx="2" fill="#15181F" />
              {/* Wrist Pin */}
              <circle cx="250" cy="125" r="22" fill="#3B4252" stroke="#717D96" strokeWidth="2" />
              <circle cx="250" cy="125" r="10" fill="#1A1D24" />
              {/* Connecting Rod Top */}
              <path d="M 238 145 L 230 230 L 270 230 L 262 145 Z" fill="#2E3440" stroke="#4C566A" strokeWidth="1.5" />
            </motion.g>

            {/* Label overlays */}
            <text x="250" y="44" textAnchor="middle" fill="#F59E0B" fontSize="10" fontFamily="monospace" fontWeight="bold">
              COMBUSTION CHAMBER • FLASH TEMP 240°C
            </text>
            <text x="250" y="210" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
              HYDRODYNAMIC OIL FILM THICKNESS: 2.8 µm
            </text>
          </svg>
        )}

        {environment.id === "industrial-hydraulics" && (
          /* Industrial Hydraulics: Spool Valve & Dual-Acting High-Pressure Cylinder */
          <svg
            viewBox="0 0 500 240"
            className="w-full h-full p-4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Valve Body Casing */}
            <rect x="60" y="40" width="380" height="150" rx="4" fill="#13171F" stroke="#2A3342" strokeWidth="2" />

            {/* Port Channels */}
            <rect x="120" y="20" width="26" height="25" fill="#0284C7" />
            <text x="133" y="16" textAnchor="middle" fill="#38BDF8" fontSize="9" fontFamily="monospace">P (350b)</text>

            <rect x="237" y="20" width="26" height="25" fill="#1E293B" />
            <text x="250" y="16" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="monospace">T (Tank)</text>

            <rect x="354" y="20" width="26" height="25" fill="#0284C7" />
            <text x="367" y="16" textAnchor="middle" fill="#38BDF8" fontSize="9" fontFamily="monospace">A (Cyl)</text>

            {/* Bore Sleeve */}
            <rect x="80" y="75" width="340" height="80" fill="#0A0E14" stroke="#1E293B" strokeWidth="1.5" />

            {/* Moving Hydraulic Spool Lands */}
            <motion.g
              animate={prefersReducedMotion ? undefined : { x: [-15, 15, -15] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Spool Shaft */}
              <rect x="60" y="108" width="380" height="14" fill="#475569" />
              {/* Land 1 */}
              <rect x="110" y="80" width="45" height="70" rx="2" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
              {/* Land 2 */}
              <rect x="227" y="80" width="45" height="70" rx="2" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
              {/* Land 3 */}
              <rect x="345" y="80" width="45" height="70" rx="2" fill="#334155" stroke="#64748B" strokeWidth="1.5" />

              {/* Anti-Wear Boundary Film Line on Spool Lands */}
              <rect x="110" y="77" width="45" height="3" fill="#F59E0B" />
              <rect x="110" y="150" width="45" height="3" fill="#F59E0B" />
              <rect x="227" y="77" width="45" height="3" fill="#F59E0B" />
              <rect x="227" y="150" width="45" height="3" fill="#F59E0B" />
            </motion.g>

            {/* High Pressure Fluid Flow Stream Vector */}
            <motion.path
              d="M 133 45 L 133 115 Q 180 135 235 115"
              stroke="#38BDF8"
              strokeWidth="3"
              strokeDasharray="6 4"
              animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, -40] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />

            {/* Telemetry Annotation */}
            <text x="250" y="215" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">
              350+ BAR HYDRODYNAMIC CAVITATION BARRIER • ZERO SHEAR BREAKDOWN
            </text>
          </svg>
        )}

        {environment.id === "textile-machinery" && (
          /* Textile: High-Speed Spindle & Low-Drag Zero-Stain Lubrication */
          <svg
            viewBox="0 0 500 240"
            className="w-full h-full p-4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Center Spindle Shaft */}
            <rect x="238" y="15" width="24" height="210" fill="#334155" stroke="#64748B" strokeWidth="2" />
            <line x1="250" y1="15" x2="250" y2="225" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Spindle Bearings */}
            <rect x="190" y="55" width="120" height="40" rx="3" fill="#131B26" stroke="#253549" strokeWidth="1.5" />
            <rect x="190" y="145" width="120" height="40" rx="3" fill="#131B26" stroke="#253549" strokeWidth="1.5" />

            {/* Ball Bearing Array */}
            <circle cx="215" cy="75" r="10" fill="#94A3B8" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="285" cy="75" r="10" fill="#94A3B8" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="215" cy="165" r="10" fill="#94A3B8" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="285" cy="165" r="10" fill="#94A3B8" stroke="#E2E8F0" strokeWidth="1.5" />

            {/* Rotating Concentric Streamlines */}
            <motion.ellipse
              cx="250"
              cy="75"
              rx="60"
              ry="16"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="12 8"
              animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, 80] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.ellipse
              cx="250"
              cy="165"
              rx="60"
              ry="16"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="12 8"
              animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, 80] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />

            {/* Telemetry Text */}
            <text x="250" y="36" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">
              22,000 RPM CONTINUOUS VELOCITY • ULTRA-LOW DRAG
            </text>
            <text x="250" y="215" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
              ZERO-STAIN PURITY • RAPID HEAT DISSIPATION
            </text>
          </svg>
        )}

        {environment.id === "metal-machining" && (
          /* Metalworking: Tool Insert, Chip Formation & Flood Coolant Interface */
          <svg
            viewBox="0 0 500 240"
            className="w-full h-full p-4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Moving Workpiece */}
            <rect x="40" y="110" width="420" height="90" fill="#1E2430" stroke="#374151" strokeWidth="2" />
            <line x1="40" y1="130" x2="460" y2="130" stroke="#4B5563" strokeDasharray="6 6" />

            {/* Carbide Cutting Insert */}
            <polygon points="280,30 350,30 290,110 230,110" fill="#D97706" stroke="#FBBF24" strokeWidth="2" />
            <text x="285" y="65" textAnchor="middle" fill="#1F2937" fontSize="9" fontWeight="bold" fontFamily="monospace">
              CARBIDE
            </text>

            {/* Metal Chip Shearing Away */}
            <motion.path
              d="M 230 110 Q 200 80 205 45 Q 185 20 160 35"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="6"
              strokeLinecap="round"
              animate={prefersReducedMotion ? undefined : { pathLength: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Flood Coolant Jet Stream */}
            <motion.path
              d="M 150 50 Q 200 70 232 108"
              stroke="#F43F5E"
              strokeWidth="4"
              strokeDasharray="8 4"
              animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, -48] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />

            {/* Tool-Workpiece Flash Contact Point */}
            <circle cx="230" cy="110" r="5" fill="#EF4444" />
            <circle cx="230" cy="110" r="10" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 3" />

            {/* Boundary Film Shield Layer */}
            <line x1="40" y1="108" x2="230" y2="108" stroke="#F59E0B" strokeWidth="3" />

            {/* Telemetry Text */}
            <text x="250" y="22" textAnchor="middle" fill="#F43F5E" fontSize="10" fontFamily="monospace" fontWeight="bold">
              FLASH CONTACT ZONE: ~800°C • EXTREME-PRESSURE ANTI-WELD
            </text>
            <text x="250" y="220" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
              MICRO-EMULSION COOLING • RA 0.4 µm SURFACE FINISH
            </text>
          </svg>
        )}

        {environment.id === "thermal-electrical" && (
          /* Thermal & Electrical: Thermic Boiler Coil & High-Voltage Dielectric Barrier */
          <svg
            viewBox="0 0 500 240"
            className="w-full h-full p-4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Heat Exchanger Multi-Pass Coil Tubes */}
            <rect x="70" y="35" width="360" height="150" rx="6" fill="#111827" stroke="#2B3648" strokeWidth="2" />

            {/* Heat Transfer Oil Serpentine Pipe */}
            <path
              d="M 90 70 L 410 70 Q 430 70 430 95 Q 430 120 410 120 L 90 120 Q 70 120 70 145 Q 70 170 90 170 L 410 170"
              stroke="#8B5CF6"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* Flowing Hot Oil Pulse */}
            <motion.path
              d="M 90 70 L 410 70 Q 430 70 430 95 Q 430 120 410 120 L 90 120 Q 70 120 70 145 Q 70 170 90 170 L 410 170"
              stroke="#F59E0B"
              strokeWidth="5"
              strokeDasharray="14 10"
              fill="none"
              animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, -120] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            />

            {/* High Voltage Dielectric Isolation Core */}
            <rect x="210" y="45" width="80" height="130" rx="3" fill="#1E1B4B" stroke="#A78BFA" strokeWidth="1.5" />
            <text x="250" y="105" textAnchor="middle" fill="#C4B5FD" fontSize="10" fontFamily="monospace" fontWeight="bold">
              DIELECTRIC
            </text>
            <text x="250" y="125" textAnchor="middle" fill="#A78BFA" fontSize="10" fontFamily="monospace">
              &gt; 55 kV/cm
            </text>

            {/* Telemetry Text */}
            <text x="250" y="24" textAnchor="middle" fill="#A78BFA" fontSize="10" fontFamily="monospace" fontWeight="bold">
              320°C CONTINUOUS THERMIC BULK STABILITY • ZERO CRACKING
            </text>
            <text x="250" y="215" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
              HIGH OXIDATION INHIBITION • TRANSFORMER GRADE PURITY
            </text>
          </svg>
        )}
      </div>

      {/* Canvas Bottom Bar: Key Formulations & Condition Specs */}
      <div className="relative z-10 pt-4 border-t border-offwhite/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="text-offwhite/70">
          <span className="text-oil-gold font-semibold">FORMULATIONS: </span>
          <span>{environment.formulations.join(" • ")}</span>
        </div>
        <span className="text-offwhite/50 text-[11px] whitespace-nowrap">
          {environment.operatingEnvironment}
        </span>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* MAIN "ABOUT KENZOIL" MASTER COMPONENT                                      */
/* ========================================================================== */
export default function AboutKenzoil() {
  const [activePrincipleIndex, setActivePrincipleIndex] = useState(0);
  const activePrinciple = PRINCIPLES[activePrincipleIndex];
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const activeSector = PROTECTED_ENVIRONMENTS[activeSectorIndex];

  return (
    <div id="about-kenzoil" className="relative w-full bg-[#0A0C0F] text-offwhite overflow-hidden">
      {/* ================================================================== */}
      {/* 01. AMBIENT BRIDGE CONNECTING FROM CINEMATIC LOGO REVEAL           */}
      {/* ================================================================== */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(217, 138, 61, 0.15) 0%, rgba(2, 132, 199, 0.1) 40%, transparent 80%)",
        }}
      />

      {/* ================================================================== */}
      {/* 02. CHAPTER 1: BRAND MANIFESTO HERO                                */}
      {/* ================================================================== */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 border-b border-offwhite/10">
        <Container>
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-oil-gold/30 bg-oil-gold/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-oil-gold-light mb-6 sm:mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-oil-gold animate-pulse" />
            ABOUT KENZOIL
          </div>

          {/* Giant Editorial Manifesto Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.02] uppercase text-offwhite max-w-5xl">
            Engineered For
            <br />
            The Machines That
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-oil-gold via-amber-300 to-sky-400">
              Cannot Afford To Stop.
            </span>
          </h2>

          {/* Sub-Manifesto & Narrative Lead */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <p className="lg:col-span-7 text-lg sm:text-xl md:text-2xl text-offwhite/80 leading-relaxed font-normal">
              Industrial machinery does not stop because the shift ends. It stops
              when friction, thermal oxidation, and molecular wear win. We engineer
              the physical and chemical barrier that guarantees they do not.
            </p>

            <div className="lg:col-span-5 flex flex-col gap-2 text-xs font-mono text-offwhite/50 border-l border-offwhite/15 pl-5 sm:pl-6">
              <span className="text-oil-gold uppercase tracking-wider font-semibold">
                CORE OPERATIONAL IMPERATIVE
              </span>
              <span>LUBRICANTS • GREASES • SPECIALTY FLUIDS</span>
              <span>MANUFACTURED IN G.I.D.C. PANOLI, GUJARAT</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* 03. THE CORE PURPOSE: EDITORIAL BRAND MANIFESTO                    */}
      {/* ================================================================== */}
      <section className="relative py-24 md:py-32 border-b border-offwhite/10 bg-gradient-to-b from-transparent via-charcoal/20 to-transparent">
        <Container>
          <div className="max-w-5xl">
            {/* Primary Section Title with Editorial Importance */}
            <div className="flex items-center gap-4 mb-6">
              <span className="h-0.5 w-12 sm:w-16 bg-oil-gold" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-[0.25em] text-oil-gold">
                The Core Purpose
              </h2>
            </div>

            {/* Dominant Statement (Primary visual weight) */}
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] text-offwhite uppercase">
              Lubrication is not an afterthought.
            </h3>

            {/* Supporting Statement (Secondary visual weight) */}
            <p className="mt-5 text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-offwhite/75 leading-snug">
              It is the active lifeline of heavy industrial motion.
            </p>

            {/* Concise Supporting Copy: 2 clean editorial paragraphs */}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-offwhite/10 grid grid-cols-1 md:grid-cols-2 gap-8 text-base sm:text-lg text-offwhite/75 leading-relaxed font-normal">
              <p>
                At Kenzoil, lubricants are engineered as precision machinery elements. Formulated from premium Group II and III base stocks with targeted extreme-pressure additives, each fluid establishes an unbroken hydrodynamic barrier that isolates metal surfaces under intense shear.
              </p>
              <p>
                Synthesized at our dedicated blending and laboratory infrastructure in Panoli and Ankleshwar, our formulations stabilize thermal surges, prevent premature abrasive wear, and protect heavy industrial capital through continuous, non-stop operation.
              </p>
            </div>

            {/* Quiet, elegant facility note */}
            <div className="mt-8 flex items-center gap-3 text-xs font-mono text-offwhite/50">
              <span className="h-1.5 w-1.5 rounded-full bg-oil-gold" />
              <span>Panoli G.I.D.C. Blending Facility • Ankleshwar Commercial HQ • Gujarat, India</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* 04. CHAPTER 3: THE KENZOIL APPROACH & MACRO BOUNDARY VISUALIZATION */}
      {/* ================================================================== */}
      <section className="relative py-20 md:py-28 border-b border-offwhite/10">
        <Container>
          {/* Section Header */}
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-oil-gold">
              THE KENZOIL APPROACH
            </span>
            <h3 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-offwhite">
              What Happens Between Moving Surfaces.
            </h3>
            <p className="mt-4 text-sm sm:text-base text-offwhite/70 leading-relaxed">
              When two precision-machined metal components slide against each other under
              massive pressure, our lubricant film maintains an unbroken hydrodynamic barrier.
              Explore our four formulation pillars below:
            </p>
          </div>

          {/* Interactive Scientific Visual & Principle Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Principle Scrubbing Tabs (Visually stable, NO hover animations) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {PRINCIPLES.map((p, idx) => {
                const isActive = idx === activePrincipleIndex;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePrincipleIndex(idx)}
                    className={`text-left p-4 sm:p-5 rounded-sm border cursor-pointer select-none ${
                      isActive
                        ? "border-oil-gold bg-charcoal/90"
                        : "border-offwhite/10 bg-charcoal/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-base sm:text-lg font-semibold tracking-tight ${
                          isActive ? "text-offwhite" : "text-offwhite/80"
                        }`}
                      >
                        {p.title}
                      </h4>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-oil-gold" />
                      )}
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm text-offwhite/65 leading-relaxed">
                      {p.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right 7 Cols: The Scientific Macro Visual */}
            <div className="lg:col-span-7">
              <MacroHydrodynamicVisual activePrinciple={activePrinciple} />
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* 05. WHERE KENZOIL PROTECTS: HERO INDUSTRIAL VISUAL SYSTEM          */}
      {/* ================================================================== */}
      <section id="where-kenzoil-protects" className="relative py-24 md:py-32 border-b border-offwhite/10 bg-gradient-to-b from-transparent via-[#0B0E14]/60 to-transparent">
        <Container>
          {/* Section Editorial Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-0.5 w-8 bg-oil-gold" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-oil-gold font-semibold">
                OPERATIONAL REALMS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-offwhite leading-[1.04]">
              Where Kenzoil Protects
            </h2>
            <p className="mt-4 text-base sm:text-lg text-offwhite/75 leading-relaxed">
              From high-torque freight powertrains to high-speed textile spindles, Kenzoil fluids maintain unbroken hydrodynamic separation across demanding operating environments.
            </p>
          </div>

          {/* Mobile Category Tab Selector */}
          <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-none">
            {PROTECTED_ENVIRONMENTS.map((item, idx) => {
              const isSelected = activeSectorIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSectorIndex(idx)}
                  className={`px-3.5 py-2 rounded-xs text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-oil-gold text-charcoal font-bold shadow-md"
                      : "border border-offwhite/10 bg-charcoal/40 text-offwhite/60 hover:text-offwhite"
                  }`}
                >
                  {item.badge}
                </button>
              );
            })}
          </div>

          {/* Desktop & Tablet: Interactive Application List & Hero Visual Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 5 Columns: Interactive Application Items (Hover & Click Supported) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {PROTECTED_ENVIRONMENTS.map((item, idx) => {
                const isHovered = activeSectorIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActiveSectorIndex(idx)}
                    onFocus={() => setActiveSectorIndex(idx)}
                    onClick={() => setActiveSectorIndex(idx)}
                    className={`group w-full text-left transition-all duration-300 p-4 sm:p-5 rounded-sm border cursor-pointer select-none ${
                      isHovered
                        ? "border-oil-gold/60 bg-charcoal/90 shadow-[0_0_30px_rgba(245,158,11,0.12)] opacity-100"
                        : "border-offwhite/10 bg-charcoal/30 opacity-60 hover:opacity-90"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-base sm:text-lg lg:text-xl font-bold tracking-tight transition-colors ${
                          isHovered ? "text-offwhite" : "text-offwhite/85"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <span
                        className={`text-sm font-mono transition-transform duration-300 ${
                          isHovered ? "text-oil-gold translate-x-1" : "text-offwhite/30"
                        }`}
                      >
                        →
                      </span>
                    </div>

                    <span className="block mt-1 font-mono text-[11px] text-oil-gold/80">
                      {item.category}
                    </span>

                    <p
                      className={`mt-2 text-xs sm:text-sm leading-relaxed transition-colors ${
                        isHovered ? "text-offwhite/80" : "text-offwhite/50"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right 7 Columns: Dynamic Hero Industrial Visual Canvas */}
            <div className="lg:col-span-7">
              <HeroEnvironmentVisual environment={activeSector} />
            </div>

          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* 06. TRUST & OPERATIONAL CREDIBILITY                                */}
      {/* ================================================================== */}
      <section className="relative py-20 md:py-28 border-b border-offwhite/10">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="border-l-2 border-oil-gold pl-5 sm:pl-6">
              <p className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-offwhite">
                8
              </p>
              <h4 className="mt-2 text-sm sm:text-base font-semibold text-offwhite">
                Formulation Categories
              </h4>
              <p className="mt-1 text-xs text-offwhite/60 leading-relaxed">
                Automotive, Industrial, Textile, Metalworking, Rubber Process, Transformer, White Oils, and Greases.
              </p>
            </div>

            <div className="border-l-2 border-sky-500 pl-5 sm:pl-6">
              <p className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-offwhite">
                100%
              </p>
              <h4 className="mt-2 text-sm sm:text-base font-semibold text-offwhite">
                Batch Kinematic Audit
              </h4>
              <p className="mt-1 text-xs text-offwhite/60 leading-relaxed">
                Every blending cycle audited for viscosity index stability, purity, and thermal resilience.
              </p>
            </div>

            <div className="border-l-2 border-amber-400 pl-5 sm:pl-6">
              <p className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-offwhite">
                G.I.D.C.
              </p>
              <h4 className="mt-2 text-sm sm:text-base font-semibold text-offwhite">
                Panoli &amp; Ankleshwar
              </h4>
              <p className="mt-1 text-xs text-offwhite/60 leading-relaxed">
                Dedicated manufacturing facility in Gujarat&apos;s primary heavy industrial corridor.
              </p>
            </div>

            <div className="border-l-2 border-emerald-400 pl-5 sm:pl-6">
              <p className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-offwhite">
                HEAVY
              </p>
              <h4 className="mt-2 text-sm sm:text-base font-semibold text-offwhite">
                Severe-Duty Engineering
              </h4>
              <p className="mt-1 text-xs text-offwhite/60 leading-relaxed">
                Engineered specifically for machinery operating under extreme loads, dust, and continuous heat.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* 07. CHAPTER 6: FUTURE VISION & VISUAL LOOP BACK TO LOGO IDENTITY    */}
      {/* ================================================================== */}
      <section className="relative py-20 md:py-28 border-b border-offwhite/10 overflow-hidden">
        {/* Subtle circular geometry echo */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-offwhite/5 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-dashed border-offwhite/5 pointer-events-none"
        />

        <Container className="relative z-10 text-center flex flex-col items-center">
          {/* Visual callback: Compact Kenzoil Logo with subtle breathing halo */}
          <div className="relative mb-6">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full blur-2xl opacity-40 scale-150 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 35% 50%, rgba(245, 158, 11, 0.4) 0%, transparent 60%), radial-gradient(circle at 65% 50%, rgba(2, 132, 199, 0.4) 0%, transparent 60%)",
              }}
            />
            <KenzoilLogo size={76} />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-oil-gold">
            THE FUTURE OF LUBRICATION
          </span>

          <h3 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-offwhite max-w-2xl">
            Sustaining Industrial Momentum Into Tomorrow.
          </h3>

          <p className="mt-4 max-w-xl text-sm sm:text-base text-offwhite/70 leading-relaxed">
            As modern machinery demands higher output, faster speeds, and reduced energy loss,
            Kenzoil continues to innovate low-friction, high-endurance formulations designed to keep
            enterprises moving without interruption.
          </p>
        </Container>
      </section>
    </div>
  );
}
