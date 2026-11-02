export const intro = {
  greeting: '你好，我是',
  name: '陈俊学',
  role: '工业设计背景的 B 端应用产品设计师',
  paragraphs: [
    '曾在合合信息担任产品设计师约 6 年，负责启信宝 B 端客户端、启信产业大脑，并参与 AI 报告平台 Qsight 从 0 到 1 的设计。',
    '现在也在用 AI 编程工具构建可使用的产品，实践包括前端可视化编辑工具和浏览器标签整理插件 ye!，从产品定义、交互设计到开发验证，目前也在持续推进中。',
    '毕业于郑州轻工业大学工业设计专业，现在住在上海。你可以发邮件到 18101767127@163.com，也可以加微信 chenbw0610，或者下载我的简历。',
  ],
  email: '18101767127@163.com',
};

export const navigation = [
  { id: 'work', label: '案例' },
  { id: 'ai', label: 'AI 工作流' },
  { id: 'exp', label: '经历' },
  { id: 'about', label: '关于' },
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
    title: '让研究员敢把报告交给 AI 写',
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
    period: '2020–2026',
    responsibility: '产品设计、产业链图谱、首页工作台与组件库',
    meta: '合合信息 · 启信产业大脑 · 2020 — 2026',
    title: '让招商人员自己搭本地产业链',
    context: '每个地区对产业链怎么划分、哪些企业算本地特色，理解都不一样。以前用户提了需求，要等我们梳理结构、开发配置，改一次再等一轮。',
    action: '我把标准产业链改成能直接编辑的图谱。标准环节可以复用，没有的环节可以新建，节点下的企业名单由用户自己维护。我从 2020 年开始负责这个产品，首页工作台和组件库也是这几年一起重做的。',
    metrics: [{ value: '1–2 周 → 2–3 天', label: '本地产业链构建周期' }],
    tags: ['产业链图谱', '首页工作台', '组件库'],
    progress: '',
  },
  {
    id: 'ye-browser',
    detailHref: undefined,
    name: 'ye! · 浏览器标签整理插件',
    summary: '帮助整理浏览器标签页，减少页面堆积与查找成本。',
    period: '持续开发中',
    responsibility: '产品定义、交互设计、AI 协作开发',
    meta: '个人项目 · 浏览器插件',
    title: 'ye! · 浏览器标签整理插件',
    context: '帮助整理浏览器标签页，减少页面堆积与查找成本。',
    action: '产品定义、交互设计、AI 协作开发。',
    metrics: [],
    tags: ['浏览器插件', '标签整理'],
    progress: '持续开发中',
  },
];
export type CaseContent = (typeof cases)[number];
