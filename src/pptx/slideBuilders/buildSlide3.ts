import type PptxGenJS from 'pptxgenjs';
import type { OverviewCompetenze } from '@/types/dossier';
import { PPTX_COLORS, FONT } from '@/constants/brand';
import { addTopBar, addFooter } from '../helpers/pptxShapes';
import { addSectionHeader, addBodyText } from '../helpers/pptxText';

export function buildSlide3(pres: PptxGenJS, data: OverviewCompetenze) {
  const slide = pres.addSlide();
  slide.background = { fill: PPTX_COLORS.white };

  addTopBar(slide, 'Overview Competenze Manageriali', 'Executive Assessment');

  // Radar chart
  const chartData = [{
    name: 'Valutazione',
    labels: data.competencies.map(c => c.label),
    values: data.competencies.map(c => c.score),
  }];

  slide.addChart(pres.ChartType.radar, chartData, {
    x: 0.3, y: 0.8, w: 6.5, h: 5.8,
    radarStyle: 'marker',
    chartColors: [PPTX_COLORS.unlockedViolet],
    lineDataSymbol: 'circle',
    lineDataSymbolSize: 5,
    lineDataSymbolLineColor: PPTX_COLORS.keyGrape,
    catAxisLabelFontSize: 8,
    catAxisLabelColor: PPTX_COLORS.blackK2P,
    catAxisLabelFontFace: FONT,
    valAxisMinVal: 0,
    valAxisMaxVal: 5,
    valAxisLabelFontSize: 7,
    valAxisLabelColor: '999999',
    showLegend: false,
    showTitle: false,
  });

  // Legend
  slide.addShape('rect', {
    x: 5.5, y: 0.85, w: 0.15, h: 0.15,
    fill: { color: PPTX_COLORS.unlockedViolet },
  });
  slide.addText('= valutazione', {
    x: 5.7, y: 0.82, w: 1.5, h: 0.2,
    fontFace: FONT, fontSize: 7, color: PPTX_COLORS.blackK2P,
  });

  // Right side: Punti di forza + Aree di miglioramento
  const rightX = 7.0;

  // Punti di Forza box
  slide.addShape('rect', {
    x: rightX, y: 0.9, w: 6, h: 2.8,
    fill: { color: PPTX_COLORS.superlightViolet },
  });
  addSectionHeader(slide, 'Punti di Forza', rightX + 0.2, 1.0, 5.5);
  addBodyText(slide, data.puntiDiForza, rightX + 0.2, 1.3, 5.5, 2.2);

  // Aree di Miglioramento box
  slide.addShape('rect', {
    x: rightX, y: 3.9, w: 6, h: 2.8,
    fill: { color: PPTX_COLORS.superlightViolet },
  });
  addSectionHeader(slide, 'Aree di Miglioramento', rightX + 0.2, 4.0, 5.5);
  addBodyText(slide, data.areeDiMiglioramento, rightX + 0.2, 4.3, 5.5, 2.2);

  addFooter(slide, 3);
}
