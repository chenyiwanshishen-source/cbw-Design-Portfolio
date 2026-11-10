import { useEffect } from 'react';
import { qixin } from './content/qixin';
import { CaseLayout } from './components/CaseLayout';
import { CaseHeader } from './components/CaseHeader';
import { CaseToc } from './components/CaseToc';
import { CaseSection } from './components/CaseSection';
import { CaseBlocks } from './CaseBlocks';
import './qixin.css';

export function QixinCase() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return <CaseLayout backLabel={qixin.ui.back} footer={<span className="text-caption text-text-meta">{qixin.ui.footer}</span>}>
    <div className="qixin-case">
      <CaseHeader content={qixin.header} compact />
      <figure className="qixin-cover-collage" aria-label="启信产业大脑网页端与移动端设计展示">
        {[
          { src: 'home-cover.webp', alt: '首页工作台图表', column: 0, row: 0, mobile: false },
          { src: 'cover-0.webp', alt: '园区招商', column: 0, row: 47, mobile: false },
          { src: 'cover-park-companies.webp', alt: '园区详情企业列表', column: 38, row: -12, mobile: false },
          { src: 'cover-1.webp', alt: '园区数据与地图', column: 38, row: 12.5, mobile: false },
          { src: 'cover-2.webp', alt: '关系触达', column: 38, row: 37, mobile: false },
          { src: 'cover-mobile-0.webp', alt: '移动端监控概览', column: 76, row: -4, mobile: true },
          { src: 'cover-mobile-1.webp', alt: '移动端舆情详情', column: 76, row: 37.1, mobile: true },
          { src: 'cover-mobile-2.webp', alt: '移动端园区企业列表', column: 96, row: -22, mobile: true },
          { src: 'cover-mobile-3.webp', alt: '移动端舆情列表', column: 96, row: 19.1, mobile: true },
          { src: 'cover-mobile-dynamic.webp', alt: '移动端动态详情', column: 96, row: 60.1, mobile: true },
        ].map((image, index) => {
          const angle = -14 * Math.PI / 180;
          const x = -22 + image.column * Math.cos(angle) - image.row * Math.sin(angle);
          const y = 10 + image.column * Math.sin(angle) + image.row * Math.cos(angle);
          return <img key={index} src={`${import.meta.env.BASE_URL}images/qixin/${image.src}`} alt={image.alt} style={{ left: `${x}%`, top: `${y}cqw`, width: image.mobile ? '18%' : index === 0 ? '30%' : '36%' }} />;
        })}
      </figure>
      <div className="case-body">
        <CaseToc items={qixin.toc} label={qixin.ui.toc} />
        <div className="case-chapters">{qixin.chapters.map(chapter => <CaseSection key={chapter.id} id={chapter.id} label={chapter.label} title={chapter.title}><CaseBlocks blocks={chapter.blocks} labels={qixin.ui} /></CaseSection>)}</div>
      </div>
      <nav className="case-switch">
        <a href="#/project/ai-report"><span className="text-caption text-text-meta">{qixin.ui.previous}</span><span className="text-h4 font-normal">{qixin.ui.previousTitle}</span></a>
        <a href="#/project/ye-browser"><span className="text-caption text-text-meta">{qixin.ui.next}</span><span className="text-h4 font-normal">{qixin.ui.nextTitle}</span></a>
      </nav>
    </div>
  </CaseLayout>;
}
