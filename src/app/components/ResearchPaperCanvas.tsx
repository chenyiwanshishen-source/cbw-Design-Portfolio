import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TOP_SCALE = Array.from({ length: 17 }, (_, index) => String(index).padStart(2, "0"));
const SIDE_SCALE = Array.from({ length: 10 }, (_, index) => String(index).padStart(2, "0"));
const RESEARCHER_FRAMES = [
  { file: "1.webp", size: "h-[89.29%] sm:h-[90.16%] lg:h-[90.91%]" },
  { file: "2.webp", size: "h-full" },
  { file: "3.webp", size: "h-[89.29%] sm:h-[90.16%] lg:h-[90.91%]" },
  { file: "4.webp", size: "h-[89.29%] sm:h-[90.16%] lg:h-[90.91%]" },
  { file: "5.webp", size: "h-[89.29%] sm:h-[90.16%] lg:h-[90.91%]" },
];
const STAGE_NOTES = [
  {
    number: "01",
    title: "任务定义",
    task: "明确对象、范围与口径",
    issue: "范围尚未完全收敛",
    mood: "谨慎，还有些不确定",
    emotions: ["01.svg", "02.svg"],
    tone: "cream",
    pin: "blue",
    className: "md:mt-2 md:-rotate-[0.8deg]",
  },
  {
    number: "02",
    title: "材料整理",
    task: "汇总材料与企业名单",
    issue: "格式和统计口径冲突",
    mood: "信息过载",
    emotions: ["03.svg"],
    tone: "blue",
    pin: "coral",
    className: "md:-mt-1 md:rotate-[0.7deg]",
  },
  {
    number: "03",
    title: "生成前确认",
    task: "确认企业与章节边界",
    issue: "调整会牵动多个章节",
    mood: "预期逐渐清晰",
    emotions: ["02.svg"],
    tone: "cream",
    pin: "blue",
    className: "md:mt-1 md:-rotate-[0.35deg]",
  },
  {
    number: "04",
    title: "内容生成",
    task: "生成内容并查看状态",
    issue: "偏差可能导致重新生成",
    mood: "期待，也担心跑偏",
    emotions: ["03.svg"],
    tone: "blue",
    pin: "coral",
    className: "md:-mt-1 md:rotate-[0.9deg]",
  },
  {
    number: "05",
    title: "核查交付",
    task: "核查事实、结论与来源",
    issue: "依据缺失时不敢交付",
    mood: "交付信心回升",
    emotions: ["03.svg", "02.svg"],
    tone: "cream",
    pin: "blue",
    className: "md:mt-2 md:-rotate-[0.65deg]",
  },
] as const;
const JOURNEY_SEGMENT_WIDTHS = [1.45, 2.1, 1.6, 2.45];
const JOURNEY_ACCENT_DASHES = [
  "12 16 4 68",
  "8 22 3 67",
  "14 18 3 65",
  "10 14 5 71",
];
const CLASSIFIED_NOTE_TARGETS = [
  { x: 0.055, y: 0.1 },
  { x: 0.245, y: 0.1 },
  { x: 0.435, y: 0.1 },
  { x: 0.075, y: 0.44 },
  { x: 0.075, y: 0.76 },
] as const;
const CLASSIFICATION_ARROWS = [
  {
    line: "M 63.2 22 L 77.2 22",
    head: "M 74.7 20 L 77.2 22 L 74.7 24",
  },
  {
    line: "M 28.2 56 L 45.7 56",
    head: "M 43.2 54 L 45.7 56 L 43.2 58",
  },
  {
    line: "M 28.2 88 L 44 88",
    head: "M 41.5 86 L 44 88 L 41.5 90",
  },
] as const;
const CLASSIFICATION_LABELS = [
  { text: "生成前：范围先确认", x: 79.2, y: 22 },
  { text: "生成中：过程可干预", x: 48, y: 56 },
  { text: "生成后：结果可追溯", x: 46.3, y: 88 },
] as const;

type JourneyStage = {
  stage: string;
  x: number;
  y: number;
};

type ResearchPaperCanvasProps = {
  stages: readonly JourneyStage[];
  journeyPath: string;
  journeyPathSegments: readonly string[];
  title?: string;
  subtitle?: string;
};

type PaperNoteProps = {
  tone: "white" | "blue";
  pin: "coral" | "blue";
  title: string;
  subtitle?: string;
  items?: string[];
  className?: string;
};

function PaperNote({ tone, pin, title, subtitle, items, className = "" }: PaperNoteProps) {
  const paper =
    tone === "white"
      ? {
          background: "#FFFEF9",
          border: "#DED9CE",
          line: "rgba(132, 137, 146, 0.18)",
        }
      : {
          background: "#EEF4FF",
          border: "#C9D8F4",
          line: "rgba(75, 111, 174, 0.18)",
        };

  return (
    <div
      className={`relative overflow-visible rounded-[5px] border ${className}`}
      style={{
        backgroundColor: paper.background,
        borderColor: paper.border,
        boxShadow:
          "0 2px 3px rgba(28, 36, 52, 0.16), 0 7px 14px rgba(28, 36, 52, 0.055)",
      }}
    >
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-0 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 ${
          pin === "coral" ? "bg-[#F05B62]" : "bg-[#4A7BC7]"
        }`}
      />

      <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[4px]">
        <div className="absolute inset-x-0 top-[28%] space-y-[17%]">
          {Array.from({ length: 4 }, (_, index) => (
            <span
              key={index}
              className="block h-px w-full"
              style={{ backgroundColor: paper.line }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-[1] overflow-hidden px-1.5 pb-1.5 pt-2.5 sm:px-3 sm:pb-3 sm:pt-4 lg:px-4 lg:pb-4 lg:pt-5">
        <div className="text-[8px] font-semibold leading-tight text-[#20242D] sm:text-[16px] lg:text-[18px]">
          {title}
        </div>
        {subtitle ? (
          <div className="mt-0.5 text-[6px] leading-[1.4] text-[#686E7B] sm:mt-1 sm:text-[12px] lg:text-[14px]">
            {subtitle}
          </div>
        ) : null}
        {items ? (
          <ul className="mt-1.5 hidden list-disc space-y-0.5 pl-4 text-[12px] leading-[1.45] text-[#4F5B70] sm:block lg:mt-2 lg:text-[14px]">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

type StageNoteProps = (typeof STAGE_NOTES)[number];

function StageNote({
  number,
  title,
  task,
  issue,
  mood,
  emotions,
  tone,
  pin,
  className,
}: StageNoteProps) {
  const paper =
    tone === "cream"
      ? {
          background: "#FFFEF7",
          border: "#DED9CE",
          line: "rgba(132, 137, 146, 0.15)",
        }
      : {
          background: "#EEF4FF",
          border: "#C9D8F4",
          line: "rgba(75, 111, 174, 0.16)",
        };

  return (
    <article
      data-research-stage-note={number}
      className={`relative min-h-[186px] overflow-visible rounded-[6px] border px-3 pb-3 pt-4 shadow-[0_14px_30px_rgba(28,36,52,0.09)] sm:min-h-[194px] sm:px-4 sm:pb-4 sm:pt-5 md:min-h-[210px] md:px-3 md:pb-3 lg:min-h-[194px] lg:px-4 lg:pb-4 xl:min-h-[186px] ${className}`}
      style={{
        backgroundColor: paper.background,
        borderColor: paper.border,
      }}
    >
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-0 z-20 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_1px_0_rgba(36,40,49,0.14)] sm:size-3.5 ${
          pin === "coral" ? "bg-[#F05B62]" : "bg-[#4A7BC7]"
        }`}
      />

      <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[5px]">
        <div className="absolute inset-x-0 top-[31%] space-y-7 sm:space-y-8">
          {Array.from({ length: 4 }, (_, index) => (
            <span
              key={index}
              className="block h-px w-full"
              style={{ backgroundColor: paper.line }}
            />
          ))}
        </div>
      </div>

      <div
        data-research-stage-emotions="true"
        aria-hidden="true"
        className="absolute right-2 top-0 z-20 flex -translate-y-[58%] items-center gap-2 sm:right-3"
      >
        {emotions.map((emotion) => (
          <img
            key={`${number}-${emotion}`}
            src={`./images/用户画像/表情/${emotion}`}
            alt=""
            className="size-8 rounded-full object-contain sm:size-9 lg:size-10"
            loading="eager"
            decoding="async"
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-baseline gap-2 pr-9 sm:pr-10">
          <span className="font-mono text-[10px] font-semibold tracking-[0.12em] text-[#2258F4] sm:text-[11px]">
            {number}
          </span>
          <h3 className="text-[16px] font-semibold leading-tight text-[#20242D]">
            {title}
          </h3>
        </div>

        <dl className="mt-3 space-y-1.5 text-[14px] leading-[1.5] text-[#4F5B70]">
          {[
            ["在做", task],
            ["卡点", issue],
            ["心情", mood],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[2.5em_minmax(0,1fr)] gap-1.5">
              <dt className="font-semibold text-[#737B8C]">{label}</dt>
              <dd className="font-medium text-[#3E4655]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export function ResearchPaperCanvas({
  stages,
  journeyPath,
  journeyPathSegments,
  title = "从报告生产链路中定位 AI 生成的设计控制点",
  subtitle = "基于客户需求、内部测试和历史交付复盘，我将报告生成过程拆解为多个关键阶段，识别用户在每一步的失控点，并转化为可配置、可确认、可追溯的系统能力。",
}: ResearchPaperCanvasProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedCanvasRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinnedCanvas = pinnedCanvasRef.current;
      if (!section || !pinnedCanvas) return;

      const drawMasks = gsap.utils.toArray<SVGPathElement>("[data-journey-draw-mask]", section);
      const researcherFrames = gsap.utils.toArray<HTMLElement>("[data-researcher-stage]", section);
      const journeyStageNodes = gsap.utils.toArray<HTMLElement>(
        "[data-research-journey-stage]",
        section
      );
      const stageNotes = gsap.utils.toArray<HTMLElement>("[data-research-stage-note]", section);
      const stageEmotions = gsap.utils.toArray<HTMLElement>(
        "[data-research-stage-emotions]",
        section
      );
      const classificationArrowLines = gsap.utils.toArray<SVGPathElement>(
        "[data-classification-arrow-line]",
        section
      );
      const classificationArrowHeads = gsap.utils.toArray<SVGPathElement>(
        "[data-classification-arrow-head]",
        section
      );
      const classificationArrowGroups = gsap.utils.toArray<SVGGElement>(
        "[data-classification-arrow]",
        section
      );
      const classificationLabels = gsap.utils.toArray<HTMLElement>(
        "[data-classification-label]",
        section
      );
      const strategyNote = section.querySelector<HTMLElement>("[data-research-strategy-note]");
      const profileCharacter = section.querySelector<HTMLElement>(
        "[data-research-profile-character]"
      );
      const researchCanvas = section.querySelector<HTMLElement>("[data-research-paper-canvas]");
      const journeyCurve = section.querySelector<HTMLElement>("[data-research-journey-curve]");
      if (
        !profileCharacter ||
        !researchCanvas ||
        !journeyCurve ||
        !strategyNote ||
        !drawMasks.length ||
        researcherFrames.length !== drawMasks.length + 1 ||
        journeyStageNodes.length !== researcherFrames.length ||
        stageNotes.length !== researcherFrames.length ||
        stageEmotions.length !== stageNotes.length ||
        CLASSIFIED_NOTE_TARGETS.length !== stageNotes.length ||
        classificationArrowLines.length !== CLASSIFICATION_ARROWS.length ||
        classificationArrowHeads.length !== CLASSIFICATION_ARROWS.length ||
        classificationArrowGroups.length !== CLASSIFICATION_ARROWS.length ||
        classificationLabels.length !== CLASSIFICATION_LABELS.length
      )
        return;

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduceMotion: boolean;
          };

          if (!desktop || reduceMotion) {
            gsap.set(drawMasks, { strokeDashoffset: 0 });
            gsap.set([...classificationArrowLines, ...classificationArrowHeads], {
              strokeDashoffset: 0,
            });
            gsap.set(classificationArrowGroups, { autoAlpha: 0.88 });
            gsap.set(classificationLabels, { autoAlpha: 1, x: 0, rotation: 0 });
            gsap.set(strategyNote, { autoAlpha: 1, y: 0, scale: 1, rotation: -0.7 });
            gsap.set(researchCanvas, { autoAlpha: 1, y: 0 });
            gsap.set([profileCharacter, journeyCurve], { autoAlpha: 1 });
            gsap.set(researcherFrames, { autoAlpha: 1, y: 0, scale: 1 });
            gsap.set(journeyStageNodes, { autoAlpha: 1, scale: 1 });
            gsap.set(stageNotes, { autoAlpha: 1, y: 0, scale: 1 });
            gsap.set(stageEmotions, { autoAlpha: 1, y: 0 });
            section.dataset.journeyScrollProgress = "1.000";
            section.dataset.journeyStep = String(researcherFrames.length).padStart(2, "0");
            section.dataset.journeyScene = "static";
            return;
          }

          gsap.set(drawMasks, { strokeDashoffset: 100 });
          gsap.set([...classificationArrowLines, ...classificationArrowHeads], {
            strokeDashoffset: 100,
          });
          gsap.set(classificationArrowGroups, { autoAlpha: 0 });
          gsap.set(classificationLabels, { autoAlpha: 0, x: 8, rotation: 0 });
          gsap.set(strategyNote, {
            autoAlpha: 0,
            y: 34,
            scale: 0.96,
            rotation: -2,
            transformOrigin: "50% 100%",
          });
          gsap.set(researchCanvas, { autoAlpha: 0, y: 160 });
          gsap.set([profileCharacter, journeyCurve], { autoAlpha: 1 });
          gsap.set(researcherFrames, {
            autoAlpha: 0,
            y: 18,
            scale: 0.96,
            transformOrigin: "50% 100%",
          });
          gsap.set(journeyStageNodes, {
            autoAlpha: 0,
            scale: 0.82,
            transformOrigin: "50% 50%",
          });
          gsap.set(stageNotes, {
            autoAlpha: 0,
            y: 28,
            scale: 0.96,
            transformOrigin: "50% 0%",
          });
          gsap.set(stageEmotions, { autoAlpha: 1, y: 0 });
          section.dataset.journeyScrollProgress = "0.000";
          section.dataset.journeyStep = "00";
          section.dataset.journeyScene = "profile";

          const stepTimeline = gsap.timeline({ paused: true });
          const canvasReadyAt = 1;
          const firstStageAt = canvasReadyAt;
          const journeyDrawStartAt = 2;
          const journeyCompleteAt = journeyDrawStartAt + drawMasks.length;
          const clearDuration = 0.8;
          const classifyStartAt = journeyCompleteAt + clearDuration;
          const classifyDuration = 1;
          const arrowDrawStartAt = classifyStartAt + classifyDuration;
          const arrowDrawDuration = 1;
          const strategyRevealStartAt = arrowDrawStartAt + arrowDrawDuration;
          const strategyRevealDuration = 0.8;

          const getClassifiedNoteOffset = (
            note: HTMLElement,
            index: number,
            axis: "x" | "y"
          ) => {
            const target = CLASSIFIED_NOTE_TARGETS[index];
            if (!pinnedCanvas || !researchCanvas) return 0;

            const targetXInCanvas = researchCanvas.offsetWidth * target.x;
            const targetYInCanvas = researchCanvas.offsetHeight * target.y;

            const canvasLeft = researchCanvas.offsetLeft;
            const canvasTop = researchCanvas.offsetTop;

            const stageNotesContainer = note.parentElement;
            const noteLeft = (stageNotesContainer?.offsetLeft ?? 0) + note.offsetLeft;
            const noteTop = (stageNotesContainer?.offsetTop ?? 0) + note.offsetTop;

            if (axis === "x") {
              return canvasLeft + targetXInCanvas - noteLeft;
            } else {
              return canvasTop + targetYInCanvas - noteTop;
            }
          };

          stepTimeline
            .addLabel("canvas-enter", 0)
            .to(
              researchCanvas,
              { autoAlpha: 1, y: 0, duration: 0.82, ease: "none" },
              "canvas-enter"
            )
            .addLabel("canvas-ready", canvasReadyAt)
            .addLabel("journey-step-01", firstStageAt)
            .to(
              researcherFrames[0],
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.24, ease: "none" },
              "journey-step-01"
            )
            .to(
              journeyStageNodes[0],
              { autoAlpha: 1, scale: 1, duration: 0.2, ease: "none" },
              firstStageAt + 0.1
            )
            .to(
              stageNotes[0],
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.28, ease: "none" },
              firstStageAt + 0.08
            )
            .addLabel("journey-draw-start", journeyDrawStartAt);

          drawMasks.forEach((mask, index) => {
            const segmentStart = journeyDrawStartAt + index;
            stepTimeline
              .to(mask, { strokeDashoffset: 0, duration: 0.78, ease: "none" }, segmentStart)
              .to(
                researcherFrames[index + 1],
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.22, ease: "none" },
                segmentStart + 0.58
              )
              .to(
                journeyStageNodes[index + 1],
                { autoAlpha: 1, scale: 1, duration: 0.18, ease: "none" },
                segmentStart + 0.74
              )
              .to(
                stageNotes[index + 1],
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.26, ease: "none" },
                segmentStart + 0.72
              )
              .addLabel(
                `journey-step-${String(index + 2).padStart(2, "0")}`,
                segmentStart + 1
              );
          });

          stepTimeline
            .addLabel("journey-complete", journeyCompleteAt)
            .to(
              researcherFrames,
              { autoAlpha: 0, y: -12, duration: clearDuration, ease: "none" },
              "journey-complete"
            )
            .to(
              journeyCurve,
              { autoAlpha: 0, duration: clearDuration, ease: "none" },
              "journey-complete"
            )
            .addLabel("journey-cleared", classifyStartAt)
            .addLabel("notes-classify", classifyStartAt)
            .to(
              stageEmotions,
              { autoAlpha: 0, y: -8, duration: 0.28, ease: "none" },
              "notes-classify"
            );

          stageNotes.forEach((note, index) => {
            stepTimeline.to(
              note,
              {
                x: () => getClassifiedNoteOffset(note, index, "x"),
                y: () => getClassifiedNoteOffset(note, index, "y"),
                duration: classifyDuration,
                ease: "none",
              },
              "notes-classify"
            );
          });

          stepTimeline
            .addLabel("notes-classified", arrowDrawStartAt)
            .addLabel("classification-arrows", arrowDrawStartAt)
            .to(
              classificationArrowGroups,
              { autoAlpha: 0.88, duration: 0.01, ease: "none" },
              "classification-arrows"
            )
            .to(
              classificationArrowLines,
              { strokeDashoffset: 0, duration: 0.78, ease: "none" },
              "classification-arrows"
            )
            .to(
              classificationArrowHeads,
              { strokeDashoffset: 0, duration: 0.22, ease: "none" },
              arrowDrawStartAt + 0.72
            )
            .to(
              classificationLabels,
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.22,
                stagger: 0.03,
                ease: "none",
              },
              arrowDrawStartAt + 0.72
            )
            .addLabel("classification-arrows-ready", strategyRevealStartAt)
            .addLabel("strategy-note", strategyRevealStartAt)
            .to(
              strategyNote,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                rotation: -0.7,
                duration: strategyRevealDuration,
                ease: "none",
              },
              "strategy-note"
            )
            .addLabel("strategy-ready", strategyRevealStartAt + strategyRevealDuration);

          const timelineDuration = stepTimeline.duration();

          const updateProgressState = (progress: number) => {
            const timelineTime = progress * timelineDuration;
            const step =
              timelineTime < firstStageAt
                ? 0
                : Math.min(
                    researcherFrames.length,
                    Math.floor(Math.max(0, timelineTime - journeyDrawStartAt)) + 1
                  );
            section.dataset.journeyStep = String(step).padStart(2, "0");
            section.dataset.journeyScrollProgress = progress.toFixed(3);
            section.dataset.journeyScene =
              progress >= 1
                ? "strategy-ready"
                : timelineTime >= strategyRevealStartAt
                  ? "revealing-strategy"
                : timelineTime >= arrowDrawStartAt
                  ? "drawing-arrows"
                  : timelineTime >= classifyStartAt
                  ? "classifying"
                  : timelineTime >= journeyCompleteAt
                  ? "clearing"
                  : timelineTime >= journeyDrawStartAt
                    ? "journey"
                    : timelineTime >= firstStageAt
                      ? "task-definition"
                      : timelineTime > 0
                        ? "canvas-entering"
                        : "profile";
          };

          const pinTrigger = ScrollTrigger.create({
            id: "research-journey-steps",
            trigger: section,
            start: "top top",
            end: () => {
              const journeyScrollRange = Math.min(
                2800,
                Math.max(1800, Math.round(window.innerHeight * 1.5))
              );
              return `+=${Math.round(
                journeyScrollRange * (timelineDuration / drawMasks.length)
              )}`;
            },
            pin: pinnedCanvas,
            pinSpacing: true,
            animation: stepTimeline,
            scrub: true,
            anticipatePin: 0,
            invalidateOnRefresh: true,
            refreshPriority: 10,
            onUpdate: (self) => updateProgressState(self.progress),
            onRefresh: (self) => updateProgressState(self.progress),
          });

          let cancelled = false;
          let refreshFrame: number | null = null;

          const scheduleRefresh = () => {
            if (cancelled || refreshFrame !== null) return;

            refreshFrame = window.requestAnimationFrame(() => {
              refreshFrame = null;
              if (!cancelled) ScrollTrigger.refresh();
            });
          };

          const upstreamSections = ["#s03-product-scope", "#s02", "#s02-product-scope"]
            .map((selector) => document.querySelector<HTMLElement>(selector))
            .filter((element): element is HTMLElement => element !== null);
          const upstreamResizeObserver =
            typeof ResizeObserver === "undefined"
              ? null
              : new ResizeObserver(() => scheduleRefresh());

          upstreamSections.forEach((upstreamSection) =>
            upstreamResizeObserver?.observe(upstreamSection)
          );

          const handlePageLoad = () => scheduleRefresh();
          if (document.readyState === "complete") {
            scheduleRefresh();
          } else {
            window.addEventListener("load", handlePageLoad, { once: true });
          }

          document.fonts?.ready.then(() => scheduleRefresh());
          scheduleRefresh();

          return () => {
            cancelled = true;
            upstreamResizeObserver?.disconnect();
            window.removeEventListener("load", handlePageLoad);
            if (refreshFrame !== null) window.cancelAnimationFrame(refreshFrame);
            pinTrigger.kill();
            stepTimeline.kill();
          };
        }
      );

      return () => media.revert();
    },
    {
      scope: sectionRef,
      dependencies: [journeyPathSegments.length],
      revertOnUpdate: true,
    }
  );

  return (
    <section
      ref={sectionRef}
      id="s02-research-canvas"
      aria-label="研究画布原型"
      className="relative z-10 isolate min-h-screen overflow-hidden py-0 px-4 sm:px-8 lg:px-12 xl:px-16"
    >
      <div
        ref={pinnedCanvasRef}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col items-center justify-center py-6 sm:py-8 lg:py-10"
      >
        {/* Integrated Section Title & Subtitle */}
        <div className="mb-4 sm:mb-6 text-center max-w-[940px] px-4 shrink-0">
          <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold tracking-tight text-[#1A1C24]">
            {title}
          </h2>
          <p className="mt-1.5 sm:mt-2 text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] leading-[1.6] text-[#696D7A] max-w-[840px] mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Canvas & Notes Workspace (Centered Container) */}
        <div className="relative w-full max-w-[1340px] pt-8 sm:pt-10 lg:pt-12 shrink-0">
          <img
            data-research-profile-character="true"
            src="./images/ai报告人物动画webp/人物.webp"
            alt="研究员人物头像"
            className="pointer-events-none absolute left-0 top-0 z-20 h-auto w-36 -translate-y-[24%] select-none sm:w-48 lg:w-56"
            style={{
              filter:
                "drop-shadow(0 2px 2px rgba(28, 36, 52, 0.18)) drop-shadow(0 7px 8px rgba(28, 36, 52, 0.065))",
            }}
          />

          <div
            data-paper-notes="true"
            className="pointer-events-none absolute left-[40%] right-1 top-2 z-30 grid -translate-y-[22%] grid-cols-[1.18fr_repeat(3,1fr)] items-start gap-1 sm:left-[20%] sm:right-0 sm:top-1 sm:gap-2.5 lg:top-2 lg:gap-3.5"
          >
            <PaperNote
              tone="white"
              pin="coral"
              title="某研究员"
              subtitle="报告生产负责人"
              items={["任职于某机构或公司", "负责产业、区域与企业研究报告", "对范围、来源和交付质量负责"]}
              className="-rotate-[1.2deg]"
            />
            <PaperNote
              tone="blue"
              pin="coral"
              title="需求"
              items={["根据业务模板生成报告", "汇总多个数据源的信息", "核查来源并复用结果"]}
              className="mt-2 rotate-[1.4deg] sm:mt-4 lg:mt-5"
            />
            <PaperNote
              tone="blue"
              pin="blue"
              title="痛点"
              items={["材料分散，来源难统一", "固定模板难应对变化", "生成过程不透明"]}
              className="mt-0.5 -rotate-[0.8deg] sm:mt-1.5 lg:mt-2"
            />
            <PaperNote
              tone="blue"
              pin="coral"
              title="目标"
              items={["缩短报告生产时间", "降低返工与核查成本", "提升报告交付信心"]}
              className="mt-2.5 rotate-[0.9deg] sm:mt-5 lg:mt-6"
            />
          </div>

          <div
            data-research-paper-canvas="true"
            className="relative z-10 overflow-hidden rounded-[28px] border border-[#E6E7EB] bg-white"
          >
          <div className="relative min-h-[500px] bg-white sm:min-h-[520px] lg:aspect-[16/8.5] lg:min-h-0">
            <div
              className="pointer-events-none absolute bottom-3 left-7 right-3 top-7 rounded-[18px] border border-[#E6E7EB] sm:bottom-4 sm:left-8 sm:right-4 sm:top-8"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 rounded-[17px]"
                style={{
                  backgroundColor: "#FFFFFF",
                  backgroundImage:
                    "linear-gradient(rgba(107, 120, 150, 0.075) 1px, transparent 1px), linear-gradient(90deg, rgba(107, 120, 150, 0.075) 1px, transparent 1px), linear-gradient(rgba(107, 120, 150, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(107, 120, 150, 0.035) 1px, transparent 1px)",
                  backgroundSize: "112px 112px, 112px 112px, 28px 28px, 28px 28px",
                }}
              />

              <div className="absolute inset-x-0 top-0 grid -translate-y-[calc(100%+9px)] grid-cols-17 px-1">
                {TOP_SCALE.map((mark) => (
                  <span
                    key={mark}
                    className="relative text-center text-[8px] font-medium tabular-nums text-[#7F8AA3] sm:text-[9px]"
                  >
                    {mark}
                    <span className="absolute left-1/2 top-[calc(100%+3px)] h-1.5 w-px -translate-x-1/2 bg-[#AAB2C2]" />
                  </span>
                ))}
              </div>

              <div className="absolute inset-y-0 left-0 grid -translate-x-[calc(100%+9px)] grid-rows-10 py-1">
                {SIDE_SCALE.map((mark) => (
                  <span
                    key={mark}
                    className="relative flex items-center justify-end text-[8px] font-medium tabular-nums text-[#7F8AA3] sm:text-[9px]"
                  >
                    {mark}
                    <span className="absolute left-[calc(100%+3px)] top-1/2 h-px w-1.5 -translate-y-1/2 bg-[#AAB2C2]" />
                  </span>
                ))}
              </div>
            </div>

            <div
              data-research-journey-curve="true"
              className="pointer-events-none absolute bottom-3 left-7 right-3 z-[5] h-[39%] sm:bottom-4 sm:left-8 sm:right-4 sm:h-[36%] lg:h-[37%]"
              aria-label="任务定义、材料整理、生成前确认、内容生成、核查交付五阶段情绪曲线"
            >
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <filter
                    id="research-journey-pencil-texture"
                    x="-6%"
                    y="-10%"
                    width="112%"
                    height="120%"
                    colorInterpolationFilters="sRGB"
                  >
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.035 0.12"
                      numOctaves="2"
                      seed="17"
                      stitchTiles="stitch"
                      result="research-journey-pencil-noise"
                    />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="research-journey-pencil-noise"
                      scale="0.42"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                  </filter>

                  <mask
                    id="research-journey-scroll-reveal"
                    x="-10"
                    y="-10"
                    width="120"
                    height="120"
                    maskUnits="userSpaceOnUse"
                    maskContentUnits="userSpaceOnUse"
                  >
                    {journeyPathSegments.map((segment, index) => (
                      <path
                        key={`journey-draw-mask-${index}`}
                        data-journey-draw-mask={String(index + 1).padStart(2, "0")}
                        d={segment}
                        pathLength="100"
                        stroke="white"
                        strokeWidth="9"
                        strokeDasharray="100"
                        strokeDashoffset="0"
                        strokeLinecap="butt"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    ))}
                  </mask>
                </defs>

                <path
                  d={journeyPath}
                  stroke="#8A909B"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.2"
                  filter="url(#research-journey-pencil-texture)"
                  mask="url(#research-journey-scroll-reveal)"
                  vectorEffect="non-scaling-stroke"
                />

                {journeyPathSegments.map((segment, index) => (
                  <path
                    key={`journey-pencil-segment-${index}`}
                    d={segment}
                    stroke="#242831"
                    strokeWidth={JOURNEY_SEGMENT_WIDTHS[index] ?? 1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.88"
                    filter="url(#research-journey-pencil-texture)"
                    mask="url(#research-journey-scroll-reveal)"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                {journeyPathSegments.map((segment, index) => (
                  <path
                    key={`journey-pencil-accent-${index}`}
                    d={segment}
                    pathLength="100"
                    stroke="#12A9D6"
                    strokeWidth={index === 3 ? 1.05 : 0.78}
                    strokeDasharray={JOURNEY_ACCENT_DASHES[index] ?? "10 18 3 69"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.9"
                    filter="url(#research-journey-pencil-texture)"
                    mask="url(#research-journey-scroll-reveal)"
                    transform="translate(0.1 -0.16)"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              {stages.map((item, index) => (
                <div
                  key={`research-journey-stage-${item.stage}`}
                  data-research-journey-stage={String(index + 1).padStart(2, "0")}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                >
                  <span className="block size-2.5 rounded-full border-[1.5px] border-[#242831] bg-white shadow-[0_1px_0_rgba(36,40,49,0.16)] sm:size-3" />
                  <span className="absolute left-1/2 top-[calc(100%+7px)] -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold leading-none text-[#4E525E] sm:text-[11px] lg:text-[12px]">
                    {item.stage}
                  </span>
                </div>
              ))}
            </div>

            <div
              data-researcher-frames="true"
              className="pointer-events-none absolute left-7 right-3 top-[calc(5%+26px)] z-10 grid h-[47.04%] grid-cols-5 grid-rows-1 gap-2 sm:left-8 sm:right-4 sm:top-[calc(5%+29.6px)] sm:h-[51.24%] sm:gap-4 lg:h-[55.44%] lg:gap-6"
            >
              {RESEARCHER_FRAMES.map(({ file, size }, index) => (
                <div
                  key={file}
                  data-researcher-stage={String(index + 1).padStart(2, "0")}
                  className="flex h-full min-h-0 min-w-0 items-end justify-center"
                >
                  <img
                    src={`./images/ai报告人物动画webp/${file}`}
                    alt={`研究员阶段人物 ${file.replace(".webp", "")}`}
                    className={`block w-auto max-h-full max-w-full select-none object-contain object-bottom ${size}`}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </div>

            <svg
              data-research-classification-arrows="true"
              className="pointer-events-none absolute inset-0 z-[15] h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                {CLASSIFICATION_ARROWS.map((arrow, index) => (
                  <mask
                    key={`classification-arrow-mask-${index + 1}`}
                    id={`research-classification-arrow-mask-${index + 1}`}
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    maskUnits="userSpaceOnUse"
                    maskContentUnits="userSpaceOnUse"
                  >
                    <path
                      data-classification-arrow-line={String(index + 1).padStart(2, "0")}
                      d={arrow.line}
                      pathLength="100"
                      stroke="white"
                      strokeWidth="7"
                      strokeDasharray="100"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      data-classification-arrow-head={String(index + 1).padStart(2, "0")}
                      d={arrow.head}
                      pathLength="100"
                      stroke="white"
                      strokeWidth="7"
                      strokeDasharray="100"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </mask>
                ))}
              </defs>

              {CLASSIFICATION_ARROWS.map((arrow, index) => (
                <g
                  key={`classification-arrow-${index + 1}`}
                  data-classification-arrow={String(index + 1).padStart(2, "0")}
                  stroke="#4F5B70"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  mask={`url(#research-classification-arrow-mask-${index + 1})`}
                >
                  <path
                    d={arrow.line}
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={arrow.head}
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ))}
            </svg>

            <div
              className="pointer-events-none absolute inset-0 z-[16]"
              aria-label="阶段分类结论"
            >
              {CLASSIFICATION_LABELS.map((label, index) => (
                <span
                  key={label.text}
                  data-classification-label={String(index + 1).padStart(2, "0")}
                  className="absolute whitespace-nowrap text-[15px] font-medium leading-none tracking-[0.02em] text-[#3E4655] sm:text-[17px] lg:text-[18px]"
                  style={{
                    left: `${label.x}%`,
                    top: `${label.y}%`,
                    transform: "translateY(-50%)",
                  }}
                >
                  {label.text}
                </span>
              ))}
            </div>

            <aside
              data-research-strategy-note="true"
              aria-label="设计策略结论"
              className="pointer-events-none absolute right-[3%] top-[59%] z-[18] w-[44%] rounded-[4px] border border-[#C7D9B8] bg-[#F1F8EA] px-3 pb-3 pt-5 shadow-[0_2px_3px_rgba(42,62,35,0.16),0_10px_24px_rgba(42,62,35,0.08)] sm:right-[4%] sm:top-[62%] sm:w-[34%] sm:px-5 sm:pb-5 sm:pt-7 lg:right-[4.5%] lg:w-[30%] lg:px-7 lg:pb-6 lg:pt-9"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(89, 120, 72, 0.13) 1px, transparent 1px)",
                backgroundPosition: "0 49px",
                backgroundSize: "100% 28px",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-0 z-20 h-5 w-16 -translate-x-1/2 -translate-y-[42%] rotate-[1.5deg] bg-[#D6E7BD]/90 shadow-[0_1px_2px_rgba(42,62,35,0.12)] sm:h-7 sm:w-24 lg:h-8 lg:w-28"
                style={{
                  clipPath:
                    "polygon(2% 12%, 8% 4%, 18% 9%, 29% 2%, 42% 7%, 55% 1%, 68% 8%, 81% 3%, 98% 10%, 96% 88%, 85% 95%, 73% 90%, 59% 98%, 45% 92%, 31% 97%, 17% 89%, 3% 94%)",
                }}
              />

              <div className="relative z-10">
                <div className="text-[9px] font-semibold tracking-[0.14em] text-[#4F7A45] sm:text-[11px] lg:text-[13px]">
                  设计策略
                </div>
                <p className="mt-2 text-[10px] font-medium leading-[1.65] text-[#354232] sm:mt-3 sm:text-[13px] lg:mt-4 lg:text-[16px]">
                  以过程确认、数据来源管理与结果追溯为核心，构建可控、可信的报告生成链路，支持用户完成目标报告。
                </p>
              </div>
            </aside>
          </div>
        </div>

        {/* 5 Stage Notes */}
        <div
          data-research-stage-notes="true"
          aria-label="五个报告研究阶段便笺"
          className="relative z-20 mt-4 grid grid-cols-1 gap-3 px-2 sm:grid-cols-2 sm:px-6 md:-mt-8 md:grid-cols-5 md:items-start md:gap-2.5 md:pl-6 md:pr-2 lg:gap-3 lg:pl-7 lg:pr-3"
        >
          {STAGE_NOTES.map((note) => (
            <StageNote key={note.number} {...note} />
          ))}
        </div>
      </div>
    </div>
  </section>
);
}
