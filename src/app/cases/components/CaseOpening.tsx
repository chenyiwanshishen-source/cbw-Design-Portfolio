import type { CaseContent } from '../types';
import { CaseBlocks } from '../CaseBlocks';
import '../qixin.css';
export function CaseOpening({ content }: { content: CaseContent }) {
  return <div className="case-opening">
    {!!content.timeline?.length && <ol className="qixin-timeline case-opening-timeline" aria-label="项目时间轴">{content.timeline.map(text => <li key={text}>{text}</li>)}</ol>}
    <CaseBlocks blocks={content.opening ?? []} labels={content.ui} />
  </div>;
}
