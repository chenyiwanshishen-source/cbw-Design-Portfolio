import type { CaseContent } from '../types';

// 文案来源：docs/redesign-2026-11/CASE_TASK_QSIGHT.md。
export const qsight: CaseContent = {
  "header": {
    "label": "合合信息 · AI 报告平台 QSIGHT · 2025.04 — 2026.05",
    "title": "让研究员敢把报告交给 AI 写",
    "intro": "Qsight 是合合信息内部孵化的 AI 报告平台，面向企业、产业和地区监测场景，把企业数据、外部资料和客户的私有数据整合成分析报告。我负责核心交互方案和 Prompt 的基础框架，从前期访谈一直跟到 1.0 上线。",
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
        "label": "范围",
        "text": "1 家试点客户 · 4 位业务人员"
      },
      {
        "label": "方法",
        "text": "用户访谈 ×3 · 竞品对比 · 用户旅程 · 低保真原型讨论 · 上线验收"
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
    "caption": "报告生成：左侧是执行过程，右侧逐段成文。"
  },
  "summary": [
    {
      "label": "问题",
      "text": "研究员写一份报告，大半天花在找资料上。他们也不敢让 AI 直接写全文，怕结构跑偏，数字查不到出处。"
    },
    {
      "label": "方案",
      "text": "把大纲和数据范围的确认放到生成之前；正文每一段绑定来源；检索、重试和数据缺失在生成过程中直接显示给用户。"
    },
    {
      "label": "结果（试点客户）",
      "text": "全流程交付 2~3 天 → 约 20 分钟；关键事实可溯源 约 50% → 80%"
    }
  ],
  "toc": [
    {
      "id": "qsight-01",
      "label": "01 · 挑战"
    },
    {
      "id": "qsight-02",
      "label": "02 · 定义问题"
    },
    {
      "id": "qsight-03",
      "label": "03 · 早期方案与迭代"
    },
    {
      "id": "qsight-04",
      "label": "04 · 挑战与取舍"
    },
    {
      "id": "qsight-05",
      "label": "05 · 最终方案"
    },
    {
      "id": "qsight-06",
      "label": "06 · 结果"
    },
    {
      "id": "qsight-07",
      "label": "07 · 下一步与反思"
    }
  ],
  "chapters": [],
  "ui": {
    "back": "← 返回首页",
    "next": "下一个案例",
    "nextTitle": "让招商人员自己搭本地产业链 →",
    "toc": "案例目录",
    "judgment": "我的判断",
    "result": "结果",
    "footer": "合合信息 · AI 报告平台 QSIGHT · 2025.04 — 2026.05"
  }
};
