import PptxGenJS from 'pptxgenjs';
import type { DossierData } from '@/types/dossier';
import { buildSlide1 } from './slideBuilders/buildSlide1';
import { buildSlide2 } from './slideBuilders/buildSlide2';
import { buildSlide3 } from './slideBuilders/buildSlide3';
import { buildSlide4 } from './slideBuilders/buildSlide4';
import { buildSlide5 } from './slideBuilders/buildSlide5';
import { buildSlide6 } from './slideBuilders/buildSlide6';
import { buildSlide7 } from './slideBuilders/buildSlide7';

export async function generateDossier(data: DossierData): Promise<void> {
  const pres = new PptxGenJS();

  // Configure presentation
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'Key2people Assessment Platform';
  pres.company = 'Key2people';
  pres.subject = `Executive Assessment - ${data.slide1.candidateName}`;
  pres.title = `Assessment Dossier - ${data.slide1.candidateName}`;

  // Build each slide
  buildSlide1(pres, data.slide1);
  buildSlide2(pres, data.slide2);
  buildSlide3(pres, data.slide3);
  buildSlide4(pres, data.slide4);
  buildSlide5(pres, data.slide5);
  buildSlide6(pres, data.slide6);
  buildSlide7(pres, data.slide7);

  // Generate file
  const fileName = data.slide1.candidateName
    ? `Assessment_${data.slide1.candidateName.replace(/\s+/g, '_')}.pptx`
    : 'Assessment_Dossier.pptx';

  await pres.writeFile({ fileName });
}
