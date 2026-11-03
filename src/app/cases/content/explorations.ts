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
              "text": "我想检查 Qsight 旧设计稿中的颜色和组件使用情况，但当时用 Gemini 连接 Figma 经常报错，于是自己开发了这个插件。后续对 [19 个页面](#/project/explorations/design-system)的检查，也是通过它完成的。"
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
              "text": "插件接收 AI 的操作请求，在 Figma 中执行，再返回结果。\n为了避免改坏设计稿，插件会在每次修改前保存一份，出错时撤回。面板显示当前正在读取还是写入，便于查看执行状态。\n插件在本地运行，无需注册或填写密钥。"
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
      "title": "整理 Qsight 的设计规范与组件",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "我通过自己开发的 [Figma 连接器](#/project/explorations/figma-connector)，让 AI 检查 Qsight 的旧设计稿，先整理颜色，再统一基础规范，最后实现前端组件。"
        },
        {
          "kind": "subsection",
          "title": "先看颜色",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "AI 检查了 19 个页面。文件中已有 186 个颜色，但页面实际引用的是另一个库中的颜色。其中三种相近的蓝色，分别用于按钮、品牌和高亮文字。"
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
          "title": "按用途确认颜色",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "AI 容易合并看起来相近、实际用途不同的颜色。我让它先列出每个颜色的使用位置，再逐项确认哪些保留、哪些合并。"
            },
            {
              "kind": "paragraph",
              "text": "最终按页面实际使用的用途，整理出 58 个颜色并按用途命名：文字 19 个，图标 6 个，背景 26 个，边框 7 个。原来同时用于文字和边框的颜色，也按用途拆开。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "做成组件",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "确定颜色、字体和间距后，我先将规范整理到 Figma，再实现前端组件。目前有 9 个组件，样式和状态可以在同一个展示页查看。"
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
      "status": "另有一套用于从零搭建设计系统的 Skill，已开源 · GitHub。组件库仍在开发中。"
    },
    {
      "id": "explorations-03",
      "label": "Visual Code Canvas",
      "title": "在页面上修改样式并写回源码",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "这是一个用于修改页面样式的工具，开发到 v0.2.1 后暂时搁置。"
        },
        {
          "kind": "subsection",
          "title": "起因",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "用 AI 生成页面后，即使只调整间距或颜色，也需要重新描述需求并等待修改。我希望这些小范围调整能直接在页面上完成。"
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
              "text": "工具根据页面上选中的元素定位源码，不必手动查找对应代码。"
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
              "text": "修改数值、颜色和文字由工具直接执行，不需要为这些确定的操作调用 AI；拆分组件、调整结构则交给 AI。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "当前进展",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "第一版是 VSCode 插件，后来改为在 Codex 内置浏览器中使用。开发到 v0.2.1 后暂时搁置。【待填：为什么放下，一句】"
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
      "title": "用可辨认的控件绘制界面插画",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "这是我编写的一套插画绘制规则，用来指导 AI。这个作品集的封面和 ye! 的空状态图都使用了这套规则。"
        },
        {
          "kind": "subsection",
          "title": "起因",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "AI 绘制界面插画时，经常用空白卡片和灰色线条代替内容，难以辨认画的是什么工具。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "控件、层次与尺寸",
          "blocks": [
            {
              "kind": "columns",
              "items": [
                {
                  "label": "控件可辨认",
                  "text": "使用可辨认的控件，避免用灰色线条代替内容"
                },
                {
                  "label": "区分层次",
                  "text": "底板、中间的控件、最前面的重点，分成三层"
                },
                {
                  "label": "控制细节",
                  "text": "按实际展示尺寸检查，每块颜色至少 16 像素，空间不足时减少细节"
                }
              ]
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 05",
                  "title": "未使用绘制规则的插画",
                  "instruction": "要放：未使用绘制规则的插画",
                  "caption": "未使用绘制规则的插画"
                },
                {
                  "plate": "PLATE 06",
                  "title": "使用绘制规则后的插画",
                  "instruction": "要放：使用绘制规则后的插画",
                  "caption": "使用绘制规则后的插画"
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
              "text": "每张插画都按原始尺寸和三倍尺寸检查：原始尺寸下确认控件能否辨认，放大后检查边角和阴影。发现问题后修改，再重新检查。"
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
