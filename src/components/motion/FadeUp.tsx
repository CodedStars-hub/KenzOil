"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, hoverLift } from "@/lib/motion";

export default function FadeUp({
  children,
  delay = 0,
  className = "",
  lift = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  lift?: boolean;
}) {
  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={lift ? hoverLift : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
