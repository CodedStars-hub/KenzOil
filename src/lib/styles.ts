// Shared "glow card" treatment: soft oil-gold border-glow + ambient
// drop-shadow bleeding outward, meant to sit on a dark charcoal background.
export const glowCard =
  "rounded-xl border border-oil-gold/30 bg-gradient-to-br from-charcoal-light via-charcoal to-[#141414] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7),0_0_28px_-6px_rgba(217,138,61,0.35)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-oil-gold hover:shadow-[0_28px_56px_-20px_rgba(0,0,0,0.8),0_0_40px_-4px_rgba(217,138,61,0.6)]";
