import { IllustrationArtwork } from './IllustrationArtwork';
import { QixinAnnotation } from './QixinAnnotation';
import { CaseText } from './TodoNote';
export type FigureContent = { plate: string; title: string; instruction: string; caption: string; ratio?: string; src?: string; alt?: string; width?: number; height?: number; framed?: boolean; overlay?: { src: string; alt: string; width: number; height: number } };
export function FigurePlaceholder({ plate, title, instruction, caption, ratio = '16 / 10', src, alt, width, height, framed, overlay }: FigureContent) {
  if (src === 'images/explorations/figma-bridge-panel.webp') {
    return <figure className="case-figure"><div className="bridge-state-gallery">
      {([['connected', '已连接 · 多个文件']] as const).map(([state, label]) => <div key={state} className="bridge-state-item"><iframe src={`${import.meta.env.BASE_URL}demos/figma-bridge-states/${state}.html?v=20261110-center`} title={`Figma 桥接器：${label}`} sandbox="" loading="lazy" /></div>)}
    </div></figure>;
  }
  if (src) {
    const url = `${import.meta.env.BASE_URL}${src}`;
    return <figure className={`case-figure${framed ? " case-figure-framed" : ""}`}><div className="case-figure-media">{(src.startsWith('images/illustration-skill/') && src.endsWith('.svg')) ? <IllustrationArtwork src={url} alt={alt || title} /> : <img src={url} alt={alt || title} width={width} height={height} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto' }} />}{overlay && <img className="case-figure-overlay" src={`${import.meta.env.BASE_URL}${overlay.src}`} alt={overlay.alt} width={overlay.width} height={overlay.height} loading="lazy" />}<QixinAnnotation name={src.split('/').pop() || ''} /></div>{caption && <figcaption className="text-caption text-text-secondary"><CaseText text={caption} /></figcaption>}</figure>;
  }
  return <figure className="case-figure"><div className="case-figure-box" style={{ aspectRatio: ratio }} aria-hidden="true"><span className="text-caption text-text-meta">{plate} · {title}</span><span className="text-caption text-text-secondary"><CaseText text={instruction} /></span></div>{caption && <figcaption className="text-caption text-text-secondary"><CaseText text={caption} /></figcaption>}</figure>;
}
