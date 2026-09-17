import React, { useId } from "react";

interface KenzoilLogoProps {
  size?: number | string;
  className?: string;
  glow?: boolean;
  priority?: boolean;
}

/**
 * Kenzoil Official Logo Emblem
 * High-precision vector recreation preserving exact circular geometry,
 * amber/gold-to-fire-orange left hemisphere, electric-cyan-to-royal-cobalt right hemisphere,
 * and aerodynamic negative-space chevron "K" structure.
 */
export default function KenzoilLogo({
  size = 200,
  className = "",
  glow = false,
}: KenzoilLogoProps) {
  const idPrefix = useId().replace(/:/g, "_");
  const clipId = `${idPrefix}-circle-clip`;
  const orangeGradId = `${idPrefix}-orange-grad`;
  const blueGradId = `${idPrefix}-blue-grad`;
  const depthGradId = `${idPrefix}-depth-grad`;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Optional ambient back-glow */}
      {glow && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none -z-10 blur-2xl opacity-60 scale-125 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(circle at 35% 50%, rgba(245, 158, 11, 0.4) 0%, transparent 60%), radial-gradient(circle at 65% 50%, rgba(2, 132, 199, 0.4) 0%, transparent 60%)",
          }}
        />
      )}

      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
        aria-label="Kenzoil Logo"
      >
        <defs>
          <clipPath id={clipId}>
            <circle cx="100" cy="100" r="96" />
          </clipPath>

          {/* Warm golden amber to fire orange gradient */}
          <linearGradient id={orangeGradId} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="30%" stopColor="#F59E0B" />
            <stop offset="80%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          {/* Vibrant cyan-electric to deep royal cobalt gradient */}
          <linearGradient id={blueGradId} x1="20%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="35%" stopColor="#1D4ED8" />
            <stop offset="75%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>

          {/* Soft metallic bevel/rim depth */}
          <radialGradient id={depthGradId} cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
          </radialGradient>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          {/* Right blue hemisphere base */}
          <rect x="0" y="0" width="200" height="200" fill={`url(#${blueGradId})`} />

          {/* Left orange hemisphere (bounded by vertical centerline x=100) */}
          <path d="M 100,4 A 96,96 0 0,0 100,196 Z" fill={`url(#${orangeGradId})`} />

          {/* Stylized Kenzoil "K" (Negative Space Geometry) */}
          {/* 1. Left Vertical Spine with Central Triangular Dart */}
          <path
            d="M 72,16 L 100,16 L 100,184 L 72,184 L 72,134 L 16,100 L 72,66 Z"
            fill="#FFFFFF"
          />

          {/* 2. Right Chevron Arms */}
          <path
            d="M 109,100 L 146,47 L 171,47 L 134,100 L 171,153 L 146,153 Z"
            fill="#FFFFFF"
          />

          {/* Specular curved inner highlight */}
          <path
            d="M 28,60 A 96,96 0 0,1 155,25 A 92,92 0 0,0 35,70 Z"
            fill="rgba(255,255,255,0.18)"
            pointerEvents="none"
          />

          {/* Subtle dimensional overlay */}
          <circle cx="100" cy="100" r="96" fill={`url(#${depthGradId})`} pointerEvents="none" />
        </g>

        {/* Precision outer rim ring */}
        <circle
          cx="100"
          cy="100"
          r="95.5"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
