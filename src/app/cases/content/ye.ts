import type { CaseContent } from '../types';

export const ye: CaseContent = {
  "header": {
    "title": "ye! · 浏览器整理 agent",
    "intro": "ye! 是我为整理书签和标签页做的 Chrome 插件。我负责产品与交互设计，与 Gemini、Claude、Codex 协作，直接在代码中完成界面和功能。这次没有使用 Figma，而是直接与智能体协作，探索它在设计中的能力与局限。",
    "introEmphasis": ["产品与交互设计", "没有使用 Figma", "探索它在设计中的能力与局限"],
    "factsStyle": "pills",
    "facts": [
      { "label": "角色", "text": "独立产品设计师", "tags": ["独立产品设计师"] },
      { "label": "项目周期", "text": "2026.09—至今", "tags": ["2026.09—至今"] },
      { "label": "设计范围", "text": "产品定义、交互与界面、Agent 交互", "tags": ["产品定义", "交互与界面", "Agent 交互"] },
      { "label": "类型", "text": "个人项目、Chrome 插件", "tags": ["个人项目", "Chrome 插件"] },
      { "label": "工具", "text": "Gemini、Claude、Codex", "tools": [{ "name": "Gemini", "icon": "gemini" }, { "name": "Claude", "icon": "claude" }, { "name": "Codex", "icon": "codex" }] }
    ]
  },
  "hero": {
    "plate": "PLATE 01",
    "title": "全屏工作台主界面",
    "instruction": "要放：全屏工作台主界面",
    "caption": "全屏工作台主界面",
    "ratio": "16 / 9"
  },
  "timeline": [
    "9 月 7 日 开始",
    "9 月中旬 第一次推翻",
    "9 月 26 日 第二次推翻",
    "10 月 18 日 第三次推翻",
    "6 位朋友试用"
  ],
  "opening": [],
  "toc": [
    {
      "id": "ye-01",
      "label": "概述"
    },
    {
      "id": "ye-05",
      "label": "设计流程"
    },
    {
      "id": "ye-06",
      "label": "试用与进展"
    },
    {
      "id": "ye-07",
      "label": "开发协作"
    }
  ],
  "chapters": [
    {
      "id": "ye-01",
      "label": "概述",
      "title": "概述",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "我经常开着很多浏览器窗口，书签越存越多，查找和整理都很头疼。试过一些同类产品后，仍不能很好地满足需求，我决定自己做个工具。随着项目深入，功能逐渐增加，也暴露出不少问题，促使我进行了几次重构。我也想借此从头做出一个能用的智能体产品，实践之前做 AI 报告生成时学到的内容，并总结经验。"
        },
        {
          "kind": "metrics",
          "items": [
            {
              "label": "从 0 到 1",
              "text": "6 周"
            },
            {
              "label": "代码提交",
              "text": "802 次"
            },
            {
              "label": "自动化测试",
              "text": "约 2000 个"
            },
            {
              "label": "朋友试用",
              "text": "6 位"
            }
          ],
          "note": ""
        },
        {
          "kind": "subsection",
          "title": "朋友试用后的反馈",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "参与试用的朋友主要是设计师和开发。他们提出了不少实际使用中的问题，我目前还在逐步解决。下面整理了反馈较集中的问题和优点。"
            },
            {
              "kind": "trial-feedback",
              "groups": [
                { "title": "问题", "items": [
                  { "product": "", "text": "缺少快捷键指南", "icon": "KeyboardIcon" },
                  { "product": "", "text": "Mac / Win 动效表现不一", "icon": "ComputerIcon" },
                  { "product": "", "text": "希望 AI 按收藏与习惯推荐资讯", "icon": "Bookmark01Icon" },
                  { "product": "", "text": "迁移预览标识不清", "icon": "ArrowDataTransferHorizontalIcon" },
                  { "product": "", "text": "希望支持非 AI 搜索定位", "icon": "Search01Icon" },
                  { "product": "", "text": "希望支持收藏阅读、星标和划线", "icon": "Bookmark01Icon" }
                ] },
                { "title": "优点", "items": [
                  { "product": "", "text": "交互容易理解，操作顺手", "icon": "UserGroupIcon" },
                  { "product": "", "text": "操作后能及时看到反馈", "icon": "Clock01Icon" },
                  { "product": "", "text": "页面清爽，信息不杂乱", "icon": "DashboardSquare01Icon" },
                  { "product": "", "text": "信息层级清楚，主次分明", "icon": "Layers01Icon" },
                  { "product": "", "text": "功能引导清晰，知道从哪里开始", "icon": "CheckListIcon" }
                ] }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ye-05",
      "label": "设计流程",
      "title": "设计流程",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "从第一版 MVP 到现在实际使用，我经历了三次重构。随着项目深入，原有架构逐渐暴露出问题，每次重构基本都是推翻重建，也让我逐步明确了模型、工具和用户各自的职责。"
        },
        {
          "kind": "columns",
          "items": [
            { "label": "竞品用户评论", "text": "收藏、整理与找回内容中的问题" },
            { "label": "ye! 的设计回应", "text": "自然语言整理、方案预览与撤销" }
          ]
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 02",
              "title": "分组预览",
              "instruction": "要放：分组预览",
              "caption": "分组预览"
            }
          ]
        },
        {
          "kind": "columns",
          "items": [
            {
              "label": "先看预览",
              "text": "方案按窗口摆出来，每个页签从哪来、到哪去都看得到"
            },
            {
              "label": "点了确认才改",
              "text": "整理方案需要我确认后，才会修改书签或页签"
            },
            {
              "label": "能撤回",
              "text": "支持撤销最近 5 步操作，并保护固定页签不被移动"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "状态设计",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "ye! 不内置模型服务，而是提供 AI 运行所需的环境，用户需要填入自己的大模型 API Key。因此，我设计了模型状态提示，让用户清楚当前模型是否可用、问题出在哪里。",
              "highlightPhrases": ["用户需要填入自己的大模型 API Key", "当前模型是否可用、问题出在哪里"]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "关于对话",
          "blocks": [{ "kind": "paragraph", "text": "为了避免重要信息淹没在长篇回复里，我根据内容提供了不同的结果展示方式，让用户更容易找到结论和后续操作。" }]
        }
      ]
    },
    {
      "id": "ye-02",
      "label": "意图理解",
      "title": "关于协作",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "最初，我没有把产品的功能流转想清楚，就让 Gemini 按大致想法搭建第一版。需求模糊，最终做出来的是一套靠路由判断执行的工作流，里面写了很多正则规则和硬约束。\n分析问题后，我决定重构第二版，让 Codex 和 Gemini 一起完成。但这次改得不彻底，只是在原有的条件判断外加了一层意图识别，仍没有达到我想要的效果。实际协作中，我发现它们能很好地完成一些具体任务，但在判断方案时，上下文不完整，或某个问题没沟通清楚，都可能让方向发生偏移。\n第二版开发期间，我开始让 Claude 帮忙分析技术问题，发现它能把不少问题拆解得更清楚。因此，第三版我重新调整了分工：Claude 负责产品和技术方案、任务拆解，以及测试文档的编写；Codex 负责代码修改和架构重建；Gemini 负责全量测试和项目文档更新。"

        }
      ]
    },
    {
      "id": "ye-03",
      "label": "排查与回退",
      "title": "日志管理",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "只看回复，很难知道任务错在哪一步。我用日志记录 AI 收到了什么、调用了哪些工具、返回了什么，方便排查理解和执行中的问题。发现的问题会让 AI 整理成测试集，每次修改后做回归测试，确认问题已修复，也没有影响原本正常的功能。",
          "highlightPhrases": ["日志记录 AI 收到了什么、调用了哪些工具、返回了什么", "让 AI 整理成测试集，每次修改后做回归测试"]
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 03",
              "title": "运行日志导出示例（打码）",
              "instruction": "要放：运行日志导出示例（打码）",
              "caption": "",
              "src": "images/ye/log-management.webp",
              "alt": "日志管理文件夹中保存的对话运行日志",
              "width": 1166,
              "height": 748,
              "framed": true
            }
          ]
        }
      ]
    },
    {
      "id": "ye-04",
      "label": "工具调用",
      "title": "关于功能",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "读取书签、查看网页、追问和整理操作都做成工具，让 AI 根据用户的要求选择调用。插件负责提供真实数据、检查操作，并在用户确认方案后执行，同时支持撤销和保护固定页签。"
        },
        {
          "kind": "statement",
          "text": "插件是沙箱，工具是手脚，AI 是大脑。"
        },
        {
          "kind": "layers",
          "items": [
            {
              "label": "AI",
              "text": "理解我的想法，决定怎么分，选用工具"
            },
            {
              "label": "工具",
              "text": "读书签、读网页、反问、生成分组预览、移动页签"
            },
            {
              "label": "插件",
              "text": "保存真实数据、检查操作是否有效、改动前请我确认、撤销、保护固定页签"
            }
          ]
        }
      ]
    },
    {
      "id": "ye-06",
      "label": "试用与进展",
      "title": "模型适配与朋友试用",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "试用者使用的模型各不相同，包括 DeepSeek、Kimi、GLM、Claude 和 OpenAI，也往往不清楚模型单次能处理多少内容。插件会读取相关限制，并据此分批处理，避免让用户手动填写。"
        },
        {
          "kind": "paragraph",
          "text": "修复问题时，我要求检查其他用户的使用情况，不能只以自己的测试通过为准。6 位朋友试下来，说得最多的两点是：分类准确，交互友好。"
        }
      ]
    },
    {
      "id": "ye-07",
      "label": "开发协作",
      "title": "与 AI 的开发分工",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "开发中，我负责产品方向和最终决策，交给 AI 的提示词也由我逐句审核。三个 AI 分工协作：Claude 审查方案、拆分任务，Codex 编写代码和测试，Gemini 运行全量测试和构建，并记录进度。"
        },
        {
          "kind": "paragraph",
          "text": "协作文件明确了两项要求，并用测试检查：不编写用于判断用户意图的规则代码；交给 AI 的提示词必须由我逐字确认。"
        },
        {
          "kind": "subsection",
          "title": "如果重来",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "如果重来，我第一天就会让 AI 直接听用户说话、自己挑工具，不先搭流程；也会第一天就把\"不写规则代码\"写进协作文件，把日志导出做好。这样前两次推翻大概都能省掉。"
            }
          ]
        }
      ]
    }
  ],
  "ui": {
    "back": "← 返回首页",
    "next": "下一个案例",
    "nextTitle": "AI 探索 →",
    "previous": "← 上一个案例",
    "previousTitle": "启信产业大脑",
    "toc": "案例目录",
    "judgment": "我的判断",
    "result": "结果",
    "footer": "ye!"
  }
};
