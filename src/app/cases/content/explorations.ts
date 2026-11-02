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
      "title": "让 AI 帮我改 Figma，改坏了也能退回",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "一个 Figma 插件。装上以后，Claude 这类 AI 助手就能读、也能改我正在打开的 Figma 文件。已开源。"
        },
        {
          "kind": "subsection",
          "title": "为什么做连接器",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "为了让 AI 检查 Qsight 老设计稿里的颜色和组件，我先做了这个插件，解决它无法读写 Figma 文件的问题。后来扫描 Qsight 的 [19 个历史页面](#/project/explorations/design-system)，用的就是它。"
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
          "title": "出错时自动撤回",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "插件每次修改前都会先保存一份，出错就自动退回，避免 AI 改坏设计稿。面板上能看到它正在读取还是修改。"
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
          "title": "本地运行",
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
          "text": "我用自己做的 [Figma 连接器](#/project/explorations/figma-connector)，让 AI 把 Qsight 的老设计稿过了一遍，理出颜色和基础规范，再做成前端组件。"
        },
        {
          "kind": "subsection",
          "title": "历史页面的用色情况",
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
          "title": "按用途整理颜色",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "AI 很容易直接合并看着差不多的颜色，忽略它们各自的用途。我让 AI 先列出每个颜色用在哪里，暂不合并，再由我逐个决定留哪个。"
            },
            {
              "kind": "paragraph",
              "text": "最后只留下页面上真正用到的用途，整理成 58 个按用途命名的颜色：文字 19 个，图标 6 个，背景 26 个，边框 7 个。原来一个颜色同时管文字和边框的，也按用途拆开了。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "前端组件库",
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
        }
      ],
      "url": "https://github.com/chenyiwanshishen-source/figma-design-system-workflow",
      "status": "从零搭设计系统时，我用的是另一个自己写的 Skill，也已开源 · GitHub。组件库还在继续做。"
    },
    {
      "id": "explorations-03",
      "label": "Visual Code Canvas",
      "title": "AI 写完页面，小地方我自己动手改",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "这是一个修改页面样式的工具，可以在页面上选中元素、修改样式，再自动存回代码。"
        },
        {
          "kind": "subsection",
          "title": "修改样式的成本",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "用 AI 写页面很快，但改一个间距、换一个颜色，还要再描述一遍、再等一轮。改的地方越小，越觉得不划算。"
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
              "text": "我不用再去翻代码找这个按钮写在哪里，工具会直接定位到。"
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
          "title": "工具与 AI 的分工",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "数值、颜色和文字可以用工具直接修改，结果确定，不用再花钱问 AI。拆组件、调结构则交给 AI。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "v0.2.1 后搁置",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "第一版是装在 VSCode 里的插件，后来改成在 Codex 自带的浏览器里用。做到 v0.2.1 以后，这个项目先搁置了。【待填：为什么放下，一句】"
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
      "title": "教 AI 画插画，先要画得出\"像真的\"",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "我给 AI 写的一套画插画的规矩。这个作品集的封面、ye! 的空状态图，都是 AI 照着它画的。"
        },
        {
          "kind": "subsection",
          "title": "界面插画的辨识问题",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "让 AI 画一个\"界面\"，它常常只画几张空白卡片和几条灰色横条，难以辨认具体是什么工具。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "三条绘图规矩",
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
          "title": "绘图后的检查",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "每画完一张，AI 要按原大小和放大三倍各看一遍。原大小看能不能认出画的是什么，放大看边角和阴影有没有毛病，有问题改完再看。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "插画作品",
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
      "status": "改到第 4 版了，准备开源【待填：开源后的仓库链接】"
    }
  ]
};

export const explorationProjects = [
  { slug: 'figma-connector', chapter: 'explorations-01', name: 'Figma 连接器', cover: '连接器面板' },
  { slug: 'design-system', chapter: 'explorations-02', name: '设计系统', cover: '颜色审计与组件库' },
  { slug: 'illustration-skill', chapter: 'explorations-04', name: '插画 Skill', cover: 'Micro-UI 插画作品' },
  { slug: 'visual-code-canvas', chapter: 'explorations-03', name: 'Visual Code Canvas', status: '已搁置', cover: '画布与属性面板' },
].map(item => ({ ...item, href: `#/project/explorations/${item.slug}` }));
