import Link from "next/link";
import Container from "@/components/Container";
import FadeUp from "@/components/motion/FadeUp";

type FeaturedItem = {
  id: string;
  index: string;
  name: string;
  categorySlug: string;
  categoryLabel: string;
  applicationTag: string;
  description: string;
  visualType: "diesel" | "hydraulic" | "multigrade" | "gear";
};

const featuredProducts: FeaturedItem[] = [
  {
    id: "diesel-engine-oils",
    index: "01",
    name: "Diesel Engine Oils",
    categorySlug: "automotive",
    categoryLabel: "Automotive Lubricants",
    applicationTag: "Heavy Duty Diesel",
    description:
      "Engineered for modern high-performance diesel engines operating in heavy-duty applications including trucks, mining, construction, and power generation sets.",
    visualType: "diesel",
  },
  {
    id: "hydraulic-oils",
    index: "02",
    name: "Kenzoil Hydraulic Oils",
    categorySlug: "industrial",
    categoryLabel: "Industrial Lubricants",
    applicationTag: "Anti-Wear Hydraulic",
    description:
      "Premium quality, transparent anti-wear hydraulic oils blended from high viscosity index base oils, formulated to perform reliably from low to high load conditions.",
    visualType: "hydraulic",
  },
  {
    id: "super-multigrade-engine-oil",
    index: "03",
    name: "Super Multigrade Engine Oil",
    categorySlug: "automotive",
    categoryLabel: "Automotive Lubricants",
    applicationTag: "All-Season Multigrade",
    description:
      "Blended with shear-stable VI improvers, metallic detergent dispersants, and anti-oxidants to meet requirements of gasoline and diesel engines across all seasons.",
    visualType: "multigrade",
  },
  {
    id: "industrial-gear-oils",
    index: "04",
    name: "Kenzoil Industrial Gear Oils",
    categorySlug: "industrial",
    categoryLabel: "Industrial Lubricants",
    applicationTag: "Extreme Pressure (EP)",
    description:
      "Produced with high-quality base oils blended with EP, antioxidant, and anti-corrosion additives to provide high load-carrying capacity in industrial gearing.",
    visualType: "gear",
  },
];

function ProductVisual({ type }: { type: FeaturedItem["visualType"] }) {
  switch (type) {
    case "diesel":
      return (
        <svg
          viewBox="0 0 160 120"
          className="h-24 w-auto text-oil-gold"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Cylinder chamber outline */}
          <rect
            x="35"
            y="20"
            width="90"
            height="80"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          {/* Piston head */}
          <rect
            x="45"
            y="42"
            width="70"
            height="32"
            rx="2"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Pressure rings */}
          <line
            x1="45"
            y1="50"
            x2="115"
            y2="50"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          <line
            x1="45"
            y1="58"
            x2="115"
            y2="58"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          {/* Connecting rod */}
          <path
            d="M 80 74 L 80 100"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Lubrication fluid compression arcs */}
          <path
            d="M 55 30 Q 80 24 105 30"
            stroke="#fff1d6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
          <circle cx="80" cy="27" r="2.5" fill="#e8a855" />
        </svg>
      );

    case "hydraulic":
      return (
        <svg
          viewBox="0 0 160 120"
          className="h-24 w-auto text-oil-gold"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Hydraulic system pressure loops */}
          <circle
            cx="80"
            cy="60"
            r="38"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.3"
            strokeDasharray="4 3"
          />
          {/* Central fluid core */}
          <circle
            cx="80"
            cy="60"
            r="22"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          {/* High-pressure valve conduits */}
          <line
            x1="25"
            y1="60"
            x2="58"
            y2="60"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="102"
            y1="60"
            x2="135"
            y2="60"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="80"
            y1="22"
            x2="80"
            y2="38"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="80"
            y1="82"
            x2="80"
            y2="98"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Flow indicator nodes */}
          <circle cx="42" cy="60" r="3" fill="#e8a855" />
          <circle cx="118" cy="60" r="3" fill="#e8a855" />
          <circle cx="80" cy="60" r="4" fill="#fff1d6" fillOpacity="0.9" />
        </svg>
      );

    case "multigrade":
      return (
        <svg
          viewBox="0 0 160 120"
          className="h-24 w-auto text-oil-gold"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Dual viscosity shear curves */}
          <path
            d="M 30 75 C 55 35, 105 35, 130 75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 30 55 C 60 85, 100 85, 130 55"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
          {/* Intersecting molecular lubrication shear plane */}
          <ellipse
            cx="80"
            cy="65"
            rx="32"
            ry="14"
            stroke="#fff1d6"
            strokeWidth="1.25"
            strokeOpacity="0.75"
            fill="currentColor"
            fillOpacity="0.08"
          />
          {/* Multi-grade rating markers */}
          <circle cx="55" cy="55" r="3.5" fill="#e8a855" />
          <circle cx="80" cy="65" r="3.5" fill="#fff1d6" />
          <circle cx="105" cy="55" r="3.5" fill="#e8a855" />
        </svg>
      );

    case "gear":
      return (
        <svg
          viewBox="0 0 160 120"
          className="h-24 w-auto text-oil-gold"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Interlocking industrial gear pair */}
          {/* Primary gear */}
          <circle
            cx="66"
            cy="60"
            r="24"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <circle cx="66" cy="60" r="7" stroke="currentColor" strokeWidth="1.5" />
          {/* Gear teeth indicators */}
          <path
            d="M 66 30 L 66 36 M 66 84 L 66 90 M 36 60 L 42 60 M 90 60 L 96 60 M 45 40 L 50 44 M 82 76 L 87 80 M 45 80 L 50 76 M 82 44 L 87 40"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
          {/* Secondary smaller pinion gear */}
          <circle
            cx="106"
            cy="50"
            r="16"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="106" cy="50" r="5" stroke="currentColor" strokeWidth="1" />
          {/* Extreme-pressure contact mesh highlight */}
          <circle cx="88" cy="55" r="3" fill="#fff1d6" />
        </svg>
      );
  }
}

export default function FeaturedProducts() {
  return (
    <section className="bg-offwhite py-20 md:py-28">
      <Container>
        {/* Section Header */}
        <FadeUp className="flex flex-col gap-4 border-b border-charcoal/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-oil-gold">
              // Selected Formulations
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
              Featured Products
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-charcoal-light/75">
              A selection of automotive and industrial lubricants engineered for
              engines, machinery, and equipment operating under demanding
              conditions.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-charcoal underline decoration-charcoal/30 underline-offset-4 transition-colors hover:text-oil-gold hover:decoration-oil-gold sm:pb-1"
          >
            <span>View all products</span>
            <span aria-hidden="true">→</span>
          </Link>
        </FadeUp>

        {/* Product Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <FadeUp
              key={product.id}
              delay={index * 0.08}
              lift
              className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-charcoal/10 bg-white transition-all duration-300 hover:border-oil-gold/60 hover:shadow-[0_16px_32px_-12px_rgba(26,26,26,0.12)]"
            >
              <div>
                {/* Visual Emblem Container */}
                <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-charcoal p-6">
                  {/* Subtle ambient glow behind emblem */}
                  <div
                    className="absolute h-32 w-32 rounded-full opacity-20 blur-xl pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(217,138,61,0.8) 0%, transparent 70%)",
                    }}
                  />

                  {/* Application pill badge */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="inline-flex items-center rounded-xs bg-charcoal-light/90 px-2.5 py-1 font-mono text-[10px] tracking-wide text-oil-gold-light border border-oil-gold/20">
                      {product.applicationTag}
                    </span>
                  </div>

                  {/* Bespoke Industrial Vector Graphic */}
                  <div className="relative z-0 transition-transform duration-300 ease-out group-hover:scale-105">
                    <ProductVisual type={product.visualType} />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-oil-gold font-medium">
                      {product.index} // {product.categoryLabel.split(" ")[0]}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-charcoal transition-colors group-hover:text-charcoal">
                    {product.name}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-charcoal-light/75">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="border-t border-charcoal/5 px-6 py-4">
                <Link
                  href={`/products#${product.categorySlug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal transition-colors group-hover:text-oil-gold"
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
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
