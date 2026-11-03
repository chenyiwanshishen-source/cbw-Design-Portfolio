import { CaseText } from './TodoNote';
export type FigureContent = { plate: string; title: string; instruction: string; caption: string; ratio?: string };
export function FigurePlaceholder({ plate, title, instruction, caption, ratio = '16 / 10' }: FigureContent) {
  return <figure className="case-figure"><div className="case-figure-box" style={{ aspectRatio: ratio }} aria-hidden="true"><span className="text-caption text-text-meta">{plate} · {title}</span><span className="text-caption text-text-secondary"><CaseText text={instruction} /></span></div><figcaption className="text-caption text-text-secondary"><CaseText text={caption} /></figcaption></figure>;
}
