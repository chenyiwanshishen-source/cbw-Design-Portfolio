const feedback = [
  { text: 'AI 能不能给出合理的内容', context: '参与者 · 生成内容质量' },
  { text: '能不能把结果保存为模版', context: '参与者 · 模板保存与选择' },
  { text: '数据维度和数据的准确性高不高', context: '参与者 · 数据准确性' },
  { text: '能不能上传私有数据，并保证数据安全', context: '参与者 · 私有数据与安全' },
  { text: '联网搜索的信息来源是否准确', context: '同事 · 联网搜索来源' },
  { text: '实际上线后，报告生成效率怎么样', context: '参与者 · 上线后的实际效率' },
  { text: '生成的报告有没有办法分享', context: '参与者 · 报告分享' },
];

export function TestFeedbackBubbles() {
  return <figure className="case-test-feedback">
    <ul className="case-feedback-cloud">
      {feedback.map(({ text, context }) => <li key={text} tabIndex={0}>
        <p>{text}</p>
        <span className="case-feedback-speaker">{context}</span>
      </li>)}
    </ul>
  </figure>;
}
