import { ReadingText } from './ReadingText';
export function TodoNote({ text }: { text: string }) {
  return <span className="text-caption text-warning" data-todo-note>{text.startsWith('【待填') ? text : `待填：${text}`}</span>;
}
export function CaseText({ text, highlightPhrases = [] }: { text: string; highlightPhrases?: string[] }) {
  const phrase = highlightPhrases.find(value => value && text.includes(value));
  if (phrase) {
    const start = text.indexOf(phrase);
    const remaining = highlightPhrases.filter(value => value !== phrase);
    return <><CaseText text={text.slice(0, start)} highlightPhrases={remaining} /><mark className="case-marker"><ReadingText text={phrase} /></mark><CaseText text={text.slice(start + phrase.length)} highlightPhrases={remaining} /></>;
  }
  // Only local project links are supported; other copy remains plain text.
  const parts = text.split(/(【待填[^】]*】|\[[^\]]+\]\(#\/project\/[a-z0-9/-]+\))/g);
  return <>{parts.map((part, i) => {
    if (part.startsWith('【待填')) return <TodoNote key={i} text={part} />;
    const link = part.match(/^\[([^\]]+)\]\((#\/project\/[a-z0-9/-]+)\)$/);
    return link
      ? <a key={i} href={link[2]} className="underline underline-offset-4"><ReadingText text={link[1]} /></a>
      : <ReadingText key={i} text={part} />;
  })}</>;
}
