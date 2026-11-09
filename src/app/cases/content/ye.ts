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
      "label": "设计思路"
    },
    {
      "id": "ye-02",
      "label": "意图理解"
    },
    {
      "id": "ye-03",
      "label": "排查与回退"
    },
    {
      "id": "ye-04",
      "label": "工具调用"
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
      "label": "设计思路",
      "title": "设计思路",
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
          "text": "第一个版本是 Gemini 按照我的大致想法搭建的，但它用一堆正则和四个写死的分类来猜我想干什么，结果换个说法它就听不懂。有一次我说\"帮我整理一下开着的网站\"，规则里只有\"页面、页签、标签页\"，没有\"网站\"："
        },
        {
          "kind": "flow",
          "rows": [
            {
              "steps": [
                "我说\"帮我整理一下开着的网站\"",
                "规则只认\"开着的页面、页签、标签页\"",
                "没有匹配上",
                "后台读了 81 个书签，弹出一份书签方案"
              ],
              "highlight": [
                3
              ]
            }
          ]
        },
        {
          "kind": "paragraph",
          "text": "当时每次请求都会发送完整的书签树，也没有缓存，调用成本难以控制。后来我删除了这些分类规则，改由 AI 判断用户意图，只提供当前步骤需要的信息，并补上缓存。"
        }
      ]
    },
    {
      "id": "ye-03",
      "label": "排查与回退",
      "title": "回退版本并补齐日志",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "删除规则后，AI 在后续开发中又加入了多层条件判断和状态锁。任务开始互相阻塞，整理书签的请求有时会被当成整理页签。那个分支已经改了 5400 行左右，我判断继续修补的成本高于重做。"
        },
        {
          "kind": "paragraph",
          "text": "我放弃了这个分支，回到上一个稳定版本，只迁回已经验证的部分。同一天，我加入了日志导出，记录 AI 接收的内容、返回结果和工具调用。之后遇到问题，我先查日志，再判断需要修改哪一环。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 03",
              "title": "运行日志导出示例（打码）",
              "instruction": "要放：运行日志导出示例（打码）",
              "caption": "运行日志导出示例（打码）"
            }
          ]
        }
      ]
    },
    {
      "id": "ye-04",
      "label": "工具调用",
      "title": "由单个 AI 调用工具",
      "blocks": [
        {
          "kind": "flow",
          "rows": [
            {
              "label": "改前",
              "steps": [
                "我说的话",
                "AI 翻译成意图",
                "插件选一条预设流程",
                "下一个 AI 按步骤执行"
              ]
            },
            {
              "label": "改后",
              "steps": [
                "我说的话",
                "AI 自己读、自己问、自己选工具",
                "插件检查",
                "我确认",
                "写入"
              ],
              "highlight": [
                1
              ]
            }
          ]
        },
        {
          "kind": "paragraph",
          "text": "之前我说一句话，要先让一个 AI 翻译成\"意图\"，插件再按意图选一条流程，交给下一个 AI 一步步做。每多转一层，意思就丢一点；第一步判断错了，后面全跟着错。\n10 月 18 日，我把中间这几层都拆了。我说的话直接交给 AI，读书签、读网页、问我问题、移动页签这些都做成工具，用哪个由 AI 自己决定。插件只负责存真实数据、检查操作对不对、动手前问我一句。"
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
