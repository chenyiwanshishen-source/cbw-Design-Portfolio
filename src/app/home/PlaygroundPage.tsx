import { useLayoutEffect } from 'react';
import { PlaygroundGallery } from './PlaygroundGallery';

export function PlaygroundPage() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previous = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      html.style.overflow = previous.html;
      body.style.overflow = previous.body;
    };
  }, []);
  return <div className="playground-page"><PlaygroundGallery /></div>;
}
