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
        { "kind": "heading", "text": "问题" },
        {
          "kind": "paragraph",
          "text": "几次用户反馈中，大家都提到：需要的预警信息藏在内页，每次查找都要来回翻；功能入口也比较分散，一些重要信息容易漏掉。",
          "highlightPhrases": ["预警信息藏在内页", "功能入口也比较分散", "重要信息容易漏掉"]
        },
        { "kind": "heading", "text": "我的对策" },
        {
          "kind": "paragraph",
          "text": "我想让首页同时照顾两类用户：给资深用户自定义常用功能的空间，按自己的工作习惯安排入口；给新用户呈现常见业务场景里的重要资讯和预警，减少查找和遗漏。为此，我把报告入口、快讯、融资、舆情和地区概览集中到首页，让用户进入系统就能看到需要关注的内容。",
          "highlightPhrases": ["自定义常用功能", "重要资讯和预警", "集中到首页"]
        },
        { "kind": "workbench-panels" },
        { "kind": "workbench-functions" },
        { "kind": "workbench-details" },
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
