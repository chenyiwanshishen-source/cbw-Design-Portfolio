# 案例交互与组件库

入口：http://[::1]:5174/#components

复用 CaseList / CaseCard / Ruler；颜色和字体来自现有 token。桌面默认隐藏预览，激活展开三张倾斜图片，其余行文字模糊；键盘焦点优先。手机横向滑动及三个分页按钮。减少动态效果有 CSS 降级。

已检查：展示页首项激活产生 1 项 active 和 2 项 muted；390px 无页面横向溢出，第二分页按钮滚动到 326px；Tab 后焦点和激活均为启信产业大脑。尚未完整验收触屏拖动、减少动态效果系统设置与鼠标进出手感。图片仍为灰色占位。

## 构建原始输出

```text

> @figma/my-make-file@0.0.1 build
> vite build

vite v6.3.5 building for production...
transforming...
✓ 2036 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                               0.90 kB │ gzip:   0.50 kB
dist/assets/index-1PQe8m7n.css              179.22 kB │ gzip:  32.49 kB
dist/assets/HomeContent-BFJGXHi2.js           0.13 kB │ gzip:   0.14 kB
dist/assets/index-DbKMr3xI.js                 4.93 kB │ gzip:   2.29 kB
dist/assets/ScrollArea-Bm0dYLWH.js            5.25 kB │ gzip:   1.80 kB
dist/assets/ProjectCaseNav-CxZg5_QJ.js        5.57 kB │ gzip:   1.82 kB
dist/assets/Nav-Z75CdcW6.js                   9.58 kB │ gzip:   3.47 kB
dist/assets/Footer-CjY4Bc4E.js               45.07 kB │ gzip:  18.78 kB
dist/assets/ExplorationsPage-C5T4-GI3.js     51.28 kB │ gzip:  11.83 kB
dist/assets/proxy-BrUlsJYK.js               124.07 kB │ gzip:  40.48 kB
dist/assets/QixinProjectDetail-Drmeeg8a.js  150.59 kB │ gzip:  35.86 kB
dist/assets/ProjectDetail-BRuUYezH.js       193.54 kB │ gzip:  57.15 kB
dist/assets/index-D29zMx7c.js               293.81 kB │ gzip: 102.50 kB
✓ built in 1.78s
```
