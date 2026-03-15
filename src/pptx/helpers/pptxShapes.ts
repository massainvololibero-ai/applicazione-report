import PptxGenJS from 'pptxgenjs';
import { PPTX_COLORS, FONT, INDICATOR_LEVELS } from '@/constants/brand';
import type { IndicatorLevel } from '@/types/dossier';

export function addTopBar(slide: PptxGenJS.Slide, title: string, subtitle: string) {
  // Dark violet top bar
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 0.65,
    fill: { color: PPTX_COLORS.darkViolet },
  });

  // Subtitle (small, above title)
  slide.addText(subtitle, {
    x: 0.5, y: 0.08, w: 8, h: 0.2,
    fontFace: FONT, fontSize: 9, color: PPTX_COLORS.lightViolet,
  });

  // Title
  slide.addText(title, {
    x: 0.5, y: 0.22, w: 10, h: 0.35,
    fontFace: FONT, fontSize: 16, color: PPTX_COLORS.white, bold: true,
  });

  // Logo text (instead of image for simplicity)
  slide.addText([
    { text: 'key', options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.white, bold: true } },
    { text: '2', options: { fontFace: FONT, fontSize: 11, color: PPTX_COLORS.lightViolet, bold: true } },
    { text: 'people', options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.white, bold: true } },
  ], {
    x: 11.5, y: 0.15, w: 1.5, h: 0.35, align: 'right',
  });

  // Thin violet line at bottom
  slide.addShape('line', {
    x: 0, y: 0.65, w: 13.33, h: 0,
    line: { color: PPTX_COLORS.unlockedViolet, width: 1 },
  });
}

export function addFooter(slide: PptxGenJS.Slide, pageNum: number) {
  slide.addText(`${pageNum} | Copyright \u00A9 2025 Key2people S.r.l. All rights reserved.`, {
    x: 0.3, y: 7.05, w: 6, h: 0.3,
    fontFace: FONT, fontSize: 7, color: '999999',
  });

  slide.addText([
    { text: 'key', options: { fontFace: FONT, fontSize: 7, color: PPTX_COLORS.keyGrape, bold: true } },
    { text: '2', options: { fontFace: FONT, fontSize: 9, color: PPTX_COLORS.unlockedViolet, bold: true } },
    { text: 'people', options: { fontFace: FONT, fontSize: 7, color: PPTX_COLORS.keyGrape, bold: true } },
  ], {
    x: 11.8, y: 7.0, w: 1.2, h: 0.35, align: 'right',
  });
}

export function drawRatingBar(slide: PptxGenJS.Slide, x: number, y: number, score: number, max: number, labels?: string[]) {
  const barW = 0.5;
  const gap = 0.06;

  for (let i = 0; i < max; i++) {
    const isFilled = i < score;
    slide.addShape('rect', {
      x: x + i * (barW + gap), y, w: barW, h: 0.35,
      fill: { color: isFilled ? PPTX_COLORS.unlockedViolet : PPTX_COLORS.grey },
    });
    slide.addText(`${i + 1}`, {
      x: x + i * (barW + gap), y, w: barW, h: 0.35,
      fontFace: FONT, fontSize: 10, color: isFilled ? PPTX_COLORS.white : '999999',
      align: 'center', valign: 'middle', bold: true,
    });
  }

  if (labels) {
    slide.addText(labels[0], {
      x, y: y + 0.38, w: 2, h: 0.15,
      fontFace: FONT, fontSize: 6, color: '999999',
    });
    slide.addText(labels[labels.length - 1], {
      x: x + (max - 1) * (barW + gap) - 1.5, y: y + 0.38, w: 2, h: 0.15,
      fontFace: FONT, fontSize: 6, color: '999999', align: 'right',
    });
  }
}

export function drawIndicatorBar(slide: PptxGenJS.Slide, x: number, y: number, label: string, level: IndicatorLevel) {
  const levelInfo = INDICATOR_LEVELS.find(l => l.value === level);
  const filled = levelInfo?.filledCount ?? 3;
  const segW = 0.32;
  const gap = 0.04;

  slide.addText(label.toUpperCase(), {
    x, y: y - 0.2, w: 3, h: 0.18,
    fontFace: FONT, fontSize: 7, color: PPTX_COLORS.keyGrape, bold: true,
  });

  for (let i = 0; i < 5; i++) {
    const isFilled = i < filled;
    slide.addShape('rect', {
      x: x + i * (segW + gap), y, w: segW, h: 0.15,
      fill: { color: isFilled ? PPTX_COLORS.unlockedViolet : PPTX_COLORS.grey },
    });
  }
}
