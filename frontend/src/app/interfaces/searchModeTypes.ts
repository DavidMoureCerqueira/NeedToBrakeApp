export const searchModeTypes = {
  DISC: 'By Disc',
  CAR: 'By Car',
  MEASUREMENT: 'By Measurement',
} as const;

export type SearchMode = (typeof searchModeTypes)[keyof typeof searchModeTypes];
