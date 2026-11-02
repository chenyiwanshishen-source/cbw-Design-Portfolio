# 首页渲染过程试作 · 2026-11-02

分支 redesign/homepage。整条顶部栏仍不显示。黑底白线全视口绘制、宽度收缩、描边文字接续、白底成品。保留原文和图片占位。

浏览器核对：当前桌面视口测得 14 个可见块，12 个文字副本；背景 rgb(16,17,20)，固定覆盖当前视口，CSS 总时长 4.2s；看到线框阶段及动画完成后的页面。尚未完成逐帧对照验收，未声称与源站完全一致。本次未重新完整运行移动端和减少动态效果专项测试；此前检查不替代此次验证。

偏离旧任务：按用户新要求从 Intro 扩展到当前首页视口，并将 1.2 秒放宽到 4.2 秒。尺寸标签静态显示目标宽高；没有源站动态间距计数。无滚动锁定，滚动即结束动画。

## npm run build 原始输出

```text

> @figma/my-make-file@0.0.1 build
> vite build

vite v6.3.5 building for production...
transforming...
✓ 2035 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                               0.90 kB │ gzip:   0.51 kB
dist/assets/index-BLcwWC7z.css              173.81 kB │ gzip:  31.39 kB
dist/assets/HomeContent-jk4QXS5y.js           0.13 kB │ gzip:   0.14 kB
dist/assets/index-DbZKIS4y.js                 4.93 kB │ gzip:   2.29 kB
dist/assets/ScrollArea-DDRSTQZN.js            5.25 kB │ gzip:   1.80 kB
dist/assets/ProjectCaseNav-CW-IN1zV.js        5.57 kB │ gzip:   1.82 kB
dist/assets/Nav-COKZgA3-.js                   9.58 kB │ gzip:   3.47 kB
dist/assets/Footer-DUqL3SwL.js               45.07 kB │ gzip:  18.78 kB
dist/assets/ExplorationsPage-DzNCSHe3.js     51.28 kB │ gzip:  11.83 kB
dist/assets/proxy-DiNExoIN.js               124.07 kB │ gzip:  40.48 kB
dist/assets/QixinProjectDetail-CxrQASJ3.js  150.59 kB │ gzip:  35.86 kB
dist/assets/ProjectDetail-Cwf1AvOj.js       193.54 kB │ gzip:  57.16 kB
dist/assets/index-C9fxALYy.js               288.66 kB │ gzip: 100.51 kB
✓ built in 1.85s
```

## 手绘制图层次修订

按用户提供截图增加斜线填充、双对角图片框、虚线控件框、低对比辅助线、白底编号标签、宽高尺寸线和同列块间距。宽高在 requestAnimationFrame 中读取动画框实时尺寸；进度为实际已播放时间。SVG 轻微噪声位移仅作用于线条。

浏览器确认 11 个填充文字块、9 个间距标注，线框应用 draft-rough 滤镜；已看到黑底虚实线框与斜线填充的初始阶段。连续截帧时视口发生滚动，动画按设计结束，因此此次没有取得完整测量阶段截图，不宣称逐帧视觉验收通过。

### 本次 build 原始输出

```text

> @figma/my-make-file@0.0.1 build
> vite build

vite v6.3.5 building for production...
transforming...
✓ 2035 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                               0.90 kB │ gzip:   0.51 kB
dist/assets/index-CMoBu8nH.css              176.50 kB │ gzip:  31.82 kB
dist/assets/HomeContent-DgMjGf5B.js           0.13 kB │ gzip:   0.14 kB
dist/assets/index-DFFIvAkJ.js                 4.93 kB │ gzip:   2.29 kB
dist/assets/ScrollArea-DWWsS19-.js            5.25 kB │ gzip:   1.80 kB
dist/assets/ProjectCaseNav-xxwdHBLU.js        5.57 kB │ gzip:   1.82 kB
dist/assets/Nav-CN-NyR-p.js                   9.58 kB │ gzip:   3.47 kB
dist/assets/Footer-DL_2DszQ.js               45.07 kB │ gzip:  18.78 kB
dist/assets/ExplorationsPage-DjP6Hohk.js     51.28 kB │ gzip:  11.83 kB
dist/assets/proxy-CNZr2ZBK.js               124.07 kB │ gzip:  40.48 kB
dist/assets/QixinProjectDetail-g8Db10Ly.js  150.59 kB │ gzip:  35.86 kB
dist/assets/ProjectDetail-w92Tcm0i.js       193.54 kB │ gzip:  57.16 kB
dist/assets/index-BgUZ2KfO.js               290.52 kB │ gzip: 101.25 kB
✓ built in 1.93s
```

## 滚动中断修复

移除 scroll 结束回调，改为文档坐标及被动 scroll 同步平移。预先测量整页内容，滚入视口后仍有对应图纸。浏览器实际 PageDown 后 scrollY=680，过场仍存在，内容层 transform Y=-680。构建通过。

```text

> @figma/my-make-file@0.0.1 build
> vite build

vite v6.3.5 building for production...
transforming...
✓ 2035 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                               0.90 kB │ gzip:   0.50 kB
dist/assets/index-DJrjKOpl.css              176.64 kB │ gzip:  31.86 kB
dist/assets/HomeContent-EHCDYeSg.js           0.13 kB │ gzip:   0.14 kB
dist/assets/index-Ba_0Gylh.js                 4.93 kB │ gzip:   2.29 kB
dist/assets/ScrollArea-MmRH4EAa.js            5.25 kB │ gzip:   1.80 kB
dist/assets/ProjectCaseNav-Dt3fYXOm.js        5.57 kB │ gzip:   1.82 kB
dist/assets/Nav-D24FOKZC.js                   9.58 kB │ gzip:   3.47 kB
dist/assets/Footer-Buwx90Ln.js               45.07 kB │ gzip:  18.78 kB
dist/assets/ExplorationsPage-DIfggngP.js     51.28 kB │ gzip:  11.83 kB
dist/assets/proxy-DFWnqZ9M.js               124.07 kB │ gzip:  40.48 kB
dist/assets/QixinProjectDetail-VOGhdse-.js  150.59 kB │ gzip:  35.86 kB
dist/assets/ProjectDetail-RX0ykljR.js       193.54 kB │ gzip:  57.16 kB
dist/assets/index-DkmTK9cv.js               290.77 kB │ gzip: 101.30 kB
✓ built in 1.86s
```
