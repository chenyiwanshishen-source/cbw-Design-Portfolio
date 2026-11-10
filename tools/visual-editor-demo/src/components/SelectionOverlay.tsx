import React, { useState, useEffect } from 'react';
import { GripVertical } from './Hugeicons';
import { HoveredElementPayload, ClickedElementPayload, BoundingRect } from '../types/canvas';
import { useEditorStore } from '../store/useEditorStore';

export interface SelectionOverlayProps {
  hoveredElement: HoveredElementPayload | null;
  selectedElement: ClickedElementPayload | null;
  zoomScale: number;
  panOffset: { x: number; y: number };
  iframeScroll: { scrollX: number; scrollY: number };
  iframeOffset: { left: number; top: number };
  onEmitIPC?: (messageType: string, payload: any) => void;
}

export const transformRect = (
  rect?: BoundingRect | { left?: number; top?: number; width?: number; height?: number; x?: number; y?: number } | null,
  scrollOrZoom?: { scrollX?: number; scrollY?: number } | number,
  zoomOrPan?: number | { x?: number; y?: number },
  pan?: { x?: number; y?: number },
  offset?: { left?: number; top?: number }
): BoundingRect => {
  if (!rect) return { x: 0, y: 0, width: 0, height: 0 };

  const rectX = rect.x ?? (rect as any).left ?? 0;
  const rectY = rect.y ?? (rect as any).top ?? 0;
  const rectW = rect.width ?? 0;
  const rectH = rect.height ?? 0;

  let scrollX = 0;
  let scrollY = 0;
  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let offsetLeft = 0;
  let offsetTop = 0;

  if (typeof scrollOrZoom === 'number') {
    zoom = scrollOrZoom;
    if (zoomOrPan && typeof zoomOrPan === 'object') {
      panX = (zoomOrPan as any).x ?? (zoomOrPan as any).left ?? 0;
      panY = (zoomOrPan as any).y ?? (zoomOrPan as any).top ?? 0;
    }
    if (pan && typeof pan === 'object') {
      offsetLeft = (pan as any).left ?? pan.x ?? 0;
      offsetTop = (pan as any).top ?? pan.y ?? 0;
    }
    if (offset && typeof offset === 'object') {
      if (offsetLeft === 0 && offsetTop === 0) {
        offsetLeft = offset.left ?? 0;
        offsetTop = offset.top ?? 0;
      }
    }
  } else {
    if (scrollOrZoom && typeof scrollOrZoom === 'object') {
      scrollX = scrollOrZoom.scrollX ?? (scrollOrZoom as any).x ?? (scrollOrZoom as any).left ?? 0;
      scrollY = scrollOrZoom.scrollY ?? (scrollOrZoom as any).y ?? (scrollOrZoom as any).top ?? 0;
    }
    if (typeof zoomOrPan === 'number') {
      zoom = zoomOrPan;
      if (pan && typeof pan === 'object') {
        panX = pan.x ?? (pan as any).left ?? 0;
        panY = pan.y ?? (pan as any).top ?? 0;
      }
      if (offset && typeof offset === 'object') {
        offsetLeft = offset.left ?? 0;
        offsetTop = offset.top ?? 0;
      }
    } else if (zoomOrPan && typeof zoomOrPan === 'object') {
      panX = (zoomOrPan as any).x ?? (zoomOrPan as any).left ?? 0;
      panY = (zoomOrPan as any).y ?? (zoomOrPan as any).top ?? 0;
      if (pan && typeof pan === 'object') {
        offsetLeft = (pan as any).left ?? pan.x ?? 0;
        offsetTop = (pan as any).top ?? pan.y ?? 0;
      }
    }
  }

  return {
    x: (rectX - scrollX) * zoom + panX + offsetLeft,
    y: (rectY - scrollY) * zoom + panY + offsetTop,
    width: rectW * zoom,
    height: rectH * zoom,
  };
};

export const SelectionOverlay: React.FC<SelectionOverlayProps> = ({
  hoveredElement,
  selectedElement,
  zoomScale,
  panOffset,
  iframeScroll,
  iframeOffset,
  onEmitIPC,
}) => {
  const [showSpacingBox, setShowSpacingBox] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);
  const [inlineTextValue, setInlineTextValue] = useState('');
  const [isDraggingHandle, setIsDraggingHandle] = useState<string | null>(null);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Toggle spacing box on Alt / Option key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt' || e.key === 'Option') setShowSpacingBox(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt' || e.key === 'Option') setShowSpacingBox(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // .canvas-container applies CSS scale(zoomScale) and translate(panOffset).
  // Overlay inside canvas-container matches iframe top-left without adding outer panel offsets.
  const hoverCanvasRect = hoveredElement
    ? transformRect(hoveredElement.boundingRect, iframeScroll, 1, { x: 0, y: 0 }, { left: 0, top: 0 })
    : null;

  const selectCanvasRect = selectedElement
    ? transformRect(selectedElement.boundingRect, iframeScroll, 1, { x: 0, y: 0 }, { left: 0, top: 0 })
    : null;

  const handleTextCommit = () => {
    if (!selectedElement) return;
    setIsEditingText(false);
    if (onEmitIPC) {
      onEmitIPC('TEXT_UPDATE', {
        file: selectedElement.sourceFile,
        line: selectedElement.sourceLine,
        text: inlineTextValue,
      });
    }
  };

  const handlePointerDownPadding = (edge: 'top' | 'right' | 'bottom' | 'left', e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDraggingHandle(edge);
    setDragStartPos({ x: e.clientX, y: e.clientY });

    const handlePointerMove = (moveEvt: PointerEvent) => {
      const deltaX = (moveEvt.clientX - e.clientX) / zoomScale;
      const deltaY = (moveEvt.clientY - e.clientY) / zoomScale;
      let deltaPx = 0;
      if (edge === 'right') deltaPx = deltaX;
      else if (edge === 'left') deltaPx = -deltaX;
      else if (edge === 'bottom') deltaPx = deltaY;
      else if (edge === 'top') deltaPx = -deltaY;

      const snappedDelta = Math.round(deltaPx / 4) * 4;
      const currentVal = selectedElement?.boxModel.padding[edge] || 0;
      const newVal = Math.max(0, currentVal + snappedDelta);

      if (onEmitIPC && selectedElement) {
        const edgeProp = edge === 'top' ? 'pt' : edge === 'right' ? 'pr' : edge === 'bottom' ? 'pb' : 'pl';
        onEmitIPC('STYLE_UPDATE', {
          file: selectedElement.sourceFile,
          line: selectedElement.sourceLine,
          styleType: 'tailwind',
          changes: { [edgeProp]: `${newVal}px` },
        });
      }
    };

    const handlePointerUp = () => {
      setIsDraggingHandle(null);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerDownResize = (handle: string, e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDraggingHandle(handle);
    setDragStartPos({ x: e.clientX, y: e.clientY });

    const initialWidth = selectedElement?.boundingRect.width || 100;
    const initialHeight = selectedElement?.boundingRect.height || 50;

    const handlePointerMove = (moveEvt: PointerEvent) => {
      const deltaX = (moveEvt.clientX - e.clientX) / zoomScale;
      const deltaY = (moveEvt.clientY - e.clientY) / zoomScale;

      let newW = initialWidth;
      let newH = initialHeight;

      if (handle.includes('e')) newW = Math.max(20, initialWidth + deltaX);
      if (handle.includes('w')) newW = Math.max(20, initialWidth - deltaX);
      if (handle.includes('s')) newH = Math.max(20, initialHeight + deltaY);
      if (handle.includes('n')) newH = Math.max(20, initialHeight - deltaY);

      newW = Math.round(newW / 4) * 4;
      newH = Math.round(newH / 4) * 4;

      if (selectedElement && onEmitIPC) {
        onEmitIPC('STYLE_UPDATE', {
          file: selectedElement.sourceFile,
          line: selectedElement.sourceLine,
          styleType: 'tailwind',
          changes: { width: `${newW}px`, height: `${newH}px` },
        });
      }
    };

    const handlePointerUp = () => {
      setIsDraggingHandle(null);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerDownMove = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!selectedElement) return;

    // Record history snapshot ONCE at drag start
    const store = useEditorStore.getState();
    if (store.recordHistorySnapshot) {
      store.recordHistorySnapshot();
    }

    setIsDraggingHandle('move');
    setDragStartPos({ x: e.clientX, y: e.clientY });

    const startX = e.clientX;
    const startY = e.clientY;

    const isAbsolute =
      selectedElement.computedStyles?.position === 'absolute' ||
      selectedElement.inlineStyles?.position === 'absolute';

    const parsedLeft = selectedElement.inlineStyles?.left !== undefined && selectedElement.inlineStyles?.left !== ''
      ? parseFloat(selectedElement.inlineStyles.left)
      : NaN;
    const initialLeft = !isNaN(parsedLeft) ? parsedLeft : (selectedElement.boundingRect?.x || 0);

    const parsedTop = selectedElement.inlineStyles?.top !== undefined && selectedElement.inlineStyles?.top !== ''
      ? parseFloat(selectedElement.inlineStyles.top)
      : NaN;
    const initialTop = !isNaN(parsedTop) ? parsedTop : (selectedElement.boundingRect?.y || 0);

    const handlePointerMove = (moveEvt: PointerEvent) => {
      const deltaX = (moveEvt.clientX - startX) / zoomScale;
      const deltaY = (moveEvt.clientY - startY) / zoomScale;

      const newLeft = Math.round(initialLeft + deltaX);
      const newTop = Math.round(initialTop + deltaY);

      if (onEmitIPC && selectedElement) {
        onEmitIPC('POSITION_UPDATE', {
          sourceFile: selectedElement.sourceFile,
          sourceLine: selectedElement.sourceLine,
          sourceColumn: selectedElement.sourceColumn || 0,
          position: {
            left: newLeft,
            top: newTop,
            mode: isAbsolute ? 'absolute' : 'relative',
          },
        });
      }

      if (store.updatePosition) {
        store.updatePosition(
          selectedElement.sourceFile,
          selectedElement.sourceLine,
          {
            left: newLeft,
            top: newTop,
            mode: isAbsolute ? 'absolute' : 'relative',
          },
          true
        );
      }

      if (store.treeData && selectedElement.id) {
        const absDeltaY = Math.abs(deltaY);
        const absDeltaX = Math.abs(deltaX);
        if (absDeltaY > 30 || absDeltaX > 50) {
          const findSiblings = (node: any): any[] | null => {
            if (!node.children) return null;
            const idx = node.children.findIndex((c: any) => c.id === selectedElement.id);
            if (idx !== -1) return node.children;
            for (const child of node.children) {
              const res = findSiblings(child);
              if (res) return res;
            }
            return null;
          };
          const siblings = findSiblings(store.treeData);
          if (siblings && siblings.length > 1) {
            const selfIdx = siblings.findIndex((c: any) => c.id === selectedElement.id);
            if (deltaY > 30 && selfIdx < siblings.length - 1) {
              const targetSibling = siblings[selfIdx + 1];
              store.reorderNodes(selectedElement.id, targetSibling.id, 'after');
            } else if (deltaY < -30 && selfIdx > 0) {
              const targetSibling = siblings[selfIdx - 1];
              store.reorderNodes(selectedElement.id, targetSibling.id, 'before');
            }
          }
        }
      }
    };

    const handlePointerUp = () => {
      setIsDraggingHandle(null);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <div className="overlay-layer absolute inset-0 pointer-events-none z-40 overflow-hidden">
      {/* 1. Hover Overlay */}
      {hoverCanvasRect && hoveredElement?.id !== selectedElement?.id && (
        <div
          className="absolute border border-dashed border-blue-400 bg-blue-400/10 pointer-events-none transition-all duration-75"
          style={{
            left: `${hoverCanvasRect.x}px`,
            top: `${hoverCanvasRect.y}px`,
            width: `${hoverCanvasRect.width}px`,
            height: `${hoverCanvasRect.height}px`,
          }}
        >
          <div className="absolute -top-6 left-0 px-1.5 py-0.5 text-sm font-mono bg-blue-500 text-white rounded shadow-sm whitespace-nowrap z-50">
            {hoveredElement?.componentName || hoveredElement?.tagName}
            {hoveredElement?.sourceFile && (
              <span className="opacity-75 ml-1">
                ({hoveredElement.tagName})
              </span>
            )}
          </div>
        </div>
      )}

      {/* 2. Selection Overlay */}
      {selectCanvasRect && selectedElement && (
        <div
          className="absolute border border-blue-600 pointer-events-none"
          style={{
            left: `${selectCanvasRect.x}px`,
            top: `${selectCanvasRect.y}px`,
            width: `${selectCanvasRect.width}px`,
            height: `${selectCanvasRect.height}px`,
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setIsEditingText(true);
            setInlineTextValue(selectedElement.attributes?.['textContent'] || selectedElement.textContext || '');
          }}
        >
          {/* Element Tag & Dimension Badge (Drag-to-move handle) */}
          <div
            onPointerDown={handlePointerDownMove}
            className="absolute -top-6 left-0 px-2 py-0.5 text-sm font-mono bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm flex items-center gap-1.5 whitespace-nowrap z-50 pointer-events-auto cursor-move select-none transition-colors"
            title="Drag to move position or reorder"
          >
            <GripVertical size={11} className="text-blue-200" />
            <span className="font-semibold">{selectedElement.componentName || selectedElement.tagName}</span>
            <span className="text-blue-200">
              {Math.round(selectedElement.boundingRect.width)} × {Math.round(selectedElement.boundingRect.height)} px
            </span>

          </div>

          {/* Border drag handle */}
          <div
            onPointerDown={handlePointerDownMove}
            className="absolute -top-1 left-0 right-0 h-2 cursor-move pointer-events-auto z-40"
            title="Drag border to move"
          />

          {/* 8 Control Resize Handles */}
          {['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].map((handle) => (
            <div
              key={handle}
              data-handle={handle}
              onPointerDown={(e) => handlePointerDownResize(handle, e)}
              className={`handle-${handle} absolute w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-sm pointer-events-auto cursor-pointer shadow-sm hover:scale-125 transition-transform`}
              style={{
                top: handle.includes('n') ? '-5px' : handle.includes('s') ? 'calc(100% - 5px)' : 'calc(50% - 5px)',
                left: handle.includes('w') ? '-5px' : handle.includes('e') ? 'calc(100% - 5px)' : 'calc(50% - 5px)',
              }}
            />
          ))}

          {/* Margin & Padding Box Model Visualizer */}
          {showSpacingBox && (
            <div className="box-model-overlay absolute inset-0 pointer-events-none">
              {/* Padding Overlay Box (Green-500 fill 25%) */}
              <div
                className="absolute inset-0 bg-emerald-500/20 border border-emerald-500/40 pointer-events-none"
                style={{
                  top: `${(selectedElement.boxModel?.padding?.top || 0) * zoomScale}px`,
                  right: `${(selectedElement.boxModel?.padding?.right || 0) * zoomScale}px`,
                  bottom: `${(selectedElement.boxModel?.padding?.bottom || 0) * zoomScale}px`,
                  left: `${(selectedElement.boxModel?.padding?.left || 0) * zoomScale}px`,
                }}
              />

              {/* Interactive Margin/Padding Drag Handles */}
              {(['top', 'right', 'bottom', 'left'] as const).map((edge) => (
                <div
                  key={edge}
                  onPointerDown={(e) => handlePointerDownPadding(edge, e)}
                  className={`absolute pointer-events-auto bg-emerald-500/40 hover:bg-emerald-500/80 transition-colors cursor-${
                    edge === 'top' || edge === 'bottom' ? 'ns-resize' : 'ew-resize'
                  }`}
                  style={{
                    top: edge === 'top' ? '0' : edge === 'bottom' ? 'calc(100% - 4px)' : '0',
                    left: edge === 'left' ? '0' : edge === 'right' ? 'calc(100% - 4px)' : '0',
                    width: edge === 'left' || edge === 'right' ? '4px' : '100%',
                    height: edge === 'top' || edge === 'bottom' ? '4px' : '100%',
                  }}
                  title={`Drag to adjust ${edge} padding (4px snap)`}
                />
              ))}
            </div>
          )}

          {/* Inline Text Editing Overlay */}
          {isEditingText && (
            <div className="absolute inset-0 z-50 pointer-events-auto">
              <textarea
                value={inlineTextValue}
                onChange={(e) => setInlineTextValue(e.target.value)}
                onBlur={handleTextCommit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleTextCommit();
                  }
                  if (e.key === 'Escape') {
                    setIsEditingText(false);
                  }
                }}
                autoFocus
                className="w-full h-full p-1 bg-white text-slate-900 border-2 border-blue-600 font-sans text-sm focus:outline-none shadow-lg resize-none"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
