import { Github } from 'lucide-react';
import { CaseText } from './TodoNote';
export type HeaderContent = { label?: string; title: string; intro: string; introEmphasis?: string[]; repoUrl?: string; factsStyle?: 'pills'; facts?: { label: string; text: string; tags?: string[]; tools?: { name: string; icon: 'figma' | 'ai-studio' | 'codex' | 'gemini' | 'claude' }[] }[] };
export function CaseHeader({ content, compact = false }: { content: HeaderContent; compact?: boolean }) {
  return <header className={`case-header${compact ? ' case-header-compact' : ''}`}>
    <div className="case-header-main">{content.label && <p className="text-caption text-text-meta">{content.label}</p>}<h1><CaseText text={content.title} /></h1><p className="text-body-lg text-text-body">{content.intro.split(new RegExp(`(${(content.introEmphasis ?? []).join("|") || "(?!)"})`, "g")).map((part, index) => content.introEmphasis?.includes(part) ? <strong key={index} className="case-intro-emphasis"><CaseText text={part} /></strong> : <CaseText key={index} text={part} />)}</p>{content.repoUrl ? <a href={content.repoUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[17px] font-medium text-[#2258F4] transition-colors hover:text-[#1A42B8] sm:text-[18px]">
      <Github className="size-[22px] shrink-0 fill-current stroke-[1.8]" aria-hidden="true" />
      <span className="border-b border-current pb-[2px]">查看 GitHub 仓库 ↗</span>
    </a> : null}</div>
    {content.facts?.length ? <dl className={`case-facts${content.factsStyle === 'pills' ? ' case-facts-pills' : ''}`}>{content.facts.map((fact, index) => <div key={`${fact.label}-${index}`}>
      <dt className="text-caption text-text-meta">{fact.label}</dt>
      <dd className="text-body">{fact.tools ? fact.tools.map(tool => <span className="case-fact-tool" key={tool.name} tabIndex={0} aria-label={tool.name}>
        <img src={`${import.meta.env.BASE_URL}images/qsight/brands/${tool.icon === 'figma' ? 'figma.svg' : tool.icon === 'codex' ? 'codex-color.svg' : tool.icon === 'gemini' ? 'gemini-color.svg' : tool.icon === 'claude' ? 'claude-color.svg' : 'google-ai-studio.webp'}`} alt="" /><span className="case-fact-tool-name">{tool.name}</span>
      </span>) : fact.tags ? fact.tags.map(tag => <span className="case-fact-pill" key={tag}>{tag}</span>) : <CaseText text={fact.text} />}</dd>
    </div>)}</dl> : null}
  </header>;
}
