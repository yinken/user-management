import i18n from '../../i18n';
import { determineSingularOrPlural } from './translation';

const oneSec = 1;
const oneMin = oneSec * 60; // ms
const oneHour = oneMin * 60; // ms
const oneDay = oneHour * 24; // ms
const oneWeek = oneDay * 7; // ms
const oneMonth = oneDay * 30; // ms
const oneYear = oneMonth * 12;

export const timeAgo = (ms: number) => {
  let ago = Math.floor(ms / 1000);
  let part = 0;

  if (ago < 5 * oneSec) {
    return i18n.t('few secs ago');
  }
  if (ago < oneMin) {
    return i18n.t('X secs ago', { seconds: ago });
  }

  // it didnt reach the second min yet.
  if (ago < oneMin * 2) {
    return i18n.t('a min ago');
  }

  // it didnt reach 1 hour (3600 secs yet)
  if (ago < oneHour) {
    while (ago >= oneMin) {
      ago -= oneMin;
      part += 1;
    }

    return i18n.t('X mins ago', { minutes: part });
  }

  // it didnt reach the second hour yet
  if (ago < oneHour * 2) {
    return i18n.t('an hr ago');
  }

  // it didnt reach 1 day yet.
  if (ago < oneDay) {
    while (ago >= oneHour) {
      ago -= oneHour;
      part += 1;
    }
    return i18n.t('X hrs ago', { hours: part });
  }

  if (ago < oneDay * 2) {
    return i18n.t('a day ago');
  }

  // account for total days
  if (ago < oneWeek) {
    while (ago >= oneDay) {
      ago -= oneDay;
      part += 1;
    }
    return i18n.t('X days ago', { days: part });
  }

  // account for weeks
  if (ago < oneWeek) {
    return i18n.t('a week ago');
  }
  if (ago < oneMonth) {
    while (ago >= oneWeek) {
      ago -= oneWeek;
      part += 1;
    }
    return determineSingularOrPlural({
      count: part,
      singular: i18n.t('one week ago'),
      plural: i18n.t('X weeks ago', { weeks: part }),
    });
  }

  if (ago < oneMonth) {
    return i18n.t('a month ago');
  }
  if (ago < oneYear) {
    while (ago >= oneMonth) {
      ago -= oneMonth;
      part += 1;
    }
    return determineSingularOrPlural({
      count: part,
      singular: i18n.t('one month ago'),
      plural: i18n.t('X months ago', { months: part }),
    });
  }

  if (ago > oneYear) {
    // 45 years, approximately the epoch
    return i18n.t('a long time ago');
  }

  return i18n.t('a few seconds ago');
};

export const messageAge = (timestamp: number) => {
  return Date.now() - timestamp;
};

export const getCurrentTimeInTimezone = (timezone?: string) => {
  const date = new Date();
  const localTime = date.toLocaleTimeString('de-DE', {
    hour12: true,
    timeZone: timezone,
  });
  return localTime;
};

export const formatSecondsToTimestring = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = date.toISOString().substr(11, 8);
  return timeString;
};

// function that determines whether a time in seconds should be expressed in "seconds", "minutes", or "hours"
export const getTimeAndTimeUnit = (seconds: number) => {
  let time = Math.round(seconds);
  if (time < 60) {
    return determineSingularOrPlural({
      count: time,
      singular: `${time} ${i18n.t('second')}`,
      plural: `${time} ${i18n.t('seconds')}`,
    });
  }
  time = Math.floor(time / 60);
  if (time < 60) {
    return determineSingularOrPlural({
      count: time,
      singular: `${time} ${i18n.t('minute')}`,
      plural: `${time} ${i18n.t('minutes')}`,
    });
  }
  time = Math.floor(time / 60);
  return determineSingularOrPlural({
    count: time,
    singular: `${time} ${i18n.t('hour')}`,
    plural: `${time} ${i18n.t('hours')}`,
  });
};

// function that creates a greeting based on the current time
export const getGreeting = (someone?: string) => {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    return someone
      ? i18n.t('Good morning, {{someone}}', { someone })
      : i18n.t('Good morning');
  }
  if (hours < 18) {
    return someone
      ? i18n.t('Good afternoon, {{someone}}', { someone })
      : i18n.t('Good afternoon');
  }
  return someone
    ? i18n.t('Good evening, {{someone}}', { someone })
    : i18n.t('Good evening');
};

export const determineDuration = (
  durationInSeconds?: number,
  startTime?: number
) => {
  if (durationInSeconds) return Math.round(durationInSeconds);
  if (startTime) return Math.round((Date.now() - startTime) / 1000);
  return 0;
};

export const formatPlaybackTime = (time: number) => {
  const date = new Date(0);
  date.setSeconds(time);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  let timeString = `${minutes}:${seconds}`;
  if (time >= 3600) {
    timeString = `${hours}:${timeString}`;
  }

  return timeString;
};
