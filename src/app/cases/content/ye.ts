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
  "chapters": [
    {
      "id": "ye-01",
      "label": "01 · 挑战",
      "title": "规则整理不了每个人的书签，直接让 AI 改又不放心",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "每个人存书签的习惯都不一样：有人按项目分，有人按用途分，还有存错位置的和重复的。规则永远写不完；可如果让 AI 直接改，用户又担心它改乱。"
        }
      ]
    },
    {
      "id": "ye-02",
      "label": "02 · 定义问题",
      "title": "人擅长说\"我想要什么\"，AI 擅长读懂几百个书签",
      "blocks": [
        {
          "kind": "table",
          "label": "人擅长说\"我想要什么\"，AI 擅长读懂几百个书签",
          "headers": [
            "整理需求",
            "用户的原话"
          ],
          "rows": [
            [
              "整理全部",
              "【待填：从日志导出里摘一句真实输入】"
            ],
            [
              "找出某个主题",
              "帮我把关于 ai 的书签找出来吧"
            ],
            [
              "按用途重新分",
              "【待填：从日志导出里摘一句真实输入】"
            ],
            [
              "只整理一部分",
              "【待填：从日志导出里摘一句真实输入】"
            ]
          ]
        },
        {
          "kind": "paragraph",
          "text": "这些需求没法穷举，所以我把分工反过来：人只在开头说想法、在最后确认结果，中间的读取、判断和分组都交给 AI。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 02",
              "title": "一次整理的路径（说想法 → AI 读取书签和页签 → 必要时反问 → 分组预览 → 确认写入 → 可以撤销）",
              "instruction": "要放：一次整理的路径（说想法 → AI 读取书签和页签 → 必要时反问 → 分组预览 → 确认写入 → 可以撤销）",
              "caption": "一次整理的路径（说想法 → AI 读取书签和页签 → 必要时反问 → 分组预览 → 确认写入 → 可以撤销）"
            }
          ]
        }
      ]
    },
    {
      "id": "ye-03",
      "label": "03 · 早期方案",
      "title": "第一版用规则判断用户想做什么，结果变成了单词匹配",
      "blocks": [
        {
          "kind": "paragraph",
          "text": "第一版由 AI 帮我搭，它用正则、写死的四个分类和固定流程来判断用户的意图。用户换个说法就会判断错，分不进去的书签全被放进\"其他\"。每次请求都把整棵书签树发给 AI，也没有缓存，成本控制得不好。"
        },
        {
          "kind": "paragraph",
          "text": "我删掉了所有规则代码，把判断交还给 AI，只给它这一步需要的信息，并加上了缓存。"
        },
        {
          "kind": "figures",
          "figures": [
            {
              "plate": "PLATE 03",
              "title": "改前：写死的分类和一次误判（来自日志导出，打码）",
              "instruction": "要放：改前：写死的分类和一次误判（来自日志导出，打码）",
              "caption": "改前：写死的分类和一次误判（来自日志导出，打码）"
            }
          ]
        }
      ]
    },
    {
      "id": "ye-04",
      "label": "04 · 挑战与取舍",
      "title": "每一次推翻，都是把判断从代码手里拿回来",
      "blocks": [
        {
          "kind": "subsection",
          "title": "条件换了个地方，又长了出来",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "正则删掉以后，AI 写代码时又加了一层层条件和状态锁来兜底。结果流程互相卡死，书签任务还会串成页签任务。这个分支改了约 5400 行，修补的代价已经超过重做。我放弃了它，从干净的主线重新开始，只搬回验证过的部分；同时加上了运行日志导出，之后判断问题都看真实记录。"
            }
          ]
        },
        {
          "kind": "subsection",
          "title": "不要转译，让 AI 直接听用户说",
          "blocks": [
            {
              "kind": "paragraph",
              "text": "之前用户的话会先被一个 AI 转译成意图，插件再按意图命中路由，交给下一个 AI 分阶段执行。每转一层都会丢一些信息，路由一旦判错，整条链都会跑偏。我改成把用户的话直接交给 AI，用哪些工具也由 AI 自己选。"
            },
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 04",
                  "title": "改前和改后的架构对比",
                  "instruction": "要放：改前和改后的架构对比",
                  "caption": "改前和改后的架构对比"
                }
              ]
            },
            {
              "kind": "paragraph",
              "text": "放手给 AI 之后，安全靠沙箱来保证：AI 可以自由读取和判断，但任何改动都要经过插件校验和用户确认。三次推翻分别在 9 月中旬、9 月 26 日和 10 月 18 日，之后一直沿用这套结构。"
            }
          ]
        }
      ]
    },
    {
      "id": "ye-05",
      "label": "05 · 最终方案",
      "title": "插件是沙箱，工具是手脚，AI 是大脑",
      "blocks": [
        {
          "kind": "table",
          "label": "插件是沙箱，工具是手脚，AI 是大脑",
          "headers": [
            "层",
            "负责"
          ],
          "rows": [
            [
              "AI（大脑）",
              "理解用户的想法，决定怎么分，选用工具"
            ],
            [
              "工具（手脚）",
              "读书签、读网页、反问用户、生成分组预览、移动页签"
            ],
            [
              "插件（沙箱）",
              "保存事实、校验参数、写入前请用户确认、撤销、保护固定页签"
            ]
          ]
        },
        {
          "kind": "subsection",
          "title": "用一句话开始：对话放在右侧常驻面板，整理时书签和对话在同一屏。",
          "blocks": [
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 05",
                  "title": "常驻对话面板",
                  "instruction": "要放：常驻对话面板",
                  "caption": "常驻对话面板"
                }
              ]
            }
          ],
          "plain": true
        },
        {
          "kind": "subsection",
          "title": "AI 不确定时会先反问，不靠猜。",
          "blocks": [
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 06",
                  "title": "反问确认",
                  "instruction": "要放：反问确认",
                  "caption": "反问确认"
                }
              ]
            }
          ],
          "plain": true
        },
        {
          "kind": "subsection",
          "title": "分组预览按窗口展示，每个页签从哪来、到哪去都看得见。",
          "blocks": [
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 07",
                  "title": "分组预览",
                  "instruction": "要放：分组预览",
                  "caption": "分组预览"
                }
              ]
            }
          ],
          "plain": true
        },
        {
          "kind": "subsection",
          "title": "AI 只给方案，用户点了确认才会写入。",
          "blocks": [
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 08",
                  "title": "确认写入",
                  "instruction": "要放：确认写入",
                  "caption": "确认写入"
                }
              ]
            }
          ],
          "plain": true
        },
        {
          "kind": "subsection",
          "title": "最近 5 步可以撤销，固定的页签不会被移动。",
          "blocks": [
            {
              "kind": "figures",
              "figures": [
                {
                  "plate": "PLATE 09",
                  "title": "撤销与固定页签保护",
                  "instruction": "要放：撤销与固定页签保护",
                  "caption": "撤销与固定页签保护"
                }
              ]
            }
          ],
          "plain": true
        }
      ]
    }
  ],
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
