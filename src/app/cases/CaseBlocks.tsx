import { StoryDiagram } from './components/StoryDiagram';
import { Fragment } from 'react';
import type { CaseBlock } from './types';
import { CaseText } from './components/TodoNote';
import { Quote } from './components/Quote';
import { FigurePlaceholder } from './components/FigurePlaceholder';
import { DataTable } from './components/DataTable';
import { MetricRow } from './components/MetricRow';
export function CaseBlocks({ blocks, labels, depth = 0 }: { depth?: number; blocks: CaseBlock[]; labels: { judgment: string; result: string } }) {
  return <>{blocks.map((block, index) => {
    const key = index;
    switch (block.kind) {
      case 'flow': case 'layers': case 'chat': case 'statement': return <StoryDiagram key={key} block={block} />;
      case 'paragraph': return <div key={key} className="case-prose">{block.text.split(/\n+/).map((text, i) => <p key={i} className="case-paragraph"><CaseText text={text} /></p>)}</div>;
      case 'aside': return <p key={key} className="case-paragraph border-t border-dashed border-border-dashed pt-6"><CaseText text={block.text} /></p>;
      case 'subsection': { const Heading = depth === 0 ? 'h3' : 'h4'; return <div key={key} className={`case-subsection${block.plain ? " case-subsection-plain" : ""}`}><Heading className={depth === 0 ? "text-h4 font-medium" : "text-body font-medium"}><CaseText text={block.title} /></Heading><CaseBlocks blocks={block.blocks} labels={labels} depth={depth + 1} /></div>; }
      case 'quotes': return <div key={key} className="case-quotes">{block.texts.map(text => <Quote key={text} text={text} />)}</div>;
      case 'figures': return <div key={key} className={block.figures.length > 1 ? 'case-pair' : undefined}>{block.figures.map(figure => <FigurePlaceholder key={figure.plate} {...figure} />)}</div>;
      case 'table': return <DataTable key={key} {...block} />;
      case 'columns': return <div key={key} className={`case-columns ${block.items.length === 3 ? 'case-columns-three' : block.items.length === 4 ? 'case-columns-four' : ''}`}>{block.items.map(item => <div key={item.label}><dl><dt className="text-caption text-text-meta">{item.label}</dt>{item.text && <dd className="text-body text-text-body"><CaseText text={item.text} /></dd>}</dl></div>)}</div>;
      case 'participants': return <div key={key} className="case-participants">{block.items.map(item => <div key={item.label}><span className="text-caption text-text-meta">{item.label}</span><CaseText text={item.text} /></div>)}</div>;
      case 'steps': return <ol key={key} className="case-steps">{block.items.map((item, i) => <li key={item}>{item}{(i === 1 || i === 2) && <span className="block mt-3 text-caption text-text-secondary">{block.preparation}</span>}{i === 3 && <span className="block mt-3 text-caption text-text-secondary">{block.rework}</span>}</li>)}</ol>;
      case 'tradeoffs': return <Fragment key={key}>{block.items.map(item => <div key={item.title} className="case-tradeoff"><h3 className="text-h4 font-medium">{item.title}</h3><Quote text={item.quote} /><dl className="flex flex-col gap-6">{[{ label: labels.judgment, text: item.judgment },{ label: labels.result, text: item.result }].map(part => <div key={part.label}><dt className="text-caption text-text-meta">{part.label}</dt><dd className="case-paragraph"><CaseText text={part.text} /></dd></div>)}</dl></div>)}</Fragment>;
      case 'sources': return <div key={key} className="case-sources">{block.items.map(item => <div key={item.key} className={`case-source-${item.key}`}>{item.text}</div>)}</div>;
      case 'metrics': return <MetricRow key={key} items={block.items} note={block.note} />;
    }
  })}</>;
}
