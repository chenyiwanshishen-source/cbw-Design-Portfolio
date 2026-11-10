import './qsight-summary.css';
import { QsightOverview } from './components/QsightOverview';
import { CaseOpening } from './components/CaseOpening';
import { useEffect } from 'react';
import { qsight } from './content/qsight';
import { CaseLayout } from './components/CaseLayout';
import { CaseHeader } from './components/CaseHeader';
import { CaseToc } from './components/CaseToc';
import { CaseSection } from './components/CaseSection';
import { CaseBlocks } from './CaseBlocks';
export function QsightCase() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return <CaseLayout backLabel={qsight.ui.back} footer={<span className="text-caption text-text-meta">{qsight.ui.footer}</span>}>
    <QsightOverview hero />
    <CaseHeader content={qsight.header} compact />
      <CaseOpening content={qsight} />
    <div className="case-body"><CaseToc items={qsight.toc} label={qsight.ui.toc} /><div className="case-chapters">{qsight.chapters.map(chapter => <CaseSection key={chapter.id} id={chapter.id} label={chapter.label} title={chapter.title}>{chapter.id === 'qsight-06' ? <div className="case-prose"><p className="case-paragraph">{chapter.blocks[0].kind === 'paragraph' ? chapter.blocks[0].text : null}</p><ul className="qsight-summary-points">{chapter.blocks.slice(1).map((block, index) => block.kind === 'paragraph' ? <li key={index}>{block.text}</li> : null)}</ul></div> : <CaseBlocks blocks={chapter.blocks} labels={qsight.ui} />}</CaseSection>)}</div></div>
    <nav className="case-switch"><a href="#" className="text-body">{qsight.ui.back}</a><a href="#/project/qixin-brain"><span className="text-caption text-text-meta">{qsight.ui.next}</span><span className="text-h4 font-normal">{qsight.ui.nextTitle}</span></a></nav>
  </CaseLayout>;
}
