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
          "text": "我做了一个连接 AI 和 Figma 的小工具，让 AI 能直接读取和修改设计稿。工具在本地运行，代码已开源。"
        },
        {
          "kind": "subsection",
          "title": "起因",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "整理 Qsight 的旧设计稿时，我想让 AI 帮忙看看颜色和组件都用在了哪里。但 Gemini 连 Figma 总是报错，我就自己做了这个连接工具，让 AI 继续完成后续工作。它通过 MCP 接入，可以配合目前支持 MCP 的主流智能体使用。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "工作原理和功能",
          "blocks": [
            { "kind": "bridge-flow" },
            {"kind": "feature-bubbles", "texts": ["读取和修改图层、文字、颜色和样式", "查找、导入组件，绑定变量", "查看当前正在读取还是写入", "保存文件链接，跳转到对应节点", "连接本地服务，接收或停止任务", "执行出错时，尝试清理本次新建的节点"]},
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
      "title": "组件库生成规范",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "我想尝试用 AI 设计和维护组件库，于是把设计规则和执行流程写成 Skill，看看能否让 AI 按同一套规范生成、检查和修改组件。"
        },
        { "kind": "design-system-summary" },
        {
          "kind": "subsection",
          "title": "设计经历",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "我参考 Carbon、Fluent 等设计系统，尝试用一个 Skill 分角色完成颜色探索到组件生成，但流程太长，上下文不断累积，后期容易偏离规则。调整分工和读取方式后仍不稳定，我最终放下完整流程的 Skill，把规则拆成独立规范，生成和维护组件时按需读取、逐项核对。"
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
      "title": "让 AI 为 B 端产品画插画",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "每次让 AI 画插画，出来的风格总是不统一，所以我做了一个 Skill，让它按统一的风格来执行。"
        },
        {
          "kind": "subsection",
          "title": "目录结构和工作原理",
          "blocks": [
            {"kind": "skill-tree", "items": [{"label": "SKILL.md", "text": "Skill 主指令：风格约束、设计规则与绘制流程"}, {"label": "assets/", "text": "相关资源文件"}, {"label": "examples/", "text": "可编辑的 SVG 示例"}, {"label": "references/", "text": "参考图谱与绘制说明"}, {"label": "scripts/", "text": "辅助与导出脚本"}, {"label": "styles/", "text": "样式规范与色彩配置"}, {"label": "templates/", "text": "构图与画板模板"}]},
            { "kind": "illustration-flow" }
          ]
        },
        {
          "kind": "subsection",
          "title": "使用 Skill 生成的内容",
          "blocks": [
            { "kind": "paragraph", "text": "下面这些插画，是我分别用 Codex、Gemini 和 Claude 按这套 Skill 生成的。同一组里的配色、层次和光影基本能保持一致，换场景后也能看出是同一套风格。不过，不同模型对细节的处理仍有差异，局部比例和对齐还需要检查、调整。", "highlightPhrases": ["Codex、Gemini 和 Claude", "配色、层次和光影基本能保持一致", "局部比例和对齐还需要检查、调整"] },
{
        "kind": "subsection",
        "title": "如何使用这个 Skill",
        "blocks": [
                {
                        "kind": "paragraph",
                        "text": "每个人想要的插画风格都不一样，所以我把这个 Skill 做成了**可以自定义风格**的方式，并内置了 **SVG 的绘制方法和案例**。使用时，把喜欢的参考图发给 AI，说明想画的场景，它会分析图片的造型、配色和层次，**把参考与分析存进素材库**，再结合内置画法绘制、检查和修改，最后**交付可编辑的 SVG**；满意后，也可以让它**把成图收进案例库**，供下次参考。"
                }
        ]
},
  {
    "kind": "subsection",
    "title": "组件库",
    "blocks": [
      {
        "kind": "figures",
        "figures": [
          {
            "plate": "ILLUSTRATION 01",
            "title": "细节级间距",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/detailspacing.svg",
            "alt": "细节级间距插画"
          },
          {
            "plate": "ILLUSTRATION 02",
            "title": "组件级间距",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/componentspacing.svg",
            "alt": "组件级间距插画"
          },
          {
            "plate": "ILLUSTRATION 03",
            "title": "布局级间距",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/layoutspacing.svg",
            "alt": "布局级间距插画"
          },
          {
            "plate": "ILLUSTRATION 04",
            "title": "标题",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/headings.svg",
            "alt": "标题插画"
          },
          {
            "plate": "ILLUSTRATION 05",
            "title": "正文",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/body.svg",
            "alt": "正文插画"
          },
          {
            "plate": "ILLUSTRATION 06",
            "title": "表格",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/table.svg",
            "alt": "表格插画"
          },
          {
            "plate": "ILLUSTRATION 07",
            "title": "指标",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/metrics.svg",
            "alt": "指标插画"
          },
          {
            "plate": "ILLUSTRATION 08",
            "title": "字阶与行高",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/scales.svg",
            "alt": "字阶与行高插画"
          }
        ]
      }
    ]
  },
  {
    "kind": "subsection",
    "title": "ye! 插件",
    "blocks": [
      {
        "kind": "figures",
        "figures": [
          {
            "plate": "ILLUSTRATION 09",
            "title": "书签整理",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/ye-bookmarks.svg",
            "alt": "书签整理插画"
          },
          {
            "plate": "ILLUSTRATION 10",
            "title": "书签删除",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/ye-deletion.svg",
            "alt": "书签删除插画"
          },
          {
            "plate": "ILLUSTRATION 11",
            "title": "页签整理",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/ye-tabs.svg",
            "alt": "页签整理插画"
          },
          {
            "plate": "ILLUSTRATION 12",
            "title": "页签关闭完成",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/ye-closed.svg",
            "alt": "页签关闭完成插画"
          },
          {
            "plate": "ILLUSTRATION 13",
            "title": "已被取代的方案",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/ye-superseded.svg",
            "alt": "已被取代的方案插画"
          },
          {
            "plate": "ILLUSTRATION 14",
            "title": "书签空状态",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/ye-bookmark-empty.svg",
            "alt": "书签空状态插画"
          },
          {
            "plate": "ILLUSTRATION 15",
            "title": "历史记录空状态",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/ye-history-empty.svg",
            "alt": "历史记录空状态插画"
          },
          {
            "plate": "ILLUSTRATION 16",
            "title": "书签搜索无结果",
            "instruction": "",
            "caption": "",
            "src": "images/illustration-skill/ye-bookmark-search-empty.svg",
            "alt": "书签搜索无结果插画"
          }
        ]
      }
    ]
  },
{
  "kind": "subsection",
  "title": "空状态",
  "blocks": [
    {
      "kind": "figures",
      "figures": [
        {
          "plate": "ILLUSTRATION 17",
          "title": "首次使用",
          "instruction": "",
          "caption": "",
          "src": "images/illustration-skill/figma-empty-285.svg",
          "alt": "首次使用插画"
        },
        {
          "plate": "ILLUSTRATION 18",
          "title": "搜索无结果",
          "instruction": "",
          "caption": "",
          "src": "images/illustration-skill/figma-empty-307.svg",
          "alt": "搜索无结果插画"
        },
        {
          "plate": "ILLUSTRATION 19",
          "title": "筛选无匹配",
          "instruction": "",
          "caption": "",
          "src": "images/illustration-skill/figma-empty-326.svg",
          "alt": "筛选无匹配插画"
        },
        {
          "plate": "ILLUSTRATION 20",
          "title": "暂无关系",
          "instruction": "",
          "caption": "",
          "src": "images/illustration-skill/figma-empty-349.svg",
          "alt": "暂无关系插画"
        },
        {
          "plate": "ILLUSTRATION 21",
          "title": "暂无监控",
          "instruction": "",
          "caption": "",
          "src": "images/illustration-skill/figma-empty-376.svg",
          "alt": "暂无监控插画"
        },
        {
          "plate": "ILLUSTRATION 22",
          "title": "暂无收藏",
          "instruction": "",
          "caption": "",
          "src": "images/illustration-skill/figma-empty-398.svg",
          "alt": "暂无收藏插画"
        },
        {
          "plate": "ILLUSTRATION 23",
          "title": "加载失败",
          "instruction": "",
          "caption": "",
          "src": "images/illustration-skill/figma-empty-415.svg",
          "alt": "加载失败插画"
        },
        {
          "plate": "ILLUSTRATION 24",
          "title": "暂无权限",
          "instruction": "",
          "caption": "",
          "src": "images/illustration-skill/figma-empty-441.svg",
          "alt": "暂无权限插画"
        }
      ]
    }
  ]
}
]
        }
      ],
      "url": "https://github.com/chenyiwanshishen-source/micro-ui-illustration",
      "status": ""
    }
  ]
};

export const explorationProjects = [
  { slug: 'figma-connector', chapter: 'explorations-01', name: 'Figma 连接器', cover: '连接器面板' },
  { slug: 'design-system', chapter: 'explorations-02', name: '设计系统', cover: '颜色审计与组件库' },
  { slug: 'illustration-skill', chapter: 'explorations-04', name: '插画 Skill', cover: 'Micro-UI 插画作品' },
  { slug: 'visual-code-canvas', chapter: 'explorations-03', name: 'Visual Code Canvas', status: '已搁置', cover: '画布与属性面板' },
].map(item => ({ ...item, href: `#/project/explorations/${item.slug}` }));
