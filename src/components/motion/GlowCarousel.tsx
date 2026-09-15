"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  animate,
  type MotionValue,
} from "framer-motion";
import { glowCard } from "@/lib/styles";

const CARD_WIDTH = 208;
const GAP = 24;
const STEP = CARD_WIDTH + GAP;

export type CarouselItem = {
  slug: string;
  name: string;
  index: number;
};

function CardFace({ item }: { item: CarouselItem }) {
  return (
    <Link
      href={`/products#${item.slug}`}
      className={`group flex h-56 flex-col justify-between p-6 ${glowCard}`}
    >
      <span className="font-mono text-sm text-oil-gold">
        {String(item.index + 1).padStart(2, "0")}
      </span>
      <span className="text-lg font-medium leading-snug text-offwhite">
        {item.name}
      </span>
    </Link>
  );
}

function CarouselCard({
  item,
  x,
  offset,
  containerWidthRef,
}: {
  item: CarouselItem;
  x: MotionValue<number>;
  offset: number;
  containerWidthRef: { current: number };
}) {
  // Reads containerWidthRef.current at call time (every x tick), rather
  // than closing over a `containerWidth` prop — useTransform keeps using
  // the transformer captured at mount, so a plain prop value that changes
  // later (once the container is measured) would otherwise go stale.
  const scale = useTransform(x, (latest) => {
    const center = offset + latest + CARD_WIDTH / 2;
    const dist = Math.abs(center - containerWidthRef.current / 2);
    const t = Math.min(dist / (STEP * 1.6), 1);
    return 1.16 - t * 0.32;
  });
  const opacity = useTransform(x, (latest) => {
    const center = offset + latest + CARD_WIDTH / 2;
    const dist = Math.abs(center - containerWidthRef.current / 2);
    const t = Math.min(dist / (STEP * 1.6), 1);
    return 1 - t * 0.55;
  });

  return (
    <motion.div style={{ scale, opacity, width: CARD_WIDTH }} className="flex-none">
      <CardFace item={item} />
    </motion.div>
  );
}

export default function GlowCarousel({ items }: { items: CarouselItem[] }) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidthRef = useRef(0);
  const [enhanced, setEnhanced] = useState(false);
  const x = useMotionValue(0);
  const playbackRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setEnhanced(mq.matches && !prefersReducedMotion);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      containerWidthRef.current = el.offsetWidth;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [enhanced]);

  useEffect(() => {
    if (!enhanced) return;
    const loopWidth = items.length * STEP;
    x.set(0);
    playbackRef.current = animate(x, -loopWidth, {
      duration: items.length * 3.5,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => playbackRef.current?.stop();
  }, [enhanced, items, x]);

  if (!enhanced) {
    return (
      <div className="overflow-x-auto px-6 pb-2 [scrollbar-width:thin]">
        <div className="flex w-max gap-6">
          {items.map((item) => (
            <div key={item.slug} className="w-52 flex-none">
              <CardFace item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const doubledItems = [...items, ...items];

  return (
    <div
      ref={containerRef}
      className="overflow-hidden py-6"
      onPointerEnter={() => playbackRef.current?.pause()}
      onPointerLeave={() => playbackRef.current?.play()}
    >
      <motion.div className="flex gap-6" style={{ x }}>
        {doubledItems.map((item, i) => (
          <CarouselCard
            key={`${item.slug}-${i}`}
            item={item}
            x={x}
            offset={i * STEP}
            containerWidthRef={containerWidthRef}
          />
        ))}
      </motion.div>
    </div>
  );
}
