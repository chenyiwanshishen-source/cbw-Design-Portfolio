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
      case 'problem-cards': return <div key={key} className="case-prompt-problems">{block.items.map(item => <article key={item.label}><h3 className="text-h4 font-medium">{item.label}</h3><p className="text-body text-text-body">{item.text}</p></article>)}</div>;
      case 'source-evidence': return <SourceEvidence key={key} />;
      case 'report-edit-carousel': return <ReportEditCarousel key={key} />;
      case 'outline-devices': return <OutlineDevices key={key} />;
      case 'trial-feedback': return <figure key={key} className="case-trial-feedback"><div className="case-trial-panels">{block.groups.map((group, i) => <section key={group.title} className={`case-trial-panel case-trial-panel-${i}`}><h4>{group.title}</h4><ul>{group.items.map(item => <li key={item.product + item.text}><span className="case-trial-product">{item.product.split('、').map(product => <span className="case-trial-brand" key={product}>{product === '豆包' || product === '天工' || product === 'Jenni' ? <img src={`${import.meta.env.BASE_URL}images/qsight/brands/${product === '豆包' ? 'doubao.webp' : product === '天工' ? 'tiangong.webp' : 'jenni.svg'}`} alt="" /> : null}{product}</span>)}</span><span>{item.text}</span></li>)}</ul></section>)}</div></figure>;
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
      case 'paragraph': return <div key={key} className="case-prose">{block.text.split(/\n+/).map((text, i) => <p key={i} className="case-paragraph"><CaseText text={text} />{block.highlight && i === block.text.split(/\n+/).length - 1 && <> <mark className="case-marker"><CaseText text={block.highlight} /></mark></>}</p>)}</div>;
      case 'aside': return <p key={key} className="case-paragraph border-t border-dashed border-border-dashed pt-6"><CaseText text={block.text} /></p>;
      case 'subsection': { const Heading = depth === 0 ? 'h3' : 'h4'; return <div key={key} className={`case-subsection${block.plain ? " case-subsection-plain" : ""}${block.prominent ? " case-subsection-prominent" : ""}`}><Heading className={depth === 0 ? "text-h4 font-medium" : "text-body font-medium"}><CaseText text={block.title} /></Heading><CaseBlocks blocks={block.blocks} labels={labels} depth={depth + 1} /></div>; }
      case 'quotes': return <div key={key} className="case-quotes">{block.texts.map(text => <Quote key={text} text={text} />)}</div>;
      case 'figures': return <div key={key} className={block.figures.length > 1 ? 'case-pair' : undefined}>{block.figures.map(figure => <FigurePlaceholder key={figure.plate} {...figure} />)}{block.arrow && <svg className="case-pair-arrow" viewBox="0 0 200 200" fill="none" aria-hidden="true"><path d="M10 185 C8 164 68 146 82 169 C102 201 54 191 65 159 C85 101 114 49 181 24 M143 16 Q163 20 188 24 Q178 39 160 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}</div>;
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
