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

export default function ContactForm() {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="mt-1 w-full rounded-md border border-charcoal/20 bg-offwhite px-3 py-2 text-charcoal focus:border-oil-gold focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="mt-1 w-full rounded-md border border-charcoal/20 bg-offwhite px-3 py-2 text-charcoal focus:border-oil-gold focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-charcoal">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="mt-1 w-full rounded-md border border-charcoal/20 bg-offwhite px-3 py-2 text-charcoal focus:border-oil-gold focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="mt-1 w-full rounded-md border border-charcoal/20 bg-offwhite px-3 py-2 text-charcoal focus:border-oil-gold focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex w-fit items-center justify-center rounded-md bg-oil-gold px-6 py-2.5 font-medium text-charcoal transition hover:bg-oil-gold-light"
      >
        Send message
      </button>
    </form>
  );
}
