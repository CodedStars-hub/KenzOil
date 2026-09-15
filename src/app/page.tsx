import Link from "next/link";
import Container from "@/components/Container";
import { categories } from "@/lib/products";

export default function Home() {
  return (
    <div>
      <section className="bg-charcoal text-offwhite">
        <Container className="py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Keep Moving, Stay Ahead
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-offwhite/75">
              Automotive, industrial, and specialty lubricants engineered and
              supplied by Kenzoil — built for engines and machinery that
              can&apos;t afford to stop.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm bg-oil-gold px-7 py-3 font-medium text-charcoal transition-colors hover:bg-oil-gold-light"
              >
                Contact Us
              </Link>
              <span className="inline-flex items-center gap-2 border border-offwhite/20 px-4 py-2 text-sm text-offwhite/70">
                ISO 9001:2015 Certified
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-20 md:py-28">
          <div className="flex flex-col gap-3 border-b border-charcoal/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
              Our Products
            </h2>
            <p className="max-w-sm text-charcoal-light/80">
              Eight categories of lubricants and greases, browsable below.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/products#${category.slug}`}
                className="group flex min-h-40 flex-col justify-between bg-offwhite p-6 transition-colors hover:bg-charcoal"
              >
                <span className="font-mono text-sm text-oil-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium leading-snug text-charcoal transition-colors group-hover:text-offwhite">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-charcoal-light text-offwhite">
        <Container className="py-20 md:py-28">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Why Kenzoil
              </h2>
              <p className="mt-4 border-l-2 border-oil-gold pl-4 text-sm text-offwhite/70">
                ISO 9001:2015 certified for quality management, reflecting
                consistent performance across every product we manufacture
                and supply.
              </p>
            </div>
            <div>
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
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="flex flex-col items-start gap-5 py-20 md:py-28">
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
        </Container>
      </section>
    </div>
  );
}
