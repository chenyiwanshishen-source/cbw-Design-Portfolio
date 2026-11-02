# 任务：开分支，搭出新首页

先读 `AGENTS.md` 和 `DESIGN.md`。

## 0. 开新分支和独立的本地环境

用 git worktree 在旁边单独开一个工作目录，这样原来的目录（当前在 `redesign/v2`，还有一些未跟踪文件）完全不受影响，新旧两版可以同时在本地打开对比。

```bash
# 在原仓库目录执行
cd "/Users/chenbaiwan/Desktop/简历/AI产品设计师作品集框架"
git status                                   # 确认没有未提交的源码改动
git worktree add -b redesign/homepage ../AI产品设计师作品集框架-homepage main

# 把本次交付的文件复制进新目录（它们在原目录里还是未跟踪状态）
cp AGENTS.md DESIGN.md CODEX_TASK.md ../AI产品设计师作品集框架-homepage/
mkdir -p ../AI产品设计师作品集框架-homepage/src/styles ../AI产品设计师作品集框架-homepage/docs
cp src/styles/tokens.css ../AI产品设计师作品集框架-homepage/src/styles/
cp -R docs/redesign-2026-11 ../AI产品设计师作品集框架-homepage/docs/

# 之后的所有工作都在新目录里进行
cd ../AI产品设计师作品集框架-homepage
npm install
npm run dev -- --port 5174 --strictPort      # 新版：http://localhost:5174
```

- 原目录如果要看旧版，另开终端在原目录 `npm run dev`（默认 5173），两个端口互不干扰。
- 新目录里的 `AGENTS.md` 同样不提交（原仓库的 `.git/info/exclude` 对 worktree 也生效）。
- 开发服务器保持运行，每完成一步在 5174 上检查效果。

提交交付文件：
- `DESIGN.md`、`CODEX_TASK.md`、`src/styles/tokens.css`、`docs/redesign-2026-11/`
- 提交信息：「加入改版设计规范和 token」

## 1. 接入 token（单独提交）
1. `src/styles/index.css` 顶部改为：
   ```css
   @import './tailwind.css';
   @import './theme.css';
   @import './tokens.css';
   ```
2. `src/styles/theme.css`：删除 shadcn 默认的 `:root { … }`、`.dark { … }` 和 `@theme inline { … }` 三块（已确认组件里没有使用 `bg-accent`、`text-muted-foreground` 等对应类）。`@layer base` 里：
   - `@apply border-border outline-ring/50;` 改为 `@apply border-border;`
   - `@apply bg-background text-foreground;` 改为 `@apply bg-bg text-text;`
   - 其余 base 排版规则保留。
3. `src/styles/index.css` 末尾附近的「全局中文字体」那段：删除 `html { font-family … }` 里的 font-family，以及 `html`、`body` 和 `::-webkit-scrollbar` 上隐藏滚动条的规则（字体由 tokens.css 统一设置，滚动条要保留）。
4. `index.html`：`<title>` 改为「陈俊学 · 产品设计师」，`<head>` 里加字体：
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap">
   ```
5. 跑 `npm run build`，确认通过。案例页因为字体和底色变化会有观感差异，这是预期的，不要去修。

提交：「接入设计 token 和字体」

## 2. 清理首页（单独提交）
在 `src/app/App.tsx` 和首页相关组件里移除：
- `PortfolioLoader`（「再等一下! / 百分比 / 点击进入」整套进入流程），打开网址直接显示首页。`portfolioEntered` 之类依赖它的状态一并简化。
- `ScopeCursor`（自定义鼠标）和 `ParticleField`（粒子背景）。
- 首页的 `Hero`、`HeroProjectPeekCard`、`Marquee`、`AboutIntro`、`Skills` 等旧首屏和装饰组件的引用（文件先保留不删，只是首页不再渲染）。
- `index.css` 里的 `.contact-rail*`（右侧悬浮联系方式）以及首页对应组件的渲染。
- 首页用到的 ScrollTrigger 滚动锁定（`homeScroll.ts` 等）。

**不要动** `ProjectRouteLoader`、`ProjectDetail`、`QixinProjectDetail`、`ExplorationsPage` 和路由逻辑，案例页下一个任务再改。

提交：「首页：移除加载页、点击进入和装饰元素」

## 3. 搭首页结构（可以分几次提交）

新建 `src/app/home/` 目录放新组件。所有内容在 1200 版心内（`mx-auto w-full max-w-content`），**不做通栏**。规格见 `DESIGN.md` 第 2、7 节，视觉对照 `docs/redesign-2026-11/reference/homepage.html`。

1. **`SiteHeader`** 顶部导航
2. **`Ruler`** 标尺行（右侧「↻ 重播开场」文字按钮）
3. **`Intro`** 首屏介绍，文案逐字使用：

   > 你好，我是
   > **陈俊学** · Chen Junxue
   > 工业设计背景的 B 端数据应用产品设计师
   >
   > 我之前是合合信息的产品设计师。2020 年加入后，我先做启信宝的 B 端客户端，后来负责启信产业大脑，一套给招商、产业服务和区域治理人员用的企业数据系统，从接手一直迭代到 2026 年。
   >
   > 最近一年，我参与了 AI 报告平台 Qsight 从 0 到 1 的设计，负责核心交互方案和 Prompt 的基础框架，一直跟到 1.0 上线。业余时间，我在做两个自己的工具：一个给设计师用的前端可视化编辑插件，一个浏览器标签整理插件 TabPulse。
   >
   > 毕业于郑州轻工业大学工业设计专业，现在住在上海。你可以发邮件到 18101767127@163.com，也可以加微信 chenbw0610，或者下载我的简历。
   >
   > 更新于 2026 年 11 月

   - 邮箱是 `<button>`，点击复制，旁边显示「已复制」1.6 秒；剪贴板失败时静默。
   - 「下载我的简历」先写 `href="#"` 并加注释 `[待填：简历 PDF 链接]`。
   - 右栏 4:5 照片：先用 `bg-surface-sunken` 占位，居中等宽文字「替换为你的照片」。下方说明 `PLATE 01 · 人像 · 4:5`。手机端排到文字下方。
   - 首屏**不放**数据指标。

4. **`CaseCard`** + 精选案例版块（`id="work"`，H2「精选案例」，右侧等宽标注 `CASE 01 / 03`）。三张卡片的文案在 `docs/redesign-2026-11/portfolio-redesign-spec.md` 第 4.4 节，链接分别指向现有的 `#/project/ai-report`、`#/project/qixin-brain`、`#/project/explorations`。右侧展示区这次先用 `.surface-tint` + 居中等宽文字「[待替换：裁切截图]」占位，不要用旧的整屏截图。
5. 版块占位：`id="ai"`（AI 工作流）、`id="exp"`（经历）、`id="about"`（关于 / 页脚）先放 H2 和一行「[待补充]」。
6. **锚点和路由：** 现有 `App.tsx` 用 `location.hash` 做路由，`#about` 已经是「回首页并滚到关于」（案例页的 `ProjectCaseNav` 和旧 `Nav` 都链接到它）。新首页里：
   - 导航写成 `<a href="#work">` / `#ai` / `#exp` / `#about`。
   - 这四个 hash 都渲染新首页，并在渲染后 `scrollIntoView` 到对应版块（`#about` 的旧行为要保持可用）。
   - 空 hash 和其他非 `#/project/...` 的 hash 也渲染新首页、停在顶部。
   - `#/project/...` 三个路由保持原样。

## 4. 开场动画（单独提交）
- 规则见 `DESIGN.md` 第 8 节「开场动画」。
- 只作用于 `Intro` 区块。
- 「↻ 重播开场」按钮忽略 `sessionStorage` 再播一次。
- 提交：「首页：线框到成品的开场动画」

## 5. 验收
- [ ] 打开首页直接看到内容，没有加载页或点击门槛。
- [ ] 开场动画 ≤ 1.2 秒；刷新不重播；系统开启减少动态效果时不播。
- [ ] 1440 宽度下所有内容都在 1200 版心内，没有通栏元素。
- [ ] 导航四项都是 `<a href>`，能跳到对应版块。
- [ ] 375 / 768 / 1440 宽度下无横向滚动，布局符合 `DESIGN.md` 第 5 节断点。
- [ ] `src/app/home/` 里没有硬编码颜色（搜索 `#[0-9a-fA-F]{3,6}` 和 `rgb(`），没有 Tailwind 自带色板类。
- [ ] 案例页仍能从首页卡片点进去并正常显示。
- [ ] `npm run build` 通过。
- [ ] 首页文案与本文件逐字一致。

做完后停在 `redesign/homepage` 分支上，保持 5174 开发服务器运行，列出改动的文件和每次提交，等本人检查。不要删除 worktree。
