import type { CaseContent } from '../types';

export const qsight: CaseContent = {
  "header": {
    "title": "让研究员敢把报告交给 AI 写",
    "intro": "研究员写一份区域监测报告，大半天都花在找资料上。Qsight 是合合信息的 AI 报告平台，帮他们整合资料、生成报告并核查来源。我负责核心交互和 Prompt 基础框架，一直跟到 1.0 上线。"
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
      "note": ""
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
      "title": "报告核查的顾虑",
      "blocks": [
        {
          "kind": "quotes",
          "texts": [
            "“AI 给出的数字看着很真，但查不到来源，我肯定不敢交。”"
          ]
        },
        {
          "kind": "paragraph",
          "text": "研究员担心 AI 生成的结构跑偏、数字没有出处；生成完再返工，可能还不如自己重写。"
        }
      ]
    },
    {
      "id": "qsight-02",
      "label": "定义问题",
      "title": "三轮访谈与控制点",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "我们和 1 家试点客户的 4 位业务人员做了 3 轮访谈，再结合竞品分析和低保真原型讨论，归纳出三个问题。"
        },
        {
          "kind": "columns",
          "items": [
            {
              "label": "准备慢",
              "text": "材料分散，格式一变就要重新整理"
            },
            {
              "label": "怕跑偏",
              "text": "结构或数字一旦跑偏，生成后就要大量返工"
            },
            {
              "label": "难核查",
              "text": "数字找不到出处，旧报告也没法接着用"
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
          "note": "1.0 只在高亮的三步加控制：生成前确认范围和大纲，生成中显示进度和异常，交付前核查每段来源。"
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
      "title": "三处方案取舍",
      "blocks": [
        {
          "kind": "subsection",
          "title": "正文旁的来源卡片",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "最早来源统一放在报告末尾，用户读到一个数字，还是对不上它来自哪里。后来改成正文里的引用编号，直接连到旁边的来源卡片。"
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
          "title": "沿用已有企业名单",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "研究员要跟踪的，往往是一直在关注的企业，不只是上传几个文件。所以除了文件导入，企业范围也可以直接选启信产业大脑里的企业分组。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "上线的四个 Prompt 模块",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "原先规划的是一个 10+1 个模块的 Prompt 控制台，1.0 没有上线它，只保留了四个模块。"
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
      "title": "报告交付的六步",
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
              "caption": "逐章确认监测对象、时间范围和重点产业，可以增删章节。"
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
              "caption": "启信数据、知识库、本地文件和网页链接放在一处管理。"
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
              "caption": "显示检索和执行状态，失败时告诉用户重试了几次；缺失的数据会标出来，不让模型自己补数字。"
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
              "caption": "正文的引用编号连到旁边的来源卡片，四类来源用标签和颜色区分。"
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
      "title": "1.0 试点结果",
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
          "text": "试点客户的反馈是：资料查找和整理更集中了，内容的来源也更容易确认。【待填：一句客户原话，注明是谁、在什么场合说的】"
        }
      ]
    },
    {
      "id": "qsight-06",
      "label": "反思",
      "title": "规则与模型的分工",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "模型能力增强后，需要写死的规则也少了。在 Qsight 里，我仍用规则保证生成前确认、内容有来源、缺失数据要标出，具体表达交给模型判断。下一阶段计划加入自定义写作样本库和在线编辑，让报告适应不同机构的文风。"
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
    "nextTitle": "让招商人员自己搭本地产业链 →",
    "toc": "案例目录",
    "judgment": "我的判断",
    "result": "结果",
    "footer": "合合信息 · AI 报告平台 Qsight · 2025.04 — 2026.05"
  }
};
