export type BannerState = {
  template: 'shapes' | 'wordmark' | 'logo';
  bgStart: string;
  bgEnd: string;
  showLogo: boolean;
  showWordmark: boolean;
  showDecorations: boolean;
  showGrain: boolean;
  showArrows: boolean;
  customWordmark: string | null;
  customLogo: string | null;
};

export const defaultState: BannerState = {
  template: 'shapes',
  bgStart: '#539aff',
  bgEnd: '#7ae5e7',
  showLogo: true,
  showWordmark: true,
  showDecorations: true,
  showGrain: true,
  showArrows: true,
  customWordmark: null,
  customLogo: null,
};
