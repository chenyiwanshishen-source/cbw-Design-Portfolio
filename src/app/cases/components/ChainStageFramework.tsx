import { useEffect, useRef, useState } from 'react';
const ICON_BLUE = "#1A42B8";
const ARCH_ARROW = "#AEB3C1";
const ARCH_NODE_RADIUS = 12;
const ARCH_TONES = {
  neutral: { fill: "#F5F5F7", stroke: "#D8DBE4", text: "#4E525E" },
  blue: { fill: "#EEF2FF", stroke: "#A8BEFF", text: "#1A42B8" },
  purple: { fill: "#F5F3FF", stroke: "#DDD6FE", text: "#6366F1" },
  primary: { fill: "#2258F4", stroke: "#2258F4", text: "#FFFFFF" },
} as const;

const CHAIN_STAGE_LABELS = ["提出需求", "理解口径", "拆分结构", "内部配置", "交付使用", "反馈修改", "再次配置"];
export function ChainStageFramework() {
  const host = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(14);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setFontSize(14 * 1120 / entry.contentRect.width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  type ChainNode = { elevated?: boolean; label: string; rotate?: number; x: number; y: number; w: number; text?: string };

  const laneLabelX = 0;
  const stageX = 78;
  const stageY = 54;
  const stageW = 1042;
  const stageH = 184;
  const colW = stageW / CHAIN_STAGE_LABELS.length;
  const problemY = 252;
  const problemSummary = "旧流程依赖内部配置，用户提出需求后等待交付，修改仍会回流内部流程。";
  const userNodes: ChainNode[] = [
    { label: "提出本地需求", x: stageX + 14, y: 74, w: colW - 28 },
    { label: "等待配置交付", x: stageX + colW + 12, y: 74, w: colW * 2.9 - 24, text: "#B3B6BF" },
    { label: "使用配置结果", x: stageX + colW * 4 + 12, y: 74, w: colW - 24 },
    { label: "反馈修改需求", x: stageX + colW * 5 + 12, y: 74, w: colW - 24 },
  ];
  const businessNodes: ChainNode[] = [
    { label: "理解用户口径", x: stageX + colW + 14, y: 130, w: colW - 28 },
    { label: "拆分产业链环节", x: stageX + colW * 2 + 12, y: 130, w: colW - 24 },
    { label: "确认上下游关系", x: stageX + colW * 3 + 12, y: 130, w: colW - 24 },
    { label: "重新确认口径", x: stageX + colW * 5 + 12, y: 130, w: colW * 1.7 - 24 },
  ];
  const backendNodes: ChainNode[] = [
    { label: "定义数据结构", x: stageX + colW * 2 + 14, y: 186, w: colW - 28 },
    { label: "配置图谱关系", x: stageX + colW * 3 + 12, y: 186, w: colW - 24 },
    { label: "配置企业范围", x: stageX + colW * 4 + 12, y: 186, w: colW - 24 },
    { label: "重新配置", x: stageX + colW * 6 + 12, y: 168, w: colW - 24, elevated: true, rotate: -3.2 },
  ];
  const laneRows = [
    {
      label: "用户侧",
      labelY: 94,
      lineY: 91,
      nodes: userNodes,
      tone: ARCH_TONES.neutral,
    },
    {
      label: "业务侧",
      labelY: 150,
      lineY: 147,
      nodes: businessNodes,
      tone: ARCH_TONES.blue,
    },
    {
      label: "数据/后端侧",
      labelY: 206,
      lineY: 203,
      nodes: backendNodes,
      tone: ARCH_TONES.purple,
    },
  ];
  const keyStageBackgrounds = [3, 6];

  return (
    <div ref={host} className="qixin-chain-framework">
      <div className="qixin-chain-framework-inner">
        <svg
          viewBox="0 0 1120 304"
          className="block w-full"
          role="img"
          aria-labelledby="chain-stage-framework-title"
        >
          <title id="chain-stage-framework-title">旧流程横向阶段框架</title>
          <defs>
            <pattern id="qixin-chain-key-stage-pattern" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="7" stroke="#A8BEFF" strokeWidth="1.35" opacity="0.86" />
            </pattern>
            <filter id="qixin-chain-node-shadow" x="-20%" y="-60%" width="140%" height="230%">
              <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#6366F1" floodOpacity="0.18" />
            </filter>
            <marker id="qixin-chain-arrow" viewBox="0 0 8 8" refX="6.8" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M1 1L7 4L1 7" fill="none" stroke={ARCH_ARROW} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          <g id="stage-grid">
            {keyStageBackgrounds.map((index) => (
              <rect
                key={index}
                x={stageX + colW * index + colW * 0.02}
                y={stageY + 4}
                width={colW * 0.96}
                height={stageH - 8}
                fill="url(#qixin-chain-key-stage-pattern)"
                opacity="0.62"
              />
            ))}
            {Array.from({ length: CHAIN_STAGE_LABELS.length + 1 }).map((_, index) => {
              const x = stageX + colW * index;
              const isInternalBoundary = index === 3 || index === 6;

              return (
                <line
                  key={index}
                  x1={x}
                  y1={stageY}
                  x2={x}
                  y2={stageY + stageH}
                  stroke={isInternalBoundary ? "#A8BEFF" : "#D8DBE4"}
                  strokeWidth={isInternalBoundary ? 1 : 0.8}
                  strokeDasharray="5 9"
                  opacity={isInternalBoundary ? 0.58 : 0.62}
                />
              );
            })}
            {[1, 2].map((index) => (
              <line
                key={index}
                x1={stageX}
                y1={stageY + (stageH / 3) * index}
                x2={stageX + stageW}
                y2={stageY + (stageH / 3) * index}
                stroke="#EEF2FF"
                strokeWidth="1"
                opacity="0.46"
              />
            ))}
          </g>

          <g id="workflow-lanes">
            {laneRows.map((lane) => {
              const firstNode = lane.nodes[0];
              const lastNode = lane.nodes[lane.nodes.length - 1];

              return (
                <g key={lane.label}>
                  <text
                    x={laneLabelX}
                    y={lane.labelY}
                    fill="#696D7A"
                    style={{ fontSize, fontWeight: 400, fontFamily: "inherit" }}
                  >
                    {lane.label}
                  </text>
                  <line
                    x1={firstNode.x + firstNode.w - 2}
                    y1={lane.lineY}
                    x2={lastNode.x + 2}
                    y2={lane.lineY}
                    stroke="#D8DBE4"
                    strokeWidth="1"
                    opacity="0.58"
                  />
                  {lane.nodes.map((node) => (
                    <g
                      key={node.label}
                      transform={
                        node.rotate ? `rotate(${node.rotate} ${node.x + node.w / 2} ${node.y + 16})` : undefined
                      }
                  >
                      <rect
                        x={node.x}
                        y={node.y - 1}
                        width={node.w}
                        height="34"
                        rx={ARCH_NODE_RADIUS}
                        fill={lane.tone.fill}
                        filter={node.elevated ? "url(#qixin-chain-node-shadow)" : undefined}
                        stroke={lane.tone.stroke}
                        strokeWidth="1"
                      />
                      <text
                        x={node.x + node.w / 2}
                        y={node.y + 20}
                        textAnchor="middle"
                        fill={node.text ?? lane.tone.text}
                        style={{ fontSize, fontWeight: 600, fontFamily: "inherit" }}
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </g>
              );
            })}
          </g>

          <g id="flow-arrows" fill="none" stroke={ARCH_ARROW} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" opacity="0.88">
            <path
              d={`M ${stageX + colW * 0.9} 92 C ${stageX + colW * 1.02} 102, ${stageX + colW * 1.02} 134, ${stageX + colW * 1.09} 146`}
              markerEnd="url(#qixin-chain-arrow)"
            />
            <path
              d={`M ${stageX + colW * 3.5} 164 C ${stageX + colW * 3.5} 172, ${stageX + colW * 3.5} 178, ${stageX + colW * 3.5} 184`}
              markerEnd="url(#qixin-chain-arrow)"
            />
            <path
              d={`M ${stageX + colW * 4.52} 184 C ${stageX + colW * 4.62} 164, ${stageX + colW * 4.62} 128, ${stageX + colW * 4.62} 110`}
              markerEnd="url(#qixin-chain-arrow)"
            />
            <path
              d={`M ${stageX + colW * 5.66} 110 L ${stageX + colW * 5.66} 128`}
              markerEnd="url(#qixin-chain-arrow)"
            />
            <path
              d={`M ${stageX + colW * 5.74} 162 C ${stageX + colW * 5.88} 174, ${stageX + colW * 5.9} 190, ${stageX + colW * 6 + 12} 186`}
              markerEnd="url(#qixin-chain-arrow)"
            />
          </g>

          <g id="problem-overview">
            <text
              x={laneLabelX}
              y={problemY + 20}
              fill="#B45309"
              opacity="0.72"
              style={{ fontSize, fontWeight: 400, fontFamily: "inherit" }}
            >
              设计判断
            </text>
            <line
              x1={stageX}
              y1={problemY + 16}
              x2={stageX + stageW}
              y2={problemY + 16}
              stroke="#FFD8AA"
              strokeWidth="1"
              strokeDasharray="5 10"
              opacity="0.58"
            />
            <rect
              x={stageX + 14}
              y={problemY}
              width={stageW - 28}
              height="32"
              rx="16"
              fill="#FFF0E0"
              opacity="0.82"
              stroke="none"
            />
            <text
              x={stageX + stageW / 2}
              y={problemY + 20}
              textAnchor="middle"
              fill="#B45309"
              style={{ fontSize, fontWeight: 600, fontFamily: "inherit" }}
            >
              {problemSummary}
            </text>
          </g>

          <g id="stage-labels">
            {CHAIN_STAGE_LABELS.map((stage, index) => {
              const cx = stageX + colW * (index + 0.5);
              const isInternal = index === 3 || index === 6;

              return (
                <g key={stage}>
                  <text
                    x={cx}
                    y="28"
                    textAnchor="middle"
                    fill={isInternal ? ICON_BLUE : "#1A1C24"}
                    opacity={isInternal ? 0.92 : 0.72}
                    style={{ fontSize, fontWeight: 400, fontFamily: "inherit" }}
                  >
                    {stage}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}

