import { Fragment } from 'react';
export function TodoNote({ text }: { text: string }) {
  return <span className="text-caption text-warning" data-todo-note>{text.startsWith('【待填') ? text : `待填：${text}`}</span>;
}
export function CaseText({ text }: { text: string }) {
  // Only local project links are supported; other copy remains plain text.
  const parts = text.split(/(【待填[^】]*】|\[[^\]]+\]\(#\/project\/[a-z0-9/-]+\))/g);
  return <>{parts.map((part, i) => {
    if (part.startsWith('【待填')) return <TodoNote key={i} text={part} />;
    const link = part.match(/^\[([^\]]+)\]\((#\/project\/[a-z0-9/-]+)\)$/);
    return link
      ? <a key={i} href={link[2]} className="underline underline-offset-4">{link[1]}</a>
      : <Fragment key={i}>{part}</Fragment>;
  })}</>;
}
