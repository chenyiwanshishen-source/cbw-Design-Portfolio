import type { CSSProperties, ReactNode } from 'react';

export function IntroBlock({ label, index, playing, onFinish, className = '', children }: {
  label: string;
  index: number;
  playing: boolean;
  onFinish: () => void;
  className?: string;
  children: ReactNode;
}) {
  return <div data-intro-block={label} className={`intro-block ${className}`} style={{ '--i': index } as CSSProperties}>
    <div className="intro-real">{children}</div>
    {playing && <div className="intro-wire" aria-hidden="true" onAnimationEnd={event => {
      if (index === 3 && event.animationName === 'intro-wire-hide') onFinish();
    }}><span className="intro-wire-label font-mono text-label">{label}</span></div>}
  </div>;
}
