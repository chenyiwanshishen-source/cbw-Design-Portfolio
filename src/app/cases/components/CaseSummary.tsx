import { CaseText } from './TodoNote';
export function CaseSummary({ items }: { items: { label: string; text: string }[] }) {
  return <dl className="case-summary">{items.map(item => <div key={item.label}><dt className="font-mono text-label text-accent">{item.label}</dt><dd className="text-body text-text-body"><CaseText text={item.text} /></dd></div>)}</dl>;
}
