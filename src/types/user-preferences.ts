export interface UserPreferences {
  transcriptBackground: BACKGROUND_IMAGES;
}

export enum BACKGROUND_IMAGES {
  NONE = 'none',
  TINY_SQUARES = 'tiny-squares',
  EMAIL_PATTERN = 'email-pattern',
  DIAMOND_TILES = 'diamond-tiles',
  SHEET_MUSIC = 'sheet-music',
  FAST_FOOD = 'fast-food',
}

export enum TRANSCRIPT_DISPLAY {
  FULL = 'full',
  COMPACT = 'compact',
  PLAIN = 'plain',
}
