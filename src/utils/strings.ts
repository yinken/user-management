import { marked } from 'marked';

// Converts a string to a tuple (used for shortcuts)
export const tupleFromString = (string: string) => {
  const array = string.split(',');
  const first = array.splice(0, 1).join('');
  const rest = array.join(',');
  return [first, rest];
};

// truncate a string to a given length
export const truncate = (
  string: string,
  length: number,
  ellipsis?: boolean
) => {
  if (string.length <= length) {
    return string;
  }
  return `${string.slice(0, length)}${ellipsis ? '...' : ''}`;
};

// remove angle brackets from a string
export const removeAngleBrackets = (string: string) => {
  return string.replace(/[<>]/g, '');
};

/**
 * Generates a GUID string.
 * @returns {string} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 */
export function getUUID() {
  function _p8(s?: boolean) {
    const p = (Math.random().toString(16) + '000000000').substr(2, 8);
    return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

// capitalize the first letter of a string
export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getInitialsFromTitle = (title: string): string => {
  return title
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);
};

export const isDate = (str: string) => {
  const timestamp = Date.parse(str);
  return !isNaN(timestamp);
};

export const isUrl = (string: string) => {
  // eslint-disable-next-line no-useless-escape
  const urlRegex = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return urlRegex.test(string);
};

export const isEmail = (string: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(string);
};

export const isImage = (string: string) => {
  const imageRegex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/;
  return imageRegex.test(string);
};

export const isVideo = (string: string) => {
  const videoRegex = /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i;
  return videoRegex.test(string);
};

export const isYouTube = (string: string) => {
  // eslint-disable-next-line no-useless-escape
  const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
  return youtubeRegex.test(string);
};

export const isAudio = (string: string) => {
  const audioRegex = /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i;
  return audioRegex.test(string);
};

export const isMedia = (string: string) => {
  if (!isUrl(string)) {
    return false;
  }

  return isImage(string) || isVideo(string) || isAudio(string);
};

export const stripHtmlTags = (str: string) => {
  return str.replace(/(<([^>]+)>)/gi, '');
};

export const htmlToString = (html: string) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export const sanitizeFileName = (fileName: string) => {
  return fileName.replace(/[^A-Za-z0-9_\\.\\-\\(\\)]/gi, '_');
};

export const getLastWord = (text: string) => {
  const inputValue = text.trim();
  const lastSpaceIndex = inputValue.lastIndexOf(' ');
  const lastWord =
    lastSpaceIndex === -1
      ? inputValue
      : inputValue.substring(lastSpaceIndex + 1);
  return lastWord;
};

export const convertStringToValidLink = (text: string) => {
  if (isUrl(text)) {
    return text;
  }
  return `https://${text}`;
};

export const prettifyMailTo = (text?: string) => {
  if (!text) {
    return '';
  }
  return text.replace('mailto:', '');
};

export const turnStringIntoLink = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
};

// add a leading 0 to a number when required
export const addLeadingZero = (number: number | string) => {
  const numberToCheck = typeof number === 'string' ? parseInt(number) : number;
  return numberToCheck < 10 ? `0${number}` : `${number}`;
};

// markdown to html
export const markdownToHtml = (markdown?: string) => {
  if (!markdown) {
    return '';
  }
  return marked(markdown);
};

export const replaceSelection = (
  text: string,
  selection: { start: number; end: number },
  replacement: string
) => {
  return (
    text.slice(0, selection.start) + replacement + text.slice(selection.end)
  );
};
