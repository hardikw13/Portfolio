"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";

// href is the page path (for routing) or anchor id (for scroll on home)
const links = [
  { label: "About",      href: "/",          scrollId: "about"      },
  { label: "Experience", href: "/experience", scrollId: null         },
  { label: "Projects",   href: "/projects",   scrollId: null         },
  { label: "Skills",     href: "/skills",     scrollId: null         },
  { label: "Contact",    href: "/contact",    scrollId: null         },
];

function scrollTo(id: string) {
  const lenis = (window as unknown as Record<string, unknown>).__lenis as
    | { scrollTo: (el: HTMLElement | null, opts: object) => void }
    | undefined;
  const el = document.getElementById(id);
  if (lenis && el) lenis.scrollTo(el, { offset: -80, duration: 1.4 });
  else if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof links>([]);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (!val.trim()) { setResults([]); return; }
    setResults(
      links.filter((l) => l.label.toLowerCase().includes(val.toLowerCase()))
    );
  };

  const pickResult = (link: typeof links[0]) => {
    setQuery("");
    setResults([]);
    if (isHome && link.scrollId) {
      scrollTo(link.scrollId);
    }
    // For non-home links the <Link> navigation handles it
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (isHome) {
        for (const l of [...links].reverse()) {
          if (!l.scrollId) continue;
          const el = document.getElementById(l.scrollId);
          if (el && window.scrollY >= el.offsetTop - 140) {
            setActiveSection(l.scrollId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Determine which nav item is "active"
  function isActive(link: typeof links[0]) {
    if (link.href === "/" && link.scrollId === "about") {
      // "About" is active on home when scrolled to #about, or when on home with no other section active
      return isHome && (activeSection === "about" || activeSection === "");
    }
    return pathname === link.href;
  }

  function NavItem({ link, mobile = false }: { link: typeof links[0]; mobile?: boolean }) {
    const active = isActive(link);
    const baseClass = mobile
      ? `text-left px-4 py-3 text-sm rounded-lg transition-colors ${active ? "text-white font-semibold" : "text-[#9ca3af] hover:text-white hover:bg-white/[0.04]"}`
      : `text-[15px] transition-all duration-200 ${active ? "text-white font-bold" : "text-[#6b7280] font-normal hover:text-[#d1d5db]"}`;

    // On home page, "About" scrolls to section; all others are page links
    if (isHome && link.scrollId) {
      return (
        <button
          onClick={() => { scrollTo(link.scrollId!); if (mobile) setOpen(false); }}
          className={baseClass}
        >
          {link.label}
        </button>
      );
    }

    return (
      <Link
        href={link.href}
        onClick={() => { if (mobile) setOpen(false); }}
        className={baseClass}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080808]/95 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-[#080808] border-b border-white/[0.05]"
        }`}
      >
        {/* Top gap */}
        <div className="h-3" />

        <div className="w-full px-4 sm:px-8 lg:px-14 flex items-center gap-6 sm:gap-10 pb-3">

          {/* ── Name / Logo ── */}
          <Link
            href="/"
            className="flex-shrink-0 group"
          >
            <span
              className="text-2xl font-black tracking-tight uppercase"
              style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                color: "#f59e0b",
                letterSpacing: "0.04em",
              }}
            >
              HARDIK
            </span>
          </Link>

          {/* ── Nav links ── */}
          <nav className="hidden md:flex items-center gap-4">
            {links.map((l) => (
              <NavItem key={l.href + l.label} link={l} />
            ))}
          </nav>

          {/* ── Spacer ── */}
          <div className="flex-1" />

          {/* ── Search bar ── */}
          <div className="hidden md:block relative">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.16] focus-within:border-white/[0.22] transition-colors w-48">
              <Search size={13} className="text-[#4b5563] flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search..."
                className="bg-transparent text-[13px] text-white placeholder-[#4b5563] outline-none w-full"
              />
            </div>
            {/* Dropdown results */}
            <AnimatePresence>
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-[#0f0f0f] border border-white/[0.1] overflow-hidden z-50"
                >
                  {results.map((r) => (
                    <Link
                      key={r.href + r.label}
                      href={r.href}
                      onClick={() => pickResult(r)}
                      className="w-full text-left px-4 py-2.5 text-[13px] text-[#d1d5db] hover:bg-white/[0.06] hover:text-white flex items-center gap-2 transition-colors"
                    >
                      <Search size={11} className="text-[#4b5563]" />
                      {r.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Hire Me ── */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:block flex-shrink-0"
          >
            <Link
              href="/contact"
              className="flex items-center gap-1.5 px-4 py-2 border border-white/[0.12] bg-white/[0.04] text-[13px] font-medium text-[#d1d5db] hover:text-white hover:border-white/[0.22] hover:bg-white/[0.07] transition-all duration-200"
            >
              <ArrowUpRight size={13} className="text-amber-400" />
              Hire Me
            </Link>
          </motion.div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 ml-auto"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-white origin-center" />
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-px bg-white" />
            <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-white origin-center" />
          </button>
        </div>

        {/* Bottom gap */}
        <div className="h-2" />
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] inset-x-0 z-40 bg-[#080808]/98 backdrop-blur-xl border-b border-white/[0.06] md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.href + l.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <NavItem link={l} mobile />
                </motion.div>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/[0.1] text-white text-sm font-semibold"
              >
                Hire Me <ArrowUpRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
