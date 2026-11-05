# 任务：启信产业大脑，改第一部分（开头 + 问题）

只改 `src/app/cases/content/qixin.ts` 的 `header`、`opening`、`qixin-01` 三处。其余章节（qixin-02 到 qixin-06）、`toc`、`timeline`、`hero` 不动。不改组件、样式、其他文件。

## 1. 开分支

```bash
cd "/Users/chenbaiwan/Desktop/简历/AI产品设计师作品集框架-homepage"
git status                      # 有未提交改动先停下来问本人
git checkout redesign/qsight-prompt
git checkout -b redesign/qixin-open
```

只提交到 `redesign/qixin-open`。不合并、不 push。并在 `AGENTS.md` 分支列表里照前面几条的格式补一行：`启信开头任务分支：redesign/qixin-open（从 redesign/qsight-prompt 切出），任务文件 docs/redesign-2026-11/QIXIN_OPEN_TASK.md`。

## 2. 改什么

### 2.1 `header.intro`（逐字替换）

> 启信产业大脑是给政府招商、产业分析和区域经济管理用的企业数据平台。

只留这一句。角色和范围挪到下面的信息块里，不在 intro 重复。

### 2.2 `opening`：改成四行信息

先看 `src/app/cases/types.ts`，`opening` 里允许哪些 block。优先用已有的 `columns`（items 是 `{label, text}`）。如果 `opening` 不允许 `columns`，就用 `metrics` 的 items 承载，不新增 block 种类，也不改组件。

四行，逐字：

| label | text |
|---|---|
| 我的角色 | 2021 年起的主要设计师 |
| 时间 | 2021–2026 |
| 我负责的 | 自定义产业链、首页工作台；与两位设计师从零搭建组件库 |
| 结果 | 本地产业链构建周期从 1–2 周缩短到 2–3 天 |

`note` 保留一行：`项目记录，统计方式待补充。【待填：这个数是谁统计的、取了多少样本】`

数字 1–2 周、2–3 天已有，沿用，不改。

### 2.3 `qixin-01`（挑战）

- `label` 保持“挑战”（toc 要对得上），`title` 由“分散的任务流程”改成 `问题`。
- blocks 改成两个 `paragraph`，逐字：

> 产业大脑多年迭代，功能越来越多，数据和操作入口分散。用户从圈定范围到输出结果，很难在系统里连续做完。

> 改版前，用户卡住的地方主要在沟通上。【待填：一个具体例子，谁和谁之间、为了什么事、结果怎样】

## 3. 不能做的

- 不新增任何经历、数字、团队规模、用户数、感受、效果。
- 不加格言、金句、总结句；小标题平实，不对仗。
- 其他模块（企业画像、跟进管理等）不放进开头，开头只写第 2.2 节那几项。
- `【待填】` 保留，不要自己填。
- 不要写成一个人完成全部工作：组件库必须写“与两位设计师”。
- 文案逐字使用，不润色。

## 4. 验收

- 本地起 `npm run dev`（端口 5174），打开启信案例页，截一张开头到“问题”这一屏的图。
- `npm run build` 通过，且 `tokens` 规则不违反。
- 提交说明用中文，写清改了哪三处。
- 最后列出：用了 `columns` 还是 `metrics`，以及为什么。
