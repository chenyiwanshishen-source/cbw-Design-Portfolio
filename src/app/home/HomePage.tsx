import { Contact } from './Contact';
import { Experience } from './Experience';
import { ExperimentalProjects } from './ExperimentalProjects';
import { useEffect, useState } from 'react';
import { DraftingFrame } from './DraftingFrame';
import { Blueprint } from './Blueprint';
import { useIntroOpening } from './useIntroOpening';
import { Intro } from './Intro';
import { CaseList } from './CaseCard';
import { ComponentGallery } from './ComponentGallery';
import { cases, navigation } from './content/zh';
import './home.css';
import '../cases/explorations.css';

export function HomePage({ route }: { route: string }) {
  const [replay, setReplay] = useState(0);
  const { playing, finish } = useIntroOpening(replay);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const id = route === '#/project/explorations' ? 'ai' : navigation.find(item => route === `#${item.id}`)?.id;
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      else {
        let top = 0;
        try { top = Number(sessionStorage.getItem('portfolio:home-scroll')) || 0; } catch {}
        window.scrollTo({ top, behavior: 'instant' });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [route]);
  useEffect(() => {
    let lastY = window.scrollY;
    const remember = () => { lastY = window.scrollY; };
    const save = () => { try { sessionStorage.setItem('portfolio:home-scroll', String(lastY)); } catch {} };
    window.addEventListener('scroll', remember, { passive: true });
    document.addEventListener('click', save, true);
    return () => { save(); window.removeEventListener('scroll', remember); document.removeEventListener('click', save, true); };
  }, []);
  useEffect(() => { if (route === '#replay') setReplay(value => value + 1); }, [route]);
  if (route === '#components') return <ComponentGallery />;
  return <div className="homepage">
    <div className="home-sheet mx-auto w-full max-w-content">
      <DraftingFrame />
      <Intro />
      <div className="home-sections">
        <section id="work" aria-label="项目" className="home-section">
          <CaseList items={cases} />
        </section>
        <ExperimentalProjects />
        <Experience />
        <Contact />
      </div>
    </div>
    {playing && <Blueprint onFinish={finish} />}
  </div>;
}
