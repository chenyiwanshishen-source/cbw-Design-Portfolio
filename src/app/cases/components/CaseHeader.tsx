import { CaseText } from './TodoNote';
export type HeaderContent = { label: string; title: string; intro: string; facts: { label: string; text: string }[] };
export function CaseHeader({ content }: { content: HeaderContent }) {
  return <header className="case-header"><div className="case-header-main"><p className="font-mono text-label text-text-meta">{content.label}</p><h1>{content.title}</h1><p className="text-body-lg text-text-body"><CaseText text={content.intro} /></p></div><dl className="case-facts">{content.facts.map(fact => <div key={fact.label}><dt className="font-mono text-label text-text-meta">{fact.label}</dt><dd className="text-body"><CaseText text={fact.text} /></dd></div>)}</dl></header>;
}
