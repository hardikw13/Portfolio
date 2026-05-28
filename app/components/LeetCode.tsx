"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Code2, CheckCircle2 } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = {
  total: 24,
  totalAvailable: 3944,
  easy:   { solved: 16, total: 946,  color: "#00b8a3", rgb: "0,184,163" },
  medium: { solved: 8,  total: 2061, color: "#ffc01e", rgb: "255,192,30" },
  hard:   { solved: 0,  total: 937,  color: "#ff375f", rgb: "255,55,95" },
  acceptance: "68.9%",
  globalRank: "#3,803,978",
  streak: 11,
};

type Difficulty = "Easy" | "Medium" | "Hard";

interface LiveProblem {
  title: string;
  titleSlug: string;
  difficulty: Difficulty;
  lang: string;
  topic: string;
  link: string;
  solvedAt: string;
}

function diffColor(d: Difficulty) {
  return d === "Easy" ? "#00b8a3" : d === "Medium" ? "#ffc01e" : "#ff375f";
}
function diffRgb(d: Difficulty) {
  return d === "Easy" ? "0,184,163" : d === "Medium" ? "255,192,30" : "255,55,95";
}

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60)  return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function LeetCodeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

// Circular progress ring
function RingProgress({ solved, total }: { solved: number; total: number }) {
  const radius = 54;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const pct = solved / total;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg width="128" height="128" className="absolute inset-0 -rotate-90">
        <circle cx="64" cy="64" r={normalizedRadius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <motion.circle
          cx="64" cy="64" r={normalizedRadius}
          fill="none" stroke="#f59e0b" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - pct) }}
          transition={{ duration: 1.4, ease, delay: 0.3 }}
          style={{ filter: "drop-shadow(0 0 6px rgba(245,158,11,0.6))" }}
        />
      </svg>
      <div className="text-center z-10">
        <motion.p
          className="text-3xl font-black text-amber-400 leading-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {solved}
        </motion.p>
        <p className="text-[10px] text-[#6b7280] mt-1">/ {total.toLocaleString()}</p>
      </div>
    </div>
  );
}

function DiffBar({ label, solved, total, color, rgb, delay }: {
  label: string; solved: number; total: number;
  color: string; rgb: string; delay: number;
}) {
  const pct = (solved / total) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
          style={{ background: `rgba(${rgb},0.15)`, color, border: `1px solid rgba(${rgb},0.3)` }}>
          {label}
        </span>
        <span className="text-xs text-[#6b7280]">
          <span className="text-white font-semibold">{solved}</span> / {total.toLocaleString()}
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, rgba(${rgb},0.5))`, boxShadow: `0 0 8px rgba(${rgb},0.4)` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, delay, ease }}
        />
      </div>
    </div>
  );
}

// Skeleton shimmer for the live card while loading
function ProblemSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse">
      <div className="w-12 h-12 rounded-2xl bg-white/[0.06] flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/[0.06] rounded w-2/3" />
        <div className="h-3 bg-white/[0.04] rounded w-1/3" />
        <div className="h-3 bg-white/[0.04] rounded w-1/2" />
      </div>
    </div>
  );
}

export default function LeetCode() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [problem, setProblem] = useState<LiveProblem | null>(null);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch("/api/leetcode");
        if (!res.ok) throw new Error("non-ok");
        const data: LiveProblem = await res.json();
        if (!cancelled) setProblem(data);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    // Re-fetch every 5 minutes while the tab is open
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  return (
    <section id="leetcode" className="section" ref={ref}>
      <div className="container">

        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="text-amber-400 text-xs font-semibold tracking-[0.15em] uppercase mb-4"
        >
          Competitive Coding
        </motion.p>
        <div className="flex items-end justify-between mb-14 gap-4">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
              className="text-4xl sm:text-5xl font-black text-white"
            >
              LeetCode <span className="text-amber-gradient">track.</span>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            href="https://leetcode.com/u/hardik_1303/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-amber-400 transition-colors flex-shrink-0"
          >
            <LeetCodeIcon size={14} />
            View Profile
            <ArrowUpRight size={13} />
          </motion.a>
        </div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="card p-8 sm:p-10"
        >
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

            {/* Left — ring */}
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <LeetCodeIcon size={16} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">hardik_1303</p>
                  <p className="text-[#6b7280] text-xs">LeetCode Profile</p>
                </div>
              </div>
              <RingProgress solved={stats.total} total={stats.totalAvailable} />
              <p className="text-xs text-[#6b7280] text-center lg:text-left">
                Problems solved out of {stats.totalAvailable.toLocaleString()} total
              </p>
            </div>

            {/* Middle — difficulty bars */}
            <div className="flex-1 space-y-6 justify-center flex flex-col">
              <DiffBar label="Easy"   {...stats.easy}   delay={0.4} />
              <DiffBar label="Medium" {...stats.medium} delay={0.55} />
              <DiffBar label="Hard"   {...stats.hard}   delay={0.7} />
            </div>

            {/* Right — stat pills */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {[
                { label: "Acceptance",  val: stats.acceptance,        color: "#f59e0b", rgb: "245,158,11" },
                { label: "Global Rank", val: stats.globalRank,        color: "#8b5cf6", rgb: "139,92,246" },
                { label: "AC Problems", val: String(stats.total),     color: "#10b981", rgb: "16,185,129" },
                { label: "Day Streak",  val: `${stats.streak}d`,      color: "#f97316", rgb: "249,115,22" },
              ].map(({ label, val, color, rgb }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease }}
                  className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border"
                  style={{ background: `rgba(${rgb},0.06)`, borderColor: `rgba(${rgb},0.2)` }}
                >
                  <p className="text-xl font-black" style={{ color }}>{val}</p>
                  <p className="text-[10px] text-[#6b7280] uppercase tracking-widest mt-1 text-center">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Live: last solved problem ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease }}
          className="mt-5 card p-6 sm:p-8"
        >
          {/* Label row */}
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <p className="text-xs text-[#4b5563] uppercase tracking-widest font-medium">
              Last solved
            </p>
            {/* Live indicator */}
            <span className="ml-auto flex items-center gap-1.5 text-[10px] text-[#4b5563]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              live
            </span>
          </div>

          {/* Content */}
          {loading && <ProblemSkeleton />}

          {!loading && error && (
            <div className="flex items-center gap-3 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <p className="text-sm text-[#6b7280]">
                Could not load LeetCode data.{" "}
                <a href="https://leetcode.com/u/hardik_1303/" target="_blank" rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors">
                  View profile →
                </a>
              </p>
            </div>
          )}

          {!loading && !error && problem && (() => {
            const dc = diffColor(problem.difficulty);
            const dr = diffRgb(problem.difficulty);
            return (
              <a
                href={problem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-center gap-5 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-200"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `rgba(${dr},0.12)`, border: `1px solid rgba(${dr},0.3)` }}
                >
                  <Code2 size={20} style={{ color: dc }} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                      {problem.title}
                    </h3>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: `rgba(${dr},0.12)`, color: dc, border: `1px solid rgba(${dr},0.3)` }}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <span className="text-xs text-[#6b7280]">{problem.topic}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[#6b7280]">
                      {problem.lang}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4b5563]">
                    Solved {timeAgo(problem.solvedAt)}
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-[#4b5563] group-hover:text-amber-400 transition-colors flex-shrink-0 self-start sm:self-center"
                />
              </a>
            );
          })()}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-6 flex justify-center"
        >
          <a
            href="https://leetcode.com/u/hardik_1303/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-amber-400 transition-colors"
          >
            <LeetCodeIcon size={13} />
            View full profile on LeetCode
            <ArrowUpRight size={13} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
