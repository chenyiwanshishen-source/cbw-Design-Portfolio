import { CaseOpening } from './components/CaseOpening';
import { useEffect } from 'react';
import { ye } from './content/ye';
import { CaseLayout } from './components/CaseLayout';
import { CaseHeader } from './components/CaseHeader';
import { CaseToc } from './components/CaseToc';
import { CaseSection } from './components/CaseSection';
import { FigurePlaceholder } from './components/FigurePlaceholder';
import { CaseBlocks } from './CaseBlocks';
import './ye.css';

export function YeCase() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return <CaseLayout backLabel={ye.ui.back} footer={<span className="text-caption text-text-meta">{ye.ui.footer}</span>}>
    <div className="ye-case">
      <FigurePlaceholder {...ye.hero} />
      <CaseHeader content={ye.header} compact />
      <CaseOpening content={ye} />
      <div className="case-body"><CaseToc items={ye.toc} label={ye.ui.toc} /><div className="case-chapters">{ye.chapters.map(chapter => <CaseSection key={chapter.id} id={chapter.id} label={chapter.label} title={chapter.title}><CaseBlocks blocks={chapter.blocks} labels={ye.ui} /></CaseSection>)}</div></div>
      <nav className="case-switch"><a href="#/project/qixin-brain"><span className="text-caption text-text-meta">{ye.ui.previous}</span><span className="text-h4 font-normal">{ye.ui.previousTitle}</span></a><a href="#ai"><span className="text-caption text-text-meta">{ye.ui.next}</span><span className="text-h4 font-normal">{ye.ui.nextTitle}</span></a></nav>
    </div>
  </CaseLayout>;
}
