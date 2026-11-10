import demoCss from '../index.css?inline';
import React, { useEffect, useRef, useState } from 'react';
import { SelectionOverlay } from './SelectionOverlay';
import {
  HoveredElementPayload,
  ClickedElementPayload,
  IframeToCanvasMessage,
} from '../types/canvas';

import { useEditorStore } from '../store/useEditorStore';

export interface CanvasRendererProps {
  devServerUrl?: string;
  targetPath?: string;
  sessionToken?: string;
  zoomScale?: number;
  panOffset?: { x: number; y: number };
  hoveredElement?: HoveredElementPayload | null;
  selectedElement?: ClickedElementPayload | null;
  onSelectionChange?: (payload: ClickedElementPayload | null) => void;
  onHoverChange?: (payload: HoveredElementPayload | null) => void;
  onEmitIPC?: (messageType: string, payload: any) => void;
  onDomTreeReceived?: (root: any) => void;
}

export const generateCanvasSrcDoc = (targetPath: string = 'src/App.tsx', sessionToken: string = 'session-token-123') => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>${demoCss}</style>
  <style>
    body { margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f7; color: #1a1c24; min-height: 100vh; }
  </style>
</head>
<body data-source-file="${targetPath}" data-source-line="1" data-source-component="App">
  <div id="root" data-source-file="${targetPath}" data-source-line="1" data-source-component="App" class="w-full min-h-screen bg-slate-950 flex flex-col">
    <header data-source-file="${targetPath}" data-source-line="5" data-source-component="Header" class="px-8 py-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between shadow-sm">
      <h1 data-source-file="${targetPath}" data-source-line="6" class="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
        <span>项目工作台</span>
      </h1>
      <div class="flex items-center space-x-3">
        <button data-source-file="${targetPath}" data-source-line="8" class="px-3.5 py-1.5 bg-slate-800 hover:bg-demo-hover text-slate-200 rounded-md text-sm font-medium border border-slate-700 transition">帮助</button>
        <button data-source-file="${targetPath}" data-source-line="9" class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-semibold shadow transition">新建项目</button>
      </div>
    </header>

    <main data-source-file="${targetPath}" data-source-line="12" data-source-component="HeroSection" class="flex-1 p-10 max-w-5xl mx-auto w-full flex flex-col justify-center">
      <div data-source-file="${targetPath}" data-source-line="14" class="p-8 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl space-y-6">
        <div class="inline-flex items-center space-x-2 px-3 py-1 bg-blue-950/80 border border-blue-800/60 rounded-full text-blue-400 text-sm font-medium">
          <span>交互演示</span>
        </div>
        <h2 data-source-file="${targetPath}" data-source-line="17" class="text-3xl font-extrabold text-white tracking-tight">把想法变成好用的产品</h2>
        <p data-source-file="${targetPath}" data-source-line="18" class="text-slate-300 text-base leading-relaxed">
          点击标题、按钮或卡片，在右侧调整文字、间距和颜色。
        </p>
        <div data-source-file="${targetPath}" data-source-line="21" class="pt-2 flex items-center space-x-4">
          <button data-source-file="${targetPath}" data-source-line="22" class="px-5 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">开始体验</button>
          <button data-source-file="${targetPath}" data-source-line="23" class="px-5 h-10 bg-slate-800 hover:bg-demo-hover text-slate-200 font-medium rounded-lg">查看项目</button>
        </div>
      </div>
    </main>
  </div>

  <script src="${new URL('./runtime-bridge.js', window.location.href).href}"></script>
  <script>
    (function() {
      function initBridge() {
        if (window.RuntimeBridge) {
          var bridge = new window.RuntimeBridge({
            token: "${sessionToken}",
            devServerOrigin: "${window.location.origin}",
            inspectorEnabled: true
          });
          bridge.init();
          bridge.handleMessage({origin: "${window.location.origin}", data: {token: "${sessionToken}", type: "REQUEST_DOM_TREE"}});
        } else {
          setTimeout(initBridge, 100);
        }
      }
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initBridge();
      } else {
        window.addEventListener('DOMContentLoaded', initBridge);
      }
    })();
  </script>
</body>
</html>`;
};

export const CanvasRenderer: React.FC<CanvasRendererProps> = ({
  devServerUrl,
  targetPath = 'src/App.tsx',
  sessionToken = 'session-token',
  zoomScale = 1.0,
  panOffset = { x: 0, y: 0 },
  hoveredElement: externalHovered,
  selectedElement: externalSelected,
  onSelectionChange,
  onHoverChange,
  onEmitIPC,
  onDomTreeReceived,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [internalHovered, setInternalHovered] = useState<HoveredElementPayload | null>(null);
  const [internalSelected, setInternalSelected] = useState<ClickedElementPayload | null>(null);
  const [iframeScroll, setIframeScroll] = useState({ scrollX: 0, scrollY: 0 });
  const [iframeOffset, setIframeOffset] = useState({ left: 0, top: 0 });

  const currentHovered = externalHovered !== undefined ? externalHovered : internalHovered;
  const currentSelected = externalSelected !== undefined ? externalSelected : internalSelected;

  const useSrcDoc = !devServerUrl || !devServerUrl.startsWith('http');
  const fallbackSrcDoc = generateCanvasSrcDoc(targetPath, sessionToken);

  const iframeSrc = devServerUrl && devServerUrl.includes('?')
    ? `${devServerUrl}&__codex_token=${encodeURIComponent(sessionToken)}`
    : devServerUrl
    ? `${devServerUrl}?__codex_token=${encodeURIComponent(sessionToken)}`
    : undefined;

  // Update iframe offset on mount & resize
  useEffect(() => {
    const updateOffset = () => {
      if (iframeRef.current) {
        const rect = iframeRef.current.getBoundingClientRect();
        setIframeOffset({ left: rect.left, top: rect.top });
      }
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  // PostMessage Security & Bridge Receiver
  useEffect(() => {
    const handlePostMessage = (event: MessageEvent) => {
      const data = event.data as IframeToCanvasMessage;
      if (!data || typeof data !== 'object' || !data.type) {
        return;
      }

      switch (data.type) {
        case 'ELEMENT_HOVERED':
          setInternalHovered(data.payload);
          useEditorStore.setState({ hoveredElementDetails: data.payload, hoveredNodeId: data.payload?.id || null });
          if (onHoverChange) onHoverChange(data.payload);
          break;
        case 'ELEMENT_CLICKED':
          setInternalSelected(data.payload);
          if (data.payload) {
            const nodeDetails = {
              id: data.payload.id || `${data.payload.sourceFile}:${data.payload.sourceLine}`,
              sourceFile: data.payload.sourceFile,
              sourceLine: data.payload.sourceLine,
              sourceColumn: data.payload.sourceColumn,
              tagName: data.payload.tagName,
              componentName: data.payload.componentName,
              classList: data.payload.classList || [],
              inlineStyles: data.payload.inlineStyles || {},
              boxModel: data.payload.boxModel || { margin: { top: 0, right: 0, bottom: 0, left: 0 }, padding: { top: 0, right: 0, bottom: 0, left: 0 } },
              textContext: data.payload.textContext,
              attributes: data.payload.attributes || {},
              boundingRect: data.payload.boundingRect,
            };
            useEditorStore.getState().setSelectedNodeId(nodeDetails.id, nodeDetails as any);
          } else {
            useEditorStore.getState().setSelectedNodeId(null, null);
          }
          if (onSelectionChange) onSelectionChange(data.payload);
          if (onEmitIPC && data.payload) {
            onEmitIPC('SELECTION_CHANGED', {
              file: data.payload.sourceFile,
              line: data.payload.sourceLine,
              element: data.payload.tagName,
              componentName: data.payload.componentName,
            });
          }
          break;
        case 'DOM_TREE_RESPONSE':
          if (data.payload && data.payload.root) {
            useEditorStore.getState().setTreeData(data.payload.root);
            if (onDomTreeReceived) onDomTreeReceived(data.payload.root);
          }
          break;
        case 'IFRAME_SCROLLED':
          setIframeScroll({ scrollX: data.payload.scrollX, scrollY: data.payload.scrollY });
          break;
        case 'IFRAME_RESIZED':
          if (iframeRef.current) {
            const rect = iframeRef.current.getBoundingClientRect();
            setIframeOffset({ left: rect.left, top: rect.top });
          }
          break;
      }
    };

    window.addEventListener('message', handlePostMessage);
    return () => window.removeEventListener('message', handlePostMessage);
  }, [devServerUrl, sessionToken, onSelectionChange, onHoverChange, onEmitIPC, onDomTreeReceived]);

  // Outbound postMessage relaying: host actions -> iframe contentWindow
  useEffect(() => {
    const handleHostOutboundMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (iframeRef.current && event.source === iframeRef.current.contentWindow) return;

      const outboundTypes = ['MUTATE_DOM_PREVIEW', 'ENABLE_INSPECTOR', 'HIGHLIGHT_ELEMENT', 'REQUEST_DOM_TREE'];
      if (outboundTypes.includes(data.type)) {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          try {
            iframeRef.current.contentWindow.postMessage(
              {
                token: sessionToken,
                timestamp: Date.now(),
                type: data.type,
                payload: data.payload,
              },
              '*'
            );
          } catch (_) {}
        }
      }
    };

    window.addEventListener('message', handleHostOutboundMessage);
    return () => window.removeEventListener('message', handleHostOutboundMessage);
  }, [sessionToken]);

  // Keyboard Shortcuts: Undo/Redo, Delete/Backspace to delete element, Escape to clear selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputActive =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          activeEl.getAttribute('role') === 'textbox' ||
          (activeEl as HTMLElement).isContentEditable);

      if (isInputActive) return;

      const key = e.key.toLowerCase();
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      // Undo: Cmd+Z / Ctrl+Z (without Shift)
      if (isCmdOrCtrl && !e.shiftKey && key === 'z') {
        e.preventDefault();
        useEditorStore.getState().undo();
        return;
      }

      // Redo: Cmd+Shift+Z / Ctrl+Shift+Z / Ctrl+Y
      if (
        (isCmdOrCtrl && e.shiftKey && key === 'z') ||
        (isCmdOrCtrl && key === 'y')
      ) {
        e.preventDefault();
        useEditorStore.getState().redo();
        return;
      }

      if ((e.key === 'Delete' || e.key === 'Backspace') && currentSelected) {
        e.preventDefault();
        if (onEmitIPC) {
          onEmitIPC('NODE_DELETE', {
            file: currentSelected.sourceFile,
            line: currentSelected.sourceLine,
          });
        }
        setInternalSelected(null);
        if (onSelectionChange) onSelectionChange(null);
      } else if (e.key === 'Escape') {
        setInternalSelected(null);
        if (onSelectionChange) onSelectionChange(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSelected, onSelectionChange, onEmitIPC]);

  const handleIframeLoad = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          {
            token: sessionToken,
            type: 'RESTORE_VIEWPORT_STATE',
            payload: {
              scrollX: iframeScroll.scrollX,
              scrollY: iframeScroll.scrollY,
              activeSelection: currentSelected,
            },
          },
          '*'
        );
      } catch (_) {}
    }
  };

  return (
    <div
      className="canvas-container relative w-full h-full overflow-hidden bg-slate-900 flex items-center justify-center"
      style={{
        transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
        transformOrigin: '0 0',
      }}
    >
      <iframe
        ref={iframeRef}
        id="codex-preview-frame"
        src={useSrcDoc ? undefined : iframeSrc}
        srcDoc={useSrcDoc ? fallbackSrcDoc : undefined}
        onLoad={handleIframeLoad}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
        className="w-full h-full border-none bg-slate-950 shadow-2xl transition-all"
        title="Dev UI Interactive Canvas Preview"
      />

      <SelectionOverlay
        hoveredElement={currentHovered}
        selectedElement={currentSelected}
        zoomScale={zoomScale}
        panOffset={panOffset}
        iframeScroll={iframeScroll}
        iframeOffset={iframeOffset}
        onEmitIPC={onEmitIPC}
      />
    </div>
  );
};
