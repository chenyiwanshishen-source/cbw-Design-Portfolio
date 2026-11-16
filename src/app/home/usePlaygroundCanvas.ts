import { useLayoutEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type PointerEvent } from 'react';

export type CanvasItem = { id: string; x: number; y: number; width: number; height: number };
export type CanvasCamera = { x: number; y: number; scale: number };
type Point = { x: number; y: number };
type Positions = Record<string, Point>;
type FitMode = 'home' | 'overview';
type SingleGesture = {
  kind: 'pan' | 'item';
  pointerId: number;
  start: Point;
  camera: CanvasCamera;
  itemId?: string;
  itemOrigin?: Point;
  moved: boolean;
};
type PinchGesture = {
  kind: 'pinch';
  ids: [number, number];
  distance: number;
  scale: number;
  worldAnchor: Point;
};
type Gesture = SingleGesture | PinchGesture;

const MIN_SCALE = 0.1;
const MAX_SCALE = 2;
const HOME_VIEW_ZOOM = 1.18;
const DRAG_THRESHOLD = 6;
const initialPositions = (items: readonly CanvasItem[]): Positions => Object.fromEntries(items.map(item => [item.id, { x: item.x, y: item.y }]));
const initialLayers = (items: readonly CanvasItem[]) => Object.fromEntries(items.map((item, index) => [item.id, index + 1]));
const midpoint = (a: Point, b: Point): Point => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const isControl = (target: EventTarget | null) => target instanceof Element && !!target.closest('button, a, input, textarea, select, [contenteditable="true"]');

/** World coordinates are deliberately unbounded; only the viewport clips the view. */
export function usePlaygroundCanvas(items: readonly CanvasItem[]) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const [camera, setCamera] = useState<CanvasCamera>({ x: 0, y: 0, scale: 1 });
  const cameraRef = useRef(camera);
  const [savedPositions, setPositions] = useState<Positions>(() => initialPositions(items));
  const positionsRef = useRef(savedPositions);
  const [savedLayers, setLayers] = useState(() => initialLayers(items));
  const layersRef = useRef(savedLayers);
  const highestLayer = useRef(items.length);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef<Gesture | null>(null);
  const spaceHeld = useRef(false);
  // Null means a manually adjusted view; resize then preserves its world center.
  const preferredFitMode = useRef<FitMode | null>('home');
  const viewportSize = useRef({ width: 0, height: 0 });

  const positions = Object.fromEntries(items.map(item => [item.id, savedPositions[item.id] ?? { x: item.x, y: item.y }]));
  const itemLayers = Object.fromEntries(items.map((item, index) => [item.id, savedLayers[item.id] ?? index + 1]));

  function commitCamera(next: CanvasCamera) {
    cameraRef.current = next;
    setCamera(next);
  }

  function commitPositions(next: Positions) {
    positionsRef.current = next;
    setPositions(next);
  }

  function getPosition(id: string) {
    const position = positionsRef.current[id] ?? itemsRef.current.find(item => item.id === id);
    return position ? { x: position.x, y: position.y } : { x: 0, y: 0 };
  }

  function raise(id: string) {
    highestLayer.current = Math.max(highestLayer.current, itemsRef.current.length) + 1;
    const next = { ...layersRef.current, [id]: highestLayer.current };
    layersRef.current = next;
    setLayers(next);
  }

  function stopGestures() {
    const ids = [...pointers.current.keys()];
    pointers.current.clear();
    gesture.current = null;
    setActiveItemId(null);
    setIsPanning(false);
    for (const id of ids) {
      if (viewportRef.current?.hasPointerCapture(id)) viewportRef.current.releasePointerCapture(id);
    }
  }

  function fitView(mode: FitMode, nextPositions = positionsRef.current) {
    preferredFitMode.current = mode;
    const viewport = viewportRef.current;
    if (!viewport || !viewport.clientWidth || !viewport.clientHeight) return;
    const content = itemsRef.current;
    if (!content.length) { commitCamera({ x: viewport.clientWidth / 2, y: viewport.clientHeight / 2, scale: 1 }); return; }
    const left = Math.min(...content.map(item => (nextPositions[item.id] ?? item).x));
    const top = Math.min(...content.map(item => (nextPositions[item.id] ?? item).y));
    const right = Math.max(...content.map(item => (nextPositions[item.id] ?? item).x + item.width));
    const bottom = Math.max(...content.map(item => (nextPositions[item.id] ?? item).y + item.height));
    const padding = viewport.clientWidth < 600 ? 28 : 88;
    const availableWidth = Math.max(1, viewport.clientWidth - padding * 2);
    const availableHeight = Math.max(1, viewport.clientHeight - padding * 2);
    // Fit may go below the normal zoom minimum if items were dragged far apart.
    const fitScale = Math.max(0.00001, Math.min(1, availableWidth / Math.max(1, right - left), availableHeight / Math.max(1, bottom - top)));
    // Enlarge the home view while keeping overview as a complete content fit.
    const homeScale = viewport.clientWidth < 900 ? Math.max(0.36, fitScale) : fitScale;
    const scale = mode === 'home' ? homeScale * HOME_VIEW_ZOOM : fitScale;
    commitCamera({
      x: viewport.clientWidth / 2 - (left + right) / 2 * scale,
      y: viewport.clientHeight / 2 - (top + bottom) / 2 * scale,
      scale,
    });
  }

  function fitToContent() { stopGestures(); fitView('overview'); }

  function zoomAt(nextScale: number, anchor: Point, minimum = Math.min(MIN_SCALE, cameraRef.current.scale)) {
    const current = cameraRef.current;
    const scale = Math.max(minimum, Math.min(MAX_SCALE, nextScale));
    if (scale === current.scale) return;
    const world = { x: (anchor.x - current.x) / current.scale, y: (anchor.y - current.y) / current.scale };
    preferredFitMode.current = null;
    commitCamera({ x: anchor.x - world.x * scale, y: anchor.y - world.y * scale, scale });
  }

  function zoomBy(factor: number) {
    stopGestures();
    const viewport = viewportRef.current;
    if (viewport) zoomAt(cameraRef.current.scale * factor, { x: viewport.clientWidth / 2, y: viewport.clientHeight / 2 });
  }

  function resetLayout() {
    stopGestures();
    const next = initialPositions(itemsRef.current);
    const nextLayers = initialLayers(itemsRef.current);
    commitPositions(next);
    layersRef.current = nextLayers;
    setLayers(nextLayers);
    highestLayer.current = itemsRef.current.length;
    fitView('home', next);
  }

  function localPoint(clientX: number, clientY: number): Point {
    const viewport = viewportRef.current!;
    const bounds = viewport.getBoundingClientRect();
    return { x: clientX - bounds.left - viewport.clientLeft, y: clientY - bounds.top - viewport.clientTop };
  }

  function beginPinch() {
    const entries = [...pointers.current.entries()];
    if (entries.length < 2) return;
    const [first, second] = entries;
    const center = midpoint(first[1], second[1]);
    const current = cameraRef.current;
    gesture.current = {
      kind: 'pinch', ids: [first[0], second[0]], distance: Math.max(1, distance(first[1], second[1])), scale: current.scale,
      worldAnchor: { x: (center.x - current.x) / current.scale, y: (center.y - current.y) / current.scale },
    };
    setActiveItemId(null);
    setIsPanning(true);
  }

  function startPointer(event: PointerEvent<HTMLElement>, itemId?: string) {
    if (!viewportRef.current || isControl(event.target) || (event.button !== 0 && event.button !== 1)) return;
    event.preventDefault();
    event.stopPropagation();
    const point = localPoint(event.clientX, event.clientY);
    pointers.current.set(event.pointerId, point);
    viewportRef.current.setPointerCapture(event.pointerId);
    if (pointers.current.size >= 2) { beginPinch(); return; }
    const moveItem = itemId && !spaceHeld.current && event.button !== 1;
    gesture.current = {
      kind: moveItem ? 'item' : 'pan', pointerId: event.pointerId, start: point, camera: { ...cameraRef.current },
      itemId: moveItem ? itemId : undefined, itemOrigin: moveItem ? { ...getPosition(itemId) } : undefined, moved: false,
    };
    if (moveItem) {
      raise(itemId);
      event.currentTarget.focus({ preventScroll: true });
      setActiveItemId(itemId);
      setIsPanning(false);
    } else {
      viewportRef.current.focus({ preventScroll: true });
      setActiveItemId(null);
      setIsPanning(true);
    }
  }

  function movePointer(event: PointerEvent<HTMLElement>) {
    if (!pointers.current.has(event.pointerId) || !viewportRef.current) return;
    if (event.pointerType === 'mouse' && event.buttons === 0) { stopGestures(); return; }
    event.preventDefault();
    pointers.current.set(event.pointerId, localPoint(event.clientX, event.clientY));
    const currentGesture = gesture.current;
    if (!currentGesture) return;
    if (currentGesture.kind === 'pinch') {
      const a = pointers.current.get(currentGesture.ids[0]);
      const b = pointers.current.get(currentGesture.ids[1]);
      if (!a || !b) return;
      const center = midpoint(a, b);
      const scale = Math.max(Math.min(MIN_SCALE, currentGesture.scale), Math.min(MAX_SCALE, currentGesture.scale * distance(a, b) / currentGesture.distance));
      preferredFitMode.current = null;
      commitCamera({ x: center.x - currentGesture.worldAnchor.x * scale, y: center.y - currentGesture.worldAnchor.y * scale, scale });
      return;
    }
    if (currentGesture.pointerId !== event.pointerId) return;
    const point = pointers.current.get(event.pointerId)!;
    const dx = point.x - currentGesture.start.x;
    const dy = point.y - currentGesture.start.y;
    if (!currentGesture.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    currentGesture.moved = true;
    preferredFitMode.current = null;
    if (currentGesture.kind === 'item' && currentGesture.itemId && currentGesture.itemOrigin) {
      commitPositions({ ...positionsRef.current, [currentGesture.itemId]: {
        x: currentGesture.itemOrigin.x + dx / currentGesture.camera.scale,
        y: currentGesture.itemOrigin.y + dy / currentGesture.camera.scale,
      } });
    } else {
      commitCamera({ ...currentGesture.camera, x: currentGesture.camera.x + dx, y: currentGesture.camera.y + dy });
    }
  }

  function finishPointer(event: PointerEvent<HTMLElement>) {
    if (!pointers.current.delete(event.pointerId)) return;
    setActiveItemId(null);
    if (pointers.current.size >= 2) beginPinch();
    else if (pointers.current.size === 1) {
      const [pointerId, point] = [...pointers.current.entries()][0];
      // Rebase the remaining finger after a pinch; its next move starts here.
      gesture.current = { kind: 'pan', pointerId, start: point, camera: { ...cameraRef.current }, moved: false };
      setIsPanning(true);
    } else {
      gesture.current = null;
      setIsPanning(false);
    }
    if (viewportRef.current?.hasPointerCapture(event.pointerId)) viewportRef.current.releasePointerCapture(event.pointerId);
  }

  function revealFocusedItem(id: string) {
    const item = itemsRef.current.find(entry => entry.id === id);
    const viewport = viewportRef.current;
    if (!item || !viewport) return;
    const position = getPosition(id);
    const current = cameraRef.current;
    const margin = 24;
    const left = current.x + position.x * current.scale;
    const top = current.y + position.y * current.scale;
    const width = item.width * current.scale;
    const height = item.height * current.scale;
    let x = current.x;
    let y = current.y;
    if (width > viewport.clientWidth - margin * 2) x = viewport.clientWidth / 2 - (position.x + item.width / 2) * current.scale;
    else if (left < margin) x += margin - left;
    else if (left + width > viewport.clientWidth - margin) x -= left + width - viewport.clientWidth + margin;
    if (height > viewport.clientHeight - margin * 2) y = viewport.clientHeight / 2 - (position.y + item.height / 2) * current.scale;
    else if (top < margin) y += margin - top;
    else if (top + height > viewport.clientHeight - margin) y -= top + height - viewport.clientHeight + margin;
    if (x !== current.x || y !== current.y) { preferredFitMode.current = null; commitCamera({ ...current, x, y }); }
  }

  function viewportKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (isControl(event.target) || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.code === 'Space') { event.preventDefault(); spaceHeld.current = true; return; }
    const step = event.shiftKey ? 120 : 48;
    const directions: Record<string, Point> = { ArrowLeft: { x: step, y: 0 }, ArrowRight: { x: -step, y: 0 }, ArrowUp: { x: 0, y: step }, ArrowDown: { x: 0, y: -step } };
    const direction = directions[event.key];
    if (direction) {
      event.preventDefault(); stopGestures(); preferredFitMode.current = null;
      commitCamera({ ...cameraRef.current, x: cameraRef.current.x + direction.x, y: cameraRef.current.y + direction.y });
    } else if (event.key === '+' || event.key === '=') { event.preventDefault(); zoomBy(1.2); }
    else if (event.key === '-') { event.preventDefault(); zoomBy(1 / 1.2); }
    else if (event.key === '0' || event.key === 'Home') { event.preventDefault(); fitToContent(); }
    else if (event.key === 'Escape') { event.preventDefault(); stopGestures(); spaceHeld.current = false; }
  }

  function getItemHandlers(id: string) {
    return {
      onPointerDown: (event: PointerEvent<HTMLElement>) => startPointer(event, id),
      onFocus: (event: FocusEvent<HTMLElement>) => {
        if (event.currentTarget.matches(':focus-visible')) { raise(id); revealFocusedItem(id); }
      },
      onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        const step = event.shiftKey ? 80 : 20;
        const directions: Record<string, Point> = { ArrowLeft: { x: -step, y: 0 }, ArrowRight: { x: step, y: 0 }, ArrowUp: { x: 0, y: -step }, ArrowDown: { x: 0, y: step } };
        const direction = directions[event.key];
        if (!direction) return;
        event.preventDefault(); event.stopPropagation();
        const origin = getPosition(id);
        preferredFitMode.current = null;
        commitPositions({ ...positionsRef.current, [id]: { x: origin.x + direction.x, y: origin.y + direction.y } });
        raise(id);
        revealFocusedItem(id);
      },
    };
  }

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    function resize() {
      const width = viewport!.clientWidth;
      const height = viewport!.clientHeight;
      if (!width || !height) return;
      const previous = viewportSize.current;
      if (width === previous.width && height === previous.height) return;
      stopGestures();
      viewportSize.current = { width, height };
      if (!previous.width || !previous.height || preferredFitMode.current) fitView(preferredFitMode.current ?? 'home');
      else {
        const current = cameraRef.current;
        commitCamera({ ...current, x: current.x + (width - previous.width) / 2, y: current.y + (height - previous.height) / 2 });
      }
    }
    function wheel(event: WheelEvent) {
      if (isControl(event.target)) return;
      event.preventDefault();
      if (pointers.current.size) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport!.clientHeight : 1;
      const dx = event.deltaX * unit;
      const dy = event.deltaY * unit;
      if (event.ctrlKey || event.metaKey) {
        zoomAt(cameraRef.current.scale * Math.exp(-dy * 0.002), localPoint(event.clientX, event.clientY));
      } else {
        const shiftHorizontal = event.shiftKey && dx === 0;
        preferredFitMode.current = null;
        commitCamera({ ...cameraRef.current, x: cameraRef.current.x - (shiftHorizontal ? dy : dx), y: cameraRef.current.y - (shiftHorizontal ? 0 : dy) });
      }
    }
    function keyUp(event: globalThis.KeyboardEvent) { if (event.code === 'Space') spaceHeld.current = false; }
    function blur() { spaceHeld.current = false; stopGestures(); }
    const observer = new ResizeObserver(resize);
    observer.observe(viewport);
    viewport.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('keyup', keyUp);
    window.addEventListener('blur', blur);
    resize();
    return () => {
      observer.disconnect();
      viewport.removeEventListener('wheel', wheel);
      window.removeEventListener('keyup', keyUp);
      window.removeEventListener('blur', blur);
      const ids = [...pointers.current.keys()];
      pointers.current.clear();
      gesture.current = null;
      for (const id of ids) if (viewport.hasPointerCapture(id)) viewport.releasePointerCapture(id);
    };
  }, []);

  return {
    viewportRef, camera, positions, activeItemId, isPanning, itemLayers,
    viewportHandlers: {
      onPointerDown: (event: PointerEvent<HTMLElement>) => startPointer(event),
      onPointerMove: movePointer,
      onPointerUp: finishPointer,
      onPointerCancel: stopGestures,
      onLostPointerCapture: (event: PointerEvent<HTMLElement>) => { if (event.target === event.currentTarget && pointers.current.has(event.pointerId)) stopGestures(); },
      onKeyDown: viewportKeyDown,
    },
    getItemHandlers,
    zoomIn: () => zoomBy(1.2),
    zoomOut: () => zoomBy(1 / 1.2),
    fitToContent,
    resetLayout,
  };
}
