"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const stats = [
  { n: "2+", label: "Internships" },
  { n: "4+", label: "Projects Built" },
  { n: "75%+", label: "ML Accuracy" },
  { n: "1000+", label: "Records Processed" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="text-amber-400 text-xs font-semibold tracking-[0.15em] uppercase mb-4"
        >
          About Me
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.8, ease }}
                className="text-4xl sm:text-5xl font-black text-white leading-tight"
              >
                Building at the<br />
                <span className="text-amber-gradient">intersection</span><br />
                of AI &amp; Code.
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="space-y-4 text-[#9ca3af] leading-relaxed mb-8"
            >
              <p>
                Hey, I&apos;m <span className="text-white font-medium">Hardik Wadhwa</span> — a
                first-year B.Tech Computer Science student at BML Munjal University with a deep
                passion for Artificial Intelligence, Machine Learning, and Android development.
              </p>
              <p>
                I&apos;ve worked as an{" "}
                <span className="text-amber-400 font-medium">AI Intern at 1STOP.AI</span>,
                trained ML models on real datasets, and built Android apps from scratch. Beyond
                code, I lead as a{" "}
                <span className="text-amber-400 font-medium">UGC NEP Saarthi</span> for the
                Government of India.
              </p>
              <p>
                I believe great engineers are also great communicators — so I&apos;m equally
                comfortable presenting ideas as I am writing them in code.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((s) => (
                <div key={s.label} className="card p-4">
                  <div className="text-2xl font-black text-amber-gradient mb-1">{s.n}</div>
                  <div className="text-xs text-[#6b7280]">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 lg:ml-auto">
              {/* Decorative frames */}
              <div className="absolute -inset-3 rounded-[24px] border border-amber-500/15 pointer-events-none" />
              <div className="absolute -inset-6 rounded-[28px] border border-amber-500/07 pointer-events-none" />

              <div className="img-frame w-full h-full relative overflow-hidden">
                {/* Gradient fallback — always visible behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-[#141414] to-[#0f0f0f] flex items-center justify-center">
                  <span className="text-7xl font-black text-amber-gradient select-none">HW</span>
                </div>

                {/* Actual photo — shown when available */}
                {!imgError && (
                  <Image
                    src="/portfolio1.jpg"
                    alt="Hardik Wadhwa"
                    fill
                    className="object-cover relative z-10"
                    priority
                    onError={() => setImgError(true)}
                  />
                )}
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 card px-4 py-3 amber-glow"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot" />
                  <span className="text-xs text-white font-medium">Open to work</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
