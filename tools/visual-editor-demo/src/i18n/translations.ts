export type Language = 'zh' | 'en';

export const translations = {
  zh: {
    // Target Selector Hub
    targetSelectorTitle: '编辑目标枢纽',
    targetTypeTsx: 'React TSX 组件工程 (.tsx / .jsx)',
    targetTypeHtml: '静态 HTML 页面 (.html / .htm)',
    targetTypeVue: 'Vue 组件工程 (.vue)',
    targetTypeUrl: '本地服务 URL (http://...)',
    openLocalFileOrFolder: '打开本地文件 / 文件夹...',
    recentTargets: '最近编辑目标',
    modeAstWriteback: 'Recast AST 源码写回',
    modeHtmlWriteback: 'DOM / HTML 静态写回',
    selectTargetPrompt: '选择或加载编辑目标',

    // Toolbar
    brandTitle: '视觉 Studio',
    modeSelect: '选择模式',
    modeEdit: '编辑模式',
    modeInsert: '插入元素',
    deleteElement: '删除元素',
    directSave: '直接保存',
    diffPreview: 'Diff 预览',
    statusConnected: '已连接宿主',
    statusConnecting: '正在连接...',
    statusDisconnected: '独立预览模式',
    insertHeader: '插入 JSX 元素',
    
    // Node Templates
    tplDiv: '容器 / Div',
    tplButton: '主按钮',
    tplHeading: '二级标题 (H2)',
    tplParagraph: '段落文本',
    tplImage: '图片占位符',
    tplCard: '功能卡片',

    // Layer Tree
    layersTitle: '图层层级',
    expandAll: '展开全部',
    collapseAll: '折叠全部',
    searchPlaceholder: '搜索图层与组件...',
    noLayers: '暂无组件图层数据',
    toggleFrameworkInternals: '过滤框架内部组件',

    // Responsive Viewport
    presetMobile: '移动端',
    presetTablet: '平板端',
    presetDesktop: '桌面端',
    presetFull: '全屏宽度',
    rotateOrientation: '旋转屏幕方向',
    zoomIn: '放大',
    zoomOut: '缩小',

    // Property Inspector
    noSelectionTitle: '未选中任何元素',
    noSelectionDesc: '请在画布或左侧图层树中点击选中元素以编辑样式与属性。',
    textContent: '文本内容',
    textPlaceholder: '输入文本内容...',
    tailwindClasses: 'Tailwind 类名',
    addClassPlaceholder: '添加类名 (如 p-4, bg-blue-500)...',
    inlineStyles: '内联样式 (Inline Styles)',
    propPlaceholder: '属性 (如 color)',
    valPlaceholder: '属性值 (如 #ff0000)',
    boxModelTitle: '盒模型间距 (Margin & Padding)',
    dimensionsTitle: '元素尺寸与定位 (Dimensions)',
    tabTailwind: 'Tailwind 样式',
    tabInline: '内联 CSS',
    tabCssModule: 'CSS 模块',

    // Diff Modal
    diffTitle: '代码变更 Diff 对比预览',
    diffSubtitle: '将在写回磁盘前预览所有修改',
    diffNoChanges: '暂无未保存的代码改动',
    approveWriteBack: '确认应用并写回源码',
    cancel: '取消',
  },
  en: {
    // Target Selector Hub
    targetSelectorTitle: 'Target Hub',
    targetTypeTsx: 'React TSX Project (.tsx / .jsx)',
    targetTypeHtml: 'Static HTML Page (.html / .htm)',
    targetTypeVue: 'Vue Project (.vue)',
    targetTypeUrl: 'Local Dev Server URL (http://...)',
    openLocalFileOrFolder: 'Open Local File / Folder...',
    recentTargets: 'Recent Targets',
    modeAstWriteback: 'Recast AST Write-Back',
    modeHtmlWriteback: 'DOM / HTML Static Write-Back',
    selectTargetPrompt: 'Select or Load Target',

    // Toolbar
    brandTitle: 'Visual Studio',
    modeSelect: 'Select',
    modeEdit: 'Edit',
    modeInsert: 'Insert',
    deleteElement: 'Delete',
    directSave: 'Direct Save',
    diffPreview: 'Diff Preview',
    statusConnected: 'Connected',
    statusConnecting: 'Connecting...',
    statusDisconnected: 'Standalone Mode',
    insertHeader: 'Insert JSX Element',

    // Node Templates
    tplDiv: 'Container / Div',
    tplButton: 'Primary Button',
    tplHeading: 'Heading (H2)',
    tplParagraph: 'Paragraph',
    tplImage: 'Image Placeholder',
    tplCard: 'Feature Card',

    // Layer Tree
    layersTitle: 'Layers',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    searchPlaceholder: 'Search layers & components...',
    noLayers: 'No component tree available',
    toggleFrameworkInternals: 'Toggle Framework Internals',

    // Responsive Viewport
    presetMobile: 'Mobile',
    presetTablet: 'Tablet',
    presetDesktop: 'Desktop',
    presetFull: 'Full Width',
    rotateOrientation: 'Rotate Orientation',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',

    // Property Inspector
    noSelectionTitle: 'No Element Selected',
    noSelectionDesc: 'Select an element on canvas or layer tree to edit inspectable properties.',
    textContent: 'Text Content',
    textPlaceholder: 'Enter text content...',
    tailwindClasses: 'Tailwind Classes',
    addClassPlaceholder: 'Add class (e.g. p-4, bg-blue-500)...',
    inlineStyles: 'Inline Styles',
    propPlaceholder: 'Property (e.g. color)',
    valPlaceholder: 'Value (e.g. #ff0000)',
    boxModelTitle: 'Box Model (Margin & Padding)',
    dimensionsTitle: 'Dimensions & Positioning',
    tabTailwind: 'Tailwind',
    tabInline: 'Inline CSS',
    tabCssModule: 'CSS Module',

    // Diff Modal
    diffTitle: 'Graphical Code Diff Preview',
    diffSubtitle: 'Preview all pending AST modifications before applying to disk',
    diffNoChanges: 'No pending code modifications',
    approveWriteBack: 'Approve & Write Back',
    cancel: 'Cancel',
  },
};
