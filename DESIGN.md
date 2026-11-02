# 设计规范 · 陈俊学作品集

所有页面和组件都按这份规范实现。颜色、字号等数值以 `src/styles/tokens.css` 为准，这份文件说明它们**怎么用**。项目是 Tailwind v4，token 写在 `@theme` 里，会同时生成 CSS 变量和工具类。

---

## 2026-11-02 用户参考修订

用户指定 Elly Hsieh 的白底、轻字重大标题和宽幅项目排版，以及 Daryl 的蓝图揭幕思路。本次首页覆盖下文旧暖白与常驻网格规范：纯白底；中性灰占位；取消标尺数字；姓名与身份放大且使用 400 字重；照片置于右上；正文完整保留在标题下方；案例每项占满版心、取消外框。仍保留 1200px 版心、原文、原路由、图片占位、无滚动锁定和 1.2 秒动画上限。只覆盖首页色彩，不修改案例页。

## 1. 风格一句话

**设计图纸。** 暖白底铺淡蓝网格，内容像图纸上的成品：直角、细线、单一蓝色、等宽字体做标注。个性只出现在两处：首页开场的「线框 → 成品」动画，和截图上的蓝色编号批注。其余部分保持安静，让作品截图说话。

## 2. 版心：固定 1200px，不做通栏

- 所有内容（导航、首屏、案例卡片、页脚）都放在**同一个 1200px 版心**里，水平居中：`mx-auto w-full max-w-content`。
- **不做通栏**：没有铺满屏幕宽度的色块、横幅、通栏图片或通栏卡片。页面上唯一铺满全宽的是 `body` 的网格底纹。
- 屏幕窄于 1200px + 两侧留白时，版心随屏幕缩小，左右留白 `px-5`（20px），并兼容刘海屏安全区：
  `padding-inline: max(var(--gutter-x), env(safe-area-inset-left))`。
- 版心内部的栅格：12 列，列间距 24px（`gap-6`）。首屏文字占 8 列、照片占 4 列；案例卡片文字区占 5 列、展示区占 7 列。

## 3. 颜色

| 用途 | Token | Tailwind 类 |
|---|---|---|
| 页面底色 | `--color-bg` | `bg-bg` |
| 卡片 / 界面片段 | `--color-surface` | `bg-surface` |
| 图片占位 | `--color-surface-sunken` | `bg-surface-sunken` |
| 案例展示区 | `--color-surface-tint` | 用 `.surface-tint`（带 24px 网格） |
| 标题文字 | `--color-text` | `text-text` |
| 正文 | `--color-text-body` | `text-text-body` |
| 说明文字 | `--color-text-secondary` | `text-text-secondary` |
| 日期、等宽标签 | `--color-text-meta` | `text-text-meta` |
| 大字里的灰色部分 | `--color-text-display-muted` | `text-text-display-muted` |
| 分割线 | `--color-border` | `border-border` |
| 卡片边框 | `--color-border-subtle` | `border-border-subtle` |
| 强调 | `--color-accent` | `text-accent` / `bg-accent` |

规则：
- **只有一种强调色。** 蓝色用于链接、主按钮、批注圆点、开场线框。不要引入第二种装饰色。
- `--color-text-meta` 是最浅的可读灰，**不要再调浅**；`--color-text-display-muted` 只用在 ≥ 32px 的文字上。
- **状态色只表达状态。** 绿 / 橙 / 红只出现在界面片段里的状态点、提示条上。
- **Qsight 四类来源色**（`--color-source-*`）只在 Qsight 案例里使用，底色和文字色成对出现。
- 组件里不写十六进制色值，也不用 Tailwind 自带色板（`text-gray-500`、`bg-blue-600` 等）。

## 4. 字体与排版

- **中文 / 正文：** Noto Sans SC（`font-sans`）
- **数字、日期、标注、代码：** JetBrains Mono（`font-mono`）
- 字重只用 400 / 500 / 700。

| 层级 | 类名 | 字号 / 行高 | 用在哪里 |
|---|---|---|---|
| Display | `text-display` | 48–104px / 1.05 | 首页姓名，全站只出现一次 |
| H2 | `text-h2` | 28 / 1.3 | 版块标题 |
| H3 | `text-h3` | 26 / 1.35 | 案例卡片标题、案例页小节标题 |
| H4 | `text-h4` | 20 / 1.4 | 卡片内小标题、指标数字 |
| Lead | `text-lead` | 20 / 1.5 | 首页问候语、身份一行 |
| Body LG | `text-body-lg` | 18 / 1.85 | 首页介绍段落 |
| Body | `text-body` | 15 / 1.8 | 正文 |
| Caption | `text-caption` | 13 / 1.6 | 说明、批注解释 |
| Micro | `text-micro` | 12 / 1.5 | 界面片段里的文字、标签 |
| Label | `text-label` | 11 / 1，字距 0.08em | 等宽标注（`CASE 01`、`PLATE 01`） |

规则：
- 新组件不要用 Tailwind 自带的 `text-xs / text-sm / text-base / text-lg`，用上表的类名。
- 段落最大宽度 `max-w-measure`（约 38 个汉字一行）。
- 标题加 `text-balance`。
- 等宽标注英文用大写。
- 对齐的数字加 `tabular-nums`。

## 5. 间距

- 基准 4px，直接用 Tailwind 默认间距：`1`=4、`2`=8、`3`=12、`4`=16、`5`=20、`6`=24、`8`=32、`10`=40、`12`=48、`14`=56、`16`=64、`24`=96。不要用这个阶梯之外的值（例如 `p-7`、`mt-[18px]`）。
- 自定义 CSS 里用 `var(--space-*)`，数值与上面相同。
- 兄弟元素之间用 flex / grid 的 `gap`，不用单独的 margin。
- 常用间距：版块之间 `24`（96px）；版块标题到内容 `6`；卡片内边距 `10`（手机端 `6`）。

断点（Tailwind 默认）：

| 名称 | 宽度 | 变化 |
|---|---|---|
| 手机 | < 768px | 全部单列；首屏照片排到文字下方 |
| `md` | 768–1023px | 案例卡片文字区和展示区上下堆叠 |
| `lg` | ≥ 1024px | 首屏 8 / 4 两栏；案例卡片 5 / 7 两栏 |
| ≥ 1240px | | 版心固定 1200px，两侧留空 |

## 6. 形状、边框、阴影

- **直角。** 卡片、按钮、标签、输入框都不加 `rounded-*`。只有状态圆点和编号批注用 `rounded-full`。
- **边框 1px。** 分割线 `border-border`，卡片边框 `border-border-subtle`。
- **阴影只给「浮起来的界面片段」**（`shadow-float`）。卡片、按钮不加阴影。

## 7. 组件规范

### 7.1 顶部导航 `SiteHeader`
- 在 1200 版心内，高度 72px，上下 `py-6`。
- 左：方形描边 Logo「陈」（32×32，1px 蓝色描边）+「陈俊学 · 产品设计师」，`text-body`，500。
- 中：`案例` `AI 工作流` `经历` `关于`，**必须是 `<a href>`**，`text-caption`，`text-text`，hover 变 `text-accent`。
- 右：状态标签「● 在找新机会 · 上海」：7px 绿色圆点（`bg-success`）+ `font-mono text-micro`，白底 1px `border-border` 边框，`px-3 py-1.5`。
- 手机端换行，不做汉堡菜单。

### 7.2 标尺行 `Ruler`
- 上方 1px `border-border`，`py-2`；左侧等宽小字 `00 · 02 · 04 … 16`（`font-mono text-label text-text-meta`，`aria-hidden="true"`）；右侧文字按钮「↻ 重播开场」。

### 7.3 首页介绍 `Intro`
1200 版心内 12 列栅格：左 8 列文字，右 4 列照片。上下 `py-16`。

左栏自上而下，间距 `gap-8`：
1. 问候：`text-lead font-medium text-text-secondary`
2. 姓名：`text-display font-bold`；拼音同行，`font-normal text-text-display-muted`
3. 身份：`text-lead text-text-meta`（紧跟姓名，间距 `gap-3.5` 内含在姓名块里）
4. 介绍段落 × 3：`text-body-lg text-text-body max-w-measure`，段间距 `gap-5`
5. 更新日期：`text-caption text-text-meta`

右栏：4:5 照片（`aspect-[4/5]`，1px `border-border`），下方 `font-mono text-label text-text-meta` 说明 `PLATE 01 · 人像 · 4:5`。

行内链接：
- 公司名、邮箱、微信、「下载我的简历」：`text-text`，下方 1px 实线 `border-border`。
- 学校、城市：下方 1px 点线（`border-dotted`，颜色 `--color-text-display-muted`）。
- hover：下划线变 `--color-accent`，过渡 `var(--dur-fast)`。

### 7.4 按钮
| 类型 | 样式 |
|---|---|
| 主按钮 | `bg-accent text-on-accent`，直角，`min-h-[var(--touch-target)] px-5`，`text-body font-medium` |
| 次按钮 | 透明底，1px `border-text` 边框，其余同主按钮 |
| 文字按钮 | 无边框，`text-accent`，用于「阅读案例 →」「↻ 重播开场」 |

### 7.5 标签 `Tag`
- 1px `border-border-subtle`，`text-micro text-text-secondary`，`px-2.5 py-1`，直角。

### 7.6 等宽标注 `Eyebrow`
- `font-mono text-label text-accent`。
- 内容必须是真实信息（公司 · 项目 · 时间），不要用无意义的编号装饰。

### 7.7 案例卡片 `CaseCard`
- 宽度等于版心（1200），**不超出版心**。白底，1px `border-border-subtle`，直角。
- `lg` 及以上：左 5 列文字区（`p-10`），右 7 列展示区（`.surface-tint p-8`，左边框 1px `border-border-subtle`）。
- 文字区依次：Eyebrow → H3 标题 → 两段描述（`text-body`）→ 指标行（上方 1px 分割线，数字 `text-h4 font-bold tabular-nums`，说明 `text-caption`）→ 标签 → 文字按钮。
- 展示区放 3~4 块**裁切过的真实界面片段**，不要放整屏截图。
- `lg` 以下上下堆叠，展示区左边框改为上边框，内边距降到 `p-6`。
- 三张卡片纵向排列，间距 `gap-6`。

### 7.8 编号批注 `Annotation`
- 圆点：18×18，`bg-accent text-on-accent rounded-full`，等宽数字 10px。
- 放在截图里需要说明的位置；展示区底部用同样编号的列表解释，列表上方 1px 虚线 `border-border-dashed`。
- 每张截图最多 3 个批注。

### 7.9 界面片段 `UiFragment`
- `bg-surface`，1px `border-border-tint`，`p-4`。
- 需要强调「浮起」的那一块加 `shadow-float` 和 1px `border-accent`，每个展示区最多一块。

## 8. 动效

- **全站只有一处主动效：** 首页首屏开场（线框 → 成品）。
- 其他动效只允许：hover 颜色变化（`var(--dur-fast)`）、链接下划线变色。
- 不使用滚动锁定、视差、滚动触发的入场动画、鼠标跟随、粒子背景。
- 所有动效在 `prefers-reduced-motion: reduce` 下关闭（tokens.css 已把时长归零，JS 里也要判断）。

### 开场动画
- 首屏各区块先显示蓝色虚线框 + 斜线填充（`var(--hatch)`）+ 左上角等宽标签（LABEL / TITLE / COPY / META / PLATE），随后线框淡出、真实内容淡入并上移 8px。
- 线框用 `clip-path: inset()` 从左向右「画」出来，缓动 `ease-draw`；内容淡入用 `ease-settle`。
- 区块延迟 `calc(var(--i) * var(--stagger))`，`--i` 写在每个区块的 style 上。
- 总时长不超过 `--intro-max`（1.2 秒）。
- 真实内容从第一帧就在 DOM 里，动画期间可以滚动和点击；没有加载页，没有「点击进入」。
- 同一会话只播一次（`sessionStorage`，读写放在 try/catch 里，失败时按已播放处理）。
- 动画结束后卸载线框层。
- 不使用 GSAP / Framer Motion（motion 包），纯 CSS `@keyframes` + 少量 JS 测量位置。

## 9. 文案

- 首页姓名、身份、自我介绍由本人定稿，**不要改写**。
- 案例标题写成一件具体的事（「让研究员敢把报告交给 AI 写」），不写「XX 平台设计」。
- 案例描述先讲用户的处境，再讲我做了什么，第一人称，两到三句。
- 小标题写成决策句（「放弃末尾集中来源，改为正文就近绑定」），不用「用户研究」「设计方案」这类流程名。
- 避免：口号、排比、「赋能 / 极致 / 闭环」、冒号后揭晓式句子、破折号插入语。
- 数字只写有依据的；案例里已有的数字不要改动或四舍五入。

## 10. 可访问性

- 链接用 `<a href>`，操作用 `<button>`；不要在 div 上绑点击。
- 正文对比度 ≥ 4.5:1，大字（≥ 24px）≥ 3:1。
- 所有截图有 `alt`，写清截图里是什么界面；装饰元素（网格、标尺、线框）加 `aria-hidden="true"`。
- 可点击区域高度 ≥ 44px。
- 375px 宽度下不出现横向滚动。
- 保留浏览器滚动条（不要用 `scrollbar-width: none` 隐藏）。
