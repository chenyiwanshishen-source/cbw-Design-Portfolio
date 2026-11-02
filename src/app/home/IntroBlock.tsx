import type { CSSProperties, ReactNode } from 'react';

export function IntroBlock({ label, index, className = '', children }: {
  label: string;
  index: number;
  playing: boolean;
  onFinish: () => void;
  className?: string;
  children: ReactNode;
}) {
  return <div data-intro-block={label} className={`intro-block ${className}`} style={{ '--i': index } as CSSProperties}>
    <div className="intro-real">{children}</div>

  </div>;
}
