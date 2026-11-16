import { ArrowUpRight } from 'lucide-react';
import './playground-entry.css';

export function PlaygroundEntry() {
  return <section id="playground" className="home-section" aria-labelledby="playground-entry-title">
    <a className="playground-entry" href="#/playground">
      <div>
        <div className="playground-entry-heading">
          <h2 id="playground-entry-title" className="text-h2 font-normal">更多作品</h2>
          <span className="playground-entry-action">查看作品<ArrowUpRight size={18} aria-hidden="true" /></span>
        </div>
        <p>界面设计 · 数据可视化</p>
      </div>
    </a>
  </section>;
}
