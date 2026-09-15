import Link from "next/link";
import Container from "@/components/Container";
import FadeUp from "@/components/motion/FadeUp";
import GlowCarousel from "@/components/motion/GlowCarousel";
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
      <section className="relative overflow-hidden bg-charcoal text-offwhite">
        <Container className="relative z-10 flex flex-col items-center py-24 text-center md:py-28">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            <StaggerText text="Keep Moving, Stay Ahead" />
          </h1>

          <FadeUp delay={0.95} className="flex flex-col items-center">
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-offwhite/75">
              Automotive, industrial, and specialty lubricants engineered and
              supplied by Kenzoil — built for engines and machinery that
              can&apos;t afford to stop.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-sm bg-oil-gold px-7 py-3 font-medium text-charcoal transition-colors hover:bg-oil-gold-light"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm border border-offwhite/30 px-7 py-3 font-medium text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite/5"
              >
                Request a Quote
              </Link>
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
