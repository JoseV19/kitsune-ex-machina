"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Code, Cpu, Gamepad2, Dumbbell, Snowflake, Zap, Swords, Heart, Coins, Boxes, Scale, EyeOff, MessageCircle } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Ofuda } from "@/components/ui/Ofuda";
import { FoxSpiritTrail } from "@/components/ui/FoxSpiritTrail";
import { GlitchText } from "@/components/ui/GlitchText";
import { FreezeText } from "@/components/ui/FreezeText";
import { CryoEffect, CryoHover } from "@/components/ui/CryoEffect";
import { DVaParticles, NerfThisContainer, GGPopEffect } from "@/components/ui/DVaEffect";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col p-3 sm:p-4 md:p-8 lg:p-12">
      {/* Snowflake Click Effect */}
      <SnowflakeClickEffect />

      {/* Background Effects - reduced on mobile */}
      <div className="hidden sm:block">
        <Ofuda count={8} />
        <CryoEffect count={10} />
        <DVaParticles count={6} />
      </div>
      <div className="sm:hidden">
        <Ofuda count={4} />
        <CryoEffect count={5} />
        <DVaParticles count={3} />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
      >
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 sm:h-6 sm:w-6 text-glow" />
          <FoxSpiritTrail>
            <h1 className="text-lg sm:text-xl font-bold text-glow cursor-default">KitsuneExMachina</h1>
          </FoxSpiritTrail>
        </div>
        <span className="text-foreground-dim text-xs sm:text-sm">// team.exe</span>
      </motion.header>

      {/* Two Column Layout - stacks on mobile */}
      <div className="grid flex-1 gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        {/* Column 1: Kitsune Frost */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProfileCard
            name="Kitsune Frost"
            colorScheme="frost"
            role="Developer at Zionak Studios"
            hobbies={[
              { icon: <Dumbbell className="h-3 w-3 sm:h-4 sm:w-4" />, label: "Sports" },
              { icon: <Code className="h-3 w-3 sm:h-4 sm:w-4" />, label: "Programming" },
              { icon: <Zap className="h-3 w-3 sm:h-4 sm:w-4" />, label: "Kiriko DPS" },
              { icon: <Coins className="h-3 w-3 sm:h-4 sm:w-4" />, label: "Gambling", hasEasterEgg: true },
            ]}
            projects={[
              {
                icon: <Boxes className="h-3 w-3 sm:h-4 sm:w-4" />,
                name: "Kitsune CRM",
                description: "An enterprise CRM dedicated to facilitating customer control and product inventory management with a futuristic design.",
              },
              {
                icon: <Scale className="h-3 w-3 sm:h-4 sm:w-4" />,
                name: "Glaive Enterprise",
                description: "A system for lawyers that facilitates the drafting of legal documents, law research, and case article justification.",
              },
              {
                icon: <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />,
                name: "Mr. Glep",
                description: "A secret platform for storing future projects that the company will develop.",
              },
            ]}
            discord="kitsunefrost_"
            easterEgg={<KirikoStatus />}
            useGlitch
          />
        </motion.div>

        {/* Column 2: CharlExMachina - Click for NERF THIS! */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <NerfThisContainer>
            <CryoHover>
              <ProfileCard
                name="CharlExMachina"
                colorScheme="machina"
                role="Founder of Zionak Studios"
                hobbies={[
                  { icon: <Gamepad2 className="h-3 w-3 sm:h-4 sm:w-4" />, label: "Mech Optimization" },
                  { icon: <Snowflake className="h-3 w-3 sm:h-4 sm:w-4" />, label: "Cryogenics" },
                  { icon: <Cpu className="h-3 w-3 sm:h-4 sm:w-4" />, label: "Nerf THIS!" },
                ]}
                projects={[
                  {
                    icon: <Boxes className="h-3 w-3 sm:h-4 sm:w-4" />,
                    name: "Kitsune CRM",
                    description: "An enterprise CRM dedicated to facilitating customer control and product inventory management with a futuristic design.",
                  },
                  {
                    icon: <Scale className="h-3 w-3 sm:h-4 sm:w-4" />,
                    name: "Glaive Enterprise",
                    description: "A system for lawyers that facilitates the drafting of legal documents, law research, and case article justification.",
                  },
                  {
                    icon: <Coins className="h-3 w-3 sm:h-4 sm:w-4" />,
                    name: "Pagame",
                    description: "A platform for Latin American freelancers to get paid more easily in their country.",
                  },
                ]}
                discord="charlexmachina"
                easterEgg={<MechStatus />}
                useFreeze
              />
            </CryoHover>
          </NerfThisContainer>
        </motion.div>
      </div>

      {/* Kitsune Guide Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 sm:mt-8 flex justify-center"
      >
        <KitsuneGuideButton />
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-4 sm:mt-8 text-center text-[10px] sm:text-xs text-foreground-dim"
      >
        <GGPopEffect>
          {/* Mobile footer */}
          <div className="sm:hidden">
            <pre className="inline-block cursor-pointer hover:text-pink-400 transition-colors">
{`┌────────────────────────┐
│ Status: ONLINE ██ 100% │
└────────────────────────┘`}
            </pre>
          </div>
          {/* Desktop footer */}
          <div className="hidden sm:block">
            <pre className="inline-block cursor-pointer hover:text-pink-400 transition-colors">
{`┌──────────────────────────────────────┐
│  System Status: ONLINE  ██████ 100%  │
└──────────────────────────────────────┘`}
            </pre>
          </div>
        </GGPopEffect>
      </motion.footer>
    </div>
  );
}

type ColorScheme = "frost" | "machina";

interface Hobby {
  icon: React.ReactNode;
  label: string;
  hasEasterEgg?: boolean;
}

interface Project {
  icon: React.ReactNode;
  name: string;
  description: string;
}

interface ProfileCardProps {
  name: string;
  colorScheme: ColorScheme;
  role: string;
  hobbies: Hobby[];
  projects?: Project[];
  discord?: string;
  easterEgg?: React.ReactNode;
  useGlitch?: boolean;
  useFreeze?: boolean;
}

function ProfileCard({ name, colorScheme, role, hobbies, projects, discord, easterEgg, useGlitch = false, useFreeze = false }: ProfileCardProps) {
  const colors = {
    frost: {
      primary: "text-purple-400",
      secondary: "text-cyan-400",
      tertiary: "text-cyan-400",
      border: "border-purple-500/50",
      glow: "shadow-[0_0_10px_rgba(168,85,247,0.3)] sm:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
      accent: "bg-gradient-to-r from-purple-500/20 to-cyan-500/20",
    },
    machina: {
      primary: "text-purple-700",
      secondary: "text-pink-400",
      tertiary: "text-blue-400",
      border: "border-pink-500/50",
      glow: "shadow-[0_0_10px_rgba(236,72,153,0.3)] sm:shadow-[0_0_15px_rgba(236,72,153,0.3)]",
      accent: "bg-gradient-to-r from-purple-900/20 via-pink-500/20 to-blue-500/20",
    },
  };

  const scheme = colors[colorScheme];

  const renderName = () => {
    const displayName = name.toUpperCase();

    if (useGlitch) {
      return (
        <GlitchText className={scheme.primary} interval={10000} glitchDuration={400}>
          {displayName}
        </GlitchText>
      );
    }

    if (useFreeze) {
      return (
        <FreezeText className={scheme.tertiary || scheme.primary} interval={12000} freezeDuration={2000}>
          {displayName}
        </FreezeText>
      );
    }

    return displayName;
  };

  const NameWrapper = useFreeze ? CryoNameEffect : FoxSpiritTrail;

  return (
    <div className={`h-full rounded ${scheme.border} border ${scheme.glow} ${scheme.accent} p-0.5 sm:p-1`}>
      <div className="h-full bg-background/80 p-2 sm:p-4">
        {/* Name Header - Simplified for mobile */}
        <div className="mb-3 sm:mb-4 text-center">
          <NameWrapper>
            <div className={`text-sm sm:text-base font-bold ${useFreeze ? scheme.tertiary : scheme.primary} cursor-default`}>
              <span className="hidden sm:inline">║ ▓▓▓ </span>
              {renderName()}
              <span className="hidden sm:inline"> ▓▓▓ ║</span>
            </div>
          </NameWrapper>
        </div>

        {/* Divider */}
        <div className={`border-t ${scheme.border} mb-3 sm:mb-4`} />

        {/* Role Section */}
        <ResponsiveAsciiBox title="ROLE" colorClass={scheme.secondary} colorScheme={colorScheme}>
          <p className="text-xs sm:text-sm">{role}</p>
        </ResponsiveAsciiBox>

        {/* Hobbies Section */}
        <ResponsiveAsciiBox title="HOBBIES" colorClass={colorScheme === "frost" ? scheme.primary : colors.machina.tertiary!} colorScheme={colorScheme}>
          <ul className="space-y-1 sm:space-y-2">
            {hobbies.map((hobby, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
              >
                <span className={scheme.secondary}>
                  {hobby.icon}
                </span>
                {hobby.hasEasterEgg ? (
                  <GamblingHobby label={hobby.label} />
                ) : (
                  <span className="truncate">{hobby.label}</span>
                )}
              </motion.li>
            ))}
          </ul>
        </ResponsiveAsciiBox>

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <ResponsiveAsciiBox title="PROJECTS" colorClass={colorScheme === "frost" ? "text-green-400" : "text-purple-400"} colorScheme={colorScheme}>
            <div className="space-y-3 sm:space-y-4">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.15 }}
                  className="group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={colorScheme === "frost" ? "text-cyan-400" : "text-pink-400"}>
                      {project.icon}
                    </span>
                    <span className={`text-xs sm:text-sm font-bold ${colorScheme === "frost" ? "text-cyan-300" : "text-pink-300"}`}>
                      {project.name}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-foreground-dim leading-relaxed pl-5 sm:pl-6">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </ResponsiveAsciiBox>
        )}

        {/* Contact Section */}
        {discord && (
          <ResponsiveAsciiBox title="CONTACT" colorClass={colorScheme === "frost" ? "text-indigo-400" : "text-indigo-400"} colorScheme={colorScheme}>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="flex items-center gap-2 text-xs sm:text-sm"
            >
              <MessageCircle className={`h-3 w-3 sm:h-4 sm:w-4 ${colorScheme === "frost" ? "text-indigo-400" : "text-indigo-400"}`} />
              <span className="text-indigo-300">Discord:</span>
              <span className={`font-mono ${colorScheme === "frost" ? "text-cyan-400" : "text-pink-400"}`}>{discord}</span>
            </motion.div>
          </ResponsiveAsciiBox>
        )}

        {/* Easter Egg */}
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            {easterEgg}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ResponsiveAsciiBox({ title, children, colorClass, colorScheme }: { title: string; children: React.ReactNode; colorClass: string; colorScheme: ColorScheme }) {
  const Wrapper = colorScheme === "frost" ? FoxSpiritTrail : DVaHoverEffect;

  return (
    <div className="mb-3 sm:mb-4">
      <Wrapper>
        <div className={`text-[10px] sm:text-xs ${colorClass} cursor-default font-mono`}>
          <span className="hidden sm:inline">{`┌─[ ${title} ]${"─".repeat(Math.max(0, 26 - title.length))}┐`}</span>
          <span className="sm:hidden font-bold">[{title}]</span>
        </div>
      </Wrapper>
      <div className="border-l-2 sm:border-x border-foreground/20 pl-2 sm:px-3 py-1.5 sm:py-2">
        {children}
      </div>
      <div className={`text-[10px] sm:text-xs ${colorClass} font-mono hidden sm:block`}>
        {`└${"─".repeat(32)}┘`}
      </div>
    </div>
  );
}

// Cryo freeze effect for name hover
function CryoNameEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="relative inline-block"
      whileHover={{
        filter: "brightness(1.3) saturate(1.5)",
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.2), transparent)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}

// D.Va pink hover effect
function DVaHoverEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="relative inline-block"
      whileHover={{
        scale: 1.02,
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        initial={{ opacity: 1 }}
        whileHover={{
          textShadow: "0 0 8px #ec4899, 0 0 16px #f472b6",
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}

// Kiriko & Freja Status for Kitsune Frost
function KirikoStatus() {
  return (
    <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
      {/* Kitsune Spirit Box */}
      <div className="border border-cyan-500/30 rounded bg-cyan-500/5 p-2 sm:p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-cyan-400">🦊</span>
          <span className="text-[10px] sm:text-xs text-cyan-400 font-bold">KITSUNE SPIRIT</span>
        </div>
        <p className="text-[9px] sm:text-[10px] text-cyan-300/80 italic mb-2">
          Mid-level systems engineer by day, Kunai thrower by night
        </p>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-cyan-400">Spirit Link:</span>
            <motion.span
              className="text-cyan-300"
              animate={{
                opacity: [0.5, 1, 0.5],
                textShadow: ["0 0 5px #00ffff", "0 0 15px #00ffff", "0 0 5px #00ffff"]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ● ONLINE
            </motion.span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs">
            <Swords className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-purple-400" />
            <span className="text-purple-300">Kunai</span>
            <span className="ml-auto text-cyan-400">∞</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs">
            <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-cyan-400" />
            <span className="text-cyan-300">Swift Step</span>
            <motion.span
              className="ml-auto text-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              READY
            </motion.span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs">
            <span className="text-yellow-400">🔔</span>
            <span className="text-yellow-300">Protection Suzu</span>
            <motion.span
              className="ml-auto text-green-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              READY
            </motion.span>
          </div>
        </div>
        {/* Freja bond indicator */}
        <div className="mt-2 pt-2 border-t border-cyan-500/20">
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-cyan-400">🦊 Freja Bond:</span>
            <motion.div
              className="flex gap-0.5"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {["💙", "💙", "💙"].map((heart, i) => (
                <motion.span
                  key={i}
                  className="text-[8px]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                >
                  {heart}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Freja Ultimate Box */}
      <div className="border border-purple-500/30 rounded bg-purple-500/5 p-2 sm:p-3">
        <div className="flex items-center gap-2 mb-2">
          <motion.span
            className="text-purple-400"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🦊
          </motion.span>
          <span className="text-[10px] sm:text-xs text-purple-400 font-bold">FREJA - KITSUNE SPIRIT</span>
        </div>
        <p className="text-[9px] sm:text-[10px] text-purple-300/70 mb-2">
          Ancient fox spirit bound by the Yamagami clan
        </p>
        <motion.div
          className="text-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.p
            className="text-[10px] sm:text-xs text-purple-300 italic"
            animate={{
              textShadow: ["0 0 5px #a855f7", "0 0 15px #a855f7", "0 0 5px #a855f7"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            &quot;Addicted to Nordic coffee&quot;
          </motion.p>
          <div className="mt-1.5 flex justify-center gap-1">
            {["狐", "霊", "道"].map((char, i) => (
              <motion.span
                key={i}
                className="text-base sm:text-lg text-cyan-400"
                animate={{
                  opacity: [0.4, 1, 0.4],
                  y: [0, -2, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                style={{ textShadow: "0 0 10px #00ffff" }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
        <div className="mt-2 flex items-center justify-between text-[10px] sm:text-xs">
          <span className="text-purple-400">Kitsune Rush:</span>
          <div className="flex gap-0.5">
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="text-cyan-400 text-[8px] sm:text-xs"
                animate={{ opacity: i < 6 ? 1 : [0.2, 0.5, 0.2] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
              >
                █
              </motion.span>
            ))}
          </div>
        </div>

        {/* Freja abilities */}
        <div className="mt-2 pt-2 border-t border-purple-500/20 space-y-1">
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-cyan-400">⚡ Speed Boost:</span>
            <span className="text-green-400">+50%</span>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-cyan-400">🔥 Attack Speed:</span>
            <span className="text-green-400">+50%</span>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-cyan-400">⏱️ Cooldown:</span>
            <span className="text-yellow-400">-50%</span>
          </div>
        </div>

        {/* Freja quote */}
        <motion.p
          className="mt-2 text-center text-[9px] sm:text-[10px] text-cyan-300/60 italic"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          &quot;Let the Kitsune guide you!&quot; - Kiriko
        </motion.p>
      </div>

    </div>
  );
}

function MechStatus() {
  return (
    <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
      {/* D.Va MEKA Status */}
      <div className="border border-pink-500/30 rounded bg-pink-500/5 p-2 sm:p-3">
        <div className="flex items-center gap-2 mb-2">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🐰
          </motion.span>
          <span className="text-[10px] sm:text-xs text-pink-400 font-bold">D.VA - MEKA STATUS</span>
        </div>
        <p className="text-[9px] sm:text-[10px] text-pink-300/80 italic mb-2">
          Addicted to Meka Coffee, professional systems engineer by day, people freezer by night
        </p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-pink-400">🎮 Fusion Cannons:</span>
            <motion.span
              className="text-green-400"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ONLINE
            </motion.span>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-pink-400">🛡️ Defense Matrix:</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-pink-400 text-[8px] sm:text-xs"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                >
                  █
                </motion.span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-pink-400">🚀 Boosters:</span>
            <motion.span
              className="text-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              READY
            </motion.span>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-pink-400">🎯 Micro Missiles:</span>
            <span className="text-cyan-400">8/8</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-pink-500/20">
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-yellow-400">💥 Self-Destruct:</span>
            <div className="flex gap-0.5">
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-yellow-400 text-[8px] sm:text-xs"
                  animate={{ opacity: i < 4 ? 1 : [0.2, 0.6, 0.2] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                >
                  █
                </motion.span>
              ))}
            </div>
          </div>
        </div>
        <motion.p
          className="mt-2 text-center text-[10px] sm:text-xs font-bold text-pink-400"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          &quot;I play to win!&quot; 🎮
        </motion.p>
      </div>

      {/* Mei Cryo Status */}
      <div className="border border-blue-500/30 rounded bg-blue-500/5 p-2 sm:p-3">
        <div className="flex items-center gap-2 mb-2">
          <motion.span
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ❄️
          </motion.span>
          <span className="text-[10px] sm:text-xs text-blue-400 font-bold">MEI - CRYO STATUS</span>
        </div>
        <p className="text-[9px] sm:text-[10px] text-blue-300/70 mb-2">
          Climatologist & Ice Wall architect
        </p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-blue-400">🔫 Endothermic Blaster:</span>
            <motion.span
              className="text-cyan-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              150/150
            </motion.span>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-blue-400">🧊 Cryo-Freeze:</span>
            <motion.span
              className="text-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              READY
            </motion.span>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-blue-400">🧱 Ice Wall:</span>
            <motion.span
              className="text-green-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              READY
            </motion.span>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-blue-400">🤖 Snowball:</span>
            <motion.div className="flex items-center gap-1">
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ⛄
              </motion.span>
              <span className="text-cyan-300">Happy!</span>
            </motion.div>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-blue-500/20">
          <div className="flex items-center justify-between text-[10px] sm:text-xs">
            <span className="text-cyan-400">🌨️ Blizzard:</span>
            <div className="flex gap-0.5">
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-blue-400 text-[8px] sm:text-xs"
                  animate={{ opacity: i < 5 ? 1 : [0.2, 0.5, 0.2] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                >
                  █
                </motion.span>
              ))}
            </div>
          </div>
        </div>
        <motion.p
          className="mt-2 text-center text-[10px] sm:text-xs font-bold text-blue-300"
          animate={{
            scale: [1, 1.03, 1],
            textShadow: ["0 0 5px #60a5fa", "0 0 15px #60a5fa", "0 0 5px #60a5fa"]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          &quot;A-mei-zing!&quot; ❄️
        </motion.p>
      </div>
    </div>
  );
}

// Gambling hobby with hover easter egg
function GamblingHobby({ label }: { label: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <span
        className="truncate cursor-pointer hover:text-yellow-400 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {label}
      </span>

      {/* Gambling Easter Egg Popup */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 z-50 w-48 sm:w-56"
          >
            <div className="border border-yellow-500/50 rounded bg-background/95 backdrop-blur-sm shadow-[0_0_20px_rgba(250,204,21,0.3)] p-2 sm:p-3">
              <div className="flex items-center gap-2 mb-1">
                <span>🎰</span>
                <span className="text-[10px] sm:text-xs text-yellow-400 font-bold">SECRET</span>
              </div>
              <motion.p
                className="text-center text-[10px] sm:text-xs text-yellow-400"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Gambling Status:
              </motion.p>
              <p className="text-center text-[9px] sm:text-xs text-yellow-300/80">
                99% quit before hitting it big.
              </p>
              <motion.p
                className="text-center text-xs sm:text-sm font-bold text-yellow-400"
                animate={{
                  textShadow: ["0 0 5px #facc15", "0 0 20px #facc15", "0 0 5px #facc15"]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                WE GO AGAIN! 💸
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Fox paw SVG component
function FoxPaw({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Main pad */}
      <ellipse cx="12" cy="16" rx="5" ry="4" />
      {/* Toe beans */}
      <circle cx="7" cy="10" r="2.5" />
      <circle cx="12" cy="8" r="2.5" />
      <circle cx="17" cy="10" r="2.5" />
    </svg>
  );
}

// Mei Snowflake Click Effect
interface Snowflake {
  id: number;
  x: number;
  y: number;
}

function SnowflakeClickEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  const handleClick = useCallback((e: MouseEvent) => {
    const newSnowflake: Snowflake = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };

    setSnowflakes((prev) => [...prev, newSnowflake]);

    // Remove snowflake after animation
    setTimeout(() => {
      setSnowflakes((prev) => prev.filter((s) => s.id !== newSnowflake.id));
    }, 1000);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9997] overflow-hidden">
      <AnimatePresence>
        {snowflakes.map((snowflake) => (
          <motion.div
            key={snowflake.id}
            className="absolute"
            style={{
              left: snowflake.x,
              top: snowflake.y,
            }}
            initial={{ scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              scale: [0, 1.5, 1],
              opacity: [1, 1, 0],
              rotate: [0, 180],
              y: [0, -20],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Mei Snowflake SVG */}
            <svg
              viewBox="0 0 40 40"
              className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-[0_0_10px_rgba(147,197,253,0.8)]"
              style={{ marginLeft: -16, marginTop: -16 }}
            >
              {/* Main hexagon structure */}
              <g fill="none" stroke="#93c5fd" strokeWidth="1.5">
                {/* Center */}
                <circle cx="20" cy="20" r="3" fill="#bfdbfe" />

                {/* 6 main arms */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <g key={i} transform={`rotate(${angle} 20 20)`}>
                    {/* Main arm */}
                    <line x1="20" y1="20" x2="20" y2="5" stroke="#60a5fa" strokeWidth="2" />
                    {/* Side branches */}
                    <line x1="20" y1="10" x2="16" y2="6" />
                    <line x1="20" y1="10" x2="24" y2="6" />
                    <line x1="20" y1="14" x2="17" y2="11" />
                    <line x1="20" y1="14" x2="23" y2="11" />
                    {/* End crystal */}
                    <circle cx="20" cy="5" r="1.5" fill="#bfdbfe" />
                  </g>
                ))}
              </g>

              {/* Inner glow */}
              <circle cx="20" cy="20" r="6" fill="url(#snowGlow)" opacity="0.6" />
              <defs>
                <radialGradient id="snowGlow">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Kitsune Guide Button - Half cyan, half pink with fox paws
function KitsuneGuideButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open("https://studios.zionak.com/es", "_blank");
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer overflow-hidden rounded-lg px-4 py-2.5 sm:px-8 sm:py-4 font-bold text-xs sm:text-base"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: "linear-gradient(90deg, #00ffff 0%, #06b6d4 50%, #ec4899 50%, #f472b6 100%)",
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: isHovered
            ? "0 0 30px rgba(0, 255, 255, 0.6), 0 0 30px rgba(236, 72, 153, 0.6)"
            : "0 0 15px rgba(0, 255, 255, 0.3), 0 0 15px rgba(236, 72, 153, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Inner dark background for text readability */}
      <div className="absolute inset-[2px] rounded-md bg-background/90" />

      {/* Content */}
      <div className="relative flex items-center gap-2 sm:gap-3">
        {/* Left paw - Cyan */}
        <motion.div
          animate={{
            y: isHovered ? [0, -3, 0] : 0,
            rotate: isHovered ? [0, -10, 0] : 0,
          }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
        >
          <FoxPaw className="h-4 w-4 sm:h-6 sm:w-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
        </motion.div>

        {/* Text with split color */}
        <span className="relative">
          <span
            className="bg-clip-text text-transparent hidden sm:inline"
            style={{
              backgroundImage: "linear-gradient(90deg, #00ffff 0%, #06b6d4 45%, #ec4899 55%, #f472b6 100%)",
            }}
          >
            Let the Kitsune Guide You
          </span>
          <span
            className="bg-clip-text text-transparent sm:hidden"
            style={{
              backgroundImage: "linear-gradient(90deg, #00ffff 0%, #06b6d4 45%, #ec4899 55%, #f472b6 100%)",
            }}
          >
            Kitsune Guide
          </span>
        </span>

        {/* Right paw - Pink */}
        <motion.div
          animate={{
            y: isHovered ? [0, -3, 0] : 0,
            rotate: isHovered ? [0, 10, 0] : 0,
          }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, delay: 0.1 }}
        >
          <FoxPaw className="h-4 w-4 sm:h-6 sm:w-6 text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
        </motion.div>
      </div>

      {/* Sparkle particles on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: "50%",
                  y: "50%",
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
                style={{
                  left: 0,
                  top: 0,
                }}
              >
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "#00ffff" : "#ec4899",
                    boxShadow: `0 0 6px ${i % 2 === 0 ? "#00ffff" : "#ec4899"}`,
                  }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
