export const getAggregatedNumberStatistics = (data: number[]) => {
  const frequency: Record<number, number> = {};
  let maxFrequency = 0;
  let modes: number[] = [];

  const sum = data.reduce((a, b) => a + b, 0);
  const min = Math.min(...data);
  const max = Math.max(...data);
  const avg = sum / data.length;
  const median = data.sort((a, b) => a - b)[Math.floor(data.length / 2)];
  const count = data.length;
  const range = max - min;
  const variance = data.reduce((a, b) => a + (b - avg) ** 2, 0) / data.length;

  for (const number of data) {
    frequency[number] = (frequency[number] || 0) + 1;
    if (frequency[number] > maxFrequency) {
      maxFrequency = frequency[number];
      modes = [number];
    } else if (frequency[number] === maxFrequency) {
      modes.push(number);
    }
  }

  return {
    sum,
    min,
    max,
    avg: parseInt(avg.toFixed(2)),
    median,
    count,
    range,
    variance: parseInt(variance.toFixed(2)),
    modes,
  };
};
