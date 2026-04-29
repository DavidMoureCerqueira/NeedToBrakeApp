export type DiscTheme = 'desired' | 'current';

interface Colors {
  border: string;
  backGroundPrimary: string;
  backGroundSecondary: string;
  innerBorder: string;
  text: string;
}
export const THEMES: Record<DiscTheme, Colors> = {
  desired: {
    border: '3px solid #1e3d3d',
    backGroundPrimary: '#486a4e',
    backGroundSecondary: '#2b4f47',
    innerBorder: '1px solid #599351',
    text: '#ecf0f1',
  },
  current: {
    border: '3px solid #34495e',
    backGroundPrimary: '#2c3e50',
    backGroundSecondary: '#34495e',
    innerBorder: '1px solid #3f51b5',
    text: '#ecf0f1',
  },
};
