export function ChainUserResearch() {
  return <div className="chain-user-research">
    <div className="chain-user-research-grid">{[1, 2].map(index => <figure key={index}><img src={`${import.meta.env.BASE_URL}images/qixin/user-research-${index}.png`} alt={`用户${index}的基本情况、工作流程、调查发现与设计机会`} loading="lazy" /><figcaption className="text-caption text-text-secondary">用户{index}调查整理</figcaption></figure>)}</div>
    <p className="text-caption text-text-secondary">根据回忆整理，非逐字记录。</p>
  </div>;
}
