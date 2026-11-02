import type { CaseContent } from '../types';

// 文案逐字来自 CASE_TASK_QIXIN.md；未提供独立图注时复用图位名称。
export const qixin: CaseContent & {
  summary: { label: string; text: string }[];
  timeline: string[];
  ui: CaseContent['ui'] & { previous: string; previousTitle: string; timeline: string };
} = {
  "header": {
    "label": "合合信息 · 启信产业大脑 · 2021 — 2026",
    "title": "把企业数据查询工具，做成招商人员的工作台",
    "intro": "启信产业大脑是面向政府招商、产业分析和区域经济管理的企业数据平台。我从 2021 年起作为主要设计师持续参与，主导了首页改版和自定义产业链，并协同两位设计师从 0 到 1 建设了组件库。",
    "facts": [
      {
        "label": "角色",
        "text": "主要设计师"
      },
      {
        "label": "我负责",
        "text": "首页改版 · 自定义产业链 · 核心模块 · 组件库"
      },
      {
        "label": "团队",
        "text": "【待填：产品 / 研发 / 设计人数】"
      },
      {
        "label": "状态",
        "text": "已上线，持续迭代"
      }
    ]
  },
  "hero": {
    "plate": "PLATE 01",
    "title": "当前首页（脱敏）",
    "instruction": "要放：当前首页（脱敏）",
    "caption": "当前首页（脱敏）",
    "ratio": "16 / 9"
  },
  "summary": [
    {
      "label": "问题",
      "text": "功能越加越多，用户的工作路径被拆散；本地产业链每次都要内部配置，用户只能等。"
    },
    {
      "label": "方案",
      "text": "按任务重组首页和功能；把产业链配置交给用户；用组件库保证长期一致。"
    },
    {
      "label": "结果",
      "text": "本地产业链构建周期 1–2 周 → 2–3 天"
    }
  ],
  "timeline": [
    "2021 招商大脑 1.0",
    "2024 标品规范",
    "2025 平台扩展",
    "2026 自定义产业链与 AI 报告联动"
  ],
  "toc": [
    {
      "id": "qixin-01",
      "label": "01 · 挑战"
    },
    {
      "id": "qixin-02",
      "label": "02 · 定义问题"
    },
    {
      "id": "qixin-03",
      "label": "03 · 产业链配置"
    },
    {
      "id": "qixin-04",
      "label": "04 · 首页工作台"
    },
    {
      "id": "qixin-05",
      "label": "05 · 设计系统"
    },
    {
      "id": "qixin-06",
      "label": "06 · 结果与反思"
    }
  ],
  "chapters": [
    {
      "id": "qixin-01",
      "label": "01 · 挑战",
      "title": "功能越加越多，用户的工作路径反而被拆散了",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "数据与功能分散，用户很难连续完成定位范围、筛选目标、判断价值、跟进管理和输出结果。问题不在缺少某个功能，而在工作路径被拆散。"
        }
      ]
    },
    {
      "id": "qixin-02",
      "label": "02 · 定义问题",
      "title": "五类用户，走的是同一条任务路径",
      "blocks": [
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
          "text": "五类场景共享同一条路径：定位范围 → 筛选目标 → 判断价值 → 持续管理 → 输出结果。我以招商为主场景画了体验地图。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 02",
              "title": "招商场景体验地图（五阶段：明确方向、发现企业、判断价值、沉淀名单、跟进输出）",
              "instruction": "要放：招商场景体验地图（五阶段：明确方向、发现企业、判断价值、沉淀名单、跟进输出）",
              "caption": "招商场景体验地图（五阶段：明确方向、发现企业、判断价值、沉淀名单、跟进输出）"
            }
          ]
        }
      ]
    },
    {
      "id": "qixin-03",
      "label": "03 · 产业链配置",
      "title": "把产业链配置，从内部交付改成用户自己维护",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "每个地区对产业链怎么划分、哪些企业算本地特色，理解都不一样。以前用户提需求后，要等我们梳理结构、开发配置，改一次再等一轮。我判断标准环节可以复用，差异只在本地口径，所以把配置能力做成产品：标准环节直接选用，没有的环节自己新建，节点关系和企业名单由用户维护。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 03",
              "title": "改版前后流程对比",
              "instruction": "要放：改版前后流程对比",
              "caption": "改版前后流程对比"
            }
          ]
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 04",
              "title": "产业链图谱编辑态",
              "instruction": "要放：产业链图谱编辑态",
              "caption": "产业链图谱编辑态"
            }
          ]
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 05",
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
    }
  ],
  "ui": {
    "back": "← 返回首页",
    "next": "下一个案例",
    "nextTitle": "AI 探索 →",
    "previous": "← 上一个案例",
    "previousTitle": "让研究员敢把报告交给 AI 写",
    "toc": "案例目录",
    "timeline": "时间轴",
    "judgment": "我的判断",
    "result": "结果",
    "footer": "合合信息 · 启信产业大脑 · 2021 — 2026"
  }
};
