import { useEffect, useState } from "react";
import { motion } from "motion/react";

const navItems = [
  { label: "AI报告生成", href: "#/project/ai-report" },
  { label: "启信产业大脑", href: "#/project/qixin-brain" },
];

const navLinkBase =
  "rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8BEFF] focus-visible:ring-offset-2 focus-visible:ring-offset-white";
const navLinkActive =
  "border-[#A8BEFF] bg-[#E5EBFF] text-[#1A42B8] shadow-[0_0_0_1px_rgba(168,190,255,0.32)]";
const navLinkInactive =
  "border-transparent text-[#4E525E] hover:border-[#E6E7EB] hover:bg-[#F5F5F7] hover:text-[#1A1C24]";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

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

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goRoute = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (!href) return;
    if (href.startsWith("#/")) {
      window.location.hash = href.slice(1);
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[min(1120px,calc(100%-2rem))]"
    >
      <div
        className={`flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-white/80 border-[#E6E7EB] backdrop-blur-xl shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <a href="#" className="flex items-center gap-2 group" onClick={goHome}>
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-[#2258F4] text-[11px] font-semibold text-white">
            陈
          </span>
          <span className="text-sm tracking-wide text-[#4E525E] group-hover:text-[#1A1C24] transition-colors">
            陈俊学 · 产品设计师
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
                className={`${navLinkBase} ${
                  isActive ? navLinkActive : navLinkInactive
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            if (window.location.hash.startsWith("#/")) {
              window.location.hash = "";
              setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 80);
            } else {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-white bg-[#1A1C24] hover:bg-[#4E525E] transition-colors"
        >
          <span className="size-1.5 rounded-full bg-[#2258F4] animate-pulse" />
          已离职
        </a>
      </div>
    </motion.header>
  );
}
