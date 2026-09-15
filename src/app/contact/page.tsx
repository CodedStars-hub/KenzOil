import ContactForm from "@/components/ContactForm";
import { siteInfo } from "@/lib/site";

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-charcoal">Contact Us</h1>
      <p className="mt-3 max-w-2xl text-charcoal-light">
        Have a question about our lubricants or need a quote? Send us a
        message and our team will get back to you.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ContactForm />

        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-semibold text-oil-gold">
              Contact information
            </h2>
            <p className="mt-2 text-charcoal-light">Phone: {siteInfo.phone}</p>
            <p className="text-charcoal-light">Email: {siteInfo.email}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-oil-gold">
              Factory Address
            </h2>
            <p className="mt-2 text-charcoal-light">{siteInfo.factoryAddress}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-oil-gold">
              Office Address
            </h2>
            <p className="mt-2 text-charcoal-light">{siteInfo.officeAddress}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-oil-gold">
              Opening Hours
            </h2>
            <p className="mt-2 text-charcoal-light">{siteInfo.hours.weekdays}</p>
            <p className="text-charcoal-light">{siteInfo.hours.sunday}</p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-lg font-semibold text-oil-gold">Find Us</h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-charcoal/10">
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
      </div>
    </div>
  );
}
