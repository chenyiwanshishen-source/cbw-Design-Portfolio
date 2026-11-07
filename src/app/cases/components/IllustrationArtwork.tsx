import { useEffect, useId, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const sources = new Map<string, Promise<string>>();

export function IllustrationArtwork({ src, alt }: { src: string; alt: string }) {
  const root = useRef<HTMLDivElement>(null);
  const prefix = useId().replace(/:/g, '');
  const [markup, setMarkup] = useState('');
  useEffect(() => {
    let active = true;
    if (!sources.has(src)) sources.set(src, fetch(src).then(response => {
      if (!response.ok) throw new Error('Illustration could not load');
      return response.text();
    }));
    sources.get(src)!.then(svg => {
      if (active) setMarkup(svg.replace(/id="([^"]+)"/g, `id="${prefix}-$1"`).replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`));
    }).catch(() => { if (active) setMarkup(''); });
    return () => { active = false; };
  }, [src, prefix]);
  useGSAP(() => {
    const element = root.current;
    if (!element || !markup || !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const svg = element.querySelector('svg');
    if (!svg) return;
    const libraryLayers = Array.from(svg.querySelectorAll<SVGGraphicsElement>('[class^="art-"]')).filter(layer => !layer.classList.contains('art-ambientBackGlow'));
    let layers = libraryLayers.length ? libraryLayers : Array.from(svg.querySelectorAll<SVGGraphicsElement>('[data-motion-layer], [data-motion-part]'));
    if (!layers.length) layers = Array.from(svg.children).filter(child => child.tagName.toLowerCase() === 'g') as SVGGraphicsElement[];
    // Keep nested foreground objects independent instead of moving only their parent.
    if (src.includes('/ye-bookmark-empty')) {
      const floatingFolder = svg.querySelector<SVGGraphicsElement>('g > g[transform^="rotate"]');
      if (floatingFolder && !layers.includes(floatingFolder)) layers.push(floatingFolder);
    }
    const wrappers = layers.map(layer => {
      const wrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      layer.parentNode!.insertBefore(wrapper, layer);
      wrapper.appendChild(layer);
      return wrapper;
    });
    const unit = svg.viewBox.baseVal.width / 230;
    const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
    wrappers.forEach((wrapper, index) => {
      const layer = layers[index];
      const isBack = /BackPlate/.test(layer.getAttribute('class') || '') || (src.includes('/figma-empty-') && index === 0);
      const part = layer.hasAttribute('data-motion-part');
      const pattern = [
        { x: -2, y: -2, rotation: -.4 },
        { x: 3, y: -5, rotation: .7 },
        { x: -3, y: 2, rotation: -.6 },
        { x: 2, y: -7, rotation: .8 },
        { x: -4, y: -4, rotation: -.8 },
      ][index % 5];
      const factor = isBack ? .35 : part ? .55 : 1;
      timeline.to(wrapper, {
        x: Number(layer.dataset.artX ?? pattern.x * factor) * unit,
        y: Number(layer.dataset.artY ?? pattern.y * factor) * unit,
        rotation: layer.hasAttribute('data-art-x') ? 0 : pattern.rotation * factor,
        transformOrigin: '50% 50%',
        duration: .42 + index % 3 * .08,
      }, index % 5 * .045);
    });
    const enter = () => timeline.timeScale(1).play();
    const leave = () => timeline.timeScale(1.4).reverse();
    element.addEventListener('pointerenter', enter);
    element.addEventListener('pointerleave', leave);
    element.addEventListener('pointercancel', leave);
    return () => {
      element.removeEventListener('pointerenter', enter);
      element.removeEventListener('pointerleave', leave);
      element.removeEventListener('pointercancel', leave);
      timeline.revert();
      wrappers.forEach(wrapper => wrapper.replaceWith(...Array.from(wrapper.childNodes)));
    };
  }, { scope: root, dependencies: [markup], revertOnUpdate: true });
  return <div ref={root} className={`illustration-artwork${src.includes('/ye-') ? ' illustration-artwork-ye' : ''}`} data-art={src.split('/').pop()?.replace('.svg', '')} role="img" aria-label={alt}>{markup ? <div aria-hidden="true" dangerouslySetInnerHTML={{ __html: markup }} /> : <img src={src} alt="" />}</div>;
}
