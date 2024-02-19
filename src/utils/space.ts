type SpaceUnits = 0.125 | 0.25 | 0.375 | 0.5 | 0.75 | 1 | 1.5 | 2 | 2.5 | 3;
export const space = (unit: SpaceUnits) => {
  return `${unit}rem`;
};
