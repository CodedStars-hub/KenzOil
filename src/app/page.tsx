import Link from "next/link";
import Container from "@/components/Container";
import FadeUp from "@/components/motion/FadeUp";
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

      <section className="bg-charcoal-light text-offwhite">
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr]">
            <FadeUp>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Why Kenzoil
              </h2>
              <p className="mt-4 border-l-2 border-oil-gold pl-4 text-sm text-offwhite/70">
                ISO 9001:2015 certified for quality management, reflecting
                consistent performance across every product we manufacture
                and supply.
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="max-w-xl text-lg leading-relaxed text-offwhite/80">
                The purpose of Kenzoil Lubes is to honourably serve the needs
                of our customers by producing premium, world-class
                lubricants at a fair price. The satisfaction of the customer
                is our prime task and responsibility.
              </p>
              <Link
                href="/about"
                className="mt-5 inline-block text-oil-gold-light underline decoration-oil-gold-light/40 underline-offset-4 transition-colors hover:text-offwhite hover:decoration-offwhite/60"
              >
                Learn more about us
              </Link>
            </FadeUp>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 md:py-28">
          <FadeUp className="flex flex-col items-start gap-5">
            <h2 className="text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
              Get in touch
            </h2>
            <p className="max-w-lg text-charcoal-light/80">
              Have a question about our lubricants or need a quote? Reach out
              and our team will get back to you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-sm bg-oil-gold px-7 py-3 font-medium text-charcoal transition-colors hover:bg-oil-gold-light"
            >
              Contact Us
            </Link>
          </FadeUp>
        </Container>
      </section>
    </div>
  );
}
