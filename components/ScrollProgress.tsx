"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[49] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, rgb(var(--accent-purple)), rgb(var(--accent-cyan)), rgb(var(--accent-pink)))",
        boxShadow: "0 0 20px rgb(var(--accent-purple) / 0.5)",
      }}
    />
  );
}
