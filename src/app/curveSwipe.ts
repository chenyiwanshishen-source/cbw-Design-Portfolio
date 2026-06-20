export type CurveSwipeState = {
  top: number;
  edge: number;
  control: number;
};

export const curveSwipeStates = {
  baseCover: { top: 0, edge: 100, control: 100 },
  baseExit: { top: -44, edge: -16, control: 24 },
} satisfies Record<string, CurveSwipeState>;

function formatPathNumber(value: number) {
  return Number(value.toFixed(2));
}

export function getCurveSwipePath(state: CurveSwipeState) {
  const top = formatPathNumber(state.top);
  const edge = formatPathNumber(state.edge);
  const control = formatPathNumber(state.control);
  return `M0 ${top} H100 V${edge} C74 ${control} 26 ${control} 0 ${edge} Z`;
}

export function setCurveSwipePath(path: SVGPathElement | null, state: CurveSwipeState) {
  path?.setAttribute("d", getCurveSwipePath(state));
}
