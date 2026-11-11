import { CaseText } from './TodoNote';

export function SourcePanelComparison({ text, afterText }: { text: string; afterText: string }) {
  const base = `${import.meta.env.BASE_URL}images/qsight/`;
  return (
    <figure className="source-panel-comparison" aria-label="数据来源改版前后对比">
      <div className="source-panel-comparison-old">
        <p className="source-panel-comparison-label">before</p>
        <p className="source-panel-comparison-text">{text}</p>
        <img
          src={`${base}source-panel-old.webp`}
          width={2020}
          height={1416}
          alt="改版前的知识库弹窗，每条来源显示两行摘要"
          loading="lazy"
        />
      </div>
      <div className="source-panel-comparison-current">
        <p className="source-panel-comparison-label">after</p>
        <p className="source-panel-comparison-text"><CaseText text={afterText} highlightPhrases={["按可信度对信息来源分层"]} /></p>
        <img
          src={`${base}source-panel.webp`}
          width={2880}
          height={1800}
          alt="改版后的数据来源抽屉，可按类型筛选并勾选进入生成的来源"
          loading="lazy"
        />
      </div>
    </figure>
  );
}
