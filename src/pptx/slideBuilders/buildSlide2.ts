import type PptxGenJS from 'pptxgenjs';
import type { HighlightsBusinessCase } from '@/types/dossier';
import { PPTX_COLORS, FONT } from '@/constants/brand';
import { addTopBar, addFooter } from '../helpers/pptxShapes';
import { addSectionHeader, addBodyText } from '../helpers/pptxText';

export function buildSlide2(pres: PptxGenJS, data: HighlightsBusinessCase) {
  const slide = pres.addSlide();
  slide.background = { fill: PPTX_COLORS.white };

  addTopBar(slide, 'Highlights Business case & Role play', 'Executive Assessment');

  // Business Case section
  addSectionHeader(slide, 'Business Case', 0.5, 0.9, 12);

  // Separator line
  slide.addShape('line', {
    x: 0.5, y: 1.12, w: 12.3, h: 0,
    line: { color: PPTX_COLORS.unlockedViolet, width: 1 },
  });

  addBodyText(slide, data.businessCase, 0.5, 1.2, 12.3, 2.2);

  // Role Play section
  addSectionHeader(slide, 'Role Play', 0.5, 3.5, 12);
  slide.addShape('line', {
    x: 0.5, y: 3.72, w: 12.3, h: 0,
    line: { color: PPTX_COLORS.unlockedViolet, width: 1 },
  });

  // Two columns
  // Capo Collaboratore
  slide.addText('Capo Collaboratore', {
    x: 0.5, y: 3.85, w: 5.9, h: 0.25,
    fontFace: FONT, fontSize: 9, color: PPTX_COLORS.keyGrape, bold: true,
  });
  addBodyText(slide, data.rolePlayCapoCollaboratore, 0.5, 4.1, 5.9, 2.5);

  // Vertical separator
  slide.addShape('line', {
    x: 6.66, y: 3.85, w: 0, h: 2.8,
    line: { color: PPTX_COLORS.grey, width: 1 },
  });

  // Peer to Peer
  slide.addText('Peer to Peer', {
    x: 6.9, y: 3.85, w: 5.9, h: 0.25,
    fontFace: FONT, fontSize: 9, color: PPTX_COLORS.keyGrape, bold: true,
  });
  addBodyText(slide, data.rolePlayPeerToPeer, 6.9, 4.1, 5.9, 2.5);

  addFooter(slide, 2);
}
