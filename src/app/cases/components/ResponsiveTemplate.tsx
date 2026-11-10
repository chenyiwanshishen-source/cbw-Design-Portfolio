import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
type Device = 'desktop' | 'mobile';
const devices: Device[] = ['desktop', 'mobile'];

export function ResponsiveTemplate({ title = '模板中心', desktopSrc = 'images/qsight/template-center-desktop.webp', mobileSrc = 'images/qsight/template-center-mobile.webp', mobileAlign = 'top', homeSlides = false }: { title?: string; desktopSrc?: string; mobileSrc?: string; mobileAlign?: 'top' | 'bottom'; homeSlides?: boolean }) {
  const [mode, setMode] = useState<Device>('desktop');
  const [active, setActive] = useState(0);
  const slidePrevious = useRef(0);
  const slideDirection = useRef(1);
  const select = (index: number, direction = index > active ? 1 : -1) => {
    slideDirection.current = direction;
    setActive((index + 2) % 2);
  };
  useEffect(() => {
    if (!homeSlides) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: number | undefined;
    const schedule = () => {
      window.clearInterval(timer);
      if (!media.matches) timer = window.setInterval(() => { slideDirection.current = 1; setActive(index => (index + 1) % 2); }, 4200);
    };
    schedule();
    media.addEventListener('change', schedule);
    return () => { window.clearInterval(timer); media.removeEventListener('change', schedule); };
  }, [homeSlides, active, mode]);
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

  useGSAP(() => {
    if (!homeSlides || !root.current) return;
    const mm = gsap.matchMedia();
    const changed = slidePrevious.current !== active;
    mm.add('(prefers-reduced-motion: reduce)', () => {
      root.current!.querySelectorAll('.template-preview-slide').forEach(layer => {
        gsap.set(layer, { autoAlpha: Number(layer.getAttribute('data-slide')) === active ? 1 : 0, x: 0, scale: 1 });
      });
    });
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      devices.forEach(device => {
        const layers = root.current!.querySelectorAll(`[data-device="${device}"] .template-preview-slide`);
        gsap.set(layers, { autoAlpha: 0, x: 0, scale: 1 });
        if (!changed) { gsap.set(layers[active], { autoAlpha: 1 }); return; }
        gsap.set(layers[slidePrevious.current], { autoAlpha: 1 });
        gsap.set(layers[active], { x: slideDirection.current * 40, scale: .96 });
        gsap.timeline()
          .to(layers[slidePrevious.current], { autoAlpha: 0, x: slideDirection.current * -24, scale: .98, duration: .2, ease: 'power2.in' }, 0)
          .to(layers[active], { autoAlpha: 1, duration: .18 }, .1)
          .to(layers[active], { x: 0, scale: 1, duration: .75, ease: 'elastic.out(1, 0.7)' }, .1);
      });
      if (changed) gsap.fromTo(root.current!.querySelectorAll('.report-edit-dot > span')[active], { scale: .6 }, { scale: 1, duration: .65, ease: 'elastic.out(1, 0.5)' });
    });
    slidePrevious.current = active;
    return () => mm.revert();
  }, { scope: root, dependencies: [active, homeSlides], revertOnUpdate: true });
  const { contextSafe } = useGSAP({ scope: root });
  const press = contextSafe((button: HTMLButtonElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(button, { scale: .84 }, { scale: 1, duration: .55, ease: 'elastic.out(1, 0.5)', overwrite: true });
  });

  return <figure ref={root} className={`template-preview${homeSlides ? " template-preview-carousel" : ""}`} data-mobile-align={mobileAlign} aria-label={`${title}桌面与移动端展示`}>
    <div className="template-preview-stage">
      {devices.map(device => <div className="template-preview-screen" data-device={device} aria-hidden={mode !== device} key={device}>
        <div className="template-preview-media">
          {(homeSlides ? [0, 1] : [1]).map(index => <div key={index} className={homeSlides ? 'template-preview-slide' : undefined} data-slide={index} aria-hidden={homeSlides && active !== index}>
            <img src={`${import.meta.env.BASE_URL}${homeSlides && index === 0 ? `images/qsight/home-${device}.webp` : device === 'mobile' ? mobileSrc : desktopSrc}`} alt={`Qsight ${homeSlides && index === 0 ? '首页' : title}${device === 'mobile' ? '移动端' : '桌面端'}`} width={device === 'mobile' ? 390 : 1440} height={device === 'mobile' ? 844 : 900} />
          </div>)}
        </div>
      </div>)}
    </div>
    {homeSlides && <>
      {[-1, 1].map(direction => <button key={direction} type="button" className={`report-edit-arrow ${direction < 0 ? 'is-previous' : 'is-next'}`} aria-label={direction < 0 ? '上一张首页与模板图' : '下一张首页与模板图'} onClick={event => { press(event.currentTarget); select(active + direction, direction); }}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d={direction < 0 ? 'M14 5 7 12 14 19' : 'm10 5 7 7-7 7'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>)}
      <div className="report-edit-pagination" role="group" aria-label="选择首页与模板图片">
        {['首页', '模板中心'].map((label, index) => <button key={label} type="button" className="report-edit-dot" aria-label={`查看${label}`} aria-pressed={active === index} onClick={event => { press(event.currentTarget); select(index); }}><span /></button>)}
      </div>
    </>}
    <div className="template-preview-switch" role="group" aria-label="切换展示设备">
      <span className="template-preview-indicator" aria-hidden="true" />
      <button type="button" aria-label="桌面端" aria-pressed={mode === 'desktop'} onClick={() => setMode('desktop')}><span className="template-device-icon template-device-monitor" aria-hidden="true" /></button>
      <button type="button" aria-label="移动端" aria-pressed={mode === 'mobile'} onClick={() => setMode('mobile')}><span className="template-device-icon template-device-mobile" aria-hidden="true" /></button>
    </div>
  </figure>;
}
