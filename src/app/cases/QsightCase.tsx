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
    <figure className="case-figure">
      <a href={`${import.meta.env.BASE_URL}images/qsight/mvp-key-screens.png`} target="_blank" rel="noreferrer" aria-label="打开 Qsight 第一版 MVP 展示原图">
        <img src={`${import.meta.env.BASE_URL}images/qsight/mvp-key-screens.png`} width={1568} height={1242} alt="Qsight 第一版 MVP 的四个页面：确定报告条件、确认报告大纲、勾选数据来源、查看带引用编号的生成报告。" style={{ display: 'block', width: '100%', height: 'auto' }} fetchPriority="high" />
      </a>
      <figcaption className="text-caption text-text-secondary">第一版 MVP：报告条件、大纲确认、资料选择与报告生成。点击查看原图。</figcaption>
    </figure>
    <CaseHeader content={qsight.header} compact />
      <CaseOpening content={qsight} />
    <div className="case-body"><CaseToc items={qsight.toc} label={qsight.ui.toc} /><div className="case-chapters">{qsight.chapters.map(chapter => <CaseSection key={chapter.id} id={chapter.id} label={chapter.label} title={chapter.title}><CaseBlocks blocks={chapter.blocks} labels={qsight.ui} /></CaseSection>)}</div></div>
    <nav className="case-switch"><a href="#" className="text-body">{qsight.ui.back}</a><a href="#/project/qixin-brain"><span className="text-caption text-text-meta">{qsight.ui.next}</span><span className="text-h4 font-normal">{qsight.ui.nextTitle}</span></a></nav>
  </CaseLayout>;
}
