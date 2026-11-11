import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

const COLLAPSED_HEIGHT = 56;
const LOOP_GAP = 4;
const STATUS_COPY = 'AI正在重新整理数据';

const WAND_PARTS = [
  {
    d: 'M14.5002 8.49512L16.5002 10.4951M6.53009 21.4697L19.4694 8.53033C19.809 8.19076 19.9998 7.73022 19.9998 7.25C19.9998 6.76978 19.809 6.30923 19.4694 5.96967L19.0301 5.53033C18.6905 5.19077 18.23 5 17.7498 5C17.2695 5 16.809 5.19077 16.4694 5.53033L3.53009 18.4697C3.19052 18.8092 2.99976 19.2698 2.99976 19.75C2.99976 20.2302 3.19052 20.6908 3.53009 21.0303L3.96943 21.4697C4.30899 21.8092 4.76954 22 5.24976 22C5.72997 22 6.19052 21.8092 6.53009 21.4697Z',
  },
  {
    sparkle: true,
    d: 'M19.2503 15.6555V16.7493M19.2503 16.7493V17.843M19.2503 16.7493H18.3753M19.2503 16.7493H20.1253M21.0003 16.7493L20.2412 16.4962C19.8928 16.3801 19.6194 16.1067 19.5033 15.7584L19.2503 14.9993L18.9972 15.7584C18.8811 16.1067 18.6077 16.3801 18.2594 16.4962L17.5003 16.7493L18.2594 17.0023C18.6077 17.1184 18.8811 17.3918 18.9972 17.7402L19.2503 18.4993L19.5033 17.7402C19.6194 17.3918 19.8928 17.1184 20.2412 17.0023L21.0003 16.7493Z',
  },
  {
    sparkle: true,
    d: 'M10.2498 2.65625V3.75M10.2498 3.75V4.84375M10.2498 3.75H9.37476M10.2498 3.75H11.1248M11.9998 3.75L11.2407 3.49697C10.8923 3.38084 10.6189 3.10747 10.5028 2.7591L10.2498 2L9.99672 2.7591C9.8806 3.10747 9.60723 3.38084 9.25886 3.49697L8.49976 3.75L9.25886 4.00303C9.60723 4.11916 9.8806 4.39253 9.99672 4.7409L10.2498 5.5L10.5028 4.7409C10.6189 4.39253 10.8923 4.11916 11.2407 4.00303L11.9998 3.75Z',
  },
  {
    sparkle: true,
    d: 'M4.74976 7.65625V8.75M4.74976 8.75V9.84375M4.74976 8.75H3.87476M4.74976 8.75H5.62476M6.49976 8.75L5.74065 8.49697C5.39228 8.38084 5.11891 8.10747 5.00279 7.7591L4.74976 7L4.49672 7.7591C4.3806 8.10747 4.10723 8.38084 3.75886 8.49697L2.99976 8.75L3.75886 9.00303C4.10723 9.11916 4.3806 9.39253 4.49672 9.7409L4.74976 10.5L5.00279 9.7409C5.11891 9.39253 5.39228 9.11916 5.74065 9.00303L6.49976 8.75Z',
  },
];

export function AnalysisPlanCards() {
  const root = useRef<HTMLElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  const status = useRef<HTMLDivElement>(null);
  const loading = useRef<HTMLDivElement>(null);
  const typed = useRef<HTMLSpanElement>(null);
  const check = useRef<SVGSVGElement>(null);
  const base = `${import.meta.env.BASE_URL}images/qsight/`;

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const figure = root.current;
      const card = shell.current;
      const image = photo.current;
      const bar = status.current;
      const load = loading.current;
      const copy = typed.current;
      const mark = check.current;
      if (!figure || !card || !image || !bar || !load || !copy || !mark) return;

      const parts = load.querySelectorAll<SVGElement>('.analysis-plan-wand-part');
      const bands = load.querySelectorAll<SVGRectElement>('.analysis-plan-wand-band');
      const sparkles = load.querySelectorAll<SVGElement>('.analysis-plan-wand-part[data-sparkle]');
      const wand = load.querySelector<SVGElement>('.analysis-plan-wand-part[data-wand]');
      const circle = mark.querySelector<SVGPathElement>('.analysis-plan-check-circle');
      const tick = mark.querySelector<SVGPathElement>('.analysis-plan-check-tick');
      if (!circle || !tick) return;

      gsap.set(bar, { autoAlpha: 0 });
      gsap.set(mark, { autoAlpha: 0, scale: 1, x: 0, rotation: 0, transformOrigin: '50% 50%' });
      gsap.set(copy, { textContent: '' });
      gsap.set(parts, { autoAlpha: 0, scale: 0.45, transformOrigin: 'center center' });
      gsap.set(bands, { attr: { x: -10 } });
      gsap.set([circle, tick], { drawSVG: 0 });

      let played = false;
      const play = () => {
        if (played) return;
        if (!image.complete) {
          image.addEventListener('load', play, { once: true });
          return;
        }
        played = true;
        const full = card.offsetHeight;
        gsap.set(card, { height: full });

        const shine = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.7 });
        shine.fromTo(
          bands,
          { attr: { x: -10 } },
          { attr: { x: 26 }, duration: 0.55, stagger: 0.12, ease: 'power2.inOut' },
        );

        const typer = { n: 0 };
        let wandMotion: gsap.core.Animation | undefined;
        let sparkleMotion: gsap.core.Animation | undefined;
        const stopMotion = () => {
          shine.pause(0);
          wandMotion?.kill();
          sparkleMotion?.kill();
          wandMotion = undefined;
          sparkleMotion = undefined;
          if (wand) gsap.set(wand, { rotation: 0, transformOrigin: '22% 84%' });
          gsap.set(sparkles, { scale: 1 });
        };
        const resetLoop = () => {
          stopMotion();
          gsap.set(bar, { autoAlpha: 0 });
          gsap.set(mark, { autoAlpha: 0, scale: 1, x: 0, rotation: 0, transformOrigin: '50% 50%' });
          gsap.set(copy, { textContent: '' });
          gsap.set(parts, { autoAlpha: 0, scale: 0.45, transformOrigin: 'center center' });
          gsap.set(bands, { attr: { x: -10 } });
          gsap.set([circle, tick], { drawSVG: 0 });
          gsap.set(load, { autoAlpha: 1 });
          gsap.set(image, { autoAlpha: 1 });
          gsap.set(card, { height: full });
          typer.n = 0;
        };

        gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          delay: 0.8,
          repeat: -1,
          repeatDelay: LOOP_GAP,
          onRepeat: resetLoop,
        })
          .to(image, { autoAlpha: 0, duration: 0.45, ease: 'power2.out' })
          .to(card, { height: COLLAPSED_HEIGHT, duration: 0.7 }, '+=0.12')
          .to(bar, { autoAlpha: 1, duration: 0.2 }, '-=0.28')
          .to(parts, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power2.out', stagger: 0.1 }, '-=0.08')
          .add(() => {
            shine.play(0);
            if (wand) {
              gsap.set(wand, { transformOrigin: '22% 84%' });
              wandMotion = gsap.to(wand, {
                rotation: 14,
                duration: 0.7,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
              });
            }
            sparkleMotion = gsap.to(sparkles, {
              scale: 1.18,
              duration: 0.55,
              ease: 'sine.inOut',
              stagger: { each: 0.16, repeat: -1, yoyo: true },
            });
          }, '-=0.12')
          .to(typer, {
            n: STATUS_COPY.length,
            duration: STATUS_COPY.length * 0.07,
            ease: 'none',
            onUpdate: () => {
              copy.textContent = STATUS_COPY.slice(0, Math.round(typer.n));
            },
          }, '<')
          .to({}, { duration: 2 })
          .add(() => {
            stopMotion();
          })
          .to(load, { autoAlpha: 0, duration: 0.3, ease: 'power2.out' })
          .to(mark, { autoAlpha: 1, duration: 0.12, ease: 'power2.out' }, '-=0.05')
          .to(circle, { drawSVG: '100%', duration: 0.5, ease: 'power2.inOut' })
          .to(tick, { drawSVG: '100%', duration: 0.42, ease: 'power1.out' })
          .to(mark, { scale: 1.16, duration: 0.16, ease: 'power2.out' }, '-=0.08')
          .to(mark, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.42)' })
          .to(mark, { x: 3, rotation: 5, duration: 0.045, ease: 'power1.inOut', yoyo: true, repeat: 5 })
          .set(mark, { x: 0, rotation: 0 })
          .to(mark, { autoAlpha: 0, scale: 0.86, duration: 0.32, ease: 'power2.in' }, '+=0.12')
          .to(bar, { autoAlpha: 0, duration: 0.16, ease: 'power2.in' }, '-=0.12')
          .to(card, { height: full, duration: 0.7 }, '+=0.16')
          .to(image, { autoAlpha: 1, duration: 0.45, ease: 'power2.out' }, '+=0.08');
      };

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          play();
          observer.disconnect();
        }
      }, { threshold: 0.35 });
      observer.observe(figure);
      return () => observer.disconnect();
    }, root);
    return () => media.revert();
  }, { scope: root });

  return (
    <figure ref={root} className="analysis-plan-cards" aria-label="生成前的分析方案">
      <img src={`${base}plan-card-title.webp`} width={1558} height={176} alt="报告标题：福田区区域监测报告" loading="lazy" />
      <div className="analysis-plan-card-stage">
        <div ref={shell} className="analysis-plan-card-shell">
          <img ref={photo} src={`${base}plan-card-chapter1.webp`} width={1558} height={880} alt="一、区域企业监测" />
          <div ref={status} className="analysis-plan-card-status">
            <div ref={loading} className="analysis-plan-card-loading">
              <svg className="analysis-plan-wand" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <defs>
                  {WAND_PARTS.map((_, index) => (
                    <clipPath id={`analysis-plan-wand-clip-${index}`} key={index} clipPathUnits="userSpaceOnUse">
                      <rect className="analysis-plan-wand-band" x="-10" y="-2" width="10" height="28" transform="skewX(-22)" />
                    </clipPath>
                  ))}
                </defs>
                {WAND_PARTS.map((part, index) => (
                  <g
                    key={index}
                    className="analysis-plan-wand-part"
                    data-sparkle={part.sparkle ? '' : undefined}
                    data-wand={part.sparkle ? undefined : ''}
                  >
                    <path d={part.d} />
                    <path d={part.d} className="analysis-plan-wand-shine" clipPath={`url(#analysis-plan-wand-clip-${index})`} />
                  </g>
                ))}
              </svg>
              <span className="analysis-plan-card-copy">
                <span className="analysis-plan-card-copy-ghost" aria-hidden="true">{STATUS_COPY}</span>
                <span ref={typed} className="analysis-plan-card-copy-typed" />
              </span>
            </div>
            <svg ref={check} className="analysis-plan-check" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path className="analysis-plan-check-circle" d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" />
              <path className="analysis-plan-check-tick" d="M8 12.5L10.5 15L16 9" />
            </svg>
          </div>
        </div>
      </div>
      <img src={`${base}plan-card-chapter2.webp`} width={1558} height={608} alt="二、区域重点产业监测" loading="lazy" />
    </figure>
  );
}
