export function ChainUserResearch() {
  return <div className="chain-user-research">
    <ul className="chain-research-points">
      <li>交付结果还有细节需要调整，但用户无法自己充分修改。</li>
      <li>名单里有不需要的企业，也有希望补充的企业，增删仍依赖内部处理。</li>
    </ul>
    <div className="chain-user-research-grid">{[1, 2].map(index => <figure key={index}><img src={`${import.meta.env.BASE_URL}images/qixin/user-research-${index}.webp`} alt={`用户${index}的基本情况、工作流程、调查发现与设计机会`} loading="lazy" /><figcaption className="text-caption text-text-secondary">用户{index}调查整理</figcaption></figure>)}</div>
    <div className="chain-research-opportunities"><h4 className="text-body font-medium">设计整理共性</h4><ul className="chain-research-points">
      <li>让用户直接调整产业环节和上下游，继续修改交付后的细节。</li>
      <li>在节点下查看企业名单，自行添加需要的企业、移除不需要的企业。</li>
      <li>让用户持续维护产业链，减少小改动对内部配置的依赖。</li>
    <li><strong><mark className="case-marker">最大的问题是用户没有安全感，觉得我们不会为他们投入很多时间。</mark></strong>长期的等待和反复沟通，会逐渐消磨用户的信任与耐心；我们团队也会在反复处理和调整中失去耐心。</li></ul></div>
  </div>;
}
