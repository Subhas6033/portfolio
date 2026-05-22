import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* ── Social SVG Icons ─────────────────────────────────── */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const EmailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="15"
    height="15"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// ── Nav links config ───────────────────────────────────

const LINKS = [
  { label: "Home", href: "/", id: "home", isHash: false },
  { label: "About", href: "/about", id: "about", isHash: false },
  { label: "Projects", href: "/projects", id: "projects", isHash: false },
  { label: "Experience", href: "/experience", id: "experience", isHash: false },
  { label: "Contact", href: "/contact", id: "contact", isHash: false },
];

// ── Derive active from location ────────────────────────
function getActiveId(pathname, hash) {
  // Non-home routes take priority
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/experience")) return "experience";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/achievement")) return "";
  // On homepage, use hash or default to home
  if (pathname === "/") {
    const h = hash.replace("#", "");
    if (h) return h;
    return "home";
  }
  return "home";
}

/* ── Header ──────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [scrollActive, setScrollActive] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const itemRefs = useRef({});

  const isHomePage = location.pathname === "/";

  // Active = scroll-tracked section (homepage only) OR route-based
  const routeActive = getActiveId(location.pathname, location.hash);
  const active = isHomePage && scrollActive ? scrollActive : routeActive;

  // ── IntersectionObserver — only active on homepage ──
  useEffect(() => {
    if (!isHomePage) {
      setScrollActive("");
      return;
    }

    const ratios = {};
    const HASH_SECTIONS = ["home", "about", "services"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios[e.target.id] = e.intersectionRatio;
        });
        let bestId = "",
          bestRatio = 0;
        Object.entries(ratios).forEach(([id, ratio]) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId && bestRatio > 0) setScrollActive(bestId);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-64px 0px 0px 0px",
      },
    );

    HASH_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        ratios[id] = 0;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [isHomePage, location.pathname]);

  // ── Scroll shadow ──
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── Slide pill to active item ──
  useEffect(() => {
    const el = itemRefs.current[active];
    const nav = navRef.current;
    if (!el || !nav) return;
    const frame = requestAnimationFrame(() => {
      const nr = nav.getBoundingClientRect();
      const ir = el.getBoundingClientRect();
      setPillStyle({ left: ir.left - nr.left, width: ir.width, opacity: 1 });
    });
    return () => cancelAnimationFrame(frame);
  }, [active]);

  // ── Click handler ──
  const handleClick = (e, link) => {
    e.preventDefault();
    setMenuOpen(false);

    if (link.isHash) {
      // Hash section: navigate to homepage then scroll
      if (location.pathname !== "/") {
        navigate("/");
        // After navigation, scroll to section
        setTimeout(() => {
          const el = document.getElementById(link.id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.getElementById(link.id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      setScrollActive(link.id);
    } else {
      // Route navigation
      navigate(link.href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-zinc-950/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      )}

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => handleClick(e, LINKS[0])}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(163,230,53,0.5)]">
            <span className="text-zinc-950 font-black text-sm leading-none">
              S
            </span>
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-black text-sm leading-none tracking-tight">
              Subhas
            </div>
            <div className="text-zinc-600 text-xs">Mondal</div>
          </div>
        </a>

        {/* Desktop Nav — sliding pill */}
        <nav
          ref={navRef}
          className="hidden md:flex items-center relative bg-zinc-900/60 border border-zinc-800/60 backdrop-blur-sm rounded-full px-2 py-1.5"
        >
          <span
            className="absolute top-1.5 h-[calc(100%-12px)] bg-lime-400 rounded-full pointer-events-none"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              opacity: pillStyle.opacity,
              transition:
                "left 300ms cubic-bezier(0.34,1.56,0.64,1), width 300ms cubic-bezier(0.34,1.56,0.64,1), opacity 200ms ease",
            }}
          />
          {LINKS.map((l) => (
            <a
              key={l.id}
              ref={(el) => (itemRefs.current[l.id] = el)}
              href={l.href}
              onClick={(e) => handleClick(e, l)}
              className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 select-none ${
                active === l.id
                  ? "text-zinc-950"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/contact"
            onClick={(e) =>
              handleClick(
                e,
                LINKS.find((l) => l.id === "contact"),
              )
            }
            className="inline-flex items-center gap-2 bg-lime-400 text-zinc-950 text-xs font-black px-4 py-2 rounded-full hover:bg-lime-300 hover:shadow-[0_0_20px_rgba(163,230,53,0.35)] transition-all duration-300"
          >
            Hire Me
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-950/98 backdrop-blur-xl border-t border-zinc-800/60 px-6 pt-4 pb-6">
          <div className="flex flex-col gap-1 mb-5">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={(e) => handleClick(e, l)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active === l.id
                    ? "bg-lime-400/10 text-lime-400 border border-lime-400/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200 ${active === l.id ? "bg-lime-400" : "bg-zinc-700"}`}
                />
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="/contact"
            onClick={(e) =>
              handleClick(
                e,
                LINKS.find((l) => l.id === "contact"),
              )
            }
            className="flex items-center justify-center gap-2 bg-lime-400 text-zinc-950 text-sm font-black px-5 py-3 rounded-xl w-full"
          >
            Hire Me →
          </a>
        </div>
      )}
    </header>
  );
}

export default Header;
