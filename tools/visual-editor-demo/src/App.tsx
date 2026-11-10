import React, { useEffect } from 'react';
import { useEditorStore } from './store/useEditorStore';
import { Toolbar } from './components/Toolbar';
import { LayerTree } from './components/LayerTree';
import { ResponsiveViewport } from './components/ResponsiveViewport';
import { PropertyPanel } from './components/PropertyPanel';
import { DiffPreviewModal } from './components/DiffPreviewModal';

import { ErrorBoundary } from './components/ErrorBoundary';

export const App: React.FC = () => {
  const {
    initIPC,
    setTreeData,
  } = useEditorStore();

  useEffect(() => {
    // Initial sample tree topology
    setTreeData({
      id: 'src/App.tsx:1:1:App',
      name: 'App',
      kind: 'custom-component',
      sourceFile: 'src/App.tsx',
      sourceLine: 1,
      sourceColumn: 1,
      classList: ['min-h-screen', 'bg-slate-900', 'text-white'],
      attributes: {},
      children: [
        {
          id: 'src/components/Header.tsx:5:3:Header',
          name: 'Header',
          kind: 'custom-component',
          sourceFile: 'src/components/Header.tsx',
          sourceLine: 5,
          sourceColumn: 3,
          classList: ['border-b', 'border-slate-800', 'p-4'],
          attributes: {},
          children: [
            {
              id: 'src/components/Header.tsx:6:5:h1',
              name: 'h1',
              kind: 'html-element',
              sourceFile: 'src/components/Header.tsx',
              sourceLine: 6,
              sourceColumn: 5,
              classList: ['text-xl', 'font-bold', 'text-blue-400'],
              attributes: { textContent: 'Codex Visual Studio' },
              children: [],
            },
          ],
        },
        {
          id: 'src/components/Hero.tsx:10:3:HeroSection',
          name: 'HeroSection',
          kind: 'custom-component',
          sourceFile: 'src/components/Hero.tsx',
          sourceLine: 10,
          sourceColumn: 3,
          classList: ['p-8', 'max-w-4xl', 'mx-auto'],
          attributes: {},
          children: [
            {
              id: 'src/components/Hero.tsx:12:5:div',
              name: 'div',
              kind: 'html-element',
              sourceFile: 'src/components/Hero.tsx',
              sourceLine: 12,
              sourceColumn: 5,
              classList: ['flex', 'flex-col', 'gap-4', 'items-center'],
              attributes: {},
              children: [
                {
                  id: 'src/components/Hero.tsx:13:7:h2',
                  name: 'h2',
                  kind: 'html-element',
                  sourceFile: 'src/components/Hero.tsx',
                  sourceLine: 13,
                  sourceColumn: 7,
                  classList: ['text-3xl', 'font-extrabold'],
                  attributes: { textContent: 'Build React UIs Visually' },
                  children: [],
                },
                {
                  id: 'src/components/Hero.tsx:14:7:button',
                  name: 'button',
                  kind: 'html-element',
                  sourceFile: 'src/components/Hero.tsx',
                  sourceLine: 14,
                  sourceColumn: 7,
                  classList: ['px-6', 'py-3', 'bg-blue-600', 'hover:bg-blue-500', 'rounded-lg', 'font-medium'],
                  attributes: { textContent: 'Get Started' },
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    });

    // Portfolio demo keeps all changes in memory.
  }, [initIPC, setTreeData]);

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Application Toolbar */}
      <Toolbar />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Component Layer Tree */}
        <LayerTree />

        {/* Center Interactive Canvas Viewport */}
        <ResponsiveViewport />

        {/* Right Property Inspector Panel */}
        <ErrorBoundary fallbackTitle="Property Inspector Error Recovered">
          <PropertyPanel />
        </ErrorBoundary>
      </div>

      {/* Diff Preview Modal */}
      <DiffPreviewModal />
    </div>
  );
};

export default App;

