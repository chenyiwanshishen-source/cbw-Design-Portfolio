import type { CaseBlock } from '../types';
import { CaseText } from './TodoNote';
import '../story.css';

type Diagram = Extract<CaseBlock, { kind: 'flow' | 'layers' | 'chat' | 'statement' }>;
export function StoryDiagram({ block }: { block: Diagram }) {
  if (block.kind === 'statement') return <p className="case-statement"><CaseText text={block.text} /></p>;
  if (block.kind === 'layers') return <dl className="case-layers">{block.items.map(item => <div key={item.label}><dt>{item.label}</dt>{item.text && <dd><CaseText text={item.text} /></dd>}</div>)}</dl>;
  if (block.kind === 'chat') return <figure className="case-chat"><ul>{block.texts.map(text => <li key={text}><CaseText text={text} /></li>)}</ul>{block.note && <figcaption>{block.note}</figcaption>}</figure>;
  return <figure className="case-flow">{block.rows.map((row, i) => <div className="case-flow-row" key={i}>{row.label && <p className="case-flow-label">{row.label}</p>}<ol>{row.steps.map((step, index) => <li key={index} className={row.highlight?.includes(index) ? 'is-highlighted' : undefined}><CaseText text={step} /></li>)}</ol></div>)}{block.note && <figcaption>{block.note}</figcaption>}</figure>;
}
