# 任务：重做「AI 探索」页，并填上首页「AI 工作流」区块

`STORY_TASK.md` 做完后再做。先读 `AGENTS.md`、`DESIGN.md`。版式和三个案例页一致，复用 `src/app/cases/components/` 和 `STORY_TASK.md` 新增的 `flow`、`layers`、`statement` 图解块。文案逐字使用本文件，`【待填】` 原样保留。

## 开新分支

```bash
cd "/Users/chenbaiwan/Desktop/简历/AI产品设计师作品集框架-homepage"
git status                        # 有未提交改动先停下来问本人
git checkout redesign/story
git checkout -b redesign/explorations
```

只提交到 `redesign/explorations`。不合并、不 push。

## 范围

- 新建 `src/app/cases/ExplorationsCase.tsx`，挂在 `#/project/explorations`；旧 `ExplorationsPage.tsx` 保留不删。
- 文案放 `src/app/cases/content/explorations.ts`。
- 首页 `HomePage.tsx` 里 `ai`（AI 工作流）区块目前是 `[待补充]`，按文末「首页区块」替换。
- 不放图片，截图位置用 `FigurePlaceholder`。
- 这一页是四个小项目，不是完整案例：每节一个 H2、一到两段正文、一个图、一行状态。

---

## 页面文案

### 头部
- 标题：我给自己做的设计工具
- 介绍：下面四个工具，都是我在工作里遇到具体问题后，用 AI 编程工具做出来的。产品定义、规则和验收标准由我来定，代码由 AI 协作完成。

`statement`：能确定的交给工具，需要理解的交给 AI，最后的决定留给我。

正文：前面三个案例也是这样分工的。下面每个工具，都能看到同一个判断。

### 01 · 设计系统
**H2：** 从历史设计稿里整理出设计系统，再做成能复用的代码组件

小节「方法：Figma 设计系统工作流」：
正文：我把搭设计系统的步骤写成了一个 Skill，让 AI 在 Figma 里按固定顺序推进。只有一个主 Agent 可以写入 Figma，其他角色只读，负责给出规格和验收。

`flow`（一行）：六方向视觉探索 → 浅色和深色色板 → 基础变量 → 基础体系 → 真实组件族 → 组件库验收

图注：色板阶段固定为每个模式 16 个色系 × 9 级，浅色和深色合计 288 个值。

小节「实践：历史设计稿 → 前端组件库」：
正文：我先审计了一批历史 Figma 页面，整理出完整色板，再写入颜色、字体、间距、圆角、描边和栅格这些基础变量。之后把它们做成 React 组件库，用 Storybook 展示每个组件的尺寸、变体和交互状态。

`MetricRow`（3 项）：6 类 · 基础变量 ｜ 9 个 · 基础组件 ｜ 88 个 · 单元测试

PLATE 01 · Figma 基础变量 ｜ PLATE 02 · Storybook 组件页

状态：Figma 工作流已开源（https://github.com/chenyiwanshishen-source/figma-design-system-workflow）；组件库持续维护中。

### 02 · Figma 连接器
**H2：** 让 AI 直接改 Figma 文件，但每次写入都能撤回

正文：这是一个本地 MCP 服务加 Figma 插件。支持 MCP 的 AI 客户端可以通过它读取和修改当前打开的 Figma 文件，整条链路只在本机运行，不需要 API Key。

`flow`（一行，highlight 第 3 步）：AI 客户端 → 本地 MCP 服务 → Figma 插件在文件里执行 → 结果回传给 AI

正文：每次任务开始前，插件会先给节点拍快照，出错就自动撤回这次新建的节点。写入时优先调用设计系统里的组件、变量和样式，不硬写数值。插件面板会显示当前是在等待、读取还是写入。

PLATE 03 · 连接器面板

状态：已开源（https://github.com/chenyiwanshishen-source/figma-connector-figma-）

### 03 · Visual Code Canvas
**H2：** AI 写完前端以后，样式微调我在画布上直接改

正文：用 AI 写前端代码很快，但改一个间距、一个颜色，还要再描述一遍、再等一轮，微调成了新的成本。Visual Code Canvas 让我在画布上选中页面元素，直接改数值，改动会写回源码。

`flow`（一行）：选中页面元素 → 找到对应源码 → 在面板里改数值 → 写回源码 → 页面实时更新

正文：数值、颜色、文字这类能确定的改动，由工具直接写回，不消耗 AI token；结构调整、组件拆分这类需要理解的改动，才交给 Codex。代码始终是唯一的真实来源，画布不另存一份样式。

PLATE 04 · 画布与属性面板（可用动图）

状态：v0.2.1 已发布，支持 Next.js 和 Vite React 项目（https://github.com/chenyiwanshishen-source/visual-code-canvas）。第一版是一个 VSCode 插件，后来重做成了现在的样子。

### 04 · 插画 Skill
**H2：** 让 AI 画插画，先教它画出像真的控件

正文：Micro-UI 插画 Skill 是我给 AI 写的一套矢量插画规则，用来画封面、功能插画和空状态。这个作品集的封面、ye! 的空状态图和组件库的封面，都是用它画的。

正文：AI 直接画界面插画，常常用空白卡片和几条灰色横条凑出一个"界面"，看不出画的是什么工具。我把自己画插画时的判断写成了规则：

`columns`（3 项）：
- 真实控件切片：主体必须是认得出的工具或控件，不靠灰色横条凑
- 分层构图：底板、中景控件、前景焦点，每一层都要服务主题
- 最小 16 像素：在实际展示尺寸下，每个色块至少 16 像素，放不下就删减

`flow`（一行）：画完 → 渲染成图 → 打开看图 → 指出具体问题 → 修改后再复查

图注：Skill 要求 AI 每次画完都走一遍这个检查，文件能导出不算通过。

作品墙（三列，6 个占位）：PLATE 05 · 作品集封面 ｜ PLATE 06 · 作品集封面 ｜ PLATE 07 · 组件库封面 ｜ PLATE 08 · ye! 书签空状态 ｜ PLATE 09 · ye! 页签空状态 ｜ PLATE 10 · ye! 搜索空状态

状态：已迭代 4 个版本，准备开源。【待填：开源后的仓库链接】

### 案例切换
← 上一个案例：我只说想法，AI 负责把书签分好（`#/project/ye-browser`）｜ 回到首页（`#/`）

---

## 首页区块（`HomePage.tsx` 中 `ai` 区块）

- 区块标题保持「AI 工作流」。
- 去掉 `[待补充]`，换成一句说明和四行列表。每行：名称 · 一句话 · 状态，整行链接到 `#/project/explorations`。样式参照经历区块的列表，细线分隔，不做卡片。

说明：我给自己做的设计工具，都用 AI 编程工具完成。

| 名称 | 一句话 | 状态 |
|---|---|---|
| Figma 设计系统工作流 | 让 AI 按固定步骤在 Figma 里搭设计系统 | 已开源 |
| Figma 连接器 | 让 AI 直接改 Figma 文件，每次写入都能撤回 | 已开源 |
| Visual Code Canvas | AI 写完前端后，在画布上直接改样式并写回源码 | v0.2.1 |
| 插画 Skill | 让 AI 画出像真的控件的矢量插画 | 准备开源 |

文案放进 `src/app/home/content/zh.ts`，导出为 `aiTools`。

## 外部链接

GitHub 链接用 `<a href target="_blank" rel="noreferrer">`，显示文字为「GitHub」，不显示完整网址。

## 验收

- [ ] 新分支 `redesign/explorations`；`#/project/explorations` 显示新页面，旧文件仍在。
- [ ] 四节齐全，目录可跳转、当前章节高亮；页面只有一个 `statement`。
- [ ] 无 `<img>`，占位框 PLATE 01–10；`【待填】` 为 `TodoNote`。
- [ ] 首页「AI 工作流」区块显示四行，点击进入探索页。
- [ ] 375 / 768 / 1440 无横向滚动；`npm run build` 通过。

做完停在 `redesign/explorations`，列出文件和提交记录。
