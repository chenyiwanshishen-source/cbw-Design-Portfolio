import { CaseText } from './TodoNote';
export type HeaderContent = { label: string; title: string; intro: string; facts: { label: string; text: string }[] };
export function CaseHeader({ content, compact = false }: { content: HeaderContent; compact?: boolean }) {
  return <header className={`case-header${compact ? " case-header-compact" : ""}`}><div className="case-header-main"><p className="text-caption text-text-meta">{content.label}</p><h1>{content.title}</h1><p className="text-body-lg text-text-body"><CaseText text={content.intro} /></p></div><dl className="case-facts">{content.facts.map(fact => <div key={fact.label}><dt className="text-caption text-text-meta">{fact.label}</dt><dd className="text-body"><CaseText text={fact.text} /></dd></div>)}</dl></header>;
}
