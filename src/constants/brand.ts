export const COLORS = {
  unlockedViolet: '#8E00D8',
  keyGrape: '#490473',
  darkViolet: '#2F034A',
  impactPurple: '#A800A4',
  superlightViolet: '#FCF6FF',
  lightViolet: '#E2ADFF',
  blackK2P: '#272727',
  grey: '#E9E9E9',
  white: '#FFFFFF',
} as const;

export const PPTX_COLORS = {
  unlockedViolet: '8E00D8',
  keyGrape: '490473',
  darkViolet: '2F034A',
  impactPurple: 'A800A4',
  superlightViolet: 'FCF6FF',
  lightViolet: 'E2ADFF',
  blackK2P: '272727',
  grey: 'E9E9E9',
  white: 'FFFFFF',
} as const;

export const FONT = 'Arial' as const;

export const INDICATOR_LEVELS = [
  { value: 'basso', label: 'Basso', filledCount: 1 },
  { value: 'medio-basso', label: 'Medio-Basso', filledCount: 2 },
  { value: 'medio', label: 'Medio', filledCount: 3 },
  { value: 'medio-alto', label: 'Medio-Alto', filledCount: 4 },
  { value: 'alto', label: 'Alto', filledCount: 5 },
] as const;
