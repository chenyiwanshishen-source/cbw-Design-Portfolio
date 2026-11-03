import { useEffect, useRef, useState } from 'react';
import { ReadingText } from '../cases/components/ReadingText';
import { intro } from './content/zh';
import { GameBoyPortrait } from './GameBoyPortrait';
import { IntroBlock } from './IntroBlock';

export function Intro() {
  const blockProps = { playing: false, onFinish: () => {} };
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
    return text.split(/(合合信息|郑州轻工业大学|上海|18101767127@163.com，|chenbw0610|下载我的简历)/g).map((part, index) => {
      if (part === `${intro.email}，`) return <span key={index} className="relative home-contact-token"><button type="button" onClick={copyEmail} className="home-inline select-text">{intro.email}</button><span role="status" className="home-copy-status font-sans text-caption text-accent">{copied ? '已复制' : ''}</span>，</span>;
      // [待填：简历 PDF 链接]
      if (part === '下载我的简历') return <a key={index} href="#" className="home-inline">{part}</a>;
      if (part === '郑州轻工业大学' || part === '上海') return <span key={index} className="border-b border-dotted border-text-display-muted">{part}</span>;
      if (part === '合合信息' || part === 'chenbw0610') return <span key={index} className="border-b border-border text-text">{part}</span>;
      return <ReadingText key={index} text={part} />;
    });
  }
  return (
    <section id="intro" aria-label="个人介绍" className={`intro-stage relative grid grid-cols-1 items-start gap-6 py-16 lg:grid-cols-12`}>
      <div className="home-intro-text flex min-w-0 flex-col gap-8 lg:col-span-8">
        <IntroBlock label="LABEL" index={0} {...blockProps}><p className="text-lead font-medium text-text-secondary">{intro.greeting}</p></IntroBlock>
        <IntroBlock label="TITLE" index={1} {...blockProps}><div className="home-title-group">
          <h1 className="home-name font-normal">{intro.name}</h1>
          <p className="home-role text-text">{intro.role.split(/(B 端|AI 产品|产品设计师)/g).map((part, index) => <span className="home-role-phrase" key={index}>{part}</span>)}</p>
        </div></IntroBlock>
        <IntroBlock label="COPY" index={2} {...blockProps}><div className="home-bio text-body text-text-body">
          {intro.paragraphs.map((text) => <p key={text} data-intro-paragraph>{paragraph(text)}</p>)}
        </div></IntroBlock>
      </div>
      <IntroBlock label="PLATE" index={2} className="home-photo min-w-0 lg:col-span-4" {...blockProps}><GameBoyPortrait /></IntroBlock>
    </section>
  );
}
