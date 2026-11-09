import { FigurePlaceholder } from './FigurePlaceholder';

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
  return <><div className="ye-research-layout">
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
    <section className="ye-research-panel ye-research-response ye-research-experience">
      <h3>对竞品进行体验记录</h3>
      <p>我重点体验了<strong>整理效率、操作理解和恢复能力</strong>，据此确定 ye! 的设计方向：用 AI 减少逐条整理，执行前<strong>先预览、再确认</strong>，出错后<strong>可以撤销</strong>，并保护固定页签。</p>
    </section>
    <section className="ye-research-panel ye-research-response ye-research-map">
      <h3>从用户旅程图到架构的定义</h3>
      <p>每次重构的架构都不同，但始终围绕同一个产品目标。</p>
      <a className="ye-research-map-link" href="https://www.figma.com/board/hbQZlaNBcgIqvKo5dwBnsF/Untitled?node-id=0-1" target="_blank" rel="noopener noreferrer">
        <span>查看完整旅程与架构图</span><span aria-hidden="true">→</span>
        <span className="sr-only">（在新标签页打开 FigJam）</span>
      </a>
      <div className="ye-research-map-preview">
        <img src="/images/ye/journey-to-architecture.webp" alt="ye! 从用户旅程、竞品体验到功能定义与 Agent 架构的完整研究画布" width="14000" height="7311" loading="lazy" decoding="async" />
      </div>
    </section>
    </div>
  </div>
    <section className="case-subsection" aria-labelledby="ye-visual-definition-title">
      <h3 id="ye-visual-definition-title">视觉定义</h3>
      <div className="case-prose"><p className="case-paragraph">我沿用了自己在 AI 报告生成项目中总结的一套流程，来生成 ye! 的基础组件内容。</p></div>
      <FigurePlaceholder plate="" title="视觉定义" instruction="【待填：ye! 视觉定义】" caption="" />
    </section>
  </>;
}
