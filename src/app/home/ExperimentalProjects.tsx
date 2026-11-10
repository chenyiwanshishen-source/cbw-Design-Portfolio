import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { explorationProjects } from '../cases/content/explorations';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ExperimentalProjects() {
  const section = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 768px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)', () => {
      const list = section.current!.querySelector<HTMLElement>('.home-side-projects')!;
      const rows = Array.from(list.querySelectorAll<HTMLElement>('.home-side-row'));
      const gap = () => parseFloat(getComputedStyle(list).rowGap);
      const top = () => list.getBoundingClientRect().top + window.scrollY;
      const offset = (index: number) => rows.slice(0, index).reduce((sum, row) => sum + row.offsetHeight + gap(), 0);
      const inset = (index = 0) => {
        const style = getComputedStyle(list);
        return parseFloat(style.getPropertyValue('--rhythm-5')) + index * parseFloat(style.getPropertyValue('--rhythm-3'));
      };
      // Tall viewports previously hit the document bottom before cards 3 and 4
      // reached the shared pin endpoint. Supply only the missing scroll runway
      // after the footer, without opening a gap below the project list.
      const sheet = section.current!.closest<HTMLElement>('.home-sheet')!;
      const originalPadding = sheet.style.paddingBottom;
      const basePadding = parseFloat(getComputedStyle(sheet).paddingBottom) || 0;
      let runway = 0;
      const updateRunway = () => {
        const endpoint = top() + offset(rows.length - 1) - inset(rows.length - 1);
        const naturalMax = document.documentElement.scrollHeight - window.innerHeight - runway;
        runway = Math.max(0, Math.ceil(endpoint - naturalMax));
        sheet.style.paddingBottom = `${basePadding + runway}px`;
      };
      updateRunway();
      ScrollTrigger.addEventListener('refreshInit', updateRunway);
      rows.slice(0, -1).forEach((row, index) => {
        ScrollTrigger.create({
          trigger: row,
          start: () => `top ${inset(index)}`,
          end: () => top() + offset(rows.length - 1) - inset(rows.length - 1),
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
        gsap.to(row.firstElementChild, {
          scale: 1 - (rows.length - index - 1) * 0.025,
          ease: 'none',
          scrollTrigger: {
            trigger: list,
            start: () => top() + offset(index + 1) - window.innerHeight * 0.75,
            end: () => top() + offset(index + 1) - inset(index + 1),
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => {
        ScrollTrigger.removeEventListener('refreshInit', updateRunway);
        sheet.style.paddingBottom = originalPadding;
      };
    });
    let active = true;
    document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); };
  }, { scope: section });

  return <section ref={section} id="ai" aria-labelledby="ai-title" className="home-section">
    <h2 id="ai-title" className="text-h2 font-normal">自研工具</h2>
    <div className="home-side-projects">
      {explorationProjects.filter(project => project.slug !== 'design-system').map(project => <div className="home-side-row" key={project.slug}>
        <a href={project.href} className="home-side-project">
          <div className="home-side-cover" aria-hidden="true">{project.slug === 'figma-connector'
            ? <iframe src="/demos/figma-bridge/index.html" title="Figma 桥接器界面预览" loading="lazy" sandbox="allow-scripts" tabIndex={-1} className="w-full h-full min-h-0 border-0 pointer-events-none" />
            : project.cover}</div>
          <div className="home-side-copy">
            <h3>{{'figma-connector': 'Figma 桥接器', 'illustration-skill': 'B 端插画 Skill', 'visual-code-canvas': '页面编辑器'}[project.slug] ?? project.name}</h3>
            {project.status && <span className="text-caption text-text-secondary">{project.status}</span>}
            <span className="home-side-entry">查看 →</span>
          </div>
        </a>
      </div>)}
    </div>
  </section>;
}
