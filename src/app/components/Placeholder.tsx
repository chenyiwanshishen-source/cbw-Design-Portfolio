import { ImageIcon } from "lucide-react";

interface PlaceholderProps {
  label: string;
  size?: "lg" | "md" | "sm";
  ratio?: string;
  note?: string;
  showIcon?: boolean;
}

const sizeMap = {
  lg: { ratio: "16 / 7", tag: "待补大图" },
  md: { ratio: "16 / 9", tag: "待补截图" },
  sm: { ratio: "4 / 3", tag: "待补小图" },
};

export function Placeholder({ label, size = "md", ratio, note, showIcon = true }: PlaceholderProps) {
  const cfg = sizeMap[size];
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl border border-dashed border-neutral-300 bg-neutral-100"
      style={ratio === "auto" ? undefined : { aspectRatio: ratio ?? cfg.ratio }}
    >
      <div
        className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-neutral-300 bg-white tracking-widest text-neutral-700 z-10"
        style={{ fontSize: "13px", lineHeight: 1.3, fontWeight: 500 }}
      >
        {showIcon && <ImageIcon className="size-3" />}
        {cfg.tag}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 gap-2">
        <div
          className="text-neutral-900/85 max-w-[82%]"
          style={{ fontSize: "16px", lineHeight: 1.5, fontWeight: 600 }}
        >
          {label}
        </div>
        {note && (
          <div
            className="text-neutral-500 max-w-[72%]"
            style={{ fontSize: "13px", lineHeight: 1.6 }}
          >
            {note}
          </div>
        )}
      </div>
    </div>
  );
}
