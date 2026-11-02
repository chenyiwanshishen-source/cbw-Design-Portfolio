import type { ReactNode } from 'react';
export function CaseSection({ id, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return <section id={id} className="case-section" aria-labelledby={`${id}-title`} tabIndex={-1}><h2 id={`${id}-title`} className="text-h2 font-normal text-balance">{title}</h2>{children}</section>;
}
