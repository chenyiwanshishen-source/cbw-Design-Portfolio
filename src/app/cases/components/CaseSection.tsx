import { ReadingText } from './ReadingText';
import type { ReactNode } from 'react';
export function CaseSection({ id, title, children, headingLevel = 2 }: { id: string; label: string; title: string; children: ReactNode; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  return <section id={id} className={headingLevel === 3 ? "case-subsection" : "case-section"} aria-labelledby={`${id}-title`} tabIndex={-1}><Heading id={`${id}-title`} className={headingLevel === 3 ? "text-h4 font-medium" : "text-h2 font-normal"}><ReadingText text={title} /></Heading>{children}</section>;
}
