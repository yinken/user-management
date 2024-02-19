export const determineOS = (os: string) => {
  let out = 'unknown';
  if (os.includes('Windows')) {
    out = 'windows';
  }
  if (os.includes('Mac')) {
    out = 'mac';
  }
  if (os.includes('Linux')) {
    out = 'linux';
  }
  return out;
};

export const determineBrowser = (browser: string) => {
  let out = 'unknown';
  if (browser.includes('Chrome')) {
    out = 'chrome';
  }
  if (browser.includes('Firefox')) {
    out = 'firefox';
  }
  if (browser.includes('Safari')) {
    out = 'safari';
  }
  if (browser.includes('Edge')) {
    out = 'edge';
  }
  return out;
};
