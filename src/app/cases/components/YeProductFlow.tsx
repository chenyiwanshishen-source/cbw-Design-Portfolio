import type { ReactNode } from 'react';
import { Sparkles, Bookmark, Globe, MessageCircle, LayoutList, Check, FolderCheck } from 'lucide-react';

function Arrow() {
  return <svg className="generator-arrow" viewBox="0 0 60 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 H57 M51 5 L57 10 L51 15" /></svg>;
}
function Paper({ title, children }: { title: string; children: ReactNode }) {
  return <div className="generator-paper"><strong>{title}</strong>{children}<span className="generator-paper-lines" aria-hidden="true"><i/><i/><i/></span></div>;
}
export function YeProductFlow() {
  return <figure className="ye-product-flow" aria-label="用户提出整理要求，AI 按需调用工具生成方案，用户确认后由插件执行">
    <div className="ye-product-main">
      <Paper title="用户需求"><span>整理这些书签</span></Paper><Arrow />
      <div className="ye-product-ai"><div className="generator-app"><Sparkles aria-hidden="true" /></div><strong>AI</strong><span>理解需求、选择工具</span></div><Arrow />
      <Paper title="方案预览"><LayoutList aria-hidden="true" /></Paper><Arrow />
      <div className="ye-product-ai"><div className="generator-app"><Check aria-hidden="true" /></div><strong>用户确认</strong></div><Arrow />
      <Paper title="应用整理"><FolderCheck aria-hidden="true" /></Paper>
    </div>
    <div className="ye-product-tools"><span className="ye-product-tool-link" aria-hidden="true">↕</span><span>按需调用</span><div>{[{ Icon: Bookmark, text: '读取书签' }, { Icon: Globe, text: '查看网页' }, { Icon: MessageCircle, text: '追问' }, { Icon: LayoutList, text: '生成预览' }].map(({ Icon, text }) => <span key={text}><Icon aria-hidden="true" />{text}</span>)}</div></div>
    <figcaption><strong>插件提供运行环境</strong><span>真实数据</span><span>操作检查</span><span>支持撤销</span><span>保护固定页签</span></figcaption>
  </figure>;
}
