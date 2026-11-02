# 文案修订报告

分支：`redesign/copy-pass`；基线：`redesign/case-ye` 的 `0cea8b0`。仅修改四个文案文件及本报告，不合并、不 push、不部署。任务单保留未跟踪状态。

规范：`/tmp/oil-tone/skills/oil-tone/SKILL.md`，仓库 https://github.com/oil-oil/oil-tone ，版本 `39cbf92f76c90b7bb27a5b5d4ed88a1fc5fa31f6`。未安装全局 Skill。

## 1. 必改项

- [x] zh.ts · qixin-brain `period`：`2020–2026` → `2021–2026`
- [x] zh.ts · qixin-brain `meta`：`合合信息 · 启信产业大脑 · 2020 — 2026` → `合合信息 · 启信产业大脑 · 2021 — 2026`
- [x] zh.ts · qixin-brain `action`：`我从 2020 年开始负责这个产品` → `我从 2021 年开始负责这个产品`
- [x] qsight.ts · header `label` 和 ui `footer`：`QSIGHT` → `Qsight`（共 2 处）
- [x] qsight.ts · header `intro`：`跟进至 1.0 上线。` → `一直跟到 1.0 上线。`
- [x] qsight.ts · 定义问题：`设计重点是把范围与大纲确认前置，让生成过程可见、正文来源可追溯。` → `所以设计的重点是：在生成之前先确认范围和大纲，生成时让过程看得见，生成后每段正文都能查到来源。`
- [x] qsight.ts · 三轮访谈：`并结合竞品和低保真原型讨论，确定优先级。` → `再结合竞品分析和低保真原型讨论，确定先做哪些。`
- [x] qsight.ts · 问题卡"怕跑偏"：`先确认范围和结构，减少生成后的返工。` → `结构或数字一旦跑偏，生成后就要大量返工。`
- [x] qsight.ts · 问题卡"难核查"：`来源就近可查，历史报告可以复用。` → `数字找不到出处，旧报告也没法接着用。`
- [x] qsight.ts · Prompt 小节标题：`Prompt 从完整控制台，收敛为四个模块` → `Prompt 从完整控制台，缩减为四个模块`
- [x] qsight.ts · Prompt 小节正文：`配置收敛为任务定义、工具编排、质量门禁、容错兜底，保留后续扩展边界。` → `配置缩减为任务定义、工具编排、质量门禁和容错兜底四个模块。`
- [x] qsight.ts · 结果反馈：`用户反馈整体符合预期：资料查找和整理更集中，内容的来源也更容易确认。` → `试点客户的反馈是：资料查找和整理更集中了，内容的来源也更容易确认。 【待填：一句客户原话，注明是谁、在什么场合说的】`
- [x] qsight.ts · 反思：`随着模型能力提升，需要写死的规则正在减少。我的反思是：把系统必须保证的体验与模型可以自主判断的表达分开，才能持续维护。` → `模型越来越强，需要写死的规则越来越少。所以我把两件事分开：系统必须保证的体验（先确认、有来源、缺失要标出来）用规则守住，怎么表达交给模型判断。`
- [x] qixin.ts · 挑战：`数据与功能分散，用户很难连续完成定位范围、筛选目标、判断价值、跟进管理和输出结果。问题不在缺少某个功能，而在工作路径被拆散。` → `数据与功能分散，用户很难连续完成定位范围、筛选目标、判断价值、跟进管理和输出结果。`
- [x] qixin.ts · 首页工作台：`我把首页改成任务看板：报告入口、动态信息、业务概览、常用功能，让不同角色进来就能开始查询、判断和跟进。` → `我把首页改成任务看板，分成报告入口、动态信息、业务概览和常用功能四块，不同角色进来就能直接开始查询、判断和跟进。`

新增客户原话占位接在反馈字符串后，由现有 CaseText 自动渲染成 TodoNote；没有新增块或改动组件。

## 2. 额外修订

| 文件 | 改前 | 改后 | 对应规则与理由 |
| --- | --- | --- | --- |
| zh.ts | 现在也在用 AI 编程工具构建可使用的产品，实践包括前端可视化编辑工具和浏览器标签整理插件 ye!，从产品定义、交互设计到开发验证，目前也在持续推进中。 | 现在也在用 AI 编程工具构建可使用的产品，包括前端可视化编辑工具和浏览器标签整理插件 ye!。从产品定义、交互设计到开发验证，这些工作目前也在持续推进中。 | 把关系讲完整：拆开过长句，明确持续推进的是哪些工作。 |
| qsight.ts | 三轮访谈，收敛出三个关键问题 | 通过三轮访谈，确定三个关键问题 | 语气与句子：用常用词说明动作，保留原判断。 |
| qsight.ts | 沿报告生产旅程，把控制点放在三个阶段：生成前确认范围和大纲，生成中显示进度与异常，交付前核查每段来源。 | 沿着报告生成流程，我们在三个阶段设置控制点：生成前确认范围和大纲，生成中显示进度与异常，交付前核查每段来源。 | 语气与句子：补清主语，用自然语序交代三个阶段，保留控制点的原意。 |
| qixin.ts | 按任务重组首页和功能；把产业链配置交给用户；用组件库保证长期一致。 | 按任务重组首页和功能；把产业链配置交给用户；用组件库保持界面的一致性。 | 语气与句子：补清一致所指的对象。 |
| qixin.ts | 用户在产业大脑里沉淀的企业名单 | 用户在产业大脑里积累的企业名单 | 语气与句子：用常用词替换行业惯用表达，含义不变。 |
| ye.ts | 之前用户的话会先被一个 AI 转译成意图，插件再按意图命中路由，交给下一个 AI 分阶段执行。 | 之前用户的话会先被一个 AI 转译成意图，插件再根据意图选择执行路径，交给下一个 AI 分阶段执行。 | 让读者跟得上：用直接描述解释命中路由，不改变执行流程。 |
| ye.ts | 我只出想法和审批，代码交给三个 AI | 我只提想法、做审批，代码交给三个 AI | 语气与句子：修正出审批的动宾搭配，保留原判断。 |

ye! 的协作标题同时用于目录和章节，两处一起修改。其余未发现需同步的同句副本。

## 3. 建议但没改的

| 文件 | 原句 | 建议 | 为什么没改 |
| --- | --- | --- | --- |
| qsight.ts | 配置缩减为任务定义、工具编排、质量门禁和容错兜底四个模块。 | 后续结合真实界面解释四个模块各自做什么。 | 这是用户已确认的必改原文，现有材料不足以补充具体机制。 |
| ye.ts | 不写规则代码 | 后续如需解释，明确这里所指的规则范围。 | 属于原文带引号的协作规则，禁止改写，不能自行补充定义。 |
| qixin.ts | 产业大脑成了 AI 报告的企业底座 | 后续可考虑更直接的标题，但需确认是否仅指企业名单联动。 | 原判断可能包含更多产品含义，不能仅为通俗而缩小范围。 |

### 检查记录

| 文件 | tone_lint.py 退出码 | 输出 |
| --- | --- | --- |
| src/app/home/content/zh.ts | 0 | `PASS  no wording hints` |
| src/app/cases/content/qsight.ts | 0 | `PASS  no wording hints` |
| src/app/cases/content/qixin.ts | 0 | `PASS  no wording hints` |
| src/app/cases/content/ye.ts | 0 | `PASS  no wording hints` |

- 四份文案均已通读；lint 仅作辅助，没有把无提示当成文字质量结论。
- 去除字符串后与基线比较：四个文件结构一致；未改样式、组件、路由或依赖。
- 既有待填逐条保留，仅增加指定客户原话占位。数字检查仅允许首页三处 2020 → 2021；其余数字不变。中文引语及用户原话保持不变。
- 页面核对：首页启信卡片显示 2021–2026，案例头部显示 2021 — 2026；Qsight 大小写和反馈 TodoNote 正确，待填为现有 warning 色。
- Qsight 在 375 / 768 / 1440 下 scrollWidth 分别为 375 / 768 / 1440；1440 下版心 1200。其余页面本次未重新进行全套三宽度截图检查。
- 本次只改文案，未重复验证全部键盘操作、首页开场及系统减少动态效果。
- npm run build 通过，退出码 0。原始输出如下：

```text

> @figma/my-make-file@0.0.1 build
> vite build

vite v6.3.5 building for production...
transforming...
✓ 2060 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                 0.90 kB │ gzip:   0.50 kB
dist/assets/gameboy-frame-B36GG_uW.png      1,164.87 kB
dist/assets/street-portrait-BzQMkzd0.png    3,626.28 kB
dist/assets/YeCase-DSabMu2M.css                 0.25 kB │ gzip:   0.18 kB
dist/assets/QixinCase-CXtt1ZlO.css              0.79 kB │ gzip:   0.35 kB
dist/assets/CaseBlocks-D-Rc4Sbp.css             6.62 kB │ gzip:   1.54 kB
dist/assets/index-BPeCXoJ5.css                182.17 kB │ gzip:  33.16 kB
dist/assets/HomeContent-BbO1amQF.js             0.13 kB │ gzip:   0.14 kB
dist/assets/CaseSummary-CspnFr4M.js             0.44 kB │ gzip:   0.29 kB
dist/assets/index-CIvT9xMt.js                   4.93 kB │ gzip:   2.29 kB
dist/assets/ScrollArea-Tm4o1yuw.js              5.25 kB │ gzip:   1.80 kB
dist/assets/ProjectCaseNav-BvJfafzW.js          5.57 kB │ gzip:   1.82 kB
dist/assets/CaseBlocks-lI3SQE7y.js              6.93 kB │ gzip:   2.31 kB
dist/assets/QixinCase-BUkeEdsJ.js               8.82 kB │ gzip:   3.45 kB
dist/assets/QsightCase-d3KRu8Pl.js              9.43 kB │ gzip:   3.96 kB
dist/assets/Nav-vyIJCRTt.js                     9.58 kB │ gzip:   3.47 kB
dist/assets/YeCase-CZPMIrVH.js                 10.26 kB │ gzip:   4.04 kB
dist/assets/Footer-Dw3FR5MF.js                 45.07 kB │ gzip:  18.78 kB
dist/assets/ExplorationsPage-CeloHyIs.js       51.28 kB │ gzip:  11.83 kB
dist/assets/proxy-DLoaUJRt.js                 124.07 kB │ gzip:  40.48 kB
dist/assets/QixinProjectDetail-C5YDGeXh.js    150.59 kB │ gzip:  35.86 kB
dist/assets/ProjectDetail-uWcxdptj.js         193.54 kB │ gzip:  57.15 kB
dist/assets/index-CbOUALwi.js                 297.59 kB │ gzip: 104.17 kB
✓ built in 1.87s
```
