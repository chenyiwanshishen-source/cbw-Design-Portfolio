import { useId, useRef } from 'react';
import gsap from 'gsap';
const icons = ['target', 'wrench', 'shield-check', 'arrows-clockwise'];
const noise = (n: number) => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);
const stages = [
  ['任务定义', '明确目标、角色和完成标准'],
  ['工具编排', '规定输入和工具调用顺序'],
  ['质量检查', '约束内容、格式和数据依据'],
  ['异常处理', '设置重试、兜底和交付自检'],
];
export function PromptStructure() {
  const root = useRef<HTMLElement>(null);
  const id = useId().replace(/:/g, '');
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const flicker = gsap.timeline();
      root.current?.querySelectorAll('.prompt-pixel').forEach((pixel, i) => {
        const x = Number(pixel.getAttribute('x'));
        const rise = .22 + noise(i * 7) * .24;
        const fade = .45 + noise(i * 31) * .4;
        const pulse = gsap.timeline({ repeat: -1, repeatDelay: 3.6 - rise - fade });
        pulse.fromTo(pixel, { opacity: .025 }, {
          opacity: .4 + noise(i * 17) * .55,
          duration: rise, ease: 'sine.out',
        }).to(pixel, { opacity: .025, duration: fade, ease: 'sine.inOut' });
        // A loose front travels toward the gate; each pixel keeps its own timing.
        flicker.add(pulse, (x / 310) * 2.1 + noise(i * 43) * .85);
      });
      flicker.time(3.6);

      const streams = gsap.to('.prompt-stream', { strokeDashoffset: -220, duration: 9, ease: 'none', repeat: -1 });
      const observer = new IntersectionObserver(([entry]) => { streams.paused(!entry.isIntersecting); flicker.paused(!entry.isIntersecting); });
      if (root.current) observer.observe(root.current);
      return () => observer.disconnect();
    }, root);
    return () => mm.revert();
  }, { scope: root });
  return <figure ref={root} className="prompt-structure" aria-label="生成要求流入四个提示词模块：任务定义、工具编排、质量检查和异常处理">
    <div className="prompt-flow-art" aria-hidden="true">
      <svg viewBox="0 0 600 440" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`${id}-fade`}><stop stopColor="white" stopOpacity="0"/><stop offset=".25" stopColor="white"/><stop offset=".85" stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient>
          <linearGradient id={`${id}-glow`}><stop stopColor="var(--color-accent)" stopOpacity="0"/><stop offset="1" stopColor="var(--color-accent)" stopOpacity=".12"/></linearGradient>
          <mask id={`${id}-mask`}><rect x="0" y="55" width="310" height="330" fill={`url(#${id}-fade)`}/></mask>
        </defs>
        <g mask={`url(#${id}-mask)`}>
          <g opacity=".16" fill="var(--color-text)">{Array.from({length: 29}, (_, row) => Array.from({length: 45}, (_, col) => <circle key={`${row}-${col}`} cx={col * 7} cy={60 + row * 11.5} r=".65" />))}</g>
          <g fill="var(--color-text)">{Array.from({length: 28}, (_, row) => Array.from({length: 45}, (_, col) => {
            const seed = row * 89 + col;
            const n = noise(seed);
            const size = 2.2 + noise(seed * 11) * 2.2;
            return n > .55 ? <rect className="prompt-pixel" key={`${row}-${col}`} x={col * 7 - size / 2} y={60 + row * 11.5 - size / 2} width={size} height={size} opacity={.15 + n * .55} /> : null;
          }))}</g>
        </g>
        <rect x="240" y="40" width="100" height="360" fill={`url(#${id}-glow)`}/>
        <path className="prompt-gate" d="M340 40V400" />
        {[48,163,277,392].map((y,i) => <g key={y}><path className="prompt-route" d={`M340 ${170+i*32} C440 ${170+i*32} 440 ${y} 600 ${y}`} /><path className="prompt-stream" d={`M340 ${170+i*32} C440 ${170+i*32} 440 ${y} 600 ${y}`} style={{strokeDashoffset:i*55}} /></g>)}
      </svg>
      <span className="prompt-input-label">生成要求</span>
    </div>
    <ul className="prompt-flow-cards">{stages.map(([title, text],i) => { const icon = icons[i]; return <li key={title}><span className="prompt-card-icon"><span className="prompt-flow-glyph" style={{ maskImage: `url(/images/icons/phosphor/${icon}.svg)` }} aria-hidden="true" /></span><div><h4>{title}</h4><p>{text}</p></div></li>; })}</ul>
  </figure>;
}
