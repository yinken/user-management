import { colors, hexToRgba } from "./colors";

export function getAvatarFromCasePublicId(casePublicId?: string) {
  if (!casePublicId) {
    return '/images/avatars/unknown-avatar-01.png';
  }
  let hash = 0;
  const len = casePublicId.length;
  for (let i = 0; i < len; i++) {
    hash = (hash << 5) - hash + casePublicId.charCodeAt(i);
    hash |= 0; // to 32bit integer
  }

  const num = hash.toString().slice(-1);
  return `/images/avatars/unknown-avatar-0${num}.png`;
}

export function getBackgroundColorFromString(string?: string) {
  const backgroundGradients = [
    hexToRgba(colors.blue, 1),
    hexToRgba(colors.orange, 1),
    hexToRgba(colors.green, 1),
    hexToRgba(colors.red, 1),
    hexToRgba(colors.yellow, 1),
  ];
  if (!string) {
    return backgroundGradients[0];
  }
  // pick a random gradient
  const hash = string.split('').reduce((prevHash, currVal) => {
    return prevHash + currVal.charCodeAt(0);
  }, 0);
  return backgroundGradients[hash % backgroundGradients.length];
}
