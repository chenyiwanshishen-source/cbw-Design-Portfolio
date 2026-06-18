import { useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { ArrowDown } from "lucide-react";
import { Marquee } from "./Marquee";

gsap.registerPlugin(useGSAP, Draggable);

const marqueeWords = [
  "AI 产品设计",
  "提示词框架",
  "数据可视化",
  "B 端设计",
  "信息架构",
  "产业分析",
];

const capabilityCards = [
  {
    label: "业务系统",
    text: "9 年 B 端产品设计，熟悉复杂业务系统的信息架构与交互落地。",
  },
  {
    label: "AI 产品",
    text: "近两年聚焦 AI 产品方向，涉及流式对话、智能报告等新型交互场景。",
  },
  {
    label: "设计工具",
    text: "日常工作以 Figma 为核心工具，按需辅以 Blender、Illustrator。",
  },
  {
    label: "长期维护",
    text: "关注信息结构的合理性与交互逻辑的一致性，重视设计资产的长期可维护性。",
  },
];

const boardCardLayouts = [
  "lg:left-[7%] lg:top-[7%] lg:w-[21rem] xl:w-[23rem] 2xl:w-[25rem] lg:rotate-[-0.8deg]",
  "lg:right-[8%] lg:top-[10%] lg:w-[21rem] xl:w-[23.5rem] 2xl:w-[25.5rem] lg:rotate-[0.7deg]",
  "lg:left-[5%] lg:bottom-[20%] lg:w-[21rem] xl:w-[23rem] 2xl:w-[25rem] lg:rotate-[0.6deg]",
  "lg:right-[9%] lg:bottom-[14%] lg:w-[21rem] xl:w-[23.5rem] 2xl:w-[25.5rem] lg:rotate-[-0.6deg]",
];

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const nameDragRef = useRef<HTMLSpanElement | null>(null);
  const roleDragRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    (_, contextSafe) => {
      const root = rootRef.current;
      if (!root) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cleanups: Array<() => void> = [];
      const dragTargets = [nameDragRef.current, roleDragRef.current].filter(
        (target): target is HTMLSpanElement => Boolean(target)
      );
      const noteDragTargets = gsap.utils.toArray<HTMLElement>("[data-note-drag]", root);
      const dragBounds = root;

      if (dragTargets.length > 0 || noteDragTargets.length > 0) {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px) and (hover: hover) and (pointer: fine)", () => {
          const titleDraggables = dragTargets.flatMap((target) =>
            Draggable.create(target, {
              type: "x,y",
              bounds: dragBounds,
              edgeResistance: 0.82,
              dragResistance: 0.06,
              cursor: "grab",
              activeCursor: "grabbing",
              onDragStart: () => {
                target.dataset.dragging = "true";
                gsap.set(target, { zIndex: 34 });
                gsap.to(target, {
                  scale: reduceMotion ? 1 : 1.012,
                  duration: reduceMotion ? 0 : 0.16,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              },
              onDragEnd: () => {
                target.dataset.dragging = "false";
                gsap.to(target, {
                  scale: 1,
                  duration: reduceMotion ? 0 : 0.28,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              },
              onRelease: () => {
                target.dataset.dragging = "false";
              },
            })
          );
          const noteDraggables = noteDragTargets.flatMap((target) =>
            Draggable.create(target, {
              type: "x,y",
              bounds: dragBounds,
              edgeResistance: 0.86,
              dragResistance: 0.05,
              cursor: "grab",
              activeCursor: "grabbing",
              onPress: () => {
                target.dataset.dragging = "true";
                gsap.set(target, { zIndex: 30 });
              },
              onDragStart: () => {
                target.dataset.dragging = "true";
                gsap.to(target, {
                  scale: reduceMotion ? 1 : 1.025,
                  duration: reduceMotion ? 0 : 0.14,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              },
              onDragEnd: () => {
                target.dataset.dragging = "false";
                gsap.to(target, {
                  scale: 1,
                  duration: reduceMotion ? 0 : 0.24,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              },
              onRelease: () => {
                target.dataset.dragging = "false";
                gsap.to(target, {
                  scale: 1,
                  duration: reduceMotion ? 0 : 0.2,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              },
            })
          );
          const draggables = [...titleDraggables, ...noteDraggables];

          const refreshBounds = contextSafe(() => {
            draggables.forEach((draggable) => draggable.applyBounds(dragBounds));
          });
          window.addEventListener("resize", refreshBounds);

          return () => {
            window.removeEventListener("resize", refreshBounds);
            draggables.forEach((draggable) => draggable.kill());
            dragTargets.forEach((target) => {
              gsap.killTweensOf(target);
              gsap.set(target, { x: 0, y: 0, scale: 1, clearProps: "transform,zIndex" });
              delete target.dataset.dragging;
            });
            noteDragTargets.forEach((target) => {
              gsap.killTweensOf(target);
              gsap.set(target, { x: 0, y: 0, scale: 1, clearProps: "transform,zIndex" });
              delete target.dataset.dragging;
            });
          };
        });

        cleanups.push(() => mm.revert());
      }

      if (reduceMotion) {
        return () => cleanups.forEach((cleanup) => cleanup());
      }

      const buttons = gsap.utils.toArray<HTMLElement>("[data-magnetic-button]", root);
      if (buttons.length === 0) {
        return () => cleanups.forEach((cleanup) => cleanup());
      }

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
          ease: "power3.out",
          overwrite: "auto",
        });
        if (label) {
          gsap.to(label, {
            x: 0,
            y: 0,
            duration: 0.68,
            ease: "power3.out",
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
        cleanups.forEach((cleanup) => cleanup());
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
    <section
      ref={rootRef}
      id="top"
      className="relative px-6 pt-32 pb-24 sm:px-10 lg:px-16 lg:pb-28 xl:px-24 2xl:px-32"
    >
      <div
        data-hero-stage
        className="relative mx-auto w-full max-w-[1600px] lg:h-[clamp(560px,42vw,720px)]"
      >
        <div className="relative z-20 mx-auto flex max-w-[860px] flex-col items-center text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="flex flex-col items-center gap-2 tracking-normal" style={{ fontWeight: 600 }}>
              <span
                ref={nameDragRef}
                data-hero-drag-frame
                data-drag-layer="name"
                aria-label="姓名"
                tabIndex={0}
                className="hero-drag-frame relative inline-block touch-none select-none px-3 py-1 outline-none will-change-transform lg:cursor-grab lg:px-5 lg:py-2 lg:active:cursor-grabbing"
              >
                <span aria-hidden="true" className="hero-drag-handle hero-drag-handle-tl" />
                <span aria-hidden="true" className="hero-drag-handle hero-drag-handle-tr" />
                <span aria-hidden="true" className="hero-drag-handle hero-drag-handle-bl" />
                <span aria-hidden="true" className="hero-drag-handle hero-drag-handle-br" />
                <span className="block leading-[0.96] text-[clamp(3.35rem,15vw,7.6rem)] text-[#1A1C24] lg:text-[clamp(4.8rem,6.4vw,7.6rem)]">
                  陈俊学
                </span>
              </span>
              <span
                ref={roleDragRef}
                data-hero-drag-frame
                data-drag-layer="role"
                aria-label="职业"
                tabIndex={0}
                className="hero-drag-frame relative inline-block touch-none select-none px-3 py-1 outline-none will-change-transform lg:cursor-grab lg:px-5 lg:py-2 lg:active:cursor-grabbing"
              >
                <span aria-hidden="true" className="hero-drag-handle hero-drag-handle-tl" />
                <span aria-hidden="true" className="hero-drag-handle hero-drag-handle-tr" />
                <span aria-hidden="true" className="hero-drag-handle hero-drag-handle-bl" />
                <span aria-hidden="true" className="hero-drag-handle hero-drag-handle-br" />
                <span className="block leading-[1.02] text-[clamp(2.5rem,10vw,5.8rem)] text-[#2258F4] lg:text-[clamp(3.7rem,4.8vw,5.8rem)]">
                  UI产品设计师
                </span>
              </span>
            </h1>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                data-magnetic-button
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex will-change-transform items-center gap-3 overflow-hidden rounded-full bg-[#1A1C24] py-2 pl-6 pr-2 text-white transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(34,88,244,0.35)]"
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
                className="group relative inline-flex h-[52px] will-change-transform items-center rounded-full border border-[#CBCDD4] px-6 text-sm text-[#4E525E] transition-colors duration-300 hover:border-[#A8BEFF] hover:bg-[#F5F5F7] hover:text-[#1A1C24]"
              >
                <span
                  data-magnetic-label
                  className="inline-flex will-change-transform pointer-events-none items-center gap-2"
                >
                  联系我
                  <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-14 grid w-full gap-4 sm:grid-cols-2 lg:absolute lg:inset-0 lg:mt-0 lg:block"
          aria-label="能力摘要"
        >
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 1600 720"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M180 116 H570 M1030 130 H1430 M170 574 H560 M1040 590 H1460 M800 238 V482"
              fill="none"
              stroke="#CBCDD4"
              strokeWidth="1"
              strokeDasharray="7 9"
              opacity="0.72"
            />
            <path
              d="M570 116 C650 134 680 186 720 238 M1030 130 C948 154 914 196 880 238 M560 574 C632 542 684 510 732 482 M1040 590 C966 548 920 512 872 482"
              fill="none"
              stroke="#A8BEFF"
              strokeWidth="1"
              opacity="0.58"
            />
            {[
              [570, 116],
              [1030, 130],
              [560, 574],
              [1040, 590],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill="#FAFBFF" stroke="#A8BEFF" strokeWidth="1.5" />
            ))}
          </svg>

          {capabilityCards.map((card, index) => (
            <article
              key={card.label}
              data-note-drag
              className={`hero-note-shell hero-note-card-${index + 1} relative select-none lg:absolute ${boardCardLayouts[index]}`}
            >
              <div className="hero-note-card relative p-3.5 sm:p-4 lg:p-[clamp(0.8rem,1.05vw,1rem)]">
                <span aria-hidden="true" className="hero-note-selection-frame" />
                <span aria-hidden="true" className="hero-note-selection-handle hero-note-selection-handle-tl" />
                <span aria-hidden="true" className="hero-note-selection-handle hero-note-selection-handle-tr" />
                <span aria-hidden="true" className="hero-note-selection-handle hero-note-selection-handle-bl" />
                <span aria-hidden="true" className="hero-note-selection-handle hero-note-selection-handle-br" />
                <div className="hero-note-meta mb-2.5 flex items-center justify-between gap-4">
                  <span>{card.label}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="hero-note-entry">
                  <p className="hero-note-text text-[clamp(0.88rem,0.98vw,0.98rem)] leading-[1.58] text-[#1A1C24]">
                    {card.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>

      {/* Marquee — seamless infinite loop */}
      <Marquee words={marqueeWords} />
    </section>
  );
}
