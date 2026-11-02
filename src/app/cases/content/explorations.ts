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
      "label": "Figma 连接器",
      "title": "先让 AI 能读写 Figma，后面的整理才接得上",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "我想让 AI 帮我整理历史设计稿，前提是它能读到、也能改 Figma 文件。所以我做了一个本地 MCP 服务加 Figma 插件：AI 发出任务，插件在当前打开的文件里执行，再把结果传回去。整条链路只在本机运行，不需要 API Key。"
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
          "text": "让 AI 直接改设计稿，最怕改坏。所以每次任务开始前，插件会先给节点拍快照，出错就自动撤回这次新建的节点；面板上会显示它正在读，还是正在写。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 01",
              "title": "连接器面板",
              "instruction": "要放：连接器面板",
              "caption": "连接器面板"
            }
          ]
        }
      ],
      "url": "https://github.com/chenyiwanshishen-source/figma-connector-figma-",
      "status": "已开源（GitHub）"
    },
    {
      "id": "explorations-02",
      "label": "设计系统",
      "title": "扫描 Qsight 的历史稿后，我发现建好的颜色变量几乎没人在用",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "我用连接器让 AI 只读扫描了 Qsight 的两批历史稿，一共 19 个页面。文件里已经建了 186 个颜色变量，可页面实际用的是另一个远程库里的变量，第一批页面就用了 39 个。光是蓝色就有三个相近的值，分别用在主操作按钮、品牌标识和改动高亮的文字上。"
        },
        {
          "kind": "metrics",
          "items": [
            {
              "text": "19 个",
              "label": "扫描的历史页面"
            },
            {
              "text": "186 个",
              "label": "文件里建好的颜色变量"
            },
            {
              "text": "39 个",
              "label": "第一批页面实际在用的远程变量"
            }
          ],
          "note": ""
        },
        {
          "kind": "paragraph",
          "text": "AI 很容易把相近的颜色直接合并。我要求它先不合并：每个颜色按用途单独命名，再由我逐个决定留哪个、怎么合。定下来以后，才把颜色、字体、间距、圆角、描边和栅格写成 Figma 变量，再做成 React 组件库。"
        },
        {
          "kind": "flow",
          "rows": [
            {
              "steps": [
                "只读扫描 19 个页面",
                "列出每个颜色的用途",
                "我逐个决定留哪个",
                "写入 Figma 变量",
                "做成代码组件"
              ],
              "highlight": [
                2
              ]
            }
          ]
        },
        {
          "kind": "paragraph",
          "text": "目前组件库有 9 个基础组件和 88 个单元测试，用 Storybook 展示每个组件的尺寸、变体和交互状态。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 02",
              "title": "颜色审计：相近的蓝色和各自的用途",
              "instruction": "要放：颜色审计：相近的蓝色和各自的用途",
              "caption": "颜色审计：相近的蓝色和各自的用途"
            },
            {
              "plate": "PLATE 03",
              "title": "Storybook 组件页",
              "instruction": "要放：Storybook 组件页",
              "caption": "Storybook 组件页"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "从零搭一套设计系统",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "没有历史稿可整理的时候，我用另一个 Skill 从零搭设计系统。它让 AI 在 Figma 里按固定顺序推进，只有一个主 Agent 可以写入，其他角色只读，负责给出规格和验收。"
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
              ]
            }
          ]
        }
      ],
      "url": "https://github.com/chenyiwanshishen-source/figma-design-system-workflow",
      "status": "Figma 设计系统工作流已开源（GitHub）；组件库持续维护中。"
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

export const explorationProjects = [
  { slug: 'figma-connector', chapter: 'explorations-01', name: 'Figma 连接器', cover: '连接器面板' },
  { slug: 'design-system', chapter: 'explorations-02', name: '设计系统', cover: '颜色审计与组件库' },
  { slug: 'visual-code-canvas', chapter: 'explorations-03', name: 'Visual Code Canvas', cover: '画布与属性面板' },
  { slug: 'illustration-skill', chapter: 'explorations-04', name: '插画 Skill', cover: 'Micro-UI 插画作品' },
].map(item => ({ ...item, href: `#/project/explorations/${item.slug}` }));
