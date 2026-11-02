import type { CaseContent } from '../types';

// 基于任务单事实，按用户后续批注压缩并整合叙事。原始长稿保留在任务单与 Git 历史。
export const qsight: CaseContent = {
  "header": {
    "label": "合合信息 · AI 报告平台 Qsight · 2025.04 — 2026.05",
    "title": "让研究员敢把报告交给 AI 写",
    "intro": "Qsight 是合合信息的 AI 报告平台，帮助研究员整合资料、生成报告并核查来源。我负责核心交互与 Prompt 基础框架，一直跟到 1.0 上线。",
    "facts": [
      {
        "label": "角色",
        "text": "产品设计师"
      },
      {
        "label": "我负责",
        "text": "核心交互方案 · Prompt 基础框架 · 开发跟进与验收"
      },
      {
        "label": "团队",
        "text": "【待填：产品 / 研发 / 算法人数】"
      },
      {
        "label": "状态",
        "text": "1.0 已上线"
      }
    ]
  },
  "hero": {
    "plate": "PLATE 01",
    "title": "报告生成全景",
    "instruction": "要放：报告生成界面，左侧执行过程，右侧逐段成文",
    "caption": "报告生成：左侧是执行过程，右侧逐段成文。",
    "ratio": "16 / 9"
  },
  "toc": [
    {
      "id": "qsight-overview",
      "label": "01 · 概括"
    },
    {
      "id": "qsight-02",
      "label": "02 · 设计构思"
    },
    {
      "id": "qsight-03",
      "label": "03 · 最终方案"
    },
    {
      "id": "qsight-04",
      "label": "04 · 结果"
    },
    {
      "id": "qsight-05",
      "label": "05 · 下一步与反思"
    }
  ],
  "chapters": [
    {
      "id": "qsight-overview",
      "label": "01 · 概括",
      "title": "概括",
      "blocks": [
        {
          "kind": "subsection",
          "title": "挑战",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "写报告的大量时间耗在资料准备上。交给 AI 后，研究员仍担心结构跑偏、数字没有出处；生成后再返工，可能还不如自己重写。"
            },
            {
              "kind": "quotes",
              "texts": [
                "“AI 给出的数字看着很真，但查不到来源，我肯定不敢交。”"
              ]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "定义问题",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "所以设计的重点是：在生成之前先确认范围和大纲，生成时让过程看得见，生成后每段正文都能查到来源。"
            },
            {
              "kind": "subsection",
              "title": "通过三轮访谈，确定三个关键问题",
              "blocks": [
                {
                  "kind": "paragraph",
                  "text": "我们与 1 家试点客户的 4 位业务人员做了 3 轮访谈，再结合竞品分析和低保真原型讨论，确定先做哪些。"
                },
                {
                  "kind": "columns",
                  "items": [
                    {
                      "label": "准备慢",
                      "text": "材料分散，格式变化就要重新整理。"
                    },
                    {
                      "label": "怕跑偏",
                      "text": "结构或数字一旦跑偏，生成后就要大量返工。"
                    },
                    {
                      "label": "难核查",
                      "text": "数字找不到出处，旧报告也没法接着用。"
                    }
                  ]
                },
                {
                  "kind": "figures",
                  "figures": [
                    {
                      "plate": "PLATE 02",
                      "title": "访谈记录",
                      "instruction": "要放：访谈白板或便签截图，敏感信息打码（没有可删除此图）",
                      "caption": "三轮访谈的记录快照。"
                    }
                  ]
                }
              ]
            },
            {
              "kind": "subsection",
              "title": "1.0 聚焦确认、生成和核查",
              "blocks": [
                {
                  "kind": "paragraph",
                  "text": "我们把报告生成过程分成三个需要确认或核查的阶段：生成前确认范围和大纲，生成中显示进度与异常，交付前核查每段来源。"
                },
                {
                  "kind": "figures",
                  "figures": [
                    {
                      "plate": "PLATE 03",
                      "title": "报告生产旅程图",
                      "instruction": "要放：五阶段可控感曲线，材料整理阶段画出五种来源分支，1.0 覆盖阶段用蓝色标出（之后单独重画）",
                      "caption": "报告生产旅程与可控感变化。"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "qsight-02",
      "label": "02 · 设计构思",
      "title": "设计构思",
      "blocks": [
        {
          "kind": "subsection",
          "title": "来源从文末汇总，改成正文就近绑定",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "来源集中在文末，用户仍然对不上正文里的数字。改用引用编号连接来源卡片，让依据出现在需要核查的位置。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 04",
                  "title": "早期方案",
                  "instruction": "要放：来源集中在文末的版本【待补截图】",
                  "caption": "早期：来源集中在报告末尾。"
                },
                {
                  "plate": "PLATE 05",
                  "title": "最终方案",
                  "instruction": "要放：正文引用编号 + 来源卡片",
                  "caption": "最终：来源就近出现在正文里。"
                }
              ]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "企业范围沿用旧名单，减少重复准备",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "用户需要继续跟踪已有企业，而不只是上传文件。除了文件导入，企业范围也能直接选择启信产业大脑中的分组。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "Prompt 从完整控制台，缩减为四个模块",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "1.0 没有上线原先规划的 10+1 模块控制台。配置缩减为任务定义、工具编排、质量门禁和容错兜底四个模块。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 06",
                  "title": "Prompt 控制台原型",
                  "instruction": "要放：之前规划的控制台原型缩略图",
                  "caption": "没有上线的控制台原型。"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "qsight-03",
      "label": "03 · 最终方案",
      "title": "沿着报告生产流程，逐步建立控制感",
      "blocks": [
        {
          "kind": "subsection",
          "title": "先选报告类型",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "从明确的研究场景进入，减少输入负担，也为报告建立结构。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 07",
                  "title": "模板中心",
                  "instruction": "要放：模板中心",
                  "caption": "模板中心"
                }
              ]
            }
          ],
          "number": "①"
        },
        {
          "kind": "subsection",
          "title": "先确认大纲，再生成正文",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "逐章确认监测对象、时间范围和重点产业，支持增删章节。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 08",
                  "title": "大纲确认",
                  "instruction": "要放：大纲确认",
                  "caption": "大纲确认"
                }
              ]
            }
          ],
          "number": "②"
        },
        {
          "kind": "subsection",
          "title": "生成前，把材料和企业范围准备好",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "启信数据、知识库、本地文件和网页链接集中管理；企业范围支持沿用已有分组。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 09",
                  "title": "数据来源配置",
                  "instruction": "要放：数据来源配置",
                  "caption": "数据来源配置"
                },
                {
                  "plate": "PLATE 10",
                  "title": "企业添加方式",
                  "instruction": "要放：企业添加方式",
                  "caption": "企业添加方式"
                }
              ]
            }
          ],
          "number": "③"
        },
        {
          "kind": "subsection",
          "title": "让等待、重试和缺失都看得见",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "显示检索与执行状态，失败时告知重试次数；缺失数据明确标注，不让模型补出数字。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 11",
                  "title": "执行过程面板",
                  "instruction": "要放：执行过程面板",
                  "caption": "执行过程面板"
                }
              ]
            }
          ],
          "number": "④"
        },
        {
          "kind": "subsection",
          "title": "读到哪里，就能核查哪里的来源",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "正文引用编号连接就近来源卡片，用标签和颜色区分四类来源。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 12",
                  "title": "引用编号",
                  "instruction": "要放：引用编号",
                  "caption": "引用编号"
                },
                {
                  "plate": "PLATE 13",
                  "title": "来源卡片",
                  "instruction": "要放：来源卡片",
                  "caption": "来源卡片"
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
          ],
          "number": "⑤"
        },
        {
          "kind": "subsection",
          "title": "旧报告成为下一次的起点",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "历史文档按报告类型归档，支持在已有报告上更新数据。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 14",
                  "title": "历史文档",
                  "instruction": "要放：历史文档",
                  "caption": "历史文档"
                }
              ]
            }
          ],
          "number": "⑥"
        }
      ]
    },
    {
      "id": "qsight-04",
      "label": "04 · 结果",
      "title": "1.0 在试点客户上线后的变化",
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
          "text": "试点客户的反馈是：资料查找和整理更集中了，内容的来源也更容易确认。 【待填：一句客户原话，注明是谁、在什么场合说的】"
        }
      ]
    },
    {
      "id": "qsight-05",
      "label": "05 · 下一步与反思",
      "title": "留下可维护的边界，减少写死的规则",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "下一阶段计划加入自定义写作样本库和在线编辑，让报告适应不同机构的文风。"
        },
        {
          "kind": "paragraph",
          "text": "模型越来越强，需要写死的规则越来越少。所以我把两件事分开：系统必须保证的体验（先确认、有来源、缺失要标出来）用规则守住，怎么表达交给模型判断。"
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
