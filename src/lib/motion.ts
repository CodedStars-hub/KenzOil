export function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.45, delay, ease: "easeOut" },
  } as const;
}

// Framer's own whileHover — a CSS `hover:` class can't move `transform`
// here because framer-motion leaves an inline `transform` style behind
// after the fade-up entrance finishes, and inline styles always win over
// a class. whileHover overrides that same inline style cleanly instead.
export const hoverLift = {
  y: -4,
  transition: { duration: 0.2, ease: "easeOut" },
} as const;
