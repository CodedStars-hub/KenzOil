"use client";

import type { FormEvent } from "react";

// TODO(Web3Forms integration): this form is UI-only for now — no submission
// logic is wired up yet (client doesn't have a Web3Forms account/email set
// up). When ready, per CLAUDE.md sections 3 and 9:
//   1. Get a Web3Forms access key and put it in `.env.local` as
//      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY (see .env.example).
//   2. On submit, POST JSON { access_key, name, email, phone, message } to
//      https://api.web3forms.com/submit and handle success/error state.
//   3. Add client-side validation (required fields, email format) and
//      inline error messages before submitting.
function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

const fieldClasses =
  "mt-1.5 w-full rounded-sm border border-charcoal/20 bg-offwhite px-3.5 py-2.5 text-charcoal transition-colors focus:border-oil-gold focus:outline-none focus:ring-1 focus:ring-oil-gold/40";
const labelClasses = "block text-sm font-medium text-charcoal";

export default function ContactForm() {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input id="name" name="name" type="text" className={fieldClasses} />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input id="email" name="email" type="email" className={fieldClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelClasses}>
          Phone
        </label>
        <input id="phone" name="phone" type="tel" className={fieldClasses} />
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea id="message" name="message" rows={5} className={fieldClasses} />
      </div>

      <button
        type="submit"
        className="mt-1 inline-flex w-fit items-center justify-center rounded-sm bg-oil-gold px-7 py-3 font-medium text-charcoal transition-colors hover:bg-oil-gold-light"
      >
        Send message
      </button>
    </form>
  );
}
