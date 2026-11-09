import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, CircleHelp } from 'lucide-react';
import './clarification-demo.css';

const examples = [
  { request: '帮我整理一下书签', question: '希望整理哪些书签？', options: ['全部书签', '未分组书签'] },
  { request: '把这些页面整理一下', question: '你说的是哪个窗口的页签？', options: ['当前窗口', '所有窗口'] },
  { request: '帮我保存这些页面', question: '想把这些页面收藏到哪里？', options: ['选择已有分组', '新建一个分组'] },
];

export function ClarificationDemo() {
  const [example, setExample] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const current = examples[example];
  return <div className="clarification-demo">
    <div className="clarification-examples" role="group" aria-label="模拟提问">
      {examples.map((item, index) => <button type="button" key={item.request} aria-pressed={example === index} onClick={() => { setExample(index); setSelected(null); setCollapsed(false); }}>{item.request}</button>)}
    </div>
    <div className="clarification-question">
      <button className="clarification-heading" type="button" aria-expanded={!collapsed} onClick={() => setCollapsed(value => !value)}><CircleHelp size={16} /><span>{current.question}</span>{collapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
      {!collapsed && <div role="radiogroup" aria-label={current.question}>{current.options.map((option, index) => <button className="clarification-option" type="button" role="radio" aria-checked={selected === index} key={option} onClick={() => setSelected(index)}><span className="clarification-number">{index + 1}</span><span>{option}</span><span className="clarification-check">{selected === index && <Check size={12} />}</span></button>)}</div>}
    </div>
  </div>;
}
