import { Toolbar } from './Toolbar';
import { IconButton } from './IconButton';
import React, { useRef, useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { translations } from '../i18n/translations';
import { CanvasRenderer } from './CanvasRenderer';
import { ViewportPreset } from '../types';
import { Smartphone, Tablet, Monitor, Maximize, Minimize, RotateCw, ZoomIn, ZoomOut, FileCode, X } from './Hugeicons';

export const getTailwindBreakpoint = (width: number): string => {
  if (width >= 1536) return '2xl: (≥1536px)';
  if (width >= 1280) return 'xl: (≥1280px)';
  if (width >= 1024) return 'lg: (≥1024px)';
  if (width >= 768) return 'md: (≥768px)';
  if (width >= 640) return 'sm: (≥640px)';
  return 'base (<640px)';
};

export const PRESETS: ViewportPreset[] = [
  { id: 'mobile-375', name: 'Mobile', width: 375, height: 667, category: 'mobile' },
  { id: 'tablet-768', name: 'Tablet', width: 768, height: 1024, category: 'tablet' },
  { id: 'desktop-1280', name: 'Desktop', width: 1280, height: 800, category: 'desktop' },
  { id: 'full', name: 'Full', width: 1920, height: 1080, category: 'full' },
];

export const ResponsiveViewport: React.FC = () => {
  const {
    viewportWidth,
    viewportHeight,
    zoomLevel,
    activePresetId,
    orientation,
    panOffset,
    editorMode,
    hoveredElementDetails,
    selectedElementDetails,
    setViewportPreset,
    setCustomViewport,
    setZoomLevel,
    setOrientation,
    setSelectedNodeId,
    setHoveredNodeId,
    ipcClient,
    language,
    targetPath,
    targetType,
  } = useEditorStore();

  const [canvasPosition,setCanvasPosition]=useState({x:0,y:0});
  const dragStart = useRef<{x:number;y:number;left:number;top:number}|null>(null);
  const previousViewport = useRef({ width: 560, height: 480 });
  const t = translations[language];

  const activeDevServerUrl = (targetType === 'url' || (targetPath && targetPath.startsWith('http')))
    ? targetPath
    : undefined;

  const activeBreakpoint = getTailwindBreakpoint(viewportWidth);

  return (
    <div className="flex-1 h-full bg-slate-950 flex flex-col overflow-hidden relative select-none">
      {/* Top Breakpoint Switcher Bar */}
      <div className="demo-viewport-controls min-h-10 border-b border-slate-800 bg-slate-900 px-4 flex items-center justify-between text-sm shrink-0 z-10">
        {/* Preset Buttons */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded border border-slate-800">
          {PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <IconButton
                key={preset.id}
                title={preset.category === 'full' ? (isActive ? '恢复尺寸' : '放大页面') : preset.name}
                onClick={() => {
                  if (preset.category === 'full' && isActive) {
                    setCustomViewport(previousViewport.current.width, previousViewport.current.height);
                  } else {
                    if (preset.category === 'full') previousViewport.current = { width: viewportWidth, height: viewportHeight };
                    setViewportPreset(preset);
                  }
                }}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {preset.category === 'mobile' && <Smartphone size={13} />}
                {preset.category === 'tablet' && <Tablet size={13} />}
                {preset.category === 'desktop' && <Monitor size={13} />}
                {preset.category === 'full' && (isActive ? <Minimize size={13} /> : <Maximize size={13} />)}
                <span>{preset.name}</span>
                <span className="text-sm opacity-75 font-mono">({preset.width}px)</span>
              </IconButton>
            );
          })}
        </div>

        {/* Custom Width / Height Inputs & Orientation */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-slate-400 font-mono text-sm">
            <input
              type="number"
              value={viewportWidth}
              onChange={(e) => setCustomViewport(Number(e.target.value), viewportHeight)}
              className="w-14 bg-slate-950 text-slate-200 border border-slate-800 rounded px-1.5 py-0.5 text-center focus:outline-none focus:border-blue-500"
            />
            <span>×</span>
            <input
              type="number"
              value={viewportHeight}
              onChange={(e) => setCustomViewport(viewportWidth, Number(e.target.value))}
              className="w-14 bg-slate-950 text-slate-200 border border-slate-800 rounded px-1.5 py-0.5 text-center focus:outline-none focus:border-blue-500"
            />
            <span>px</span>
          </div>

          <IconButton
            onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
            className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"
            title={`Rotate Orientation (${orientation})`}
          >
            <RotateCw size={14} />
          </IconButton>
        </div>

        {/* Zoom Controls & Tailwind Breakpoint Indicator */}
        <div className="flex items-center space-x-3">
          {/* Active Tailwind Breakpoint Badge */}
          <div className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-blue-400 font-mono text-sm">
            {activeBreakpoint}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded border border-slate-800">
            <IconButton
              title="缩小页面" onClick={() => setZoomLevel(Math.max(0.25, zoomLevel - 0.25))}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"
            >
              <ZoomOut size={13} />
            </IconButton>

            <span className="w-12 text-center font-mono text-slate-300 text-sm">
              {Math.round(zoomLevel * 100)}%
            </span>

            <IconButton
              title="放大页面" onClick={() => setZoomLevel(Math.min(2.0, zoomLevel + 0.25))}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"
            >
              <ZoomIn size={13} />
            </IconButton>
          </div>
        </div>
      </div>

      <Toolbar floating />
      {/* Main Canvas Viewport Area */}
      <div className="demo-pan-surface flex-1 overflow-auto flex items-center justify-center p-8 relative scrollbar-thin scrollbar-thumb-slate-800"
        onClick={e=>{if(e.target===e.currentTarget && editorMode!=='pan'){setSelectedNodeId(null,null);setHoveredNodeId(null,null);}}}
        style={{cursor:editorMode === 'pan' ? 'grab' : undefined}}
        onPointerDown={e=>{
          if(editorMode !== 'pan') return;
          const el=e.currentTarget; dragStart.current={x:e.clientX,y:e.clientY,left:canvasPosition.x,top:canvasPosition.y}; el.setPointerCapture(e.pointerId); el.style.cursor='grabbing';
        }}
        onPointerMove={e=>{const start=dragStart.current;if(start){setCanvasPosition({x:start.left+e.clientX-start.x,y:start.top+e.clientY-start.y});}}}
        onPointerUp={e=>{dragStart.current=null;e.currentTarget.style.cursor=editorMode==='pan'?'grab':'';}}
        onPointerCancel={()=>{dragStart.current=null;}}
      >
        <div
          style={{
            transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px)`,
            width: `${viewportWidth * zoomLevel}px`,
            height: `${viewportHeight * zoomLevel}px`,
            transition: 'width 0.2s ease, height 0.2s ease',
          }}
          className="demo-page-preview relative shrink-0"
        >
          <div className="demo-page-document" style={{pointerEvents:editorMode === 'pan' ? 'none' : undefined,width:viewportWidth,height:viewportHeight,transform:`scale(${zoomLevel})`,transformOrigin:'top left'}}> 
          <CanvasRenderer
            devServerUrl={activeDevServerUrl}
            targetPath={targetPath}
            sessionToken="session-token-123"
            zoomScale={1}
            panOffset={{x:0,y:0}}
            hoveredElement={hoveredElementDetails}
            selectedElement={selectedElementDetails ? ({
              id: selectedElementDetails.id,
              sourceFile: selectedElementDetails.sourceFile,
              sourceLine: selectedElementDetails.sourceLine,
              sourceColumn: selectedElementDetails.sourceColumn,
              tagName: selectedElementDetails.tagName,
              componentName: selectedElementDetails.componentName,
              textContext: selectedElementDetails.textContext,
              classList: selectedElementDetails.classList,
              inlineStyles: selectedElementDetails.inlineStyles,
              boxModel: selectedElementDetails.boxModel,
              computedStyles: selectedElementDetails.computedStyles,
              boundingRect: selectedElementDetails.boundingRect || { x: 0, y: 0, width: 0, height: 0 },
              attributes: selectedElementDetails.attributes || {},
            }) : null}
            onSelectionChange={(details) => {
              if (details) {
                const elementId = details.id || `${details.sourceFile}:${details.sourceLine}`;
                setSelectedNodeId(elementId, {
                  id: elementId,
                  sourceFile: details.sourceFile,
                  sourceLine: details.sourceLine,
                  sourceColumn: details.sourceColumn,
                  tagName: details.tagName,
                  componentName: details.componentName,
                  textContext: details.textContext,
                  classList: details.classList,
                  inlineStyles: details.inlineStyles,
                  boxModel: details.boxModel,
                  computedStyles: details.computedStyles,
                  boundingRect: details.boundingRect,
                  attributes: details.attributes,
                });
              } else {
                setSelectedNodeId(null, null);
              }
            }}
            onHoverChange={(hoverDetails) => {
              if (hoverDetails) {
                setHoveredNodeId(`${hoverDetails.sourceFile}:${hoverDetails.sourceLine}`, hoverDetails);
              } else {
                setHoveredNodeId(null, null);
              }
            }}
            onEmitIPC={(msgType, payload) => {
              if (ipcClient) {
                ipcClient.sendNotification(msgType, payload);
              }
            }}
          />
          </div>
        </div>
      </div>
    </div>
  );
};
