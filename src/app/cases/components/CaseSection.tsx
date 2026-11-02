import type { ReactNode } from 'react';
export function CaseSection({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return <section id={id} className="case-section" aria-labelledby={`${id}-title`} tabIndex={-1}><p className="font-mono text-label text-accent">{label}</p><h2 id={`${id}-title`} className="text-h2 font-normal text-balance">{title}</h2>{children}</section>;
}
