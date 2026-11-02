export function Quote({ text }: { text: string }) {
  return <blockquote className="border-l-2 border-accent pl-4 text-body text-text">{text}</blockquote>;
}
