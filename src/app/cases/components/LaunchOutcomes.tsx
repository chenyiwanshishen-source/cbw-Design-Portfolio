import { CaseText } from './TodoNote';

export type LaunchOutcomesContent = {
  items: { title: string; before: string; after: string; description: string }[];
  feedback: { title: string; text: string };
};

function OutcomeIllustration({ index }: { index: number }) {
  return <div className="launch-art" aria-hidden="true"><div className={`launch-object-stage launch-object-${index}`}>
    {index === 0 ? <svg className="launch-flip-clock" viewBox="0 0 200 148">
      <defs>
        <linearGradient id="launch-flip-paper" x2=".2" y2="1"><stop stopColor="var(--color-question-paper-back)"/><stop offset="1" stopColor="color-mix(in srgb, var(--color-question-paper-back) 94%, var(--color-text-meta))"/></linearGradient>
        <linearGradient id="launch-flip-frame" x2="1" y2="1"><stop stopColor="var(--color-drafting-line)"/><stop offset="1" stopColor="var(--color-border-tint)"/></linearGradient>
      </defs>
      <g transform="translate(10 9) rotate(-3 90 65)">
        <rect x="0" y="5" width="178" height="125" rx="13" fill="var(--color-border-tint)"/>
        <rect x="3" width="178" height="125" rx="13" fill="url(#launch-flip-frame)"/>
        <rect x="8" y="5" width="80" height="111" rx="9" fill="url(#launch-flip-paper)"/>
        <rect x="95" y="5" width="80" height="111" rx="9" fill="url(#launch-flip-paper)"/>
        <text x="48" y="97" textAnchor="middle" fill="color-mix(in srgb, var(--blue-300) 45%, var(--ink-500))" fontSize="104" fontWeight="600" fontFamily="Arial, sans-serif">2</text>
        <text x="135" y="97" textAnchor="middle" fill="color-mix(in srgb, var(--blue-300) 45%, var(--ink-500))" fontSize="104" fontWeight="600" fontFamily="Arial, sans-serif">0</text>
        <path d="M8 59H88M95 59H175" stroke="var(--color-question-paper-back)" strokeWidth="1.5"/>
        <path d="M8 60H88M95 60H175" stroke="var(--color-text-meta)" strokeOpacity=".3" strokeWidth=".7"/>
        <path d="M9 56V64M87 56V64M96 56V64M174 56V64" stroke="var(--color-text-meta)" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="165" y="110" textAnchor="end" fill="color-mix(in srgb, var(--blue-300) 45%, var(--ink-500))" fontSize="8">MIN</text>
      </g>
    </svg> : index === 1 ? <>
      <svg className="launch-folder-stack" viewBox="0 0 200 148">
        <defs>
          <linearGradient id="launch-folder-paper" x2="0" y2="1"><stop stopColor="var(--color-question-paper-back)"/><stop offset="1" stopColor="color-mix(in srgb, var(--color-text) 15%, var(--color-question-paper-back))"/></linearGradient>
          <linearGradient id="launch-folder-front" x2=".2" y2="1"><stop stopColor="var(--color-accent-soft)"/><stop offset="1" stopColor="color-mix(in srgb, var(--blue-300) 45%, var(--color-border-tint))"/></linearGradient>
        </defs>
        <g transform="translate(29 5) rotate(7 75 53)">
          <path d="M0 18Q0 12 7 12H79L84 2Q85 0 90 0H126Q130 0 132 4L136 12H148Q154 12 154 20V99Q154 106 147 106H7Q0 106 0 99Z" fill="url(#launch-folder-paper)" stroke="var(--color-drafting-line)" strokeWidth="1"/>
          <text x="94" y="11">来源</text>
          <rect x="7" y="27" width="140" height="70" rx="3" fill="var(--color-border-tint)"/>
          <rect x="7" y="24" width="140" height="70" rx="3" fill="var(--color-surface)"/>
          <path d="M0 41H154V99Q154 106 147 106H7Q0 106 0 99Z" fill="url(#launch-folder-paper)"/>
          <path d="M5 42H149" className="launch-folder-edge"/>
        </g>
        <g transform="translate(3 43) rotate(-4 83 46)">
          <path d="M0 17Q0 11 7 11H22L27 2Q28 0 33 0H78Q82 0 84 4L88 11H157Q164 11 164 18V84Q164 92 156 92H8Q0 92 0 84Z" fill="var(--color-border-tint)"/>
          <text x="41" y="11">资料</text>
          <rect x="7" y="24" width="150" height="57" rx="3" fill="var(--color-drafting-line)"/>
          <rect x="7" y="21" width="150" height="57" rx="3" fill="var(--color-surface)"/>
          <path d="M0 35Q0 30 6 30H158Q164 30 164 36V84Q164 92 156 92H8Q0 92 0 84Z" fill="url(#launch-folder-front)" stroke="var(--color-border-tint)" strokeWidth=".8"/>
          <path d="M6 32H158" className="launch-folder-edge"/>
          <path d="M7 88H157" stroke="var(--blue-300)" strokeOpacity=".55"/>
        </g>
      </svg>
    </> : <div className="launch-report-notes"><div className="generator-paper generator-paper-warm"><strong>报告</strong><span className="generator-paper-lines"><i/><i/><i/><i/><i/></span></div></div>}
  </div></div>;
}

export function LaunchOutcomes({ items, feedback }: LaunchOutcomesContent) {
  return <div className="launch-outcomes">
    <div className="launch-timing-grid">{items.map((item, index) => <section className="launch-timing" key={item.title}>
      <OutcomeIllustration index={index} />
      <h3>{item.title}</h3>
      <div className="launch-time-comparison" aria-label={`${item.before}，缩短至${item.after}`}>
        <span className="launch-time-before">{item.before}<span aria-hidden="true"> →</span></span>
        <strong className="launch-time-after">{item.after}</strong>
      </div>
      <p><CaseText text={item.description} /></p>
    </section>)}</div>
    <section className="launch-feedback">
      <span className="launch-quote-tile" aria-hidden="true"><span className="launch-quote-glyph" /></span>
      <div className="launch-feedback-copy"><h3>{feedback.title}</h3><p><CaseText text={feedback.text} /></p></div>
    </section>
  </div>;
}
