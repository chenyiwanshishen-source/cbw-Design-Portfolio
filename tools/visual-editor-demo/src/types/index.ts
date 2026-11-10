export interface ComponentTreeNode {
  id: string; // `${sourceFile}:${sourceLine}:${sourceColumn || 0}:${tagName}`
  name: string;
  kind: 'custom-component' | 'html-element' | 'text-node';
  sourceFile: string;
  sourceLine: number;
  sourceColumn?: number;
  attributes: Record<string, any>;
  classList: string[];
  children: ComponentTreeNode[];
  isExpanded?: boolean;
  isSelected?: boolean;
  isVisible?: boolean;
}

export interface ViewportPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  category: 'mobile' | 'tablet' | 'desktop' | 'full';
}

export interface BoxModelValues {
  margin: { top: number; right: number; bottom: number; left: number };
  padding: { top: number; right: number; bottom: number; left: number };
}

export interface SelectedElementDetails {
  id: string;
  sourceFile: string;
  sourceLine: number;
  sourceColumn?: number;
  tagName: string;
  componentName?: string;
  textContext?: string;
  classList: string[];
  inlineStyles: Record<string, string>;
  boxModel: BoxModelValues;
  computedStyles: Record<string, string>;
  boundingRect?: { x: number; y: number; width: number; height: number };
  attributes?: Record<string, any>;
}

export interface DiffLine {
  type: 'add' | 'delete' | 'context';
  originalLineNumber?: number;
  modifiedLineNumber?: number;
  content: string;
}

export interface CodeDiffChunk {
  id: string;
  filePath: string;
  startLineOriginal: number;
  endLineOriginal: number;
  startLineModified: number;
  endLineModified: number;
  originalLines: string[];
  modifiedLines: string[];
  lines?: DiffLine[];
  approved: boolean;
}

export interface DiffFile {
  file: string;
  originalContent?: string;
  modifiedContent?: string;
  original?: string;
  modified?: string;
  patch: string;
  additionsCount?: number;
  deletionsCount?: number;
  chunks?: CodeDiffChunk[];
}

export type WriteBackMode = 'direct' | 'preview';
export type ActivePropertyTab = 'tailwind' | 'css-module' | 'inline';
export type EditorMode = 'select' | 'edit' | 'insert' | 'pan';

