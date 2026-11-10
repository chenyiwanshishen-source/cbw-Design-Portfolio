import { YeCacheRequest } from './components/YeCacheRequest';
import { YeProductFlow } from './components/YeProductFlow';
import { YeConversationResults } from './components/YeConversationResults';
import { YeCollaborationVersions, YeCollaborationIntro } from './components/YeCollaborationVersions';
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
import { YeResearchCards, YeVisualDefinition } from './components/YeResearchCards';
import { YeHomePreview } from './components/YeHomePreview';
import './ye.css';

export function YeCase() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  const chapter = (id: string) => ye.chapters.find(item => item.id === id)!;
  const renderBlocks = (id: string, blocks = chapter(id).blocks) => blocks.map((block, index) => {
    if (id === 'ye-04' && block.kind === 'layers') return <YeProductFlow key={index} />;
    if (block.kind === 'metrics') return <YeProgressCards key={index} items={block.items} note={block.note} />;
    if (id === 'ye-02' && block.kind === 'paragraph' && index === 0) return <div key={index}><YeCollaborationIntro /><YeCollaborationVersions /></div>;
    return <div key={index}>
      <CaseBlocks blocks={[block]} labels={ye.ui} />
      {id === 'ye-model-adaptation' && index === 0 && <YeCacheRequest />}
      {id === 'ye-05' && block.kind === 'subsection' && block.title === '状态设计' && <YeModelStates />}
      {id === 'ye-05' && block.kind === 'subsection' && block.title === '关于对话' && <YeConversationResults />}
    </div>;
  });
  const renderSubsection = (id: string) => <CaseSection key={id} id={id} label={chapter(id).label} title={chapter(id).title} headingLevel={3}>{renderBlocks(id)}</CaseSection>;
  return <CaseLayout backLabel={ye.ui.back} footer={<span className="text-caption text-text-meta">{ye.ui.footer}</span>}>
    <div className="ye-case">
      <CaseHeader content={ye.header} compact />
      <FigurePlaceholder {...ye.hero} />
      <CaseOpening content={ye} />
      <div className="case-body"><CaseToc items={ye.toc} label={ye.ui.toc} /><div className="case-chapters"><CaseSection id="ye-01" label="概述" title="概述">{renderBlocks('ye-01')}</CaseSection>
        <CaseSection id="ye-05" label="设计方向" title="设计方向">
          {renderBlocks('ye-05', chapter('ye-05').blocks.slice(0, 1))}
          <YeResearchCards />
          {renderSubsection('ye-04')}
        </CaseSection>
        <CaseSection id="ye-interface" label="界面与交互" title="界面与交互">
          <YeVisualDefinition />
          <YeHomePreview />
          {renderBlocks('ye-05', chapter('ye-05').blocks.slice(3))}
        </CaseSection>
        <CaseSection id="ye-implementation" label="实现与协作" title="实现与协作">
          {renderBlocks('ye-model-adaptation')}
          {['ye-02', 'ye-03'].map(renderSubsection)}
        </CaseSection>
        <CaseSection id="ye-07" label="想法" title="想法">{renderBlocks('ye-07', chapter('ye-07').blocks.slice(0, 3))}<div className="case-prose"><ul className="ye-review-points">{chapter('ye-07').blocks.slice(3, 6).map((block, index) => block.kind === 'paragraph' ? <li key={index}>{block.text}</li> : null)}</ul></div>{renderBlocks('ye-07', chapter('ye-07').blocks.slice(6))}</CaseSection>
</div></div>
      <nav className="case-switch"><a href="#/project/qixin-brain"><span className="text-caption text-text-meta">{ye.ui.previous}</span><span className="text-h4 font-normal">{ye.ui.previousTitle}</span></a><a href="#ai"><span className="text-caption text-text-meta">{ye.ui.next}</span><span className="text-h4 font-normal">{ye.ui.nextTitle}</span></a></nav>
    </div>
  </CaseLayout>;
}
