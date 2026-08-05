import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ProjectCard } from "./ProjectCard";

gsap.registerPlugin(useGSAP);

type ProjectPreloadKey = "ai-report" | "qixin-brain";

interface ProjectsProps {
  onProjectIntent?: (project: ProjectPreloadKey, priority?: "high" | "low") => void;
}

export function Projects({ onProjectIntent }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const projects = [
    {
      number: "01",
      title: "启信产业大脑",
      subtitle: "产业分析与招商服务平台 · 服务政府客户",
      role: "产品设计师",
      description:
        "面向地区招商与产业分析场景,主要服务政府及相关业务部门,辅助区域产业研究、招商研判与产业发展决策。围绕产业从集聚到集群的全流程监测。",
      highlights: [
        "结合业务方向进行页面方案设计与高保真还原",
        "复杂业务场景下的信息结构梳理与结果展示优化",
        "跟进开发流程与最终上线结果,推动设计方案准确落地",
        "覆盖产业链优劣势分析、企业迁入迁出监控、产业集聚与集群分析",
      ],
      tags: ["B 端设计", "数据可视化", "政务服务", "产业分析"],
      accent: "from-[#2258F4] to-[#618AFF]",
      href: "#/project/qixin-brain",
      preloadKey: "qixin-brain" as const,
      visual: "imagePreview" as const,
      previewImage: "./images/首页/自定义产业链.png",
      previewAlt: "启信产业大脑自定义产业链界面截图",
      previewImageWidth: "108%",
      previewImageLeft: "-18px",
      previewImageTop: "0px",
      previewMoveX: 58,
      previewMoveY: 34,
      hoverCharacter: "./images/首页人物/1.png",
      hoverCharacterClassName:
        "-top-[220px] right-[7%] w-[clamp(220px,15vw,285px)]",
    },
    {
      number: "02",
      title: "AI 报告生成创新项目",
      role: "产品设计师",
      description:
        "基于 AI Agent 架构与多源数据整合能力,支持根据用户模板自动生成产业分析报告与企业分析报告。1.0 版本已上线。",
      highlights: [
        "主导制定 AI 报告生成场景的提示词基础框架,沉淀标准化提示词结构",
        "负责产品流程、核心页面与结果展示设计，推动 1.0 上线并完成设计验收闭环",
        "梳理生成式内容场景下的提示词框架,兼顾业务逻辑、内容呈现与维护效率",
        "提升报告生成稳定性与团队协作效率,降低提示词撰写与维护门槛",
      ],
      tags: ["AI 智能体", "提示词体系", "生成式体验", "多源数据"],
      accent: "from-[#0D800D] to-[#64BC64]",
      href: "#/project/ai-report",
      preloadKey: "ai-report" as const,
      visual: "imagePreview" as const,
      previewImage: "./images/首页/AI报告生成.png",
      previewAlt: "AI 报告生成产品界面截图",
      previewImageWidth: "100%",
      previewImageLeft: "0px",
      previewImageTop: "0px",
      previewMoveX: 54,
      previewMoveY: 34,
      hoverCharacter: "./images/首页人物/2.png",
      hoverCharacterClassName:
        "-top-[225px] left-[9%] w-[clamp(165px,11vw,215px)]",
    },
  ];

  const projectGridColumns = projects.length > 2 ? "xl:grid-cols-3" : "xl:grid-cols-2";

  useGSAP(
    (_, contextSafe) => {
      const section = sectionRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const shells = gsap.utils.toArray<HTMLElement>(".project-card-shell", section);
      const cleanups: Array<() => void> = [];

      shells.forEach((shell) => {
        const character = shell.querySelector<HTMLElement>("[data-project-hover-character]");
        if (!character) return;

        gsap.set(character, {
          yPercent: 100,
          y: 24,
          scaleX: 0.98,
          scaleY: 0.96,
          transformOrigin: "50% 100%",
          force3D: true,
        });

        const springCharacter = contextSafe((show: boolean) => {
          gsap.killTweensOf(character);

          if (reduceMotion) {
            gsap.set(character, {
              yPercent: show ? 0 : 100,
              y: show ? 0 : 24,
              scaleX: show ? 1 : 0.98,
              scaleY: show ? 1 : 0.96,
            });
            return;
          }

          gsap.to(character, {
            yPercent: show ? 0 : 100,
            y: show ? 0 : 24,
            scaleX: show ? 1 : 0.98,
            scaleY: show ? 1 : 0.96,
            duration: show ? 0.9 : 0.78,
            ease: show ? "elastic.out(0.8, 0.42)" : "elastic.out(0.7, 0.44)",
            overwrite: "auto",
          });
        });

        const showCharacter = () => springCharacter(true);
        const hideCharacter = () => springCharacter(false);
        const handleFocusOut = (event: FocusEvent) => {
          if (!shell.contains(event.relatedTarget as Node | null)) {
            hideCharacter();
          }
        };

        shell.addEventListener("pointerenter", showCharacter);
        shell.addEventListener("pointerleave", hideCharacter);
        shell.addEventListener("focusin", showCharacter);
        shell.addEventListener("focusout", handleFocusOut);

        cleanups.push(() => {
          shell.removeEventListener("pointerenter", showCharacter);
          shell.removeEventListener("pointerleave", hideCharacter);
          shell.removeEventListener("focusin", showCharacter);
          shell.removeEventListener("focusout", handleFocusOut);
          gsap.killTweensOf(character);
        });
      });

      return () => cleanups.forEach((cleanup) => cleanup());
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative pt-8 pb-24 px-6 sm:px-10 md:pt-12 md:pb-32 lg:px-16 xl:px-20 2xl:px-32"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-16">
          <div>
            <h2 className="tracking-tight text-[#1A1C24] text-[clamp(2rem,5.5vw,4.5rem)]">
              产品案例
            </h2>
          </div>
        </div>

        <div className={`grid grid-cols-1 items-stretch gap-6 ${projectGridColumns}`}>
          {projects.map((p, i) => (
            <div
              key={p.number}
              className="project-card-shell relative isolate h-full"
              data-project-number={p.number}
            >
              <img
                src={p.hoverCharacter}
                alt=""
                aria-hidden="true"
                draggable={false}
                data-project-hover-character
                className={`project-card-character pointer-events-none absolute z-0 hidden max-w-none select-none xl:block ${p.hoverCharacterClassName}`}
              />
              <ProjectCard
                {...p}
                index={i}
                onIntent={p.preloadKey ? () => onProjectIntent?.(p.preloadKey, "high") : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
