import { Fragment, useEffect, useRef, useState } from 'react';
import { intro } from './content/zh';
import { Blueprint } from './Blueprint';
import { IntroBlock } from './IntroBlock';
import { useIntroOpening } from './useIntroOpening';

export function Intro({ replay }: { replay: number }) {
  const { playing, finish } = useIntroOpening(replay);
  const blockProps = { playing, onFinish: finish };
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; clearTimeout(copyTimer.current); };
  }, []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(intro.email);
      if (!mounted.current) return;
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1600);
    } catch { /* 邮箱仍可选中；剪贴板不可用时静默。 */ }
  }
  function paragraph(text: string) {
    return text.split(/(合合信息|郑州轻工业大学|上海|18101767127@163.com|chenbw0610|下载我的简历)/g).map((part, index) => {
      if (part === intro.email) return <span key={index} className="relative"><button type="button" onClick={copyEmail} className="home-inline home-target select-text">{part}</button><span role="status" className="home-copy-status font-sans text-caption text-accent">{copied ? '已复制' : ''}</span></span>;
      // [待填：简历 PDF 链接]
      if (part === '下载我的简历') return <a key={index} href="#" className="home-inline home-target inline-flex items-center">{part}</a>;
      if (part === '郑州轻工业大学' || part === '上海') return <span key={index} className="border-b border-dotted border-text-display-muted">{part}</span>;
      if (part === '合合信息' || part === 'chenbw0610') return <span key={index} className="border-b border-border text-text">{part}</span>;
      return <Fragment key={index}>{part}</Fragment>;
    });
  }
  return (
    <section id="intro" aria-label="个人介绍" className={`intro-stage relative grid grid-cols-1 items-start gap-6 py-16 lg:grid-cols-12${playing ? " is-opening" : ""}`}>
      <div className="home-intro-text flex min-w-0 flex-col gap-8 lg:col-span-8">
        <IntroBlock label="LABEL" index={0} {...blockProps}><p className="text-lead font-medium text-text-secondary">{intro.greeting}</p></IntroBlock>
        <IntroBlock label="TITLE" index={1} {...blockProps}><div className="flex flex-col gap-4">
          <h1 className="home-name font-normal">{intro.name}<span className="home-romanized font-normal text-text-secondary">{intro.romanizedName}</span></h1>
          <p className="home-role text-text">{intro.role}</p>
        </div></IntroBlock>
        <IntroBlock label="COPY" index={2} {...blockProps}><div className="flex max-w-measure flex-col gap-5 text-body-lg text-text-body">
          {intro.paragraphs.map((text) => <p key={text} data-intro-paragraph>{paragraph(text)}</p>)}
        </div></IntroBlock>
        <IntroBlock label="META" index={3} {...blockProps}><p className="text-caption text-text-meta">{intro.updated}</p></IntroBlock>
      </div>
      <IntroBlock label="PLATE" index={2} className="home-photo min-w-0 lg:col-span-4" {...blockProps}><figure className="flex min-w-0 flex-col gap-3">
        <div className="home-portrait flex items-center justify-center border border-border bg-surface-sunken p-6 font-mono text-micro text-text-meta">替换为你的照片</div>
        <figcaption className="font-mono text-label text-text-meta">PLATE 01 · 人像 · 4:5</figcaption>
      </figure></IntroBlock>
      {playing && <Blueprint onFinish={finish} />}
    </section>
  );
}
