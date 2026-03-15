import type PptxGenJS from 'pptxgenjs';
import { FONT } from '@/constants/brand';
import { BODY_STYLE } from './pptxStyles';

export function addBodyText(
  slide: PptxGenJS.Slide,
  text: string,
  x: number,
  y: number,
  w: number,
  h: number,
  options?: Partial<PptxGenJS.TextPropsOptions>
) {
  if (!text) return;
  slide.addText(text, {
    x, y, w, h,
    ...BODY_STYLE,
    valign: 'top',
    wrap: true,
    autoFit: true,
    ...options,
  });
}

export function addSectionHeader(
  slide: PptxGenJS.Slide,
  text: string,
  x: number,
  y: number,
  w: number
) {
  slide.addText(text.toUpperCase(), {
    x, y, w, h: 0.25,
    fontFace: FONT, fontSize: 9, color: '8E00D8', bold: true,
  });
}
