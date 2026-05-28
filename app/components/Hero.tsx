"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, MapPin } from "lucide-react";
import HeroAnimation from "./HeroAnimation";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center overflow-hidden grid-bg">

      {/* Ambient blobs */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)" }} />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(100,160,255,0.04) 0%, transparent 65%)" }} />

      {/* ── Neural network — absolute full right half, outside parallax ── */}
      <div
        className="absolute top-0 right-0 bottom-0 hidden lg:block"
        style={{ width: "52%", zIndex: 5 }}
      >
        <HeroAnimation />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full pt-24 pb-20">
        <div className="container">
          {/* ── Left: Text — max half width ── */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/[0.08] bg-white/[0.03] text-xs text-[#9ca3af] mb-8 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-dot" />
              Available for internships &amp; collaborations
              <span className="text-amber-400 font-medium">· B.Tech CSE 2024–28</span>
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(56px,9vw,110px)] font-black leading-none tracking-tight text-white"
              >
                Hardik
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-7">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(56px,9vw,110px)] font-black leading-none tracking-tight text-amber-gradient"
              >
                Wadhwa
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7"
            >
              <p className="text-white/90 text-lg font-medium leading-snug mb-2">
                Building intelligent systems and sleek digital experiences with creativity and clean code.
              </p>
              <p className="text-[#6b7280] text-sm leading-relaxed">
                Passionate about blending technology, design, and innovation into projects that feel modern and impactful.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-1.5 text-sm text-[#6b7280] mb-10"
            >
              <MapPin size={13} />
              Gurugram, Haryana, India
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.a
                href="/Hardik_Wadhw_CV.docx" download="Hardik_Wadhwa_CV.docx"
                className="group relative inline-flex items-center gap-4 text-sm font-semibold text-white"
                style={{ padding: "14px 28px" }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 rounded-xl"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #3b82f6, #8b5cf6, #f59e0b)", backgroundSize: "300% 300%", animation: "gradientShift 4s ease infinite" }} />
                <span className="absolute rounded-[10px] bg-[#0f0f0f] group-hover:bg-[#141414] transition-colors duration-200"
                  style={{ inset: "1.5px", zIndex: 0 }} />
                <Download size={14} className="relative text-amber-400 group-hover:translate-y-0.5 transition-transform duration-200" style={{ zIndex: 1, flexShrink: 0 }} />
                <span className="relative" style={{ zIndex: 1 }}>Career Snapshot</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
