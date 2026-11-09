const reviews = [
  { product: 'Anybox', rating: 1, text: '给多条链接打标签仍要逐条操作，整理耗时。', date: '2026.06', id: '1593408455', region: 'us' },
  { product: 'Raindrop', rating: 3, text: '批量收藏时没有延续上次分类，需要反复设置。', date: '2024.06', id: '1021913807', region: 'us' },
  { product: 'Anybox', rating: 1, text: '添加链接的入口不明显，简单操作也难找到。', date: '2024.05', id: '1593408455', region: 'us' },
  { product: 'Cubox', rating: 3, text: '进入收藏默认落到未读，需要返回才能查看全部。', date: '2025.12', id: '1113361350', region: 'cn' },
  { product: 'Raindrop', rating: 3, text: '标签输入和自动补全有延迟，打断操作。', date: '2026.08', id: '1021913807', region: 'us' },
  { product: 'Anybox', rating: 1, text: '两端显示已同步，新增书签却没有出现在另一端。', date: '2024.12', id: '1593408455', region: 'us' },
  { product: 'GoodLinks', rating: 2, text: '浏览器扩展反复退出登录，中断收藏流程。', date: '2026.06', id: '1474335294', region: 'us' },
  { product: 'Cubox', rating: 2, text: '批量删除、标记已读没有响应。', date: '2026.03', id: '1113361350', region: 'cn' },
];

export function YeResearchCards() {
  return <div className="ye-research-layout">
    <section className="ye-research-panel">
      <h3>我查看了同类产品的用户评论</h3>
      <p>从 App Store 和 Chrome 网上应用店的评论中，梳理收藏、整理和找回内容时遇到的问题。</p>
      <p className="ye-review-note">用户评论摘译 · 包含历史版本反馈</p>
      <div className="ye-review-wall">{reviews.map((review, index) => <article className="ye-review-card" key={index}>
        <span className="ye-review-stars" aria-label={`${review.rating} 星，共 5 星`}>{Array.from({ length: 5 }, (_, i) => <span key={i} className={i < review.rating ? 'is-rated' : undefined} aria-hidden="true">★</span>)}</span>
        <p>{review.text}</p>
        <span className="ye-review-product">{review.product}</span>
      </article>)}</div>
    </section>
    <section className="ye-research-panel ye-research-response">
      <h3>把问题对应到 ye! 的设计</h3>
      <p>重点放在减少手动整理、让用户看懂操作，以及出错后能够回退。</p>
      <dl>
        <div><dt>整理依赖逐条操作</dt><dd>用自然语言说明需求，AI 读取内容并提出整理方案。</dd></div>
        <div><dt>操作入口和结果难理解</dt><dd>在工作台查看内容、继续对话，先检查方案再确认执行。</dd></div>
        <div><dt>整理后需要恢复</dt><dd>提供最近五步书签变更的撤销，并保护固定页签。</dd></div>
      </dl>
      <p className="ye-review-note">这些是已实现的设计回应；跨端同步、长期数据安全和整体性能仍需单独验证。</p>
    </section>
    <section className="ye-research-panel ye-research-journey">
      <h3>用户旅程图</h3>
      <p>【待填：ye! 用户旅程图】</p>
    </section>
  </div>;
}
