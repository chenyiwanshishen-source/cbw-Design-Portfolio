import type { CaseBlock } from '../types';

type Exploration = { id: string; label: string; title: string; blocks: CaseBlock[]; status: string; url?: string };
export const explorations: { header: { title: string; intro: string }; intro: string; chapters: Exploration[] } = {
  "header": {
    "title": "我给自己做的设计工具",
    "intro": "下面四个工具，都是我在工作里遇到具体问题后，用 AI 编程工具做出来的。产品定义、规则和验收标准由我来定，代码由 AI 协作完成。"
  },
  "intro": "前面三个案例中，产品定义、规则和验收标准也由我决定，代码由 AI 协作完成。",
  "chapters": [
    {
      "id": "explorations-01",
      "label": "Figma 连接器",
      "title": "让 AI 能直接读、改 Figma 文件",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "一个在自己电脑上运行的 Figma 插件，已经开源。"
        },
        {
          "kind": "subsection",
          "title": "起因",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "我想让 AI 帮我看看 Qsight 那批老设计稿，颜色和组件到底乱到什么程度。可当时用 Gemini 连 Figma 老是报错，我就自己做了这个插件。后面扫描那 [19 个页面](#/project/explorations/design-system)，用的就是它。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "怎么做的",
          "blocks": [
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
            },
            {
              "kind": "paragraph",
              "text": "AI 把要做的事发给插件，插件在 Figma 里执行，再把结果传回去。\n我最担心 AI 把稿子改坏，所以插件每次动手前都会先存一份，出了错就退回去。面板上也能看到它这会儿是在读还是在写。\n整个过程只在自己电脑上跑，不用注册，也不用填密钥。"
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
        }
      ],
      "url": "https://github.com/chenyiwanshishen-source/figma-connector-figma-",
      "status": "已开源 · GitHub"
    },
    {
      "id": "explorations-02",
      "label": "设计系统",
      "title": "把 Qsight 的老设计稿理成一套组件",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "我用自己做的 [Figma 连接器](#/project/explorations/figma-connector)，让 AI 把 Qsight 的老设计稿过了一遍，先理颜色，再理基础规范，最后做成前端组件。"
        },
        {
          "kind": "subsection",
          "title": "先看颜色",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "AI 一共查了 19 个页面。文件里已经建了 186 个颜色，可页面上实际用的，是另一个库里的颜色。光蓝色就有三种差不多的，分别用在按钮、品牌和高亮的文字上。"
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
          "title": "一个一个定",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "AI 很容易把看着差不多的颜色直接并成一个，但它们各有各的用处。所以我让它先别并，把每个颜色用在哪儿列出来，再由我一个一个定留哪个。"
            },
            {
              "kind": "paragraph",
              "text": "最后只留下页面上真用到的用途，理成 58 个按用途命名的颜色：文字 19 个，图标 6 个，背景 26 个，边框 7 个。以前一个颜色又管文字又管边框的，也按用途拆开了。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "做成组件",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "颜色、字体、间距这些定下来以后，我先存进 Figma，再做成前端组件。现在有 9 个组件，每个组件的样式和状态都能在一个页面里查到。"
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
        }
      ],
      "url": "https://github.com/chenyiwanshishen-source/figma-design-system-workflow",
      "status": "从零搭设计系统的时候，我用的是另一个自己写的 Skill，也开源了 · GitHub。组件库还在接着做。"
    },
    {
      "id": "explorations-03",
      "label": "Visual Code Canvas",
      "title": "页面上点哪改哪，改完存回代码",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "一个改页面样式的小工具，做到 v0.2.1 先放下了。"
        },
        {
          "kind": "subsection",
          "title": "起因",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "用 AI 写页面很快，可改个间距、换个颜色，还得再跟它描述一遍、再等一轮。改的地方越小，越觉得不值。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "怎么用",
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
              "text": "我不用再翻代码找这个按钮写在哪儿，工具会直接帮我定位。"
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
          "title": "哪些交给工具",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "改数值、换颜色、改文字，结果是确定的，工具直接改就行，不用再花钱问 AI。拆组件、调结构这种，才交给 AI。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "为什么停了",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "第一版是装在 VSCode 里的插件，后来改成在 Codex 自带的浏览器里用。做到 v0.2.1 以后先搁置了。【待填：为什么放下，一句】"
            }
          ]
        }
      ],
      "status": "v0.2.1 · 已搁置 · GitHub",
      "url": "https://github.com/chenyiwanshishen-source/visual-code-canvas"
    },
    {
      "id": "explorations-04",
      "label": "插画 Skill",
      "title": "教 AI 画出认得出的界面插画",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "这是我给 AI 写的一套画插画的规矩。这个作品集的封面、ye! 的空状态图，都是 AI 照着它画的。"
        },
        {
          "kind": "subsection",
          "title": "起因",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "让 AI 画个\"界面\"，它经常就摆几张空白卡片、几条灰杠，看不出到底画的是什么工具。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "三条规矩",
          "blocks": [
            {
              "kind": "columns",
              "items": [
                {
                  "label": "画真东西",
                  "text": "得是一眼认得出的控件，不拿灰杠凑数"
                },
                {
                  "label": "分清前后",
                  "text": "底板、中间的控件、最前面的重点，分成三层"
                },
                {
                  "label": "别画太碎",
                  "text": "按实际大小看，每块颜色至少 16 像素，放不下就少画点"
                }
              ]
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 05",
                  "title": "没有这些规矩时，AI 画的",
                  "instruction": "要放：没有这些规矩时，AI 画的",
                  "caption": "没有这些规矩时，AI 画的"
                },
                {
                  "plate": "PLATE 06",
                  "title": "按规矩画的",
                  "instruction": "要放：按规矩画的",
                  "caption": "按规矩画的"
                }
              ]
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "画完要检查",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "每画完一张，AI 得按原大小和放大三倍各看一遍：原大小看认不认得出，放大看边角和阴影有没有毛病，有问题改完再看一遍。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "作品",
          "blocks": [
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 07",
                  "title": "作品集封面",
                  "instruction": "要放：作品集封面",
                  "caption": "作品集封面"
                },
                {
                  "plate": "PLATE 08",
                  "title": "作品集封面",
                  "instruction": "要放：作品集封面",
                  "caption": "作品集封面"
                },
                {
                  "plate": "PLATE 09",
                  "title": "组件库封面",
                  "instruction": "要放：组件库封面",
                  "caption": "组件库封面"
                },
                {
                  "plate": "PLATE 10",
                  "title": "ye! 书签空状态",
                  "instruction": "要放：ye! 书签空状态",
                  "caption": "ye! 书签空状态"
                },
                {
                  "plate": "PLATE 11",
                  "title": "ye! 页签空状态",
                  "instruction": "要放：ye! 页签空状态",
                  "caption": "ye! 页签空状态"
                },
                {
                  "plate": "PLATE 12",
                  "title": "ye! 搜索空状态",
                  "instruction": "要放：ye! 搜索空状态",
                  "caption": "ye! 搜索空状态"
                }
              ]
            }
          ]
        }
      ],
      "status": "已经改到第 4 版，准备开源。【待填：开源后的仓库链接】"
    }
  ]
};

export const explorationProjects = [
  { slug: 'figma-connector', chapter: 'explorations-01', name: 'Figma 连接器', cover: '连接器面板' },
  { slug: 'design-system', chapter: 'explorations-02', name: '设计系统', cover: '颜色审计与组件库' },
  { slug: 'illustration-skill', chapter: 'explorations-04', name: '插画 Skill', cover: 'Micro-UI 插画作品' },
  { slug: 'visual-code-canvas', chapter: 'explorations-03', name: 'Visual Code Canvas', status: '已搁置', cover: '画布与属性面板' },
].map(item => ({ ...item, href: `#/project/explorations/${item.slug}` }));
