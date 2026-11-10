import { useRef, type ReactNode } from 'react';
import { useCaseReveal } from './useCaseReveal';
import '../case-loading.css';
import '../case.css';
export function CaseLayout({ children, backLabel, footer }: { children: ReactNode; backLabel: string; footer: ReactNode }) {
  const page = useRef<HTMLElement>(null);
  useCaseReveal(page);
  return <article ref={page} className="case-page"><div className="case-sheet mx-auto w-full max-w-content"><div className="case-back-bar"><a className="case-back text-caption" href="#">{backLabel}</a></div>{children}<footer className="case-footer">{footer}</footer></div></article>;
}
