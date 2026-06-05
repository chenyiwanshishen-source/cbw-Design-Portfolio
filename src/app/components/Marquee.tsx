interface MarqueeProps {
  words: string[];
}

export function Marquee({ words }: MarqueeProps) {
  return (
    <>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - 3rem)); }
        }
        .marquee-track {
          animation: marquee-scroll 30s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="absolute -bottom-px left-0 right-0 overflow-hidden border-y border-[#E6E7EB] py-3 bg-white/60 backdrop-blur-sm">
        <div className="marquee-track flex gap-12 whitespace-nowrap">
          {/* First copy */}
          <div className="flex gap-12 shrink-0" style={{ minWidth: "100%" }}>
            {words.map((w, i) => (
              <span key={i} className="flex items-center gap-12 text-sm tracking-[0.25em] text-[#696D7A]">
                {w}
                <span className="size-1.5 rounded-full bg-[#2258F4]/60" />
              </span>
            ))}
          </div>
          {/* Second copy — identical, for seamless loop */}
          <div className="flex gap-12 shrink-0" style={{ minWidth: "100%" }} aria-hidden="true">
            {words.map((w, i) => (
              <span key={i} className="flex items-center gap-12 text-sm tracking-[0.25em] text-[#696D7A]">
                {w}
                <span className="size-1.5 rounded-full bg-[#2258F4]/60" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
