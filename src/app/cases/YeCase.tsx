import { YeCollaborationVersions } from './components/YeCollaborationVersions';
import { YeModelStates } from './components/YeModelStates';
import { CaseOpening } from './components/CaseOpening';
import { useEffect } from 'react';
import { ye } from './content/ye';
import { CaseLayout } from './components/CaseLayout';
import { CaseHeader } from './components/CaseHeader';
import { CaseToc } from './components/CaseToc';
import { CaseSection } from './components/CaseSection';
import { FigurePlaceholder } from './components/FigurePlaceholder';
import { CaseBlocks } from './CaseBlocks';
import { YeProgressCards } from './components/YeProgressCards';
import { YeResearchCards } from './components/YeResearchCards';
import { YeHomePreview } from './components/YeHomePreview';
import './ye.css';

export function YeCase() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return <CaseLayout backLabel={ye.ui.back} footer={<span className="text-caption text-text-meta">{ye.ui.footer}</span>}>
    <div className="ye-case">
      <CaseHeader content={ye.header} compact />
      <FigurePlaceholder {...ye.hero} />
      <CaseOpening content={ye} />
      <div className="case-body"><CaseToc items={ye.toc} label={ye.ui.toc} /><div className="case-chapters">{ye.chapters.map(chapter => <CaseSection key={chapter.id} id={chapter.id} label={chapter.label} title={chapter.title}>{chapter.blocks.map((block, index) => block.kind === 'metrics' ? <YeProgressCards key={index} items={block.items} note={block.note} /> : chapter.id === 'ye-05' && index === 1 ? <YeResearchCards key={index} /> : chapter.id === 'ye-05' && block.kind === 'figures' && block.figures.some(figure => figure.plate === 'PLATE 02') ? <YeHomePreview key={index} /> : <div key={index}>{chapter.id === 'ye-02' && block.kind === 'flow' && <YeCollaborationVersions />}<CaseBlocks blocks={[block]} labels={ye.ui} />{chapter.id === 'ye-05' && block.kind === 'subsection' && block.title === '状态设计' && <YeModelStates />}</div>)}</CaseSection>)}</div></div>
      <nav className="case-switch"><a href="#/project/qixin-brain"><span className="text-caption text-text-meta">{ye.ui.previous}</span><span className="text-h4 font-normal">{ye.ui.previousTitle}</span></a><a href="#ai"><span className="text-caption text-text-meta">{ye.ui.next}</span><span className="text-h4 font-normal">{ye.ui.nextTitle}</span></a></nav>
    </div>
  </CaseLayout>;
}
