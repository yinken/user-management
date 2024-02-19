export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const device = {
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,
};

export type BreakpointKeys = keyof typeof breakpoints;
export type BreakpointValues = typeof breakpoints[BreakpointKeys];

export const respondTo = (
  breakpoint: BreakpointKeys,
  styles: Record<string, string>
) => {
  let attributes = '';
  Object.keys(styles).map((style) => {
    attributes += `${style}: ${styles[style]};`;
  });
  const out = `@media (min-width: ${breakpoints[breakpoint]}px) {${attributes}}`;
  return out;
};

export const determineViewportSize = (width: number) => {
  if (width < breakpoints.sm) {
    return 'sm';
  }
  if (width < breakpoints.md) {
    return 'md';
  }
  if (width < breakpoints.lg) {
    return 'lg';
  }
  if (width < breakpoints.xl) {
    return 'xl';
  }
  return '2xl';
};
