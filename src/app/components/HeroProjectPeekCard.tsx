import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { preloadProjectDetailAssets } from "../projectPreload";

type HeroProjectPeekCardProps = {
  variant: "ai" | "qixin";
  revealed: boolean;
};
const projectData = {
  ai: { href: "#/project/ai-report", ariaLabel: "打开 AI 报告生成项目", title: "AI 报告生成", tags: ["AI 产品 0-1", "Prompt / Workflow", "B 端效率"], responsibilities: ["产品流程与核心页面设计", "Prompt 框架与生成体验设计"], image: "./images/首页webp/AI报告生成.webp", handClass: "hero-project-peek-hand-ai" },
  qixin: { href: "#/project/qixin-brain", ariaLabel: "打开启信产业大脑项目", title: "启信产业大脑", tags: ["B 端系统", "数据可视化", "产业分析"], responsibilities: ["业务流程与核心页面设计", "产业图谱与数据可视化"], image: "./images/首页webp/自定义产业链.webp", handClass: "hero-project-peek-hand-qixin" },
} as const;

export function HeroProjectPeekCard({ variant, revealed }: HeroProjectPeekCardProps) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const handRef = useRef<HTMLImageElement | null>(null);
  const project = projectData[variant];
  const preloadProject = () => {
    void preloadProjectDetailAssets(variant === "ai" ? "ai-report" : "qixin-brain", "high");
  };
  useGSAP(() => {
    const card = cardRef.current; const hand = handRef.current; const top = card?.closest("#top");
    if (!card || !hand || !top) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const moveX = gsap.quickTo(hand, "x", { duration: 0.35, ease: "power3.out" });
      const moveY = gsap.quickTo(hand, "y", { duration: 0.35, ease: "power3.out" });
      const onPointerMove = (event: Event) => { const p = event as PointerEvent; const b = top.getBoundingClientRect(); const nx = Math.max(-1, Math.min(1, (p.clientX - (b.left + b.width / 2)) / (b.width / 2))); const ny = Math.max(-1, Math.min(1, (p.clientY - (b.top + b.height / 2)) / (b.height / 2))); const sideProximity = variant === "ai" ? (1 - nx) / 2 : (1 + nx) / 2; const strength = 0.28 + sideProximity * 0.72; const maxX = variant === "ai" ? 6 : 7; const maxY = variant === "ai" ? 4 : 4.5; moveX(nx * maxX * strength); moveY(ny * maxY * strength); };
      const onPointerLeave = () => { moveX(0); moveY(0); };
      top.addEventListener("pointermove", onPointerMove); top.addEventListener("pointerleave", onPointerLeave);
      return () => { top.removeEventListener("pointermove", onPointerMove); top.removeEventListener("pointerleave", onPointerLeave); gsap.killTweensOf(hand); };
    });
    return () => media.revert();
  }, { scope: cardRef });
  return (
    <a
      ref={cardRef}
      id={`hero-project-${variant}`}
      className={`hero-project-peek-card hero-project-peek-card-${variant} hidden lg:block`}
      href={project.href}
      aria-label={project.ariaLabel}
      data-revealed={revealed ? "true" : undefined}
      onPointerEnter={preloadProject}
      onFocus={preloadProject}
      onTouchStart={preloadProject}
    >
      <span className="hero-project-peek-windowbar" aria-hidden="true"><span className="hero-project-peek-dots"><i /><i /><i /></span></span>
      <span className={`hero-project-peek-hand ${project.handClass}`} aria-hidden="true"><img ref={handRef} className="absolute inset-0 size-full" src="./images/首页人物/hand-peek.png" alt="" draggable={false} style={{ transform: variant === "qixin" ? "scaleX(-1)" : undefined }} /></span>
      <span className="hero-project-peek-content"><strong className="hero-project-peek-title">{project.title}</strong><span className="hero-project-peek-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</span><span className="hero-project-peek-responsibilities"><b>主要职责</b>{project.responsibilities.map((item) => <span key={item}>{item}</span>)}</span><span className="hero-project-peek-shot"><img src={project.image} alt="" /></span></span>
    </a>
  );
}
