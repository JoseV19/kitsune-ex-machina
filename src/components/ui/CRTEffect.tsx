"use client";

import { motion } from "framer-motion";

export function CRTEffect() {
  return (
    <>
      {/* Scanlines */}
      <div className="crt-scanlines" aria-hidden="true" />

      {/* Subtle noise texture */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[9997] opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </>
  );
}
