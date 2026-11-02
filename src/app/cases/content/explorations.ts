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
      "title": "让 AI 帮我改 Figma，改坏了也能退回",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "一个 Figma 插件。装上以后，Claude 这类 AI 助手就能读、也能改我正在打开的 Figma 文件。已开源。"
        },
        {
          "kind": "subsection",
          "title": "我想让 AI 帮我理设计稿，可它打不开 Figma",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "我手上有一批 Qsight 的老设计稿，想让 AI 帮我查查颜色和组件用得乱不乱。可当时的 AI 读不到 Figma 文件，也改不了。所以我做了这个插件。"
            },
            {
              "kind": "flow",
              "rows": [
                {
                  "steps": [
                    "AI 说要做什么",
                    "插件在 Figma 里照做",
                    "把结果告诉 AI"
                  ]
                }
              ]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "改之前先存一份，改坏了能退回",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "让 AI 直接改设计稿，最怕它改坏。所以插件每次动手前都会先存一份，出错就自动退回。面板上能看到它这会儿是在看，还是在改。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 01",
                  "title": "插件面板",
                  "instruction": "要放：插件面板",
                  "caption": "插件面板"
                }
              ]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "只在我自己的电脑上运行",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "不用注册账号，也不用填密钥，文件不会传到别的地方。"
            }
          ]
        }
      ],
      "url": "https://github.com/chenyiwanshishen-source/figma-connector-figma-",
      "status": "已开源 · GitHub"
    },
    {
      "id": "explorations-02",
      "label": "设计系统",
      "title": "把 Qsight 的老设计稿，理成一套能复用的组件",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "我用上面那个插件，让 AI 把 Qsight 的老设计稿过了一遍，理出颜色和基础规范，再做成前端组件。"
        },
        {
          "kind": "subsection",
          "title": "颜色建了一大堆，页面上却没在用",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "AI 一共检查了 19 个页面。文件里已经建了 186 个颜色，可页面上实际用的，是另一个库里的颜色。光是蓝色就有三种差不多的，分别用在按钮、品牌和高亮文字上。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 01",
                  "title": "三种差不多的蓝色，各自用在哪里",
                  "instruction": "要放：三种差不多的蓝色，各自用在哪里",
                  "caption": "三种差不多的蓝色，各自用在哪里"
                }
              ]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "差不多的颜色，我一个一个定",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "AI 很容易把看着差不多的颜色直接合成一个。可它们各管各的用途，不能随手合并。所以我让 AI 先别合，把每个颜色用在哪里列出来，再由我一个一个决定留哪个。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "定好的规范，做成了能直接用的组件",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "颜色、字体、间距这些定下来以后，我把它们存进 Figma，再做成前端组件。现在有 9 个组件，每个组件的样式和状态都能在一个页面里查到。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 02",
                  "title": "组件展示页",
                  "instruction": "要放：组件展示页",
                  "caption": "组件展示页"
                }
              ]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "从零做一套的话，我另有一个 Skill",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "如果不是整理老稿，而是从零做一套设计系统，我会用另一个 Skill。它让 AI 按固定的步骤往下走，而且只让一个 AI 动手改，其他 AI 只负责检查。"
            },
            {
              "kind": "flow",
              "rows": [
                {
                  "steps": [
                    "找风格方向",
                    "定色板",
                    "定基础规范",
                    "做组件",
                    "检查验收"
                  ]
                }
              ]
            }
          ]
        }
      ],
      "url": "https://github.com/chenyiwanshishen-source/figma-design-system-workflow",
      "status": "从零搭建的 Skill 已开源 · GitHub；组件库还在继续做"
    },
    {
      "id": "explorations-03",
      "label": "Visual Code Canvas",
      "title": "AI 写完页面，小地方我自己动手改",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "一个改页面样式的工具。在页面上点中哪里，就能直接改哪里，改完自动存回代码。"
        },
        {
          "kind": "subsection",
          "title": "改一个间距，还得再跟 AI 说一遍",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "用 AI 写页面很快，但改一个间距、换一个颜色，还要再描述一遍、再等一轮。改的地方越小，越觉得不划算。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "点中哪里，就改哪里",
          "blocks": [
            {
              "kind": "flow",
              "rows": [
                {
                  "steps": [
                    "在页面上点选",
                    "在右边改数值",
                    "自动存回代码",
                    "页面马上变"
                  ]
                }
              ]
            },
            {
              "kind": "paragraph",
              "text": "我不用去翻代码，找这个按钮写在哪里，工具会帮我找到。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 01",
                  "title": "画布和右侧面板（可以放动图）",
                  "instruction": "要放：画布和右侧面板（可以放动图）",
                  "caption": "画布和右侧面板（可以放动图）"
                }
              ]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "什么交给工具，什么交给 AI",
          "blocks": [
            {
              "kind": "statement",
              "text": "简单的我自己改，复杂的再交给 AI。"
            },
            {
              "kind": "paragraph",
              "text": "改数值、换颜色、改文字，结果是确定的，工具直接改，不用再花钱问 AI。要拆组件、调结构，才交给 AI。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "第一版是 VSCode 插件",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "第一版是装在 VSCode 里的插件，后来改成在 Codex 自带的浏览器里用。【待填：为什么换，一两句】"
            }
          ]
        }
      ],
      "status": "v0.2.1 已发布 · GitHub",
      "url": "https://github.com/chenyiwanshishen-source/visual-code-canvas"
    },
    {
      "id": "explorations-04",
      "label": "插画 Skill",
      "title": "教 AI 画插画，先要画得出\"像真的\"",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "我给 AI 写的一套画插画的规矩。这个作品集的封面、ye! 的空状态图，都是 AI 照着它画的。"
        },
        {
          "kind": "subsection",
          "title": "AI 画的界面图，经常看不出画的是什么",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "让 AI 画一个\"界面\"，它常常拿几张空白卡片、几条灰色横条凑数，看不出画的是什么工具。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "我把自己画图时的讲究，写成了三条规矩",
          "blocks": [
            {
              "kind": "columns",
              "items": [
                {
                  "label": "画真东西",
                  "text": "得是一眼认得出的控件，不拿灰色横条凑"
                },
                {
                  "label": "分清前后",
                  "text": "底板、中间的控件、最前面的重点，三层分清楚"
                },
                {
                  "label": "别画太碎",
                  "text": "按实际大小看，每块颜色至少 16 像素，放不下就少画点"
                }
              ]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "画完要自己检查，能导出不算数",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "每画完一张，AI 要按原大小和放大三倍各看一遍。原大小看能不能认出画的是什么，放大看边角和阴影有没有毛病，有问题改完再看。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "用它画的图",
          "blocks": [
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
          ]
        }
      ],
      "status": "改到第 4 版了，准备开源【待填：开源后的仓库链接】"
    }
  ]
};

export const explorationProjects = [
  { slug: 'figma-connector', chapter: 'explorations-01', name: 'Figma 连接器', cover: '连接器面板' },
  { slug: 'design-system', chapter: 'explorations-02', name: '设计系统', cover: '颜色审计与组件库' },
  { slug: 'visual-code-canvas', chapter: 'explorations-03', name: 'Visual Code Canvas', cover: '画布与属性面板' },
  { slug: 'illustration-skill', chapter: 'explorations-04', name: '插画 Skill', cover: 'Micro-UI 插画作品' },
].map(item => ({ ...item, href: `#/project/explorations/${item.slug}` }));
