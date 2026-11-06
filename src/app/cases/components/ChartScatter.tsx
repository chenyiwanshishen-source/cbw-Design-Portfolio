import { AnimatedDonutChart } from './AnimatedDonutChart';
import { AnimatedBarChart } from './AnimatedBarChart';
import { AnimatedVectorChart } from './AnimatedVectorChart';
import type { FigureContent } from './FigurePlaceholder';
export function ChartScatter({ figures }: { figures: FigureContent[] }) {
  const render = (index: number) => {
    const figure = figures.find(f => f.src?.endsWith(`components-chart-${index}.webp`));
    return <div className={`chart-gallery-panel chart-gallery-panel-${index}`} key={index} aria-label={figure?.alt || figure?.title}>
      {index === 1 ? <AnimatedDonutChart /> : index === 5 ? <AnimatedBarChart /> : <AnimatedVectorChart index={index} />}
    </div>;
  };
  return <div className="chart-gallery">
    <div className="chart-gallery-grid chart-gallery-composition"><div className="chart-gallery-column">{[0, 5, 3].map(render)}</div><div className="chart-gallery-column">{[1, 7, 4].map(render)}</div></div>
    <details className="chart-gallery-more"><summary>更多图表</summary><div className="chart-gallery-grid">{[2, 6, 8].map(render)}</div></details>
  </div>;
}
