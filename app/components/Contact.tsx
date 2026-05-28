"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const contactItems: {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;
  label: string;
  val: string;
  href: string | null;
  color: string;
  rgb: string;
}[] = [
  {
    icon: Mail,
    label: "College Email",
    val: "hardik.24cse@bmu.edu.in",
    href: "mailto:hardik.24cse@bmu.edu.in",
    color: "#f59e0b",
    rgb: "245,158,11",
  },
  {
    icon: Mail,
    label: "Personal Email",
    val: "hardik5053w@gmail.com",
    href: "mailto:hardik5053w@gmail.com",
    color: "#f97316",
    rgb: "249,115,22",
  },
  {
    icon: Phone,
    label: "Phone",
    val: "+91 8930838487",
    href: "tel:8930838487",
    color: "#10b981",
    rgb: "16,185,129",
  },
  {
    icon: MapPin,
    label: "Location",
    val: "Pataudi, Gurugram, India",
    href: "https://www.google.com/maps/search/Pataudi,+Gurugram,+Haryana,+India",
    color: "#06b6d4",
    rgb: "6,182,212",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    val: "github.com/hardikw13",
    href: "https://github.com/hardikw13",
    color: "#e5e7eb",
    rgb: "229,231,235",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    val: "Hardik Wadhwa",
    href: "https://www.linkedin.com/in/hardik-wadhwa-62384535b",
    color: "#3b82f6",
    rgb: "59,130,246",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container max-w-4xl">

        {/* ── Header ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="text-amber-400 text-xs font-semibold tracking-[0.15em] uppercase mb-4"
        >
          Contact
        </motion.p>

        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="text-4xl sm:text-5xl font-black text-white"
          >
            Let&apos;s <span className="text-amber-gradient">connect.</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-[#9ca3af] text-lg leading-relaxed mb-16 max-w-xl"
        >
          Open to internships, collaborations, and interesting conversations.
          Whether you have a project idea or just want to say hi — drop me a message.
        </motion.p>

        {/* ── Contact handle cards (original design) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {contactItems.map(({ icon: Icon, label, val, href, color, rgb }, i) => {
            const CardWrapper = href ? motion.a : motion.div;
            const wrapperProps = href
              ? {
                  href,
                  target: "_blank" as const,
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <CardWrapper
                key={label}
                {...wrapperProps}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `rgba(${rgb},0.12)`,
                    border: `1px solid rgba(${rgb},0.3)`,
                    boxShadow: `0 0 20px rgba(${rgb},0.12)`,
                  }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `rgba(${rgb},0.7)` }}
                >
                  {label}
                </p>
                <p className="text-[#d1d5db] text-xs font-medium hover:text-white transition-colors break-all leading-relaxed">
                  {val}
                </p>
              </CardWrapper>
            );
          })}
        </div>

        {/* ── Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease }}
        >
          {/* Bold all-caps heading — matches reference layout */}
          <h3 className="text-3xl sm:text-4xl font-black text-amber-400 uppercase tracking-wide mb-10">
            Send a Message
          </h3>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-start gap-5 py-10"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 size={28} className="text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-1">Message sent!</h4>
                <p className="text-[#6b7280] text-sm">I&apos;ll get back to you within 24 hours.</p>
              </div>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                Send another →
              </button>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="space-y-5">

              {/* Name — full width, stacked */}
              <div>
                <label className="block text-sm text-[#9ca3af] mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder="Hardik Wadhwa"
                  className="w-full px-5 py-4 rounded-lg text-white placeholder-[#4b5563] text-sm outline-none transition-all duration-200"
                  style={{
                    background: "#1a1a1a",
                    border: focused === "name"
                      ? "1px solid rgba(245,158,11,0.6)"
                      : "1px solid #2a2a2a",
                    boxShadow: focused === "name" ? "0 0 0 3px rgba(245,158,11,0.08)" : "none",
                  }}
                />
              </div>

              {/* Email — full width, stacked */}
              <div>
                <label className="block text-sm text-[#9ca3af] mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="you@example.com"
                  className="w-full px-5 py-4 rounded-lg text-white placeholder-[#4b5563] text-sm outline-none transition-all duration-200"
                  style={{
                    background: "#1a1a1a",
                    border: focused === "email"
                      ? "1px solid rgba(245,158,11,0.6)"
                      : "1px solid #2a2a2a",
                    boxShadow: focused === "email" ? "0 0 0 3px rgba(245,158,11,0.08)" : "none",
                  }}
                />
              </div>

              {/* Message — full width, stacked */}
              <div>
                <label className="block text-sm text-[#9ca3af] mb-2">Message</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="Hey, I'd love to chat about..."
                  className="w-full px-5 py-4 rounded-lg text-white placeholder-[#4b5563] text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    background: "#1a1a1a",
                    border: focused === "message"
                      ? "1px solid rgba(245,158,11,0.6)"
                      : "1px solid #2a2a2a",
                    boxShadow: focused === "message" ? "0 0 0 3px rgba(245,158,11,0.08)" : "none",
                  }}
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm transition-colors duration-200 disabled:opacity-60 group"
                style={{
                  background: "transparent",
                  border: "1.5px solid rgba(245,158,11,0.7)",
                  color: "#f59e0b",
                }}
                whileHover={loading ? {} : { scale: 1.02 }}
                whileTap={loading ? {} : { scale: 0.98 }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    (e.currentTarget as HTMLButtonElement).style.background = "#f59e0b";
                    (e.currentTarget as HTMLButtonElement).style.color = "#000";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#f59e0b";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(245,158,11,0.25)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "#f59e0b";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,158,11,0.7)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                {loading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-amber-400/30 border-t-amber-400 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>Send Message</>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
