"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const edu = [
  {
    degree: "B.Tech Computer Science & Engineering",
    school: "BML Munjal University",
    period: "2024 – 2028",
    status: "Current",
    desc: "Pursuing a comprehensive CS degree with focus on AI, ML, Data Structures, and Software Engineering. Active in multiple clubs and government initiatives.",
    tags: ["AI & ML", "Full Stack", "Data Science", "Android"],
  },
  {
    degree: "Higher Secondary (Science) — Class XII",
    school: "Pathfinder Global School",
    period: "2023 – 2024",
    status: "Completed",
    desc: "Completed higher secondary education with PCM + Computer Science, building a strong foundation for engineering.",
    tags: ["PCM", "Computer Science"],
  },
  {
    degree: "Secondary Education — Class X",
    school: "Pathfinder Global School",
    period: "2021 – 2022",
    status: "Completed",
    desc: "Completed secondary education with a strong academic record across core subjects including Science, Mathematics, and English.",
    tags: ["Science", "Mathematics", "English"],
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="section" ref={ref}>
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="text-amber-400 text-xs font-semibold tracking-[0.15em] uppercase mb-4"
        >
          Education
        </motion.p>
        <div className="overflow-hidden mb-14">
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="text-4xl sm:text-5xl font-black text-white"
          >
            Academic <span className="text-amber-gradient">journey.</span>
          </motion.h2>
        </div>

        <div className="space-y-5">
          {edu.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className="card p-6 flex gap-5"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <GraduationCap size={18} className="text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="font-bold text-white">{e.degree}</h3>
                    <p className="text-amber-400 text-sm font-medium mt-0.5">{e.school}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6b7280]">{e.period}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      e.status === "Current"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-white/[0.04] text-[#6b7280] border border-white/[0.06]"
                    }`}>
                      {e.status}
                    </span>
                  </div>
                </div>
                <p className="text-[#9ca3af] text-sm leading-relaxed mb-3">{e.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
