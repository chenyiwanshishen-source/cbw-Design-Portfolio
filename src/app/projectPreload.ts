type ProjectKey = "ai-report" | "qixin-brain";
type Priority = "high" | "low";

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
  "./images/ai-report-flow/step-01-blank-canvas.png",
  "./images/ai-report-flow/step-01-sidebar.png",
  "./images/ai-report-flow/step-01-final-template-center.png",
  "./images/ai-report-flow/step-01-template-region.png",
  "./images/ai-report-flow/step-01-template-opinion.png",
  "./images/ai-report-flow/step-01-template-chain.png",
  "./images/ai-report-flow/step-01-template-futian.png",
  "./images/ai-report-flow/step-02-final-outline.png",
  "./images/optimized/ai-outline-confirm-900.png",
  "./images/04/kongbaihuabu.png",
  "./images/04/liushihuaban.png",
  "./images/optimized/ai-stream-text-1400.jpg",
  "./images/05/lishijilupng.png",
];

const QIXIN_CRITICAL_IMAGES = [
  "./images/optimized/qixin-home-1920.jpg",
  "./images/optimized/qixin-entry-1600.jpg",
  "./images/optimized/qixin-search-1600.jpg",
  "./images/optimized/qixin-supply-chain-1600.jpg",
  "./images/optimized/qixin-batch-query-1600.jpg",
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
    img.onload = () => resolve();
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
    preloadImagesInBatches(QIXIN_CRITICAL_IMAGES, priority, priority === "high" ? 3 : 2),
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
