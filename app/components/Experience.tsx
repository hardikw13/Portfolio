"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle2, Calendar, MapPin, X, ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const jobs = [
  {
    id: 1,
    role: "AI Intern",
    company: "1STOP.AI",
    year: "2025",
    period: "Mar 2025 – Apr 2025",
    location: "Remote",
    type: "Internship",
    accentColor: "#8b5cf6",
    accentRgb: "139,92,246",
    summary: "Built & trained ML models on real-world structured datasets achieving 75%+ accuracy.",
    tagline: "Built & trained ML models on real-world datasets",
    points: [
      "Built and trained ML models in Python on structured datasets",
      "Preprocessed and cleaned 1000+ records for model training",
      "Achieved 75%+ model accuracy through iterative optimization",
      "Used Git for version control and collaborative development",
    ],
    tags: ["Python", "Machine Learning", "Pandas", "Git", "Scikit-learn"],
    stat: { value: "75%+", label: "Model Accuracy" },
  },
  {
    id: 2,
    role: "UGC NEP Saarthi",
    company: "Government of India",
    year: "2025",
    period: "Aug 2025 – Present",
    location: "India",
    type: "Government Initiative",
    accentColor: "#10b981",
    accentRgb: "16,185,129",
    summary: "Selected by UGC to lead NEP awareness campaigns, debates and student engagement initiatives.",
    tagline: "Leading NEP awareness campaigns across campus",
    points: [
      "Led NEP awareness campaigns, skits, and debates across campus",
      "Organized student engagement initiatives and workshops",
      "Demonstrated strong leadership and communication skills",
      "Represented the institution at national-level events",
    ],
    tags: ["Leadership", "Communication", "Event Management", "Public Speaking"],
    stat: { value: "100+", label: "Students Engaged" },
  },
  {
    id: 3,
    role: "Treasurer",
    company: "Adventure Club, BMU",
    year: "2025",
    period: "Aug 2025 – Present",
    location: "Gurugram",
    type: "Club Leadership",
    accentColor: "#06b6d4",
    accentRgb: "6,182,212",
    summary: "Managing club finances, budgeting and resource planning for all Adventure Club activities.",
    tagline: "Managing finances & operations of the Adventure Club",
    points: [
      "Managed club finances and budgeting for all events",
      "Oversaw expense tracking and resource planning",
      "Supported smooth execution of adventure activities",
      "Collaborated with club leadership on strategic planning",
    ],
    tags: ["Finance", "Budgeting", "Planning", "Team Collaboration"],
    stat: { value: "Club", label: "Treasurer" },
  },
  {
    id: 4,
    role: "Hospitality Lead",
    company: "EIS 4.0 Conference, BMU",
    year: "2025",
    period: "2025",
    location: "Gurugram, BMU",
    type: "Conference Role",
    accentColor: "#f59e0b",
    accentRgb: "245,158,11",
    summary: "Led end-to-end hospitality operations for BMU's flagship EIS 4.0 conference.",
    tagline: "Led hospitality for BMU's flagship EIS 4.0 conference",
    points: [
      "Managed end-to-end hospitality for delegates and guests at EIS 4.0",
      "Coordinated with teams to ensure smooth guest experience",
      "Handled logistics, seating, and on-ground operations",
      "Demonstrated leadership under pressure in a high-footfall event",
    ],
    tags: ["Event Management", "Leadership", "Coordination", "Hospitality"],
    stat: { value: "EIS", label: "4.0 Lead" },
  },
];

type Job = typeof jobs[0];

function FlashCard({ job, onClose }: { job: Job; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />
      <div className="relative min-h-full flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.35, ease }}
        className="relative w-full max-w-2xl mx-auto bg-[#111111] rounded-3xl overflow-hidden border border-white/[0.1]"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: `0 0 80px rgba(${job.accentRgb},0.12), 0 32px 64px rgba(0,0,0,0.7)` }}
      >
        {/* Top accent bar */}
        <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${job.accentColor}, transparent)` }} />

        {/* Header */}
        <div className="px-6 sm:px-12 pt-8 sm:pt-10 pb-7 border-b border-white/[0.06]">

          {/* Top row: badge + stat + close */}
          <div className="flex items-start justify-between gap-6 mb-5 ml-0 sm:ml-2">
            <span className="px-3 py-1 text-[11px] font-semibold border rounded-full"
              style={{ color: job.accentColor, borderColor: `rgba(${job.accentRgb},0.3)`, background: `rgba(${job.accentRgb},0.08)` }}>
              {job.type}
            </span>
            <div className="flex items-start gap-4 flex-shrink-0">
              <div className="text-right">
                <div className="text-2xl font-black leading-none" style={{ color: job.accentColor, fontFamily: "var(--font-geist-mono)" }}>{job.stat.value}</div>
                <div className="text-[10px] text-[#6b7280] mt-0.5">{job.stat.label}</div>
              </div>
              <button onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/[0.1] text-[#6b7280] hover:text-white hover:border-white/25 transition-colors flex-shrink-0">
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Role */}
          <h3
            className="text-2xl font-black text-white mb-2 leading-tight break-words pr-4"
            style={{ fontFamily: "var(--font-geist-sans)", letterSpacing: "-0.02em" }}
          >
            {job.role}
          </h3>

          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-sm font-bold" style={{ color: job.accentColor }}>{job.company}</span>
            <ArrowUpRight size={13} style={{ color: job.accentColor }} />
          </div>

          <div className="flex flex-wrap gap-5 text-[11px] text-[#6b7280]">
            <span className="flex items-center gap-1.5"><Calendar size={11} />{job.period}</span>
            <span className="flex items-center gap-1.5"><MapPin size={11} />{job.location}</span>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 sm:px-12 py-6 sm:py-8">
          <p
            className="text-sm text-[#9ca3af] italic border-l-2 pl-4 mb-7 leading-relaxed"
            style={{ borderColor: `rgba(${job.accentRgb},0.4)`, fontFamily: "var(--font-geist-mono)" }}
          >
            {job.tagline}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
            {job.points.map((p) => (
              <div key={p} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] min-w-0">
                <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: job.accentColor }} />
                <span className="text-xs text-[#9ca3af] leading-relaxed break-words min-w-0">{p}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pb-2">
            {job.tags.map((t) => (
              <span key={t} className="px-3 py-1 text-[11px] rounded-full border border-white/[0.08] text-[#6b7280] whitespace-nowrap">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState<Job | null>(null);

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container">

        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="text-amber-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4 text-center"
        >
          Experience
        </motion.p>
        <div className="overflow-hidden mb-40">
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="text-4xl sm:text-5xl font-black text-white text-center"
          >
            Where I&apos;ve <span className="text-amber-gradient">made impact.</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative pt-55">

          {/* Centre vertical line */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden lg:block"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            style={{ background: "rgba(255,255,255,0.07)", transformOrigin: "top" }}
          />

          <div className="space-y-12">
            {jobs.map((job, i) => {
              const isLeft = i % 2 === 0;
              const isActive = selected?.id === job.id;

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.13, ease }}
                  className="relative flex items-center lg:grid lg:grid-cols-2 gap-0"
                >
                  {/* LEFT side card */}
                  {isLeft ? (
                    <>
                      <div className="lg:pr-12 w-full">
                        <motion.button
                          onClick={() => setSelected(isActive ? null : job)}
                          className="w-full rounded-3xl border overflow-hidden"
                          animate={{
                            borderColor: isActive ? `rgba(${job.accentRgb},0.5)` : "rgba(255,255,255,0.07)",
                            boxShadow: isActive ? `0 0 50px rgba(${job.accentRgb},0.12)` : "0 0 0px transparent",
                          }}
                          whileHover={{ y: -4, borderColor: `rgba(${job.accentRgb},0.3)` }}
                          whileTap={{ scale: 0.99 }}
                          transition={{ duration: 0.3, ease }}
                        >
                          {/* Accent top strip */}
                          <motion.div
                            className="h-[3px] w-full"
                            style={{ background: `linear-gradient(90deg, ${job.accentColor}, transparent)` }}
                            animate={{ opacity: isActive ? 1 : 0.4 }}
                          />
                          <div className="px-5 sm:px-10 py-6 sm:py-10 text-center"
                            style={{ background: isActive ? `rgba(${job.accentRgb},0.04)` : "rgba(255,255,255,0.02)" }}>
                            {/* Type badge */}
                            <div className="flex justify-center mb-4">
                              <span className="px-3 py-1 text-[11px] font-medium border rounded-full"
                                style={{ color: job.accentColor, borderColor: `rgba(${job.accentRgb},0.3)`, background: `rgba(${job.accentRgb},0.08)` }}>
                                {job.type}
                              </span>
                            </div>
                            <h3 className="text-xl font-black text-white mb-1">{job.role}</h3>
                            <p className="text-sm font-semibold mb-4" style={{ color: job.accentColor }}>{job.company}</p>
                            <p className="text-sm text-[#6b7280] leading-relaxed mb-6">{job.summary}</p>
                            <div className="flex items-center justify-center gap-4 text-[11px] text-[#4b5563]">
                              <span className="flex items-center gap-1.5"><Calendar size={10} />{job.period}</span>
                              <span className="flex items-center gap-1.5"><MapPin size={10} />{job.location}</span>
                            </div>
                            <motion.div
                              className="mt-4 text-[11px]"
                              animate={{ color: isActive ? job.accentColor : "#374151" }}
                            >
                              {isActive ? "↑ collapse" : "↓ view details"}
                            </motion.div>
                          </div>
                        </motion.button>
                      </div>

                      {/* Centre dot */}
                      <div className="hidden lg:flex justify-start pl-0 items-center absolute left-1/2 -translate-x-1/2">
                        <motion.div
                          className="w-4 h-4 rounded-full border-[3px] border-[#080808] z-10"
                          style={{ background: job.accentColor }}
                          animate={{ scale: isActive ? 1.6 : 1, boxShadow: isActive ? `0 0 14px ${job.accentColor}` : "none" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      {/* Right empty */}
                      <div className="hidden lg:block" />
                    </>
                  ) : (
                    <>
                      {/* Left empty */}
                      <div className="hidden lg:block" />

                      {/* Centre dot */}
                      <div className="hidden lg:flex justify-start pl-0 items-center absolute left-1/2 -translate-x-1/2">
                        <motion.div
                          className="w-4 h-4 rounded-full border-[3px] border-[#080808] z-10"
                          style={{ background: job.accentColor }}
                          animate={{ scale: isActive ? 1.6 : 1, boxShadow: isActive ? `0 0 14px ${job.accentColor}` : "none" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      <div className="lg:pl-12 w-full">
                        <motion.button
                          onClick={() => setSelected(isActive ? null : job)}
                          className="w-full rounded-3xl border overflow-hidden"
                          animate={{
                            borderColor: isActive ? `rgba(${job.accentRgb},0.5)` : "rgba(255,255,255,0.07)",
                            boxShadow: isActive ? `0 0 50px rgba(${job.accentRgb},0.12)` : "0 0 0px transparent",
                          }}
                          whileHover={{ y: -4, borderColor: `rgba(${job.accentRgb},0.3)` }}
                          whileTap={{ scale: 0.99 }}
                          transition={{ duration: 0.3, ease }}
                        >
                          <motion.div
                            className="h-[3px] w-full"
                            style={{ background: `linear-gradient(90deg, ${job.accentColor}, transparent)` }}
                            animate={{ opacity: isActive ? 1 : 0.4 }}
                          />
                          <div className="px-5 sm:px-10 py-6 sm:py-10 text-center"
                            style={{ background: isActive ? `rgba(${job.accentRgb},0.04)` : "rgba(255,255,255,0.02)" }}>
                            <div className="flex justify-center mb-4">
                              <span className="px-3 py-1 text-[11px] font-medium border rounded-full"
                                style={{ color: job.accentColor, borderColor: `rgba(${job.accentRgb},0.3)`, background: `rgba(${job.accentRgb},0.08)` }}>
                                {job.type}
                              </span>
                            </div>
                            <h3 className="text-xl font-black text-white mb-1">{job.role}</h3>
                            <p className="text-sm font-semibold mb-4" style={{ color: job.accentColor }}>{job.company}</p>
                            <p className="text-sm text-[#6b7280] leading-relaxed mb-6">{job.summary}</p>
                            <div className="flex items-center justify-center gap-4 text-[11px] text-[#4b5563]">
                              <span className="flex items-center gap-1.5"><Calendar size={10} />{job.period}</span>
                              <span className="flex items-center gap-1.5"><MapPin size={10} />{job.location}</span>
                            </div>
                            <motion.div
                              className="mt-4 text-[11px]"
                              animate={{ color: isActive ? job.accentColor : "#374151" }}
                            >
                              {isActive ? "↑ collapse" : "↓ view details"}
                            </motion.div>
                          </div>
                        </motion.button>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Flash card modal */}
      <AnimatePresence>
        {selected && <FlashCard job={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
