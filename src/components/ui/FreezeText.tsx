"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface FreezeTextProps {
  children: string;
  className?: string;
  interval?: number;
  freezeDuration?: number;
}

export function FreezeText({
  children,
  className = "",
  interval = 12000,
  freezeDuration = 2000,
}: FreezeTextProps) {
  const controls = useAnimation();
  const iceControls = useAnimation();

  useEffect(() => {
    const triggerFreeze = async () => {
      // Start freeze effect
      await Promise.all([
        // Text gets frozen - turns blue and shakes slightly
        controls.start({
          filter: "brightness(1.5) saturate(2) hue-rotate(-20deg)",
          scale: [1, 1.02, 0.98, 1],
          transition: { duration: 0.3 },
        }),
        // Ice overlay appears
        iceControls.start({
          opacity: 1,
          transition: { duration: 0.2 },
        }),
      ]);

      // Hold frozen state
      await new Promise((resolve) => setTimeout(resolve, freezeDuration - 600));

      // Thaw effect
      await Promise.all([
        controls.start({
          filter: "brightness(1) saturate(1) hue-rotate(0deg)",
          scale: 1,
          transition: { duration: 0.5 },
        }),
        iceControls.start({
          opacity: 0,
          transition: { duration: 0.5 },
        }),
      ]);
    };

    // Initial delay before first freeze
    const initialTimeout = setTimeout(() => {
      triggerFreeze();
    }, 4000);

    // Regular interval
    const intervalId = setInterval(() => {
      triggerFreeze();
    }, interval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [controls, iceControls, interval, freezeDuration]);

  return (
    <motion.span className={`relative inline-block ${className}`} animate={controls}>
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Ice crystal overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        initial={{ opacity: 0 }}
        animate={iceControls}
      >
        {/* Frost texture */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(147, 197, 253, 0.4) 0%, transparent 30%),
              radial-gradient(circle at 80% 20%, rgba(191, 219, 254, 0.3) 0%, transparent 25%),
              radial-gradient(circle at 50% 80%, rgba(96, 165, 250, 0.3) 0%, transparent 35%),
              radial-gradient(circle at 10% 70%, rgba(147, 197, 253, 0.2) 0%, transparent 20%),
              radial-gradient(circle at 90% 60%, rgba(191, 219, 254, 0.25) 0%, transparent 25%)
            `,
            mixBlendMode: "screen",
          }}
        />

        {/* Ice cracks */}
        <svg className="absolute inset-0 h-full w-full" style={{ mixBlendMode: "overlay" }}>
          <defs>
            <linearGradient id="iceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 L30,45 L50,60 L70,40 L100,55"
            stroke="url(#iceGradient)"
            strokeWidth="1"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M20,0 L25,30 L15,60 L30,100"
            stroke="url(#iceGradient)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M80,0 L75,40 L85,70 L70,100"
            stroke="url(#iceGradient)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </motion.div>

      {/* Frozen glow effect */}
      <motion.span
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={iceControls}
        style={{
          boxShadow: "0 0 20px rgba(147, 197, 253, 0.6), 0 0 40px rgba(96, 165, 250, 0.4), inset 0 0 15px rgba(191, 219, 254, 0.3)",
          borderRadius: "2px",
        }}
      />

      {/* Ice particles that appear during freeze */}
      <motion.div
        className="pointer-events-none absolute -inset-2 z-30"
        initial={{ opacity: 0 }}
        animate={iceControls}
      >
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-blue-200"
            style={{
              left: `${15 + i * 15}%`,
              top: `${Math.random() * 100}%`,
              fontSize: "8px",
              textShadow: "0 0 4px #93c5fd",
            }}
            animate={{
              y: [0, -5, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            ❄
          </motion.span>
        ))}
      </motion.div>
    </motion.span>
  );
}
