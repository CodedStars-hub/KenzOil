import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import FadeUp from "@/components/motion/FadeUp";
import { siteInfo } from "@/lib/site";

const infoBlocks = [
  {
    label: "Phone & email",
    lines: [siteInfo.phone, siteInfo.email],
    mono: true,
  },
  {
    label: "Factory address",
    lines: [siteInfo.factoryAddress],
    mono: false,
  },
  {
    label: "Office address",
    lines: [siteInfo.officeAddress],
    mono: false,
  },
  {
    label: "Opening hours",
    lines: [siteInfo.hours.weekdays, siteInfo.hours.sunday],
    mono: false,
  },
];

export default function Contact() {
  return (
    <div>
      <Container className="py-16 md:py-20">
        <FadeUp>
          <h1 className="text-4xl font-semibold tracking-tight text-charcoal md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-charcoal-light/80">
            Have a question about our lubricants or need a quote? Send us a
            message and our team will get back to you.
          </p>
        </FadeUp>
      </Container>

      <Container className="pb-20 md:pb-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          <FadeUp className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-oil-gold">
              Send a message
            </h2>
            <div className="mt-5">
              <ContactForm />
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-oil-gold">
              Contact information
            </h2>
            <div className="mt-5 flex flex-col divide-y divide-charcoal/10 border-t border-charcoal/10">
              {infoBlocks.map((block) => (
                <div key={block.label} className="py-5 first:pt-0">
                  <p className="text-sm font-medium text-charcoal">
                    {block.label}
                  </p>
                  {block.lines.map((line) => (
                    <p
                      key={line}
                      className={`mt-1 text-charcoal-light/80 ${block.mono ? "font-mono text-sm" : ""}`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        <FadeUp className="mt-16">
          <h2 className="text-sm font-semibold text-oil-gold">Find Us</h2>
          <div className="mt-5 overflow-hidden rounded-sm border border-charcoal/15">
            <iframe
              title="Kenzoil office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                siteInfo.officeAddress
              )}&output=embed`}
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block"
            />
          </div>
        </FadeUp>
      </Container>
    </div>
  );
}
