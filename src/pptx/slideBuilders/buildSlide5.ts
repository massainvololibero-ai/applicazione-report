import type PptxGenJS from 'pptxgenjs';
import type { ReadinessTraiettorie } from '@/types/dossier';
import { PPTX_COLORS, FONT } from '@/constants/brand';
import { addTopBar, addFooter, drawRatingBar } from '../helpers/pptxShapes';
import { addSectionHeader, addBodyText } from '../helpers/pptxText';

const READINESS_STATUS_COLORS = {
  non_pronto: { fill: PPTX_COLORS.grey, text: PPTX_COLORS.blackK2P },
  pronto_con_restrizioni: { fill: PPTX_COLORS.lightViolet, text: PPTX_COLORS.keyGrape },
  pronto_subito: { fill: PPTX_COLORS.unlockedViolet, text: PPTX_COLORS.white },
};

export function buildSlide5(pres: PptxGenJS, data: ReadinessTraiettorie) {
  const slide = pres.addSlide();
  slide.background = { fill: PPTX_COLORS.white };

  addTopBar(slide, 'Readiness, traiettorie evolutive e overview professionale', 'Executive Assessment');

  // Left column: text fields
  const leftX = 0.5;
  const leftW = 6.2;

  addSectionHeader(slide, 'Aspettative Future', leftX, 0.9, leftW);
  addBodyText(slide, data.aspettativeFuture, leftX, 1.15, leftW, 1.2);

  addSectionHeader(slide, 'Readiness / Traiettorie Evolutive', leftX, 2.5, leftW);
  addBodyText(slide, data.readinessDescription, leftX, 2.75, leftW, 2.0);

  addSectionHeader(slide, 'Engagement', leftX, 4.9, leftW);
  addBodyText(slide, data.engagement, leftX, 5.15, leftW, 1.4);

  // Right column: readiness assessment
  const rightX = 7.2;

  // Readiness box
  slide.addShape('rect', {
    x: rightX, y: 0.9, w: 5.6, h: 5.7,
    fill: { color: PPTX_COLORS.superlightViolet },
  });

  // Readiness title
  slide.addShape('rect', {
    x: rightX + 0.3, y: 1.1, w: 5, h: 0.4,
    fill: { color: PPTX_COLORS.keyGrape },
  });
  slide.addText(`READINESS ${data.roleName.toUpperCase()}`, {
    x: rightX + 0.3, y: 1.1, w: 5, h: 0.4,
    fontFace: FONT, fontSize: 10, color: PPTX_COLORS.white, bold: true,
    align: 'center', valign: 'middle',
  });

  // Rating bar
  drawRatingBar(slide, rightX + 1.5, 1.8, data.readinessForRole, 4,
    ['Non adatto ora', 'Requisiti pieni']);

  // Rating labels
  const ratingLabels = [
    'Non adatto ora al ruolo potenziale',
    'Risponde parzialmente ai requisiti',
    'Risponde alla maggior parte dei requisiti',
    'Possiede a pieno i requisiti di ruolo',
  ];

  ratingLabels.forEach((label, i) => {
    slide.addText(`${i + 1}`, {
      x: rightX + 0.5, y: 2.5 + i * 0.45, w: 0.3, h: 0.35,
      fontFace: FONT, fontSize: 9, color: PPTX_COLORS.unlockedViolet, bold: true,
    });
    slide.addText(label, {
      x: rightX + 0.85, y: 2.5 + i * 0.45, w: 4, h: 0.35,
      fontFace: FONT, fontSize: 7, color: PPTX_COLORS.blackK2P,
      valign: 'middle',
    });
  });

  // Readiness status indicator
  const statusY = 4.5;
  slide.addText('LEGENDA', {
    x: rightX + 0.5, y: statusY, w: 4, h: 0.25,
    fontFace: FONT, fontSize: 8, color: PPTX_COLORS.keyGrape, bold: true,
  });

  const statusItems = [
    { key: 'non_pronto' as const, label: 'Non pronto' },
    { key: 'pronto_con_restrizioni' as const, label: 'Pronto con restrizioni' },
    { key: 'pronto_subito' as const, label: 'Pronto subito' },
  ];

  statusItems.forEach((item, i) => {
    const isActive = data.readinessStatus === item.key;
    const colors = READINESS_STATUS_COLORS[item.key];
    const statusW = 1.5;

    slide.addShape('rect', {
      x: rightX + 0.5 + i * (statusW + 0.15), y: statusY + 0.35, w: statusW, h: 0.35,
      fill: { color: isActive ? colors.fill : PPTX_COLORS.grey },
    });
    slide.addText(item.label, {
      x: rightX + 0.5 + i * (statusW + 0.15), y: statusY + 0.35, w: statusW, h: 0.35,
      fontFace: FONT, fontSize: 7,
      color: isActive ? colors.text : '999999',
      align: 'center', valign: 'middle', bold: isActive,
    });
  });

  // Candidate name in readiness box
  slide.addText(data.roleName || 'Ruolo Target', {
    x: rightX + 0.5, y: 5.3, w: 4.5, h: 0.3,
    fontFace: FONT, fontSize: 10, color: PPTX_COLORS.darkViolet, bold: true,
  });

  addFooter(slide, 5);
}
