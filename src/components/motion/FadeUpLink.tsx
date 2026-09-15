"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, hoverLift } from "@/lib/motion";

const MotionLink = motion.create(Link);

export default function FadeUpLink({
  href,
  children,
  className = "",
  delay = 0,
  lift = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  lift?: boolean;
}) {
  return (
    <MotionLink
      href={href}
      className={className}
      {...fadeUp(delay)}
      whileHover={lift ? hoverLift : undefined}
    >
      {children}
    </MotionLink>
  );
}
