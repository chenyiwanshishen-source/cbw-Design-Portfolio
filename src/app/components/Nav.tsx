import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { preloadProjectDetailAssets } from "../projectPreload";
import { hideContactDetails } from "../buildVariant";

const navItems = [
  { label: "启信产业大脑", href: "#/project/qixin-brain" },
  { label: "AI报告生成", href: "#/project/ai-report" },
];

const navLinkBase =
  "rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8BEFF] focus-visible:ring-offset-2 focus-visible:ring-offset-white";
const navLinkActive =
  "border-[#A8BEFF] bg-[#E5EBFF] text-[#1A42B8] shadow-[0_0_0_1px_rgba(168,190,255,0.32)]";
const navLinkInactive =
  "border-transparent text-[#4E525E] hover:border-[#E6E7EB] hover:bg-[#F5F5F7] hover:text-[#1A1C24]";
const mobileNavLinkBase =
  "flex items-center justify-between rounded-[14px] px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8BEFF]";
const mobileNavLinkActive = "bg-[#E5EBFF] text-[#1A42B8]";
const mobileNavLinkInactive = "text-[#4E525E] hover:bg-[#F5F5F7] hover:text-[#1A1C24]";

export const PROJECT_ROUTE_LOADING_EVENT = "portfolio:project-route-loading";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateNavState = () => {
      setScrolled(window.scrollY > 24);
      const current = navItems.find((item) => item.href && window.location.hash === item.href);
      setActiveNav(current?.href || "home");
    };
    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });
    window.addEventListener("hashchange", updateNavState);
    return () => {
      window.removeEventListener("scroll", updateNavState);
      window.removeEventListener("hashchange", updateNavState);
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goRoute = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (!href) return;
    if (window.location.hash === href) {
      setMobileMenuOpen(false);
      return;
    }

    setPendingHref(href);
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent(PROJECT_ROUTE_LOADING_EVENT, { detail: { href } }));

    if (href.startsWith("#/")) {
      window.location.hash = href.slice(1);
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    void preloadForHref(href).finally(() => {
      setPendingHref((current) => (current === href ? null : current));
    });
  };

  const goContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (window.location.hash.startsWith("#/")) {
      window.location.hash = "";
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 80);
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const preloadForHref = (href: string) => {
    if (href === "#/project/ai-report") {
      return preloadProjectDetailAssets("ai-report", "high");
    } else if (href === "#/project/qixin-brain") {
      return preloadProjectDetailAssets("qixin-brain", "high");
    }
    return Promise.resolve();
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 z-40 w-[min(1120px,calc(100%-1rem))] -translate-x-1/2 sm:w-[min(1120px,calc(100%-2rem))]"
    >
      <div
        className={`relative flex items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-300 sm:px-5 sm:py-3 md:px-6 ${
          scrolled
            ? "border-[#E6E7EB] bg-white/90 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-white/60 backdrop-blur-sm md:bg-transparent"
        }`}
      >
        <a href="#" className="group flex min-w-0 items-center gap-2" onClick={goHome}>
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-[#2258F4] text-[11px] font-semibold text-white">
            陈
          </span>
          <span className="min-w-0 text-sm tracking-wide text-[#4E525E] transition-colors group-hover:text-[#1A1C24]">
            <span className="sm:hidden">陈俊学</span>
            <span className="hidden sm:inline">陈俊学 · AI产品设计师</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-2">
          <a
            href="#"
            onClick={goHome}
            className={`${navLinkBase} ${
              activeNav === "home" ? navLinkActive : navLinkInactive
            }`}
          >
            首页
          </a>

          {navItems.map((item) => {
            const isActive = activeNav === item.href;
            return (
              <a
                key={item.label}
                href={item.href || "#"}
                onClick={(e) => goRoute(e, item.href)}
                onMouseEnter={() => void preloadForHref(item.href)}
                onFocus={() => void preloadForHref(item.href)}
                onTouchStart={() => void preloadForHref(item.href)}
                aria-busy={pendingHref === item.href}
                className={`${navLinkBase} ${
                  isActive ? navLinkActive : navLinkInactive
                } ${pendingHref === item.href ? "cursor-progress opacity-80" : ""}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {hideContactDetails ? (
            <span className="relative inline-flex h-10 items-center gap-2 rounded-full bg-[#1A1C24] px-3 text-sm text-white sm:px-4">
              <span className="size-1.5 rounded-full bg-[#2258F4] animate-pulse" />
              目前在寻找新的机会
            </span>
          ) : (
            <a
              href="#contact"
              onClick={goContact}
              className="group relative inline-flex h-10 items-center gap-2 rounded-full bg-[#1A1C24] px-3 text-sm text-white transition-colors hover:bg-[#4E525E] sm:px-4"
            >
              <span className="size-1.5 rounded-full bg-[#2258F4] animate-pulse" />
              目前在寻找新的机会
            </a>
          )}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#E6E7EB] bg-white text-[#1A1C24] transition-colors hover:border-[#A8BEFF] hover:bg-[#F5F5F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8BEFF] md:hidden"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.nav
          id="mobile-navigation"
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-[20px] border border-[#E6E7EB] bg-white p-2 shadow-[0_18px_44px_rgba(26,28,36,0.12)] md:hidden"
        >
          <a
            href="#"
            onClick={goHome}
            className={`${mobileNavLinkBase} ${
              activeNav === "home" ? mobileNavLinkActive : mobileNavLinkInactive
            }`}
          >
            首页
            {activeNav === "home" && <span className="size-1.5 rounded-full bg-[#2258F4]" />}
          </a>
          {navItems.map((item) => {
            const isActive = activeNav === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => goRoute(e, item.href)}
                onTouchStart={() => void preloadForHref(item.href)}
                aria-busy={pendingHref === item.href}
                className={`${mobileNavLinkBase} ${
                  isActive ? mobileNavLinkActive : mobileNavLinkInactive
                } ${pendingHref === item.href ? "cursor-progress opacity-80" : ""}`}
              >
                {item.label}
                {isActive && <span className="size-1.5 rounded-full bg-[#2258F4]" />}
              </a>
            );
          })}
          {!hideContactDetails && (
            <a href="#contact" onClick={goContact} className={`${mobileNavLinkBase} ${mobileNavLinkInactive}`}>
              联系我
            </a>
          )}
        </motion.nav>
      )}
    </motion.header>
  );
}
