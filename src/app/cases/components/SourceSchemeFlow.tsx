import { AnalysisDimensions } from './AnalysisDimensions';
import { SourcePanelComparison } from './SourcePanelComparison';

export function SourceSchemeFlow({
  paragraph,
  text,
  afterText,
}: {
  paragraph: string;
  text: string;
  afterText: string;
}) {
  return (
    <div className="source-scheme-flow">
      <AnalysisDimensions />
      <div className="case-prose">
        <p className="case-paragraph">{paragraph}</p>
      </div>
      <SourcePanelComparison text={text} afterText={afterText} />
      <svg className="source-scheme-flow-arrow" viewBox="0 0 200 360" fill="none" aria-hidden="true">
        <path d="M12 20 C10 42 68 58 82 36 C100 8 54 16 66 48 C90 140 120 260 186 336 M150 323 Q168 328 190 340 Q180 318 178 299" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
