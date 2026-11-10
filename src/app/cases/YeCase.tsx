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
        <CaseSection id="ye-07" label="反思" title="反思">{renderBlocks('ye-07')}</CaseSection>    <section className="case-subsection" aria-labelledby="ye-architecture-title">
      <h3 id="ye-architecture-title">架构定义</h3>
      <div className="case-prose"><p className="case-paragraph">最初，我只想做一个简单的整理工具，没有加入对话机制，主要像 LangGraph 工作流那样，按预设路由执行任务。开发后发现，按固定的分类规则整理，结果总是不符合我的预期。重构时，我尝试了三层结构，先在外层识别意图，再交给内层执行。但用户没说清楚时，外层也容易理解错，内层便跟着执行错。层间的状态传递也没有设计好，内层仍在机械匹配外层给出的关键词，实际还是靠路由分流。继续做下去，就得维护越来越大的关键词库，这偏离了我的初衷。第三次重构时，我参考 Pi 的 harness 构建方案，去掉独立的意图识别层，由插件把真实上下文和工具注册表交给 AI，让 AI 直接理解任务、选择工具。</p></div>
    </section>
</div></div>
      <nav className="case-switch"><a href="#/project/qixin-brain"><span className="text-caption text-text-meta">{ye.ui.previous}</span><span className="text-h4 font-normal">{ye.ui.previousTitle}</span></a><a href="#ai"><span className="text-caption text-text-meta">{ye.ui.next}</span><span className="text-h4 font-normal">{ye.ui.nextTitle}</span></a></nav>
    </div>
  </CaseLayout>;
}
