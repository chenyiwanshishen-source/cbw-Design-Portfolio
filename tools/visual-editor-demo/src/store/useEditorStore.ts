import { create } from 'zustand';
import {
  ComponentTreeNode,
  SelectedElementDetails,
  ViewportPreset,
  WriteBackMode,
  ActivePropertyTab,
  EditorMode,
  DiffFile,
} from '../types';
import { HoveredElementPayload } from '../types/canvas';
import { IPCClientService } from '../services/ipc-client';
import { ConnectionStatus } from '../types/ipc';

export interface HistoryEntry {
  treeData: ComponentTreeNode | null;
  selectedNodeId: string | null;
  selectedElementDetails: SelectedElementDetails | null;
}

export interface EditorStoreState {
  // Language & i18n
  language: 'zh' | 'en';
  setLanguage: (lang: 'zh' | 'en') => void;

  // Target Selector Hub State
  targetType: 'tsx' | 'html' | 'vue' | 'url';
  targetPath: string;
  recentTargets: Array<{ type: 'tsx' | 'html' | 'vue' | 'url'; path: string; name: string }>;
  setTargetType: (type: 'tsx' | 'html' | 'vue' | 'url') => void;
  setTargetPath: (path: string) => void;
  addRecentTarget: (target: { type: 'tsx' | 'html' | 'vue' | 'url'; path: string; name: string }) => void;

  // Connection & IPC
  connectionStatus: ConnectionStatus;
  ipcClient: IPCClientService | null;
  writeBackMode: WriteBackMode;

  // Tree & Selection
  treeData: ComponentTreeNode | null;
  selectedNodeId: string | null;
  selectedElementDetails: SelectedElementDetails | null;
  hoveredNodeId: string | null;
  hoveredElementDetails: HoveredElementPayload | null;
  expandedNodeIds: Set<string>;
  searchQuery: string;
  showFrameworkInternals: boolean;

  // Viewport & Canvas
  viewportWidth: number;
  viewportHeight: number;
  zoomLevel: number;
  activePresetId: string;
  orientation: 'portrait' | 'landscape';
  panOffset: { x: number; y: number };
  editorMode: EditorMode;

  // Undo/Redo History Stack
  past: HistoryEntry[];
  future: HistoryEntry[];

  // Property Inspector State
  activePropertyTab: ActivePropertyTab;

  // Diff Modal State
  diffModalOpen: boolean;
  diffs: DiffFile[];

  // Internal Timers
  styleDebounceTimer: any;
  tailwindDebounceTimer: any;
  inlineStyleDebounceTimer: any;
  textDebounceTimer: any;

  // History Actions
  recordHistorySnapshot: () => void;
  undo: () => void;
  redo: () => void;

  // Actions
  initIPC: (url: string, token: string) => Promise<void>;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setTreeData: (tree: ComponentTreeNode) => void;
  setSelectedNodeId: (id: string | null, details?: SelectedElementDetails | null) => void;
  setHoveredNodeId: (id: string | null, details?: HoveredElementPayload | null) => void;
  toggleNodeExpanded: (id: string) => void;
  expandAllNodes: () => void;
  collapseAllNodes: () => void;
  setSearchQuery: (query: string) => void;
  setShowFrameworkInternals: (show: boolean) => void;
  setViewportPreset: (preset: ViewportPreset) => void;
  setCustomViewport: (width: number, height: number) => void;
  setZoomLevel: (zoom: number) => void;
  setOrientation: (orientation: 'portrait' | 'landscape') => void;
  setPanOffset: (offset: { x: number; y: number }) => void;
  setWriteBackMode: (mode: WriteBackMode) => void;
  setDiffModalOpen: (open: boolean) => void;
  setDiffs: (diffs: DiffFile[]) => void;
  setActivePropertyTab: (tab: ActivePropertyTab) => void;
  setEditorMode: (mode: EditorMode) => void;

  // Canvas & AST Actions
  updateTailwindClass: (newClasses: string[]) => void;
  updateTextContent: (text: string) => void;
  updateInlineStyle: (prop: string, val: string) => void;
  updateCssModule: (cssText: string) => void;
  updatePosition: (sourceFile: string, sourceLine: number, position: { left: number; top: number; mode?: string }, skipHistory?: boolean, sourceColumn?: number) => void;
  insertNode: (targetFile: string, targetLine: number, position: 'inside' | 'before' | 'after', jsxSnippet: string) => void;
  deleteNode: (sourceFile: string, sourceLine: number) => void;
  reorderNodes: (sourceId: string, targetId: string, position: 'before' | 'after' | 'inside') => void;
}

export const useEditorStore = create<EditorStoreState>((set, get) => ({
  // Language
  language: 'zh',
  setLanguage: (language) => set({ language }),

  // Connection
  connectionStatus: 'disconnected',
  ipcClient: null,
  writeBackMode: 'direct',

  // Undo/Redo History Stack
  past: [],
  future: [],

  // Tree & Selection
  treeData: null,
  selectedNodeId: null,
  selectedElementDetails: null,
  hoveredNodeId: null,
  hoveredElementDetails: null,
  expandedNodeIds: new Set<string>(['root']),
  searchQuery: '',
  showFrameworkInternals: false,

  // Target Selector Hub Initial State
  targetType: 'tsx',
  targetPath: 'src/App.tsx',
  recentTargets: [
    { type: 'tsx', path: 'src/App.tsx', name: 'App.tsx' },
    { type: 'html', path: 'public/index.html', name: 'index.html' },
    { type: 'url', path: 'http://localhost:5173', name: 'http://localhost:5173' },
  ],
  setTargetType: (targetType) => set({ targetType }),
  setTargetPath: (targetPath) => set({ targetPath }),
  addRecentTarget: (target) =>
    set((state) => {
      const filtered = state.recentTargets.filter((t) => t.path !== target.path);
      return { recentTargets: [target, ...filtered].slice(0, 10) };
    }),

  // Viewport
  viewportWidth: 560,
  viewportHeight: 480,
  zoomLevel: 1.0,
  activePresetId: 'custom',
  orientation: 'landscape',
  panOffset: { x: 0, y: 0 },
  editorMode: 'select',

  // Property Panel
  activePropertyTab: 'tailwind',

  // Diff Modal
  diffModalOpen: false,
  diffs: [],

  // Timers
  styleDebounceTimer: null,
  tailwindDebounceTimer: null,
  inlineStyleDebounceTimer: null,
  textDebounceTimer: null,

  // Actions
  initIPC: async (url: string, token: string) => {
    const client = new IPCClientService(url, token);
    set({ connectionStatus: 'connecting', ipcClient: client });

    client.on('CONNECTION_STATUS', ({ status }) => {
      set({ connectionStatus: status });
    });

    client.on('SELECTION_CHANGED', (payload) => {
      const id = payload.element || (payload.file && payload.line ? `${payload.file}:${payload.line}` : null);
      if (id) {
        set((state) => {
          const expanded = new Set(state.expandedNodeIds);
          expanded.add(id);
          return { selectedNodeId: id, expandedNodeIds: expanded };
        });
      }
    });

    client.on('DIFF_PREVIEW_RESPONSE', (payload) => {
      if (payload.diffs) {
        set({ diffs: payload.diffs, diffModalOpen: true });
      }
    });

    client.on('writeBack.diffResponse', (payload) => {
      if (payload.diffs) {
        set({ diffs: payload.diffs, diffModalOpen: true });
      }
    });

    client.on('hmr.willTrigger', (payload: { modifiedFile: string; lineDelta: number; affectedLineStart: number }) => {
      const state = get();
      const selected = state.selectedElementDetails;

      if (
        selected &&
        (selected.sourceFile === payload.modifiedFile || selected.sourceFile.endsWith(payload.modifiedFile)) &&
        selected.sourceLine >= payload.affectedLineStart
      ) {
        const updatedLine = selected.sourceLine + payload.lineDelta;
        const updatedId = `${selected.sourceFile}:${updatedLine}:${selected.sourceColumn || 0}:${selected.tagName}`;

        set({
          selectedNodeId: updatedId,
          selectedElementDetails: {
            ...selected,
            id: updatedId,
            sourceLine: updatedLine,
          },
        });
      }
    });

    await client.connect();
  },


  setConnectionStatus: (connectionStatus) => set({ connectionStatus }),

  setTreeData: (treeData) => {
    // Auto-expand root and its immediate children so the tree is usable
    const expanded = new Set<string>([treeData.id]);
    if (treeData.children) {
      treeData.children.forEach((child) => expanded.add(child.id));
    }
    set({ treeData, expandedNodeIds: expanded });
  },

  setSelectedNodeId: (id, details = null) => {
    set((state) => {
      const expanded = new Set(state.expandedNodeIds);
      if (id) {
        expanded.add(id);
        const openAncestors = (node: ComponentTreeNode | null): boolean => {
          if (!node) return false;
          if (node.id === id || node.children?.some(openAncestors)) { expanded.add(node.id); return true; }
          return false;
        };
        openAncestors(state.treeData);
      }

      let resolvedDetails = details;
      if (!resolvedDetails && id && state.treeData) {
        const findInTree = (node: ComponentTreeNode | null, targetId: string): ComponentTreeNode | null => {
          if (!node) return null;
          if (node.id === targetId) return node;
          if (node.children) {
            for (const child of node.children) {
              const res = findInTree(child, targetId);
              if (res) return res;
            }
          }
          return null;
        };

        const foundNode = findInTree(state.treeData, id);
        if (foundNode) {
          resolvedDetails = {
            id: foundNode.id,
            sourceFile: foundNode.sourceFile || state.targetPath || 'src/App.tsx',
            sourceLine: foundNode.sourceLine || 1,
            sourceColumn: foundNode.sourceColumn || 0,
            tagName: foundNode.name,
            componentName: foundNode.kind === 'custom-component' ? foundNode.name : undefined,
            classList: foundNode.classList || [],
            inlineStyles: {},
            boxModel: {
              margin: { top: 0, right: 0, bottom: 0, left: 0 },
              padding: { top: 0, right: 0, bottom: 0, left: 0 },
            },
            computedStyles: {},
            textContext: foundNode.name,
            attributes: foundNode.attributes || {},
          };
        }
      }

      return {
        selectedNodeId: id,
        selectedElementDetails: resolvedDetails,
        expandedNodeIds: expanded,
      };
    });

    const client = get().ipcClient;
    const currentDetails = get().selectedElementDetails;
    if (client && currentDetails) {
      client.sendNotification('SELECTION_CHANGED', {
        file: currentDetails.sourceFile,
        line: currentDetails.sourceLine,
        element: currentDetails.tagName,
        componentName: currentDetails.componentName,
      });
    }
  },

  setHoveredNodeId: (id: string | null, details: HoveredElementPayload | null = null) => {
    set({ hoveredNodeId: id, hoveredElementDetails: details });
  },

  toggleNodeExpanded: (id) =>
    set((state) => {
      const expanded = new Set(state.expandedNodeIds);
      if (expanded.has(id)) {
        expanded.delete(id);
      } else {
        expanded.add(id);
      }
      return { expandedNodeIds: expanded };
    }),

  expandAllNodes: () => {
    const allIds = new Set<string>();
    const collect = (node: ComponentTreeNode) => {
      allIds.add(node.id);
      if (node.children) node.children.forEach(collect);
    };
    const tree = get().treeData;
    if (tree) collect(tree);
    set({ expandedNodeIds: allIds });
  },

  collapseAllNodes: () => set({ expandedNodeIds: new Set<string>() }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setShowFrameworkInternals: (showFrameworkInternals) => set({ showFrameworkInternals }),

  setViewportPreset: (preset) =>
    set({
      activePresetId: preset.id,
      viewportWidth: preset.width,
      viewportHeight: preset.height,
    }),

  setCustomViewport: (width, height) =>
    set({
      activePresetId: 'custom',
      viewportWidth: width,
      viewportHeight: height,
    }),

  setZoomLevel: (zoomLevel) => set({ zoomLevel }),

  setOrientation: (orientation) =>
    set((state) => {
      if (state.orientation === orientation) return state;
      return {
        orientation,
        viewportWidth: state.viewportHeight,
        viewportHeight: state.viewportWidth,
      };
    }),

  setPanOffset: (panOffset) => set({ panOffset }),
  setWriteBackMode: (writeBackMode) => set({ writeBackMode }),
  setDiffModalOpen: (diffModalOpen) => set({ diffModalOpen }),
  setDiffs: (diffs) => set({ diffs }),
  setActivePropertyTab: (activePropertyTab) => set({ activePropertyTab }),
  setEditorMode: (editorMode) => set({ editorMode }),

  recordHistorySnapshot: () => {
    const state = get();
    const snapshot: HistoryEntry = {
      treeData: state.treeData ? JSON.parse(JSON.stringify(state.treeData)) : null,
      selectedNodeId: state.selectedNodeId,
      selectedElementDetails: state.selectedElementDetails ? JSON.parse(JSON.stringify(state.selectedElementDetails)) : null,
    };
    const newPast = [...state.past, snapshot];
    if (newPast.length > 50) newPast.shift();
    set({ past: newPast, future: [] });
  },

  undo: () => {
    const state = get();
    if (state.tailwindDebounceTimer) { clearTimeout(state.tailwindDebounceTimer); set({ tailwindDebounceTimer: null }); }
    if (state.textDebounceTimer) { clearTimeout(state.textDebounceTimer); set({ textDebounceTimer: null }); }
    if (state.inlineStyleDebounceTimer) { clearTimeout(state.inlineStyleDebounceTimer); set({ inlineStyleDebounceTimer: null }); }
    if (state.styleDebounceTimer) { clearTimeout(state.styleDebounceTimer); set({ styleDebounceTimer: null }); }

    const { past, future, treeData, selectedNodeId, selectedElementDetails } = get();
    if (!past || past.length === 0) return;

    const previousState = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    const currentSnapshot: HistoryEntry = {
      treeData: treeData ? JSON.parse(JSON.stringify(treeData)) : null,
      selectedNodeId,
      selectedElementDetails: selectedElementDetails ? JSON.parse(JSON.stringify(selectedElementDetails)) : null,
    };

    const newFuture = [currentSnapshot, ...future];

    set({
      past: newPast,
      future: newFuture,
      treeData: previousState.treeData ? JSON.parse(JSON.stringify(previousState.treeData)) : null,
      selectedNodeId: previousState.selectedNodeId,
      selectedElementDetails: previousState.selectedElementDetails ? JSON.parse(JSON.stringify(previousState.selectedElementDetails)) : null,
    });

    if (previousState.selectedElementDetails && typeof globalThis.window !== 'undefined' && globalThis.window.postMessage) {
      globalThis.window.postMessage(
        {
          type: 'MUTATE_DOM_PREVIEW',
          payload: {
            sourceFile: previousState.selectedElementDetails.sourceFile,
            line: previousState.selectedElementDetails.sourceLine,
            classList: previousState.selectedElementDetails.classList,
            textContent: previousState.selectedElementDetails.textContext,
            inlineStyles: previousState.selectedElementDetails.inlineStyles,
          },
        },
        '*'
      );
    }
  },

  redo: () => {
    const state = get();
    if (state.tailwindDebounceTimer) { clearTimeout(state.tailwindDebounceTimer); set({ tailwindDebounceTimer: null }); }
    if (state.textDebounceTimer) { clearTimeout(state.textDebounceTimer); set({ textDebounceTimer: null }); }
    if (state.inlineStyleDebounceTimer) { clearTimeout(state.inlineStyleDebounceTimer); set({ inlineStyleDebounceTimer: null }); }
    if (state.styleDebounceTimer) { clearTimeout(state.styleDebounceTimer); set({ styleDebounceTimer: null }); }

    const { past, future, treeData, selectedNodeId, selectedElementDetails } = get();
    if (!future || future.length === 0) return;

    const nextState = future[0];
    const newFuture = future.slice(1);

    const currentSnapshot: HistoryEntry = {
      treeData: treeData ? JSON.parse(JSON.stringify(treeData)) : null,
      selectedNodeId,
      selectedElementDetails: selectedElementDetails ? JSON.parse(JSON.stringify(selectedElementDetails)) : null,
    };

    const newPast = [...past, currentSnapshot];

    set({
      past: newPast,
      future: newFuture,
      treeData: nextState.treeData ? JSON.parse(JSON.stringify(nextState.treeData)) : null,
      selectedNodeId: nextState.selectedNodeId,
      selectedElementDetails: nextState.selectedElementDetails ? JSON.parse(JSON.stringify(nextState.selectedElementDetails)) : null,
    });

    if (nextState.selectedElementDetails && typeof globalThis.window !== 'undefined' && globalThis.window.postMessage) {
      globalThis.window.postMessage(
        {
          type: 'MUTATE_DOM_PREVIEW',
          payload: {
            sourceFile: nextState.selectedElementDetails.sourceFile,
            line: nextState.selectedElementDetails.sourceLine,
            classList: nextState.selectedElementDetails.classList,
            textContent: nextState.selectedElementDetails.textContext,
            inlineStyles: nextState.selectedElementDetails.inlineStyles,
          },
        },
        '*'
      );
    }
  },

  updateTailwindClass: (newClasses) => {
    const state = get();
    const details = state.selectedElementDetails;
    if (!details) return;

    if (!state.tailwindDebounceTimer) {
      state.recordHistorySnapshot();
    } else {
      set({ future: [] });
    }

    const updatedDetails: SelectedElementDetails = {
      ...details,
      classList: newClasses,
    };
    set({ selectedElementDetails: updatedDetails });

    // In-memory tree update for live preview
    const tree = state.treeData;
    if (tree && details.id) {
      const updateNodeClass = (n: ComponentTreeNode): ComponentTreeNode => ({
        ...n,
        classList: n.id === details.id ? newClasses : n.classList,
        children: n.children ? n.children.map(updateNodeClass) : [],
      });
      set({ treeData: updateNodeClass(tree) });
    }

    // Optimistic DOM mutation via postMessage
    if (typeof globalThis.window !== 'undefined' && globalThis.window.postMessage) {
      globalThis.window.postMessage(
        {
          type: 'MUTATE_DOM_PREVIEW',
          payload: {
            sourceFile: details.sourceFile,
            line: details.sourceLine,
            classList: newClasses,
          },
        },
        '*'
      );
    }

    // Debounced IPC write-back
    if (state.tailwindDebounceTimer) clearTimeout(state.tailwindDebounceTimer);
    const timer = setTimeout(() => {
      set({ tailwindDebounceTimer: null });
      const currentState = get();
      if (currentState.ipcClient) {
        if (currentState.writeBackMode === 'preview') {
          currentState.ipcClient.sendNotification('WRITE_BACK_REQUEST', {
            mode: 'preview',
            changes: [
              {
                file: details.sourceFile,
                line: details.sourceLine,
                type: 'STYLE_UPDATE',
                payload: { styleType: 'tailwind', changes: { classList: newClasses } },
              },
            ],
          });
        } else {
          currentState.ipcClient.sendNotification('STYLE_UPDATE', {
            file: details.sourceFile,
            line: details.sourceLine,
            styleType: 'tailwind',
            changes: { classList: newClasses },
          });
        }
      }
    }, 150);

    set({ tailwindDebounceTimer: timer });
  },

  updateTextContent: (text) => {
    const state = get();
    const details = state.selectedElementDetails;
    if (!details) return;

    if (!state.textDebounceTimer) {
      state.recordHistorySnapshot();
    } else {
      set({ future: [] });
    }

    const updatedDetails: SelectedElementDetails = {
      ...details,
      textContext: text,
    };
    set({ selectedElementDetails: updatedDetails });

    const tree = state.treeData;
    if (tree && details.id) {
      const updateNodeText = (n: ComponentTreeNode): ComponentTreeNode => ({
        ...n,
        attributes: n.id === details.id ? { ...n.attributes, textContent: text } : n.attributes,
        children: n.children ? n.children.map(updateNodeText) : [],
      });
      set({ treeData: updateNodeText(tree) });
    }

    if (typeof globalThis.window !== 'undefined' && globalThis.window.postMessage) {
      globalThis.window.postMessage(
        {
          type: 'MUTATE_DOM_PREVIEW',
          payload: {
            sourceFile: details.sourceFile,
            line: details.sourceLine,
            textContent: text,
          },
        },
        '*'
      );
    }

    if (state.textDebounceTimer) clearTimeout(state.textDebounceTimer);
    const timer = setTimeout(() => {
      set({ textDebounceTimer: null });
      const currentState = get();
      if (currentState.ipcClient) {
        if (currentState.writeBackMode === 'preview') {
          currentState.ipcClient.sendNotification('WRITE_BACK_REQUEST', {
            mode: 'preview',
            changes: [
              {
                file: details.sourceFile,
                line: details.sourceLine,
                type: 'TEXT_UPDATE',
                payload: { text },
              },
            ],
          });
        } else {
          currentState.ipcClient.sendNotification('TEXT_UPDATE', {
            file: details.sourceFile,
            line: details.sourceLine,
            text,
          });
        }
      }
    }, 150);

    set({ textDebounceTimer: timer });
  },

  updateInlineStyle: (prop, val) => {
    const state = get();
    const details = state.selectedElementDetails;
    if (!details) return;

    if (!state.inlineStyleDebounceTimer) {
      state.recordHistorySnapshot();
    } else {
      set({ future: [] });
    }

    const updatedInlineStyles = { ...details.inlineStyles, [prop]: val };
    const updatedDetails: SelectedElementDetails = {
      ...details,
      inlineStyles: updatedInlineStyles,
    };
    set({ selectedElementDetails: updatedDetails });

    if (typeof globalThis.window !== 'undefined' && globalThis.window.postMessage) {
      globalThis.window.postMessage(
        {
          type: 'MUTATE_DOM_PREVIEW',
          payload: {
            sourceFile: details.sourceFile,
            line: details.sourceLine,
            inlineStyles: updatedInlineStyles,
          },
        },
        '*'
      );
    }

    if (state.inlineStyleDebounceTimer) clearTimeout(state.inlineStyleDebounceTimer);
    const timer = setTimeout(() => {
      set({ inlineStyleDebounceTimer: null });
      const currentState = get();
      if (currentState.ipcClient) {
        if (currentState.writeBackMode === 'preview') {
          currentState.ipcClient.sendNotification('WRITE_BACK_REQUEST', {
            mode: 'preview',
            changes: [
              {
                file: details.sourceFile,
                line: details.sourceLine,
                type: 'STYLE_UPDATE',
                payload: { styleType: 'inline', changes: { inlineStyles: updatedInlineStyles } },
              },
            ],
          });
        } else {
          currentState.ipcClient.sendNotification('STYLE_UPDATE', {
            file: details.sourceFile,
            line: details.sourceLine,
            styleType: 'inline',
            changes: { inlineStyles: updatedInlineStyles },
          });
        }
      }
    }, 150);

    set({ inlineStyleDebounceTimer: timer });
  },

  updateCssModule: (cssText: string) => {
    const state = get();
    const details = state.selectedElementDetails;
    if (!details) return;

    const snapshot: HistoryEntry = {
      treeData: state.treeData ? JSON.parse(JSON.stringify(state.treeData)) : null,
      selectedNodeId: state.selectedNodeId,
      selectedElementDetails: state.selectedElementDetails ? JSON.parse(JSON.stringify(state.selectedElementDetails)) : null,
    };
    const newPast = [...state.past, snapshot];
    if (newPast.length > 50) newPast.shift();
    set({ past: newPast, future: [] });

    if (state.ipcClient) {
      if (state.writeBackMode === 'preview') {
        state.ipcClient.sendNotification('WRITE_BACK_REQUEST', {
          mode: 'preview',
          changes: [
            {
              file: details.sourceFile,
              line: details.sourceLine,
              type: 'STYLE_UPDATE',
              payload: { styleType: 'css-module', changes: { css: cssText } },
            },
          ],
        });
      } else {
        state.ipcClient.sendNotification('STYLE_UPDATE', {
          file: details.sourceFile,
          line: details.sourceLine,
          styleType: 'css-module',
          changes: { css: cssText },
        });
      }
    }
  },

  updatePosition: (sourceFile, sourceLine, position, skipHistory = false, sourceColumn = 0) => {
    const state = get();
    if (!skipHistory) {
      state.recordHistorySnapshot();
    } else {
      set({ future: [] });
    }

    const details = state.selectedElementDetails;
    if (details) {
      const updatedInlineStyles = {
        ...details.inlineStyles,
        left: `${position.left}px`,
        top: `${position.top}px`,
        ...(position.mode ? { position: position.mode } : {}),
      };
      set({
        selectedElementDetails: {
          ...details,
          inlineStyles: updatedInlineStyles,
        },
      });

      if (typeof globalThis.window !== 'undefined' && globalThis.window.postMessage) {
        globalThis.window.postMessage(
          {
            type: 'MUTATE_DOM_PREVIEW',
            payload: {
              sourceFile: details.sourceFile,
              line: details.sourceLine,
              inlineStyles: updatedInlineStyles,
            },
          },
          '*'
        );
      }
    }

    const client = state.ipcClient;
    if (client) {
      const payload: any = {
        file: sourceFile,
        line: sourceLine,
        sourceFile,
        sourceLine,
        position,
      };
      if (sourceColumn) {
        payload.sourceColumn = sourceColumn;
      }
      client.sendNotification('POSITION_UPDATE', payload);
    }
  },

  insertNode: (targetFile, targetLine, position, jsxSnippet) => {
    const state = get();
    state.recordHistorySnapshot();

    const client = state.ipcClient;
    if (client) {
      client.sendNotification('NODE_INSERT', {
        file: targetFile,
        line: targetLine,
        targetFile,
        targetLine,
        position,
        jsxSnippet,
      });
    }

    // In-memory tree insertion for live preview
    const tree = get().treeData;
    if (tree) {
      const newId = `inserted-${Date.now()}`;
      const newNode: ComponentTreeNode = {
        id: newId,
        name: jsxSnippet.includes('<button') ? 'button' : jsxSnippet.includes('<h2') ? 'h2' : jsxSnippet.includes('<p') ? 'p' : jsxSnippet.includes('<img') ? 'img' : 'div',
        kind: 'html-element',
        sourceFile: targetFile,
        sourceLine: targetLine,
        classList: ['p-3', 'bg-slate-800', 'rounded-md', 'text-white'],
        attributes: { textContent: 'New Element' },
        children: [],
      };
      const clone = JSON.parse(JSON.stringify(tree)) as ComponentTreeNode;
      clone.children = clone.children || [];
      clone.children.push(newNode);
      set({ treeData: clone });
    }
  },

  deleteNode: (sourceFile, sourceLine) => {
    const state = get();
    state.recordHistorySnapshot();

    const client = state.ipcClient;
    if (client) {
      client.sendNotification('NODE_DELETE', {
        file: sourceFile,
        line: sourceLine,
      });
    }
    const selectedId = get().selectedNodeId;
    const tree = get().treeData;
    if (tree && selectedId) {
      const filterTree = (n: ComponentTreeNode): ComponentTreeNode | null => {
        if (n.id === selectedId) return null;
        return {
          ...n,
          children: n.children ? (n.children.map(filterTree).filter(Boolean) as ComponentTreeNode[]) : [],
        };
      };
      const updatedTree = filterTree(tree);
      set({ treeData: updatedTree });
    }
    set({ selectedNodeId: null, selectedElementDetails: null });
  },

  reorderNodes: (sourceId, targetId, position) => {
    const tree = get().treeData;
    if (!tree) return;

    // Guard against self-nesting
    if (sourceId === targetId) return;

    // Guard against ancestor-into-descendant nesting
    const findNode = (node: ComponentTreeNode, id: string): ComponentTreeNode | null => {
      if (node.id === id) return node;
      if (!node.children) return null;
      for (const child of node.children) {
        const found = findNode(child, id);
        if (found) return found;
      }
      return null;
    };

    const isDescendant = (node: ComponentTreeNode, searchId: string): boolean => {
      if (!node.children || node.children.length === 0) return false;
      for (const child of node.children) {
        if (child.id === searchId) return true;
        if (isDescendant(child, searchId)) return true;
      }
      return false;
    };

    const sourceNode = findNode(tree, sourceId);
    const targetNode = findNode(tree, targetId);
    if (!sourceNode || !targetNode || isDescendant(sourceNode, targetId)) return;

    const state = get();
    state.recordHistorySnapshot();

    // Helper to find and detach node
    let detachedNode: ComponentTreeNode | null = null;
    const detach = (parent: ComponentTreeNode): boolean => {
      if (!parent.children) return false;
      const idx = parent.children.findIndex((c) => c.id === sourceId);
      if (idx !== -1) {
        detachedNode = parent.children.splice(idx, 1)[0];
        return true;
      }
      return parent.children.some(detach);
    };

    const cloneTree = JSON.parse(JSON.stringify(tree)) as ComponentTreeNode;
    detach(cloneTree);

    if (detachedNode) {
      if (position === 'inside') {
        const attachInside = (node: ComponentTreeNode): boolean => {
          if (node.id === targetId) {
            node.children = node.children || [];
            node.children.push(detachedNode!);
            return true;
          }
          if (node.children) {
            return node.children.some(attachInside);
          }
          return false;
        };
        attachInside(cloneTree);
      } else {
        const attachSibling = (parent: ComponentTreeNode): boolean => {
          if (!parent.children) return false;
          const idx = parent.children.findIndex((c) => c.id === targetId);
          if (idx !== -1) {
            const insertIdx = position === 'after' ? idx + 1 : idx;
            parent.children.splice(insertIdx, 0, detachedNode!);
            return true;
          }
          return parent.children.some(attachSibling);
        };
        attachSibling(cloneTree);
      }
      set({ treeData: cloneTree });
    }

    const findParent = (node: ComponentTreeNode, childId: string): ComponentTreeNode | null => {
      if (!node.children) return null;
      if (node.children.some((c) => c.id === childId)) return node;
      for (const child of node.children) {
        const found = findParent(child, childId);
        if (found) return found;
      }
      return null;
    };
    const parentOfTarget = findParent(tree, targetId);
    const parentLine = position === 'inside' ? targetNode.sourceLine : (parentOfTarget?.sourceLine ?? targetNode.sourceLine);

    const client = state.ipcClient;
    if (client) {
      client.sendNotification('REORDER_NODES', {
        sourceFile: sourceNode.sourceFile,
        parentLine,
        sourceLine: sourceNode.sourceLine,
        targetLine: targetNode.sourceLine,
      });
    }
  },
}));
