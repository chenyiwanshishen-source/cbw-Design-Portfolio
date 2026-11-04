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
            { "kind": "report-edit-carousel" },
            {
              "kind": "figures",
              "arrow": true,
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
      "label": "提示词优化",
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
            { "label": "生成内容严重跑偏", "text": "报告生成后，发现内容已明显偏离大纲和章节要求。" },
            { "label": "跳过该用的工具", "text": "模型有时跳过应调用的工具，直接生成内容。" },
            { "label": "AI 编造数据", "text": "AI 会编造没有依据的数据，并写进报告正文。" }
          ]
        },
        {
          "kind": "subsection",
          "title": "设计方案",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "了解大模型的基础知识和工作原理后，我将生成过程拆成四个阶段，分别明确任务、工具、质量要求和异常处理。"
            },
            { "kind": "prompt-structure" },
            {
              "kind": "paragraph",
              "text": "最初规划的 Prompt 控制台有 10+1 个模块。1.0 研发资源有限，我们不做可视化配置后台，先把 Prompt 拆成四个模块，由团队自己维护。"
            },
            {
              "kind": "layers",
              "items": [
                {
                  "label": "任务定义",
                  "text": "目标、身份、成功标准"
                },
                {
                  "label": "工具编排",
                  "text": "要什么输入，按什么顺序调用哪些工具"
                },
                {
                  "label": "质量门禁",
                  "text": "约束边界、输出格式、异常怎么处理"
                },
                {
                  "label": "容错兜底",
                  "text": "兜底办法和交付前的自检清单"
                }
              ]
            },
            {
              "kind": "paragraph",
              "text": "当时 Agent 框架刚搭起来。我让 Prompt 和执行步骤一一对应，关键步骤没通过校验就重试或走兜底，避免错误传到后面的章节。"
            },
            {
              "kind": "paragraph",
              "text": "验证规则时，我先用能力较低的模型跑，因为强模型容易把规则里的漏洞盖住。换到生产用的模型后，再对比通过率、重试率、来源覆盖率和成本。【待填：这个对比是否已经做过，结果如何】"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 10",
                  "title": "没有上线的控制台原型",
                  "instruction": "要放：没有上线的控制台原型",
                  "caption": "未上线的 Prompt 控制台原型。1.0 先采用分模块维护的方式。"
                }
              ]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "一个章节的 Prompt 里写了什么",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "以\"重点企业监测\"这一章为例。它只要纯文本的\"分类 + 简报 + 来源链接\"，不要总结，不要图表，也不要表格。【待填：为什么这样要求，是业务方提的，还是测试后发现的】"
            },
            {
              "kind": "columns",
              "items": [
                {
                  "label": "正例",
                  "text": "分成融资和新品、榜单、获奖三类，每家企业一条简报，后面跟来源链接。"
                },
                {
                  "label": "反例",
                  "text": "分类开头写了一句\"本月呈现上升趋势\"，后面还附了一张融资金额表。两处都算违规。"
                }
              ]
            },
            {
              "kind": "paragraph",
              "text": "Prompt 最前面还有一条规则：用户的明确要求永远大于系统提示词，两者冲突时听用户的。交付前，模型要先过一遍自检清单，一共 6 项，比如：是否已全局去重，每条信息只留一个来源；是否排除了任何形式的总结、图表和表格。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "用编译器写各章的 Prompt",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "不同章节各有一份 Prompt。靠个人经验手写，写法容易分散，也不好维护。"
            },
            {
              "kind": "flow",
              "rows": [
                {
                  "steps": [
                    "团队成员用大白话说需求",
                    "Google AI Studio 里的提示词编译器",
                    "完整可部署的章节 Prompt"
                  ],
                  "highlight": [
                    1
                  ]
                }
              ]
            },
            {
              "kind": "paragraph",
              "text": "我在 Google AI Studio 里搭了一个提示词编译器。团队成员输入业务诉求，它按统一的结构生成章节 Prompt。【待填：现在谁在用，已经生成过几个章节的 Prompt】"
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
