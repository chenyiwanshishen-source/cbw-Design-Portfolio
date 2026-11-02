# 启信产业大脑本地验收

2026-11-02，分支 redesign/case-qixin，从 redesign/case-qsight 的 837da8f 建立。工作目录 AI产品设计师作品集框架-homepage，预览 http://[::1]:5174/#/project/qixin-brain。

- 六章、PLATE 01–10 连续占位、0 个 img；5 处【待填】均渲染为 TodoNote，颜色为 warning token。PLATE 07 的【待补：找不到可删除】保留。
- 1440px 下 scrollWidth 1440px，版心 1200px；768 / 375px 下 scrollWidth 分别为 768 / 375px，目录隐藏。
- 375px 表格容器宽 335px、内容 576px，可独立横向滚动。桌面与手机截图已观察。
- 六个目录链接能跳转且 hash 不变；发现第一章较短时高亮提前跳第二章，修正共用 CaseToc 观察标题的顶部阅读区后，点击第一章正确保持高亮，PageDown 滚动后自动高亮第二章。
- 上一个案例可进入新 Qsight，Qsight 下一个案例可返回新启信页；AI 探索链接 href 为 #/project/explorations，旧探索页未修改。
- 最终浏览器 error / warn 为空。npm run build 退出码 0，完整输出见 qixin-build.txt。
- 原文正文与 H2 标题脚本逐项核对通过；旧 QixinProjectDetail.tsx 保留未改。任务单新文件随本分支提交，原有分支未更改。

取舍：沿用当前 Qsight 的主图在前、简介在下和文字阶梯，保留本任务明确要求的六章与概要三栏。图注及“要放什么”仅复用给定图位名称。时间轴窄屏纵排；单项指标不留多余空格。不增加图片、动效或新依赖。

未进行上线发布或用户视觉验收；团队人数、统计口径、上线反馈、覆盖范围、如果重来仍待补充。未 push、合并或部署。
