import type { CaseContent } from '../types';

export const qixin: CaseContent = {
  "header": {
    "title": "启信产业大脑",
    "intro": "启信产业大脑是给政府招商、产业分析和区域经济管理用的企业数据平台。我从 2021 年起担任主要设计师，负责主要的功能迭代优化，并与两位设计师从零搭建组件库。",
    "introEmphasis": ["主要设计师", "主要的功能迭代优化", "从零搭建组件库"],
    "factsStyle": "pills",
    "facts": [
      { "label": "角色", "text": "产品设计师", "tags": ["产品设计师"] },
      { "label": "项目周期", "text": "2021–2026", "tags": ["2021–2026"] },
      { "label": "设计范围", "text": "交互与界面、组件库", "tags": ["交互与界面", "组件库"] },
      { "label": "类型", "text": "B 端 · 企业数据平台", "tags": ["B 端", "企业数据平台"] },
      { "label": "工具", "text": "Figma / FigJam · Codex", "tools": [{ "name": "Figma / FigJam", "icon": "figma" }, { "name": "Codex", "icon": "codex" }] }
    ]
  },
  "hero": {
    "plate": "PLATE 01",
    "title": "当前首页（脱敏）",
    "instruction": "要放：当前首页（脱敏）",
    "caption": "当前首页（脱敏）",
    "ratio": "16 / 7"
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
      "label": "组件库"
    },
    {
      "id": "qixin-06",
      "label": "想法"
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
          "title": "思考",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "与其让用户对我们的误解继续加深，我想重新分配这些复杂任务：把原本靠内部人员处理的配置交给系统，让用户自己操作。希望这样既能增加他们对我们的信任，也能让他们参与到产业链的调整中。"
            },
            {
              "kind": "chain-responsibility"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "设计方案",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "我先调整了自定义产业链的入口，用页签切换自定义产业链和标准产业链，左侧保留分组，方便查找。考虑到用户自己建的产业链不会太多，我把列表改成卡片，让每条产业链更大、更聚焦，把名称、图标和创建人放在一起；同时把“添加产业链”放在卡片区，让新增入口更明确。",
              "highlightPhrases": ["用页签切换", "把列表改成卡片", "更大、更聚焦", "新增入口更明确"]
            },
            { "kind": "heading", "text": "调整入口" },
            { "kind": "chain-entry-comparison" },
            {
              "kind": "figures",
              "figures": [
                { "plate": "CHAIN CREATE 01", "title": "选择标准产业环节", "instruction": "", "caption": "", "src": "images/qixin/chain-create-select.webp", "alt": "新建产业链：从标准产业链中勾选环节，右侧查看已选内容", "width": 760, "height": 754, "framed": true },
                { "plate": "CHAIN CREATE 02", "title": "搜索与创建产业环节", "instruction": "", "caption": "", "src": "images/qixin/chain-create-empty.webp", "alt": "新建产业链：搜索没有结果时，可通过创建环节入口补充", "width": 760, "height": 754, "framed": true }
              ]
            }
          ]
        },
        { "kind": "heading", "text": "无限画布和层级管理" },
        {
          "kind": "paragraph",
          "highlightPhrases": ["大部分用户习惯用脑图或 ProcessOn 制图", "沿用他们熟悉的节点图方式，让他们按实际业务编排产业链"],
          "text": "调研中，大部分用户习惯用脑图或 ProcessOn 制图，所以我沿用他们熟悉的节点图方式，让他们按实际业务编排产业链。用户选入系统已有的产业环节后，可以自己编辑环节、管理企业，也能按需要调整层级。我希望让用户有更多自由，亲手搭出符合自己要求的产业链，增加参与感和成就感。"
        },
        {
          "kind": "report-edit-carousel",
          "imageFolder": "qixin",
          "label": "产业链编辑",
          "caption": "增加环节自定义编辑",
          "slides": [
            { "file": "chain-editor-1.webp", "alt": "产业链图谱中打开环节菜单，添加同级或下级环节、重命名和设置权限" },
            { "file": "chain-editor-2.webp", "alt": "在产业环节中添加企业，可选择上传添加或搜索添加" }
          ]
        },
        { "kind": "chain-hierarchy" },
        { "kind": "heading", "text": "企业管理" },
        {
          "kind": "paragraph",
          "text": "用户上传企业后，可以直接查看对应的企业内容和实时舆情，持续了解这些企业的变化。让上传的名单有内容可看、有动态可跟进，也是希望增加用户对平台的信任。",
          "highlightPhrases": ["查看对应的企业内容和实时舆情"]
        },
        {
          "kind": "report-edit-carousel",
          "imageFolder": "qixin",
          "label": "企业管理",
          "slides": [
            { "file": "chain-company-management.webp", "alt": "查看产业链企业资讯，按发布时间、舆情倾向和分类筛选动态" },
            { "file": "chain-company-details.webp", "alt": "查看企业详情，包括基本信息、融资信息和舆情动态" }
          ]
        },
        { "kind": "heading", "text": "设计结果", "prominent": true },
        { "kind": "chain-outcome" },
        {
          "kind": "paragraph",
          "text": "用户现在可以自己调整和维护产业链，不用每次都等我们配置，研究产业政策、查看产业舆情也更方便了。"
        }
      ]
    },
    {
      "id": "qixin-04",
      "label": "首页工作台",
      "title": "首页工作台",
      "blocks": [
        { "kind": "heading", "text": "问题", "prominent": true },
        {
          "kind": "paragraph",
          "text": "几次用户反馈中，大家都提到：需要的预警信息藏在内页，每次查找都要来回翻；功能入口也比较分散，一些重要信息容易漏掉。",
          "highlightPhrases": ["预警信息藏在内页", "功能入口也比较分散", "重要信息容易漏掉"]
        },
        { "kind": "heading", "text": "我的对策", "prominent": true },
        {
          "kind": "paragraph",
          "text": "我想让首页同时照顾两类用户：给资深用户自定义常用功能的空间，按自己的工作习惯安排入口；给新用户呈现常见业务场景里的重要资讯和预警，减少查找和遗漏。为此，我把报告入口、快讯、融资、舆情和地区概览集中到首页，让用户进入系统就能看到需要关注的内容。",
          "highlightPhrases": ["资深用户", "新用户", "自定义常用功能", "重要资讯和预警", "集中到首页"]
        },
        { "kind": "workbench-panels" },
        { "kind": "workbench-functions" },
        { "kind": "workbench-details" },
        { "kind": "heading", "text": "用户反馈", "prominent": true },
        {
          "kind": "feedback-cards",
          "items": [
            { "title": "常用功能自己选，很实用", "text": "首页能自己选常用功能，用起来方便多了。" },
            { "title": "图表看着很清楚", "text": "这些图表做得挺清楚的。" },
            { "title": "每天打开先看舆情", "text": "我每天打开工作台，第一件事就是看舆情。" },
            { "title": "监控数据也能自己选就好了", "text": "希望数据维度也能自定义，把想看的几种监控数据放到首页。" }
          ]
        }
      ]
    },
    {
      "id": "qixin-05",
      "label": "组件库",
      "title": "组件库",
      "blocks": [
        { "kind": "qixin-system-overview" },
        {
          "kind": "component-slots"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "COMPONENTS 01",
              "title": "园区招商列表视图",
              "instruction": "",
              "caption": "",
              "src": "images/qixin/components-park-list.webp",
              "alt": "组件库应用：园区招商列表视图",
              "width": 1440,
              "height": 900,
              "framed": true,
              "overlay": {
                "src": "images/qixin/components-list-overlay.webp",
                "alt": "移动端园区招商列表",
                "width": 375,
                "height": 812
              }
            }
          ]
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "COMPONENTS 02",
              "title": "园区地图详情局部",
              "instruction": "",
              "caption": "",
              "src": "images/qixin/components-map-detail.webp",
              "alt": "园区详情中的产业结构、指标和地图局部放大",
              "width": 1440,
              "height": 900,
              "framed": true
            },
            {
              "plate": "COMPONENTS 03",
              "title": "移动端园区招商",
              "instruction": "",
              "caption": "",
              "src": "images/qixin/components-park-mobile.webp",
              "alt": "移动端园区招商列表",
              "width": 375,
              "height": 812,
              "framed": true
            }
          ]
        },
        {
          "kind": "report-edit-carousel",
          "imageFolder": "qixin",
          "label": "关系触达",
          "slides": [
            {
              "file": "components-relation-1.webp",
              "alt": "关系触达：找关系界面"
            },
            {
              "file": "components-relation-2.webp",
              "alt": "关系触达：找关系设置界面"
            }
          ]
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "CHART 1",
              "title": "圆头分段环",
              "instruction": "",
              "caption": "",
              "src": "images/qixin/components-chart-0.webp",
              "alt": "圆头分段环",
              "width": 317,
              "height": 384
            },
            {
              "plate": "CHART 4",
              "title": "企业动态热力图",
              "instruction": "",
              "caption": "",
              "src": "images/qixin/components-chart-3.webp",
              "alt": "企业动态热力图",
              "width": 660,
              "height": 352
            },
            {
              "plate": "CHART 7",
              "title": "分段进度与面积折线",
              "instruction": "",
              "caption": "",
              "src": "images/qixin/components-chart-6.webp",
              "alt": "分段进度与面积折线",
              "width": 640,
              "height": 320
            },
            {
              "plate": "CHART 2",
              "title": "外部标注环",
              "instruction": "",
              "caption": "",
              "src": "images/qixin/components-chart-1.webp",
              "alt": "外部标注环",
              "width": 579,
              "height": 424
            },
            {
              "plate": "CHART 5",
              "title": "企业动态报告",
              "instruction": "",
              "caption": "",
              "src": "images/qixin/components-chart-4.webp",
              "alt": "企业动态报告",
              "width": 660,
              "height": 385
            },
            {
              "plate": "CHART 8",
              "title": "企业监控",
              "instruction": "",
              "caption": "",
              "src": "images/qixin/components-chart-7.webp",
              "alt": "企业监控",
              "width": 344,
              "height": 310
            },
            {
              "plate": "CHART 3",
              "title": "分段进度条",
              "instruction": "",
              "caption": "",
              "src": "images/qixin/components-chart-2.webp",
              "alt": "分段进度条",
              "width": 601,
              "height": 136
            },
            {
              "plate": "CHART 6",
              "title": "蓝绿分段柱",
              "instruction": "",
              "caption": "",
              "src": "images/qixin/components-chart-5.webp",
              "alt": "蓝绿分段柱",
              "width": 532,
              "height": 376
            },
            {
              "plate": "CHART 9",
              "title": "彩色与中性灰双横条",
              "instruction": "",
              "caption": "",
              "src": "images/qixin/components-chart-8.webp",
              "alt": "彩色与中性灰双横条",
              "width": 511,
              "height": 364
            }
          ]
        }
      ]
    },
    {
      "id": "qixin-06",
      "label": "想法",
      "title": "想法",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "从立项到我离开，这个产品经历了近五年。最大的变化，是用户从手动查数据，逐渐开始借助 AI 获取和分析信息。"
        },
        {
          "kind": "paragraph",
          "text": "这也让我重新思考数据类 SaaS 的价值：除了让查询更快、报告更容易生成，还能不能帮用户完成后续的判断和工作？对我来说，更值得探索的是，在一个具体场景里，AI 到底能帮用户解决什么问题，带来多少实际收益。",
          "highlightPhrases": ["在一个具体场景里，AI 到底能帮用户解决什么问题，带来多少实际收益"]
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
