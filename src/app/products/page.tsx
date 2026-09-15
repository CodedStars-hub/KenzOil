import Container from "@/components/Container";
import FadeUp from "@/components/motion/FadeUp";
import { glowCard } from "@/lib/styles";
import { categories, productsByCategory } from "@/lib/products";

export default function Products() {
  return (
    <div>
      <Container className="py-16 md:py-20">
        <FadeUp>
          <h1 className="text-4xl font-semibold tracking-tight text-charcoal md:text-5xl">
            Our Products
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-charcoal-light/80">
            Automotive, industrial, and textile lubricants, plus metal
            working, rubber process, transformer, white oil, and grease —
            browse by category below.
          </p>
        </FadeUp>
      </Container>

      <div className="flex flex-col gap-16 pb-24 md:gap-20 md:pb-32">
        {categories.map((category, index) => {
          const items = productsByCategory(category.slug);
          const hasItems = items.length > 0;

          return (
            <section key={category.slug} id={category.slug} className="scroll-mt-24">
              <Container>
                <FadeUp className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-charcoal/15 pb-4">
                  <span className="font-mono text-sm text-oil-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl font-semibold tracking-tight text-charcoal sm:text-2xl">
                    {category.name}
                  </h2>
                  {hasItems && (
                    <span className="ml-auto text-sm text-charcoal-light/60">
                      {items.length} product{items.length === 1 ? "" : "s"}
                    </span>
                  )}
                </FadeUp>

                {!hasItems && (
                  <FadeUp className="mt-6 border border-dashed border-charcoal/20 px-6 py-8 text-sm text-charcoal-light/70">
                    Product listings for this category are being finalised —
                    check back soon.
                  </FadeUp>
                )}
              </Container>

              {hasItems && (
                <div className="mt-8 bg-charcoal py-12 md:py-16">
                  <Container>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((product, productIndex) => (
                        <FadeUp
                          key={product.slug}
                          delay={productIndex * 0.05}
                          lift
                          className={`flex flex-col p-6 ${glowCard}`}
                        >
                          <h3 className="text-lg font-medium text-offwhite">
                            {product.name}
                          </h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-offwhite/70">
                            {product.description}
                          </p>
                          <a
                            href="#"
                            className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-oil-gold-light underline decoration-oil-gold-light/40 underline-offset-4 transition-colors hover:text-oil-gold hover:decoration-oil-gold"
                          >
                            Download catalogue
                            <span aria-hidden="true">↓</span>
                          </a>
                        </FadeUp>
                      ))}
                    </div>
                  </Container>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
