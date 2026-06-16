import { useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { Marquee } from "./Marquee";

gsap.registerPlugin(useGSAP);

const marqueeWords = [
  "AI 产品设计",
  "提示词框架",
  "数据可视化",
  "B 端设计",
  "信息架构",
  "产业分析",
];

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    (_, contextSafe) => {
      const root = rootRef.current;
      if (!root) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const buttons = gsap.utils.toArray<HTMLElement>("[data-magnetic-button]", root);
      if (buttons.length === 0) return;

      const clampX = gsap.utils.clamp(-28, 28);
      const clampY = gsap.utils.clamp(-18, 18);
      const clampLabelX = gsap.utils.clamp(-16, 16);
      const clampLabelY = gsap.utils.clamp(-10, 10);
      const labels = new Map(
        buttons.map((button) => [
          button,
          button.querySelector<HTMLElement>("[data-magnetic-label]"),
        ])
      );
      let activeButton: HTMLElement | null = null;

      const resetButton = (button: HTMLElement) => {
        const label = labels.get(button);

        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.72,
          ease: "elastic.out(0.9, 0.38)",
          overwrite: "auto",
        });
        if (label) {
          gsap.to(label, {
            x: 0,
            y: 0,
            duration: 0.68,
            ease: "elastic.out(0.85, 0.4)",
            overwrite: true,
          });
        }
      };

      const onMouseMove = contextSafe((event: MouseEvent) => {
        let closest:
          | {
              button: HTMLElement;
              distance: number;
              dx: number;
              dy: number;
              radius: number;
            }
          | null = null;

        buttons.forEach((button) => {
          const rect = button.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = event.clientX - centerX;
          const dy = event.clientY - centerY;
          const distance = Math.hypot(dx, dy);
          const radius = Math.max(116, Math.min(168, rect.width * 0.9));

          if (distance < radius && (!closest || distance < closest.distance)) {
            closest = { button, distance, dx, dy, radius };
          }
        });

        if (!closest) {
          if (activeButton) {
            resetButton(activeButton);
            activeButton = null;
          }
          return;
        }

        if (activeButton && activeButton !== closest.button) {
          resetButton(activeButton);
        }
        activeButton = closest.button;

        const button = closest.button;
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mapX = gsap.utils.mapRange(
          centerX - closest.radius,
          centerX + closest.radius,
          -closest.radius,
          closest.radius,
          event.clientX
        );
        const mapY = gsap.utils.mapRange(
          centerY - closest.radius,
          centerY + closest.radius,
          -closest.radius,
          closest.radius,
          event.clientY
        );
        const label = labels.get(button);

        gsap.to(button, {
          x: clampX(mapX * 0.38),
          y: clampY(mapY * 0.32),
          duration: 0.42,
          ease: "power2.out",
          overwrite: "auto",
        });
        if (label) {
          gsap.to(label, {
            x: clampLabelX(mapX * 0.22),
            y: clampLabelY(mapY * 0.18),
            duration: 0.42,
            ease: "power2.out",
            overwrite: true,
          });
        }
      });

      const onMouseLeave = contextSafe(() => {
        if (activeButton) {
          resetButton(activeButton);
          activeButton = null;
        }
      });

      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseleave", onMouseLeave);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
        buttons.forEach((button) => {
          gsap.killTweensOf(button);
          gsap.set(button, { clearProps: "transform" });
          const label = labels.get(button);
          if (label) {
            gsap.killTweensOf(label);
            gsap.set(label, { clearProps: "transform" });
          }
        });
      };
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="top" className="relative flex items-center px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-32 pb-10 md:pb-14">
      <div className="w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="leading-[1.08] tracking-tight text-[clamp(2.4rem,7vw,6rem)]"
          style={{ fontWeight: 600 }}
        >
          <span className="text-[#1A1C24]">陈俊学</span>
          <span className="text-[#2258F4]">
            {" · "}
          </span>
          <span className="text-[#2258F4]">
            UI产品设计师
          </span>
        </motion.h1>

        <div className="mt-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg lg:text-xl text-[#4E525E] leading-relaxed"
          >
            9 年互联网设计经验，主要做 B 端业务系统、数据可视化，近两年也在做 AI 生成式产品相关的设计工作。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <a
              data-magnetic-button
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex will-change-transform items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#1A1C24] text-white overflow-hidden hover:shadow-[0_0_40px_rgba(34,88,244,0.45)] transition-shadow duration-300"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#2258F4] transition-transform duration-500 group-hover:translate-x-0" />
              <span
                data-magnetic-label
                className="relative z-10 inline-flex will-change-transform pointer-events-none items-center gap-3"
              >
                <span className="text-sm transition-colors group-hover:text-white">查看作品</span>
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-[#1A1C24] group-hover:rotate-45 group-hover:bg-white group-hover:text-[#1A1C24] transition-all duration-300">
                  <ArrowDown className="size-4" />
                </span>
              </span>
            </a>
            <a
              data-magnetic-button
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex will-change-transform items-center px-6 h-[52px] rounded-full border border-[#CBCDD4] text-sm text-[#4E525E] hover:border-[#A8BEFF] hover:text-[#1A1C24] hover:bg-[#F5F5F7] transition-colors duration-300"
            >
              <span
                data-magnetic-label
                className="inline-flex will-change-transform pointer-events-none items-center gap-2"
              >
                联系我
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E6E7EB] border border-[#E6E7EB] rounded-[24px] overflow-hidden"
        >
          {[
            { k: "9", v: "年设计经验" },
            { k: "B端", v: "企业级产品设计" },
            { k: "AI + 产品", v: "产品设计" },
            { k: "Figma / Blender / Illustrator", v: "工具使用" },
          ].map((s) => (
            <div key={s.v} className="bg-white px-6 py-6">
              <div className="text-3xl md:text-4xl tracking-tight text-[#1A1C24]">{s.k}</div>
              <div className="text-xs text-[#696D7A] mt-1 tracking-wider leading-relaxed">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee — seamless infinite loop */}
      <Marquee words={marqueeWords} />
    </section>
  );
}
