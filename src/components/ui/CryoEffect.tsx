"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IceCrystal {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  type: "snowflake" | "crystal" | "shard";
}

export function CryoEffect({ count = 20 }: { count?: number }) {
  const [crystals, setCrystals] = useState<IceCrystal[]>([]);

  useEffect(() => {
    const types: IceCrystal["type"][] = ["snowflake", "crystal", "shard"];
    const newCrystals: IceCrystal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 16,
      rotation: Math.random() * 360,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 8,
      type: types[Math.floor(Math.random() * types.length)],
    }));
    setCrystals(newCrystals);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99] overflow-hidden">
      {crystals.map((crystal) => (
        <motion.div
          key={crystal.id}
          className="absolute"
          style={{
            left: `${crystal.x}%`,
            top: `${crystal.y}%`,
          }}
          initial={{
            opacity: 0,
            y: 0,
            rotate: crystal.rotation,
            scale: 0,
          }}
          animate={{
            opacity: [0, 0.4, 0.4, 0],
            y: [0, 100, 200],
            x: [0, Math.sin(crystal.id) * 50, Math.sin(crystal.id) * 30],
            rotate: [crystal.rotation, crystal.rotation + 180, crystal.rotation + 360],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: crystal.duration,
            delay: crystal.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {crystal.type === "snowflake" && (
            <Snowflake size={crystal.size} />
          )}
          {crystal.type === "crystal" && (
            <IceCrystalShape size={crystal.size} />
          )}
          {crystal.type === "shard" && (
            <IceShard size={crystal.size} />
          )}
        </motion.div>
      ))}

      {/* Frost vignette overlay */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(147, 197, 253, 0.05) 100%)",
        }}
      />
    </div>
  );
}

function Snowflake({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]"
    >
      <path
        d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"
        stroke="url(#snowGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="url(#snowGradient)" />
      <defs>
        <linearGradient id="snowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IceCrystalShape({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 20 30"
      fill="none"
      className="drop-shadow-[0_0_10px_rgba(147,197,253,0.9)]"
    >
      <polygon
        points="10,0 20,10 15,30 5,30 0,10"
        fill="url(#crystalGradient)"
        opacity="0.7"
      />
      <polygon
        points="10,5 15,12 12,25 8,25 5,12"
        fill="url(#crystalInner)"
        opacity="0.5"
      />
      <defs>
        <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="50%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="crystalInner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IceShard({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size * 0.3,
        height: size,
        background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(147,197,253,0.6) 50%, rgba(59,130,246,0.3) 100%)",
        clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        boxShadow: "0 0 10px rgba(147,197,253,0.8)",
      }}
    />
  );
}

// Hover effect component for cryo freeze
export function CryoHover({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        filter: isHovered ? "brightness(1.2) saturate(1.3)" : "brightness(1) saturate(1)",
      }}
      transition={{ duration: 0.3 }}
    >
      {children}

      {/* Frost border effect on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered
            ? "inset 0 0 20px rgba(147,197,253,0.4), 0 0 15px rgba(147,197,253,0.3)"
            : "none",
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(147,197,253,0.1) 0%, transparent 50%, rgba(147,197,253,0.1) 100%)"
            : "transparent",
        }}
      />
    </motion.div>
  );
}
