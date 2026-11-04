import type { HeaderContent } from './components/CaseHeader';
import type { FigureContent } from './components/FigurePlaceholder';
type Item = { label: string; text: string };
export type CaseBlock =
 | { kind: 'source-evidence' }
 | { kind: 'report-edit-carousel' }
 | { kind: 'outline-devices' }
 | { kind: 'mvp-comparison' }
 | { kind: 'responsive-template'; title?: string; desktopSrc?: string; mobileSrc?: string }
 | { kind: 'user-flow' }
 | { kind: 'test-feedback-bubbles' }
 | { kind: 'research-quadrants' }
 | { kind: 'trial-feedback'; groups: { title: string; items: { product: string; text: string }[] }[] }
 | { kind: 'research-topics'; texts: string[] }
 | { kind: 'goal-notes'; texts: string[] }
 | { kind: 'flow'; rows: { label?: string; steps: string[]; highlight?: number[] }[]; note?: string }
 | { kind: 'layers'; items: { label: string; text?: string }[] }
 | { kind: 'chat'; texts: string[]; note?: string }
 | { kind: 'statement'; text: string }
 | { kind: 'paragraph' | 'aside'; text: string; highlight?: string }
 | { kind: 'subsection'; title: string; number?: string; plain?: boolean; prominent?: boolean; blocks: CaseBlock[] }
 | { kind: 'quotes'; texts: string[] }
 | { kind: 'figures'; figures: FigureContent[]; arrow?: boolean }
 | { kind: 'table'; headers: string[]; rows: string[][]; label: string; highlighted?: number[]; legend?: string }
 | { kind: 'columns' | 'participants'; items: Item[] }
 | { kind: 'steps'; items: string[]; preparation: string; rework: string }
 | { kind: 'tradeoffs'; items: { title: string; quote: string; judgment: string; result: string }[] }
 | { kind: 'sources'; items: { key: string; text: string }[] }
 | { kind: 'metrics'; items: Item[]; note: string };
export type CaseContent = {
 header: HeaderContent; hero: FigureContent;
 timeline?: string[]; opening?: CaseBlock[];
 toc: { id: string; label: string }[];
 chapters: { id: string; label: string; title: string; blocks: CaseBlock[] }[];
 ui: { back: string; next: string; nextTitle: string; toc: string; judgment: string; result: string; footer: string; previous?: string; previousTitle?: string };
};
