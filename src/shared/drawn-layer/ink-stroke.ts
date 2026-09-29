/**
 * Stroke width for a hand-drawn mark, scaled by the `--ink-stroke` multiplier
 * in `globals.css`. Returned as a CSS value because SVG presentation attributes
 * cannot read custom properties — pass it through `style`, not `strokeWidth=`.
 * `px` inside an SVG is one user unit, so the drawn weight matches the old
 * unitless attribute at the default multiplier of 1.
 */
export function inkStroke(width: number | string) {
  return `calc(${width}px * var(--ink-stroke, 1))`;
}
