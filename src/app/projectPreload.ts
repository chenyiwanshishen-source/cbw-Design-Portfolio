type ProjectKey = "ai-report" | "qixin-brain";
type Priority = "high" | "low";
type ProgressCallback = (progress: number) => void;

type PrioritizedImage = HTMLImageElement & {
  fetchPriority?: "high" | "low" | "auto";
};

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export const loadAiProjectDetail = () => import("./components/ProjectDetail");
export const loadQixinProjectDetail = () => import("./components/QixinProjectDetail");

const AI_FLOW_IMAGES = [
  "./images/ai-report-hero-full.png",
  "./images/ai-report-hero-toggle-01.png",
  "./images/ai-report-hero-toggle-02.png",
  "./images/ai-repor- left-01.png",
  "./images/ai- report-right-01.png",
  "./images/ai-report-flow/step-01-blank-canvas.png",
  "./images/ai-report-flow/step-01-sidebar.png",
  "./images/ai-report-flow/step-01-final-template-center.png",
  "./images/ai-report-flow/step-01-template-region.png",
  "./images/ai-report-flow/step-01-template-opinion.png",
  "./images/ai-report-flow/step-01-template-chain.png",
  "./images/ai-report-flow/step-01-template-futian.png",
  "./images/ai-report-flow/step-02-final-outline.png",
  "./images/ai-report-flow/step-02-final-outline-02.png",
  "./images/optimized/ai-outline-confirm-900.png",
  "./images/04/kongbaihuabu.png",
  "./images/04/liushihuaban.png",
  "./images/optimized/ai-stream-text-1400.jpg",
  "./images/05/lishijilupng.png",
  "./images/optimized/ai-data01-1600.jpg",
  "./images/optimized/ai-group02-1600.jpg",
  "./images/optimized/ai-group01-1600.jpg",
  "./images/optimized/ai-marry01-1600.jpg",
  "./images/设计方案/marry02.png",
  "./images/章节提示词/line-01.svg",
];

const QIXIN_IMAGES = [
  "./images/首页/login.png",
  "./images/首页/push group.png",
  "./images/启信产业大脑/产业信息.png",
  "./images/启信产业大脑/产业报告.svg",
  "./images/启信产业大脑/企业报告.svg",
  "./images/启信产业大脑/企业监控入口.png",
  "./images/启信产业大脑/常用功能.png",
  "./images/启信产业大脑/异动预警.png",
  "./images/启信产业大脑/弹窗.png",
  "./images/启信产业大脑/时间选择器.png",
  "./images/启信产业大脑/舆情速递.png",
  "./images/optimized/qixin-home-1920.jpg",
  "./images/optimized/qixin-entry-1600.jpg",
  "./images/optimized/qixin-search-1600.jpg",
  "./images/optimized/qixin-supply-chain-1600.jpg",
  "./images/optimized/qixin-batch-query-1600.jpg",
  "./images/optimized/qixin-business-info-1600.jpg",
  "./images/optimized/qixin-chain-action-1600.jpg",
  "./images/optimized/qixin-chain-map-1600.jpg",
  "./images/optimized/qixin-color-1600.jpg",
  "./images/optimized/qixin-company-detail-1600.jpg",
  "./images/optimized/qixin-custom-chain-edit01-1600.jpg",
  "./images/optimized/qixin-custom-chain-edit02-1600.jpg",
  "./images/optimized/qixin-custom-chain-edit03-1600.jpg",
  "./images/optimized/qixin-custom-chain-list-1600.jpg",
  "./images/optimized/qixin-industry-detail-1600.jpg",
  "./images/optimized/qixin-monitor-1600.jpg",
  "./images/optimized/qixin-park-recruit-1600.jpg",
  "./images/optimized/qixin-relation-1600.jpg",
  "./images/optimized/qixin-report-center-1600.jpg",
  "./images/optimized/qixin-text-1600.jpg",
];

const imagePromises = new Map<string, Promise<void>>();
const preloadGroups = new Map<string, Promise<void>>();

function isBrowser() {
  return typeof window !== "undefined" && typeof Image !== "undefined";
}

function resolveAssetUrl(src: string) {
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  const normalized = src.startsWith("/") ? `.${src}` : src;
  if (!isBrowser()) return normalized;
  return new URL(normalized, window.location.href).href;
}

function preloadImage(src: string, priority: Priority) {
  if (!isBrowser()) return Promise.resolve();

  const href = resolveAssetUrl(src);
  const cached = imagePromises.get(href);
  if (cached) return cached;

  const promise = new Promise<void>((resolve) => {
    const img = new Image() as PrioritizedImage;
    img.decoding = "async";
    img.loading = "eager";
    img.fetchPriority = priority;
    img.onload = () => {
      if (typeof img.decode === "function") {
        void img.decode().then(resolve).catch(resolve);
        return;
      }
      resolve();
    };
    img.onerror = () => resolve();
    img.src = href;
  });

  imagePromises.set(href, promise);
  return promise;
}

async function preloadImagesInBatches(images: string[], priority: Priority, batchSize: number) {
  for (let i = 0; i < images.length; i += batchSize) {
    const batch = images.slice(i, i + batchSize);
    await Promise.all(batch.map((src) => preloadImage(src, priority)));
  }
}

function delay(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

async function preloadAi(priority: Priority) {
  await Promise.allSettled([
    loadAiProjectDetail(),
    preloadImagesInBatches(AI_FLOW_IMAGES, priority, priority === "high" ? 3 : 2),
  ]);
}

async function preloadQixin(priority: Priority) {
  await Promise.allSettled([
    loadQixinProjectDetail(),
    preloadImagesInBatches(QIXIN_IMAGES, priority, priority === "high" ? 3 : 2),
  ]);
}

export function preloadProjectDetailAssets(project: ProjectKey, priority: Priority = "high") {
  const key = `${project}:${priority}`;
  const existing = preloadGroups.get(key);
  if (existing) return existing;

  const promise = project === "ai-report" ? preloadAi(priority) : preloadQixin(priority);
  preloadGroups.set(key, promise);
  return promise;
}

function allPortfolioEntryTasks(priority: Priority) {
  return [
    loadAiProjectDetail().then(() => undefined),
    loadQixinProjectDetail().then(() => undefined),
    ...AI_FLOW_IMAGES.map((src) => preloadImage(src, priority)),
    ...QIXIN_IMAGES.map((src) => preloadImage(src, priority)),
  ];
}

function currentRouteTasks(route: string, priority: Priority) {
  const tasks: Promise<void>[] = [];
  if (!isBrowser()) return tasks;

  tasks.push(
    (document.fonts?.ready ?? Promise.resolve()).then(() => undefined)
  );

  tasks.push(...allPortfolioEntryTasks(priority));

  return tasks;
}

export async function preloadPortfolioEntryAssets(route: string, onProgress: ProgressCallback) {
  if (!isBrowser()) {
    onProgress(1);
    return;
  }

  const tasks = currentRouteTasks(route, "high");
  if (tasks.length === 0) {
    onProgress(1);
    return;
  }

  let completed = 0;
  const total = tasks.length;
  onProgress(0);

  await Promise.allSettled(
    tasks.map((task) =>
      task.finally(() => {
        completed += 1;
        onProgress(completed / total);
      })
    )
  );

  onProgress(1);
}

export function scheduleHomeProjectPreload() {
  if (!isBrowser()) return () => {};

  let cancelled = false;
  const idleWindow = window as IdleWindow;

  const run = () => {
    if (cancelled) return;
    void (async () => {
      await preloadProjectDetailAssets("ai-report", "low");
      if (cancelled) return;
      await delay(500);
      if (cancelled) return;
      await preloadProjectDetailAssets("qixin-brain", "low");
    })();
  };

  const handle =
    idleWindow.requestIdleCallback?.(run, { timeout: 1800 }) ??
    window.setTimeout(run, 1400);

  return () => {
    cancelled = true;
    if (idleWindow.cancelIdleCallback && typeof handle === "number") {
      idleWindow.cancelIdleCallback(handle);
    } else {
      window.clearTimeout(handle);
    }
  };
}
