import { CaseText } from './TodoNote';
export function MetricRow({ items, note }: { items: { label: string; text: string }[]; note: string }) {
  return <div><dl className="case-metrics">{items.map(item => <div key={item.label}><dt className="text-caption text-text-secondary">{item.label}</dt><dd className="text-h4 font-medium tabular-nums"><CaseText text={item.text} /></dd></div>)}</dl>{note && <p className="mt-6 text-caption text-text-secondary"><CaseText text={note} /></p>}</div>;
}
