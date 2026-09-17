"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Container from "@/components/Container";
import FadeUp from "@/components/motion/FadeUp";

export type FeaturedItem = {
  id: string;
  index: string;
  name: string;
  categorySlug: string;
  categoryLabel: string;
  applicationTag: string;
  shortDescription: string;
  image: string;
};

export const featuredProducts: FeaturedItem[] = [
  {
    id: "diesel-engine-oils",
    index: "01",
    name: "Diesel Engine Oils",
    categorySlug: "automotive",
    categoryLabel: "Automotive Lubricants",
    applicationTag: "Heavy-Duty Diesel",
    shortDescription:
      "High-performance heavy-duty diesel lubrication engineered for commercial transport and severe operating loads.",
    image: "/images/featured/diesel-engine-oils.jpg",
  },
  {
    id: "hydraulic-oils",
    index: "02",
    name: "Kenzoil Hydraulic Oils",
    categorySlug: "industrial",
    categoryLabel: "Industrial Lubricants",
    applicationTag: "Anti-Wear Hydraulic",
    shortDescription:
      "Premium anti-wear hydraulic formulation delivering smooth power transmission and superior cavitation defense.",
    image: "/images/featured/hydraulic-oils.jpg",
  },
  {
    id: "super-multigrade-engine-oil",
    index: "03",
    name: "Super Multigrade Engine Oil",
    categorySlug: "automotive",
    categoryLabel: "Automotive Lubricants",
    applicationTag: "All-Season Multigrade",
    shortDescription:
      "All-season multi-grade formulation delivering rapid cold starts and resilient high-temperature engine protection.",
    image: "/images/featured/super-multigrade-oil.jpg",
  },
  {
    id: "industrial-gear-oils",
    index: "04",
    name: "Kenzoil Industrial Gear Oils",
    categorySlug: "industrial",
    categoryLabel: "Industrial Lubricants",
    applicationTag: "Extreme Pressure (EP)",
    shortDescription:
      "Extreme-pressure industrial gear lubricant providing heavy load-carrying capacity and tooth surface protection.",
    image: "/images/featured/industrial-gear-oils.jpg",
  },
];

export default function FeaturedProducts() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const current = featuredProducts[activeIndex];

  return (
    <section className="relative overflow-hidden bg-offwhite py-20 md:py-28">
      {/* Soft atmospheric ambient glow behind the spotlight area */}
      <div
        className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 h-[480px] w-[480px] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(217,138,61,0.22) 0%, rgba(232,168,85,0.09) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* 1. Clear Section Heading Hierarchy */}
        <FadeUp className="flex flex-col gap-3 border-b border-charcoal/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-oil-gold font-medium">
              SELECTED FORMULATIONS
            </span>
            <h2 className="mt-2 text-3xl font-normal tracking-tight text-charcoal sm:text-4xl md:text-5xl font-editorial">
              Featured Products
            </h2>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-charcoal transition-colors hover:text-oil-gold sm:pb-1"
          >
            <span>View All Products</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </FadeUp>

        {/* 2. Open Editorial Spotlight Composition */}
        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* LEFT SIDE: Product Typography & Direct Action (5 cols, order-2 on mobile, order-1 on desktop) */}
          <div className="order-2 relative flex flex-col justify-center lg:order-1 lg:col-span-5">
            {/* Subtle atmospheric ambient glow behind the title area */}
            <div
              className="pointer-events-none absolute -top-12 -left-8 -z-10 h-72 w-72 rounded-full opacity-25 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(217,138,61,0.25) 0%, rgba(232,168,85,0.1) 40%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col"
              >
                {/* Subtle Industrial Watermark Index in Background for layered depth */}
                <span
                  className="pointer-events-none absolute -top-10 -left-4 -z-10 select-none font-mono text-8xl sm:text-9xl font-black text-charcoal/[0.035] tracking-tighter leading-none"
                  aria-hidden="true"
                >
                  {current.index}
                </span>

                {/* Application Tag Pill (No redundant '01 // AUTOMOTIVE' category line) */}
                <div className="flex items-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-oil-gold/30 bg-oil-gold/10 px-3.5 py-1 font-mono text-xs font-medium text-charcoal shadow-2xs backdrop-blur-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-oil-gold" />
                    {current.applicationTag}
                  </span>
                </div>

                {/* Refined Editorial Product Title with Oil-Gold Left Anchor */}
                <div className="mt-4 border-l-2 border-oil-gold pl-4 sm:pl-5">
                  <h3 className="text-3xl font-normal tracking-tight text-charcoal sm:text-4xl lg:text-5xl font-editorial leading-[1.08]">
                    {current.name}
                  </h3>

                  {/* Concise 8–15 Word Description */}
                  <p className="mt-3.5 text-base leading-relaxed text-charcoal-light/85 sm:text-lg max-w-md">
                    {current.shortDescription}
                  </p>
                </div>

                {/* Redesigned Integrated Oil-Gold CTA Button */}
                <div className="mt-8 pl-4 sm:pl-5">
                  <Link
                    href={`/products#${current.categorySlug}`}
                    className="group inline-flex items-center gap-3 rounded-full bg-oil-gold px-7 py-3.5 text-sm font-medium text-charcoal shadow-[0_4px_20px_-4px_rgba(217,138,61,0.45)] transition-all duration-300 hover:bg-oil-gold-light hover:shadow-[0_8px_28px_-4px_rgba(217,138,61,0.65)] hover:-translate-y-0.5"
                  >
                    <span>Explore in Catalogue</span>
                    <span
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: Floating Cinematic Product Visual (7 cols, order-1 on mobile, order-2 on desktop) */}
          <div className="order-1 relative flex items-center justify-center lg:order-2 lg:col-span-7">
            {/* Ambient liquid glow behind the image */}
            <div
              className="pointer-events-none absolute h-[340px] w-[340px] sm:h-[440px] sm:w-[440px] rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(217,138,61,0.28) 0%, rgba(181,80,43,0.1) 45%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Continuous Gentle Floating Motion */}
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
              transition={{
                duration: 6.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="relative w-full max-w-[520px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, scale: 0.97 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 1.02 }
                  }
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-charcoal shadow-[0_24px_50px_-12px_rgba(26,26,26,0.15),0_12px_32px_-6px_rgba(217,138,61,0.18)]"
                >
                  <Image
                    src={current.image}
                    alt={`${current.name} - ${current.applicationTag}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 520px"
                    priority
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />

                  {/* Soft dark-to-transparent gradient edge overlay for organic depth */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-black/10" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* 3. Minimal Horizontal Product Rail */}
        <div className="mt-14 md:mt-20 border-t border-charcoal/10 pt-6">
          <div
            role="tablist"
            aria-label="Featured products navigation"
            className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
          >
            {featuredProducts.map((product, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={product.id}
                  type="button"
                  role="tab"
                  id={`spotlight-tab-${product.id}`}
                  aria-selected={isActive}
                  aria-controls={`spotlight-panel-${product.id}`}
                  tabIndex={0}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  className={`group relative flex flex-col justify-center rounded-xl p-4 text-left transition-all duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-oil-gold cursor-pointer min-h-[82px] ${
                    isActive
                      ? "bg-white text-charcoal shadow-[0_6px_16px_-4px_rgba(26,26,26,0.08)]"
                      : "text-charcoal-light/70 hover:bg-white/60 hover:text-charcoal"
                  }`}
                >
                  {/* Active top line */}
                  {isActive && (
                    <motion.div
                      layoutId="spotlight-active-indicator"
                      className="absolute top-0 left-4 right-4 h-0.5 bg-oil-gold"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}

                  <p
                    className={`text-sm sm:text-base font-semibold tracking-tight transition-colors leading-snug ${
                      isActive
                        ? "text-charcoal"
                        : "text-charcoal/80 group-hover:text-charcoal"
                    }`}
                  >
                    {product.name}
                  </p>

                  <p
                    className={`mt-1 font-mono text-xs transition-colors ${
                      isActive
                        ? "text-oil-gold font-medium"
                        : "text-oil-gold/80 group-hover:text-oil-gold"
                    }`}
                  >
                    {product.applicationTag}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
