"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface OfudaParticle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  duration: number;
  delay: number;
  symbol: string;
}

const SYMBOLS = ["祈", "狐", "霊", "守", "癒", "光", "風", "命"];

export function Ofuda({ count = 12 }: { count?: number }) {
  const [particles, setParticles] = useState<OfudaParticle[]>([]);

  useEffect(() => {
    const newParticles: OfudaParticle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{
            opacity: 0,
            y: 0,
            rotate: particle.rotation,
          }}
          animate={{
            opacity: [0, 0.15, 0.15, 0],
            y: [0, -window.innerHeight * 1.2],
            x: [0, Math.sin(particle.id) * 100],
            rotate: [particle.rotation, particle.rotation + 180],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="relative h-12 w-8 rounded-sm bg-gradient-to-b from-yellow-200 to-yellow-400 shadow-lg">
            {/* Paper texture lines */}
            <div className="absolute inset-x-1 top-1 h-px bg-yellow-600/30" />
            <div className="absolute inset-x-1 top-2 h-px bg-yellow-600/20" />

            {/* Symbol */}
            <div className="flex h-full items-center justify-center">
              <span className="text-sm font-bold text-red-700/80">
                {particle.symbol}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-1 left-1/2 h-2 w-px -translate-x-1/2 bg-red-700/40" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
