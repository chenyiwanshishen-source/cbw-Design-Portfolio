import type { ReactNode } from 'react';
import '../case.css';
export function CaseLayout({ children, backLabel, footer }: { children: ReactNode; backLabel: string; footer: ReactNode }) {
  return <article className="case-page"><div className="case-sheet mx-auto w-full max-w-content"><a className="case-back text-caption" href="#">{backLabel}</a>{children}<footer className="case-footer">{footer}</footer></div></article>;
}
