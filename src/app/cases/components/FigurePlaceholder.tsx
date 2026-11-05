import { QixinAnnotation } from './QixinAnnotation';
import { CaseText } from './TodoNote';
export type FigureContent = { plate: string; title: string; instruction: string; caption: string; ratio?: string; src?: string; alt?: string; width?: number; height?: number; framed?: boolean };
export function FigurePlaceholder({ plate, title, instruction, caption, ratio = '16 / 10', src, alt, width, height, framed }: FigureContent) {
  if (src) {
    const url = `${import.meta.env.BASE_URL}${src}`;
    return <figure className={`case-figure${framed ? " case-figure-framed" : ""}`}><div className="case-figure-media"><img src={url} alt={alt || title} width={width} height={height} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto' }} /><QixinAnnotation name={src.split('/').pop() || ''} /></div><figcaption className="text-caption text-text-secondary"><CaseText text={caption} /></figcaption></figure>;
  }
  return <figure className="case-figure"><div className="case-figure-box" style={{ aspectRatio: ratio }} aria-hidden="true"><span className="text-caption text-text-meta">{plate} · {title}</span><span className="text-caption text-text-secondary"><CaseText text={instruction} /></span></div><figcaption className="text-caption text-text-secondary"><CaseText text={caption} /></figcaption></figure>;
}
