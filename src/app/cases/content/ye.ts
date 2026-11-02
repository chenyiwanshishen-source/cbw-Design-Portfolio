import type { CaseContent } from '../types';

// 来源：CASE_TASK_YE.md；正文与事实逐字保留。
export const ye: CaseContent & {
  summary: { label: string; text: string }[];
  ui: CaseContent['ui'] & { previous: string; previousTitle: string };
} = {
  "header": {
    "title": "我只说想法，AI 负责把书签分好",
    "intro": "ye! 是我从 0 到 1 独立做的 Chrome 插件。用户用一句话说出想怎么整理，AI 读懂书签和打开的页签后给出分组方案，用户确认后才会写入。产品和设计由我完成，开发由我和 Claude、Codex、Gemini 协作完成。"
  },
  "hero": {
    "plate": "PLATE 01",
    "title": "全屏工作台主界面",
    "instruction": "要放：全屏工作台主界面",
    "caption": "全屏工作台主界面",
    "ratio": "16 / 9"
  },
  "summary": [
    {
      "label": "问题",
      "text": "每个人存书签的习惯都不一样，规则写不完，直接让 AI 改又不放心。"
    },
    {
      "label": "方案",
      "text": "用户只说想法；AI 自己读数据、选工具、出方案；插件只存事实、做校验，写入前请用户确认。"
    },
    {
      "label": "反馈",
      "text": "4 位朋友内测，反馈集中在分类准确和交互友好。"
    }
  ],
  "toc": [
    {
      "id": "ye-01",
      "label": "01 · 挑战"
    },
    {
      "id": "ye-02",
      "label": "02 · 定义问题"
    },
    {
      "id": "ye-03",
      "label": "03 · 早期方案"
    },
    {
      "id": "ye-04",
      "label": "04 · 挑战与取舍"
    },
    {
      "id": "ye-05",
      "label": "05 · 最终方案"
    },
    {
      "id": "ye-06",
      "label": "06 · 我怎么做出来的"
    },
    {
      "id": "ye-07",
      "label": "07 · 结果与反思"
    }
  ],
  "chapters": [],
  "ui": {
    "back": "← 返回首页",
    "next": "下一个案例",
    "nextTitle": "AI 探索 →",
    "previous": "← 上一个案例",
    "previousTitle": "把企业数据查询工具，做成招商人员的工作台",
    "toc": "案例目录",
    "judgment": "我的判断",
    "result": "结果",
    "footer": "ye!"
  }
};
