import type { CaseContent } from '../types';

export const qsight: CaseContent = {
  "header": {
    "title": "Qsight · AI 报告平台",
    "intro": "Qsight 是合合信息的 AI 报告平台，帮助研究员整理资料、生成报告和核对来源。我参与需求与业务流程梳理，负责核心交互设计和 Prompt 基础框架，并跟进研发实现与测试验收，直到 1.0 上线。"
  },
  "hero": {
    "plate": "PLATE 01",
    "title": "报告生成全景",
    "instruction": "要放：报告生成全景",
    "caption": "报告生成全景",
    "ratio": "16 / 9"
  },
  "timeline": [],
  "opening": [
    {
      "kind": "metrics",
      "items": [
        {
          "label": "全流程交付",
          "text": "2~3 天 → 约 20 分钟"
        },
        {
          "label": "关键事实可溯源",
          "text": "约 50% → 80%"
        }
      ],
      "note": "试点阶段记录，统计样本、时间范围与核对方式待补充，详见结果章节。"
    }
  ],
  "toc": [
    {
      "id": "qsight-01",
      "label": "挑战"
    },
    {
      "id": "qsight-02",
      "label": "定义问题"
    },
    {
      "id": "qsight-03",
      "label": "关键取舍"
    },
    {
      "id": "qsight-04",
      "label": "最终方案"
    },
    {
      "id": "qsight-05",
      "label": "结果"
    },
    {
      "id": "qsight-06",
      "label": "反思"
    }
  ],
  "chapters": [
    {
      "id": "qsight-01",
      "label": "挑战",
      "title": "报告生成中的信任问题",
      "blocks": [
        {
          "kind": "quotes",
          "texts": [
            "“AI 给出的数字看着很真，但查不到来源，我肯定不敢交。”"
          ]
        },
        {
          "kind": "paragraph",
          "text": "除了数字缺少出处，研究员还担心报告结构偏离需求。生成后仍要返工，有时还不如自己重写。"
        }
      ]
    },
    {
      "id": "qsight-02",
      "label": "定义问题",
      "title": "访谈发现",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "我们与 1 家试点客户的 4 位业务人员进行了 3 轮访谈：先还原最近一次报告的制作和审核过程，再结合竞品讨论生成前的控制方式，最后用低保真原型确认历史材料复用与来源核查的需求。问题集中在三个方面："
        },
        {
          "kind": "columns",
          "items": [
            {
              "label": "准备慢",
              "text": "材料分散，格式不统一，需要反复整理"
            },
            {
              "label": "怕跑偏",
              "text": "报告结构偏离需求或数字出错，生成后仍需大幅修改"
            },
            {
              "label": "难核查",
              "text": "数字缺少出处，已有报告也难以复用"
            }
          ]
        },
        {
          "kind": "flow",
          "rows": [
            {
              "steps": [
                "任务定义",
                "材料整理",
                "生成前确认",
                "内容生成",
                "核查交付"
              ],
              "highlight": [
                2,
                3,
                4
              ]
            }
          ],
          "note": "1.0 的设计集中在图中高亮的三个环节：生成前确认范围和大纲，生成时显示进度与异常，交付前逐段核查来源。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 02",
              "title": "访谈记录",
              "instruction": "要放：访谈记录",
              "caption": "访谈记录"
            }
          ]
        }
      ]
    },
    {
      "id": "qsight-03",
      "label": "关键取舍",
      "title": "关键设计取舍",
      "blocks": [
        {
          "kind": "subsection",
          "title": "正文中的来源引用",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "早期方案把来源集中放在报告末尾。访谈中，研究员仍担心数字是否可信，读到具体内容时也难以找到对应依据。\n我们改为在正文中标注引用编号，与旁边的来源卡片对应，让核查发生在阅读的位置。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 03",
                  "title": "早期：来源在文末",
                  "instruction": "要放：早期：来源在文末",
                  "caption": "早期：来源在文末"
                },
                {
                  "plate": "PLATE 04",
                  "title": "最终：来源在正文旁",
                  "instruction": "要放：最终：来源在正文旁",
                  "caption": "最终：来源在正文旁"
                }
              ]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "复用已有企业分组",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "研究员往往需要持续跟踪同一批企业。因此，除了导入文件，我们也支持直接选择启信产业大脑中已有的企业分组，作为报告的企业范围。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "Prompt 配置",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "最初规划的 Prompt 控制台包含 10+1 个模块。1.0 研发资源有限，我们没有先做可视化配置后台，先将 Prompt 拆成四个模块，供团队维护。"
            },
            {
              "kind": "columns",
              "items": [
                {
                  "label": "任务定义",
                  "text": ""
                },
                {
                  "label": "工具编排",
                  "text": ""
                },
                {
                  "label": "质量门禁",
                  "text": ""
                },
                {
                  "label": "容错兜底",
                  "text": ""
                }
              ]
            },
            {
              "kind": "paragraph",
              "text": "当时 Agent 框架刚搭建，我把 Prompt 与执行步骤逐一对应，并为关键阶段设置校验、重试和兜底，避免错误继续传到后续章节。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 05",
                  "title": "没有上线的控制台原型",
                  "instruction": "要放：没有上线的控制台原型",
                  "caption": "没有上线的控制台原型"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "qsight-04",
      "label": "最终方案",
      "title": "报告生成与核查流程",
      "blocks": [
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
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 06",
              "title": "大纲确认",
              "instruction": "要放：大纲确认",
              "caption": "逐章确认监测对象、时间范围和重点产业，并按需增删章节。"
            }
          ]
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 07",
              "title": "数据来源配置",
              "instruction": "要放：数据来源配置",
              "caption": "在同一处配置启信数据、知识库、本地文件和网页链接。"
            }
          ]
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 08",
              "title": "执行过程",
              "instruction": "要放：执行过程",
              "caption": "显示当前检索内容、执行进度和失败后的重试次数。缺失数据单独标注，要求模型不补写没有依据的数字。"
            }
          ]
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 09",
              "title": "来源卡片",
              "instruction": "要放：来源卡片",
              "caption": "正文的引用编号对应旁边的来源卡片，四类来源用不同标签和颜色区分。"
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
      "id": "qsight-05",
      "label": "结果",
      "title": "1.0 上线后",
      "blocks": [
        {
          "kind": "metrics",
          "items": [
            {
              "label": "全流程交付",
              "text": "2~3 天 → 约 20 分钟"
            },
            {
              "label": "关键事实可溯源",
              "text": "约 50% → 80%"
            },
            {
              "label": "资料准备与清洗",
              "text": "半天以上 → 约 5~20 分钟"
            },
            {
              "label": "纯内容生成",
              "text": "6~8 小时 → 约 5~30 分钟"
            }
          ],
          "note": "【待填：统计了多少份报告、什么时间段、溯源率如何核对；全流程和两个分项的时间要对得上】"
        },
        {
          "kind": "paragraph",
          "text": "试点客户反馈，资料检索与整理可以在同一处完成，报告内容的来源也更容易核对。【待填：一句客户原话，注明是谁、在什么场合说的】"
        }
      ]
    },
    {
      "id": "qsight-06",
      "label": "反思",
      "title": "规则边界与后续计划",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "随着模型能力提升，我认为需要固定下来的规则可以减少。Qsight 仍保留三项要求：生成前确认，内容标明来源，缺失数据明确提示。具体的写作表达由模型处理。\n下一步打算加自定义写作样本库和在线编辑，让报告能贴合不同机构的文风。"
        },
        {
          "kind": "subsection",
          "title": "如果重来",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "【待填：如果重来，我会改什么。一两句。】"
            }
          ]
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
