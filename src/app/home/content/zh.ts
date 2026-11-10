export const intro = {
  greeting: '你好，我是',
  name: '陈俊学',
  role: '专注 B 端与 AI 产品的产品设计师',
  paragraphs: [
    '曾在合合信息担任产品设计师约 6 年，负责启信宝 B 端客户端、启信产业大脑，并参与 AI 报告平台 Qsight 从 0 到 1 的设计。',
    '我也用 AI 编程工具开发产品，自己负责产品定义、交互设计和开发验证。目前持续开发浏览器整理插件 ye!，也制作了用于 Figma、前端编辑和插画的设计工具。',
  ],
  email: '18101767127@163.com',
};

export const navigation = [
  { id: 'work', label: '案例' },
  { id: 'ai', label: '自研工具' },
  { id: 'exp', label: '经历' },
];

export const cases = [
  {
    id: 'ai-report',
    detailHref: '#/project/ai-report',
    name: 'Qsight · AI 报告平台',
    summary: '帮助研究员生成报告，并追溯内容和数据的来源。',
    period: '2025.04–2026.05',
    responsibility: '核心交互设计、Prompt 基础框架',
    meta: '合合信息 · AI 报告平台 Qsight · 2025.04 — 2026.05',
    title: 'Qsight · AI 报告平台',
    context: '研究员写一份区域监测报告，大半天都花在找资料上。他们也不敢让 AI 直接写全文，因为结构容易跑偏，数字查不到出处。',
    action: '我们把大纲确认和数据范围放到生成之前，再让正文每一段都能点回它的来源。我负责交互方案和 Prompt 的基础框架，一直跟到 1.0 上线。',
    metrics: [{ value: '2~3 天 → 20 分钟', label: '全流程交付' }, { value: '约 50% → 80%', label: '关键事实可溯源' }],
    tags: ['AI Agent', 'Prompt 框架', '复杂 B 端'],
    progress: '',
  },
  {
    id: 'qixin-brain',
    detailHref: '#/project/qixin-brain',
    name: '启信产业大脑',
    summary: '帮助招商、产业服务和区域治理人员查询企业数据、搭建本地产业链。',
    period: '2021–2026',
    responsibility: '产品设计、产业链图谱、首页工作台与组件库',
    meta: '合合信息 · 启信产业大脑 · 2021 — 2026',
    title: '启信产业大脑',
    context: '每个地区对产业链怎么划分、哪些企业算本地特色，理解都不一样。以前用户提了需求，要等我们梳理结构、开发配置，改一次再等一轮。',
    action: '我把标准产业链改成能直接编辑的图谱。标准环节可以复用，没有的环节可以新建，节点下的企业名单由用户自己维护。我从 2021 年开始负责这个产品，首页工作台和组件库也是这几年一起重做的。',
    metrics: [{ value: '1–2 周 → 2–3 天', label: '本地产业链构建周期' }],
    tags: ['产业链图谱', '首页工作台', '组件库'],
    progress: '',
  },
  {
    id: 'ye-browser',
    detailHref: '#/project/ye-browser',
    name: 'ye! · 浏览器整理 agent',
    summary: '从自己的整理需求出发，用自然语言查找和整理书签、页签。',
    period: '2026.09 — 至今',
    responsibility: '独立完成：产品定义、交互设计、AI 协作开发',
    meta: '个人项目 · 浏览器整理 agent · 2026.09 — 至今',
    title: 'ye! · 浏览器整理 agent',
    context: '我的书签和页签多到自己都找不到，想像跟人说话一样，说一句话就让 AI 去找、去分。',
    action: '8 周里我推翻了三次架构，最后定下来：插件是沙箱，工具是手脚，AI 是大脑。现在有 4 位朋友在用。',
    metrics: [{ value: '8 周', label: '从 0 到 1' }, { value: '约 2000 个', label: '自动化测试' }],
    tags: ['AI Agent', '浏览器插件', '人机协作'],
    progress: '朋友内测中',
  },
];
export type CaseContent = (typeof cases)[number];

export const aiTools = [
  {
    "name": "Figma 设计系统工作流",
    "summary": "让 AI 按固定步骤在 Figma 里搭设计系统",
    "status": "已开源"
  },
  {
    "name": "Figma 连接器",
    "summary": "让 AI 直接改 Figma 文件，每次写入都能撤回",
    "status": "已开源"
  },
  {
    "name": "Visual Code Canvas",
    "summary": "AI 写完前端后，在画布上直接改样式并写回源码",
    "status": "v0.2.1"
  },
  {
    "name": "插画 Skill",
    "summary": "让 AI 用可辨认的界面控件绘制矢量插画",
    "status": "准备开源"
  }
];
export const aiToolsIntro = '我给自己做的设计工具，都用 AI 编程工具完成。';
