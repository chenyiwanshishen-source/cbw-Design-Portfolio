import type { CaseContent } from '../types';

export const qixin: CaseContent = {
  "header": {
    "title": "把企业数据查询工具，做成招商人员的工作台",
    "intro": "启信产业大脑是给政府招商、产业分析和区域经济管理用的企业数据平台。我从 2021 年开始一直是它的主要设计师，首页改版和自定义产业链是我主导的，组件库是我和两位设计师一起从零搭起来的。"
  },
  "hero": {
    "plate": "PLATE 01",
    "title": "当前首页（脱敏）",
    "instruction": "要放：当前首页（脱敏）",
    "caption": "当前首页（脱敏）",
    "ratio": "16 / 9"
  },
  "timeline": [
    "2021 招商大脑 1.0",
    "2024 标品规范",
    "2025 平台扩展",
    "2026 自定义产业链与 AI 报告联动"
  ],
  "opening": [
    {
      "kind": "metrics",
      "items": [
        {
          "label": "本地产业链构建周期",
          "text": "1–2 周 → 2–3 天"
        }
      ],
      "note": ""
    }
  ],
  "toc": [
    {
      "id": "qixin-01",
      "label": "挑战"
    },
    {
      "id": "qixin-02",
      "label": "定义问题"
    },
    {
      "id": "qixin-03",
      "label": "自定义产业链"
    },
    {
      "id": "qixin-04",
      "label": "首页工作台"
    },
    {
      "id": "qixin-05",
      "label": "设计系统"
    },
    {
      "id": "qixin-06",
      "label": "结果与反思"
    }
  ],
  "chapters": [
    {
      "id": "qixin-01",
      "label": "挑战",
      "title": "起因",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "产业大脑做了好几年，功能一直在加，数据和功能却散在各处。用户想从圈定范围一路做到出结果，很难一口气做完。"
        }
      ]
    },
    {
      "id": "qixin-02",
      "label": "定义问题",
      "title": "五类用户",
      "blocks": [
        {
          "kind": "flow",
          "rows": [
            {
              "steps": [
                "定位范围",
                "筛选目标",
                "判断价值",
                "持续管理",
                "输出结果"
              ]
            }
          ]
        },
        {
          "kind": "table",
          "label": "五类用户与核心任务",
          "headers": [
            "场景",
            "典型用户",
            "核心任务"
          ],
          "rows": [
            [
              "招商",
              "招商办、园区招商人员",
              "找产业、找企业、建名单、跟进线索"
            ],
            [
              "产业服务",
              "产业部门、园区运营",
              "看产业结构、服务本地企业"
            ],
            [
              "企业服务",
              "企业服务部门",
              "看企业画像、识别风险、跟踪成长"
            ],
            [
              "金融",
              "银行、投资机构",
              "企业筛选、风险判断、价值评估"
            ],
            [
              "区域治理",
              "区域经济管理者",
              "看区域经济、迁入迁出、输出报告"
            ]
          ]
        },
        {
          "kind": "paragraph",
          "text": "五类用户场景不同，走的其实是同一条路。我拿招商当主场景，画了一张体验地图。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 02",
              "title": "招商场景体验地图",
              "instruction": "要放：招商场景体验地图",
              "caption": "招商场景体验地图"
            }
          ]
        }
      ]
    },
    {
      "id": "qixin-03",
      "label": "自定义产业链",
      "title": "自定义产业链",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "每个地区怎么划产业链、哪些企业算本地特色，说法都不一样。以前用户提个需求，得等我们梳理结构、开发配置，改一次再等一轮。"
        },
        {
          "kind": "flow",
          "rows": [
            {
              "label": "改前",
              "steps": [
                "用户提需求",
                "我们梳理结构",
                "开发配置",
                "用户确认，不对再来一轮"
              ]
            },
            {
              "label": "改后",
              "steps": [
                "选用标准环节",
                "新建本地环节",
                "维护企业名单"
              ],
              "highlight": [
                0,
                1,
                2
              ]
            }
          ]
        },
        {
          "kind": "paragraph",
          "text": "我的判断是，标准环节其实能复用，不一样的只是本地怎么划。所以我把配置做成了产品功能：标准环节直接选，没有的自己建，节点关系和企业名单都由用户自己维护。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 03",
              "title": "产业链图谱编辑态",
              "instruction": "要放：产业链图谱编辑态",
              "caption": "产业链图谱编辑态"
            },
            {
              "plate": "PLATE 04",
              "title": "企业池",
              "instruction": "要放：企业池",
              "caption": "企业池"
            }
          ]
        },
        {
          "kind": "metrics",
          "items": [
            {
              "label": "本地产业链构建周期",
              "text": "1–2 周 → 2–3 天"
            }
          ],
          "note": "【待填：统计方式】"
        }
      ]
    },
    {
      "id": "qixin-04",
      "label": "首页工作台",
      "title": "首页",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "用户一进系统，要做的是当天的工作，不是去菜单里找功能。所以我把首页改成了任务看板，分成报告入口、动态信息、业务概览和常用功能四块，不同角色进来就能直接开始查、判断、跟进。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 05",
              "title": "新版首页分区标注",
              "instruction": "要放：新版首页分区标注",
              "caption": "新版首页分区标注"
            }
          ]
        },
        {
          "kind": "paragraph",
          "text": "结果：【待填：上线后的使用情况或反馈】"
        }
      ]
    },
    {
      "id": "qixin-05",
      "label": "设计系统",
      "title": "组件库",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "孵化期为了快点上线，直接用的启信宝的规范。后来两个产品定位分开了，产业大脑得有自己的样子。我和两位设计师先把已上线的页面盘了一遍，再搭了一套五层的组件库。"
        },
        {
          "kind": "layers",
          "items": [
            {
              "label": "页面模板",
              "text": ""
            },
            {
              "label": "业务组件",
              "text": ""
            },
            {
              "label": "复合组件",
              "text": ""
            },
            {
              "label": "基础组件",
              "text": ""
            },
            {
              "label": "基础规范",
              "text": ""
            }
          ]
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 06",
              "title": "组件库总览",
              "instruction": "要放：组件库总览",
              "caption": "组件库总览"
            }
          ]
        },
        {
          "kind": "paragraph",
          "text": "结果：【待填：覆盖几条业务线或多少页面】"
        }
      ]
    },
    {
      "id": "qixin-06",
      "label": "结果与反思",
      "title": "和 Qsight 打通",
      "blocks": [
        {
          "kind": "flow",
          "rows": [
            {
              "steps": [
                "企业分组",
                "权限绑定",
                "AI 报告关联企业",
                "报告大纲",
                "章节生成"
              ]
            }
          ]
        },
        {
          "kind": "paragraph",
          "text": "企业分组已经和 AI 报告平台 Qsight 打通了，用户在这里维护的企业名单，能直接拿去当报告的企业范围。我还参与过产业结构总览、目标企业筛选、企业画像、跟进管理、监测与报告输出这些模块。"
        },
        {
          "kind": "paragraph",
          "text": "做了几年下来，最难的不是把页面设计出来，而是从用户怎么说、怎么做里，理解他们没有直接说出的需要。"
        },
        {
          "kind": "subsection",
          "title": "如果重来",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "【待填】"
            }
          ]
        }
      ]
    }
  ],
  "ui": {
    "back": "← 返回首页",
    "next": "下一个案例",
    "nextTitle": "我只说想法，AI 负责把书签分好 →",
    "previous": "← 上一个案例",
    "previousTitle": "让研究员敢把报告交给 AI 写",
    "toc": "案例目录",
    "judgment": "我的判断",
    "result": "结果",
    "footer": "合合信息 · 启信产业大脑 · 2021 — 2026"
  }
};
