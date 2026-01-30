"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  isLeft: boolean;
}

interface FoxSpiritTrailProps {
  children: React.ReactNode;
  className?: string;
}

// Fox Paw SVG Component
function FoxPawPrint({ isLeft = false }: { isLeft?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-cyan-400 drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]"
      style={{ transform: isLeft ? "scaleX(-1)" : "none" }}
    >
      {/* Main pad */}
      <ellipse cx="12" cy="16" rx="5" ry="4" opacity="0.9" />
      {/* Toe beans */}
      <circle cx="7" cy="10" r="2.5" opacity="0.85" />
      <circle cx="12" cy="7" r="2.5" opacity="0.85" />
      <circle cx="17" cy="10" r="2.5" opacity="0.85" />
    </svg>
  );
}

export function FoxSpiritTrail({ children, className = "" }: FoxSpiritTrailProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const lastPosition = useRef<{ x: number; y: number } | null>(null);
  const pawCounter = useRef(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isHovering) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate distance from last paw
      if (lastPosition.current) {
        const dx = x - lastPosition.current.x;
        const dy = y - lastPosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Only add a paw if we've moved enough distance (spacing between paws)
        if (distance < 25) return;

        // Calculate rotation based on movement direction
        const rotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x,
          y,
          rotation,
          isLeft: pawCounter.current % 2 === 0,
        };

        pawCounter.current++;
        setParticles((prev) => [...prev.slice(-12), newParticle]);
      }

      lastPosition.current = { x, y };
    },
    [isHovering]
  );

  const handleMouseEnter = () => {
    setIsHovering(true);
    lastPosition.current = null;
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTimeout(() => setParticles([]), 800);
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Paw prints container */}
      <div className="pointer-events-none absolute inset-0 overflow-visible">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                left: particle.x,
                top: particle.y,
                transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.5, 1, 0.8],
                opacity: [0, 0.9, 0],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <FoxPawPrint isLeft={particle.isLeft} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Kitsune spirit core glow on hover */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "radial-gradient(ellipse at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%)",
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
