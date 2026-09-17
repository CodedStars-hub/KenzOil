"use client";

import React, { useState } from "react";
import Link from "next/link";
import Container from "./Container";
import KenzoilLogo from "./KenzoilLogo";
import { siteInfo } from "@/lib/site";
import { categories } from "@/lib/products";

export default function Footer() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Non-destructive UI state; prepared for Web3Forms integration
    setFormSubmitted(true);
  };

  return (
    <footer
      id="kenzoil-footer"
      className="relative w-full bg-[#060709] text-offwhite border-t border-offwhite/10 overflow-hidden"
    >
      {/* ================================================================== */}
      {/* 01. INDUSTRIAL BACKGROUND CONDUITS & ATMOSPHERIC GLOW              */}
      {/* ================================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
      >
        {/* Dual Atmospheric Lighting: Warm Amber on Left, Cobalt on Right */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-amber-500/[0.04] blur-[140px]" />
        <div className="absolute top-1/4 -right-32 w-[650px] h-[650px] rounded-full bg-sky-500/[0.04] blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-oil-gold/[0.03] blur-[160px]" />

        {/* Precision Engineering Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Abstract Industrial Pipeline Schematic */}
        <svg
          className="absolute inset-0 w-full h-full stroke-offwhite/[0.03] fill-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0 120 L 400 120 L 520 240 L 1200 240 L 1350 390 L 2000 390" strokeWidth="1.5" />
          <path d="M 0 450 L 300 450 L 420 570 L 1600 570 L 1750 720 L 2000 720" strokeWidth="1.5" />
          <path d="M 600 0 L 600 240" strokeWidth="1" strokeDasharray="4 8" />
          <path d="M 1200 240 L 1200 700" strokeWidth="1" strokeDasharray="4 8" />

          {/* Fluid Conduit Pulse Line */}
          <path
            d="M 100 120 L 400 120 L 520 240 L 1050 240"
            stroke="url(#amber-pulse-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="amber-pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ================================================================== */}
      {/* CONTACT KENZOIL: BALANCED 2-COLUMN DESTINATION & FULL LOCATIONS    */}
      {/* ================================================================== */}
      <section id="contact" className="py-20 sm:py-28 border-b border-offwhite/10">
        <Container>
          {/* Row 1: Direct Contacts & Requirement Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left 5 Columns: Direct Phone, Email, Hours */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-oil-gold font-semibold">
                  CONTACT KENZOIL
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-offwhite leading-[1.05]">
                  Let’s discuss your lubrication requirements.
                </h2>
                <p className="mt-4 text-base sm:text-lg text-offwhite/75 leading-relaxed">
                  Direct lines for product specifications, custom formulation requests, and commercial dispatch across India.
                </p>

                {/* Direct Unboxed Contact Info */}
                <div className="mt-8 space-y-6">
                  {/* Phone */}
                  <div className="group">
                    <span className="font-mono text-xs text-offwhite/50 uppercase tracking-wider block mb-1">
                      DIRECT PHONE / TECHNICAL &amp; SALES
                    </span>
                    <a
                      href={`tel:${siteInfo.phone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-3 text-2xl sm:text-3xl font-black font-mono tracking-tight text-offwhite group-hover:text-oil-gold transition-colors"
                      aria-label={`Call Kenzoil directly at ${siteInfo.phone}`}
                    >
                      <span>{siteInfo.phone}</span>
                      <svg
                        className="w-5 h-5 text-oil-gold opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>

                  {/* Email */}
                  <div className="group">
                    <span className="font-mono text-xs text-offwhite/50 uppercase tracking-wider block mb-1">
                      COMMERCIAL &amp; BULK DESK
                    </span>
                    <a
                      href={`mailto:${siteInfo.email}`}
                      className="inline-flex items-center gap-3 text-xl sm:text-2xl font-bold font-mono tracking-tight text-offwhite group-hover:text-sky-400 transition-colors"
                      aria-label={`Send Email to ${siteInfo.email}`}
                    >
                      <span className="break-all">{siteInfo.email}</span>
                      <svg
                        className="w-5 h-5 text-sky-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Operating Hours Note */}
              <div className="mt-8 pt-6 border-t border-offwhite/10 flex flex-wrap items-center gap-2.5 text-xs font-mono text-offwhite/60">
                <span className="text-oil-gold font-bold">OPERATING HOURS:</span>
                <span>{siteInfo.hours.weekdays} (IST)</span>
                <span>•</span>
                <span className="text-offwhite/40">{siteInfo.hours.sunday}</span>
              </div>
            </div>

            {/* Right 7 Columns: 5-Field Requirement Form */}
            <div className="lg:col-span-7 rounded-sm border border-offwhite/15 bg-gradient-to-b from-charcoal/90 to-[#0A0D12] p-6 sm:p-8 shadow-2xl relative">
              <div
                aria-hidden="true"
                className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-oil-gold via-amber-300 to-sky-500"
              />

              <div className="border-b border-offwhite/10 pb-4 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-oil-gold font-bold">
                  ENQUIRY DESK
                </span>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-offwhite">
                  Send Your Requirement
                </h3>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-offwhite">Enquiry Received</h4>
                  <p className="mt-2 text-xs text-offwhite/70 max-w-xs leading-relaxed">
                    Thank you, {formData.name || "Customer"}. Our technical desk will review your specifications and contact you shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 font-mono text-xs text-oil-gold hover:underline cursor-pointer"
                  >
                    ← Submit Another Requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="footer-name" className="block font-mono text-[11px] text-offwhite/60 mb-1.5">
                        YOUR NAME *
                      </label>
                      <input
                        id="footer-name"
                        required
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-sm border border-offwhite/15 bg-charcoal/80 px-3.5 py-2.5 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-oil-gold focus:outline-hidden focus:ring-1 focus:ring-oil-gold/30"
                      />
                    </div>

                    <div>
                      <label htmlFor="footer-company" className="block font-mono text-[11px] text-offwhite/60 mb-1.5">
                        COMPANY NAME
                      </label>
                      <input
                        id="footer-company"
                        type="text"
                        placeholder="Company / Facility"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-sm border border-offwhite/15 bg-charcoal/80 px-3.5 py-2.5 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-oil-gold focus:outline-hidden focus:ring-1 focus:ring-oil-gold/30"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="footer-email" className="block font-mono text-[11px] text-offwhite/60 mb-1.5">
                        WORK EMAIL *
                      </label>
                      <input
                        id="footer-email"
                        required
                        type="email"
                        placeholder="email@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-sm border border-offwhite/15 bg-charcoal/80 px-3.5 py-2.5 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-oil-gold focus:outline-hidden focus:ring-1 focus:ring-oil-gold/30"
                      />
                    </div>

                    <div>
                      <label htmlFor="footer-phone" className="block font-mono text-[11px] text-offwhite/60 mb-1.5">
                        PHONE NUMBER *
                      </label>
                      <input
                        id="footer-phone"
                        required
                        type="tel"
                        placeholder="+91 Mobile / Office"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-sm border border-offwhite/15 bg-charcoal/80 px-3.5 py-2.5 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-oil-gold focus:outline-hidden focus:ring-1 focus:ring-oil-gold/30"
                      />
                    </div>
                  </div>

                  {/* Requirement / Message */}
                  <div>
                    <label htmlFor="footer-message" className="block font-mono text-[11px] text-offwhite/60 mb-1.5">
                      REQUIREMENT / MESSAGE *
                    </label>
                    <textarea
                      id="footer-message"
                      required
                      rows={3}
                      placeholder="Specify product category, viscosity grade, volume requirements, or operational machinery..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-sm border border-offwhite/15 bg-charcoal/80 px-3.5 py-2.5 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-oil-gold focus:outline-hidden focus:ring-1 focus:ring-oil-gold/30 resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="mt-2 w-full rounded-sm bg-oil-gold py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal shadow-[0_0_20px_rgba(217,138,61,0.3)] transition-all hover:bg-oil-gold-light hover:shadow-[0_0_28px_rgba(217,138,61,0.5)] cursor-pointer"
                  >
                    Send Your Requirement →
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Row 2: Full-Width Kenzoil Locations Below Both Columns (Eliminating Gap) */}
          <div className="mt-16 pt-12 border-t border-offwhite/10">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-oil-gold font-bold">
                KENZOIL LOCATIONS
              </span>
              <div className="h-px flex-1 bg-offwhite/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Office */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-2 w-2 rounded-full bg-oil-gold" />
                  <span className="font-mono text-xs font-bold text-offwhite uppercase tracking-wider">
                    COMMERCIAL HEADQUARTERS
                  </span>
                  <span className="font-mono text-[11px] text-offwhite/40">ANKLESHWAR, GUJARAT</span>
                </div>
                <address className="mt-1 text-sm text-offwhite/75 not-italic leading-relaxed pl-5 border-l border-oil-gold/30">
                  {siteInfo.officeAddress}
                </address>
              </div>

              {/* Factory */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  <span className="font-mono text-xs font-bold text-offwhite uppercase tracking-wider">
                    BLENDING &amp; PRODUCTION PLANT
                  </span>
                  <span className="font-mono text-[11px] text-offwhite/40">PANOLI G.I.D.C., GUJARAT</span>
                </div>
                <address className="mt-1 text-sm text-offwhite/75 not-italic leading-relaxed pl-5 border-l border-sky-400/30">
                  {siteInfo.factoryAddress}
                </address>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* 04. STRUCTURED INDUSTRIAL NAVIGATION GRID                           */}
      {/* ================================================================== */}
      <div className="py-16 sm:py-20 border-b border-offwhite/10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Col 1: Brand Anchor (4 cols) */}
            <div className="col-span-2 md:col-span-4 lg:col-span-4 flex flex-col justify-between">
              <div>
                <Link href="/" className="inline-flex items-center gap-3 group">
                  <KenzoilLogo size={44} glow />
                  <div className="flex flex-col">
                    <span className="font-extrabold text-xl tracking-wider text-offwhite group-hover:text-oil-gold-light transition-colors">
                      KENZOIL
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-oil-gold">
                      LUBRICANTS ENGINEERING
                    </span>
                  </div>
                </Link>

                <p className="mt-4 text-xs sm:text-sm text-offwhite/60 max-w-sm leading-relaxed">
                  Manufacturers and suppliers of high-grade automotive, industrial, and specialty lubricants.
                  Formulated to safeguard mission-critical systems against friction, extreme thermal shear, and wear.
                </p>
              </div>

              {/* Quick Contact Micro-Links */}
              <div className="mt-8 pt-4 border-t border-offwhite/10 flex flex-col gap-2 font-mono text-xs text-offwhite/60">
                <div className="flex items-center gap-2">
                  <span className="text-oil-gold">TEL:</span>
                  <a href={`tel:${siteInfo.phone.replace(/\s+/g, "")}`} className="hover:text-offwhite transition-colors">
                    {siteInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sky-400">EMAIL:</span>
                  <a href={`mailto:${siteInfo.email}`} className="hover:text-offwhite transition-colors">
                    {siteInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Col 2: Product Categories (3 cols) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-oil-gold block mb-4">
                PRODUCT CATEGORIES
              </span>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-offwhite/70">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/products#${cat.slug}`}
                      className="hover:text-oil-gold transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span className="text-offwhite/20 group-hover:text-oil-gold transition-colors">›</span>
                      <span>{cat.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Company & Story (3 cols) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-oil-gold block mb-4">
                COMPANY &amp; METHOD
              </span>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-offwhite/70">
                <li>
                  <Link href="/about" className="hover:text-oil-gold transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-offwhite/20 group-hover:text-oil-gold transition-colors">›</span>
                    <span>About Kenzoil</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#why-kenzoil" className="hover:text-oil-gold transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-offwhite/20 group-hover:text-oil-gold transition-colors">›</span>
                    <span>Engineering Philosophy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#about-kenzoil" className="hover:text-oil-gold transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-offwhite/20 group-hover:text-oil-gold transition-colors">›</span>
                    <span>Macro Lubrication Tech</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#credibility" className="hover:text-oil-gold transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-offwhite/20 group-hover:text-oil-gold transition-colors">›</span>
                    <span>Kinematic Batch Standards</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-oil-gold transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-offwhite/20 group-hover:text-oil-gold transition-colors">›</span>
                    <span>Plant &amp; Office Coordinates</span>
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-oil-gold transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-offwhite/20 group-hover:text-oil-gold transition-colors">›</span>
                    <span>Complete Product Index</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Technical Assistance & Top Control (2 cols) */}
            <div className="col-span-2 md:col-span-4 lg:col-span-2 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-oil-gold block mb-4">
                  QUICK ACTIONS
                </span>
                <div className="flex flex-col gap-2">
                  <a
                    href={`tel:${siteInfo.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center justify-center rounded-xs border border-offwhite/15 bg-charcoal/60 px-3 py-2 text-xs font-mono text-offwhite hover:border-oil-gold hover:text-oil-gold transition-colors"
                  >
                    CALL TECHNICAL DESK
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xs border border-offwhite/15 bg-charcoal/60 px-3 py-2 text-xs font-mono text-offwhite hover:border-sky-400 hover:text-sky-400 transition-colors"
                  >
                    DIRECT QUOTATION
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center rounded-xs border border-offwhite/15 bg-charcoal/60 px-3 py-2 text-xs font-mono text-offwhite hover:border-offwhite/40 transition-colors"
                  >
                    SEARCH CATALOGUE
                  </Link>
                </div>
              </div>

              {/* Back to top button */}
              <div className="mt-8 pt-4 border-t border-offwhite/10">
                <button
                  type="button"
                  onClick={handleScrollToTop}
                  className="group inline-flex items-center gap-2 text-xs font-mono text-offwhite/60 hover:text-oil-gold transition-colors cursor-pointer"
                  aria-label="Back to top of page"
                >
                  <span className="h-6 w-6 rounded-full border border-offwhite/20 flex items-center justify-center group-hover:border-oil-gold group-hover:-translate-y-0.5 transition-all">
                    ↑
                  </span>
                  <span>BACK TO TOP</span>
                </button>
              </div>
            </div>

          </div>
        </Container>
      </div>

      {/* ================================================================== */}
      {/* 05. GRAND ARCHITECTURAL WATERMARK & BRAND SIGNATURE                 */}
      {/* ================================================================== */}
      <div className="relative py-16 sm:py-20 border-b border-offwhite/10 overflow-hidden select-none">
        {/* Clearly Discernible Architectural Watermark */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none opacity-[0.18] text-offwhite font-black tracking-tighter text-[18vw] leading-none"
        >
          KENZOIL
        </div>

        <Container className="relative z-10 flex flex-col items-center text-center">
          {/* Official Kenzoil Emblem Signature */}
          <div className="relative mb-3">
            <KenzoilLogo size={58} glow />
          </div>

          <span className="font-extrabold text-2xl sm:text-3xl tracking-wider text-offwhite">
            KENZOIL
          </span>

          <span className="mt-1 font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-oil-gold font-medium">
            Keep Moving, Stay Ahead
          </span>
        </Container>
      </div>

      {/* ================================================================== */}
      {/* 06. UTILITY & LEGAL BAR                                            */}
      {/* ================================================================== */}
      <div className="py-6 bg-[#040507]">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-offwhite/50">
          <p>
            &copy; {currentYear} Kenzoil Lubricants. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="hover:text-offwhite transition-colors cursor-default">
              ISO-Compliant Quality Practices
            </span>
            <span>•</span>
            <span className="hover:text-offwhite transition-colors cursor-default">
              Panoli GIDC Blending Plant
            </span>
            <span>•</span>
            <span className="hover:text-offwhite transition-colors cursor-default">
              Ankleshwar Commercial HQ
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
