import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Marquee } from "./Marquee";

const marqueeWords = [
  "AI 产品设计",
  "提示词框架",
  "数据可视化",
  "B 端设计",
  "信息架构",
  "产业分析",
];

export function Hero() {
  return (
    <section id="top" className="relative flex items-center px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-32 pb-10 md:pb-14">
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
            产品设计师
          </span>
        </motion.h1>

        <div className="mt-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg lg:text-xl text-[#4E525E] leading-relaxed"
          >
            9 年互联网设计经验，主要做 B/G 端业务系统、数据可视化，近两年也在做 AI 生成式产品相关的设计工作。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#1A1C24] text-white overflow-hidden hover:shadow-[0_0_40px_rgba(34,88,244,0.45)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#2258F4] transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative text-sm transition-colors group-hover:text-white">查看作品</span>
              <span className="relative inline-flex size-9 items-center justify-center rounded-full bg-white text-[#1A1C24] group-hover:rotate-45 group-hover:bg-white group-hover:text-[#1A1C24] transition-all duration-300">
                <ArrowDown className="size-4" />
              </span>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex items-center px-6 h-[52px] rounded-full border border-[#CBCDD4] text-sm text-[#4E525E] hover:border-[#A8BEFF] hover:text-[#1A1C24] hover:bg-[#F5F5F7] hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="inline-flex items-center gap-2">
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
            { k: "B/G", v: "企业与政府客户" },
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
