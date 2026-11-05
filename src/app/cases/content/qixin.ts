import type { CaseContent } from '../types';

export const qixin: CaseContent = {
  "header": {
    "title": "启信产业大脑",
    "intro": "启信产业大脑是给政府招商、产业分析和区域经济管理用的企业数据平台。"
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
      "kind": "columns",
      "items": [
        {
          "label": "我的角色",
          "text": "2021 年起的主要设计师"
        },
        {
          "label": "时间",
          "text": "2021–2026"
        },
        {
          "label": "我负责的",
          "text": "自定义产业链、首页工作台；与两位设计师从零搭建组件库"
        },
        {
          "label": "结果",
          "text": "本地产业链构建周期从 1–2 周缩短到 2–3 天"
        }
      ]
    }
  ],
  "toc": [
    {
      "id": "qixin-00",
      "label": "产品概述"
    },
    {
      "id": "qixin-01",
      "label": "挑战"
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
      "id": "qixin-00",
      "label": "产品概述",
      "title": "产品概述",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "启信产业大脑围绕企业与产业完成查询、研判、管理和输出。"
        },
        {
          "kind": "product-map"
        }
      ]
    },
    {
      "id": "qixin-01",
      "label": "挑战",
      "title": "问题和挑战",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "产业大脑多年迭代，功能越来越多，使用中的问题也逐渐积累。我们从中发现问题，再通过设计逐步解决。"
        },
        {
          "kind": "trial-feedback",
          "groups": [
            {
              "title": "问题",
              "items": [
                {
                  "product": "",
                  "text": "功能和操作入口分散",
                  "icon": "Unlink01Icon"
                },
                {
                  "product": "",
                  "text": "与用户沟通的成本增加",
                  "icon": "BubbleChatDelayIcon"
                },
                {
                  "product": "",
                  "text": "视觉样式不统一",
                  "icon": "PaintBoardIcon"
                }
              ]
            },
            {
              "title": "解决方案",
              "items": [
                {
                  "product": "",
                  "text": "首页工作台：集中常用功能和任务入口",
                  "icon": "DashboardSquare01Icon"
                },
                {
                  "product": "",
                  "text": "自定义产业链：让用户自行维护产业链",
                  "icon": "HierarchySquare01Icon"
                },
                {
                  "product": "",
                  "text": "组件库：统一视觉样式和组件",
                  "icon": "Layers01Icon"
                }
              ]
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
          "text": "各地对产业链的划分和本地特色企业的认定不同。过去用户提出需求后，需要等我们梳理结构、完成开发配置；后续调整也要重复这个过程。"
        },
        {
          "kind": "subsection",
          "title": "功能服务地图",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "发现这些问题后，我先画了一张简单的服务地图，把用户、业务和开发之间的交接梳理出来，再顺着流程一步步推演解决方案。"
            },
            {
              "kind": "chain-stage-framework"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "梳理问题",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "同一次配置，用户在等结果，业务要反复确认口径，开发要把要求落实到数据和关系上。把几方的问题放在一起看，才能找出哪里在重复沟通、哪些配置可以交给用户自己做。"
            },
            {
              "kind": "chain-discussion"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "和用户沟通",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "我和两位用户了解了产业链配置与企业名单维护中的困难。"
            },
            {
              "kind": "chain-user-research"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "选中节点后再展开操作",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "图谱默认展示产业关系，选中节点后才出现上传、删除和关系调整等操作。编辑时高亮当前节点、父子层级和关联企业，弱化无关分支，让用户集中处理正在修改的关系。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 03",
                  "title": "产业链图谱编辑态",
                  "instruction": "要放：产业链图谱编辑态",
                  "caption": "产业链图谱编辑态"
                }
              ]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "查看并维护节点下的企业",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "企业池展示当前节点下的企业列表与数量，支持按地区、行业、标签和名称筛选，并允许增删企业。用户可以直接检查分析范围，再按本地口径维护名单。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 04",
                  "title": "企业池",
                  "instruction": "要放：企业池",
                  "caption": "企业池"
                }
              ]
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
      "title": "首页工作台",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "为了让用户进入系统后直接处理当天的工作，我把首页改成任务看板：报告入口提供企业报告、产业报告和最近报告；动态信息呈现快讯、融资和舆情；业务概览集中地区、产业与预警信息；常用功能保留高频查询和筛选入口。"
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
          "text": "孵化期为了尽快上线，产业大脑沿用了启信宝的设计规范。随着产品定位分开，我和两位设计师先梳理已上线页面，再搭建五层组件库。\n基础控件统一默认、悬浮、聚焦和禁用状态；筛选区、工具栏、表格和弹窗由基础组件组合；企业列表、风险标签等业务组件再组成页面模板，供新增页面复用。"
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
      "title": "报告联动与项目反思",
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
          "text": "启信产业大脑的企业分组已接入 Qsight，用户维护的企业名单可以直接作为报告的企业范围。\n此外，我还参与了产业结构总览、目标企业筛选、企业画像、跟进管理、监测与报告输出模块的设计。"
        },
        {
          "kind": "paragraph",
          "text": "自定义产业链这次改动，让我更关注用户能否自行维护业务内容。各地口径不同，平台需要提供可复用的标准环节，也要给本地调整留出空间。"
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
    "nextTitle": "ye! · 浏览器整理 agent →",
    "previous": "← 上一个案例",
    "previousTitle": "Qsight · AI 报告平台",
    "toc": "案例目录",
    "judgment": "我的判断",
    "result": "结果",
    "footer": "合合信息 · 启信产业大脑 · 2021 — 2026"
  }
};
