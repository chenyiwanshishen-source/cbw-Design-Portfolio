import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Bookmark, Globe, MessageCircle, LayoutList, Check, SlidersHorizontal, Paperclip, ArrowRight } from 'lucide-react';

gsap.registerPlugin(useGSAP);

function Arrow() {
  return <svg className="generator-arrow" viewBox="0 0 60 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 H57 M51 5 L57 10 L51 15" /></svg>;
}
export function YeProductFlow() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const motion = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2, defaults: { ease: 'sine.inOut' } });
      motion.to('.ye-product-models .ye-collaboration-logo', { y: '-=4', duration: 1.6, stagger: { each: .16, repeat: 1, yoyo: true } }, 0)
        .to('.ye-product-composer, .ye-product-plan-card, .ye-product-ai .generator-app', { y: -3, duration: 1.4, stagger: { each: .25, repeat: 1, yoyo: true } }, .3)
        .to('.ye-product-tools > div > span', { y: -3, duration: .8, stagger: { each: .15, repeat: 1, yoyo: true } }, .8)
        .to('.generator-arrow', { opacity: .45, duration: .8, stagger: { each: .2, repeat: 1, yoyo: true } }, .4);
      const element = root.current;
      const play = () => motion.restart();
      const reset = () => motion.pause(0);
      element?.addEventListener('mouseenter', play);
      element?.addEventListener('mouseleave', reset);
      return () => {
        element?.removeEventListener('mouseenter', play);
        element?.removeEventListener('mouseleave', reset);
      };
    }, root);
    return () => media.revert();
  }, { scope: root });
  return <figure ref={root} className="ye-product-flow" aria-label="用户提出整理要求，AI 按需调用工具生成方案，等待用户确认">
    <div className="ye-product-main">
      <div className="ye-product-request"><span>用户需求</span><div className="ye-product-composer"><div className="ye-product-composer-prompt"><em>整理这些书签…</em></div><div className="ye-product-composer-toolbar"><SlidersHorizontal aria-hidden="true" /><Paperclip aria-hidden="true" /><span className="ye-product-composer-send"><ArrowRight aria-hidden="true" /></span></div></div></div><Arrow />
      <div className="ye-product-ai"><div className="ye-product-models">{[['豆包', 'doubao.webp'], ['Claude', 'claude-color.svg'], ['Gemini', 'gemini-color.svg'], ['Codex', 'codex-color.svg'], ['天工', 'tiangong.webp']].map(([name, file]) => <span className="ye-collaboration-logo" key={file}><img src={`${import.meta.env.BASE_URL}images/qsight/brands/${file}`} alt={name} width="40" height="40" /></span>)}</div><strong>AI</strong><span>理解需求、选择工具</span></div><Arrow />
      <div className="ye-product-plan-card"><div className="ye-product-plan-summary" aria-hidden="true"><i/><i/><i/></div><div className="ye-product-plan-caption"><strong>整理方案</strong><span>等待确认</span></div></div><Arrow />
      <div className="ye-product-ai"><div className="generator-app"><Check aria-hidden="true" /></div><strong>用户确认</strong></div>
    </div>
    <div className="ye-product-tools"><span className="ye-product-tool-link" aria-hidden="true">↕</span><span>按需调用</span><div>{[{ Icon: Bookmark, text: '读取书签' }, { Icon: Globe, text: '查看网页' }, { Icon: MessageCircle, text: '追问' }, { Icon: LayoutList, text: '生成预览' }].map(({ Icon, text }) => <span key={text}><Icon aria-hidden="true" />{text}</span>)}</div></div>
  </figure>;
}
