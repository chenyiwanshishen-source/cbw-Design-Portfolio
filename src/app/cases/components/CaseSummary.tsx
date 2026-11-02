import { CaseText } from './TodoNote';
export function CaseSummary({ items, hideLabels = false }: { items: { label: string; text: string }[]; hideLabels?: boolean }) {
  return <dl className={`case-summary${hideLabels ? " case-summary-unlabelled" : ""}`}>{items.map(item => <div key={item.label}><dt className={hideLabels ? "sr-only" : "text-caption text-accent"}>{item.label}</dt><dd className="text-body text-text-body"><CaseText text={item.text} /></dd></div>)}</dl>;
}
