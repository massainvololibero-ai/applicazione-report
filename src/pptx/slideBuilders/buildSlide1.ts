import type PptxGenJS from 'pptxgenjs';
import type { ProfiloComplessivo } from '@/types/dossier';
import { PPTX_COLORS, FONT } from '@/constants/brand';
import { addTopBar, addFooter, drawRatingBar, drawIndicatorBar } from '../helpers/pptxShapes';
import { addBodyText, addSectionHeader } from '../helpers/pptxText';

export function buildSlide1(pres: PptxGenJS, data: ProfiloComplessivo) {
  const slide = pres.addSlide();
  slide.background = { fill: PPTX_COLORS.white };

  addTopBar(slide, 'Profilo complessivo', 'Executive Assessment');

  // Candidate name
  slide.addText(data.candidateName || 'Candidato', {
    x: 0.5, y: 0.75, w: 8, h: 0.35,
    fontFace: FONT, fontSize: 14, color: PPTX_COLORS.darkViolet, bold: true,
  });

  // Left column: Carriera + Soft Skills
  const leftX = 0.5;
  const contentY = 1.2;

  addSectionHeader(slide, 'Carriera e Visione d\'Insieme', leftX, contentY, 5.5);
  addBodyText(slide, data.carrieraVisioneInsieme, leftX, contentY + 0.25, 5.5, 1.6);

  addSectionHeader(slide, 'Soft Skills', leftX, contentY + 1.95, 5.5);

  // Business domain
  slide.addText([
    { text: 'Business domain: ', options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.keyGrape, bold: true } },
    { text: data.softSkillsBusiness, options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.blackK2P } },
  ], { x: leftX, y: contentY + 2.2, w: 5.5, h: 1.1, valign: 'top', wrap: true, autoFit: true });

  // Action domain
  slide.addText([
    { text: 'Action domain: ', options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.keyGrape, bold: true } },
    { text: data.softSkillsAction, options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.blackK2P } },
  ], { x: leftX, y: contentY + 3.35, w: 5.5, h: 0.7, valign: 'top', wrap: true, autoFit: true });

  // Relation domain
  slide.addText([
    { text: 'Relation domain: ', options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.keyGrape, bold: true } },
    { text: data.softSkillsRelation, options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.blackK2P } },
  ], { x: leftX, y: contentY + 4.1, w: 5.5, h: 0.9, valign: 'top', wrap: true, autoFit: true });

  // Right column: Considerazioni + Rating + Indicators
  const rightX = 6.5;

  addSectionHeader(slide, 'Considerazioni Finali', rightX, contentY, 6);
  addBodyText(slide, data.considerazioniFinali, rightX, contentY + 0.25, 6.3, 1.6);

  // Valore di mercato rating
  addSectionHeader(slide, 'Valore di Mercato', rightX, contentY + 2.0, 6);
  drawRatingBar(slide, rightX, contentY + 2.25, data.valoreDiMercato, 5,
    ['Carenze rilevanti', 'Best in class']);

  // Indicators
  const indY = contentY + 3.0;
  drawIndicatorBar(slide, rightX, indY, 'Competenze Manageriali', data.competenzeManageriali);
  drawIndicatorBar(slide, rightX, indY + 0.55, 'Potenziale', data.potenziale);
  drawIndicatorBar(slide, rightX, indY + 1.1, 'Valore Aziendale', data.valoreAziendale);

  addFooter(slide, 1);
}
