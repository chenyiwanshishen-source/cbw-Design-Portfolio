import type { CaseBlock } from '../types';

type Exploration = { id: string; label: string; title: string; blocks: CaseBlock[]; status: string; url?: string };
export const explorations: { header: { title: string; intro: string }; statement: string; intro: string; chapters: Exploration[] } = {
  "header": {
    "title": "我给自己做的设计工具",
    "intro": "下面四个工具，都是我在工作里遇到具体问题后，用 AI 编程工具做出来的。产品定义、规则和验收标准由我来定，代码由 AI 协作完成。"
  },
  "statement": "能确定的交给工具，需要理解的交给 AI，最后的决定留给我。",
  "intro": "前面三个案例也是这样分工的。下面每个工具，都能看到同一个判断。",
  "chapters": [
    {
      "id": "explorations-01",
      "label": "设计系统",
      "title": "从历史设计稿里整理出设计系统，再做成能复用的代码组件",
      "blocks": [
        {
          "kind": "subsection",
          "title": "方法：Figma 设计系统工作流",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "我把搭设计系统的步骤写成了一个 Skill，让 AI 在 Figma 里按固定顺序推进。只有一个主 Agent 可以写入 Figma，其他角色只读，负责给出规格和验收。"
            },
            {
              "kind": "flow",
              "rows": [
                {
                  "steps": [
                    "六方向视觉探索",
                    "浅色和深色色板",
                    "基础变量",
                    "基础体系",
                    "真实组件族",
                    "组件库验收"
                  ]
                }
              ],
              "note": "色板阶段固定为每个模式 16 个色系 × 9 级，浅色和深色合计 288 个值。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "实践：历史设计稿 → 前端组件库",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "我先审计了一批历史 Figma 页面，整理出完整色板，再写入颜色、字体、间距、圆角、描边和栅格这些基础变量。之后把它们做成 React 组件库，用 Storybook 展示每个组件的尺寸、变体和交互状态。"
            },
            {
              "kind": "metrics",
              "items": [
                {
                  "text": "6 类",
                  "label": "基础变量"
                },
                {
                  "text": "9 个",
                  "label": "基础组件"
                },
                {
                  "text": "88 个",
                  "label": "单元测试"
                }
              ],
              "note": ""
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 01",
                  "title": "Figma 基础变量",
                  "instruction": "要放：Figma 基础变量",
                  "caption": "Figma 基础变量"
                },
                {
                  "plate": "PLATE 02",
                  "title": "Storybook 组件页",
                  "instruction": "要放：Storybook 组件页",
                  "caption": "Storybook 组件页"
                }
              ]
            }
          ]
        }
      ],
      "status": "Figma 工作流已开源（GitHub）；组件库持续维护中。",
      "url": "https://github.com/chenyiwanshishen-source/figma-design-system-workflow"
    },
    {
      "id": "explorations-02",
      "label": "Figma 连接器",
      "title": "让 AI 直接改 Figma 文件，但每次写入都能撤回",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "这是一个本地 MCP 服务加 Figma 插件。支持 MCP 的 AI 客户端可以通过它读取和修改当前打开的 Figma 文件，整条链路只在本机运行，不需要 API Key。"
        },
        {
          "kind": "flow",
          "rows": [
            {
              "steps": [
                "AI 客户端",
                "本地 MCP 服务",
                "Figma 插件在文件里执行",
                "结果回传给 AI"
              ],
              "highlight": [
                2
              ]
            }
          ]
        },
        {
          "kind": "paragraph",
          "text": "每次任务开始前，插件会先给节点拍快照，出错就自动撤回这次新建的节点。写入时优先调用设计系统里的组件、变量和样式，不硬写数值。插件面板会显示当前是在等待、读取还是写入。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 03",
              "title": "连接器面板",
              "instruction": "要放：连接器面板",
              "caption": "连接器面板"
            }
          ]
        }
      ],
      "status": "已开源（GitHub）",
      "url": "https://github.com/chenyiwanshishen-source/figma-connector-figma-"
    },
    {
      "id": "explorations-03",
      "label": "Visual Code Canvas",
      "title": "AI 写完前端以后，样式微调我在画布上直接改",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "用 AI 写前端代码很快，但改一个间距、一个颜色，还要再描述一遍、再等一轮，微调成了新的成本。Visual Code Canvas 让我在画布上选中页面元素，直接改数值，改动会写回源码。"
        },
        {
          "kind": "flow",
          "rows": [
            {
              "steps": [
                "选中页面元素",
                "找到对应源码",
                "在面板里改数值",
                "写回源码",
                "页面实时更新"
              ]
            }
          ]
        },
        {
          "kind": "paragraph",
          "text": "数值、颜色、文字这类能确定的改动，由工具直接写回，不消耗 AI token；结构调整、组件拆分这类需要理解的改动，才交给 Codex。代码始终是唯一的真实来源，画布不另存一份样式。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 04",
              "title": "画布与属性面板（可用动图）",
              "instruction": "要放：画布与属性面板（可用动图）",
              "caption": "画布与属性面板（可用动图）"
            }
          ]
        }
      ],
      "status": "v0.2.1 已发布，支持 Next.js 和 Vite React 项目（GitHub）。第一版是一个 VSCode 插件，后来重做成了现在的样子。",
      "url": "https://github.com/chenyiwanshishen-source/visual-code-canvas"
    },
    {
      "id": "explorations-04",
      "label": "插画 Skill",
      "title": "让 AI 画插画，先教它画出像真的控件",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "Micro-UI 插画 Skill 是我给 AI 写的一套矢量插画规则，用来画封面、功能插画和空状态。这个作品集的封面、ye! 的空状态图和组件库的封面，都是用它画的。"
        },
        {
          "kind": "paragraph",
          "text": "AI 直接画界面插画，常常用空白卡片和几条灰色横条凑出一个\"界面\"，看不出画的是什么工具。我把自己画插画时的判断写成了规则："
        },
        {
          "kind": "columns",
          "items": [
            {
              "label": "真实控件切片",
              "text": "主体必须是认得出的工具或控件，不靠灰色横条凑"
            },
            {
              "label": "分层构图",
              "text": "底板、中景控件、前景焦点，每一层都要服务主题"
            },
            {
              "label": "最小 16 像素",
              "text": "在实际展示尺寸下，每个色块至少 16 像素，放不下就删减"
            }
          ]
        },
        {
          "kind": "flow",
          "rows": [
            {
              "steps": [
                "画完",
                "渲染成图",
                "打开看图",
                "指出具体问题",
                "修改后再复查"
              ]
            }
          ],
          "note": "Skill 要求 AI 每次画完都走一遍这个检查，文件能导出不算通过。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 05",
              "title": "作品集封面",
              "instruction": "要放：作品集封面",
              "caption": "作品集封面"
            },
            {
              "plate": "PLATE 06",
              "title": "作品集封面",
              "instruction": "要放：作品集封面",
              "caption": "作品集封面"
            },
            {
              "plate": "PLATE 07",
              "title": "组件库封面",
              "instruction": "要放：组件库封面",
              "caption": "组件库封面"
            },
            {
              "plate": "PLATE 08",
              "title": "ye! 书签空状态",
              "instruction": "要放：ye! 书签空状态",
              "caption": "ye! 书签空状态"
            },
            {
              "plate": "PLATE 09",
              "title": "ye! 页签空状态",
              "instruction": "要放：ye! 页签空状态",
              "caption": "ye! 页签空状态"
            },
            {
              "plate": "PLATE 10",
              "title": "ye! 搜索空状态",
              "instruction": "要放：ye! 搜索空状态",
              "caption": "ye! 搜索空状态"
            }
          ]
        }
      ],
      "status": "已迭代 4 个版本，准备开源。【待填：开源后的仓库链接】"
    }
  ]
};
