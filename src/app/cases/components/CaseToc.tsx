import { useEffect, useState } from 'react';
export function CaseToc({ items, label }: { items: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const sections = items.map(item => document.getElementById(item.id)).filter((node): node is HTMLElement => !!node);
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = sections[0] ? parseFloat(getComputedStyle(sections[0]).scrollMarginTop) || 0 : 0;
      const current = sections.filter(node => node.getBoundingClientRect().top <= readingLine + 2).at(-1) ?? sections[0];
      if (current) setActive(current.id);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    const sheet = sections[0]?.closest('.case-sheet');
    if (sheet) observer.observe(sheet);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [items]);
  return <nav className="case-toc" aria-label={label}>{items.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const section = document.getElementById(item.id);
    section?.scrollIntoView({ behavior: 'instant', block: 'start' });
    section?.focus({ preventScroll: true });
    setActive(item.id);
  }}>{item.label.replace(/^\d+\s*·\s*/, '')}</a>)}</nav>;
}
