# Qsight 本地验收记录

日期：2026-11-02。工作目录：AI产品设计师作品集框架-homepage。分支：redesign/case-qsight，起点 redesign/homepage 的 8f52411。未 push、合并或部署。

## 实测

- 本地 URL：http://[::1]:5174/#/project/ai-report。
- 1440px 视口：页面 scrollWidth 1440px，版心 1200px。
- 768px 视口：页面 scrollWidth 768px，目录隐藏。
- 375px 视口：页面 scrollWidth 375px，目录隐藏；三个表格容器宽 335px，表格宽 576px，容器独立横向滚动。
- DOM 中 7 个章节、14 个图版占位、0 个 img、11 个 data-todo-note；待填颜色均为 warning token 对应的 rgb(161, 92, 0)。
- 七个目录链接逐一点击，当前项对应更新，hash 始终为 #/project/ai-report。
- 从第 06 章按 PageDown 滚动，第 07 章进入阅读区后高亮自动变为第 07 章。
- 返回首页及首页 Qsight 链接进入新案例均通过；键盘 Tab 可聚焦返回链接，有 2px 实线焦点。
- 新建页面最终控制台 error/warn 为空；开发中发现的列表 key 警告已补齐 Fragment key。
- 对任务单中的 30 段引用正文和 H2/H3 标题逐项检查，在集中内容文件中均原文存在；14 个图版编号连续。
- npm run build 退出码 0；原始输出见 qsight-build.txt。

## 保留与取舍

- 旧 ProjectDetail.tsx 未改未删；首页源码未改。App.tsx 仅切换 Qsight 渲染入口，并对新页面停用旧导航、过场和旧图预加载。其他旧案例仍保留原流程。
- 任务单中可选的 DraftingFrame 未添加；页面无新增动效。
- PLATE 07–14 未给单独图注和占位说明，直接复用各自截图名称；页脚复用项目小标签，没有新增项目事实。
- 11 处待填由用户后续补充，全部保留原始括号与文字；PLATE 04 的【待补截图】也保留。
- 仅本地技术和视觉检查，审美与内容最终验收仍待用户；未进行公开发布。
