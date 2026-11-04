import type { CaseContent } from '../types';

export const qsight: CaseContent = {
  "header": {
    "title": "Qsight · AI 报告平台",
    "intro": "Qsight 是合合信息面向研究员的 AI 报告平台。研究员需要整理分散的材料，也担心生成的报告偏离需求、数字缺少依据。我负责核心交互设计和 Prompt 基础框架，参与需求与业务流程梳理，并跟进研发实现和测试验收，直到 1.0 上线。",
    "facts": [
      {
        "label": "项目周期",
        "text": "2025.04–2026.05"
      },
      {
        "label": "交付阶段",
        "text": "从需求梳理到 1.0 上线"
      }
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
      "label": "形成方案"
    },
    {
      "id": "qsight-03",
      "label": "来源核查"
    },
    {
      "id": "qsight-04",
      "label": "提示词优化"
    },
    {
      "id": "qsight-05",
      "label": "上线反馈"
    },
    {
      "id": "qsight-06",
      "label": "项目反思"
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
            { "kind": "paragraph", "text": "试用时，用户对入口、操作步骤和报告交付提出了这些问题。", "highlight": "本轮测试中，用户没有遇到明显阻碍，整体流程基本可行。" },
            { "kind": "test-feedback-bubbles" }
          ]
        }
          ]
        },
        {
          "kind": "subsection",
          "title": "MVP 版本的启动",
          "prominent": true,
          "blocks": [
            {
              "kind": "paragraph",
              "text": "几轮访谈后，我们开始设计 MVP，尽量解决用户的实际问题，不增加操作负担，让用户顺利完成报告。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "快捷模版选择",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "用户希望选好模板、稍作调整就能生成报告，这也符合我们快速验证生成质量的需要。因此第一版优先做固定模板，暂不做对话生成；后续也可以保留为快速生成报告的入口。"
            },
            { "kind": "responsive-template" }
          ]
        }
      ]
    },
    {
      "id": "qsight-02",
      "label": "形成方案",
      "title": "用户确认大纲",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "首版完整展示 AI 从公司企业数据表中推荐的维度，虽然页面信息更多，但用户和团队能在生成前核对 AI 是否选对。",
          "highlight": "优先让生成依据可见、可核对，避免生成过程成为黑箱。"
        },
        {
          "kind": "outline-devices"
        },
        {
          "kind": "subsection",
          "title": "生成后继续修改和交付报告",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "报告生成后，电脑端支持选中段落继续修改；移动端以阅读为主，保留复制、下载和分享，方便用户查看和交付报告。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 04",
                  "title": "电脑端报告编辑",
                  "instruction": "",
                  "src": "images/qsight/report-sources-web.webp",
                  "alt": "电脑端报告正文，选中段落后可继续修改内容",
                  "width": 2880,
                  "height": 1800,
                  "framed": true,
                  "caption": ""
                }
              ]
            },
            {
              "kind": "figures",
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
              "kind": "figures",
              "figures": [
                {
                  "plate": "REPORT HISTORY",
                  "title": "报告生成历史",
                  "instruction": "",
                  "src": "images/qsight/report-history.webp",
                  "alt": "报告生成历史页面，按主题查看历史会话和报告文档",
                  "width": 2880,
                  "height": 1800,
                  "framed": true,
                  "caption": ""
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "qsight-03",
      "label": "来源核查",
      "title": "把来源放到正文旁边",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "早期方案把来源集中放在报告末尾。访谈中，研究员仍担心数字是否可信，读到具体内容时也难以找到对应依据。"
        },
        {
          "kind": "paragraph",
          "text": "我们改为在正文中标注引用编号，与旁边的来源卡片对应，方便研究员边读边核对。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 05",
              "title": "早期：来源在文末",
              "instruction": "要放：早期：来源在文末",
              "caption": "早期：来源在文末"
            },
            {
              "plate": "PLATE 06",
              "title": "最终：来源在正文旁",
              "instruction": "要放：最终：来源在正文旁",
              "caption": "最终：来源在正文旁"
            }
          ]
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 07",
              "title": "来源卡片",
              "instruction": "要放：来源卡片",
              "caption": "正文中的引用编号对应来源卡片；标签和颜色区分企业数据、客户材料、公开信息，以及模型推理与计算。"
            }
          ]
        },
        {
          "kind": "sources",
          "items": [
            {
              "key": "qixin",
              "text": "启信数据 · 企业库事实"
            },
            {
              "key": "kb",
              "text": "知识库 · 客户材料"
            },
            {
              "key": "web",
              "text": "互联网数据 · 公开信息"
            },
            {
              "key": "model",
              "text": "模型运算 · 推理与计算"
            }
          ]
        }
      ]
    },
    {
      "id": "qsight-04",
      "label": "提示词优化",
      "title": "1.0 的范围与落地",
      "blocks": [
        {
          "kind": "subsection",
          "title": "显示执行进度和异常",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "生成需要经过检索和内容处理等步骤。我在界面中呈现当前检索内容、执行进度和失败后的重试次数；缺失数据单独标注，并在 Prompt 中要求模型不补写没有依据的数字。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 08",
                  "title": "执行过程",
                  "instruction": "要放：执行过程",
                  "caption": "执行过程中展示检索内容、进度和重试次数，缺失数据单独提示。"
                }
              ]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "暂不做可视化 Prompt 后台",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "最初规划的 Prompt 控制台包含 10+1 个模块。1.0 研发资源有限，我们暂不做可视化配置后台，先将 Prompt 拆成任务定义、工具编排、质量门禁和容错兜底四个模块，供团队维护。"
            },
            {
              "kind": "paragraph",
              "text": "当时 Agent 框架刚搭建。我把 Prompt 与执行步骤逐一对应，并为关键阶段设置校验、重试和兜底，目的是避免错误继续传到后续章节。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 09",
                  "title": "没有上线的控制台原型",
                  "instruction": "要放：没有上线的控制台原型",
                  "caption": "未上线的 Prompt 控制台原型。1.0 先采用分模块维护的方式。"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "qsight-05",
      "label": "上线反馈",
      "title": "上线后的反馈与记录",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "1.0 已上线。试点阶段记录了整体交付、分阶段耗时和关键事实溯源情况，统计样本与口径仍待补充。"
        },
        {
          "kind": "subsection",
          "title": "整体交付耗时",
          "blocks": [
            {
              "kind": "metrics",
              "items": [
                {
                  "label": "全流程交付",
                  "text": "2~3 天 → 约 20 分钟"
                }
              ],
              "note": "【待填：报告类型、样本数量、统计时间，以及整体交付的起止环节】"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "分阶段耗时",
          "blocks": [
            {
              "kind": "metrics",
              "items": [
                {
                  "label": "资料准备与清洗",
                  "text": "半天以上 → 约 5~20 分钟"
                },
                {
                  "label": "纯内容生成",
                  "text": "6~8 小时 → 约 5~30 分钟"
                }
              ],
              "note": "【待填：各阶段的样本与计时范围，以及与整体交付耗时的对应关系】"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "关键事实溯源",
          "blocks": [
            {
              "kind": "metrics",
              "items": [
                {
                  "label": "关键事实可溯源",
                  "text": "约 50% → 80%"
                }
              ],
              "note": "【待填：关键事实的定义、核对方式、样本数量与统计时间】"
            }
          ]
        },
        {
          "kind": "paragraph",
          "text": "试点客户反馈，资料检索与整理可以在同一处完成，报告内容的来源也更容易核对。【待填：补充这条上线反馈的记录与场合】"
        },
        {
          "kind": "subsection",
          "title": "上线后提出的企业范围复用需求",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "用户希望沿用已有企业名单持续跟踪。相比每次上传文件，他们更希望直接复用启信产业大脑中的客户数据。这成为 1.0 上线后的延伸需求，涉及企业分组、账户权限和跨系统关联。"
            }
          ]
        }
      ]
    },
    {
      "id": "qsight-06",
      "label": "项目反思",
      "title": "保留的规则与后续计划",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "随着模型能力提升，我认为需要固定下来的规则可以减少。目前 Qsight 仍保留生成前确认、内容标明来源和缺失数据提示这三项要求，具体的写作表达交给模型处理。"
        },
        {
          "kind": "paragraph",
          "text": "后续计划加入自定义写作样本库和在线编辑，让报告更贴合不同机构的文风。"
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
