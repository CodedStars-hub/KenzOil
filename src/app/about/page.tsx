import Container from "@/components/Container";

export default function About() {
  return (
    <div>
      <Container className="py-16 md:py-20">
        <h1 className="text-4xl font-semibold tracking-tight text-charcoal md:text-5xl">
          About Us
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-light/80">
          We, Kenzoil Lubes, are a customer-caring and relation-building
          organisation, manufacturer of Industrial and Automotive lubricant
          oil, and supplier of Grease. We offer a wide range of
          high-quality, high-performance lubricants that address
          challenging requirements. We operate under the core values of
          quality, reliability, innovation, and performance, with a
          customer-centric approach. Our team brings highly qualified,
          extensive experience from the lubricant industry, constantly
          developing premium quality, low-cost formulas.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-charcoal/10 pt-12 md:grid-cols-2 md:gap-16">
          <div className="border-t-2 border-oil-gold pt-5">
            <h2 className="text-2xl font-semibold tracking-tight text-charcoal">
              Mission
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-charcoal-light/80">
              The purpose of Kenzoil Lubes is to honourably serve the needs
              of our customers by producing premium, world-class lubricants
              at a fair price. The satisfaction of the customer is our
              prime task and responsibility.
            </p>
          </div>

          <div className="border-t-2 border-oil-gold pt-5">
            <h2 className="text-2xl font-semibold tracking-tight text-charcoal">
              Vision
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-charcoal-light/80">
              Kenzoil Lubes aims to become one of the leading brands of
              excellent quality lubricants for automotive and industrial
              applications.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
