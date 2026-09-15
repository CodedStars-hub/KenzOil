"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  animate,
  type MotionValue,
} from "framer-motion";

export type CarouselItem = {
  slug: string;
  name: string;
  index: number;
};

type CategoryMeta = {
  badge: string;
  tag: string;
  description: string;
};

const CATEGORY_META: Record<string, CategoryMeta> = {
  automotive: {
    badge: "Mobility & Fleet",
    tag: "01 // AUTOMOTIVE",
    description:
      "Engine oils, commercial diesel formulations, transmission fluids, and heavy-duty coolants.",
  },
  industrial: {
    badge: "Plant Machinery",
    tag: "02 // INDUSTRIAL",
    description:
      "Anti-wear hydraulic oils, extreme-pressure gear oils, and specialized heat transfer fluids.",
  },
  textile: {
    badge: "High-Speed Looms",
    tag: "03 // TEXTILE",
    description:
      "High-speed spindle oils and anti-wear loom formulations engineered for automated machinery.",
  },
  "metal-working": {
    badge: "Machining & Tooling",
    tag: "04 // METAL WORKING",
    description:
      "Formulated cutting fluids, machining coolants, and drawing oils for precision tooling.",
  },
  "rubber-process": {
    badge: "Polymer Compounding",
    tag: "05 // RUBBER PROCESS",
    description:
      "Specialized process oils designed as polymer plasticizers and processing aids in rubber goods.",
  },
  transformer: {
    badge: "High-Voltage Dielectric",
    tag: "06 // TRANSFORMER",
    description:
      "High-dielectric insulating oils engineered for arc suppression, cooling, and transformer life.",
  },
  "white-oil": {
    badge: "High-Purity Mineral",
    tag: "07 // WHITE OIL",
    description:
      "Highly refined, odorless technical and pharmaceutical grade liquid paraffin for clean operations.",
  },
  grease: {
    badge: "Extreme-Load Bearings",
    tag: "08 // GREASE",
    description:
      "Heavy-duty chassis and roller bearing greases formulated for extreme shock loads and heat.",
  },
};

/* ========================================================================== */
/* 8 COLORFUL INDUSTRIAL CATEGORY ILLUSTRATIONS                               */
/* ========================================================================== */
function CategoryArtwork({ slug }: { slug: string }) {
  switch (slug) {
    case "automotive":
      // Automotive: Metallic Silver + Deep Blue + Amber Oil Highlights
      return (
        <svg
          viewBox="0 0 200 130"
          className="h-28 w-auto sm:h-32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Cylinder chamber with deep blue hue */}
          <rect
            x="48"
            y="16"
            width="104"
            height="98"
            rx="4"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeOpacity="0.45"
            fill="#1E293B"
            fillOpacity="0.4"
          />
          {/* Metallic combustion roof */}
          <path
            d="M 52 26 Q 100 14 148 26"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Piston crown - Metallic Silver Gradient */}
          <rect
            x="58"
            y="36"
            width="84"
            height="46"
            rx="3"
            fill="#334155"
            stroke="#94A3B8"
            strokeWidth="1.75"
          />
          {/* Triple compression rings with golden oil seal */}
          <line x1="58" y1="44" x2="142" y2="44" stroke="#F59E0B" strokeWidth="2" />
          <line x1="58" y1="52" x2="142" y2="52" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="58" y1="60" x2="142" y2="60" stroke="#F59E0B" strokeWidth="1.5" />
          {/* Wrist pin in silver */}
          <circle cx="100" cy="62" r="8" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="100" cy="62" r="3" fill="#FEF08A" />
          {/* Connecting rod in steel blue */}
          <path
            d="M 94 68 L 88 114 M 106 68 L 112 114"
            stroke="#60A5FA"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Flowing amber lubricant ribbons along cylinder wall */}
          <path
            d="M 38 32 C 38 60, 44 80, 38 108"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          <path
            d="M 162 32 C 162 60, 156 80, 162 108"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
          {/* Velocity particles */}
          <circle cx="100" cy="24" r="2.5" fill="#FEF08A" />
          <circle cx="76" cy="22" r="2" fill="#60A5FA" />
          <circle cx="124" cy="22" r="2" fill="#60A5FA" />
        </svg>
      );

    case "industrial":
      // Industrial: Steel Blue + Amber Hydraulic Fluid + Orange Valve Accents
      return (
        <svg
          viewBox="0 0 200 130"
          className="h-28 w-auto sm:h-32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Hydraulic manifold housing in steel blue */}
          <rect
            x="38"
            y="22"
            width="124"
            height="86"
            rx="5"
            fill="#0F172A"
            stroke="#0284C7"
            strokeWidth="1.75"
            strokeOpacity="0.6"
          />
          {/* Pressure core reservoir with luminous fluid */}
          <circle
            cx="100"
            cy="65"
            r="28"
            fill="#0369A1"
            fillOpacity="0.25"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />
          <circle
            cx="100"
            cy="65"
            r="16"
            fill="#D97706"
            fillOpacity="0.3"
            stroke="#F59E0B"
            strokeWidth="2"
          />
          <circle cx="100" cy="65" r="5" fill="#FEF08A" />
          {/* High-pressure conduits in amber and cyan */}
          <line x1="20" y1="65" x2="72" y2="65" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="128" y1="65" x2="180" y2="65" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="100" y1="10" x2="100" y2="37" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <line x1="100" y1="93" x2="100" y2="120" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          {/* Orange control valve nodes */}
          <circle cx="30" cy="65" r="4.5" fill="#EA580C" stroke="#FED7AA" strokeWidth="1" />
          <circle cx="170" cy="65" r="4.5" fill="#EA580C" stroke="#FED7AA" strokeWidth="1" />
          <circle cx="100" cy="18" r="3.5" fill="#38BDF8" />
          <circle cx="100" cy="112" r="3.5" fill="#38BDF8" />
        </svg>
      );

    case "textile":
      // Textile: Cyan Fibers + Copper/Amber Spindle + Silver Highlights
      return (
        <svg
          viewBox="0 0 200 130"
          className="h-28 w-auto sm:h-32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Polished copper vertical spindle shaft */}
          <line x1="100" y1="12" x2="100" y2="118" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          {/* Spindle bolster in metallic slate */}
          <rect
            x="86"
            y="42"
            width="28"
            height="46"
            rx="3"
            fill="#1E293B"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          {/* Blue/Cyan textile yarn fiber curves */}
          <path
            d="M 32 40 C 60 20, 85 45, 100 65 C 115 85, 140 110, 168 90"
            stroke="#06B6D4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 3"
          />
          <path
            d="M 32 90 C 60 110, 85 85, 100 65 C 115 45, 140 20, 168 40"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
          {/* Concentric anti-misting lubricant film rings */}
          <ellipse cx="100" cy="50" rx="56" ry="14" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.7" />
          <ellipse cx="100" cy="80" rx="46" ry="11" stroke="#FEF08A" strokeWidth="1.75" strokeOpacity="0.85" />
          {/* Spindle apex highlight */}
          <circle cx="100" cy="20" r="3" fill="#FFFFFF" />
        </svg>
      );

    case "metal-working":
      // Metal Working: Steel Gray + Cyan Cutting Fluid + Amber Friction Sparks
      return (
        <svg
          viewBox="0 0 200 130"
          className="h-28 w-auto sm:h-32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Steel workpiece cylinder */}
          <rect
            x="36"
            y="46"
            width="70"
            height="58"
            rx="3"
            fill="#1E293B"
            stroke="#64748B"
            strokeWidth="1.75"
          />
          <line x1="48" y1="46" x2="48" y2="104" stroke="#475569" strokeWidth="1.2" />
          <line x1="86" y1="46" x2="86" y2="104" stroke="#475569" strokeWidth="1.2" />
          {/* Hardened tool insert holder in dark titanium */}
          <polygon
            points="152,20 106,48 138,78 166,48"
            fill="#334155"
            stroke="#94A3B8"
            strokeWidth="1.75"
          />
          {/* Golden titanium carbide insert tip */}
          <polygon points="106,48 116,42 122,54" fill="#F59E0B" />
          {/* High-pressure stream of cyan cutting coolant */}
          <path
            d="M 124 14 Q 108 30 106 48"
            stroke="#06B6D4"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 106 48 Q 94 62 72 68"
            stroke="#67E8F9"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          {/* Amber friction sparks */}
          <circle cx="106" cy="48" r="3" fill="#FFFFFF" />
          <circle cx="96" cy="44" r="1.5" fill="#F59E0B" />
          <circle cx="102" cy="56" r="1.5" fill="#EA580C" />
        </svg>
      );

    case "rubber-process":
      // Rubber Process: Deep Blue + Amber Polymer Nodes + Rust Accents
      return (
        <svg
          viewBox="0 0 200 130"
          className="h-28 w-auto sm:h-32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Polymer elastomer lattice bonds */}
          <polygon
            points="100,22 132,40 132,76 100,94 68,76 68,40"
            stroke="#3B82F6"
            strokeWidth="1.75"
            strokeOpacity="0.5"
            fill="#1E293B"
            fillOpacity="0.3"
          />
          <polygon
            points="100,36 122,48 122,68 100,80 78,68 78,48"
            stroke="#B5502B"
            strokeWidth="1.5"
            fill="#0F172A"
          />
          {/* External polymer chain connections */}
          <line x1="68" y1="40" x2="38" y2="28" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="68" y1="76" x2="38" y2="88" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="132" y1="40" x2="162" y2="28" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="132" y1="76" x2="162" y2="88" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Amber plasticizer fluid nodes */}
          <circle cx="100" cy="22" r="4" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1" />
          <circle cx="132" cy="40" r="4" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1" />
          <circle cx="132" cy="76" r="4" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1" />
          <circle cx="100" cy="94" r="4" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1" />
          <circle cx="68" cy="76" r="4" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1" />
          <circle cx="68" cy="40" r="4" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1" />
          <circle cx="100" cy="58" r="6" fill="#60A5FA" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );

    case "transformer":
      // Transformer: Metallic Steel Core + Copper Windings + Dielectric Fluid Waves
      return (
        <svg
          viewBox="0 0 200 130"
          className="h-28 w-auto sm:h-32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* High-permeability transformer magnetic core in steel */}
          <rect
            x="46"
            y="20"
            width="108"
            height="90"
            rx="4"
            fill="#0F172A"
            stroke="#475569"
            strokeWidth="2"
          />
          <rect
            x="68"
            y="42"
            width="64"
            height="46"
            rx="2"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="1.5"
          />
          {/* Copper primary winding */}
          <rect
            x="52"
            y="34"
            width="22"
            height="62"
            rx="2"
            fill="#78350F"
            stroke="#D97706"
            strokeWidth="1.5"
          />
          <line x1="52" y1="46" x2="74" y2="46" stroke="#FEF08A" strokeWidth="1.2" />
          <line x1="52" y1="58" x2="74" y2="58" stroke="#FEF08A" strokeWidth="1.2" />
          <line x1="52" y1="70" x2="74" y2="70" stroke="#FEF08A" strokeWidth="1.2" />
          <line x1="52" y1="82" x2="74" y2="82" stroke="#FEF08A" strokeWidth="1.2" />
          {/* Copper secondary winding */}
          <rect
            x="126"
            y="34"
            width="22"
            height="62"
            rx="2"
            fill="#78350F"
            stroke="#D97706"
            strokeWidth="1.5"
          />
          <line x1="126" y1="46" x2="148" y2="46" stroke="#FEF08A" strokeWidth="1.2" />
          <line x1="126" y1="58" x2="148" y2="58" stroke="#FEF08A" strokeWidth="1.2" />
          <line x1="126" y1="70" x2="148" y2="70" stroke="#FEF08A" strokeWidth="1.2" />
          <line x1="126" y1="82" x2="148" y2="82" stroke="#FEF08A" strokeWidth="1.2" />
          {/* Undulating amber dielectric fluid waves and cool electric sparks */}
          <path
            d="M 28 65 C 50 50, 60 78, 100 65 C 140 52, 150 78, 172 65"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="100" cy="65" r="3" fill="#60A5FA" />
          <circle cx="40" cy="58" r="2" fill="#93C5FD" />
          <circle cx="160" cy="72" r="2" fill="#93C5FD" />
        </svg>
      );

    case "white-oil":
      // White Oil: Translucent Crystal Blue + Silver Highlights + Amber Refraction
      return (
        <svg
          viewBox="0 0 200 130"
          className="h-28 w-auto sm:h-32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Multi-stage purity droplet in crystal cyan/blue */}
          <path
            d="M 100 18 C 116 42, 136 68, 136 90 C 136 110, 120 120, 100 120 C 80 120, 64 110, 64 90 C 64 68, 84 42, 100 18 Z"
            fill="#0284C7"
            fillOpacity="0.15"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          {/* Internal refractive purity prism curve */}
          <path
            d="M 100 34 C 112 50, 124 72, 124 90 C 124 102, 114 112, 100 112"
            stroke="#E0F2FE"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Specular pinpoint white glint */}
          <circle cx="94" cy="44" r="3.5" fill="#FFFFFF" />
          <circle cx="94" cy="44" r="8" fill="#FFFFFF" fillOpacity="0.25" />
          {/* Molecular filtration strata in silver and amber */}
          <ellipse cx="100" cy="86" rx="46" ry="11" stroke="#94A3B8" strokeWidth="1.25" strokeDasharray="3 3" />
          <ellipse cx="100" cy="100" rx="30" ry="7" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.8" />
        </svg>
      );

    case "grease":
    default:
      // Grease: Polished Bearing Steel + Blue-Gray + Rich Amber-Gold Grease Film
      return (
        <svg
          viewBox="0 0 200 130"
          className="h-28 w-auto sm:h-32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer and inner steel raceways in blue-gray */}
          <circle cx="100" cy="65" r="50" stroke="#64748B" strokeWidth="2" fill="#0F172A" />
          <circle cx="100" cy="65" r="26" stroke="#64748B" strokeWidth="2" fill="#1E293B" />
          {/* High-load cylindrical roller elements in metallic silver */}
          <circle cx="100" cy="26" r="9" fill="#334155" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="100" cy="104" r="9" fill="#334155" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="61" cy="65" r="9" fill="#334155" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="139" cy="65" r="9" fill="#334155" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Diagonal roller bearings */}
          <circle cx="73" cy="38" r="8" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.25" />
          <circle cx="127" cy="38" r="8" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.25" />
          <circle cx="73" cy="92" r="8" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.25" />
          <circle cx="127" cy="92" r="8" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.25" />
          {/* Thick viscous amber-gold grease lubricating bead and raceway channel */}
          <circle cx="100" cy="65" r="12" fill="#D97706" fillOpacity="0.4" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="100" cy="65" r="5" fill="#FEF08A" />
        </svg>
      );
  }
}

/* ========================================================================== */
/* CARD COMPONENT (FIXED CTA + NO OVERFLOW + CLEAN VERTICAL FLEX)              */
/* ========================================================================== */
function OrbitalCardFace({
  item,
  isCenter,
}: {
  item: CarouselItem;
  isCenter: boolean;
}) {
  const meta = CATEGORY_META[item.slug] || {
    badge: "Industrial Specialty",
    tag: `${String(item.index + 1).padStart(2, "0")} // LUBRICANTS`,
    description: "Specialized high-performance lubricant formulations.",
  };

  return (
    <Link
      href={`/products#${item.slug}`}
      className={`group flex h-[440px] w-[275px] sm:w-[290px] flex-col justify-between overflow-hidden rounded-sm border bg-gradient-to-br from-charcoal-light via-charcoal to-[#121212] transition-[border-color,box-shadow] duration-300 ease-out select-none ${
        isCenter
          ? "border-oil-gold shadow-[0_28px_56px_-16px_rgba(0,0,0,0.95),0_0_36px_-4px_rgba(217,138,61,0.55)]"
          : "border-oil-gold/25 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.85),0_0_20px_-6px_rgba(217,138,61,0.2)] hover:border-oil-gold/60"
      }`}
    >
      {/* 1. Top Visual Section (~40% height) */}
      <div className="relative flex h-[175px] w-full items-center justify-center overflow-hidden border-b border-oil-gold/15 bg-charcoal p-4">
        {/* Subtle warm ambient backlighting */}
        <div
          className="pointer-events-none absolute h-24 w-24 rounded-full opacity-25 blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(217,138,61,0.95) 0%, transparent 70%)",
          }}
        />

        {/* Category Application Badge in Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center rounded-xs border border-oil-gold/30 bg-charcoal-light/95 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-oil-gold-light backdrop-blur-xs">
            {meta.badge}
          </span>
        </div>

        {/* High-Quality Multi-Color Industrial Artwork */}
        <div className="relative z-0 transition-transform duration-300 ease-out group-hover:scale-105">
          <CategoryArtwork slug={item.slug} />
        </div>
      </div>

      {/* 2. Middle Content Section (Flexible padding, no cutoffs) */}
      <div className="flex flex-1 flex-col justify-start p-5">
        <span className="font-mono text-[11px] font-medium tracking-wider text-oil-gold uppercase">
          {meta.tag}
        </span>

        <h3 className="mt-1.5 text-base font-semibold tracking-tight text-offwhite transition-colors group-hover:text-oil-gold-light sm:text-lg">
          {item.name}
        </h3>

        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-offwhite/75 sm:text-sm">
          {meta.description}
        </p>
      </div>

      {/* 3. Bottom CTA Section (Comfortably anchored, never clipped) */}
      <div className="mt-auto border-t border-offwhite/10 bg-charcoal/40 px-5 py-3.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-oil-gold transition-colors group-hover:text-oil-gold-light sm:text-sm">
          <span>Explore Category</span>
          <span
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

/* ========================================================================== */
/* 3D ORBITAL CARD TRANSFORM COMPONENT                                        */
/* ========================================================================== */
function OrbitalCard({
  item,
  index,
  total,
  angle,
  radiusX,
  radiusY,
  onCardClick,
}: {
  item: CarouselItem;
  index: number;
  total: number;
  angle: MotionValue<number>;
  radiusX: number;
  radiusY: number;
  onCardClick: (index: number) => void;
}) {
  const stepDegrees = 360 / total;
  const initialOffset = index * stepDegrees;

  // Derive 3D orbital trajectory from the continuous master angle
  const x = useTransform(angle, (a) => {
    const current = ((a + initialOffset) % 360 + 360) % 360;
    let diff = current;
    if (diff > 180) diff -= 360;
    const rad = (diff * Math.PI) / 180;
    return radiusX * Math.sin(rad);
  });

  const y = useTransform(angle, (a) => {
    const current = ((a + initialOffset) % 360 + 360) % 360;
    let diff = current;
    if (diff > 180) diff -= 360;
    const rad = (diff * Math.PI) / 180;
    // Inward curved dip: front cards sit slightly lower/forward
    return radiusY * (1 - Math.cos(rad));
  });

  const scale = useTransform(angle, (a) => {
    const current = ((a + initialOffset) % 360 + 360) % 360;
    let diff = current;
    if (diff > 180) diff -= 360;
    const rad = (diff * Math.PI) / 180;
    const depth = (Math.cos(rad) + 1) / 2; // 1 at front center, 0 at back
    return 0.78 + 0.30 * depth; // Front card reaches 1.08 scale
  });

  const rotateY = useTransform(angle, (a) => {
    const current = ((a + initialOffset) % 360 + 360) % 360;
    let diff = current;
    if (diff > 180) diff -= 360;
    const rad = (diff * Math.PI) / 180;
    // Controlled inward-facing perspective rotation
    return -Math.sin(rad) * 28;
  });

  const opacity = useTransform(angle, (a) => {
    const current = ((a + initialOffset) % 360 + 360) % 360;
    let diff = current;
    if (diff > 180) diff -= 360;
    const rad = (diff * Math.PI) / 180;
    const depth = (Math.cos(rad) + 1) / 2;
    return 0.45 + 0.55 * depth; // Front is 1.0, side cards remain visible at 0.60+
  });

  const zIndex = useTransform(angle, (a) => {
    const current = ((a + initialOffset) % 360 + 360) % 360;
    let diff = current;
    if (diff > 180) diff -= 360;
    const rad = (diff * Math.PI) / 180;
    const depth = (Math.cos(rad) + 1) / 2;
    return Math.round(depth * 40) + 1; // Front cards naturally layer on top
  });

  const [isCenter, setIsCenter] = useState(false);

  useEffect(() => {
    const unsubscribe = angle.on("change", (a) => {
      const current = ((a + initialOffset) % 360 + 360) % 360;
      let diff = current;
      if (diff > 180) diff -= 360;
      setIsCenter(Math.abs(diff) < 22);
    });
    return () => unsubscribe();
  }, [angle, initialOffset]);

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotateY,
        opacity,
        zIndex,
        position: "absolute",
        transformStyle: "preserve-3d",
      }}
      className="cursor-pointer"
      onClick={() => onCardClick(index)}
    >
      <OrbitalCardFace item={item} isCenter={isCenter} />
    </motion.div>
  );
}

/* ========================================================================== */
/* MAIN CIRCULAR INWARD-SPINNING CAROUSEL                                     */
/* ========================================================================== */
export default function GlowCarousel({ items }: { items: CarouselItem[] }) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const angle = useMotionValue(0);
  const [radiusX, setRadiusX] = useState(380);
  const [radiusY, setRadiusY] = useState(24);
  const playbackRef = useRef<ReturnType<typeof animate> | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Calibrate orbital radius based on container width so cards never overflow
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    if (w < 640) {
      // Mobile: compact orbital radius contained inside screen
      setRadiusX(Math.min(w * 0.32, 130));
      setRadiusY(12);
    } else if (w < 1024) {
      // Tablet
      setRadiusX(Math.min(w * 0.36, 260));
      setRadiusY(18);
    } else {
      // Desktop
      setRadiusX(380);
      setRadiusY(24);
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Continuous smooth orbital rotation loop
  const startAutoplay = useCallback(() => {
    if (prefersReducedMotion) return;
    playbackRef.current?.stop();
    const current = angle.get();
    playbackRef.current = animate(angle, current - 360, {
      duration: 36, // 36 seconds per full orbit — smooth, continuous, cinematic
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
  }, [angle, prefersReducedMotion]);

  useEffect(() => {
    startAutoplay();
    return () => playbackRef.current?.stop();
  }, [startAutoplay]);

  // Click on any card to rotate and bring it front and center smoothly
  const handleCardClick = (index: number) => {
    const stepDegrees = 360 / items.length;
    const targetAngle = -index * stepDegrees;
    const current = angle.get();
    // Find closest delta
    let delta = (targetAngle - current) % 360;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    playbackRef.current?.stop();
    animate(angle, current + delta, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        if (!isPaused) startAutoplay();
      },
    });
  };

  // Manual Previous / Next controls
  const handleStep = (direction: "prev" | "next") => {
    const stepDegrees = 360 / items.length;
    const current = angle.get();
    const delta = direction === "next" ? -stepDegrees : stepDegrees;

    playbackRef.current?.stop();
    animate(angle, current + delta, {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        if (!isPaused) startAutoplay();
      },
    });
  };

  // Pause on pointer enter, resume on leave
  const handlePointerEnter = () => {
    setIsPaused(true);
    playbackRef.current?.pause();
  };

  const handlePointerLeave = () => {
    setIsPaused(false);
    playbackRef.current?.play();
  };

  return (
    <div
      className="relative w-full select-none"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Viewport container with perspective & strict overflow containment */}
      <div
        ref={containerRef}
        className="relative mx-auto flex h-[500px] w-full max-w-6xl items-center justify-center overflow-hidden py-4 sm:h-[530px]"
        style={{
          perspective: 1200,
        }}
      >
        {items.map((item, i) => (
          <OrbitalCard
            key={item.slug}
            item={item}
            index={i}
            total={items.length}
            angle={angle}
            radiusX={radiusX}
            radiusY={radiusY}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {/* Orbit Navigation Controls & Guidance */}
      <div className="mt-4 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => handleStep("prev")}
          aria-label="Previous category"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-offwhite/20 bg-charcoal text-offwhite/80 transition-colors hover:border-oil-gold hover:text-oil-gold active:scale-95"
        >
          ←
        </button>

        <span className="font-mono text-[11px] uppercase tracking-wider text-offwhite/50">
          Click any card to inspect // Auto-orbiting
        </span>

        <button
          type="button"
          onClick={() => handleStep("next")}
          aria-label="Next category"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-offwhite/20 bg-charcoal text-offwhite/80 transition-colors hover:border-oil-gold hover:text-oil-gold active:scale-95"
        >
          →
        </button>
      </div>
    </div>
  );
}
