"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const cards = [
  { icon: "🏆", title: "Leadership",    color: "#f59e0b", rgb: "245,158,11", items: ["UGC NEP Saarthi", "Club Treasurer", "EIS 4.0 Lead"] },
  { icon: "🎤", title: "Communication", color: "#8b5cf6", rgb: "139,92,246", items: ["Public Speaking", "Debates & Skits", "Event Hosting"] },
  { icon: "🤝", title: "Teamwork",      color: "#06b6d4", rgb: "6,182,212",  items: ["Cross-team Collab", "Club Operations", "Student Initiatives"] },
  { icon: "⚡", title: "Initiative",    color: "#10b981", rgb: "16,185,129", items: ["NEP Campaigns", "Budget Planning", "Event Logistics"] },
  { icon: "🎯", title: "Goal-Oriented", color: "#f43f5e", rgb: "244,63,94",  items: ["75%+ ML Accuracy", "1000+ Records", "National Events"] },
];

export default function Leadership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="leadership" className="section" ref={ref}>
      <div className="container">

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <p className="text-xs text-amber-400 font-semibold tracking-[0.2em] uppercase mb-3">
            Leadership &amp; Activities
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            I don&apos;t just write code —{" "}
            <span className="text-amber-gradient">I lead, build &amp; inspire.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease }}
              className="rounded-2xl border p-5 flex flex-col items-center text-center cursor-default"
              style={{ borderColor: `rgba(${card.rgb},0.2)`, background: `rgba(${card.rgb},0.05)` }}
              whileHover={{
                y: -6,
                borderColor: `rgba(${card.rgb},0.5)`,
                background: `rgba(${card.rgb},0.1)`,
                boxShadow: `0 16px 40px rgba(${card.rgb},0.12)`,
              }}
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <p className="text-sm font-bold text-white mb-4">{card.title}</p>
              <div className="flex flex-col gap-1.5 w-full">
                {card.items.map((item) => (
                  <div
                    key={item}
                    className="px-2 py-1.5 rounded-lg text-[11px] text-[#9ca3af] border border-white/[0.05] bg-white/[0.02]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}