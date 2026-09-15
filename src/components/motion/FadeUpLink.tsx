"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

const MotionLink = motion.create(Link);

export default function FadeUpLink({
  href,
  children,
  className = "",
  delay = 0,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <MotionLink href={href} className={className} {...fadeUp(delay)}>
      {children}
    </MotionLink>
  );
}
