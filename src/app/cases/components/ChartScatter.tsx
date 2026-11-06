import { AnimatedDonutChart } from './AnimatedDonutChart';
import { AnimatedBarChart } from './AnimatedBarChart';
import { AnimatedVectorChart } from './AnimatedVectorChart';
import type { CSSProperties } from 'react';
import type { FigureContent } from './FigurePlaceholder';
export function ChartScatter({ figures }: { figures: FigureContent[] }) {
  const render = (index: number) => {
    const figure = figures.find(f => f.src?.endsWith(`components-chart-${index}.webp`));
    return <div className={`chart-gallery-panel chart-gallery-panel-${index}`} key={index} style={{ '--chart-native-width': [317, 579, 601, 660, 660, 532, 640, 344, 511][index] } as CSSProperties} aria-label={figure?.alt || figure?.title}>
      {index === 1 ? <AnimatedDonutChart /> : index === 5 ? <AnimatedBarChart /> : <AnimatedVectorChart index={index} />}
    </div>;
  };
  return <div className="chart-gallery">
    <div className="chart-native-grid">{[0, 1, 2, 3, 4, 5, 6, 7, 8].map(render)}</div>
  </div>;
}
