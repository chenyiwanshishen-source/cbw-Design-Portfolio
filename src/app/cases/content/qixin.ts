import type { CaseContent } from '../types';

export const qixin: CaseContent = {
  "header": {
    "title": "把企业数据查询工具，做成招商人员的工作台",
    "intro": "启信产业大脑是给政府招商、产业分析和区域经济管理用的企业数据平台。从 2021 年起我一直是它的主要设计师，主导了首页改版和自定义产业链，也和两位设计师一起从 0 到 1 搭了组件库。"
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
      "title": "分散的工作流程",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "产业大脑做了几年，功能一直在增加，但数据和功能分散在不同地方。用户从定位范围到输出结果，很难连续完成整项工作。"
        }
      ]
    },
    {
      "id": "qixin-02",
      "label": "定义问题",
      "title": "五类用户的共同流程",
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
          "text": "我以招商为主场景，画了一张体验地图。"
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
      "title": "用户自定义产业链",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "每个地区对产业链怎么划分、哪些企业算本地特色，理解都不一样。以前用户提了需求，要等我们梳理结构、开发配置，改一次再等一轮。"
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
          "text": "标准环节其实可以复用，差别只在本地的划分方式。所以我把配置做成了产品功能，节点关系和企业名单都由用户自己维护。"
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
      "title": "首页任务看板",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "用户进系统后要处理当天的工作。我把首页改成任务看板，分成报告入口、动态信息、业务概览和常用功能四块，不同角色可以直接开始查询、判断和跟进，不必先去菜单里找功能。"
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
      "title": "产业大脑的独立规范",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "孵化期沿用启信宝的规范，为的是快速上线。后来两个产品定位分开，产业大脑需要自己的识别度。我和两位设计师从盘点已上线的页面开始，搭了一套五层的组件库。"
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
      "title": "企业名单与报告联动",
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
          "text": "企业分组已经和 AI 报告平台 Qsight 打通，用户维护的企业名单可以直接作为报告的企业范围。我还参与了产业结构总览、目标企业筛选、企业画像、跟进管理、监测与报告输出这些模块。"
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
