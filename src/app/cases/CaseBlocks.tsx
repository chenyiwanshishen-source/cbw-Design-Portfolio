import { QixinAnnotation } from './components/QixinAnnotation';
import { ChainEntryComparison } from './components/ChainEntryComparison';
import { ChainOutcome } from './components/ChainOutcome';
import { ChainResponsibility } from './components/ChainResponsibility';
import { ChainUserResearch } from './components/ChainUserResearch';
import { ChainDiscussion } from './components/ChainDiscussion';
import { ChainStageFramework } from './components/ChainStageFramework';
import { ProductMap } from './components/ProductMap';
import { LaunchOutcomes } from './components/LaunchOutcomes';
import { PromptResults } from './components/PromptResults';
import { PromptGenerator } from './components/PromptGenerator';
import { PromptStructure } from './components/PromptStructure';
import { SourceEvidence } from './components/SourceEvidence';
import { ReportEditCarousel } from './components/ReportEditCarousel';
import { ResponsiveTemplate } from './components/ResponsiveTemplate';
import { OutlineDevices } from './components/OutlineDevices';
import { TestFeedbackBubbles } from './components/TestFeedbackBubbles';
import { UserFlow } from './components/UserFlow';
import { MvpComparison } from './components/MvpComparison';
import { QuestionBankLink, OutlinePaper } from './components/QuestionBank';
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
      case 'workbench-panels': return <figure key={key} className="workbench-panels" aria-label="首页工作台的地区概览、企业监控与异动预警"><div className="workbench-overview-panel"><img src={`${import.meta.env.BASE_URL}images/qixin/workbench-overview.webp`} alt="地区概览：企业数量、企业类型与本年新增注销对比" width={1680} height={736} loading="lazy" /><QixinAnnotation name="overview" /></div><div className="workbench-status-panel"><img src={`${import.meta.env.BASE_URL}images/qixin/workbench-monitor.webp`} alt="企业监控数据" width={688} height={620} loading="lazy" /><img src={`${import.meta.env.BASE_URL}images/qixin/workbench-risk.webp`} alt="异动预警和风险分布" width={688} height={472} loading="lazy" /><QixinAnnotation name="monitor" /></div></figure>;
      case 'feedback-cards': return <div key={key} className="workbench-feedback-section"><div className="workbench-feedback" aria-label="用户反馈整理">{block.items.map((item, i) => <article key={item.title}><img className="workbench-feedback-avatar" src={`${import.meta.env.BASE_URL}images/qixin/avatars/feedback-${i + 1}.webp`} alt="" width={48} height={48} loading="lazy" /><div><h4>{item.title}</h4><p>{item.text}</p></div></article>)}</div><div className="workbench-feedback-rate"><div><p>反馈好评率</p><strong>90<span>%+</span></strong><p>超过九成反馈为好评</p></div><div className="workbench-feedback-rate-chart" role="img" aria-label="反馈好评超过90%，绿色竖条为比例示意"><div className="workbench-feedback-track" aria-hidden="true"><span className="workbench-feedback-fill" /></div></div></div></div>;
      case 'workbench-details': return <figure key={key} className="workbench-details" aria-label="重点企业与产业热力卡展示"><div><img src={`${import.meta.env.BASE_URL}images/qixin/workbench-key-enterprises.webp`} width={688} height={648} alt="重点企业的行政处罚、风险与融资变化" loading="lazy" /></div><div><img src={`${import.meta.env.BASE_URL}images/qixin/workbench-detail-left.webp`} width={688} height={1304} alt="人工智能、光伏、无人机与汽车产业的优势环节覆盖度" loading="lazy" /></div></figure>;
      case 'workbench-functions': return <figure key={key} className="workbench-functions-plate" aria-label="报告入口、常用功能、企业榜单与快讯速递"><div className="workbench-functions-stack">{[{ file: 'reports', alt: '企业和产业分析报告入口', width: 1680, height: 224 }, { file: 'shortcuts', alt: '常用功能与企业榜单', width: 1680, height: 416 }, { file: 'news', alt: '快讯速递与融资速递', width: 1680, height: 1510 }].map(item => <img key={item.file} src={`${import.meta.env.BASE_URL}images/qixin/workbench-${item.file}.webp`} alt={item.alt} width={item.width} height={item.height} loading="lazy" />)}</div><QixinAnnotation name="functions" /></figure>;
      case 'chain-outcome': return <ChainOutcome key={key} />;
      case 'heading': return <h3 key={key} className={`${block.prominent ? 'text-h4' : 'case-detail-heading'} font-medium`}>{block.text}</h3>;
      case 'workbench-laptop': return <figure key={key} className="workbench-laptop-plate" aria-label="笔记本电脑中的首页工作台"><div className="workbench-laptop"><div className="workbench-laptop-lid"><span className="workbench-laptop-camera" aria-hidden="true" /><div className="workbench-laptop-screen" tabIndex={0} aria-label="首页工作台截图，可向下滚动查看完整页面"><img src={`${import.meta.env.BASE_URL}images/qixin/home-workbench.webp`} width={2880} height={2564} alt="启信产业大脑首页工作台，包括招商搜索、报告入口、地区概览、常用功能与企业动态" loading="lazy" /></div></div><div className="workbench-laptop-base" aria-hidden="true"><span /></div></div></figure>;
      case 'chain-hierarchy': return <figure key={key} className="chain-hierarchy-plate" aria-label="层级管理的两种操作展示">{[1, 2].map(i => <div key={i}><img src={`${import.meta.env.BASE_URL}images/qixin/chain-hierarchy-${i}.webp`} alt={i === 1 ? '在图谱中拖动产业环节调整层级' : '在左侧层级菜单中拖动调整产业环节'} width={1440} height={900} loading="lazy" /></div>)}<QixinAnnotation name="hierarchy" /></figure>;
      case 'chain-entry-comparison': return <ChainEntryComparison key={key} />;
      case 'chain-responsibility': return <ChainResponsibility key={key} />;
      case 'chain-user-research': return <ChainUserResearch key={key} />;
      case 'chain-discussion': return <ChainDiscussion key={key} />;
      case 'chain-stage-framework': return <ChainStageFramework key={key} />;
      case 'product-map': return <ProductMap key={key} />;
      case 'problem-cards': return <div key={key} className="case-prompt-problems">{block.items.map(item => <article key={item.label}><h3 className="text-h4 font-medium">{item.label}</h3><p className="text-body text-text-body">{item.text}</p></article>)}</div>;
      case 'prompt-generator': return <PromptGenerator key={key} />;
      case 'prompt-structure': return <PromptStructure key={key} />;
      case 'source-evidence': return <SourceEvidence key={key} />;
      case 'report-edit-carousel': return <div key={key}><ReportEditCarousel slides={block.slides} imageFolder={block.imageFolder} label={block.label} />{block.caption && <p className="text-caption text-text-secondary" style={{ textAlign: 'center', margin: 'var(--space-3) 0 0' }}>{block.caption}</p>}</div>;
      case 'outline-devices': return <OutlineDevices key={key} />;
      case 'trial-feedback': return <figure key={key} className="case-trial-feedback"><div className="case-trial-panels">{block.groups.map((group, i) => <section key={group.title} className={`case-trial-panel case-trial-panel-${i}`}><h4>{group.title}</h4><ul>{group.items.map(item => <li key={item.product + item.text}><span className="case-trial-product">{item.icon && <span className="case-trial-icon" style={{ maskImage: `url(${import.meta.env.BASE_URL}images/icons/hugeicons/${item.icon}.svg)` }} aria-hidden="true" />}{item.product.split('、').map(product => <span className="case-trial-brand" key={product}>{product === '豆包' || product === '天工' || product === 'Jenni' ? <img src={`${import.meta.env.BASE_URL}images/qsight/brands/${product === '豆包' ? 'doubao.webp' : product === '天工' ? 'tiangong.webp' : 'jenni.svg'}`} alt="" /> : null}{product}</span>)}</span><span>{item.text}</span></li>)}</ul></section>)}</div></figure>;
      case 'test-feedback-bubbles': return <TestFeedbackBubbles key={key} />;
      case 'responsive-template': return <ResponsiveTemplate key={key} title={block.title} desktopSrc={block.desktopSrc} mobileSrc={block.mobileSrc} mobileAlign={block.mobileAlign} />;
      case 'mvp-comparison': return <MvpComparison key={key} />;
      case 'user-flow': return <UserFlow key={key} />;
      case 'research-topics': return <ul key={key} className="case-research-topics" aria-label="第一轮访谈的八个主题">{block.texts.map(text => <li key={text}><button type="button" className="research-topic-entry" aria-label={text}><span className="research-topic-paper"><span>{text}</span><span className="research-topic-paper-lines" aria-hidden="true" /></span></button></li>)}</ul>;
      case 'research-quadrants': return <div key={key} className="case-research-quadrants" role="group" aria-label="访谈问题的四类归纳"><svg viewBox="0 0 800 360" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="currentColor" strokeLinecap="round"><path d="M399 12 C395 108 405 244 400 348 M18 180 C241 176 551 185 782 179" strokeWidth="1.6" /><path d="M402 14 C404 132 396 251 403 346 M20 183 C266 181 554 177 780 182" strokeWidth="0.8" opacity=".45" /></g></svg>{[
        { title: '上游支持', tags: ['报告用途与读者', '任务范围与口径', '交付要求', '对接与审核人', '材料使用权限'] },
        { title: '软件可支持', tags: ['资料集中管理', '文件提取整理', '材料关联章节', '引用追溯', '旧报告复用', '在线查看与批注'] },
        { title: '待验证的问题', tags: ['模板复用范围', '材料更新提醒', '大纲调整与正文联动', 'AI 辅助效果', '审核与版本规则'] },
        { title: '需人工判断', tags: ['统计口径取舍', '缺失数据处理', '结论是否有依据', '报告是否可交付'] }
      ].map(({ title, tags }) => <div className="case-research-quadrant" key={title}><h4 className="text-body font-medium">{title}</h4><ul className="case-research-tags">{tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>)}</div>;
      case 'goal-notes': return <Fragment key={key}><div className="case-goal-notes">{block.texts.map(text => { const [title, ...paragraphs] = text.split('\n\n'); return <div key={title} className="case-goal-note"><h3 className="text-body font-medium">{title}</h3>{paragraphs.map(p => <p key={p} className="text-caption">{p}</p>)}</div>; })}</div><div className="case-research-resources"><h3 className="case-research-resources-title text-h4">准备题库和大纲</h3><QuestionBankLink /><OutlinePaper><h3 className="text-h4">访谈大纲</h3><p className="text-caption">第一轮访谈</p><div className="case-outline-paper-section"><strong>最近一次报告任务</strong><p>最近完成的是哪份报告？为什么做、给谁看、什么时候交？</p></div><div className="case-outline-paper-section"><strong>参与和交接</strong><p>最初要求是什么？范围谁定？三位用户和科长怎样参与、交接？</p></div><div className="case-outline-paper-section"><strong>工作方式</strong><p>材料从哪来？大纲怎么定？正文怎么写？如何修改、审核和保存？</p></div></OutlinePaper></div></Fragment>;
      case 'flow': case 'layers': case 'chat': case 'statement': return <StoryDiagram key={key} block={block} />;
      case 'paragraph': return <div key={key} className="case-prose">{block.text.split(/\n+/).map((text, i) => <p key={i} className="case-paragraph"><CaseText text={text} highlightPhrases={block.highlightPhrases} />{block.highlight && i === block.text.split(/\n+/).length - 1 && <> <mark className="case-marker"><CaseText text={block.highlight} /></mark></>}</p>)}</div>;
      case 'aside': return <p key={key} className="case-paragraph border-t border-dashed border-border-dashed pt-6"><CaseText text={block.text} /></p>;
      case 'subsection': { const Heading = depth === 0 ? 'h3' : 'h4'; return <div key={key} className={`case-subsection${block.plain ? " case-subsection-plain" : ""}${block.prominent ? " case-subsection-prominent" : ""}`}><Heading className={depth === 0 ? "text-h4 font-medium" : "text-body font-medium"}><CaseText text={block.title} /></Heading><CaseBlocks blocks={block.blocks} labels={labels} depth={depth + 1} /></div>; }
      case 'quotes': return <div key={key} className="case-quotes">{block.texts.map(text => <Quote key={text} text={text} />)}</div>;
      case 'figures': return <div key={key} className={block.figures.length > 1 ? 'case-pair' : undefined}>{block.figures.map(figure => <FigurePlaceholder key={figure.plate} {...figure} />)}{block.arrow && <svg className="case-pair-arrow" viewBox="0 0 200 200" fill="none" aria-hidden="true"><path d="M10 185 C8 164 68 146 82 169 C102 201 54 191 65 159 C85 101 114 49 181 24 M143 16 Q163 20 188 24 Q178 39 160 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}</div>;
      case 'launch-outcomes': return <LaunchOutcomes key={key} {...block} />;
      case 'prompt-results': return <PromptResults key={key} />;
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
