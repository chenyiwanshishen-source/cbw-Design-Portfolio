type ProjectKey = "ai-report" | "qixin-brain" | "explorations";
type Priority = "high" | "low";
type ProgressCallback = (progress: number) => void;
type WeightedTask = {
  run: (reportDelta: (delta: number) => void) => Promise<void>;
  weight: number;
};

type PrioritizedImage = HTMLImageElement & {
  fetchPriority?: "high" | "low" | "auto";
};

type PreloadBatchOptions = {
  batchDelayMs?: number;
  shouldContinue?: () => boolean;
};

export const loadAiProjectDetail = () => import("./components/ProjectDetail");
export const loadQixinProjectDetail = () => import("./components/QixinProjectDetail");
export const loadExplorationsPage = () => import("./components/ExplorationsPage");
export const loadHomeContent = () => import("./components/HomeContent");
export const loadNav = () => import("./components/Nav");

const AI_FLOW_IMAGES = [
  "./images/ai-report-hero-full.webp",
  "./images/ai-report-hero-toggle-01.webp",
  "./images/ai-report-hero-toggle-02.webp",
  "./images/ai-repor- left-01.webp",
  "./images/ai- report-right-01.webp",
  "./images/ai-report-flow-webp/step-01-final-template-center.webp",
  "./images/ai-report-flow-webp/step-02-final-outline.webp",
  "./images/ai-report-flow-webp/step-02-final-outline-02.webp",
  "./images/0405-webp/kongbaihuabu.webp",
  "./images/0405-webp/liushihuaban.webp",
  "./images/optimized-webp/ai-stream-text-1400.webp",
  "./images/0405-webp/lishijilupng.webp",
  "./images/optimized-webp/ai-data01-1600.webp",
  "./images/optimized-webp/ai-group02-1600.webp",
  "./images/optimized-webp/ai-group01-1600.webp",
  "./images/optimized-webp/ai-marry01-1600.webp",
  "./images/设计方案/marry02.png",
  "./images/首页webp/数据溯源/多互联网数据.webp",
  "./images/首页webp/数据溯源/启信产业大脑数据.webp",
  "./images/首页webp/数据溯源/模型运算.webp",
  "./images/首页webp/数据溯源/生成内容.webp",
  "./images/章节提示词/line-01.svg",
];

const QIXIN_IMAGES = [
  "./images/首页webp/login.webp",
  "./images/首页webp/push group.webp",
  "./images/启信产业大脑-webp/产业信息.webp",
  "./images/启信产业大脑-webp/产业报告.svg",
  "./images/启信产业大脑-webp/企业报告.svg",
  "./images/启信产业大脑-webp/企业监控入口.webp",
  "./images/启信产业大脑-webp/常用功能.webp",
  "./images/启信产业大脑-webp/异动预警.webp",
  "./images/启信产业大脑-webp/弹窗.webp",
  "./images/启信产业大脑-webp/时间选择器.webp",
  "./images/启信产业大脑-webp/舆情速递.webp",
  "./images/optimized-webp/qixin-home-1920.webp",
  "./images/optimized-webp/qixin-entry-1600.webp",
  "./images/optimized-webp/qixin-search-1600.webp",
  "./images/optimized-webp/qixin-supply-chain-1600.webp",
  "./images/optimized-webp/qixin-batch-query-1600.webp",
  "./images/optimized-webp/qixin-business-info-1600.webp",
  "./images/optimized-webp/qixin-chain-action-1600.webp",
  "./images/optimized-webp/qixin-chain-map-1600.webp",
  "./images/optimized-webp/qixin-color-1600.webp",
  "./images/optimized-webp/qixin-company-detail-1600.webp",
  "./images/启信产业大脑-webp/新建产业链弹窗.webp",
  "./images/启信产业大脑-webp/产品词.svg",
  "./images/启信产业大脑-webp/一级环节.svg",
  "./images/optimized-webp/qixin-custom-chain-edit01-1600.webp",
  "./images/optimized-webp/qixin-custom-chain-edit02-1600.webp",
  "./images/optimized-webp/qixin-custom-chain-edit03-1600.webp",
  "./images/optimized-webp/qixin-custom-chain-list-1600.webp",
  "./images/optimized-webp/qixin-industry-detail-1600.webp",
  "./images/optimized-webp/qixin-monitor-1600.webp",
  "./images/optimized-webp/qixin-park-recruit-1600.webp",
  "./images/optimized-webp/qixin-relation-1600.webp",
  "./images/optimized-webp/qixin-report-center-1600.webp",
  "./images/optimized-webp/qixin-text-1600.webp",
];

const AI_ENTRY_IMAGES = [
  "./images/ai-report-hero-full.webp",
];

const QIXIN_ENTRY_IMAGES = [
  "./images/optimized-webp/qixin-home-1920.webp",
];

const HOME_ENTRY_IMAGES = [
  "./images/首页webp/AI报告生成.webp",
  "./images/首页webp/自定义产业链.webp",
];

const QIXIN_REMAINDER_IMAGE_STAGES = [
  [
    "./images/首页webp/login.webp",
    "./images/首页webp/push group.webp",
    "./images/optimized-webp/qixin-entry-1600.webp",
    "./images/启信产业大脑-webp/企业报告.svg",
    "./images/启信产业大脑-webp/产业报告.svg",
    "./images/启信产业大脑-webp/舆情速递.webp",
  ],
  [
    "./images/启信产业大脑-webp/产业信息.webp",
    "./images/启信产业大脑-webp/企业监控入口.webp",
    "./images/启信产业大脑-webp/常用功能.webp",
    "./images/启信产业大脑-webp/异动预警.webp",
    "./images/optimized-webp/qixin-search-1600.webp",
    "./images/optimized-webp/qixin-supply-chain-1600.webp",
    "./images/optimized-webp/qixin-batch-query-1600.webp",
  ],
  [
    "./images/optimized-webp/qixin-business-info-1600.webp",
    "./images/optimized-webp/qixin-chain-action-1600.webp",
    "./images/optimized-webp/qixin-chain-map-1600.webp",
    "./images/optimized-webp/qixin-company-detail-1600.webp",
    "./images/optimized-webp/qixin-relation-1600.webp",
    "./images/optimized-webp/qixin-industry-detail-1600.webp",
  ],
  [
    "./images/启信产业大脑-webp/弹窗.webp",
    "./images/启信产业大脑-webp/时间选择器.webp",
    "./images/启信产业大脑-webp/新建产业链弹窗.webp",
    "./images/启信产业大脑-webp/产品词.svg",
    "./images/启信产业大脑-webp/一级环节.svg",
    "./images/optimized-webp/qixin-color-1600.webp",
    "./images/optimized-webp/qixin-custom-chain-edit01-1600.webp",
    "./images/optimized-webp/qixin-custom-chain-edit02-1600.webp",
    "./images/optimized-webp/qixin-custom-chain-edit03-1600.webp",
    "./images/optimized-webp/qixin-custom-chain-list-1600.webp",
    "./images/optimized-webp/qixin-monitor-1600.webp",
    "./images/optimized-webp/qixin-park-recruit-1600.webp",
    "./images/optimized-webp/qixin-report-center-1600.webp",
    "./images/optimized-webp/qixin-text-1600.webp",
  ],
];

const AI_REMAINDER_IMAGE_STAGES = [
  [
    "./images/ai-repor- left-01.webp",
    "./images/ai- report-right-01.webp",
    "./images/ai-report-hero-toggle-01.webp",
    "./images/ai-report-hero-toggle-02.webp",
    "./images/章节提示词/line-01.svg",
  ],
  [
    "./images/ai-report-flow-webp/step-01-final-template-center.webp",
  ],
  [
    "./images/ai-report-flow-webp/step-02-final-outline.webp",
    "./images/ai-report-flow-webp/step-02-final-outline-02.webp",
    "./images/0405-webp/kongbaihuabu.webp",
    "./images/0405-webp/liushihuaban.webp",
    "./images/optimized-webp/ai-stream-text-1400.webp",
    "./images/0405-webp/lishijilupng.webp",
  ],
  [
    "./images/optimized-webp/ai-data01-1600.webp",
    "./images/optimized-webp/ai-group02-1600.webp",
    "./images/optimized-webp/ai-group01-1600.webp",
    "./images/optimized-webp/ai-marry01-1600.webp",
    "./images/设计方案/marry02.png",
  ],
  [
    "./images/首页webp/数据溯源/生成内容.webp",
    "./images/首页webp/数据溯源/多互联网数据.webp",
    "./images/首页webp/数据溯源/启信产业大脑数据.webp",
    "./images/首页webp/数据溯源/模型运算.webp",
  ],
];

function withoutEntryImages(images: string[], entryImages: string[]) {
  const entrySet = new Set(entryImages);
  return images.filter((src) => !entrySet.has(src));
}

const AI_DEFERRED_IMAGES = withoutEntryImages(AI_FLOW_IMAGES, AI_ENTRY_IMAGES);
const QIXIN_DEFERRED_IMAGES = withoutEntryImages(QIXIN_IMAGES, QIXIN_ENTRY_IMAGES);

const imagePromises = new Map<string, Promise<void>>();
const preloadGroups = new Map<string, Promise<void>>();
const readyProjects = new Set<ProjectKey>();

const PROJECT_READY_SESSION_PREFIX = "portfolio:project-ready:v1:";

const FONT_PROGRESS_WEIGHT = 80_000;
const MODULE_PROGRESS_WEIGHT = 140_000;
const FALLBACK_IMAGE_WEIGHT = 360_000;
const IMAGE_PROGRESS_TIMEOUT_MS = 20_000;
const HOME_READY_DELAY_MS = 180;

function isBrowser() {
  return typeof window !== "undefined" && typeof Image !== "undefined";
}

function projectKeyFromRoute(route: string): ProjectKey | null {
  if (route === "#/project/ai-report") return "ai-report";
  if (route === "#/project/qixin-brain") return "qixin-brain";
  if (route === "#/project/explorations") return "explorations";
  return null;
}

function markProjectReady(project: ProjectKey) {
  readyProjects.add(project);
  if (!isBrowser()) return;

  try {
    window.sessionStorage.setItem(`${PROJECT_READY_SESSION_PREFIX}${project}`, "1");
  } catch {
    // Some privacy modes disable session storage; the in-memory readiness still works.
  }
}

function hasSessionProjectReady(project: ProjectKey) {
  if (!isBrowser()) return false;

  try {
    return window.sessionStorage.getItem(`${PROJECT_READY_SESSION_PREFIX}${project}`) === "1";
  } catch {
    return false;
  }
}

export function isProjectRouteReady(route: string) {
  const project = projectKeyFromRoute(route);
  return project ? readyProjects.has(project) || hasSessionProjectReady(project) : false;
}

function resolveAssetUrl(src: string) {
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  const normalized = src.startsWith("/") ? `.${src}` : src;
  if (!isBrowser()) return normalized;
  return new URL(normalized, window.location.href).href;
}

function canContinuePreload(options?: PreloadBatchOptions) {
  return options?.shouldContinue ? options.shouldContinue() : true;
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
      if (priority === "high" && typeof img.decode === "function") {
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

function reportClampedProgress(loaded: number, total: number, onProgress: ProgressCallback) {
  onProgress(Math.max(0, Math.min(1, loaded / total)));
}

function decodeImageUrl(href: string, priority: Priority) {
  return new Promise<void>((resolve) => {
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
}

async function preloadImageWithByteProgress(
  src: string,
  priority: Priority,
  weight: number,
  reportDelta: (delta: number) => void
) {
  if (!isBrowser()) {
    reportDelta(weight);
    return;
  }

  const href = resolveAssetUrl(src);
  const cached = imagePromises.get(href);
  if (cached) {
    await Promise.race([cached, delay(IMAGE_PROGRESS_TIMEOUT_MS)]);
    reportDelta(weight);
    return;
  }

  let reported = 0;
  let timeoutId: number | undefined;
  const finish = () => {
    const delta = weight - reported;
    if (delta > 0) {
      reported = weight;
      reportDelta(delta);
    }
  };
  const reportLoadedBytes = (loadedBytes: number, totalBytes: number) => {
    const ratio = totalBytes > 0 ? loadedBytes / totalBytes : 0;
    const next = Math.min(weight * 0.92, Math.max(0, ratio) * weight * 0.92);
    const delta = next - reported;
    if (delta > 0) {
      reported = next;
      reportDelta(delta);
    }
  };

  const loadPromise = (async () => {
    try {
      const response = await fetch(href, { cache: "force-cache" });
      const totalBytes = Number(response.headers.get("content-length")) || weight;

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        let loadedBytes = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          loadedBytes += value.byteLength;
          reportLoadedBytes(loadedBytes, totalBytes);
        }
      }

      await decodeImageUrl(href, priority);
    } catch {
      await decodeImageUrl(href, priority);
    } finally {
      finish();
      if (timeoutId) window.clearTimeout(timeoutId);
    }
  })();

  const guardedPromise = new Promise<void>((resolve) => {
    timeoutId = window.setTimeout(() => {
      finish();
      resolve();
    }, IMAGE_PROGRESS_TIMEOUT_MS);
    void loadPromise.then(resolve).catch(resolve);
  });

  imagePromises.set(href, guardedPromise);
  await guardedPromise;
}

async function preloadImagesInBatches(
  images: string[],
  priority: Priority,
  batchSize: number,
  options?: PreloadBatchOptions
) {
  for (let i = 0; i < images.length; i += batchSize) {
    if (!canContinuePreload(options)) return;
    const batch = images.slice(i, i + batchSize);
    await Promise.all(batch.map((src) => preloadImage(src, priority)));
    if (!canContinuePreload(options)) return;
    if (priority === "low" && i + batchSize < images.length) {
      await delay(options?.batchDelayMs ?? 220);
    }
  }
}

function delay(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function isProjectRoute(route: string) {
  return (
    route === "#/project/ai-report" ||
    route === "#/project/qixin-brain" ||
    route === "#/project/explorations"
  );
}

function shouldAvoidSpeculativePreload() {
  if (!isBrowser()) return true;

  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  return Boolean(
    connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g" ||
      connection?.effectiveType === "3g"
  );
}

function shouldAvoidActiveRoutePreload() {
  if (!isBrowser()) return true;

  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean };
  }).connection;
  return Boolean(connection?.saveData);
}

async function preloadAi(priority: Priority) {
  const images = priority === "high" ? AI_ENTRY_IMAGES : AI_DEFERRED_IMAGES;
  await Promise.allSettled([
    loadAiProjectDetail(),
    preloadImagesInBatches(images, priority, priority === "high" ? 3 : 2),
  ]);
}

async function preloadQixin(priority: Priority) {
  const images = priority === "high" ? QIXIN_ENTRY_IMAGES : QIXIN_DEFERRED_IMAGES;
  await Promise.allSettled([
    loadQixinProjectDetail(),
    preloadImagesInBatches(images, priority, priority === "high" ? 3 : 2),
  ]);
}

async function preloadExplorations() {
  await Promise.allSettled([loadExplorationsPage()]);
}

export function preloadProjectDetailAssets(project: ProjectKey, priority: Priority = "high") {
  const key = `${project}:${priority}`;
  const existing = preloadGroups.get(key);
  if (existing) return existing;

  const preloadPromise =
    project === "ai-report"
      ? preloadAi(priority)
      : project === "qixin-brain"
      ? preloadQixin(priority)
      : preloadExplorations();
  const promise =
    priority === "high"
      ? preloadPromise.then(() => {
          markProjectReady(project);
        })
      : preloadPromise;
  preloadGroups.set(key, promise);
  return promise;
}

export function warmProjectDetailModule(project: ProjectKey) {
  if (project === "ai-report") return loadAiProjectDetail();
  if (project === "qixin-brain") return loadQixinProjectDetail();
  return loadExplorationsPage();
}

async function warmProjectPreviewAssets(
  project: ProjectKey,
  options?: PreloadBatchOptions
) {
  if (!isBrowser() || !canContinuePreload(options)) return;

  const images =
    project === "ai-report"
      ? AI_ENTRY_IMAGES
      : project === "qixin-brain"
      ? QIXIN_ENTRY_IMAGES
      : [];
  await warmProjectDetailModule(project);
  if (!canContinuePreload(options)) return;
  if (images.length > 0) {
    await preloadImagesInBatches(images, "low", 1, {
      batchDelayMs: project === "qixin-brain" ? 720 : 420,
      shouldContinue: options?.shouldContinue,
    });
  }
  if (canContinuePreload(options)) markProjectReady(project);
}

function portfolioEntryImages(route: string) {
  if (route === "#/project/qixin-brain") return QIXIN_ENTRY_IMAGES;
  if (route === "#/project/explorations") return [];
  return AI_ENTRY_IMAGES;
}

async function currentRouteWeightedTasks(route: string, priority: Priority) {
  const tasks: WeightedTask[] = [];
  if (!isBrowser()) return tasks;

  tasks.push({
    weight: FONT_PROGRESS_WEIGHT,
    run: async () => {
      await (document.fonts?.ready ?? Promise.resolve());
    },
  });

  if (!isProjectRoute(route)) {
    tasks.push({
      weight: MODULE_PROGRESS_WEIGHT,
      run: async () => {
        await Promise.allSettled([loadHomeContent(), loadNav(), delay(HOME_READY_DELAY_MS)]);
      },
    });
    HOME_ENTRY_IMAGES.forEach((src) => {
      const weight = FALLBACK_IMAGE_WEIGHT * 0.72;
      tasks.push({
        weight,
        run: (reportDelta) => preloadImageWithByteProgress(src, priority, weight, reportDelta),
      });
    });
    return tasks;
  }

  const loadEntryModule =
    route === "#/project/qixin-brain"
      ? loadQixinProjectDetail
      : route === "#/project/explorations"
      ? loadExplorationsPage
      : loadAiProjectDetail;

  tasks.push({
    weight: MODULE_PROGRESS_WEIGHT,
    run: async () => {
      await loadEntryModule();
    },
  });

  const images = portfolioEntryImages(route);
  images.forEach((src) => {
    const weight = FALLBACK_IMAGE_WEIGHT;
    tasks.push({
      weight,
      run: (reportDelta) => preloadImageWithByteProgress(src, priority, weight, reportDelta),
    });
  });

  return tasks;
}

async function runWeightedProgressTasks(tasks: WeightedTask[], onProgress: ProgressCallback) {
  if (!isBrowser()) {
    onProgress(1);
    return;
  }

  if (tasks.length === 0) {
    onProgress(1);
    return;
  }

  let loaded = 0;
  const total = tasks.reduce((sum, task) => sum + task.weight, 0);
  onProgress(0);

  await Promise.allSettled(
    tasks.map(async (task) => {
      let reported = 0;
      const reportDelta = (delta: number) => {
        const safeDelta = Math.min(Math.max(0, delta), task.weight - reported);
        if (safeDelta <= 0) return;
        reported += safeDelta;
        loaded += safeDelta;
        reportClampedProgress(loaded, total, onProgress);
      };

      await task.run(reportDelta);
      reportDelta(task.weight - reported);
    })
  );

  onProgress(1);
}

export async function preloadPortfolioEntryAssets(route: string, onProgress: ProgressCallback) {
  const tasks = await currentRouteWeightedTasks(route, "high");
  await runWeightedProgressTasks(tasks, onProgress);
  const project = projectKeyFromRoute(route);
  if (project) markProjectReady(project);
}

export async function preloadRouteAssetsWithProgress(route: string, onProgress: ProgressCallback) {
  const tasks = await currentRouteWeightedTasks(route, "high");
  await runWeightedProgressTasks(tasks, onProgress);
  const project = projectKeyFromRoute(route);
  if (project) markProjectReady(project);
}

export function scheduleProjectRemainderPreload(project: ProjectKey) {
  if (!isBrowser()) return () => {};

  let cancelled = false;
  const shouldContinueCurrentProject = () => !cancelled && !shouldAvoidActiveRoutePreload();
  const shouldPreloadNextProject = () =>
    shouldContinueCurrentProject() && !shouldAvoidSpeculativePreload();

  const scheduleNextProjectPreview = () => {
    if (!shouldPreloadNextProject()) return;

    const nextProject: ProjectKey = project === "ai-report" ? "qixin-brain" : "ai-report";
    void warmProjectPreviewAssets(nextProject, {
      shouldContinue: shouldPreloadNextProject,
    });
  };

  const run = () => {
    void (async () => {
      const entryImages = project === "ai-report" ? AI_ENTRY_IMAGES : QIXIN_ENTRY_IMAGES;
      await preloadImagesInBatches(entryImages, "high", entryImages.length, {
        shouldContinue: shouldContinueCurrentProject,
      });
      if (!shouldContinueCurrentProject()) return;

      if (project === "qixin-brain") {
        for (let index = 0; index < QIXIN_REMAINDER_IMAGE_STAGES.length; index += 1) {
          if (!shouldContinueCurrentProject()) return;
          await preloadImagesInBatches(QIXIN_REMAINDER_IMAGE_STAGES[index], "low", index === 0 ? 2 : 1, {
            batchDelayMs: index === 0 ? 520 : 900,
            shouldContinue: shouldContinueCurrentProject,
          });
          if (index < QIXIN_REMAINDER_IMAGE_STAGES.length - 1) {
            await delay(1400);
          }
        }
      } else {
        for (let index = 0; index < AI_REMAINDER_IMAGE_STAGES.length; index += 1) {
          if (!shouldContinueCurrentProject()) return;
          await preloadImagesInBatches(AI_REMAINDER_IMAGE_STAGES[index], "low", index <= 1 ? 2 : 1, {
            batchDelayMs: index <= 1 ? 520 : 820,
            shouldContinue: shouldContinueCurrentProject,
          });
          if (index < AI_REMAINDER_IMAGE_STAGES.length - 1) {
            await delay(index <= 1 ? 960 : 1300);
          }
        }
      }

      if (!shouldContinueCurrentProject()) return;
      scheduleNextProjectPreview();
    })();
  };

  const handle = window.setTimeout(run, 0);

  return () => {
    cancelled = true;
    window.clearTimeout(handle);
  };
}
