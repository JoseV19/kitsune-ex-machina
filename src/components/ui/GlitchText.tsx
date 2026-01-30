"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface GlitchTextProps {
  children: string;
  className?: string;
  interval?: number;
  glitchDuration?: number;
}

export function GlitchText({
  children,
  className = "",
  interval = 10000,
  glitchDuration = 300,
}: GlitchTextProps) {
  const controls = useAnimation();

  useEffect(() => {
    const triggerGlitch = async () => {
      // Rapid glitch sequence
      for (let i = 0; i < 6; i++) {
        await controls.start({
          x: Math.random() * 4 - 2,
          y: Math.random() * 2 - 1,
          skewX: Math.random() * 5 - 2.5,
          filter: `hue-rotate(${Math.random() * 90}deg)`,
          transition: { duration: 0.05 },
        });
      }
      // Reset
      await controls.start({
        x: 0,
        y: 0,
        skewX: 0,
        filter: "hue-rotate(0deg)",
        transition: { duration: 0.1 },
      });
    };

    // Initial delay before first glitch
    const initialTimeout = setTimeout(() => {
      triggerGlitch();
    }, 3000);

    // Regular interval
    const intervalId = setInterval(() => {
      triggerGlitch();
    }, interval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [controls, interval]);

  return (
    <motion.span className={`relative inline-block ${className}`} animate={controls}>
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Glitch layers */}
      <motion.span
        className="absolute left-0 top-0 z-0 opacity-0"
        style={{ color: "#ff00ff", clipPath: "inset(20% 0 30% 0)" }}
        animate={{
          opacity: [0, 0.8, 0],
          x: [-2, 2, -2],
        }}
        transition={{
          duration: glitchDuration / 1000,
          repeat: Infinity,
          repeatDelay: interval / 1000,
        }}
      >
        {children}
      </motion.span>

      <motion.span
        className="absolute left-0 top-0 z-0 opacity-0"
        style={{ color: "#00ffff", clipPath: "inset(50% 0 10% 0)" }}
        animate={{
          opacity: [0, 0.8, 0],
          x: [2, -2, 2],
        }}
        transition={{
          duration: glitchDuration / 1000,
          repeat: Infinity,
          repeatDelay: interval / 1000,
          delay: 0.05,
        }}
      >
        {children}
      </motion.span>

      {/* Scanline slice effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0"
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: glitchDuration / 1000,
          repeat: Infinity,
          repeatDelay: interval / 1000,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(128, 0, 128, 0.3) 2px, rgba(128, 0, 128, 0.3) 4px)",
          }}
        />
      </motion.div>
    </motion.span>
  );
}
