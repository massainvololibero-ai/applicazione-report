import type PptxGenJS from 'pptxgenjs';
import type { SupportoSviluppo } from '@/types/dossier';
import { PPTX_COLORS, FONT } from '@/constants/brand';
import { addTopBar, addFooter } from '../helpers/pptxShapes';

export function buildSlide4(pres: PptxGenJS, data: SupportoSviluppo) {
  const slide = pres.addSlide();
  slide.background = { fill: PPTX_COLORS.white };

  addTopBar(slide, 'Supporto al processo di sviluppo', 'Executive Assessment');

  // Table
  const headerRow: PptxGenJS.TableCell[] = [
    { text: 'STRUMENTI', options: { fontFace: FONT, fontSize: 9, color: PPTX_COLORS.white, bold: true, fill: { color: PPTX_COLORS.darkViolet }, align: 'left', valign: 'middle' } },
    { text: 'NOTE', options: { fontFace: FONT, fontSize: 9, color: PPTX_COLORS.white, bold: true, fill: { color: PPTX_COLORS.darkViolet }, align: 'left', valign: 'middle' } },
  ];

  const dataRows: PptxGenJS.TableCell[][] = data.developmentTools.map((tool, i) => [
    { text: tool.label, options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.blackK2P, fill: { color: i % 2 === 0 ? PPTX_COLORS.superlightViolet : PPTX_COLORS.white }, valign: 'top' } },
    { text: tool.note || '-', options: { fontFace: FONT, fontSize: 8, color: PPTX_COLORS.blackK2P, fill: { color: i % 2 === 0 ? PPTX_COLORS.superlightViolet : PPTX_COLORS.white }, valign: 'top' } },
  ]);

  slide.addTable([headerRow, ...dataRows], {
    x: 0.5, y: 0.9, w: 12.3,
    colW: [3.5, 8.8],
    rowH: [0.35, ...Array(6).fill(0.7)],
    border: { type: 'solid', color: PPTX_COLORS.grey, pt: 0.5 },
    margin: [4, 6, 4, 6],
    autoPage: false,
  });

  // Tags section
  const tagsY = 5.8;

  if (data.puntiDiForzaTags.length > 0) {
    slide.addText('PUNTI DI FORZA', {
      x: 0.5, y: tagsY, w: 3, h: 0.25,
      fontFace: FONT, fontSize: 9, color: PPTX_COLORS.keyGrape, bold: true,
    });

    data.puntiDiForzaTags.forEach((tag, i) => {
      slide.addShape('rect', {
        x: 0.5 + i * 2.3, y: tagsY + 0.3, w: 2.1, h: 0.3,
        fill: { color: PPTX_COLORS.lightViolet },
      });
      slide.addText(tag, {
        x: 0.5 + i * 2.3, y: tagsY + 0.3, w: 2.1, h: 0.3,
        fontFace: FONT, fontSize: 8, color: PPTX_COLORS.darkViolet,
        align: 'center', valign: 'middle', bold: true,
      });
    });
  }

  if (data.areeDiMiglioramentoTags.length > 0) {
    slide.addText('AREE DI MIGLIORAMENTO', {
      x: 6.8, y: tagsY, w: 4, h: 0.25,
      fontFace: FONT, fontSize: 9, color: PPTX_COLORS.keyGrape, bold: true,
    });

    data.areeDiMiglioramentoTags.forEach((tag, i) => {
      slide.addShape('rect', {
        x: 6.8 + i * 2.3, y: tagsY + 0.3, w: 2.1, h: 0.3,
        fill: { color: PPTX_COLORS.grey },
      });
      slide.addText(tag, {
        x: 6.8 + i * 2.3, y: tagsY + 0.3, w: 2.1, h: 0.3,
        fontFace: FONT, fontSize: 8, color: PPTX_COLORS.blackK2P,
        align: 'center', valign: 'middle', bold: true,
      });
    });
  }

  addFooter(slide, 4);
}
