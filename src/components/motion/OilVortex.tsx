"use client";

import { useReducedMotion, motion } from "framer-motion";

export default function OilVortex() {
  const prefersReducedMotion = useReducedMotion();

  // 5.5-second cinematic slow-motion loop timeline
  const LOOP_DURATION = 5.5;

  return (
    <div
      aria-hidden="true"
      className="relative flex w-full items-center justify-center select-none"
    >
      {/* Ambient background glow beneath the puddle */}
      <div
        className="absolute bottom-6 h-[180px] w-[320px] sm:h-[240px] sm:w-[500px] rounded-full opacity-35 blur-[60px] sm:blur-[80px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(217,138,61,0.5) 0%, rgba(181,80,43,0.2) 45%, transparent 75%)",
        }}
      />

      <svg
        viewBox="0 0 500 520"
        className="relative z-10 h-auto w-full max-w-[320px] sm:max-w-[400px] md:max-w-[460px] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Surface puddle outer gradient */}
          <radialGradient
            id="puddleGrad"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="45%"
          >
            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#381a07" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#8c430e" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#d98a3d" stopOpacity="0.45" />
            <stop offset="96%" stopColor="#e8a855" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
          </radialGradient>

          {/* Contact shadow directly underneath sphere */}
          <radialGradient id="contactShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0a0502" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#140b04" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#1a1a1a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
          </radialGradient>

          {/* Thin puddle surface gloss reflection */}
          <linearGradient
            id="puddleGloss"
            x1="120"
            y1="455"
            x2="380"
            y2="455"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#d98a3d" stopOpacity="0" />
            <stop offset="25%" stopColor="#e8a855" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#fff1d6" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#d98a3d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d98a3d" stopOpacity="0" />
          </linearGradient>

          {/* Main 3D realistic amber oil sphere gradient */}
          <radialGradient
            id="oilSphere"
            cx="38%"
            cy="32%"
            r="68%"
            fx="36%"
            fy="30%"
          >
            <stop offset="0%" stopColor="#fffdfa" stopOpacity="0.98" />
            <stop offset="8%" stopColor="#fef3c7" stopOpacity="0.95" />
            <stop offset="20%" stopColor="#f59e0b" />
            <stop offset="42%" stopColor="#d97706" />
            <stop offset="68%" stopColor="#92400e" />
            <stop offset="86%" stopColor="#451a03" />
            <stop offset="97%" stopColor="#1f0a02" />
            <stop offset="100%" stopColor="#140601" />
          </radialGradient>

          {/* Inner liquid caustic highlight (upper curvature) */}
          <radialGradient
            id="sphereCaustic"
            cx="40%"
            cy="35%"
            r="45%"
            fx="38%"
            fy="32%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#fef3c7" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          {/* Secondary underside bounce reflection from puddle */}
          <linearGradient id="groundBounce" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#e8a855" stopOpacity="0.55" />
            <stop offset="18%" stopColor="#d97706" stopOpacity="0.25" />
            <stop offset="45%" stopColor="#78350f" stopOpacity="0" />
          </linearGradient>

          {/* Falling amber oil droplet gradient */}
          <radialGradient
            id="dropletGrad"
            cx="38%"
            cy="32%"
            r="65%"
            fx="35%"
            fy="28%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#fef3c7" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="90%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>
        </defs>

        {/* ============================================================ */}
        {/* 1. OIL PUDDLE & CONTACT SHADOW AT BASE                        */}
        {/* ============================================================ */}
        <g id="oil-puddle">
          {/* Wide ambient liquid pool on the dark surface */}
          <ellipse
            cx="250"
            cy="450"
            rx="185"
            ry="46"
            fill="url(#puddleGrad)"
          />

          {/* Deep occlusion contact shadow directly under the sphere base */}
          <ellipse
            cx="250"
            cy="454"
            rx="105"
            ry="22"
            fill="url(#contactShadow)"
          />

          {/* Thin specular oil puddle perimeter ring & front reflection */}
          <path
            d="M 125 451 C 160 464, 340 464, 375 451"
            stroke="url(#puddleGloss)"
            strokeWidth="1.75"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 175 456 C 210 465, 290 465, 325 456"
            stroke="url(#puddleGloss)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* ============================================================ */}
        {/* 2. THE GRAND AMBER OIL SPHERE                                 */}
        {/* ============================================================ */}
        <motion.g
          id="amber-oil-sphere"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  // Micro liquid elastic reaction at impact (around t = 2.7s - 3.6s of the 5.5s loop)
                  scaleY: [1, 1, 0.988, 1.006, 0.998, 1, 1],
                  scaleX: [1, 1, 1.008, 0.996, 1.002, 1, 1],
                }
          }
          transition={{
            duration: LOOP_DURATION,
            times: [0, 0.49, 0.53, 0.6, 0.68, 0.78, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "250px 450px", // Anchored firmly to puddle base
          }}
        >
          {/* Main 3D liquid sphere body (Center: 250, 320 | Radius: 130) */}
          <circle
            cx="250"
            cy="320"
            r="130"
            fill="url(#oilSphere)"
          />

          {/* Upper specular liquid caustic highlight */}
          <ellipse
            cx="205"
            cy="252"
            rx="58"
            ry="36"
            transform="rotate(-28 205 252)"
            fill="url(#sphereCaustic)"
          />

          {/* Intense pin-point specular light glint */}
          <circle
            cx="192"
            cy="240"
            r="8"
            fill="#ffffff"
            opacity="0.85"
          />
          <circle
            cx="192"
            cy="240"
            r="16"
            fill="#ffffff"
            opacity="0.25"
          />

          {/* Underside ground bounce reflection from the amber puddle */}
          <circle
            cx="250"
            cy="320"
            r="130"
            fill="url(#groundBounce)"
          />
        </motion.g>

        {/* ============================================================ */}
        {/* 3. SURFACE RIPPLES ON SPHERE (Apex = 250, 190)               */}
        {/* ============================================================ */}
        {!prefersReducedMotion && (
          <g id="surface-ripples">
            {/* Primary expanding liquid ripple */}
            <motion.ellipse
              cx="250"
              cy="192"
              stroke="#fef3c7"
              strokeWidth="2"
              fill="none"
              initial={{ rx: 3, ry: 1.2, opacity: 0 }}
              animate={{
                rx: [3, 3, 52, 75, 75],
                ry: [1.2, 1.2, 16, 22, 22],
                opacity: [0, 0, 0.8, 0, 0],
                strokeWidth: [2.5, 2.5, 1.5, 0.5, 0.5],
              }}
              transition={{
                duration: LOOP_DURATION,
                times: [0, 0.49, 0.56, 0.74, 1],
                repeat: Infinity,
                ease: "easeOut",
              }}
            />

            {/* Secondary follower ripple */}
            <motion.ellipse
              cx="250"
              cy="192"
              stroke="#f59e0b"
              strokeWidth="1.5"
              fill="none"
              initial={{ rx: 2, ry: 0.8, opacity: 0 }}
              animate={{
                rx: [2, 2, 38, 58, 58],
                ry: [0.8, 0.8, 11, 17, 17],
                opacity: [0, 0, 0.6, 0, 0],
                strokeWidth: [2, 2, 1.2, 0.5, 0.5],
              }}
              transition={{
                duration: LOOP_DURATION,
                times: [0, 0.53, 0.61, 0.78, 1],
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* 4. ANIMATED FALLING AMBER OIL DROPLET                         */}
        {/* ============================================================ */}
        {!prefersReducedMotion && (
          <motion.g
            id="falling-oil-drop"
            initial={{ y: 70, scaleX: 1, scaleY: 1, opacity: 0 }}
            animate={{
              // Fall trajectory from y = 70 down to sphere apex at y = 188
              y: [70, 78, 84, 88, 188, 188, 70],
              scaleY: [0.3, 0.9, 1.15, 1.28, 0.4, 0.2, 0.3],
              scaleX: [0.4, 0.95, 0.88, 0.78, 1.45, 1.5, 0.4],
              opacity: [0, 0.95, 1, 1, 0.85, 0, 0],
            }}
            transition={{
              duration: LOOP_DURATION,
              times: [0, 0.12, 0.24, 0.34, 0.5, 0.52, 1],
              repeat: Infinity,
              ease: [0.42, 0, 0.58, 1],
            }}
          >
            {/* Realistic amber oil droplet vector path */}
            <path
              d="M 250 0 C 255.5 8, 260 16.5, 260 25 C 260 30.5, 255.5 35, 250 35 C 244.5 35, 240 30.5, 240 25 C 240 16.5, 244.5 8, 250 0 Z"
              fill="url(#dropletGrad)"
            />
            {/* Droplet specular light glint */}
            <ellipse
              cx="247"
              cy="22"
              rx="2.5"
              ry="4"
              fill="#ffffff"
              opacity="0.8"
            />
          </motion.g>
        )}
      </svg>
    </div>
  );
}
