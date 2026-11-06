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
          "text": "用户选入系统已有的产业环节后，可以自己编辑环节、管理企业，也能按需要调整层级。我希望让用户有更多自由，亲手搭出符合自己要求的产业链，增加参与感和成就感。"
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
          "text": "对于需要自定义产业链的用户，这一版是成功的。用户能自己调整和维护产业链，更有掌控感；研究产业政策、了解产业舆情也更方便了。"
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
      "label": "设计系统",
      "title": "组件库",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "孵化期为了尽快上线，产业大脑沿用了启信宝的设计规范和组件，但前端实现不太规范，部分地方直接写了固定数值；产品定位分开后，我和两位设计师先梳理已上线页面，再从变量开始搭建五层组件库，最后覆盖整个系统。"
        },
        {
          "kind": "figures",
          "figures": [
            { "plate": "COMPONENTS 01", "title": "园区招商列表视图", "instruction": "", "caption": "", "src": "images/qixin/components-park-list.webp", "alt": "组件库应用：园区招商列表视图", "width": 1440, "height": 900, "framed": true }
          ]
        },
        {
          "kind": "figures",
          "figures": [
            { "plate": "COMPONENTS 02", "title": "园区地图详情局部", "instruction": "", "caption": "", "src": "images/qixin/components-map-detail.webp", "alt": "园区详情中的产业结构、指标和地图局部放大", "width": 1440, "height": 900, "framed": true },
            { "plate": "COMPONENTS 03", "title": "关系目标选择局部", "instruction": "", "caption": "", "src": "images/qixin/components-panel-detail.webp", "alt": "关系目标搜索、企业与人员选择的局部放大", "width": 396, "height": 808, "framed": true }
          ]
        },
        {
          "kind": "layers",
          "items": [
            {
              "label": "页面模板",
              "text": "列表页、详情页、配置页和报表页的页面骨架"
            },
            {
              "label": "业务组件",
              "text": "企业列表、风险标签、产业分布和招商进度"
            },
            {
              "label": "复合组件",
              "text": "筛选区、工具栏、表格和弹窗，由基础组件组合"
            },
            {
              "label": "基础组件",
              "text": "按钮、输入框、下拉菜单等基础控件"
            },
            {
              "label": "基础规范",
              "text": "颜色、字号、间距、圆角和交互状态"
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
          "text": "原计划按季度推进，实际难度比较大，改成了按年度推进。结果：设计稿基本做到了全覆盖，2025 年设计这边仍在继续推进。前端第一年的组件覆盖率是 40%，2024 年到 60%，2025 年又推进了一个季度，之后因故停了，进度停在 70%。"
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
