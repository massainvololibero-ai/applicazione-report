import { PPTX_COLORS, FONT } from '@/constants/brand';

export const TITLE_STYLE = {
  fontFace: FONT,
  fontSize: 18,
  color: PPTX_COLORS.white,
  bold: true,
} as const;

export const SUBTITLE_STYLE = {
  fontFace: FONT,
  fontSize: 10,
  color: PPTX_COLORS.unlockedViolet,
} as const;

export const HEADING_STYLE = {
  fontFace: FONT,
  fontSize: 12,
  color: PPTX_COLORS.keyGrape,
  bold: true,
} as const;

export const BODY_STYLE = {
  fontFace: FONT,
  fontSize: 9,
  color: PPTX_COLORS.blackK2P,
} as const;

export const SMALL_STYLE = {
  fontFace: FONT,
  fontSize: 7,
  color: '999999',
} as const;

export const BULLET_OPTS = {
  type: 'bullet' as const,
  code: '25A0',
  color: PPTX_COLORS.unlockedViolet,
};
