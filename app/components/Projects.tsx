"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ExternalLink } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

type Project = {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  longDesc: string;
  tags: string[];
  highlights: string[];
  github: string;
  live: string | null;
  img: string;
  imgAlt: string;
};

const projects: Project[] = [
  {
    num: "01",
    title: "Thealgorimistic",
    subtitle: "DSA Visual Learning Website",
    desc: "A responsive educational website for visualizing Data Structures and Algorithms through interactive animations.",
    longDesc:
      "Thealgorimistic is a fully responsive educational platform built to make learning Data Structures and Algorithms intuitive and visual. It features step-by-step animated breakdowns of sorting algorithms (bubble, merge, quick), searching algorithms (binary, linear), and tree traversals. Each visualization is interactive — users can control speed, input custom data, and watch the algorithm execute in real time.",
    tags: ["HTML", "CSS", "JavaScript"],
    highlights: ["Responsive Design", "Interactive Viz", "DSA Coverage"],
    github: "https://github.com/hardikw13",
    live: null,
    img: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&q=80",
    imgAlt: "Sorting algorithm visualization with colored bars",
  },
  {
    num: "02",
    title: "Image Classification",
    subtitle: "ML Model Training",
    desc: "Trained a deep learning image classification model on 300+ custom images, improving accuracy from 62% to 78%.",
    longDesc:
      "A deep learning project focused on training a custom image classification model from scratch. The dataset consisted of 300+ manually collected and labeled images across multiple categories. Through iterative experimentation with data augmentation techniques (flipping, rotation, zoom, brightness shifts), the model's validation accuracy improved from an initial 62% to 78%. Built using Python with TensorFlow/Keras, the project covers the full ML pipeline: data preprocessing, model architecture design, training, evaluation, and performance analysis.",
    tags: ["Python", "TensorFlow", "Keras", "ML", "Deep Learning"],
    highlights: ["300+ Images", "62% → 78% Accuracy", "Data Augmentation", "Custom Dataset"],
    github: "https://github.com/hardikw13",
    live: null,
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
    imgAlt: "Python machine learning code on a screen",
  },
  {
    num: "03",
    title: "CareCrew",
    subtitle: "Maintenance Management App",
    desc: "Full-featured Android app for complaint and maintenance management with real-time tracking and REST API integration.",
    longDesc:
      "CareCrew is an Android application designed to streamline maintenance and complaint management in residential or institutional settings. It features a dual-role system — residents can raise complaints with photos and descriptions, while admins can assign, track, and resolve them in real time. Built with Java/Kotlin and XML layouts, the app integrates with a REST API backend for live status updates, push notifications, and a full complaint history log. The admin dashboard provides analytics on resolution times and complaint categories.",
    tags: ["Android", "Java", "Kotlin", "XML", "REST API"],
    highlights: ["Real-time Tracking", "Admin & User Roles", "REST API", "Push Notifications"],
    github: "https://github.com/hardikw13",
    live: null,
    img: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
    imgAlt: "Android smartphone displaying a mobile app interface",
  },
  {
    num: "04",
    title: "Laptop Price Analysis",
    subtitle: "Data Analysis & EDA",
    desc: "Comprehensive EDA on 700+ laptop records uncovering pricing trends, brand comparisons, and feature correlations.",
    longDesc:
      "An in-depth Exploratory Data Analysis project on a dataset of 700+ laptop records. Using Python's data stack (Pandas, NumPy, Matplotlib, Seaborn), the project uncovers pricing trends across brands, identifies key features that drive price (RAM, storage, GPU tier, display resolution), and visualizes correlations through heatmaps, box plots, and scatter plots. The analysis reveals that GPU type and RAM are the strongest price predictors, while brand premium varies significantly. Findings are presented in a structured Jupyter Notebook with clear visualizations.",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter"],
    highlights: ["700+ Records", "EDA & Visualization", "Price Trends", "Feature Correlation"],
    github: "https://github.com/hardikw13",
    live: null,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imgAlt: "Laptop screen displaying bar charts and data analytics dashboard",
  },
];

// ── Modal ────────────────────────────────────────────────────────────────────
function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.35, ease }}
        className="relative w-full sm:max-w-2xl bg-[#111] border border-white/[0.08] rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-52 sm:h-64 w-full overflow-hidden">
          <Image
            src={p.img}
            alt={p.imgAlt}
            fill
            className="object-cover"
            sizes="672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/30 to-transparent" />
          {/* Number badge */}
          <span className="absolute top-4 left-5 text-xs font-bold tracking-widest text-amber-400/80 uppercase">
            {p.num}
          </span>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/50 border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-black text-white">{p.title}</h2>
            <p className="text-sm text-amber-400/80 mt-0.5">{p.subtitle}</p>
          </div>

          <p className="text-[#9ca3af] text-sm leading-relaxed mb-5">{p.longDesc}</p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mb-5">
            {p.highlights.map((h) => (
              <span
                key={h}
                className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {p.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-[#6b7280]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-amber-400 transition-colors"
            >
              <GithubIcon size={16} />
              View on GitHub
            </a>
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-black text-sm font-bold hover:bg-amber-400 transition-colors"
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
function ProjectCard({
  p,
  i,
  inView,
  onClick,
}: {
  p: Project;
  i: number;
  inView: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease }}
      className="card group cursor-pointer overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 bg-[#141414] overflow-hidden border-b border-white/[0.06]">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src={p.img}
            alt={p.imgAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Number watermark */}
        <span className="absolute bottom-3 right-4 text-5xl font-black text-white/10 select-none leading-none pointer-events-none">
          {p.num}
        </span>

        {/* "Click to expand" hint on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <span className="flex items-center gap-1.5 text-white text-xs font-semibold tracking-wide uppercase border border-white/20 rounded-full px-4 py-2 bg-white/5 backdrop-blur-sm">
                View Details <ArrowUpRight size={13} />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors duration-200">
              {p.title}
            </h3>
            <p className="text-xs text-amber-500/70 mt-0.5">{p.subtitle}</p>
          </div>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={16} className="text-amber-400 mt-1" />
          </motion.div>
        </div>

        <p className="text-[#6b7280] text-sm leading-relaxed mb-4 line-clamp-2">{p.desc}</p>

        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-[#6b7280]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="text-amber-400 text-xs font-semibold tracking-[0.15em] uppercase mb-4"
        >
          Projects
        </motion.p>
        <div className="flex items-end justify-between mb-14 gap-4">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
              className="text-4xl sm:text-5xl font-black text-white"
            >
              Things I&apos;ve <span className="text-amber-gradient">built.</span>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            href="https://github.com/hardikw13"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-white transition-colors flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <GithubIcon size={14} />
            All on GitHub
            <ArrowUpRight size={13} />
          </motion.a>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              p={p}
              i={i}
              inView={inView}
              onClick={() => setSelected(p)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal p={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
