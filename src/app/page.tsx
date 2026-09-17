import Link from "next/link";
import Container from "@/components/Container";
import FadeUp from "@/components/motion/FadeUp";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyKenzoil from "@/components/WhyKenzoil";
import CinematicLogoReveal from "@/components/CinematicLogoReveal";
import AboutKenzoil from "@/components/AboutKenzoil";
import GlowCarousel from "@/components/motion/GlowCarousel";
import OilVortex from "@/components/motion/OilVortex";
import StaggerText from "@/components/motion/StaggerText";
import { categories } from "@/lib/products";

const carouselItems = categories.map((category, index) => ({
  slug: category.slug,
  name: category.name,
  index,
}));

export default function Home() {
  return (
    <div>
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-charcoal text-offwhite pt-20 pb-14 md:pt-28 md:pb-18">
        <Container className="relative z-10 flex flex-col items-center text-center">
          <FadeUp delay={0.05} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-oil-gold/30 bg-charcoal-light/60 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-oil-gold-light backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-oil-gold" />
              Industrial &amp; Automotive Lubricants
            </span>
          </FadeUp>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            <StaggerText text="Keep Moving, Stay Ahead" />
          </h1>

          <FadeUp delay={0.8} className="flex flex-col items-center">
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-offwhite/80">
              Automotive, industrial, and specialty lubricants engineered and
              supplied by Kenzoil — built for engines and machinery that
              can&apos;t afford to stop.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-sm bg-oil-gold px-7 py-3 font-medium text-charcoal shadow-[0_0_24px_-4px_rgba(217,138,61,0.5)] transition-all hover:bg-oil-gold-light hover:shadow-[0_0_32px_-2px_rgba(217,138,61,0.7)]"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm border border-offwhite/30 bg-charcoal/40 px-7 py-3 font-medium text-offwhite backdrop-blur-xs transition-colors hover:border-offwhite hover:bg-offwhite/10"
              >
                Request a Quote
              </Link>
            </div>
          </FadeUp>

          {/* Grand Center-Stage Oil Centerpiece */}
          <FadeUp delay={1.05} className="mt-12 flex w-full justify-center md:mt-16">
            <OilVortex />
          </FadeUp>

          {/* Minimal Bottom Scroll Indicator */}
          <FadeUp delay={1.25} className="mt-10 flex flex-col items-center gap-2 text-offwhite/40 md:mt-14">
            <span className="font-mono text-xs uppercase tracking-widest text-offwhite/50">
              Scroll to explore
            </span>
            <div className="flex h-8 w-4.5 justify-center rounded-full border border-offwhite/20 p-1">
              <span className="h-1.5 w-1 rounded-full bg-oil-gold animate-bounce" />
            </div>
          </FadeUp>
        </Container>
      </section>

      <section className="bg-charcoal">
        <Container className="pt-20 md:pt-28">
          <FadeUp className="flex flex-col gap-3 border-b border-offwhite/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-offwhite md:text-4xl">
              Our Products
            </h2>
            <p className="max-w-sm text-offwhite/70">
              Eight categories of lubricants and greases, browsable below.
            </p>
          </FadeUp>
        </Container>

        <div className="mt-10 pb-20 md:pb-28">
          <GlowCarousel items={carouselItems} />
        </div>
      </section>

      <FeaturedProducts />

      <WhyKenzoil />

      <CinematicLogoReveal />

      <AboutKenzoil />
    </div>
  );
}
