import { categories, productsByCategory } from "@/lib/products";

export default function Products() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-charcoal">Our Products</h1>
      <p className="mt-3 max-w-2xl text-charcoal-light">
        Automotive, industrial, and textile lubricants, plus metal working,
        rubber process, transformer, white oil, and grease — browse by
        category below.
      </p>

      <div className="mt-12 flex flex-col gap-16">
        {categories.map((category) => {
          const items = productsByCategory(category.slug);
          return (
            <section key={category.slug} id={category.slug}>
              <h2 className="text-2xl font-semibold text-oil-gold">
                {category.name}
              </h2>

              {items.length === 0 ? (
                <p className="mt-4 text-sm italic text-charcoal-light/70">
                  Product listings for this category are being finalised —
                  check back soon.
                </p>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <div
                      key={product.slug}
                      className="flex flex-col rounded-lg border border-charcoal/10 bg-offwhite p-6"
                    >
                      <h3 className="text-lg font-semibold text-charcoal">
                        {product.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-light">
                        {product.description}
                      </p>
                      <a
                        href="#"
                        className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium text-oil-gold hover:text-rust"
                      >
                        Download catalogue →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
