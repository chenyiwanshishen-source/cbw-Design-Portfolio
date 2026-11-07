import { ReadingText } from './ReadingText';
export function TodoNote({ text }: { text: string }) {
  return <span className="text-caption text-warning" data-todo-note>{text.startsWith('【待填') ? text : `待填：${text}`}</span>;
}
export function CaseText({ text, highlightPhrases = [], blueHighlightPhrases = [] }: { text: string; highlightPhrases?: string[]; blueHighlightPhrases?: string[] }) {
  const bold = text.match(/\*\*(.+?)\*\*/);
  if (bold && bold.index !== undefined) return <><CaseText text={text.slice(0, bold.index)} highlightPhrases={highlightPhrases} blueHighlightPhrases={blueHighlightPhrases} /><strong><ReadingText text={bold[1]} /></strong><CaseText text={text.slice(bold.index + bold[0].length)} highlightPhrases={highlightPhrases} blueHighlightPhrases={blueHighlightPhrases} /></>;
  const bluePhrase = blueHighlightPhrases.find(value => value && text.includes(value));
  if (bluePhrase) {
    const start = text.indexOf(bluePhrase);
    const remaining = blueHighlightPhrases.filter(value => value !== bluePhrase);
    return <><CaseText text={text.slice(0, start)} highlightPhrases={highlightPhrases} blueHighlightPhrases={remaining} /><mark className="case-marker case-marker-blue"><ReadingText text={bluePhrase} /></mark><CaseText text={text.slice(start + bluePhrase.length)} highlightPhrases={highlightPhrases} blueHighlightPhrases={remaining} /></>;
  }
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
