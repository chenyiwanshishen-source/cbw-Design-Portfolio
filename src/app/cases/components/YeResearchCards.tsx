const reviews = [
  { product: 'Tab Session Manager', rating: null, text: '保存的会话只能删链接，无法拖动排序或补入页签。', source: 'https://chrome-stats.com/d/iaiomicjabeggjcfkbimgmglanimpnae/reviews', date: '2026-10-05' },
  { product: 'Tab Space', rating: 3, text: '恢复后没有保留原来的窗口分组，还得手动重新整理。', source: 'https://apps.apple.com/us/app/tab-space/id1473726602?mt=12&platform=mac&see-all=reviews', date: '2020-03-11' },
  { product: 'Tab Session Manager', rating: null, text: '缺少入门引导，不知道该点哪个按钮，重命名也难找。', source: 'https://chrome-stats.com/d/iaiomicjabeggjcfkbimgmglanimpnae/reviews', date: '2026-10-02' },
  { product: 'Bookmark Sidebar', rating: null, text: '设置太复杂，难以调整成自己需要的方式。', source: 'https://chrome-stats.com/d/jdbnofccmhefkmjbkkdkfiicjkgofkdh/reviews', date: '2026-08-06' },
  { product: 'Workona', rating: null, text: '分组内外的页面切换比较复杂。', source: 'https://chrome-stats.com/d/ailcmbgekjpnablpdkmaaccecekgdhlh/reviews', date: '2026-09-28' },
  { product: 'Tabby', rating: 1, text: '更新后必须打开独立窗口，原来顺手的菜单栏操作没了。', source: 'https://apps.apple.com/us/app/tabby-browser-tab-manager/id1586203406?mt=12', date: '2025-06-08', followup: '开发者已提供 Classic 版本。' },
  { product: 'Tab Session Manager', rating: null, text: '分组没有保存，部分页签恢复失败，只能手动重新打开。', source: 'https://chrome-stats.com/d/iaiomicjabeggjcfkbimgmglanimpnae/reviews', date: '2026-10-20' },
  { product: 'Tab Space', rating: 1, text: '希望在当前网页直接选择保存位置，不用先打开管理空间。', source: 'https://apps.apple.com/us/app/tab-space/id1473726602?mt=12&platform=mac&see-all=reviews', date: '2026-04-05', followup: '开发者回复：已恢复该入口。' },
];

export function YeResearchCards() {
  return <div className="ye-research-layout">
    <section className="ye-research-panel ye-research-evidence">
      <h3>同类产品的用户反馈</h3>
      <p className="ye-research-intro">App Store 与 Chrome 商店评论中的三类问题：</p>
      <ul className="ye-review-themes">
        <li>整理方式受限，<strong>仍需手动调整</strong></li>
        <li>入口和设置复杂，<strong>操作不够直观</strong></li>
        <li>恢复后分组丢失，<strong>需要重新整理</strong></li>
      </ul>
      <div className="ye-review-wall">{[0, 1, 2].map(column => <div className="ye-review-column" key={column}>{reviews.filter((_, index) => index % 3 === column).map(review => <article className="ye-review-card" key={review.product + review.date}>
        <p>{review.text}</p>
        <span className="ye-review-product">{review.product}</span>
      </article>)}</div>)}</div>
    </section>
    <div className="ye-research-response-stack">
    <section className="ye-research-panel ye-research-response">
      <h3>把问题对应到 ye! 的设计</h3>
      <p>重点放在减少手动整理、让用户看懂操作，以及出错后能够回退。</p>
    </section>
    <section className="ye-research-panel ye-research-response">
      <dl>
        <div><dt>整理依赖逐条操作</dt><dd>用自然语言说明需求，AI 读取内容并提出整理方案。</dd></div>
        <div><dt>操作入口和结果难理解</dt><dd>在工作台查看内容、继续对话，先检查方案再确认执行。</dd></div>
        <div><dt>整理后需要恢复</dt><dd>提供最近五步书签变更的撤销，并保护固定页签。</dd></div>
      </dl>
      <p className="ye-review-note">这些是已实现的设计回应；跨端同步、长期数据安全和整体性能仍需单独验证。</p>
    </section>
    </div>
    <section className="ye-research-panel ye-research-journey">
      <h3>用户旅程图</h3>
      <p>【待填：ye! 用户旅程图】</p>
    </section>
  </div>;
}
