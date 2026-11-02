import { useEffect } from 'react';
import { explorations } from './content/explorations';
import { CaseLayout } from './components/CaseLayout';
import { CaseHeader } from './components/CaseHeader';
import { CaseToc } from './components/CaseToc';
import { CaseText } from './components/TodoNote';
import { FigurePlaceholder } from './components/FigurePlaceholder';
import { StoryDiagram } from './components/StoryDiagram';
import { CaseBlocks } from './CaseBlocks';
import type { CaseBlock } from './types';
import './explorations.css';

// Lift one existing plate into each project's image/text row; never duplicate it.
function splitLead(blocks: CaseBlock[]): { figure?: Extract<CaseBlock, { kind: 'figures' }>['figures'][number]; blocks: CaseBlock[] } {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.kind === 'figures' && block.figures.length) {
      const [figure, ...rest] = block.figures;
      return { figure, blocks: [...blocks.slice(0, i), ...(rest.length ? [{ ...block, figures: rest }] : []), ...blocks.slice(i + 1)] };
    }
    if (block.kind === 'subsection') {
      const nested = splitLead(block.blocks);
      if (nested.figure) return { figure: nested.figure, blocks: blocks.map((b, j) => j === i ? { ...block, blocks: nested.blocks } : b) };
    }
  }
  return { blocks };
}
const labels = { judgment: '我的判断', result: '结果' };
export function ExplorationsCase() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return <CaseLayout backLabel="← 返回首页" footer={<span className="text-caption text-text-meta">AI 探索</span>}>
    <div className="explorations-case">
      <CaseHeader content={explorations.header} compact />
      <StoryDiagram block={{ kind: 'statement', text: explorations.statement }} />
      <p className="case-paragraph">{explorations.intro}</p>
      <div className="case-body"><CaseToc items={explorations.chapters} label="探索项目目录" /><div className="case-chapters">
        {explorations.chapters.map(chapter => {
          // Keep all six illustration plates together; use its workflow as the lead visual.
          const wallFlow = chapter.id === 'explorations-04' ? chapter.blocks.find(block => block.kind === 'flow') : undefined;
          const lead = wallFlow ? { figure: undefined, blocks: chapter.blocks.filter(block => block !== wallFlow) } : splitLead(chapter.blocks);
          const first = lead.blocks[0];
          const intro = first?.kind === 'paragraph' ? first.text : undefined;
          const rest = intro ? lead.blocks.slice(1) : lead.blocks;
          return <section key={chapter.id} id={chapter.id} className="case-section exploration-project" aria-labelledby={`${chapter.id}-title`} tabIndex={-1}>
            <div className="exploration-lead">
              {wallFlow?.kind === 'flow' ? <StoryDiagram block={wallFlow} /> : lead.figure && <FigurePlaceholder {...lead.figure} />}
              <div><h2 id={`${chapter.id}-title`}>{chapter.title}</h2>{intro && <p className="case-paragraph">{intro}</p>}
              </div>
            </div>
            <CaseBlocks blocks={rest} labels={labels} />
                <p className="exploration-status"><CaseText text={chapter.status.split('GitHub')[0]} />{chapter.url && <><a href={chapter.url} target="_blank" rel="noreferrer">GitHub</a><CaseText text={chapter.status.split('GitHub')[1] ?? ''} /></>}</p>
          </section>;
        })}
      </div></div>
      <nav className="case-switch"><a href="#/project/ye-browser">← 我只说想法，AI 负责把书签分好</a><a href="#/">回到首页 →</a></nav>
    </div>
  </CaseLayout>;
}
