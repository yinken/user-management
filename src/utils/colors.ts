export const getColorByValue = (value: number | string) => {
  const v = Number(value);
  const hue = (v / 100) * 120; // 0 = red, 120 = green
  const saturation = 100;
  const lightness = 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const colors = {
  transparent: "transparent",
  black: "#000000",
  grey110: "#1C2429",
  grey100: "#1E2F42",
  grey90: "#2F3E50",
  grey80: "#606C7A",
  grey70: "#7F8893",
  grey60: "#858F99",
  grey50: "#C6CBD2",
  grey40: "#9EA5AD",
  grey30: "#BCC1C7",
  grey20: "#E3E5E7",
  grey10: "#EFF0F1",
  white: "#ffffff",
  skyBlue: "#0075DB",
  skyBlue90: "#0061B5",
  skyBlue80: "#0061B5",
  skyblue60: "#0475E7",
  skyBlue40: "#68ABE5",
  skyBlue30: "#D2EFFF",
  skyBlue20: "#e0f3ff",
  skyBlue10: "#e0f3ff",
  green90: "#208637",
  green80: "#208637",
  green60: "#24983F",
  green40: "#A4F2B6",
  green30: "#D9F3BF",
  green20: "#ecf9e9",
  green10: "#ecf9e9",
  orange90: "#893309",
  orange80: "#893309",
  orange60: "#BE470E",
  orange40: "#F4C2A9",
  orange20: "#FCECE4",
  orange10: "#FCECE4",
  purple90: "#5956f6",
  purple20: "#eeeefe",
  purple10: "#f7f7ff",
  red90: "#750606",
  red80: "#750606",
  red60: "#A11A1A",
  red40: "#FAB3B3",
  red20: "#fdeeee",
  red10: "#fdeeee",
  yellow90: "#604800",
  yellow80: "#604800",
  yellow60: "#F09204",
  yellow40: "#FEE4A8",
  yellow20: "#fff9eb",
  yellow10: "#fff9eb",
  yellow: "#FDB81E",
  blue: "#1362F6",
  orange: "#e57641",
  green: "#28A745",
  red: "#E22828",
};
export declare type ColorKeys = keyof typeof colors;
export declare type ColorValues = (typeof colors)[ColorKeys];
export const hexToRgb = (hex: string, format = true): number[] | string => {
  if (hex.startsWith("#")) {
    hex = hex.replace("#", "");
  }
  if (hex.length === 3) {
    // from FFF to FFFFFF
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  if (format) {
    return `rgb(${r},${g},${b})`;
  } else {
    return [r, g, b];
  }
};

export const hexToRgba = (hex: string, a: number): string => {
  const [r, g, b] = hexToRgb(hex, false) as number[];
  return `rgba(${r},${g},${b}, ${a})`;
};
