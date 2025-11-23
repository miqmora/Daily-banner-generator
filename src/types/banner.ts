export interface BannerConfig {
  gradientStart: string;
  gradientEnd: string;
  
  // Wordmark
  showWordmark: boolean;
  wordmarkStyle: 'sticker-black-white' | 'sticker-color' | 'text';
  wordmarkText: string;
  wordmarkRotation: number;
  wordmarkScale: number;
  wordmarkHue: number;
  wordmarkSaturation: number;
  wordmarkX: number;
  wordmarkY: number;

  // Logo / Stickers
  showLogo: boolean;
  logoStyle: 'glossy' | 'black';
  logoRotation: number;
  logoScale: number;
  logoHue: number;
  logoSaturation: number;
  logoX: number;
  logoY: number;

  // Scribbles (Primary)
  showScribbles: boolean;
  scribbleStyle: 'scratches' | 'misc' | 'scribble1' | 'scribble2' | 'scribble3';
  scribbleColor: string;
  scribbleBlendMode: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion';
  scribbleOpacity: number;
  scribbleRotation: number;
  scribbleScale: number;
  scribbleMirrorX: boolean;
  scribbleMirrorY: boolean;
  scribbleX: number;
  scribbleY: number;

  // Scribbles (Secondary)
  showScribbles2: boolean;
  scribbleStyle2: 'scratches' | 'misc' | 'scribble1' | 'scribble2' | 'scribble3';
  scribbleColor2: string;
  scribbleBlendMode2: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion';
  scribbleOpacity2: number;
  scribbleRotation2: number;
  scribbleScale2: number;
  scribbleMirrorX2: boolean;
  scribbleMirrorY2: boolean;
  scribbleX2: number;
  scribbleY2: number;

  // Background Elements
  showArrows: boolean;
  arrowColor: string;
  arrowOpacity: number;
  arrowRotation: number;
  arrowScale: number;
  arrowX: number;
  arrowY: number;
  
  showShapes: boolean; // Extruded shapes
  shapeStyle: 'extrusion1' | 'extrusion2' | 'extrusion3' | 'shapeB' | 'shapeC' | 'shapeD';
  shapeScale: number;
  shapeHue: number;
  shapeX: number;
  shapeY: number;
  
  showShapes2: boolean;
  shapeStyle2: 'extrusion1' | 'extrusion2' | 'extrusion3' | 'shapeB' | 'shapeC' | 'shapeD';
  shapeScale2: number;
  shapeHue2: number;
  shapeX2: number;
  shapeY2: number;

  showShapes3: boolean;
  shapeStyle3: 'extrusion1' | 'extrusion2' | 'extrusion3' | 'shapeB' | 'shapeC' | 'shapeD';
  shapeScale3: number;
  shapeHue3: number;
  shapeX3: number;
  shapeY3: number;
  
  showGrain: boolean;
  grainOpacity: number;
  grainX: number;
  grainY: number;

  // Background Blobs
  blobX: number;
  blobY: number;
  blobHue?: number;
}