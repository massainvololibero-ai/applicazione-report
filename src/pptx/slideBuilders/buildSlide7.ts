import type PptxGenJS from 'pptxgenjs';
import type { GrowthPotential } from '@/types/dossier';
import { PPTX_COLORS, FONT } from '@/constants/brand';
import { addTopBar, addFooter } from '../helpers/pptxShapes';
import { addSectionHeader, addBodyText } from '../helpers/pptxText';

const COL_LABELS = ['STABILITA\'', 'SVILUPPO\nORIZZONTALE', 'SVILUPPO\nVERTICALE'];
const ROW_LABELS = ['BASSO', 'MEDIO', 'ALTO'];

const CELL_FILLS = [
  ['F8F8F8', 'FCF6FF', 'F3E8FF'],
  ['FCF6FF', 'F3E8FF', 'E8D5F5'],
  ['F3E8FF', 'E8D5F5', 'DCC0F0'],
];

export function buildSlide7(pres: PptxGenJS, data: GrowthPotential) {
  const slide = pres.addSlide();
  slide.background = { fill: PPTX_COLORS.white };

  addTopBar(slide, 'Growth potential', 'Overview');

  const gridX = 1.8;
  const gridY = 1.0;
  const cellW = 2.2;
  const cellH = 1.7;

  // Draw 3x3 grid
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      slide.addShape('rect', {
        x: gridX + col * cellW,
        y: gridY + (2 - row) * cellH,
        w: cellW,
        h: cellH,
        fill: { color: CELL_FILLS[row][col] },
        line: { color: PPTX_COLORS.lightViolet, width: 1 },
      });
    }
  }

  // Column labels (bottom)
  COL_LABELS.forEach((label, i) => {
    slide.addText(label, {
      x: gridX + i * cellW, y: gridY + 3 * cellH + 0.1,
      w: cellW, h: 0.45,
      fontFace: FONT, fontSize: 8, color: PPTX_COLORS.keyGrape, bold: true,
      align: 'center', valign: 'top',
    });
  });

  // Row labels (left)
  ROW_LABELS.forEach((label, i) => {
    slide.addText(label, {
      x: gridX - 1, y: gridY + (2 - i) * cellH,
      w: 0.9, h: cellH,
      fontFace: FONT, fontSize: 8, color: PPTX_COLORS.keyGrape, bold: true,
      align: 'right', valign: 'middle',
    });
  });

  // Axis titles
  slide.addText('PERCORSO', {
    x: gridX, y: gridY + 3 * cellH + 0.55, w: cellW * 3, h: 0.3,
    fontFace: FONT, fontSize: 10, color: PPTX_COLORS.keyGrape, bold: true, align: 'center',
  });

  slide.addText('POTENZIALE DI LEADERSHIP', {
    x: 0, y: gridY + cellH * 1.5 - 0.5, w: 1.3, h: 1,
    fontFace: FONT, fontSize: 9, color: PPTX_COLORS.keyGrape, bold: true,
    align: 'center', valign: 'middle',
    rotate: 270,
  });

  // Position dot (snapped to cell center)
  const colIdx = Math.round(data.matrixPosition.x * 2);
  const rowIdx = Math.round(data.matrixPosition.y * 2);
  const dotCX = gridX + colIdx * cellW + cellW / 2 - 0.15;
  const dotCY = gridY + (2 - rowIdx) * cellH + cellH / 2 - 0.15;

  slide.addShape('ellipse', {
    x: dotCX, y: dotCY, w: 0.3, h: 0.3,
    fill: { color: PPTX_COLORS.unlockedViolet },
    line: { color: PPTX_COLORS.keyGrape, width: 2 },
    shadow: { type: 'outer', blur: 6, offset: 2, color: '000000', opacity: 0.2 },
  });

  // Comment section
  const commentX = 9.0;
  addSectionHeader(slide, 'Commento', commentX, 1.0, 4);
  slide.addShape('rect', {
    x: commentX, y: 1.3, w: 4, h: 5.2,
    fill: { color: PPTX_COLORS.superlightViolet },
  });
  addBodyText(slide, data.commento, commentX + 0.2, 1.4, 3.6, 4.9);

  addFooter(slide, 7);
}
