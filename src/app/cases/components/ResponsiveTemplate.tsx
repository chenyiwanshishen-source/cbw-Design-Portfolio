import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
type Device = 'desktop' | 'mobile';
const devices: Device[] = ['desktop', 'mobile'];

export function ResponsiveTemplate({ title = '模板中心', desktopSrc = 'images/qsight/template-center-desktop.webp', mobileSrc = 'images/qsight/template-center-mobile.webp', mobileAlign = 'top' }: { title?: string; desktopSrc?: string; mobileSrc?: string; mobileAlign?: 'top' | 'bottom' }) {
  const [mode, setMode] = useState<Device>('desktop');
  const root = useRef<HTMLElement>(null);
  const previous = useRef<Device>('desktop');
  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const layers = devices.map(device => el.querySelector(`[data-device="${device}"]`));
    const next = mode === 'mobile' ? 1 : 0;
    const indicator = el.querySelector('.template-preview-indicator');
    const buttons = el.querySelectorAll<HTMLButtonElement>('.template-preview-switch button');
    const offset = buttons[next].offsetLeft - buttons[0].offsetLeft;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(layers, { autoAlpha: 0, x: 0, y: 0, scale: 1 });
      gsap.set(layers[next], { autoAlpha: 1 });
      gsap.set(indicator, { x: offset });
    });
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const changed = previous.current !== mode;
      if (!changed) {
        gsap.set(layers, { autoAlpha: 0 });
        gsap.set(layers[next], { autoAlpha: 1 });
        gsap.set(indicator, { x: offset });
        return;
      }
      const outgoing = layers[1 - next];
      const incoming = layers[next];
      const direction = next === 1 ? 1 : -1;
      gsap.set(incoming, { autoAlpha: 0, x: 52 * direction, y: 20, scale: .93 });
      gsap.timeline()
        .fromTo(indicator, { x: buttons[1 - next].offsetLeft - buttons[0].offsetLeft }, { x: offset, duration: .4, ease: 'power3.out' }, 0)
        .fromTo(outgoing, { autoAlpha: 1, x: 0, y: 0, scale: 1 }, { autoAlpha: 0, x: -32 * direction, y: 8, scale: .97, duration: .22, ease: 'power2.in' }, 0)
        .to(incoming, { autoAlpha: 1, duration: .18, ease: 'power1.out' }, .12)
        .to(incoming, { x: 0, y: 0, scale: 1, duration: .75, ease: 'elastic.out(1, 0.7)' }, .12);
    });
    previous.current = mode;
    return () => mm.revert();
  }, { scope: root, dependencies: [mode], revertOnUpdate: true });

  return <figure ref={root} className="template-preview" data-mobile-align={mobileAlign} aria-label={`${title}桌面与移动端展示`}>
    <div className="template-preview-stage">
      {devices.map(device => <div className="template-preview-screen" data-device={device} aria-hidden={mode !== device} key={device}>
        <div className="template-preview-media">
          <img src={`${import.meta.env.BASE_URL}${device === 'mobile' ? mobileSrc : desktopSrc}`} alt={`Qsight ${title}${device === 'mobile' ? '移动端' : '桌面端'}`} width={device === 'mobile' ? 390 : 1440} height={device === 'mobile' ? 844 : 900} />
        </div>
      </div>)}
    </div>
    <div className="template-preview-switch" role="group" aria-label="切换展示设备">
      <span className="template-preview-indicator" aria-hidden="true" />
      <button type="button" aria-label="桌面端" aria-pressed={mode === 'desktop'} onClick={() => setMode('desktop')}><span className="template-device-icon template-device-monitor" aria-hidden="true" /></button>
      <button type="button" aria-label="移动端" aria-pressed={mode === 'mobile'} onClick={() => setMode('mobile')}><span className="template-device-icon template-device-mobile" aria-hidden="true" /></button>
    </div>
  </figure>;
}
