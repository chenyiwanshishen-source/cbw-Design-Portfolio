import { useEffect, useState } from 'react';
export function CaseToc({ items, label }: { items: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const sections = items.map(item => document.getElementById(item.id)).filter((node): node is HTMLElement => !!node);
    const observer = new IntersectionObserver(() => {
      const current = sections.filter(node => node.getBoundingClientRect().top <= window.innerHeight * .25).at(-1) ?? sections[0];
      if (current) setActive(current.id);
    }, { rootMargin: '-24px 0px -75% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);
  return <nav className="case-toc" aria-label={label}>{items.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const section = document.getElementById(item.id);
    section?.scrollIntoView({ behavior: 'instant', block: 'start' });
    section?.focus({ preventScroll: true });
    setActive(item.id);
  }}>{item.label}</a>)}</nav>;
}
