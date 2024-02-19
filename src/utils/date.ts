export const convertTimestampToDateString = (timestamp?: number | string) => {
  const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;
  const date = ts ? new Date(ts) : new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  return `${year}-${month}-${day}`;
};

export const getTimePeriods = () => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const today = [startOfDay.getTime(), now.getTime()];
  const yesterday = [startOfDay.getTime() - 86400000, startOfDay.getTime() - 1];
  const last7days = [startOfDay.getTime() - 604800000, now.getTime()];
  const last30days = [startOfDay.getTime() - 2592000000, now.getTime()];

  return {
    today,
    yesterday,
    last7days,
    last30days,
  };
};
