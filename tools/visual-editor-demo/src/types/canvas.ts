import { BoxModelValues } from './index';

export interface BoundingRect {
  x: number;
  y: number;
  width: number;
  height: number;
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

export interface ClickedElementPayload {
  id?: string;
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
  boundingRect: BoundingRect;
  attributes: Record<string, any>;
}

export interface CanvasToIframeMessage {
  type: 'ENABLE_INSPECTOR' | 'HIGHLIGHT_ELEMENT' | 'MUTATE_DOM_PREVIEW' | 'REQUEST_DOM_TREE';
  payload?: any;
}

export interface IframeToCanvasMessage {
  type: 'ELEMENT_HOVERED' | 'ELEMENT_CLICKED' | 'DOM_TREE_RESPONSE' | 'IFRAME_SCROLLED' | 'IFRAME_RESIZED';
  token: string;
  payload: any;
}
