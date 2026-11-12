import type { CaseContent } from '../types';

export const qsight: CaseContent = {
  "header": {
    "title": "Qsight · AI 报告平台",
    "intro": "Qsight 是合合信息面向研究员的 AI 报告平台。针对资料整理耗时、生成内容偏离需求和数据依据难核查的问题，我们结合用户上传的资料与企业数据，采用模板化生成流程，支持生成前确认大纲与分析维度、生成后核查来源。我负责核心交互设计和 Prompt 基础框架，参与需求与业务流程梳理，并跟进研发实现和测试验收，直到 1.0 上线。",
    "introEmphasis": ["模板化生成流程", "生成前确认大纲与分析维度、生成后核查来源", "核心交互设计和 Prompt 基础框架"],
    "factsStyle": "pills",
    "facts": [
      { "label": "角色", "text": "产品设计师", "tags": ["产品设计师"] },
      { "label": "项目周期", "text": "2025.04–2026.05", "tags": ["2025.04–2026.05"] },
      { "label": "项目周期", "text": "2025.04–2026.05", "tags": ["2025.04–2026.05"] },
      { "label": "类型", "text": "B 端 · AI 报告平台 · Web / 移动端", "tags": ["多平台", "B 端", "AI"] },
      { "label": "工具", "text": "Figma / FigJam · Google AI Studio · Codex", "tools": [
        { "name": "Figma / FigJam", "icon": "figma" },
        { "name": "Google AI Studio", "icon": "ai-studio" },
        { "name": "Codex", "icon": "codex" }
      ] }
    ]
  },
  "hero": {
    "plate": "PLATE 01",
    "title": "报告生成全景",
    "instruction": "要放：报告生成全景",
    "caption": "报告生成全景",
    "ratio": "16 / 9"
  },
  "timeline": [],
  "opening": [],
  "toc": [
    {
      "id": "qsight-01",
      "label": "调研问题"
    },
    {
      "id": "qsight-02",
      "label": "MVP 版本"
    },
    {
      "id": "qsight-04",
      "label": "主导提示词优化"
    },
    {
      "id": "qsight-05",
      "label": "上线反馈"
    },
    {
      "id": "qsight-06",
      "label": "总结和思考"
    }
  ],
  "chapters": [
    {
      "id": "qsight-01",
      "label": "调研问题",
      "title": "从没有明确方向，到确定首版要解决的问题",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "项目从 0 到 1 启动时，我们还不清楚产品该从哪里入手，于是先从现有客户着手，希望通过访谈了解他们的实际工作和困难，找到适合用 AI 解决的问题，作为产品的切入点。"
        },
        {
          "kind": "goal-notes",
          "texts": [
            "报告为什么要做\n\n谁提需求、谁用报告、用来做什么，怎样算完成？\n\n记录真实任务的背景、范围、交付要求和判断标准。",
            "报告实际怎样完成\n\n三位用户和科长如何分工、交接，用什么工具和材料？\n\n记录从接任务到交付的流程，以及各环节的参与者。",
            "哪些问题最值得先解决\n\n哪里耗时、出错或返工？频率、影响如何，目前怎么应对？\n\n记录实例和优先处理的理由，不只收集功能需求。",
            "哪些判断需要人来做\n\n哪些能交给 AI，哪些要人工核查？缺数据、出错时怎么办？\n\n记录可接受的范围和必须人工介入的环节。",
            "什么场景适合先试\n\n哪些任务重复多、范围清楚？现有工具哪里不足，用户为何愿意试？\n\n记录候选任务、选择理由和暂不处理的问题。",
            "方案是否支持真实任务\n\n用户能否理解原型，完成配置、修改、核查和复用？哪里卡住？\n\n记录操作表现、误解和阻碍，明确下一轮改什么。"
          ]
        },
        {
          "kind": "subsection",
          "title": "第一轮：了解真实流程",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "我们从用户最近一次报告入手，了解资料的查找、提供和使用方式，以及格式调整、历史文档管理与复用中的困难。访谈后，我们将问题归纳为八个主题，再梳理各主题下的问题，放入四个象限，指导后续设计与验证。"
            }
          ]
        },
        { "kind": "research-topics", "texts": ["任务来源", "资料来源", "内容撰写的流程", "耗时的环节", "审核与修改", "数据来源和校验", "历史报告应用", "AI 使用经历"] },
        { "kind": "research-quadrants" },
        {
          "kind": "subsection",
          "title": "第二轮：借竞品案例讨论方向",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "第一轮访谈后，我们请用户试用豆包、天工和 Jenni，再通过回访归纳三款产品的优缺点，作为 Qsight 的设计参考。"
            },
            { "kind": "trial-feedback", "groups": [
              { "title": "使用中遇到的问题", "items": [
                { "product": "豆包", "text": "大纲合适，数据不一定合适" },
                { "product": "豆包", "text": "部分来源缺失或虚假" },
                { "product": "天工、豆包", "text": "当时不能上传本地资料" },
                { "product": "Jenni", "text": "操作不太符合原有习惯" },
                { "product": "天工、豆包", "text": "自己的材料还得手动补进稿子" }
              ] },
              { "title": "用户认可的做法", "items": [
                { "product": "豆包", "text": "大纲模式好用" },
                { "product": "豆包", "text": "生成内容整体不错" },
                { "product": "天工", "text": "先询问方向、风格和日期" },
                { "product": "天工", "text": "逐项提问，方便说清要求" },
                { "product": "Jenni", "text": "大纲生成后可直接编辑" },
                { "product": "Jenni", "text": "本地数据库可上传并引用" },
                { "product": "Jenni", "text": "点击来源卡片查看原文" }
              ] }
            ] }
          ]
        },
        {
          "kind": "subsection",
          "title": "第三轮：用低保真原型确认边界",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "我们邀请 4 位用户和 2 位同事试用原型，完成报告生成、资料上传、大纲修改和内容核查四项任务，记录操作和反馈。重点观察用户能否从开始到结束顺利完成整个流程。"
            },
        {
          "kind": "subsection",
          "title": "用户旅程图",
          "blocks": [
            { "kind": "paragraph", "text": "我们梳理用户从接到任务到交付报告的过程，找出我们可以介入并持续优化的部分。" },
            { "kind": "user-flow" }
          ]
        },
        {
          "kind": "subsection",
          "title": "用户流程图和中保真原型",
          "blocks": [
            { "kind": "paragraph", "text": "我们将生成步骤对应到原型页面，明确大纲确认、资料查看和来源核查的操作，也补上修改、补材料和失败重试的路径。" },
            { "kind": "mvp-comparison" }
          ]
        },
        {
          "kind": "subsection",
          "title": "具体问题",
          "blocks": [
            { "kind": "paragraph", "text": "试用时，参与者关心生成内容和数据是否准确，主要汇总在下面这些问题上。", "highlight": "本轮测试中，用户没有遇到明显阻碍，整体流程基本可行。" },
            { "kind": "test-feedback-bubbles" }
          ]
        }
          ]
        }
      ]
    },
    {
      "id": "qsight-02",
      "label": "MVP 版本",
      "title": "MVP 版本",
      "blocks": [
        { "kind": "paragraph", "text": "几轮访谈后，我们开始设计 MVP，尽量解决用户的实际问题，不增加操作负担，让用户顺利完成报告。" },
        {
          "kind": "subsection",
          "title": "快捷模版选择",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "用户希望选好模板、稍作调整就能生成报告，这也符合我们快速验证生成质量的需要。因此第一版优先做固定模板，暂不做对话生成；后续也可以保留为快速生成报告的入口。",
              "highlightPhrases": ["选好模板、稍作调整就能生成报告", "第一版优先做固定模板，暂不做对话生成"]
            },
            { "kind": "responsive-template", "homeSlides": true }
          ]
        },
        { "kind": "subsection", "title": "用户确认大纲", "blocks": [
        {
          "kind": "paragraph",
          "text": "首版完整展示 AI 从公司企业数据表中推荐的维度，虽然页面信息更多，但用户和团队能在生成前核对 AI 是否选对。",
          "highlight": "优先让生成依据可见、可核对，避免生成过程成为黑箱。"
        },
        {
          "kind": "outline-devices"
        },
        ] },
        {
          "kind": "subsection",
          "title": "用户如何管理数据方案",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "用户可以查看内置的分析方案，也可以按自己的需求调整分析维度。业务最初只打算提供默认方案。我判断，既然用户能改大纲，也应该能自己选每章要分析的内容，所以提出让用户自己调整维度。",
              "highlightPhrases": ["我判断，既然用户能改大纲，也应该能自己选每章要分析的内容，所以提出让用户自己调整维度。"]
            },
            {
              "kind": "source-scheme-flow",
              "paragraph": "生成前，用户可以先确定数据的准确性，决定是否继续。",
              "text": "为了解决来源很多的问题，我把密集的数据分层，将模态弹窗改为模态抽屉展示。",
              "afterText": "按可信度对信息来源分层，用户可以根据需求删除或增加信息。"
            },
            {
              "kind": "paragraph",
              "text": "修改数据之后，有明确的状态告知用户当前 AI 的反馈。"
            },
            {
              "kind": "analysis-plan-cards"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "生成后继续修改和交付报告",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "报告生成后，电脑端支持选中段落继续修改；移动端以阅读为主，保留复制、下载和分享，方便用户查看和交付报告。"
            },
            { "kind": "report-edit-carousel" },
            {
              "kind": "figures",
              "arrow": true,
              "stickyNote": "手机上要不要编辑报告，我还没确定。所以先只做复制、下载和分享。",
              "figures": [{
                "plate": "PLATE 04 MOBILE",
                "title": "移动端报告正文",
                "instruction": "",
                "src": "images/qsight/report-sources-mobile.webp",
                "alt": "移动端报告阅读页面，底部提供复制、下载和分享",
                "width": 780,
                "height": 1688,
                "framed": true,
                "caption": ""
              }, {
                "plate": "PLATE 04 SHARE",
                "title": "移动端报告分享",
                "instruction": "",
                "src": "images/qsight/report-share-mobile.webp",
                "alt": "移动端报告分享弹窗，可复制链接或通过微信、信息和邮件分享",
                "width": 780,
                "height": 1688,
                "framed": true,
                "caption": ""
              }]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "报告生成历史",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "为方便用户查找和复用旧报告，我们按主题整理生成历史。用户既能回看历史报告，也能沿用同一模板，切换数据维度生成新报告。"
            },
            {
              "kind": "responsive-template",
              "title": "报告生成历史",
              "desktopSrc": "images/qsight/report-history.webp",
              "mobileSrc": "images/qsight/report-history-mobile.webp",
              "mobileAlign": "bottom"
            }
          ]
        }
      ]
    },
    {
      "id": "qsight-03",
      "label": "来源核查",
      "title": "正文直接标注来源",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "用户最关心数据从哪来。我们直接在相关数据后标注来源，用颜色区分类型，点击标记就能查看具体出处。"
        },
        { "kind": "source-evidence" }
      ]
    },
    {
      "id": "qsight-04",
      "label": "主导提示词优化",
      "title": "主导提示词设计",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "测试时，我们发现生成的报告存在以下三个问题。",
          "highlight": "由我主导提示词设计，明确生成要求、工具调用和数据核查规则。"
        },
        {
          "kind": "problem-cards",
          "items": [
            {
              "label": "生成内容严重跑偏",
              "text": "报告生成后，发现内容已明显偏离大纲和章节要求。"
            },
            {
              "label": "跳过该用的工具",
              "text": "模型有时跳过应调用的工具，直接生成内容。"
            },
            {
              "label": "AI 编造数据",
              "text": "AI 会编造没有依据的数据，并写进报告正文。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "设计方案",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "我将提示词中的要求分成任务定义、工具编排、质量检查和异常处理，明确每部分负责什么，方便逐项检查和调整。"
            },
            {
              "kind": "prompt-structure"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "让团队沿用同一套提示词结构",
          "blocks": [
            {
              "kind": "paragraph",
              "blueHighlightPhrases": ["我利用 Google AI Studio 搭建了一个提示词生成智能体"],
              "highlightPhrases": ["我先写好系统提示词，把这套结构和生成规则固定下来", "只需替换模板中的相关数据"],
              "text": "考虑到开发成本，我利用 Google AI Studio 搭建了一个提示词生成智能体。我先写好系统提示词，把这套结构和生成规则固定下来，再为每个章节准备好需求模板。团队成员每次只需替换模板中的相关数据，就能按同一套结构生成章节智能体的提示词。"
            },
            {
              "kind": "prompt-generator"
            },
            { "kind": "prompt-sources-link" }
          ]
        },
        {
          "kind": "subsection",
          "title": "设计成果",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "业务和测试同事试用后，我们结合测试数据和日志，对比了内容结构、工具调用和数据来源的变化。"
            },
            {
              "kind": "prompt-results"
            }
          ]
        }
      ]
    },
    {
      "id": "qsight-05",
      "label": "上线反馈",
      "title": "项目 MVP 版本反馈",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "1.0 上线后，我们在试点中记录了报告交付和部分环节的耗时，也收到了资料整理和来源核对方面的反馈。"
        },
        {
          "kind": "launch-outcomes",
          "items": [
            { "title": "整体交付", "before": "2~3 天", "after": "约 20 分钟", "description": "试点记录中的全流程交付耗时。报告类型和计时的起止环节仍需核对。" },
            { "title": "资料准备与清洗", "before": "半天以上", "after": "约 5~20 分钟", "description": "资料检索和整理集中到一处，准备材料的时间缩短了。" },
            { "title": "纯内容生成", "before": "6~8 小时", "after": "约 5~30 分钟", "description": "这一项记录正文生成耗时，和整份报告的交付时间分开看。" }
          ],
          "feedback": {
            "title": "资料集中处理，来源也更好核对",
            "text": "试点客户反馈，资料检索与整理可以在同一处完成，报告内容的来源也更容易核对。"
          }
        }
      ]
    },
    {
      "id": "qsight-06",
      "label": "总结和思考",
      "title": "项目总结与思考",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "从立项到关停的这大半年，我用 AI 辅助需求分析、访谈整理和设计，也对 AI 产品有了三个更具体的认识。"
        },
        {
          "kind": "paragraph",
          "text": "先明确产品形态和边界，再考虑工具、记忆和知识，避免一开始就做得大而全。"
        },
        {
          "kind": "paragraph",
          "text": "围绕用户需求做设计，同时持续判断模型的能力和限制。"
        },
        {
          "kind": "paragraph",
          "text": "尝试用独立评审检查漏步和内容依据，再交回修改；效果仍需实际测试。"
        },
        {
          "kind": "paragraph",
          "text": "如果项目继续，我希望持续收集用户行为和需求，从多维度了解这个垂直领域更多的需求，去探索更多的解题方法。",
          "highlightPhrases": ["从多维度了解这个垂直领域更多的需求", "探索更多的解题方法"]
        }
      ]
    }
  ],
  "ui": {
    "back": "← 返回首页",
    "next": "下一个案例",
    "nextTitle": "启信产业大脑 →",
    "toc": "案例目录",
    "judgment": "我的判断",
    "result": "结果",
    "footer": "合合信息 · AI 报告平台 Qsight · 2025.04 — 2026.05"
  }
};
