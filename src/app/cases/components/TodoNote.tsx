import { Fragment } from 'react';
export function TodoNote({ text }: { text: string }) {
  return <span className="text-caption text-warning" data-todo-note>{text.startsWith('【待填') ? text : `待填：${text}`}</span>;
}
export function CaseText({ text }: { text: string }) {
  return <>{text.split(/(【待填[^】]*】)/g).map((part, i) => <Fragment key={i}>{part.startsWith('【待填') ? <TodoNote text={part} /> : part}</Fragment>)}</>;
}
