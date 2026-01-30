"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

// Floating pixel hearts and bunny particles
interface DVaParticle {
  id: number;
  x: number;
  y: number;
  type: "heart" | "bunny" | "pixel" | "star";
  size: number;
  duration: number;
  delay: number;
}

export function DVaParticles({ count = 12 }: { count?: number }) {
  const [particles, setParticles] = useState<DVaParticle[]>([]);

  useEffect(() => {
    const types: DVaParticle["type"][] = ["heart", "bunny", "pixel", "star"];
    const newParticles: DVaParticle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: types[Math.floor(Math.random() * types.length)],
      size: 10 + Math.random() * 14,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[98] overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            scale: [0, 1, 1.2, 0],
            y: [0, -50, -150],
            x: [0, Math.sin(particle.id * 0.5) * 30],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          {particle.type === "heart" && <PixelHeart size={particle.size} />}
          {particle.type === "bunny" && <BunnyIcon size={particle.size} />}
          {particle.type === "pixel" && <PixelSquare size={particle.size} />}
          {particle.type === "star" && <PixelStar size={particle.size} />}
        </motion.div>
      ))}
    </div>
  );
}

function PixelHeart({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className="drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
    >
      <rect x="3" y="2" width="2" height="2" fill="#ec4899" />
      <rect x="5" y="2" width="2" height="2" fill="#f472b6" />
      <rect x="9" y="2" width="2" height="2" fill="#ec4899" />
      <rect x="11" y="2" width="2" height="2" fill="#f472b6" />
      <rect x="1" y="4" width="2" height="2" fill="#ec4899" />
      <rect x="3" y="4" width="2" height="2" fill="#f9a8d4" />
      <rect x="5" y="4" width="2" height="2" fill="#fce7f3" />
      <rect x="7" y="4" width="2" height="2" fill="#f472b6" />
      <rect x="9" y="4" width="2" height="2" fill="#f9a8d4" />
      <rect x="11" y="4" width="2" height="2" fill="#f472b6" />
      <rect x="13" y="4" width="2" height="2" fill="#ec4899" />
      <rect x="1" y="6" width="14" height="2" fill="#ec4899" />
      <rect x="3" y="8" width="10" height="2" fill="#db2777" />
      <rect x="5" y="10" width="6" height="2" fill="#be185d" />
      <rect x="7" y="12" width="2" height="2" fill="#9d174d" />
    </svg>
  );
}

function BunnyIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
    >
      {/* Ears */}
      <ellipse cx="8" cy="6" rx="3" ry="5" fill="#f472b6" />
      <ellipse cx="8" cy="6" rx="1.5" ry="3" fill="#fce7f3" />
      <ellipse cx="16" cy="6" rx="3" ry="5" fill="#f472b6" />
      <ellipse cx="16" cy="6" rx="1.5" ry="3" fill="#fce7f3" />
      {/* Face */}
      <circle cx="12" cy="15" r="7" fill="#f472b6" />
      <circle cx="12" cy="15" r="5" fill="#fce7f3" />
      {/* Eyes */}
      <circle cx="9" cy="14" r="1.5" fill="#1f2937" />
      <circle cx="15" cy="14" r="1.5" fill="#1f2937" />
      {/* Nose */}
      <ellipse cx="12" cy="17" rx="1" ry="0.7" fill="#ec4899" />
    </svg>
  );
}

function PixelSquare({ size }: { size: number }) {
  const colors = ["#ec4899", "#f472b6", "#a855f7", "#8b5cf6"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      style={{
        width: size * 0.5,
        height: size * 0.5,
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`,
      }}
    />
  );
}

function PixelStar({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className="drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]"
    >
      <rect x="7" y="0" width="2" height="4" fill="#a855f7" />
      <rect x="7" y="12" width="2" height="4" fill="#a855f7" />
      <rect x="0" y="7" width="4" height="2" fill="#a855f7" />
      <rect x="12" y="7" width="4" height="2" fill="#a855f7" />
      <rect x="6" y="6" width="4" height="4" fill="#c084fc" />
    </svg>
  );
}

// NERF THIS! Click-triggered explosion effect (contained within parent)
export function NerfThisContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isExploding, setIsExploding] = useState(false);
  const [explosionParticles, setExplosionParticles] = useState<{ id: number; angle: number; distance: number }[]>([]);

  const triggerExplosion = useCallback(() => {
    if (isExploding) return;

    setIsExploding(true);
    setExplosionParticles(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i * 360) / 12,
        distance: 40 + Math.random() * 80,
      }))
    );

    setTimeout(() => {
      setIsExploding(false);
      setExplosionParticles([]);
    }, 1200);
  }, [isExploding]);

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onClick={triggerExplosion}
    >
      {children}

      {/* Explosion effect - contained within the card */}
      <AnimatePresence>
        {isExploding && (
          <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center overflow-hidden rounded">
            {/* Pink flash overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-pink-500/30"
            />

            {/* Central flash */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 2, 3], opacity: [1, 0.8, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute h-16 w-16 rounded-full"
              style={{
                background: "radial-gradient(circle, #f472b6 0%, #ec4899 40%, transparent 70%)",
                boxShadow: "0 0 40px #ec4899, 0 0 80px #f472b6",
              }}
            />

            {/* NERF THIS text */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.3, 1.1],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1, times: [0, 0.2, 1] }}
              className="absolute text-xl font-bold text-pink-300"
              style={{
                textShadow: "0 0 10px #ec4899, 0 0 20px #f472b6, 0 0 30px #ec4899",
                fontFamily: "monospace",
              }}
            >
              NERF THIS!
            </motion.div>

            {/* Explosion particles */}
            {explosionParticles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                animate={{
                  x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
                  y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
                  scale: [1, 1.2, 0],
                  opacity: [1, 0.8, 0],
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute"
              >
                <PixelHeart size={14} />
              </motion.div>
            ))}

            {/* Extra sparkles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [1, 0.6, 0],
                  x: (Math.random() - 0.5) * 150,
                  y: (Math.random() - 0.5) * 150,
                }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="absolute h-2 w-2 rounded-full bg-pink-400"
                style={{
                  boxShadow: "0 0 10px #f472b6",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Keep old export for backwards compatibility but deprecated
export function NerfThisEffect({ interval = 15000 }: { interval?: number }) {
  // This is now a no-op - use NerfThisContainer instead
  return null;
}

// GG! text pop effect on click
export function GGPopEffect({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [showGG, setShowGG] = useState(false);
  const [ggPosition, setGGPosition] = useState({ x: 0, y: 0 });

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGGPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setShowGG(true);
    setTimeout(() => setShowGG(false), 800);
  }, []);

  return (
    <div className={`relative cursor-pointer ${className}`} onClick={handleClick}>
      {children}

      <AnimatePresence>
        {showGG && (
          <motion.span
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 1.5, y: -30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute text-sm font-bold text-pink-400"
            style={{
              left: ggPosition.x,
              top: ggPosition.y,
              textShadow: "0 0 10px #ec4899",
            }}
          >
            GG!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
