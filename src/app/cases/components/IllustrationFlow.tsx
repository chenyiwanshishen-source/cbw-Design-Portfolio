import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function IllustrationFlow() {
  const root = useRef<HTMLElement>(null);
  useGSAP((_context, contextSafe) => {
    if (!root.current || !contextSafe || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const stage = root.current;
    const items = Array.from(stage.querySelectorAll<HTMLElement>('.illustration-flow-icon, .bridge-icon'));
    const captions = Array.from(stage.querySelectorAll<HTMLElement>('.illustration-endpoint > span, .illustration-endpoint > strong, .illustration-endpoint > small, .illustration-ai-label, .illustration-process strong, .illustration-process small, .illustration-step-arrow, .illustration-link, .illustration-middle-link'));
    const connectors = captions.filter(item => item.matches('.illustration-link, .illustration-middle-link, .illustration-step-arrow'));
    const labels = captions.filter(item => !connectors.includes(item));
    const textRuns = labels.map(item => {
      const text = item.textContent || '';
      item.setAttribute('aria-label', text);
      const spans = Array.from(text).map(character => {
        const span = document.createElement('span');
        span.textContent = character;
        span.setAttribute('aria-hidden', 'true');
        return span;
      });
      item.replaceChildren(...spans);
      return { item, text, spans };
    });
    const bounds = stage.getBoundingClientRect();
    const random = gsap.utils.random;
    const states = items.map((item, index) => {
      const rect = item.getBoundingClientRect();
      const rotation = Number(gsap.getProperty(item, 'rotation')) || 0;
      const spread = random(.08, .92);
      return {
        item, rotation,
        x: bounds.left + bounds.width * spread - (rect.left + rect.width / 2),
        y: bounds.bottom - 24 - rect.bottom - random(0, 28),
        fallenRotation: random(-78, 78),
        delay: random(.1, .85),

      };
    });
    let motion: gsap.core.Timeline | undefined;
    const resetMotion = () => {
      motion?.kill();
      gsap.killTweensOf([...items, ...captions]);
      stage.classList.add('is-assembling');
      gsap.set(items, { willChange: 'transform', force3D: true });
      motion = gsap.timeline();
      return motion;
    };
    const fall = contextSafe((immediate = false) => {
      const sequence = resetMotion();
      gsap.set(labels, { opacity: 1 });
      gsap.set(textRuns.flatMap(run => run.spans), { visibility: 'hidden' });
      gsap.set(connectors, { opacity: 0, scaleX: 0, transformOrigin: 'left center' });
      states.forEach(({item, x, y, fallenRotation}) => {
        if (immediate) {
          gsap.set(item, { x, y, rotation: fallenRotation, opacity: 1 });
        } else {
          sequence.to(item, { x, y, rotation: fallenRotation, duration: random(.65, 1.05), ease: 'bounce.out' }, random(0, .35));
        }
      });
      sequence.call(() => { stage.classList.remove('is-assembling'); gsap.set(items, { clearProps: 'willChange' }); });
    });
    const stand = contextSafe(() => {
      const sequence = resetMotion();
      states.forEach(({item, rotation, delay}) => {
        sequence.to(item, { x: 0, y: 0, rotation, duration: 1.15, ease: 'back.out(1.15)', force3D: true }, delay * .5);
      });
      const settled = sequence.duration();
      textRuns.forEach(({spans}) => {
        spans.forEach((span, index) => sequence.set(span, { visibility: 'visible' }, settled + .12 + index * .045));
      });
      sequence.to(connectors, { opacity: 1, scaleX: 1, duration: .8, ease: 'power2.inOut', stagger: .1 }, settled + .12);
      sequence.call(() => { stage.classList.remove('is-assembling'); gsap.set(items, { clearProps: 'willChange' }); });
    });
    fall(true);
    ScrollTrigger.create({ trigger: stage, start: 'top 88%', end: 'bottom 12%', onEnter: stand, onEnterBack: stand, onLeave: () => fall(), onLeaveBack: () => fall() });
    return () => { textRuns.forEach(({item, text}) => { item.textContent = text; item.removeAttribute('aria-label'); }); };
  }, { scope: root });
  const base = import.meta.env.BASE_URL;
  const agents = [['Codex', 'codex-color.svg'], ['Claude', 'claude-color.svg'], ['Cursor', 'cursor.svg'], ['GitHub Copilot', 'githubcopilot.svg'], ['Windsurf', 'windsurf.svg'], ['Cline', 'cline.svg'], ['Gemini', 'gemini-color.svg']];
  return <figure ref={root} className="illustration-flow" aria-label="用户提出需求，智能体读取 Skill 和参考，绘制 SVG，检查修改后交付">
    <div className="illustration-workflow">
      <div className="illustration-endpoint"><span>用户</span><div className="illustration-flow-icon"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="16" cy="11" r="5"/><path d="M6 27c0-6 4-10 10-10s10 4 10 10"/></svg></div><strong>提出需求</strong><small>用途、场景和参考风格</small></div>
      <div className="illustration-link illustration-link-input" aria-hidden="true"><svg viewBox="0 0 240 100" preserveAspectRatio="none"><path d="M2 96 L234 4"/><path d="M223 3 L234 4 L227 14"/></svg></div>
      <div className="illustration-ai"><span className="illustration-ai-label">智能体按 Skill 执行</span><div className="bridge-agent-icons">{agents.map(([name,file]) => <div className="bridge-icon" key={name} title={name}><img src={`${base}images/qsight/brands/${file}`} alt={name}/></div>)}</div>
        </div><div className="illustration-middle-link" aria-hidden="true">→</div><div className="illustration-execution"><ol className="illustration-process">{[
          ['看参考和规则', '读取风格图、画法和 SVG 案例', 'database'],
          ['绘制 SVG', '安排构图，再画形体与细节', 'pencil-fill'],
          ['渲染检查', '查看原尺寸和 3 倍尺寸成图', 'monitor'],
          ['修改并复检', '对照参考，修正后重新看图', 'arrows-clockwise'],
        ].map(([title, detail, icon], index) => <li key={title}><div className="illustration-flow-icon"><img src={`${base}images/icons/phosphor/${icon}.svg`} alt=""/></div><strong>{title}</strong><small>{detail}</small>{index < 3 && <span className="illustration-step-arrow" aria-hidden="true">↓</span>}</li>)}</ol>
      </div>
      <div className="illustration-link illustration-link-output" aria-hidden="true"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M3 96 L94 5"/><path d="M80 6 L94 5 L93 19"/></svg></div>
      <div className="illustration-endpoint"><span>插画</span><div className="illustration-flow-icon"><img src={`${base}images/icons/phosphor/checks.svg`} alt=""/></div><strong>交付 SVG</strong><small>可继续编辑的源文件</small></div>
    </div>

  </figure>;
}
