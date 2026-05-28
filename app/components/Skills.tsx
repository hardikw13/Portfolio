"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const skillTree = [
  {
    id: "languages",
    label: "Languages",
    color: "#8b5cf6",
    rgb: "139,92,246",
    angle: -90,
    skills: [
      { name: "Python", level: 80 },
      { name: "Java", level: 72 },
      { name: "JavaScript", level: 68 },
      { name: "Kotlin", level: 65 },
      { name: "C", level: 60 },
    ],
  },
  {
    id: "ai",
    label: "AI & Data",
    color: "#06b6d4",
    rgb: "6,182,212",
    angle: -30,
    skills: [
      { name: "Pandas", level: 78 },
      { name: "NumPy", level: 75 },
      { name: "Matplotlib", level: 72 },
      { name: "Scikit-learn", level: 70 },
      { name: "EDA", level: 78 },
    ],
  },
  {
    id: "android",
    label: "Android",
    color: "#10b981",
    rgb: "16,185,129",
    angle: 30,
    skills: [
      { name: "Android SDK", level: 70 },
      { name: "XML Layouts", level: 75 },
      { name: "REST API", level: 68 },
      { name: "Java/Kotlin", level: 70 },
    ],
  },
  {
    id: "web",
    label: "Web & Tools",
    color: "#f59e0b",
    rgb: "245,158,11",
    angle: 90,
    skills: [
      { name: "HTML/CSS", level: 75 },
      { name: "Git/GitHub", level: 82 },
      { name: "VS Code", level: 90 },
      { name: "Jupyter", level: 78 },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    color: "#f43f5e",
    rgb: "244,63,94",
    angle: 150,
    skills: [
      { name: "MySQL", level: 70 },
      { name: "MongoDB", level: 60 },
    ],
  },
  {
    id: "concepts",
    label: "Concepts",
    color: "#a78bfa",
    rgb: "167,139,250",
    angle: 210,
    skills: [
      { name: "ML Classification", level: 72 },
      { name: "Supervised Learning", level: 70 },
      { name: "Data Preprocessing", level: 80 },
      { name: "OOP", level: 75 },
    ],
  },
];

const R = 170; // branch radius

function polarToXY(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState<string | null>(null);

  const activeCategory = skillTree.find((c) => c.id === active);

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">

        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="text-amber-400 text-xs font-semibold tracking-[0.15em] uppercase mb-4"
        >
          Technical Skills
        </motion.p>
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="text-4xl sm:text-5xl font-black text-white"
          >
            My <span className="text-amber-gradient">toolkit.</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-[#6b7280] text-sm mb-16"
        >
          Click any branch to explore skills
        </motion.p>

        {/* Tree + detail layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Radial Tree ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="relative flex-shrink-0 w-full max-w-[420px] lg:w-[420px]"
            style={{ aspectRatio: "1 / 1" }}
          >
            <svg
              width="100%" height="100%"
              viewBox="-210 -210 420 420"
              className="absolute inset-0"
            >
              {skillTree.map((cat, i) => {
                const end = polarToXY(cat.angle, R);
                const isActive = active === cat.id;
                return (
                  <motion.line
                    key={cat.id}
                    x1={0} y1={0}
                    x2={end.x} y2={end.y}
                    stroke={cat.color}
                    strokeWidth={isActive ? 2 : 1}
                    strokeOpacity={isActive ? 0.8 : 0.25}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease }}
                  />
                );
              })}
            </svg>

            {/* Centre node */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center z-10"
                style={{ background: "radial-gradient(circle, rgba(245,158,11,0.15), rgba(245,158,11,0.03))", border: "1px solid rgba(245,158,11,0.3)" }}
                animate={{ boxShadow: active ? "0 0 40px rgba(245,158,11,0.2)" : "0 0 20px rgba(245,158,11,0.1)" }}
              >
                <span className="text-xs font-bold text-amber-400 text-center leading-tight">HARD<br/>IK</span>
              </motion.div>
            </div>

            {/* Branch nodes */}
            {skillTree.map((cat, i) => {
              const pos = polarToXY(cat.angle, R);
              const isActive = active === cat.id;
              // Convert SVG coords (viewBox -210..210) to percentage of container
              const leftPct = ((pos.x + 210) / 420) * 100;
              const topPct  = ((pos.y + 210) / 420) * 100;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActive(isActive ? null : cat.id)}
                  className="absolute flex items-center justify-center rounded-2xl text-[10px] sm:text-xs font-bold transition-all"
                  style={{
                    width: "21%",
                    height: "10.5%",
                    left: `calc(${leftPct}% - 10.5%)`,
                    top:  `calc(${topPct}% - 5.25%)`,
                    background: isActive ? `rgba(${cat.rgb},0.18)` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? cat.color : "rgba(255,255,255,0.08)"}`,
                    color: isActive ? cat.color : "#9ca3af",
                    boxShadow: isActive ? `0 0 20px rgba(${cat.rgb},0.25)` : "none",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? {
                    opacity: 1,
                    scale: isActive ? 1.1 : 1,
                  } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {cat.label}
                </motion.button>
              );
            })}
          </motion.div>

          {/* ── Detail panel ── */}
          <div className="flex-1 w-full max-w-md">
            <AnimatePresence mode="wait">
              {activeCategory ? (
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease }}
                >
                  {/* Category header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: activeCategory.color }} />
                      <h3 className="text-2xl font-black text-white">{activeCategory.label}</h3>
                    </div>
                    <p className="text-sm text-[#6b7280]">{activeCategory.skills.length} skills</p>
                  </div>

                  {/* Skill bars */}
                  <div className="space-y-5">
                    {activeCategory.skills.map((skill, si) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: si * 0.07, ease }}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-white">{skill.name}</span>
                          <span className="text-xs text-[#6b7280]">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${activeCategory.color}, rgba(${activeCategory.rgb},0.5))` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.9, delay: si * 0.07, ease }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-64 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <p className="text-[#6b7280] text-sm">Select a branch to explore skills</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* All tech badges marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <p className="text-[10px] text-[#4b5563] uppercase tracking-widest text-center mb-6">Tech Stack</p>

          {/* Outer wrapper with edge fade masks */}
          <div
            className="relative overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            {/* Subtle glow line above */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

            <div className="flex overflow-hidden py-3">
              <div className="marquee-track flex gap-3 whitespace-nowrap">
                {[
                  { name: "Python",              color: "#3b82f6" },
                  { name: "Java",                color: "#f59e0b" },
                  { name: "Kotlin",              color: "#8b5cf6" },
                  { name: "JavaScript",          color: "#eab308" },
                  { name: "C",                   color: "#6b7280" },
                  { name: "Android SDK",         color: "#10b981" },
                  { name: "REST API",            color: "#06b6d4" },
                  { name: "Pandas",              color: "#3b82f6" },
                  { name: "NumPy",               color: "#06b6d4" },
                  { name: "Matplotlib",          color: "#f59e0b" },
                  { name: "Scikit-learn",        color: "#f43f5e" },
                  { name: "MySQL",               color: "#06b6d4" },
                  { name: "MongoDB",             color: "#10b981" },
                  { name: "Git",                 color: "#f43f5e" },
                  { name: "VS Code",             color: "#3b82f6" },
                  { name: "Jupyter",             color: "#f59e0b" },
                  { name: "HTML",                color: "#f97316" },
                  { name: "CSS",                 color: "#3b82f6" },
                  { name: "EDA",                 color: "#a78bfa" },
                  { name: "Supervised Learning", color: "#10b981" },
                  // duplicate for seamless loop
                  { name: "Python",              color: "#3b82f6" },
                  { name: "Java",                color: "#f59e0b" },
                  { name: "Kotlin",              color: "#8b5cf6" },
                  { name: "JavaScript",          color: "#eab308" },
                  { name: "C",                   color: "#6b7280" },
                  { name: "Android SDK",         color: "#10b981" },
                  { name: "REST API",            color: "#06b6d4" },
                  { name: "Pandas",              color: "#3b82f6" },
                  { name: "NumPy",               color: "#06b6d4" },
                  { name: "Matplotlib",          color: "#f59e0b" },
                  { name: "Scikit-learn",        color: "#f43f5e" },
                  { name: "MySQL",               color: "#06b6d4" },
                  { name: "MongoDB",             color: "#10b981" },
                  { name: "Git",                 color: "#f43f5e" },
                  { name: "VS Code",             color: "#3b82f6" },
                  { name: "Jupyter",             color: "#f59e0b" },
                  { name: "HTML",                color: "#f97316" },
                  { name: "CSS",                 color: "#3b82f6" },
                  { name: "EDA",                 color: "#a78bfa" },
                  { name: "Supervised Learning", color: "#10b981" },
                ].map((t, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium flex-shrink-0 transition-colors"
                    style={{
                      background: `${t.color}14`,
                      border: `1px solid ${t.color}40`,
                      color: t.color,
                      boxShadow: `0 0 10px ${t.color}18`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: t.color, boxShadow: `0 0 6px ${t.color}` }}
                    />
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Subtle glow line below */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
