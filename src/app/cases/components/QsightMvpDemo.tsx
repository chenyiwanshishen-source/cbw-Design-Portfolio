import { useEffect, useRef, useState } from 'react';
import { Check, ChevronRight, FileText, Pause, Play, RotateCcw, X } from 'lucide-react';
import './QsightMvpDemo.css';

const stages = ['确定报告条件', '确认写作大纲', '选择数据来源', '生成报告'];
const captions = ['从报告任务开始', '明确报告类型、地区和时间', '先看大纲，再决定怎么写', '生成前选择本次使用的资料', '保存选择，让写作范围有据可依', '按大纲起草，并保留引用', '报告生成完成，可以点开来源核对'];
const materials = [
  { title: '区域经济运行资料', type: '启信数据', detail: '用于梳理区域经济概况与企业分布。' },
  { title: '重点产业发展资料', type: '知识库', detail: '用于了解重点产业与发展方向。' },
  { title: '上一期报告', type: '参考文件', detail: '参考章节结构，不沿用过期数字。' },
];
const initialOutline = ['区域经济概况', '重点产业发展', '企业分布与变化'];
export function QsightMvpDemo() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(!document.hidden);
  const [selected, setSelected] = useState([0, 1]);
  const [draft, setDraft] = useState([0, 1]);
  const [outline, setOutline] = useState(initialOutline);
  const [citation, setCitation] = useState<number | null>(null);
  const [conditions, setConditions] = useState(['', '', '']);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    if (root.current) observer.observe(root.current);
    const visibility = () => setForeground(!document.hidden);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduce = () => { if (media.matches) setPlaying(false); };
    document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', reduce);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); media.removeEventListener('change', reduce); };
  }, []);
  useEffect(() => {
    if (!playing || !visible || !foreground) return;
    if (step === 6 || (step === 3 && !draft.length)) { setPlaying(false); return; }
    const timer = window.setTimeout(() => {
      if (step === 0) setConditions(['区域经济监测', '雄安新区', '2025 年 9 月']);
      if (step === 3) setSelected(draft);
      setStep(step + 1);
    }, [2200, 3000, 4000, 4500, 2600, 3500][step]);
    return () => window.clearTimeout(timer);
  }, [step, playing, visible, foreground, draft]);
  const go = (next: number) => { setPlaying(false); setCitation(null); setStep(next); };
  const replay = () => { setConditions(['', '', '']); setSelected([0, 1]); setDraft([0, 1]); setOutline(initialOutline); setCitation(null); setStep(0); setPlaying(!window.matchMedia('(prefers-reduced-motion: reduce)').matches); };
  const stage = step < 2 ? 0 : step === 2 ? 1 : step < 5 ? 2 : 3;
  return <section ref={root} className="qs-demo" aria-label="Qsight 第一版 MVP 交互演示">
    <header className="qs-demo-heading"><div><span className="qs-demo-eyebrow">Qsight · 第一版 MVP</span><h2>从报告任务，到一份有来源的初稿</h2></div><span className="qs-demo-note">交互演示 · 示例内容</span></header>
    <div className="qs-demo-shell">
      <aside className="qs-demo-sidebar"><strong>Qsight</strong><span className="qs-demo-active">模板报告</span><span>报告帮写</span><div className="qs-demo-history">最近报告<br /><span>区域经济监测</span></div><small>第一版 MVP</small></aside>
      <div className="qs-demo-workspace">
        <ol className="qs-demo-stages">{stages.map((label, index) => <li key={label} aria-current={index === stage ? 'step' : undefined}><span>{index < stage ? <Check size={14} /> : index + 1}</span>{label}</li>)}</ol>
        <div className="qs-demo-scene" key={step}>
          {step < 2 ? <div className="qs-demo-start"><span className="qs-demo-wordmark">Qsight 报告</span><p>先确定这次报告要写什么</p><div className="qs-demo-fields">{['报告类型', '地区', '报告时间'].map((label, i) => <label key={label}>{label}<select value={conditions[i]} onChange={e => { setPlaying(false); setConditions(values => values.map((v, j) => j === i ? e.target.value : v)); }}><option value="">请选择{label}</option><option>{['区域经济监测', '雄安新区', '2025 年 9 月'][i]}</option></select></label>)}</div><button className="qs-demo-primary" disabled={conditions.some(v => !v)} onClick={() => go(2)}>生成大纲 <ChevronRight size={16} /></button><small>报告用途和范围由上游确定，系统记录本次要求。</small></div>
          : step === 3 ? null : step < 5 ? <div className="qs-demo-outline"><div className="qs-demo-context">区域经济监测 / 雄安新区 / 2025 年 9 月</div><div className="qs-demo-section-heading"><h3>报告大纲</h3><button onClick={() => { setDraft(selected); go(3); }}>数据来源 · {selected.length} 份</button></div><p>确认章节结构，再选择本次写作使用的资料。</p>{outline.map((title, i) => <label className="qs-demo-chapter" key={i}><span>0{i + 1}</span><input aria-label={`第 ${i + 1} 章标题`} value={title} onChange={e => { setPlaying(false); setOutline(rows => rows.map((v, j) => j === i ? e.target.value : v)); }} /><FileText size={18} /></label>)}<button className="qs-demo-primary" onClick={() => { if (step === 2) { setDraft(selected); go(3); } else go(5); }}>{step === 2 ? '选择数据来源' : '基于大纲生成报告'}<ChevronRight size={16} /></button>{step === 4 && <small className="qs-demo-saved"><Check size={16} />已保存 {selected.length} 份资料，生成时仅使用本次选择。</small>}</div>
          : step === 5 ? <div className="qs-demo-generating"><div className="qs-demo-loader" /><h3>正在起草报告</h3><p>按已确认的大纲整理 {selected.length} 份资料</p><div className="qs-demo-generation-steps"><span><Check size={16} />读取所选资料</span><span><Check size={16} />对应章节与来源</span><span>正在整理正文…</span></div><button onClick={() => go(6)}>查看生成结果</button></div>
          : <div className="qs-demo-result"><div className="qs-demo-result-heading"><span><Check size={16} />报告已生成</span><button onClick={() => go(4)}>返回大纲</button></div><article><span className="qs-demo-context">区域经济监测 · 2025 年 9 月</span><h3>雄安新区区域经济监测报告</h3>{outline.map((title, i) => <section key={i}><h4>{i + 1}. {title}</h4><p>{['本章围绕区域经济运行情况展开，结合本次选用的资料，整理观察范围与分析口径。', '围绕重点产业梳理发展情况，区分资料中的事实与后续需要核实的判断。', '结合企业相关资料整理分布情况。缺少依据的数字不作补写，保留待补充的位置。'][i]} <button className="qs-demo-citation" onClick={() => { setPlaying(false); setCitation(selected[i % selected.length]); }} aria-label={`查看第 ${i + 1} 章来源`}>[{i % selected.length + 1}]</button></p></section>)}{citation !== null && <aside className="qs-demo-source-preview"><button aria-label="关闭来源" onClick={() => setCitation(null)}><X size={16} /></button><span>{materials[citation].type} · 来源示例</span><strong>{materials[citation].title}</strong><p>{materials[citation].detail}</p></aside>}<small>演示文本，不包含真实业务数据；引用展示的是资料对应关系。</small></article></div>}
        </div>
        {step === 3 && <div className="qs-demo-source-layer"><section className="qs-demo-source-panel" aria-label="选择本次数据来源"><div className="qs-demo-section-heading"><h3>数据来源</h3><button aria-label="取消选择数据来源" onClick={() => go(2)}><X size={20} /></button></div><p>选择本次报告使用的资料，避免大纲正确、数据却不合适。</p>{materials.map((source, i) => <label className="qs-demo-source" key={source.title}><FileText size={22} /><span><strong>{source.title}</strong><small>{source.type} · {source.detail}</small></span><input type="checkbox" checked={draft.includes(i)} onChange={() => { setPlaying(false); setDraft(rows => rows.includes(i) ? rows.filter(n => n !== i) : [...rows, i]); }} /></label>)}<footer><span>已选 {draft.length} 份</span><button onClick={() => go(2)}>取消</button><button className="qs-demo-primary" disabled={!draft.length} onClick={() => { setSelected(draft); go(4); }}>保存选择</button></footer></section></div>}
      </div>
    </div>
    <footer className="qs-demo-controls"><div><span className="qs-demo-counter">0{stage + 1} / 04</span><span>{captions[step]}</span></div><div><button aria-label={playing ? '暂停演示' : '播放演示'} onClick={() => { if (step === 6) replay(); else setPlaying(v => !v); }}>{playing ? <Pause size={17} /> : <Play size={17} />}{playing ? '暂停' : '播放'}</button><button onClick={replay}><RotateCcw size={16} />重播</button>{step < 6 && <button onClick={() => { if (step === 0) setConditions(['区域经济监测', '雄安新区', '2025 年 9 月']); if (step === 3) { if (!draft.length) return; setSelected(draft); } go(step + 1); }} disabled={step === 3 && !draft.length} aria-label="下一步演示"><ChevronRight size={18} /></button>}</div></footer>
    <p className="qs-demo-footnote">按当时的 MVP 页面重建，演示节奏经过压缩；可暂停、修改大纲和选择资料，报告内容为示例，不代表真实生成结果。</p>
  </section>;
}
