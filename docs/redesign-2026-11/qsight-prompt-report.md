# Qsight Prompt 章节精简报告

日期：2026-11-04

## 分支与改动范围

- 本人同意先保存此前全部改版进度，已在 `redesign/explorations` 提交 `1891da5`（作品集：保存当前改版页面与素材进度）。
- 从上述提交建立 `redesign/qsight-prompt`。本任务仅改 `src/app/cases/content/qsight.ts` 的 `qsight-04`，并新增本报告。
- 没有修改组件、样式、路由或其他章节，没有新增依赖。没有推送、合并或部署。
- 核对 `main` 及旧作品集工作区 `../AI产品设计师作品集框架` 的 HEAD 均与执行前一致；没有向旧工作区写入文件。

## 完成内容

- 章节标题改为「生成过程和 Prompt」，label 保持「提示词优化」。
- 「显示执行进度和异常」及 PLATE 08 数据完整保留。
- 将原「暂不做可视化 Prompt 后台」替换为任务指定的三个 subsection：
  - Prompt 放在流程的哪一步：工作流图位、四个维护模块、校验与模型验证说明、原控制台图位。
  - 一个章节的 Prompt 里写了什么：正反例、用户要求优先、自检清单说明。
  - 用编译器写各章的 Prompt：一行流程，第二步高亮，保留使用情况待填。
- 文案从任务文件提取，段落逐字核对通过；未进行润色改写。Humanizer-zh 自查未发现必须改写的明显不通顺处。
- 复用现有 layers、columns、flow、figures、paragraph 和 TodoNote 渲染能力。没有 Prompt 全文查看器、动画、模块编号、反思卡或新增效果数据。

## PLATE 编号

| 编号 | 内容 | 处理 |
| --- | --- | --- |
| PLATE 08 | 执行过程 | 原样保留 |
| PLATE 09 | Agent 报告生成工作流 | 新增占位，提示章节生成节点高亮 |
| PLATE 10 | 没有上线的控制台原型 | 原 PLATE 09 顺延 |

本章编号为 08、09、10，连续。qsight-05、qsight-06 没有 PLATE，因此没有需要继续顺延的编号。前面章节已有编号情况不在本次范围内，未调整。

## 待确认与任务文字差异

任务验收写「四处【待填】」，但指定文案实际只有三处。已逐字保留这三处，未自行新增第四处：

1. 【待填：这个对比是否已经做过，结果如何】
2. 【待填：为什么这样要求，是业务方提的，还是测试后发现的】
3. 【待填：现在谁在用，已经生成过几个章节的 Prompt】

现有组件在页面中将以上三处均渲染为带 `data-todo-note` 的 TodoNote。模型对比是否已完成、纯文本结构的决策来源、编译器的实际使用者与章节数量仍待本人补充；本次没有验证业务事实，也没有补造结果。

任务中的「自动化生成工具」仍为构思，本次没有将其写成已经完成或推广。三张项目反思卡没有迁入。

## 验证

- `python3 /tmp/oil-tone/skills/oil-tone/scripts/tone_lint.py src/app/cases/content/qsight.ts`：PASS，no wording hints。
- 按 `/tmp/humanizer-zh/SKILL.md` 通读本章，未改任务文案。没有新增对仗金句、假对比或强凑列举。
- 在本地页面 `http://localhost:5174/#/project/ai-report` 使用独立无界面 Chrome 检查，没有操作用户正在使用的浏览器。
- 先核对小标题与各段首句，再连读页面正文。顺序为生成过程 → Prompt 所在位置及维护取舍 → 具体章节规则 → 编译器使用方式。
- 375 / 768 / 1440px：document.scrollWidth 分别为 375 / 768 / 1440，无页面横向滚动。
- 三种宽度均显示四个小节、三处 TodoNote、第二步流程高亮，本章 `<img>` 数量为 0。
- 已检查 375px 与 1440px 本章截图；现有组件在窄屏纵向排列，无重叠。截图位于 `/tmp/qsight-prompt-375.png`、`/tmp/qsight-prompt-768.png`、`/tmp/qsight-prompt-1440.png`，测量记录 `/tmp/qsight-prompt-browser.json`（临时验证产物，不提交）。
- `npm run build`：通过，2072 modules transformed。
- `git diff --check`：通过。
- 程序核对 qsight-04 之前和之后的文件内容字节一致；原首个 subsection 对象一致；所有任务指定段落逐字一致。

没有修改开场动画、导航交互和其余页面；此次验证聚焦指定章节，没有将未执行的全站交互回归记作通过。
