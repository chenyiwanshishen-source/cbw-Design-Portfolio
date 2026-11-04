const feedback = [
  { text: '为什么要先选条件，不能直接输入报告要求？', context: '参与者 · 首屏条件选择' },
  { text: '生成的大纲能直接修改吗？', context: '参与者 · 大纲确认与修改' },
  { text: '整个流程有点长，能不能简化？', context: '参与者 · 完整报告流程' },
  { text: '能不能提供现成模板，选好后再调整？', context: '参与者 · 开始报告与修改' },
  { text: '能不能先列出常用的数据维度，供我们选择？', context: '参与者 · 数据维度设置' },
  { text: '“添加参考”是用来上传本地文件的吗？', context: '参与者 · 本地资料上传' },
  { text: '联网搜索能搜什么，结果怎么用？', context: '同事 · 数据来源中的搜索' },
  { text: '正式使用时，也能这么快生成报告吗？', context: '参与者 · 报告生成速度' },
  { text: '报告生成后，怎么分享给别人？', context: '参与者 · 报告分享' },
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
