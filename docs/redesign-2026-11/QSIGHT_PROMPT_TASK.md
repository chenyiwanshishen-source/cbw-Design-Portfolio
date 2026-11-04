# 任务：把 Qsight 的 Prompt 部分精简后放进新页面

在新分支 `redesign/qsight-prompt` 上做（从 `redesign/explorations` 切出）。只改 `src/app/cases/content/qsight.ts` 里 `qsight-04` 这一章，不改组件、样式、路由，也不动其他章节。

```bash
cd "/Users/chenbaiwan/Desktop/简历/AI产品设计师作品集框架-homepage"
git status                        # 有未提交的改动先停下来问本人
git checkout redesign/explorations
git checkout -b redesign/qsight-prompt
```

不要 push、不要合并、不要动 `main` 和其他分支。

## 为什么改

旧作品集（`AI产品设计师作品集框架/src/app/components/ProjectDetail.tsx`）里 Prompt 占了七块：工作流位置图、编译器动画、四个模块、用户/产品/研发/模型四个维度共 8 条取舍、三份 Prompt 原文的全文查看器、10+1 控制台说明、三张反思卡。内容太多，读的人抓不到重点。

新页面这一章现在只有"暂不做可视化 Prompt 后台"一节，讲了结构，读者看不到 Prompt 实际挡住了什么。国内外岗位的 JD 都在要"为结果不确定的 AI 设计规则和界面"，这一章要能回答这个。

按旧稿的取舍：保留工作流位置、四个模块、四维里的 2 条取舍、一段 Prompt 原文的正反样例和自检清单、编译器；全文查看器、动画、10+1 的细节、三张反思卡不放进案例页。

## 改什么

`qsight-04`（label 保持"提示词优化"）：

1. 章节 `title` 由 `1.0 的范围与落地` 改为 `生成过程和 Prompt`。
2. 第一个 subsection `显示执行进度和异常` **原样保留**，包括 PLATE 08。
3. 把第二个 subsection `暂不做可视化 Prompt 后台` 整个替换成下面三个 subsection。顺序不变，放在 `显示执行进度和异常` 后面。
4. PLATE 编号：新增的「Agent 报告生成工作流」占位图用 PLATE 09，原来的控制台原型图顺延为 PLATE 10；后面章节的编号随之顺延。

文案逐字使用。`【待填：…】` 原样渲染为 `TodoNote`，不要自己补内容。

---

### subsection 1：`Prompt 放在流程的哪一步`

`paragraph`：
报告是由 Agent 一章一章生成的。我写的 Prompt 跑在"章节生成"这一步。

`figures`（占位）：
- plate：PLATE 09
- title：Agent 报告生成工作流
- instruction：要放：Agent 报告生成工作流，章节生成节点高亮
- caption：我的 Prompt 运行在"章节生成"这一步。

`paragraph`：
最初规划的 Prompt 控制台有 10+1 个模块。1.0 研发资源有限，我们不做可视化配置后台，先把 Prompt 拆成四个模块，由团队自己维护。

`layers`：
- 任务定义｜目标、身份、成功标准
- 工具编排｜要什么输入，按什么顺序调用哪些工具
- 质量门禁｜约束边界、输出格式、异常怎么处理
- 容错兜底｜兜底办法和交付前的自检清单

`paragraph`：
当时 Agent 框架刚搭起来。我让 Prompt 和执行步骤一一对应，关键步骤没通过校验就重试或走兜底，避免错误传到后面的章节。

`paragraph`：
验证规则时，我先用能力较低的模型跑，因为强模型容易把规则里的漏洞盖住。换到生产用的模型后，再对比通过率、重试率、来源覆盖率和成本。【待填：这个对比是否已经做过，结果如何】

`figures`（占位，沿用原来的）：
- plate：PLATE 10
- title：没有上线的控制台原型
- instruction：要放：没有上线的控制台原型
- caption：未上线的 Prompt 控制台原型。1.0 先采用分模块维护的方式。

---

### subsection 2：`一个章节的 Prompt 里写了什么`

`paragraph`：
以"重点企业监测"这一章为例。它只要纯文本的"分类 + 简报 + 来源链接"，不要总结，不要图表，也不要表格。【待填：为什么这样要求，是业务方提的，还是测试后发现的】

`columns`：
- 正例｜分成融资和新品、榜单、获奖三类，每家企业一条简报，后面跟来源链接。
- 反例｜分类开头写了一句"本月呈现上升趋势"，后面还附了一张融资金额表。两处都算违规。

`paragraph`：
Prompt 最前面还有一条规则：用户的明确要求永远大于系统提示词，两者冲突时听用户的。交付前，模型要先过一遍自检清单，一共 6 项，比如：是否已全局去重，每条信息只留一个来源；是否排除了任何形式的总结、图表和表格。

---

### subsection 3：`用编译器写各章的 Prompt`

`paragraph`：
不同章节各有一份 Prompt。靠个人经验手写，写法容易分散，也不好维护。

`flow`（一行，highlight 第 2 步）：
团队成员用大白话说需求 → Google AI Studio 里的提示词编译器 → 完整可部署的章节 Prompt

`paragraph`：
我在 Google AI Studio 里搭了一个提示词编译器。团队成员输入业务诉求，它按统一的结构生成章节 Prompt。【待填：现在谁在用，已经生成过几个章节的 Prompt】

---

## 不要做的

- 不放 Prompt 全文，不做原文查看器，不做编译器动画。
- 不写 M01–M09 这类模块编号。
- 不写任何旧稿里的数字，例如"提示词编写时间从 2 小时缩短到 30 分钟"，那是模板里的示例，不是真实数据。
- 编译器的"自动化生成工具"只是构思，不要写成已经完成或已经推广。
- 不新增任何经历、效果或数据。本文件没写到的事实，一律用【待填】。
- 旧稿里的"团队价值 / 个人价值 / 工作洞察"三张反思卡先不放，之后并进本人写的"项目反思"。

## 写完后

1. 对 `qsight.ts` 跑 `python3 /tmp/oil-tone/skills/oil-tone/scripts/tone_lint.py src/app/cases/content/qsight.ts`；没有的话先 `git clone --depth 1 https://github.com/oil-oil/oil-tone.git /tmp/oil-tone`。
2. 按 Humanizer-zh（`/tmp/humanizer-zh/SKILL.md`）自查这一章：不出现对仗金句、"不是……而是……"、凑三条。文案是本人语气，只改明显读不通的地方，改动要写进报告。
3. 在测试环境（`http://localhost:5174/#/project/ai-report`）把这一章从头读一遍：只读小标题和每段第一句，看能不能讲完；再连着读正文；最后检查 375 / 768 / 1440 宽度没有横向滚动。
4. 新建 `docs/redesign-2026-11/qsight-prompt-report.md`：列出改了什么、PLATE 新编号、没改和拿不准的地方。
5. `npm run build` 通过后提交，提交信息用中文。

## 验收

- [ ] 只改了 `qsight.ts` 的 `qsight-04`；其他章节文字未变。
- [ ] `显示执行进度和异常` 原样保留。
- [ ] 新增三个 subsection，文案与本文件逐字一致；四处【待填】为 `TodoNote`。
- [ ] 没有 `<img>`；PLATE 编号连续。
- [ ] `tone_lint.py` 已跑；`npm run build` 通过；报告已生成。
