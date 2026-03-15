import type PptxGenJS from 'pptxgenjs';
import type { ProfiloComplessivo } from '@/types/dossier';
import { PPTX_COLORS, FONT } from '@/constants/brand';
import { addTopBar, addFooter, drawRatingBar, drawIndicatorBar } from '../helpers/pptxShapes';
import { addBodyText, addSectionHeader } from '../helpers/pptxText';

export function buildSlide1(pres: PptxGenJS, data: ProfiloComplessivo, scores?: { competenzeAvg: number; potenzialeAvg: number }) {
  const slide = pres.addSlide();
  slide.background = { fill: PPTX_COLORS.white };

  addTopBar(slide, 'Profilo complessivo', 'Executive Assessment');

  // Candidate name
  slide.addText(data.candidateName || 'Candidato', {
    x: 0.5, y: 0.75, w: 8, h: 0.35,
    fontFace: FONT, fontSize: 14, color: PPTX_COLORS.darkViolet, bold: true,
  });

  // === LEFT COLUMN: Carriera + Soft Skills + Considerazioni Finali ===
  const leftX = 0.5;
  const leftW = 5.5;
  const contentY = 1.2;

  addSectionHeader(slide, 'Carriera e Visione d\'Insieme', leftX, contentY, leftW);
  addBodyText(slide, data.carrieraVisioneInsieme, leftX, contentY + 0.25, leftW, 1.3);

  addSectionHeader(slide, 'Soft Skills', leftX, contentY + 1.65, leftW);

  // Business domain
  slide.addText([
    { text: 'Business domain: ', options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.keyGrape, bold: true } },
    { text: data.softSkillsBusiness, options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.blackK2P } },
  ], { x: leftX, y: contentY + 1.9, w: leftW, h: 0.85, valign: 'top', wrap: true, autoFit: true });

  // Action domain
  slide.addText([
    { text: 'Action domain: ', options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.keyGrape, bold: true } },
    { text: data.softSkillsAction, options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.blackK2P } },
  ], { x: leftX, y: contentY + 2.8, w: leftW, h: 0.65, valign: 'top', wrap: true, autoFit: true });

  // Relation domain
  slide.addText([
    { text: 'Relation domain: ', options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.keyGrape, bold: true } },
    { text: data.softSkillsRelation, options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.blackK2P } },
  ], { x: leftX, y: contentY + 3.5, w: leftW, h: 0.7, valign: 'top', wrap: true, autoFit: true });

  // Considerazioni Finali (bottom left)
  addSectionHeader(slide, 'Considerazioni Finali', leftX, contentY + 4.4, leftW);
  addBodyText(slide, data.considerazioniFinali, leftX, contentY + 4.65, leftW, 1.5);

  // === RIGHT COLUMN: Matrix plot (top) + Valore di Mercato + Valore Aziendale ===
  const rightX = 6.5;

  // Competenze / Potenziale matrix plot (upper right, large)
  if (scores) {
    const plotX = rightX + 0.2;
    const plotY = contentY;
    const plotW = 5.5;
    const plotH = 5.0;

    // Background
    slide.addShape('rect', {
      x: plotX, y: plotY, w: plotW, h: plotH,
      fill: { color: PPTX_COLORS.superlightViolet },
      line: { color: PPTX_COLORS.lightViolet, width: 1 },
    });

    // Grid lines (at 2, 3, 4 on 1-5 scale)
    for (let i = 1; i <= 3; i++) {
      const frac = i / 4;
      // Vertical
      slide.addShape('line', {
        x: plotX + frac * plotW, y: plotY, w: 0, h: plotH,
        line: { color: PPTX_COLORS.lightViolet, width: 0.5, dashType: 'dash' },
      });
      // Horizontal
      slide.addShape('line', {
        x: plotX, y: plotY + frac * plotH, w: plotW, h: 0,
        line: { color: PPTX_COLORS.lightViolet, width: 0.5, dashType: 'dash' },
      });
    }

    // Axis labels
    slide.addText('COMPETENZE MANAGERIALI', {
      x: plotX, y: plotY + plotH + 0.05, w: plotW, h: 0.2,
      fontFace: FONT, fontSize: 7, color: PPTX_COLORS.keyGrape, bold: true, align: 'center',
    });
    slide.addText('POTENZIALE', {
      x: plotX - 0.8, y: plotY + plotH / 2 - 0.3, w: 0.7, h: 0.6,
      fontFace: FONT, fontSize: 7, color: PPTX_COLORS.keyGrape, bold: true,
      align: 'center', valign: 'middle', rotate: 270,
    });

    // Scale labels
    slide.addText('1', { x: plotX - 0.05, y: plotY + plotH, w: 0.2, h: 0.18, fontFace: FONT, fontSize: 7, color: '999999', align: 'center' });
    slide.addText('5', { x: plotX + plotW - 0.15, y: plotY + plotH, w: 0.2, h: 0.18, fontFace: FONT, fontSize: 7, color: '999999', align: 'center' });
    slide.addText('1', { x: plotX - 0.3, y: plotY + plotH - 0.12, w: 0.25, h: 0.18, fontFace: FONT, fontSize: 7, color: '999999', align: 'right' });
    slide.addText('5', { x: plotX - 0.3, y: plotY - 0.05, w: 0.25, h: 0.18, fontFace: FONT, fontSize: 7, color: '999999', align: 'right' });

    // Position dot
    const dotSize = 0.25;
    const dotPX = plotX + ((scores.competenzeAvg - 1) / 4) * plotW - dotSize / 2;
    const dotPY = plotY + ((5 - scores.potenzialeAvg) / 4) * plotH - dotSize / 2;

    slide.addShape('ellipse', {
      x: dotPX, y: dotPY, w: dotSize, h: dotSize,
      fill: { color: PPTX_COLORS.unlockedViolet },
      line: { color: PPTX_COLORS.keyGrape, width: 1.5 },
    });

    // Name label
    slide.addText(data.candidateName || 'Candidato', {
      x: dotPX - 0.6, y: dotPY - 0.25, w: 1.5, h: 0.2,
      fontFace: FONT, fontSize: 7, color: PPTX_COLORS.darkViolet, bold: true, align: 'center',
    });
  }

  // Valore di Mercato rating (below matrix)
  const ratingsY = contentY + 5.5;
  addSectionHeader(slide, 'Valore di Mercato', rightX, ratingsY, 6);
  drawRatingBar(slide, rightX, ratingsY + 0.25, data.valoreDiMercato, 5,
    ['Carenze rilevanti', 'Best in class']);

  // Valore Aziendale indicator
  drawIndicatorBar(slide, rightX, ratingsY + 1.0, 'Valore Aziendale', data.valoreAziendale);

  addFooter(slide, 1);
}
