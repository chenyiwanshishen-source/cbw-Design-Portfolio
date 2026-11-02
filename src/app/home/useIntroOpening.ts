import { useCallback, useEffect, useState } from 'react';

const SESSION_KEY = 'introPlayed';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function shouldPlayFirstVisit() {
  if (window.matchMedia(REDUCED_MOTION).matches) return false;
  try {
    if (window.sessionStorage.getItem(SESSION_KEY)) return false;
    window.sessionStorage.setItem(SESSION_KEY, '1');
    return true;
  } catch {
    // Storage unavailable: show the completed intro immediately.
    return false;
  }
}

export function useIntroOpening(replay: number) {
  const [playing, setPlaying] = useState(shouldPlayFirstVisit);
  const finish = useCallback(() => setPlaying(false), []);

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION);
    const stopIfReduced = () => { if (media.matches) finish(); };
    media.addEventListener('change', stopIfReduced);
    return () => media.removeEventListener('change', stopIfReduced);
  }, [finish]);

  useEffect(() => {
    if (!replay) return;
    setPlaying(false);
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    // Two frames reset CSS animations even when replay is pressed mid-opening.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setPlaying(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [replay]);

  useEffect(() => {
    if (!playing) return;
    const value = getComputedStyle(document.documentElement).getPropertyValue('--intro-max').trim();
    const duration = parseFloat(value) * (value.endsWith('ms') ? 1 : 1000);
    // animationend is the normal path; token-based timeout also handles interrupted animations.
    const timer = window.setTimeout(finish, Number.isFinite(duration) ? duration : 0);
    return () => window.clearTimeout(timer);
  }, [playing, finish]);

  return { playing, finish };
}
