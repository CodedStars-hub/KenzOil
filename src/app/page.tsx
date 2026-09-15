import Link from "next/link";
import { categories } from "@/lib/products";

export default function Home() {
  return (
    <div>
      <section className="bg-charcoal px-6 py-20 text-offwhite">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-4">
          <p className="text-sm font-medium uppercase tracking-widest text-oil-gold-light">
            Welcome to Kenzoil
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Keep Moving, Stay Ahead
          </h1>
          <p className="max-w-2xl text-charcoal-light text-offwhite/80">
            Kenzoil is an ISO 9001:2015 certified company engaged in the
            manufacturing and supply of automotive, industrial oil, and
            grease. We offer products and related services across Automotive
            Lubricants, Industrial Lubricants, Textile Lubricants, Greases,
            Metal Working Lubricants, Rubber Process Lubricants, White Oil,
            Synthetic Lubricants, and more.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-oil-gold px-6 py-2.5 font-medium text-charcoal transition hover:bg-oil-gold-light"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-charcoal">
            Our Products
          </h2>
          <p className="mt-2 max-w-2xl text-charcoal-light">
            Browse our range by category.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products#${category.slug}`}
                className="rounded-lg border border-charcoal/10 bg-offwhite px-5 py-6 font-medium text-charcoal transition hover:border-oil-gold hover:text-oil-gold"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal-light px-6 py-16 text-offwhite">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold">Why Kenzoil</h2>
          <p className="mt-3 max-w-2xl text-offwhite/80">
            Kenzoil is ISO 9001:2015 certified, reflecting our commitment to
            quality, reliability, and consistent performance across every
            product we manufacture and supply.
          </p>
          <p className="mt-3 max-w-2xl text-offwhite/80">
            The purpose of Kenzoil Lubes is to honourably serve the needs of
            our customers by producing premium, world-class lubricants at a
            fair price. The satisfaction of the customer is our prime task
            and responsibility.
          </p>
          <Link
            href="/about"
            className="mt-4 inline-block font-medium text-oil-gold-light hover:text-oil-gold"
          >
            Learn more about us →
          </Link>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-4">
          <h2 className="text-2xl font-semibold text-charcoal">
            Get in touch
          </h2>
          <p className="max-w-2xl text-charcoal-light">
            Have a question about our lubricants or need a quote? Reach out
            and our team will get back to you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-oil-gold px-6 py-2.5 font-medium text-charcoal transition hover:bg-oil-gold-light"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
