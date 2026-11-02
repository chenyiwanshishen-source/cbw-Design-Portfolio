# 新首页验收记录

日期：2026-11-02。工作分支：`redesign/homepage`，从 `main` 的 `49d34f2f0bfb6d835f3d6c0d7b508d8d45e78dc4` 创建。

工作目录：`/Users/chenbaiwan/Desktop/简历/AI产品设计师作品集框架-homepage`。

## 预览与边界

开发服务器保持运行：[新版首页](http://[::1]:5174/)。启动命令：

```sh
npm run dev -- --host ::1 --port 5174 --strictPort
```

原来的 `127.0.0.1:5174` 已被另一个插件项目占用，首次按任务单启动时报端口占用。未停止该服务；新版绑定 IPv6 回环地址 `::1` 的 5174 端口。请使用上面的明确地址，避免 localhost 被解析到旧服务。

原工作目录仍在 `redesign/v2`；没有修改其中的文件，没有移动 main/redesign/v2 分支指针；未 push、合并或部署。AGENTS.md 仅复制到新目录并保持忽略，不提交。没有新增依赖，package.json 与 package-lock.json 相对 main 无差异。

## 验证结果

- `npm run build` 退出码 0。第 1 步、首页结构、动画实现、最终版本的构建均通过。
- 浏览器：本机 Chrome headless，由现有 Codex runtime 的 Playwright 驱动。没有安装测试依赖到项目。
- 375 / 768 / 1440 下 document.scrollWidth 分别为 375 / 768 / 1440，无横向滚动；版心分别为 335 / 728 / 1200px。
- 375、768 为单列，1440 首屏 8/4、案例卡片 5/7 两栏。照片始终为 4:5。
- Noto Sans SC 与 JetBrains Mono 在检查浏览器中加载成功；外部字体不可用时按 token 字体栈回退。
- 首页直接渲染，不挂载 PortfolioLoader、ScopeCursor、ParticleField、旧 Hero、联系悬浮条或首页滚动锁定。
- 问候、姓名、身份及三段介绍采用任务单定稿。三段 DOM textContent 与 CODEX_TASK.md 逐字对比通过。
- 四个导航均为真实链接，#work/#ai/#exp/#about 定位通过；末尾短占位区受浏览器最大滚动距离限制，但目标可见。未知 hash 返回首页顶部。
- 从三张卡片进入现有三个案例路由，均观察到对应页面标题；从探索页 ProjectCaseNav 的 #about 返回新首页并定位，未重播开场。
- 所有首页链接和按钮点击高度实测 44px，Tab 顺序覆盖 Logo、四个导航、重播、邮箱、简历及三个案例链接；焦点为可见 2px 实线。
- 邮箱复制通过模拟 clipboard 成功/失败分支验证：写入准确邮箱，成功反馈 1.6 秒后消失，失败不显示反馈。不将模拟权限测试当成真实系统剪贴板权限验收。
- 开场 CSS 动画最长 1080ms，实测首次 active 状态持续约 1118ms；线框在完成后卸载。文字从第一帧就在 DOM 中，期间可滚动，线框不接收指针事件。
- 同会话刷新不播放；手动重播有效；prefers-reduced-motion 下首次及手动重播均不播放；sessionStorage 读写抛错时直接显示成品。
- 检查浏览器未报告 pageerror。
- src/app/home 内硬编码十六进制/rgb 颜色、Tailwind 自带色板类和 text-xs/sm/base/lg 扫描无匹配；git diff --check 通过。
- ProjectRouteLoader、ProjectDetail、QixinProjectDetail、ExplorationsPage、projectPreload 相对 main 无代码差异。仅验证案例入口可用，没有重新验收案例页所有交互。

## 实现取舍与待补内容

- 导航规范同时要求 py-6、72px 总高度和 44px 点击区域，三者不能同时满足。本次保留 py-6 与 44px 点击区域，桌面导航高度 92px；手机自然换行，不做菜单弹窗。
- 规范中的少量 14px/10px 间距与总间距阶梯冲突，采用相邻的默认阶梯（16px/12px）。大号姓名使用给定字号 token 和自然换行，避免强制同一行导致溢出。
- 公司、微信、学校、城市没有提供跳转目标，沿参考稿做文本下划线标注，不编造 URL。简历链接按任务单保持 href="#"，源代码标注待填。
- 照片、案例裁切图、AI 工作流、经历、关于/页脚按任务单保留占位。
- 开场使用局部相对定位框随区块布局自适应，避免额外 JS 测量与 resize 同步；无动画库，无滚动锁定。
- 浏览器检查发现独立 home.css 的缓动变量被 Tailwind 按需裁剪，已将 @theme 改为 @theme static，保留 token 数值并确保变量存在。修正后检查到了真实 CSSAnimation，而非仅凭线框和定时器判断。
- 验证脚本曾出现 Node 环境引用 innerHeight 的错误，以及把允许的 hover 颜色过渡误计为首屏外主动效；均修正测试断言后重跑。最终记录以下方 verification.json 为准。
- npm install 输出原有依赖审计 8 项提示（1 low / 1 moderate / 5 high / 1 critical），未执行 audit fix，未扩大到依赖升级。
- 没有替换真实照片、简历 PDF 或案例裁切截图；没有实现后续版块内容；没有修改案例加载时长。这些均属于本次任务明确保留的范围。

## 验证材料

本地材料目录：`/Users/chenbaiwan/.codex/visualizations/2026/10/29/01a186fd-3d6a-79e2-ac86-b334a304f968/homepage-2026-11-02`。不把截图提交进源码。

- `/Users/chenbaiwan/.codex/visualizations/2026/10/29/01a186fd-3d6a-79e2-ac86-b334a304f968/homepage-2026-11-02/home-375.png`
- `/Users/chenbaiwan/.codex/visualizations/2026/10/29/01a186fd-3d6a-79e2-ac86-b334a304f968/homepage-2026-11-02/home-768.png`
- `/Users/chenbaiwan/.codex/visualizations/2026/10/29/01a186fd-3d6a-79e2-ac86-b334a304f968/homepage-2026-11-02/home-1440.png`
- `/Users/chenbaiwan/.codex/visualizations/2026/10/29/01a186fd-3d6a-79e2-ac86-b334a304f968/homepage-2026-11-02/top-375.png`
- `/Users/chenbaiwan/.codex/visualizations/2026/10/29/01a186fd-3d6a-79e2-ac86-b334a304f968/homepage-2026-11-02/top-768.png`
- `/Users/chenbaiwan/.codex/visualizations/2026/10/29/01a186fd-3d6a-79e2-ac86-b334a304f968/homepage-2026-11-02/top-1440.png`
- `/Users/chenbaiwan/.codex/visualizations/2026/10/29/01a186fd-3d6a-79e2-ac86-b334a304f968/homepage-2026-11-02/opening-wire.png`
- `/Users/chenbaiwan/.codex/visualizations/2026/10/29/01a186fd-3d6a-79e2-ac86-b334a304f968/homepage-2026-11-02/opening-reveal.png`
- `/Users/chenbaiwan/.codex/visualizations/2026/10/29/01a186fd-3d6a-79e2-ac86-b334a304f968/homepage-2026-11-02/verification.json`
- `/Users/chenbaiwan/.codex/visualizations/2026/10/29/01a186fd-3d6a-79e2-ac86-b334a304f968/homepage-2026-11-02/verification.log`
- `/Users/chenbaiwan/.codex/visualizations/2026/10/29/01a186fd-3d6a-79e2-ac86-b334a304f968/homepage-2026-11-02/verify-homepage.mjs`
- `/Users/chenbaiwan/.codex/visualizations/2026/10/29/01a186fd-3d6a-79e2-ac86-b334a304f968/homepage-2026-11-02/build.log`

## 本次改动文件

- `CODEX_TASK.md`
- `DESIGN.md`
- `docs/redesign-2026-11/portfolio-redesign-spec.md`
- `docs/redesign-2026-11/reference/homepage.html`
- `index.html`
- `src/app/App.tsx`
- `src/app/components/HomeContent.tsx`
- `src/app/home/CaseCard.tsx`
- `src/app/home/HomePage.tsx`
- `src/app/home/Intro.tsx`
- `src/app/home/IntroBlock.tsx`
- `src/app/home/Ruler.tsx`
- `src/app/home/SiteHeader.tsx`
- `src/app/home/content/zh.ts`
- `src/app/home/home.css`
- `src/app/home/useIntroOpening.ts`
- `src/styles/index.css`
- `src/styles/theme.css`
- `src/styles/tokens.css`
- `docs/redesign-2026-11/homepage-verification.md`

## 实现提交

```text
1fba6ae 加入改版设计规范和 token
dc18f38 接入设计 token 和字体
f16b58c 首页：移除加载页、点击进入和装饰元素
ef009d2 首页：搭建导航、个人介绍和三张案例卡片
9e6a8bf 首页：线框到成品的开场动画
```

本记录另以「首页：记录构建与交互验收结果」单独提交。

## 最终构建原始输出

```text

> @figma/my-make-file@0.0.1 build
> vite build

vite v6.3.5 building for production...
transforming...
✓ 2035 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                               0.90 kB │ gzip:  0.51 kB
dist/assets/index-BR0aqtHG.css              171.77 kB │ gzip: 30.83 kB
dist/assets/HomeContent-BMsQTWFa.js           0.13 kB │ gzip:  0.14 kB
dist/assets/index-DC_snNPZ.js                 4.93 kB │ gzip:  2.29 kB
dist/assets/ScrollArea-D-pQE45Z.js            5.25 kB │ gzip:  1.80 kB
dist/assets/ProjectCaseNav-DAEtI6i7.js        5.57 kB │ gzip:  1.82 kB
dist/assets/Nav-bJ-XIh7Z.js                   9.58 kB │ gzip:  3.47 kB
dist/assets/Footer-DHzY_-j3.js               45.07 kB │ gzip: 18.78 kB
dist/assets/ExplorationsPage-BzFO9mQd.js     51.28 kB │ gzip: 11.83 kB
dist/assets/proxy-33RDxVTr.js               124.07 kB │ gzip: 40.48 kB
dist/assets/QixinProjectDetail-BCNr4hEN.js  150.59 kB │ gzip: 35.85 kB
dist/assets/ProjectDetail-Bqj48_Tn.js       193.54 kB │ gzip: 57.15 kB
dist/assets/index-FuwWd4x8.js               287.76 kB │ gzip: 99.93 kB
✓ built in 1.73s
```
