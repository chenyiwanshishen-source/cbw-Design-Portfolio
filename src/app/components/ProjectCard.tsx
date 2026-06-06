import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  number: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  highlights: string[];
  accent: string;
  index: number;
  href?: string;
  onIntent?: () => void;
}

export function ProjectCard({
  number,
  title,
  subtitle,
  role,
  description,
  highlights,
  accent,
  index,
  href,
  onIntent,
}: ProjectCardProps) {
  const MotionWrapper: any = href ? motion.a : motion.div;
  return (
    <MotionWrapper
      {...(href ? { href } : {})}
      onMouseEnter={onIntent}
      onFocus={onIntent}
      onTouchStart={onIntent}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-[24px] border border-[#E6E7EB] flex flex-col bg-white shadow-[0_1px_2px_rgba(26,28,36,0.04)] hover:border-[#CBCDD4] hover:shadow-lg transition-all duration-500 ${href ? "cursor-pointer" : ""}`}
    >
      {/* Corner accent glow */}
      <div
        className={`pointer-events-none absolute -top-32 -right-32 size-80 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${accent}`}
      />
      <div
        className={`pointer-events-none absolute -bottom-40 -left-40 size-80 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${accent}`}
      />
      <div className="relative flex flex-col h-full p-7 lg:p-8">
        {/* Top: number + arrow */}
        <div className="flex items-start justify-between mb-6">
          <div
            className={`leading-none tracking-tighter bg-gradient-to-br ${accent} bg-clip-text text-transparent text-[clamp(3rem,5vw,5rem)]`}
            style={{ fontWeight: 700 }}
          >
            {number}
          </div>
          <div
            className={`size-10 rounded-full border border-[#E6E7EB] flex items-center justify-center group-hover:border-transparent group-hover:bg-gradient-to-br ${accent} group-hover:rotate-45 transition-[background,border-color,transform,box-shadow] duration-500`}
          >
            <ArrowUpRight className="size-4 text-[#1A1C24] transition-colors duration-75 ease-out group-hover:text-white" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl lg:text-2xl tracking-tight text-[#1A1C24] mb-1.5">{title}</h3>
        <p className="text-sm text-[#696D7A] mb-5">{subtitle}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-5 text-sm text-[#696D7A]">
          <span>{role}</span>
        </div>

        {/* Description */}
        <p className="text-base text-[#4E525E] leading-relaxed mb-5">{description}</p>

        {/* Highlights */}
        <ul className="space-y-2 border-l border-[#E6E7EB] pl-4">
          {highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="text-sm text-[#4E525E] leading-relaxed relative">
              <span className="absolute -left-[18px] top-1.5 size-1 rounded-full bg-[#CBCDD4]" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </MotionWrapper>
  );
}
