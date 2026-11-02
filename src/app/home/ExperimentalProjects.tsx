import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { explorationProjects, explorations } from '../cases/content/explorations';

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
      const inset = () => parseFloat(getComputedStyle(list).getPropertyValue('--rhythm-5'));
      // Tall viewports previously hit the document bottom before cards 3 and 4
      // reached the shared pin endpoint. Supply only the missing scroll runway
      // after the footer, without opening a gap below the project list.
      const sheet = section.current!.closest<HTMLElement>('.home-sheet')!;
      const originalPadding = sheet.style.paddingBottom;
      const basePadding = parseFloat(getComputedStyle(sheet).paddingBottom) || 0;
      let runway = 0;
      const updateRunway = () => {
        const endpoint = top() + offset(rows.length - 1) - inset();
        const naturalMax = document.documentElement.scrollHeight - window.innerHeight - runway;
        runway = Math.max(0, Math.ceil(endpoint - naturalMax));
        sheet.style.paddingBottom = `${basePadding + runway}px`;
      };
      updateRunway();
      ScrollTrigger.addEventListener('refreshInit', updateRunway);
      rows.slice(0, -1).forEach((row, index) => {
        ScrollTrigger.create({
          trigger: row,
          start: () => `top ${inset()}`,
          end: () => top() + offset(rows.length - 1) - inset(),
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
            end: () => top() + offset(index + 1) - inset(),
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

  return <section ref={section} id="ai" aria-labelledby="ai-title" className="flex flex-col gap-6">
    <h2 id="ai-title" className="text-h2 font-normal">实验项目</h2>
    <div className="home-side-projects">
      {explorationProjects.map(project => <div className="home-side-row" key={project.slug}>
        <a href={project.href} className="home-side-project">
          <div className="home-side-cover" aria-hidden="true">{project.cover}</div>
          <div className="home-side-copy">
            <span className="text-caption text-text-secondary">{project.name}</span>
            <h3>{explorations.chapters.find(chapter => chapter.id === project.chapter)?.title}</h3>
            <span className="home-side-entry">查看项目 →</span>
          </div>
        </a>
      </div>)}
    </div>
  </section>;
}
