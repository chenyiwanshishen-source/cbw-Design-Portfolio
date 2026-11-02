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
  "chapters": [],
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
