import { ComponentTreeNode } from '../types';
import {
  ActiveSelectionState,
  BoxModelValues,
  ClickedElementPayload,
  HoveredElementPayload,
  IframeToCanvasMessage,
  CanvasToIframeMessage,
  RuntimeBridgeOptions,
} from './types';

export function reconcilePostHMRLocation(
  activeSelection: ActiveSelectionState,
  lineDeltaMap: Record<string, number>
): HTMLElement | null {
  if (!activeSelection) return null;
  const { sourceFile, sourceLine, componentName, tagName, index } = activeSelection;
  const delta = (lineDeltaMap && lineDeltaMap[sourceFile]) || 0;
  const reanchoredLine = sourceLine + delta;

  // 1. Try exact line + file query with updated line offset
  let selector = `[data-source-file="${sourceFile}"][data-source-line="${reanchoredLine}"]`;
  if (index !== undefined && index !== null) {
    selector += `[data-source-index="${index}"]`;
  }
  let element = document.querySelector<HTMLElement>(selector);

  // 2. Fallback to durable node ID (file + componentName + tagName + index) if line position shifted
  if (!element) {
    const candidates = Array.from(document.querySelectorAll<HTMLElement>(`[data-source-file="${sourceFile}"]`));
    element = candidates.find((el) => {
      const matchComp = !componentName || el.getAttribute('data-source-component') === componentName;
      const matchTag = !tagName || el.tagName.toLowerCase() === tagName.toLowerCase();
      const matchIdx = index === undefined || index === null || el.getAttribute('data-source-index') === String(index);
      return matchComp && matchTag && matchIdx;
    }) || null;
  }

  return element;
}

export function buildDomTree(root?: Element | null): ComponentTreeNode {
  const targetRoot = root || document.body || document.documentElement;

  const buildNode = (el: Element): ComponentTreeNode => {
    const sourceFile = el.getAttribute('data-source-file') || '';
    const sourceLineStr = el.getAttribute('data-source-line');
    const sourceLine = sourceLineStr !== null ? parseInt(sourceLineStr, 10) : 0;
    const sourceColumnStr = el.getAttribute('data-source-column');
    const sourceColumn = sourceColumnStr !== null ? parseInt(sourceColumnStr, 10) : undefined;
    const tagName = el.tagName ? el.tagName.toLowerCase() : '';
    const componentName = el.getAttribute('data-source-component') || undefined;

    const id = sourceFile && sourceLine
      ? `${sourceFile}:${sourceLine}:${sourceColumn || 0}:${tagName}`
      : `${tagName}-${Math.random().toString(36).substring(2, 9)}`;

    const attributes: Record<string, any> = {};
    if (el.attributes) {
      for (let i = 0; i < el.attributes.length; i++) {
        const attr = el.attributes[i];
        attributes[attr.name] = attr.value;
      }
    }

    const classList = Array.from(el.classList);

    const children: ComponentTreeNode[] = [];
    const internalTags = new Set(['script', 'style', 'noscript', 'template']);

    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i];
      if (!internalTags.has(child.tagName.toLowerCase())) {
        children.push(buildNode(child));
      }
    }

    return {
      id,
      name: componentName || tagName,
      kind: componentName ? 'custom-component' : 'html-element',
      sourceFile,
      sourceLine,
      sourceColumn,
      attributes,
      classList,
      children,
    };
  };

  return buildNode(targetRoot);
}

export class RuntimeBridge {
  private options: RuntimeBridgeOptions;
  private token: string;
  private devServerOrigin: string;
  private targetWindow: Window;
  private parentWindow: Window;
  private inspectorEnabled: boolean;
  private inspectorMode: 'select' | 'hover' | 'off';
  private isListening: boolean = false;

  private messageHandler: (event: MessageEvent) => void;
  private mouseOverHandler: (event: MouseEvent) => void;
  private clickHandler: (event: MouseEvent) => void;
  private scrollHandler: () => void;
  private resizeHandler: () => void;

  private mouseOverRafId: number | null = null;
  private pendingMouseOverEvent: MouseEvent | null = null;

  constructor(options: RuntimeBridgeOptions = {}) {
    this.options = options;
    this.targetWindow = options.targetWindow || (typeof window !== 'undefined' ? window : ({} as Window));
    this.parentWindow = options.parentWindow || (typeof window !== 'undefined' ? (window.parent || window.opener || window) : ({} as Window));

    let token = options.token;
    if (!token && typeof window !== 'undefined' && window.location && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      token = params.get('__codex_token') || undefined;
    }
    this.token = token || 'dev-token';

    let origin = options.devServerOrigin;
    if (!origin && typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin !== 'null') {
      origin = window.location.origin;
    }
    this.devServerOrigin = origin || 'http://localhost:5173';

    this.inspectorEnabled = options.inspectorEnabled ?? true;
    this.inspectorMode = options.inspectorMode ?? 'select';

    this.messageHandler = this.handleMessage.bind(this);
    this.mouseOverHandler = this.handleMouseOver.bind(this);
    this.clickHandler = this.handleClick.bind(this);
    this.scrollHandler = this.handleScroll.bind(this);
    this.resizeHandler = this.handleResize.bind(this);
  }

  public init(): this {
    if (this.isListening) return this;
    if (this.targetWindow && this.targetWindow.addEventListener) {
      this.targetWindow.addEventListener('message', this.messageHandler);
      this.targetWindow.addEventListener('mouseover', this.mouseOverHandler, { capture: true });
      this.targetWindow.addEventListener('click', this.clickHandler, { capture: true });
      this.targetWindow.addEventListener('scroll', this.scrollHandler);
      this.targetWindow.addEventListener('resize', this.resizeHandler);
    }
    this.isListening = true;
    return this;
  }

  public destroy(): void {
    if (!this.isListening) return;
    if (this.targetWindow && this.targetWindow.removeEventListener) {
      this.targetWindow.removeEventListener('message', this.messageHandler);
      this.targetWindow.removeEventListener('mouseover', this.mouseOverHandler, { capture: true });
      this.targetWindow.removeEventListener('click', this.clickHandler, { capture: true });
      this.targetWindow.removeEventListener('scroll', this.scrollHandler);
      this.targetWindow.removeEventListener('resize', this.resizeHandler);
    }
    const win = (this.targetWindow || (typeof window !== 'undefined' ? window : null)) as any;
    const cancelRaf = win?.cancelAnimationFrame || (typeof cancelAnimationFrame !== 'undefined' ? cancelAnimationFrame : null);
    if (cancelRaf && this.mouseOverRafId !== null) {
      cancelRaf(this.mouseOverRafId);
    }
    this.mouseOverRafId = null;
    this.pendingMouseOverEvent = null;
    this.isListening = false;
  }

  public isInspectorEnabled(): boolean {
    return this.inspectorEnabled && this.inspectorMode !== 'off';
  }

  public setInspectorEnabled(enabled: boolean, mode?: 'select' | 'hover' | 'off'): void {
    this.inspectorEnabled = enabled;
    if (mode) {
      this.inspectorMode = mode;
    }
    if (!this.isInspectorEnabled()) {
      const win = (this.targetWindow || (typeof window !== 'undefined' ? window : null)) as any;
      const cancelRaf = win?.cancelAnimationFrame || (typeof cancelAnimationFrame !== 'undefined' ? cancelAnimationFrame : null);
      if (cancelRaf && this.mouseOverRafId !== null) {
        cancelRaf(this.mouseOverRafId);
      }
      this.mouseOverRafId = null;
      this.pendingMouseOverEvent = null;
    }
  }

  public postToHost(type: string, payload: any): void {
    const message: IframeToCanvasMessage = {
      token: this.token,
      timestamp: Date.now(),
      type: type as any,
      payload,
    };
    if (this.parentWindow && this.parentWindow.postMessage) {
      this.parentWindow.postMessage(message, '*');
    }
  }

  private handleMessage(event: MessageEvent): void {
    if (this.devServerOrigin) {
      try {
        const expectedOrigin = new URL(this.devServerOrigin).origin;
        if (event.origin && event.origin !== expectedOrigin && event.origin !== 'null') {
          return;
        }
      } catch (_) {
        if (event.origin && event.origin !== this.devServerOrigin && event.origin !== 'null') {
          return;
        }
      }
    }

    const data = event.data as CanvasToIframeMessage;
    if (!data || typeof data !== 'object' || data.token !== this.token) {
      return;
    }

    switch (data.type) {
      case 'ENABLE_INSPECTOR':
        if (data.payload) {
          this.setInspectorEnabled(
            data.payload.enabled ?? true,
            data.payload.mode
          );
        }
        break;

      case 'MUTATE_DOM_PREVIEW':
        if (data.payload) {
          this.handleMutateDomPreview(data.payload);
        }
        break;

      case 'REQUEST_DOM_TREE':
        const root = buildDomTree();
        this.postToHost('DOM_TREE_RESPONSE', { root });
        break;

      case 'HIGHLIGHT_ELEMENT':
        if (data.payload) {
          this.handleHighlightElement(data.payload);
        }
        break;
    }
  }

  private handleMouseOver(event: MouseEvent): void {
    if (!this.isInspectorEnabled()) return;

    this.pendingMouseOverEvent = event;
    if (this.mouseOverRafId !== null) return;

    const win = (this.targetWindow || (typeof window !== 'undefined' ? window : null)) as any;
    const raf = win?.requestAnimationFrame || (typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : null);

    if (raf) {
      this.mouseOverRafId = raf(() => {
        this.mouseOverRafId = null;
        if (this.pendingMouseOverEvent) {
          const pendingEvt = this.pendingMouseOverEvent;
          this.pendingMouseOverEvent = null;
          this.processMouseOver(pendingEvt);
        }
      });
    } else {
      this.processMouseOver(event);
      this.pendingMouseOverEvent = null;
    }
  }

  private processMouseOver(event: MouseEvent): void {
    if (!this.isInspectorEnabled()) return;

    const target = (event.target as HTMLElement)?.closest?.('[data-source-file]') as HTMLElement | null;
    if (!target) return;

    const sourceFile = target.getAttribute('data-source-file') || '';
    const sourceLineStr = target.getAttribute('data-source-line');
    const sourceLine = sourceLineStr ? parseInt(sourceLineStr, 10) : 0;
    const sourceColumnStr = target.getAttribute('data-source-column');
    const sourceColumn = sourceColumnStr ? parseInt(sourceColumnStr, 10) : undefined;
    const tagName = target.tagName.toLowerCase();
    const componentName = target.getAttribute('data-source-component') || undefined;

    const rect = target.getBoundingClientRect();
    const win = this.targetWindow || window;
    const scrollX = win.scrollX || win.pageXOffset || 0;
    const scrollY = win.scrollY || win.pageYOffset || 0;

    const boundingRect = {
      x: rect.left + scrollX,
      y: rect.top + scrollY,
      width: rect.width,
      height: rect.height,
    };

    const payload: HoveredElementPayload = {
      sourceFile,
      sourceLine,
      sourceColumn,
      tagName,
      componentName,
      boundingRect,
      classList: Array.from(target.classList),
    };

    this.postToHost('ELEMENT_HOVERED', payload);
  }

  private handleClick(event: MouseEvent): void {
    if (!this.isInspectorEnabled()) return;

    const target = (event.target as HTMLElement)?.closest?.('[data-source-file]') as HTMLElement | null;
    if (!target) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const sourceFile = target.getAttribute('data-source-file') || '';
    const sourceLineStr = target.getAttribute('data-source-line');
    const sourceLine = sourceLineStr ? parseInt(sourceLineStr, 10) : 0;
    const sourceColumnStr = target.getAttribute('data-source-column');
    const sourceColumn = sourceColumnStr ? parseInt(sourceColumnStr, 10) : undefined;
    const tagName = target.tagName.toLowerCase();
    const componentName = target.getAttribute('data-source-component') || undefined;

    const win = this.targetWindow || window;
    const scrollX = win.scrollX || win.pageXOffset || 0;
    const scrollY = win.scrollY || win.pageYOffset || 0;
    const rect = target.getBoundingClientRect();

    const boundingRect = {
      x: rect.left + scrollX,
      y: rect.top + scrollY,
      width: rect.width,
      height: rect.height,
    };

    let style: CSSStyleDeclaration | null = null;
    if (win.getComputedStyle) {
      style = win.getComputedStyle(target);
    }

    const parsePx = (val?: string): number => {
      if (!val) return 0;
      const parsed = parseFloat(val);
      return isNaN(parsed) ? 0 : parsed;
    };

    const boxModel: BoxModelValues = {
      margin: {
        top: style ? parsePx(style.marginTop) : 0,
        right: style ? parsePx(style.marginRight) : 0,
        bottom: style ? parsePx(style.marginBottom) : 0,
        left: style ? parsePx(style.marginLeft) : 0,
      },
      padding: {
        top: style ? parsePx(style.paddingTop) : 0,
        right: style ? parsePx(style.paddingRight) : 0,
        bottom: style ? parsePx(style.paddingBottom) : 0,
        left: style ? parsePx(style.paddingLeft) : 0,
      },
    };

    const computedStyles: Record<string, string> = {};
    if (style) {
      for (let i = 0; i < style.length; i++) {
        const key = style[i];
        computedStyles[key] = style.getPropertyValue(key);
      }
      ['display', 'position', 'color', 'backgroundColor', 'fontSize', 'fontWeight', 'lineHeight', 'width', 'height', 'flexDirection', 'justifyContent', 'alignItems'].forEach((prop) => {
        if ((style as any)[prop] !== undefined) {
          computedStyles[prop] = String((style as any)[prop]);
        }
      });
    }

    const attributes: Record<string, any> = {};
    if (target.attributes) {
      for (let i = 0; i < target.attributes.length; i++) {
        const attr = target.attributes[i];
        attributes[attr.name] = attr.value;
      }
    }

    const inlineStyles: Record<string, string> = {};
    if (target.style) {
      for (let i = 0; i < target.style.length; i++) {
        const propName = target.style[i];
        inlineStyles[propName] = target.style.getPropertyValue(propName);
      }
    }

    const payload: ClickedElementPayload = {
      id: `${sourceFile}:${sourceLine}:${sourceColumn || 0}:${tagName}`,
      sourceFile,
      sourceLine,
      sourceColumn,
      tagName,
      componentName,
      textContext: target.textContent?.trim() || '',
      classList: Array.from(target.classList),
      inlineStyles,
      boxModel,
      computedStyles,
      boundingRect,
      attributes,
    };

    this.postToHost('ELEMENT_CLICKED', payload);
  }

  private handleScroll(): void {
    const win = this.targetWindow || window;
    const scrollX = win.scrollX || win.pageXOffset || 0;
    const scrollY = win.scrollY || win.pageYOffset || 0;

    this.postToHost('IFRAME_SCROLLED', { scrollX, scrollY });
  }

  private handleResize(): void {
    const win = this.targetWindow || window;
    const width = win.innerWidth || 0;
    const height = win.innerHeight || 0;

    this.postToHost('IFRAME_RESIZED', { width, height });
  }

  private handleMutateDomPreview(payload: { sourceFile: string; line: number; inlineStyles?: Record<string, string>; textContent?: string; classList?: string[] }): void {
    const { sourceFile, line, inlineStyles, textContent, classList } = payload;
    const element = document.querySelector<HTMLElement>(`[data-source-file="${sourceFile}"][data-source-line="${line}"]`);

    if (!element) {
      return;
    }

    if (inlineStyles && typeof inlineStyles === 'object') {
      Object.entries(inlineStyles).forEach(([prop, val]) => {
        element.style.setProperty(prop, val);
      });
    }

    if (textContent !== undefined) {
      element.textContent = textContent;
    }

    if (classList && Array.isArray(classList)) {
      element.className = classList.join(' ');
    }
  }

  private handleHighlightElement(payload: { sourceFile: string; line: number }): void {
    const { sourceFile, line } = payload;
    const element = document.querySelector<HTMLElement>(`[data-source-file="${sourceFile}"][data-source-line="${line}"]`);
    if (element && element.scrollIntoView) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

export function initRuntimeBridge(options?: RuntimeBridgeOptions): RuntimeBridge {
  const bridge = new RuntimeBridge(options);
  bridge.init();
  if (typeof window !== 'undefined') {
    (window as any).__CODEX_RUNTIME_BRIDGE_INSTANCE__ = bridge;
  }
  return bridge;
}
