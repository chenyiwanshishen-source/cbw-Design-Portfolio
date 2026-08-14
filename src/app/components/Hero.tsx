import { useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { ArrowDown } from "lucide-react";
import { Marquee } from "./Marquee";
import { HeroProjectPeekCard } from "./HeroProjectPeekCard";
import { hideContactDetails } from "../buildVariant";
import { scrollToHomeSection } from "../homeScroll";

gsap.registerPlugin(useGSAP, Draggable, ScrollTrigger);

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
    items: [
      "9年B/C端产品设计经验",
      "长期聚焦复杂B端与数据系统",
      "AI产品0-1落地实践",
      "从方案到交互落地",
    ],
    tone: {
      fill: "#EEF2FF",
      line: "#D6E0FF",
      dot: "#2258F4",
    },
  },
  {
    label: "AI 产品",
    items: [
      "AI 产品 0-1 探索",
      "AI 工具融入设计流程与原型搭建",
      "Prompt / Workflow 设计与验证",
      "多模态输入、生成、编辑和反馈",
      "异常状态与效率提升设计",
    ],
    tone: {
      fill: "#F5F3FF",
      line: "#DDD6FE",
      dot: "#6366F1",
    },
  },
  {
    label: "AI 设计工作流",
    items: [
      "Figma 梳理关键流程与高保真方案",
      "AI 辅助需求拆解、资料归纳与方案推演",
      "借助 Codex 将设计方案转化为可交互原型",
      "关键链路、边界状态与响应式走查",
    ],
    tone: {
      fill: "#FFF7ED",
      line: "#FED7AA",
      dot: "#F97316",
    },
  },
  {
    label: "设计方式",
    items: ["先讲清问题，再做方案", "关键步骤保留确认空间", "把常用做法沉淀成组件库和 AI 工作流"],
    tone: {
      fill: "#F0FDF4",
      line: "#BBF7D0",
      dot: "#22C55E",
    },
  },
];

const boardCardLayouts = [
  "lg:left-[2%] lg:top-[2%] lg:w-[19rem] xl:w-[23rem] 2xl:w-[25rem] lg:rotate-[-0.8deg]",
  "lg:right-[2%] lg:top-[4%] lg:w-[19.5rem] xl:w-[25rem] 2xl:w-[27rem] lg:rotate-[0.7deg]",
  "lg:left-[1%] lg:bottom-[8%] lg:w-[19rem] xl:w-[23rem] 2xl:w-[25rem] lg:rotate-[0.6deg]",
  "lg:right-[2%] lg:bottom-[6%] lg:w-[19rem] xl:w-[23.5rem] 2xl:w-[25.5rem] lg:rotate-[-0.6deg]",
];

const collaborationCursorLayouts = [
  "right-[12%] -bottom-5",
  "left-[12%] -bottom-5",
  "right-[12%] -top-1",
  "left-[12%] -top-1",
];

const noteEntranceOffsets = [
  { x: -260, y: -24 },
  { x: 24, y: -220 },
  { x: -24, y: 220 },
  { x: 260, y: 24 },
];

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const nameDragRef = useRef<HTMLSpanElement | null>(null);
  const roleDragRef = useRef<HTMLSpanElement | null>(null);
  const characterRef = useRef<HTMLDivElement | null>(null);

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
                gsap.killTweensOf(target);
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

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const noteCards = gsap.utils.toArray<HTMLElement>("[data-note-drag]", root);
      const cursors = gsap.utils.toArray<HTMLElement>("[data-note-cursor]", root);
      if (noteCards.length === 0 || cursors.length === 0) return;

      const media = gsap.matchMedia();
      media.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };

          if (!isDesktop) return;

          if (reduceMotion) {
            gsap.set(noteCards, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
            gsap.set(cursors, { autoAlpha: 0, x: 0, y: 0, scale: 1 });
            return;
          }

          noteCards.forEach((card, index) => {
            const offset = noteEntranceOffsets[index];
            const cursor = cursors[index];
            if (!offset || !cursor) return;

            gsap.set(card, {
              autoAlpha: 0,
              x: offset.x,
              y: offset.y,
              scale: 0.985,
              force3D: true,
            });
            gsap.set(cursor, {
              autoAlpha: 0,
              x: offset.x * -0.12,
              y: offset.y * -0.12,
              scale: 0.92,
              transformOrigin: "0 0",
            });
          });

          const placementTimeline = gsap.timeline({
            delay: 0.48,
            defaults: { ease: "power4.out" },
          });

          noteCards.forEach((card, index) => {
            const cursor = cursors[index];
            if (!cursor) return;

            const startAt = index * 0.76;
            placementTimeline
              .set(card, { autoAlpha: 1 }, startAt)
              .to(
                cursor,
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.16,
                },
                startAt
              )
              .to(
                card,
                {
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: 0.82,
                  force3D: true,
                },
                startAt + 0.06
              )
              .to(
                cursor,
                {
                  x: 0,
                  y: 0,
                  duration: 0.68,
                  ease: "power3.out",
                },
                startAt + 0.06
              )
              .to(
                cursor,
                {
                  autoAlpha: 0,
                  duration: 0.18,
                  ease: "power2.out",
                },
                startAt + 0.88
              );
          });

          return () => {
            placementTimeline.kill();
            gsap.killTweensOf([...noteCards, ...cursors]);
            gsap.set(noteCards, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
            gsap.set(cursors, { autoAlpha: 0, x: 0, y: 0, scale: 1 });
          };
        }
      );

      return () => media.revert();
    },
    { scope: rootRef }
  );

  useGSAP(
    (_, contextSafe) => {
      const character = characterRef.current;
      if (!character || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const eyes = gsap.utils.toArray<HTMLElement>("[data-character-eye]", character);
      if (eyes.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (hover: hover) and (pointer: fine)", () => {
        const moveEyesX = gsap.quickTo(eyes, "x", {
          duration: 0.24,
          ease: "power3.out",
        });
        const moveEyesY = gsap.quickTo(eyes, "y", {
          duration: 0.24,
          ease: "power3.out",
        });

        const resetEyes = contextSafe(() => {
          moveEyesX(0);
          moveEyesY(0);
        });

        const onPointerMove = contextSafe((event: PointerEvent) => {
          const bounds = character.getBoundingClientRect();
          const dx = event.clientX - (bounds.left + bounds.width / 2);
          const dy = event.clientY - (bounds.top + bounds.height * 0.82);
          const distance = Math.hypot(dx, dy);

          if (distance < 1) {
            resetEyes();
            return;
          }

          const strength = Math.min(1, distance / Math.max(90, bounds.width * 0.65));
          const maxX = bounds.width * 0.032;
          const maxY = bounds.width * 0.024;

          moveEyesX((dx / distance) * maxX * strength);
          moveEyesY((dy / distance) * maxY * strength);
        });

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("blur", resetEyes);
        document.documentElement.addEventListener("mouseleave", resetEyes);

        return () => {
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("blur", resetEyes);
          document.documentElement.removeEventListener("mouseleave", resetEyes);
          gsap.killTweensOf(eyes);
          gsap.set(eyes, { clearProps: "transform" });
        };
      });

      return () => mm.revert();
    },
    { scope: characterRef }
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();
      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const characterParts = gsap.utils.toArray<HTMLElement>(
            "[data-hero-character-part]",
            root
          );
          if (characterParts.length === 0) return;

          const getExitDistance = () =>
            Math.ceil((characterRef.current?.offsetHeight ?? 220) + 64);

          gsap.set(characterParts, { autoAlpha: 1 });

          gsap.to(characterParts, {
            y: getExitDistance,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              id: "hero-character-exit",
              trigger: root,
              start: "top top",
              end: () => `+=${Math.max(240, Math.round(window.innerHeight * 0.34))}`,
              scrub: 0.14,
              invalidateOnRefresh: true,
              refreshPriority: 0,
            },
          });
        }
      );

      return () => media.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="top"
      className="hero-root relative px-6 pt-32 pb-24 sm:px-10 lg:flex lg:h-[100svh] lg:min-h-0 lg:flex-col lg:justify-center lg:overflow-clip lg:py-0"
    >
      <div
        data-hero-stage
        className="relative mx-auto w-full max-w-[1600px] lg:h-[clamp(560px,60svh,720px)]"
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
                <span className="hero-name-text block leading-[0.96] text-[clamp(3.35rem,15vw,7.6rem)] text-[#1A1C24] lg:text-[clamp(4.8rem,6.4vw,7.6rem)]">
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
                <span className="hero-role-text block leading-[1.02] text-[clamp(2.5rem,10vw,5.8rem)] text-[#2258F4] lg:text-[clamp(3.7rem,4.8vw,5.8rem)]">
                  AI产品设计师
                </span>
              </span>
            </h1>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                data-magnetic-button
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHomeSection("work");
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
              {!hideContactDetails && (
                <a
                  data-magnetic-button
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHomeSection("contact");
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
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="hero-capability-board relative z-10 mt-14 grid w-full gap-4 sm:grid-cols-2 lg:absolute lg:inset-0 lg:mt-0 lg:block"
          aria-label="能力摘要"
        >
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 1600 720"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M80 120 H490 M1110 150 H1520 M70 556 H480 M1120 588 H1530 M800 238 V482"
              fill="none"
              stroke="#CBCDD4"
              strokeWidth="1"
              strokeDasharray="7 9"
              opacity="0.72"
            />
            <path
              d="M490 120 C608 136 674 184 720 238 M1110 150 C990 162 924 198 880 238 M480 556 C606 540 680 510 732 482 M1120 588 C990 554 922 514 872 482"
              fill="none"
              stroke="#A8BEFF"
              strokeWidth="1"
              opacity="0.58"
            />
            {[
              [490, 120],
              [1110, 150],
              [480, 556],
              [1120, 588],
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
              <div
                className="hero-note-card relative p-3.5 sm:p-4 lg:p-[clamp(0.8rem,1.05vw,1rem)]"
                style={{
                  background: "#FFFFFF",
                  borderColor: card.tone.line,
                }}
                >
                <span aria-hidden="true" className="hero-note-selection-frame" />
                <span aria-hidden="true" className="hero-note-selection-handle hero-note-selection-handle-tl" />
                <span aria-hidden="true" className="hero-note-selection-handle hero-note-selection-handle-tr" />
                <span aria-hidden="true" className="hero-note-selection-handle hero-note-selection-handle-bl" />
                <span aria-hidden="true" className="hero-note-selection-handle hero-note-selection-handle-br" />
                <div className="hero-note-meta mb-2.5 flex items-center justify-between gap-4">
                  <span>{card.label}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="hero-note-entry" style={{ background: card.tone.fill }}>
                  <ul className="hero-note-text text-[clamp(0.875rem,0.92vw,0.92rem)] leading-[1.42] text-[#1A1C24]">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="grid grid-cols-[6px_minmax(0,1fr)] items-start gap-2 border-b py-1.5 first:pt-0"
                        style={{ borderColor: card.tone.line }}
                      >
                        <span
                          className="mt-[0.55em] size-1.5 rounded-full"
                          style={{ background: card.tone.dot }}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  aria-hidden="true"
                  data-note-cursor
                  className={`hero-note-cursor pointer-events-none absolute z-10 hidden select-none lg:inline-flex ${collaborationCursorLayouts[index]}`}
                  style={{ color: card.tone.dot }}
                >
                  <svg
                    className="hero-note-cursor-arrow"
                    viewBox="0 0 22 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.25 1.75L19.25 10.15L11.65 12.45L8.85 21.2L2.25 1.75Z"
                      fill="currentColor"
                      stroke="#FAFBFF"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </motion.div>
      </div>

      {/* Character peeks from behind the marquee. */}
      <div
        ref={characterRef}
        data-hero-character-part
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[24px] left-1/2 z-10 hidden aspect-[774/567] w-[var(--hero-character-width)] -translate-x-1/2 select-none will-change-transform lg:block"
      >
        <img
          src="./images/首页人物/face-peek.png"
          alt=""
          draggable={false}
          className="absolute inset-0 size-full"
        />
        <img
          src="./images/首页人物/eyes-peek.png"
          alt=""
          draggable={false}
          data-character-eye
          className="absolute left-[31.137%] top-[74.25%] w-[8.269%] will-change-transform"
        />
        <img
          src="./images/首页人物/eyes-peek.png"
          alt=""
          draggable={false}
          data-character-eye
          className="absolute left-[60.078%] top-[74.25%] w-[8.269%] will-change-transform"
        />
      </div>

      <HeroProjectPeekCard variant="ai" />
      <HeroProjectPeekCard variant="qixin" />

      {/* Marquee — seamless infinite loop */}
      <Marquee words={marqueeWords} />
    </section>
  );
}
