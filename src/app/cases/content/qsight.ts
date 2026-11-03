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
      "label": "问题与范围"
    },
    {
      "id": "qsight-02",
      "label": "生成前确认"
    },
    {
      "id": "qsight-03",
      "label": "来源核查"
    },
    {
      "id": "qsight-04",
      "label": "1.0 的取舍"
    },
    {
      "id": "qsight-05",
      "label": "上线反馈"
    },
    {
      "id": "qsight-06",
      "label": "后续计划"
    }
  ],
  "chapters": [
    {
      "id": "qsight-01",
      "label": "问题与范围",
      "title": "研究员需要确认报告能否交付",
      "blocks": [
        {
          "kind": "quotes",
          "texts": [
            "“AI 给出的数字看着很真，但查不到来源，我肯定不敢交。”"
          ]
        },
        {
          "kind": "paragraph",
          "text": "我们与 1 家试点客户的 4 位业务人员进行了 3 轮访谈。先还原最近一次报告的制作和审核过程，再结合竞品讨论生成前需要确认的内容，最后用低保真原型确认历史材料复用和来源核查的需求。"
        },
        {
          "kind": "paragraph",
          "text": "材料分散、格式不统一，拖慢了准备工作。生成之后，报告结构和数字仍需检查；一旦偏离需求，研究员就要大幅修改，甚至重写。已有报告中的材料也难以复用。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 02",
              "title": "访谈记录",
              "instruction": "要放：访谈记录",
              "caption": "三轮访谈分别讨论报告制作与审核、生成前的确认方式，以及历史材料复用和来源核查。"
            }
          ]
        },
        {
          "kind": "paragraph",
          "text": "1.0 的交互设计重点放在三个环节：生成前确认范围和大纲，生成时显示进度与异常，交付前核对来源。"
        },
        {
          "kind": "flow",
          "rows": [
            {
              "steps": [
                "选报告类型",
                "确认大纲",
                "准备材料和企业范围",
                "生成并显示过程",
                "逐段核查来源",
                "存为下一次的起点"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "qsight-02",
      "label": "生成前确认",
      "title": "先确认大纲与企业范围",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "研究员担心报告结构偏离需求。我把大纲确认放在生成之前，让用户逐章确认监测对象、时间范围和重点产业，再按需增删章节。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 03",
              "title": "大纲确认",
              "instruction": "要放：大纲确认",
              "caption": "生成前确认大纲：监测对象、时间范围和重点产业可以逐章检查，章节可以增删。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "沿用已有的企业范围",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "研究员往往需要持续跟踪同一批企业。除了导入文件，我们也支持选择启信产业大脑中已有的企业分组，作为报告的企业范围。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "集中配置资料来源",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "报告用到的材料来自不同地方。我把启信数据、知识库、本地文件和网页链接放在同一处配置，供研究员准备本次报告的资料。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 04",
                  "title": "数据来源配置",
                  "instruction": "要放：数据来源配置",
                  "caption": "数据来源配置：在同一处选择企业数据和知识库，补充本地文件与网页链接。"
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
      "label": "1.0 的取舍",
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
        }
      ]
    },
    {
      "id": "qsight-06",
      "label": "后续计划",
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
