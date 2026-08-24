const TOP_SCALE = Array.from({ length: 17 }, (_, index) =>
  String(index).padStart(2, "0")
);
const SIDE_SCALE = Array.from({ length: 10 }, (_, index) =>
  String(index).padStart(2, "0")
);

const DISCOVERY_NOTES = [
  {
    question: "目标用户是谁",
    answer: "招商、产业服务、企业服务、金融及区域治理中的业务人员。",
    support: "他们需要围绕企业与产业完成查询、研判、管理和输出。",
    background: "#FFFEF7",
    border: "#DED9CE",
    line: "rgba(132, 137, 146, 0.15)",
    pin: "#4A7BC7",
    className: "md:-rotate-[1.1deg] md:translate-y-2",
  },
  {
    question: "他们想解决什么问题",
    answer: "数据与功能分散，难以连续完成范围定位、目标筛选、价值判断、跟进管理和结果输出。",
    support: "问题不在单个功能缺失，而在工作路径被拆散。",
    background: "#EEF4FF",
    border: "#C9D8F4",
    line: "rgba(75, 111, 174, 0.16)",
    pin: "#F05B62",
    className: "md:-translate-y-3 md:rotate-[0.8deg]",
  },
  {
    question: "用户会在什么时候使用",
    answer: "招商研判、产业服务、企业服务、金融辅助与区域治理。",
    support: "五类场景共享同一条企业决策任务骨架。",
    background: "#FFF6DB",
    border: "#E7D8A5",
    line: "rgba(145, 116, 52, 0.14)",
    pin: "#4A7BC7",
    className: "md:rotate-[1.2deg] md:translate-y-5",
  },
] as const;

type DiscoveryNoteProps = (typeof DISCOVERY_NOTES)[number];

function DiscoveryNote({
  question,
  answer,
  support,
  background,
  border,
  line,
  pin,
  className,
}: DiscoveryNoteProps) {
  return (
    <article
      className={`relative overflow-visible rounded-[6px] border px-5 pb-5 pt-7 sm:px-7 sm:pb-7 sm:pt-9 ${className}`}
      style={{
        backgroundColor: background,
        borderColor: border,
        boxShadow:
          "0 2px 3px rgba(28,36,52,0.12), 0 14px 28px rgba(28,36,52,0.065)",
      }}
    >
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-0 z-20 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_1px_0_rgba(36,40,49,0.14)] sm:size-4"
        style={{ backgroundColor: pin }}
      />

      <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[5px]">
        <div className="absolute inset-x-0 top-[37%] space-y-9 sm:space-y-10">
          {Array.from({ length: 4 }, (_, index) => (
            <span
              key={index}
              className="block h-px w-full"
              style={{ backgroundColor: line }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col">
        <h3 className="mt-2 text-[20px] font-semibold leading-[1.4] tracking-[-0.02em] text-[#1A1C24] sm:mt-3">
          {question}
        </h3>
        <p className="mt-4 text-[16px] font-medium leading-[1.7] text-[#3E4655]">
          {answer}
        </p>
        <p className="mt-5 border-t border-[#4E525E]/15 pt-3 text-[14px] leading-[1.65] text-[#696D7A]">
          {support}
        </p>
      </div>
    </article>
  );
}

const STRATEGY_TEXT = {
  workflowTitle: "用户的共同工作流程",
  workflow: ["定位范围", "筛选目标", "评估判断", "持续管理", "输出结果"],
  userTasks: "用户场景任务",
  productCapabilities: "产品现有能力",
  strategy: "我把分散的产品能力，按用户任务重新组织",
  work: {
    title: "我的工作",
    role: "UI设计与体验设计",
    responsibilities: "定义场景、重组功能、建立规范",
  },
  outcomes: [
    { action: "重组入口", result: "首页改版" },
    { action: "深化能力", result: "自定义产业链" },
    { action: "建立基础", result: "组件库" },
  ],
} as const;

function DesktopStrategyDiagram() {
  const workflowX = [136, 425, 720, 1015, 1304];
  const outcomeX = [300, 720, 1140];

  return (
    <svg
      viewBox="0 0 1440 720"
      role="img"
      aria-label="用户共同工作流程与产品能力交集"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker
          id="qixin-open-arrow"
          viewBox="0 0 12 12"
          refX="10.5"
          refY="6"
          markerWidth="10"
          markerHeight="10"
          orient="auto-start-reverse"
        >
          <path
            d="M 1 1 L 10.5 6 L 1 11"
            fill="none"
            stroke="#718098"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      <g
        fill="none"
        stroke="#718098"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        {workflowX.slice(0, -1).map((startX, index) => (
          <path
            key={startX}
            d={`M ${startX + 72} 108 C ${startX + 112} 108, ${workflowX[index + 1] - 112} 108, ${workflowX[index + 1] - 72} 108`}
            markerEnd="url(#qixin-open-arrow)"
          />
        ))}
        <path d="M 720 142 C 720 166, 720 183, 720 207" markerEnd="url(#qixin-open-arrow)" />

        <circle cx="641" cy="339" r="119" />
        <circle cx="799" cy="339" r="119" />
        <path
          d="M 522 365 C 482 365, 454 389, 430 410"
          markerEnd="url(#qixin-open-arrow)"
        />

        <path d="M 720 458 C 720 478, 720 492, 720 515" markerEnd="url(#qixin-open-arrow)" />
        <path d="M 720 560 C 720 579, 720 589, 720 602" />
        <path d="M 300 602 C 430 602, 568 602, 720 602 C 872 602, 1010 602, 1140 602" />
        {outcomeX.map((x) => (
          <path
            key={x}
            d={`M ${x} 602 C ${x} 615, ${x} 621, ${x} 636`}
            markerEnd="url(#qixin-open-arrow)"
          />
        ))}
      </g>

      <g transform="rotate(-1.2 234 430)">
        <path
          d="M 56 330 Q 48 330 48 338 V 522 Q 48 530 56 530 H 412 Q 420 530 420 522 V 390 Q 420 384 415 379 L 373 335 Q 368 330 362 330 Z"
          fill="#F4F2FF"
          stroke="#B9B8DE"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M 368 330 V 374 Q 368 382 376 382 H 412 Q 420 382 414 376 L 374 336 Q 371 333 368 330 Z"
          fill="#E7E5FA"
          stroke="#B9B8DE"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <rect
          x="174"
          y="318"
          width="120"
          height="22"
          rx="3"
          fill="#DDE5FF"
          fillOpacity="0.88"
          transform="rotate(2 234 329)"
        />
        <text
          x="80"
          y="382"
          fill="#1A1C24"
          fontFamily="inherit"
          fontSize="22"
          fontWeight="650"
        >
          {STRATEGY_TEXT.work.title}
        </text>
        <text
          x="80"
          y="423"
          fill="#3E4655"
          fontFamily="inherit"
          fontSize="19"
          fontWeight="600"
        >
          {STRATEGY_TEXT.work.role}
        </text>
        <path d="M 80 452 H 370" stroke="#8C8BA8" strokeOpacity="0.35" strokeWidth="1" />
        <text
          x="80"
          y="489"
          fill="#696D7A"
          fontFamily="inherit"
          fontSize="15"
          fontWeight="500"
        >
          {STRATEGY_TEXT.work.responsibilities}
        </text>
      </g>

      <g
        fill="#3E4655"
        textAnchor="middle"
        fontFamily="inherit"
      >
        <text x="720" y="43" fontSize="18" fontWeight="600" letterSpacing="0.03em">
          {STRATEGY_TEXT.workflowTitle}
        </text>
        {STRATEGY_TEXT.workflow.map((label, index) => (
          <text key={label} x={workflowX[index]} y="115" fontSize="18" fontWeight="600">
            {label}
          </text>
        ))}

        <text x="628" y="346" fontSize="19" fontWeight="600">
          {STRATEGY_TEXT.userTasks}
        </text>
        <text x="812" y="346" fontSize="19" fontWeight="600">
          {STRATEGY_TEXT.productCapabilities}
        </text>

        <text x="720" y="553" fill="#1A1C24" fontSize="22" fontWeight="650">
          {STRATEGY_TEXT.strategy}
        </text>

        {STRATEGY_TEXT.outcomes.map((outcome, index) => (
          <g key={outcome.result}>
            <text x={outcomeX[index]} y="676" fill="#697386" fontSize="16" fontWeight="500">
              {outcome.action}
            </text>
            <text x={outcomeX[index]} y="708" fill="#1A1C24" fontSize="22" fontWeight="650">
              {outcome.result}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function MobileStrategyDiagram() {
  return (
    <div className="relative mx-auto flex w-full max-w-[420px] flex-col items-center px-3 pb-8 pt-4 text-center text-[#3E4655] md:hidden">
      <p className="text-[16px] font-semibold tracking-[0.03em]">
        {STRATEGY_TEXT.workflowTitle}
      </p>

      <div className="mt-8 flex w-full flex-col items-center gap-3">
        {STRATEGY_TEXT.workflow.map((label, index) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <span className="text-[17px] font-semibold">{label}</span>
            {index < STRATEGY_TEXT.workflow.length - 1 ? (
              <svg aria-hidden="true" viewBox="0 0 18 34" className="h-7 w-4 overflow-visible">
                <path d="M 9 0 L 9 28 M 3 22 L 9 28 L 15 22" fill="none" stroke="#718098" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </div>
        ))}
      </div>

      <svg aria-hidden="true" viewBox="0 0 18 42" className="mt-5 h-10 w-4 overflow-visible">
        <path d="M 9 0 L 9 35 M 3 29 L 9 35 L 15 29" fill="none" stroke="#718098" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="relative mt-5 h-[420px] w-full max-w-[360px]">
        <div className="absolute left-[7%] top-1 size-[176px] rounded-full border-[1.5px] border-[#718098]" />
        <div className="absolute right-[7%] top-1 size-[176px] rounded-full border-[1.5px] border-[#718098]" />
        <span className="absolute left-[31%] top-[86px] -translate-x-1/2 -translate-y-1/2 text-[16px] font-semibold">
          {STRATEGY_TEXT.userTasks}
        </span>
        <span className="absolute right-[31%] top-[86px] translate-x-1/2 -translate-y-1/2 text-[16px] font-semibold">
          {STRATEGY_TEXT.productCapabilities}
        </span>

        <svg aria-hidden="true" viewBox="0 0 150 92" className="absolute left-[42px] top-[142px] h-[82px] w-[142px] overflow-visible">
          <path d="M 140 4 C 106 14, 74 39, 22 73 M 31 62 L 22 73 L 37 73" fill="none" stroke="#718098" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <svg
          viewBox="0 0 320 190"
          aria-label="我的工作，UI设计与体验设计"
          className="absolute left-0 top-[220px] h-auto w-[310px] -rotate-[1deg] overflow-visible drop-shadow-[0_8px_12px_rgba(28,36,52,0.08)]"
        >
          <path
            d="M 10 4 Q 4 4 4 10 V 180 Q 4 186 10 186 H 310 Q 316 186 316 180 V 52 Q 316 46 312 42 L 280 8 Q 276 4 270 4 Z"
            fill="#F4F2FF"
            stroke="#B9B8DE"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M 274 4 V 40 Q 274 46 280 46 H 310 Q 316 46 312 42 L 280 8 Q 277 5 274 4 Z"
            fill="#E7E5FA"
            stroke="#B9B8DE"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <rect x="105" y="-5" width="110" height="18" rx="3" fill="#DDE5FF" fillOpacity="0.9" transform="rotate(2 160 4)" />
          <text x="28" y="52" fill="#1A1C24" fontFamily="inherit" fontSize="20" fontWeight="650">
            {STRATEGY_TEXT.work.title}
          </text>
          <text x="28" y="88" fill="#3E4655" fontFamily="inherit" fontSize="16" fontWeight="600">
            {STRATEGY_TEXT.work.role}
          </text>
          <path d="M 28 110 H 270" stroke="#8C8BA8" strokeOpacity="0.35" strokeWidth="1" />
          <text x="28" y="143" fill="#696D7A" fontFamily="inherit" fontSize="14" fontWeight="500">
            {STRATEGY_TEXT.work.responsibilities}
          </text>
        </svg>
      </div>

      <svg aria-hidden="true" viewBox="0 0 18 42" className="h-10 w-4 overflow-visible">
        <path d="M 9 0 L 9 35 M 3 29 L 9 35 L 15 29" fill="none" stroke="#718098" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="mt-4 text-[19px] font-semibold text-[#1A1C24]">
        {STRATEGY_TEXT.strategy}
      </p>

      <svg aria-hidden="true" viewBox="0 0 300 76" className="mt-5 h-[76px] w-[88%] overflow-visible">
        <path d="M 150 0 L 150 26 M 25 26 L 275 26 M 25 26 L 25 68 M 150 26 L 150 68 M 275 26 L 275 68 M 19 62 L 25 68 L 31 62 M 144 62 L 150 68 L 156 62 M 269 62 L 275 68 L 281 62" fill="none" stroke="#718098" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="grid w-full grid-cols-3 gap-3">
        {STRATEGY_TEXT.outcomes.map((outcome) => (
          <div key={outcome.result}>
            <p className="text-[13px] font-medium text-[#697386]">{outcome.action}</p>
            <p className="mt-2 text-[16px] font-semibold text-[#1A1C24]">{outcome.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QixinResearchCanvas() {
  return (
    <section
      id="qx02-research-canvas"
      aria-label="启信产业大脑问题定义画布"
      className="relative pb-20 pt-6 md:pb-28 md:pt-28"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div
          data-qixin-research-paper-canvas="true"
          className="relative overflow-visible rounded-[28px] border border-[#E6E7EB] bg-[#FDFEFF] shadow-[0_1px_2px_rgba(15,20,25,0.04)]"
        >
          <div className="relative rounded-[27px] bg-[#FDFEFF] pb-12 pt-16 sm:pb-16 sm:pt-20 md:min-h-[720px] md:p-0 lg:aspect-[16/8.5] lg:min-h-0">
            <div
              className="pointer-events-none absolute bottom-3 left-7 right-3 top-7 rounded-[18px] border border-[#E6E7EB] sm:bottom-4 sm:left-8 sm:right-4 sm:top-8"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 rounded-[17px]"
                style={{
                  backgroundColor: "#FBFCFF",
                  backgroundImage:
                    "linear-gradient(rgba(107,120,150,0.075) 1px, transparent 1px), linear-gradient(90deg, rgba(107,120,150,0.075) 1px, transparent 1px), linear-gradient(rgba(107,120,150,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(107,120,150,0.035) 1px, transparent 1px)",
                  backgroundSize:
                    "112px 112px, 112px 112px, 28px 28px, 28px 28px",
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

            <div className="relative z-10 px-12 sm:px-16 md:absolute md:inset-x-[7%] md:top-0 md:-translate-y-[32%] md:px-0">
              <div className="grid w-full grid-cols-1 gap-7 md:grid-cols-3 md:items-start md:gap-6 lg:gap-9">
                {DISCOVERY_NOTES.map((note) => (
                  <DiscoveryNote key={note.question} {...note} />
                ))}
              </div>
            </div>

            <div className="relative z-[5] mt-14 px-9 sm:mt-16 sm:px-14 md:absolute md:bottom-[4.5%] md:left-[6.5%] md:right-[4%] md:top-[20%] md:mt-0 md:px-0">
              <div className="hidden h-full w-full md:block">
                <DesktopStrategyDiagram />
              </div>
              <MobileStrategyDiagram />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
