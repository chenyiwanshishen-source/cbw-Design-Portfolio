type ProjectKey = "ai-report" | "qixin-brain";
type Priority = "high" | "low";
type ProgressCallback = (progress: number) => void;
type WeightedTask = {
  run: (reportDelta: (delta: number) => void) => Promise<void>;
  weight: number;
};

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

const AI_ENTRY_IMAGES = [
  "./images/ai-report-hero-full.png",
  "./images/ai-report-hero-toggle-01.png",
  "./images/ai-report-hero-toggle-02.png",
];

const QIXIN_ENTRY_IMAGES = [
  "./images/optimized/qixin-home-1920.jpg",
  "./images/首页/login.png",
  "./images/首页/push group.png",
];

function withoutEntryImages(images: string[], entryImages: string[]) {
  const entrySet = new Set(entryImages);
  return images.filter((src) => !entrySet.has(src));
}

const AI_DEFERRED_IMAGES = withoutEntryImages(AI_FLOW_IMAGES, AI_ENTRY_IMAGES);
const QIXIN_DEFERRED_IMAGES = withoutEntryImages(QIXIN_IMAGES, QIXIN_ENTRY_IMAGES);

const imagePromises = new Map<string, Promise<void>>();
const preloadGroups = new Map<string, Promise<void>>();

const FONT_PROGRESS_WEIGHT = 80_000;
const MODULE_PROGRESS_WEIGHT = 140_000;
const FALLBACK_IMAGE_WEIGHT = 360_000;
const IMAGE_PROGRESS_TIMEOUT_MS = 20_000;

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
    img.loading = priority === "high" ? "eager" : "lazy";
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
    await cached;
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

async function preloadImagesInBatches(images: string[], priority: Priority, batchSize: number) {
  for (let i = 0; i < images.length; i += batchSize) {
    const batch = images.slice(i, i + batchSize);
    await Promise.all(batch.map((src) => preloadImage(src, priority)));
    if (priority === "low" && i + batchSize < images.length) {
      await delay(220);
    }
  }
}

function delay(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
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

export function preloadProjectDetailAssets(project: ProjectKey, priority: Priority = "high") {
  const key = `${project}:${priority}`;
  const existing = preloadGroups.get(key);
  if (existing) return existing;

  const promise = project === "ai-report" ? preloadAi(priority) : preloadQixin(priority);
  preloadGroups.set(key, promise);
  return promise;
}

function portfolioEntryImages(route: string) {
  if (route === "#/project/qixin-brain") return QIXIN_ENTRY_IMAGES;
  return AI_ENTRY_IMAGES;
}

function projectFromRoute(route: string): ProjectKey {
  return route === "#/project/qixin-brain" ? "qixin-brain" : "ai-report";
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

  const loadEntryModule = route === "#/project/qixin-brain" ? loadQixinProjectDetail : loadAiProjectDetail;

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

export async function preloadPortfolioEntryAssets(route: string, onProgress: ProgressCallback) {
  if (!isBrowser()) {
    onProgress(1);
    return;
  }

  const tasks = await currentRouteWeightedTasks(route, "high");
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
  scheduleProjectRemainderPreload(projectFromRoute(route));
}

function scheduleProjectRemainderPreload(project: ProjectKey) {
  if (!isBrowser()) return;

  const idleWindow = window as IdleWindow;
  const run = () => {
    void (async () => {
      await delay(700);
      await preloadProjectDetailAssets(project, "low");
    })();
  };

  idleWindow.requestIdleCallback?.(run, { timeout: 2400 }) ?? window.setTimeout(run, 1600);
}

export function scheduleHomeProjectPreload() {
  if (!isBrowser()) return () => {};

  let cancelled = false;
  const idleWindow = window as IdleWindow;

  const run = () => {
    if (cancelled) return;
    void (async () => {
      await delay(700);
      if (cancelled) return;
      await preloadProjectDetailAssets("qixin-brain", "high");
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
