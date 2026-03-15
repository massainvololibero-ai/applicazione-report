import type PptxGenJS from 'pptxgenjs';
import type { RischioUscita } from '@/types/dossier';
import { PPTX_COLORS, FONT } from '@/constants/brand';
import { addTopBar, addFooter } from '../helpers/pptxShapes';
import { addSectionHeader, addBodyText } from '../helpers/pptxText';

export function buildSlide6(pres: PptxGenJS, data: RischioUscita) {
  const slide = pres.addSlide();
  slide.background = { fill: PPTX_COLORS.white };

  addTopBar(slide, 'Rischio di uscita', 'Overview');

  const gridX = 1.8;
  const gridY = 1.2;
  const cellW = 3.5;
  const cellH = 2.4;

  // Four quadrants
  const quadrants = [
    { col: 0, row: 0, fill: 'F3E8FF', label: 'Alta probabilita\nAlto danno' },
    { col: 1, row: 0, fill: 'E8D5F5', label: 'Media probabilita\nAlto danno' },
    { col: 0, row: 1, fill: 'FCF6FF', label: 'Bassa probabilita\nAlto danno' },
    { col: 1, row: 1, fill: PPTX_COLORS.superlightViolet, label: 'Bassa probabilita\nMedio danno' },
  ];

  quadrants.forEach(q => {
    slide.addShape('rect', {
      x: gridX + q.col * cellW, y: gridY + q.row * cellH,
      w: cellW, h: cellH,
      fill: { color: q.fill },
      line: { color: PPTX_COLORS.lightViolet, width: 1 },
    });
    slide.addText(q.label, {
      x: gridX + q.col * cellW, y: gridY + q.row * cellH,
      w: cellW, h: cellH,
      fontFace: FONT, fontSize: 8, color: '999999',
      align: 'center', valign: 'middle',
    });
  });

  // Axes
  slide.addText('ENGAGEMENT', {
    x: gridX, y: gridY + cellH * 2 + 0.15, w: cellW * 2, h: 0.3,
    fontFace: FONT, fontSize: 10, color: PPTX_COLORS.keyGrape, bold: true, align: 'center',
  });
  slide.addText('Basso', {
    x: gridX, y: gridY + cellH * 2 + 0.05, w: 1, h: 0.2,
    fontFace: FONT, fontSize: 7, color: '999999',
  });
  slide.addText('Alto', {
    x: gridX + cellW * 2 - 1, y: gridY + cellH * 2 + 0.05, w: 1, h: 0.2,
    fontFace: FONT, fontSize: 7, color: '999999', align: 'right',
  });

  slide.addText('BENCHMARK DI MERCATO', {
    x: 0.2, y: gridY + cellH - 0.5, w: 1.3, h: 1,
    fontFace: FONT, fontSize: 9, color: PPTX_COLORS.keyGrape, bold: true,
    align: 'center', valign: 'middle',
    rotate: 270,
  });
  slide.addText('Alto', {
    x: gridX - 0.5, y: gridY - 0.05, w: 0.5, h: 0.2,
    fontFace: FONT, fontSize: 7, color: '999999', align: 'right',
  });
  slide.addText('Basso', {
    x: gridX - 0.6, y: gridY + cellH * 2 - 0.2, w: 0.5, h: 0.2,
    fontFace: FONT, fontSize: 7, color: '999999', align: 'right',
  });

  // Position dot
  const dotX = gridX + data.matrixPosition.x * cellW * 2 - 0.12;
  const dotY = gridY + (1 - data.matrixPosition.y) * cellH * 2 - 0.12;

  slide.addShape('ellipse', {
    x: dotX, y: dotY, w: 0.25, h: 0.25,
    fill: { color: PPTX_COLORS.unlockedViolet },
    line: { color: PPTX_COLORS.keyGrape, width: 2 },
    shadow: { type: 'outer', blur: 6, offset: 2, color: '000000', opacity: 0.2 },
  });

  // Comment section
  const commentX = 9.3;
  addSectionHeader(slide, 'Commento', commentX, 1.2, 3.7);
  slide.addShape('rect', {
    x: commentX, y: 1.5, w: 3.7, h: 4.5,
    fill: { color: PPTX_COLORS.superlightViolet },
  });
  addBodyText(slide, data.commento, commentX + 0.2, 1.6, 3.3, 4.2);

  addFooter(slide, 6);
}
