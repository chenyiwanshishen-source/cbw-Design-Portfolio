import { ComponentTreeNode } from '../types';

export interface BoundingRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BoxModelValues {
  margin: { top: number; right: number; bottom: number; left: number };
  padding: { top: number; right: number; bottom: number; left: number };
}

export interface HoveredElementPayload {
  sourceFile: string;
  sourceLine: number;
  sourceColumn?: number;
  tagName: string;
  componentName?: string;
  boundingRect: BoundingRect;
  classList?: string[];
}

export interface ClickedElementPayload extends HoveredElementPayload {
  id?: string;
  textContext?: string;
  classList: string[];
  inlineStyles: Record<string, string>;
  boxModel: BoxModelValues;
  computedStyles: Record<string, string>;
  attributes: Record<string, any>;
}

export interface ActiveSelectionState {
  sourceFile: string;
  sourceLine: number;
  componentName?: string;
  tagName?: string;
  index?: number;
}

export interface BaseIframeMessage {
  token: string;
  timestamp: number;
}

export type CanvasToIframeMessage = BaseIframeMessage & (
  | { type: 'ENABLE_INSPECTOR'; payload: { enabled: boolean; mode?: 'select' | 'hover' | 'off' } }
  | { type: 'HIGHLIGHT_ELEMENT'; payload: { sourceFile: string; line: number } }
  | { type: 'MUTATE_DOM_PREVIEW'; payload: { sourceFile: string; line: number; inlineStyles?: Record<string, string>; textContent?: string; classList?: string[] } }
  | { type: 'REQUEST_DOM_TREE'; payload?: any }
);

export type IframeToCanvasMessage = BaseIframeMessage & (
  | { type: 'ELEMENT_HOVERED'; payload: HoveredElementPayload }
  | { type: 'ELEMENT_CLICKED'; payload: ClickedElementPayload }
  | { type: 'DOM_TREE_RESPONSE'; payload: { root: ComponentTreeNode } }
  | { type: 'IFRAME_SCROLLED'; payload: { scrollX: number; scrollY: number } }
  | { type: 'IFRAME_RESIZED'; payload: { width: number; height: number } }
);

export interface RuntimeBridgeOptions {
  devServerOrigin?: string;
  token?: string;
  targetWindow?: Window;
  parentWindow?: Window;
  inspectorEnabled?: boolean;
  inspectorMode?: 'select' | 'hover' | 'off';
}
