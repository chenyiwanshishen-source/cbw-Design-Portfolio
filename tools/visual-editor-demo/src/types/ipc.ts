export interface FlatIPCMessage {
  id?: string;
  type: string;
  payload: Record<string, any>;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface SelectionChangedPayload {
  file: string;
  line: number;
  element: string;
  column?: number;
  componentName?: string;
  attributes?: Record<string, any>;
  computedStyles?: Record<string, string>;
  boundingClientRect?: { x: number; y: number; width: number; height: number };
}

export interface StyleUpdatePayload {
  file: string;
  line: number;
  styleType: 'tailwind' | 'css-module' | 'inline';
  changes: Record<string, any>;
}

export interface TextUpdatePayload {
  file: string;
  line: number;
  text: string;
}

export interface NodeInsertPayload {
  file: string;
  line: number;
  position: 'inside' | 'before' | 'after';
  jsxSnippet: string;
  targetFile?: string;
  targetLine?: number;
}

export interface NodeDeletePayload {
  file: string;
  line: number;
}

export interface WriteBackRequestPayload {
  mode: 'direct' | 'preview';
  changes: Array<{
    file: string;
    line: number;
    type: string;
    payload: any;
  }>;
}

export interface DiffPreviewResponsePayload {
  diffs: Array<{
    file: string;
    original: string;
    modified: string;
    patch: string;
  }>;
}

export interface ConfirmWriteBackPayload {
  transactionId: string;
  approved: boolean;
  approvedChunkIds?: string[];
}
