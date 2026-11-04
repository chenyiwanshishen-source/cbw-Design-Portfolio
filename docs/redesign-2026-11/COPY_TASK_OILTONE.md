# 任务：用 oil-tone 修订首页和三个案例页的文案

`CASE_TASK_YE.md` 做完后再做这个任务。只改文案，不改结构、样式和组件。

## 1. 准备 oil-tone

oil-tone 是一份中文文案规范（Skill），仓库：https://github.com/oil-oil/oil-tone 。克隆到仓库外面，不要放进本仓库：

```bash
git clone --depth 1 https://github.com/oil-oil/oil-tone.git /tmp/oil-tone
# 可选：装进 Codex，以后用 $oil-tone 调用
mkdir -p ~/.codex/skills && cp -R /tmp/oil-tone/skills/oil-tone ~/.codex/skills/oil-tone
```

先完整读 `/tmp/oil-tone/skills/oil-tone/SKILL.md`，本任务的所有改写都按它的规则来。

## 2. 开新分支

```bash
cd "/Users/chenbaiwan/Desktop/简历/AI产品设计师作品集框架-homepage"
git status                        # 有未提交改动先停下来问本人
git checkout redesign/case-ye
git checkout -b redesign/copy-pass
```

只提交到 `redesign/copy-pass`。不合并、不 push。

## 3. 范围

只改这四个文件里的文案字符串：

- `src/app/home/content/zh.ts`
- `src/app/cases/content/qsight.ts`
- `src/app/cases/content/qixin.ts`
- `src/app/cases/content/ye.ts`

本任务是文案修订任务，AGENTS.md 里"文案逐字使用"一条在本任务中由本文件代替。

## 4. 必改项（本人已确认，逐字替换）

| 文件 · 位置 | 改前 | 改后 |
|---|---|---|
| zh.ts · qixin-brain `period` | `2020–2026` | `2021–2026` |
| zh.ts · qixin-brain `meta` | `合合信息 · 启信产业大脑 · 2020 — 2026` | `合合信息 · 启信产业大脑 · 2021 — 2026` |
| zh.ts · qixin-brain `action` | `我从 2020 年开始负责这个产品` | `我从 2021 年开始负责这个产品` |
| qsight.ts · header `label` 和 ui `footer` | `QSIGHT` | `Qsight`（两处都改，只改大小写） |
| qsight.ts · header `intro` | `跟进至 1.0 上线。` | `一直跟到 1.0 上线。` |
| qsight.ts · 定义问题 | `设计重点是把范围与大纲确认前置，让生成过程可见、正文来源可追溯。` | `所以设计的重点是：在生成之前先确认范围和大纲，生成时让过程看得见，生成后每段正文都能查到来源。` |
| qsight.ts · 三轮访谈 | `并结合竞品和低保真原型讨论，确定优先级。` | `再结合竞品分析和低保真原型讨论，确定先做哪些。` |
| qsight.ts · 问题卡"怕跑偏" | `先确认范围和结构，减少生成后的返工。` | `结构或数字一旦跑偏，生成后就要大量返工。` |
| qsight.ts · 问题卡"难核查" | `来源就近可查，历史报告可以复用。` | `数字找不到出处，旧报告也没法接着用。` |
| qsight.ts · Prompt 小节标题 | `Prompt 从完整控制台，收敛为四个模块` | `Prompt 从完整控制台，缩减为四个模块` |
| qsight.ts · Prompt 小节正文 | `配置收敛为任务定义、工具编排、质量门禁、容错兜底，保留后续扩展边界。` | `配置缩减为任务定义、工具编排、质量门禁和容错兜底四个模块。` |
| qsight.ts · 结果反馈 | `用户反馈整体符合预期：资料查找和整理更集中，内容的来源也更容易确认。` | `试点客户的反馈是：资料查找和整理更集中了，内容的来源也更容易确认。` 后面加一个 TodoNote：`【待填：一句客户原话，注明是谁、在什么场合说的】` |
| qsight.ts · 反思 | `随着模型能力提升，需要写死的规则正在减少。我的反思是：把系统必须保证的体验与模型可以自主判断的表达分开，才能持续维护。` | `模型越来越强，需要写死的规则越来越少。所以我把两件事分开：系统必须保证的体验（先确认、有来源、缺失要标出来）用规则守住，怎么表达交给模型判断。` |
| qixin.ts · 挑战 | `数据与功能分散，用户很难连续完成定位范围、筛选目标、判断价值、跟进管理和输出结果。问题不在缺少某个功能，而在工作路径被拆散。` | `数据与功能分散，用户很难连续完成定位范围、筛选目标、判断价值、跟进管理和输出结果。` |
| qixin.ts · 首页工作台 | `我把首页改成任务看板：报告入口、动态信息、业务概览、常用功能，让不同角色进来就能开始查询、判断和跟进。` | `我把首页改成任务看板，分成报告入口、动态信息、业务概览和常用功能四块，不同角色进来就能直接开始查询、判断和跟进。` |

同一句话如果在别的字段里重复出现（比如图注、目录），一起改成一致。

## 5. 再按 oil-tone 通读一遍

必改项做完后，按 SKILL.md 的「完稿检查」把四个文件的文案通读一遍，可以再改读起来拗口、关系没讲完整或有套话的句子。边界：

- **不改事实：** 数字、时间、人数、产品名、角色、用户原话（带引号的句子）一律不动。
- **不补新内容：** 不加材料里没有的经历、反馈、效果和感悟。
- **不动 `【待填】`：** 原样保留。
- **标题只改措辞，不改判断。** 拿不准就不改，写进报告的"建议"一栏。

运行脚本检查每个文件：

```bash
python3 /tmp/oil-tone/skills/oil-tone/scripts/tone_lint.py src/app/cases/content/qsight.ts
```

`qixin.ts`、`ye.ts`、`zh.ts` 同样跑一遍。脚本的提示只作参考，结合上下文决定改不改。

## 6. 修订报告

新建 `docs/redesign-2026-11/copy-pass-report.md`，三部分：

1. 必改项：逐条打勾。
2. 第 5 步额外改了哪些：表格，列出文件、改前、改后、理由（一句话，对应 SKILL.md 哪条规则）。
3. 建议但没改的：表格，列出文件、原句、建议、为什么没改。

## 验收

- [ ] 新分支 `redesign/copy-pass`，只改了上面四个文件和新建的报告。
- [ ] 必改项全部完成；首页启信卡片和案例页的年份一致。
- [ ] 四个文件都跑过 `tone_lint.py`，结果写进报告。
- [ ] 页面结构和样式没有变化；`npm run build` 通过。

做完停在 `redesign/copy-pass`，列出提交记录和报告路径。
