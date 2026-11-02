import { CaseText } from './TodoNote';
export function DataTable({ headers, rows, highlighted = [], legend, label }: { headers: string[]; rows: string[][]; highlighted?: number[]; legend?: string; label: string }) {
  return <div>{legend && <p className="text-caption text-text-secondary text-right mb-3">{legend}</p>}<div className="case-table-scroll" tabIndex={0} role="region" aria-label={label}><table className="case-table"><caption className="sr-only">{label}</caption><thead><tr>{headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i} className={highlighted.includes(i) ? 'bg-accent-soft' : undefined}>{row.map((cell, j) => <td key={j}><CaseText text={cell} /></td>)}</tr>)}</tbody></table></div></div>;
}
