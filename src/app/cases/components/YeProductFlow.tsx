import { Bookmark, Globe, MessageCircle, LayoutList, Check, SlidersHorizontal, Paperclip, ArrowRight } from 'lucide-react';

function Arrow() {
  return <svg className="generator-arrow" viewBox="0 0 60 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 H57 M51 5 L57 10 L51 15" /></svg>;
}
export function YeProductFlow() {
  return <figure className="ye-product-flow" aria-label="用户提出整理要求，AI 按需调用工具生成方案，等待用户确认">
    <div className="ye-product-main">
      <div className="ye-product-request"><span>用户需求</span><div className="ye-product-composer"><div className="ye-product-composer-prompt"><span>书签</span><em>整理这些书签…</em></div><div className="ye-product-composer-toolbar"><SlidersHorizontal aria-hidden="true" /><Paperclip aria-hidden="true" /><span className="ye-product-composer-send"><ArrowRight aria-hidden="true" /></span></div></div></div><Arrow />
      <div className="ye-product-ai"><div className="ye-product-models">{[['Claude', 'claude'], ['Gemini', 'gemini'], ['Codex', 'codex']].map(([name, file]) => <span className="ye-collaboration-logo" key={file}><img src={`${import.meta.env.BASE_URL}images/qsight/brands/${file}-color.svg`} alt={name} width="40" height="40" /></span>)}</div><strong>AI</strong><span>理解需求、选择工具</span></div><Arrow />
      <div className="ye-product-plan-card"><LayoutList aria-hidden="true" /><strong>方案预览</strong></div><Arrow />
      <div className="ye-product-ai"><div className="generator-app"><Check aria-hidden="true" /></div><strong>用户确认</strong></div>
    </div>
    <div className="ye-product-tools"><span className="ye-product-tool-link" aria-hidden="true">↕</span><span>按需调用</span><div>{[{ Icon: Bookmark, text: '读取书签' }, { Icon: Globe, text: '查看网页' }, { Icon: MessageCircle, text: '追问' }, { Icon: LayoutList, text: '生成预览' }].map(({ Icon, text }) => <span key={text}><Icon aria-hidden="true" />{text}</span>)}</div></div>
    <figcaption><strong>插件提供运行环境</strong><span>真实数据</span><span>操作检查</span><span>支持撤销</span><span>保护固定页签</span></figcaption>
  </figure>;
}
