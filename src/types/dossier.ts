export type IndicatorLevel = 'basso' | 'medio-basso' | 'medio' | 'medio-alto' | 'alto';

export type ReadinessStatus = 'non_pronto' | 'pronto_con_restrizioni' | 'pronto_subito';

export interface MatrixPosition {
  x: number;
  y: number;
}

export interface ProfiloComplessivo {
  candidateName: string;
  carrieraVisioneInsieme: string;
  softSkillsBusiness: string;
  softSkillsAction: string;
  softSkillsRelation: string;
  considerazioniFinali: string;
  valoreDiMercato: number;
  competenzeManageriali: IndicatorLevel;
  potenziale: IndicatorLevel;
  valoreAziendale: IndicatorLevel;
}

export interface HighlightsBusinessCase {
  businessCase: string;
  rolePlayCapoCollaboratore: string;
  rolePlayPeerToPeer: string;
}

export interface CompetencyScore {
  id: string;
  label: string;
  score: number;
}

export interface PotentialFactor {
  id: string;
  label: string;
  score: number;
}

export interface OverviewCompetenze {
  competencies: CompetencyScore[];
  potentialFactors: PotentialFactor[];
  puntiDiForza: string;
  areeDiMiglioramento: string;
}

export interface DevelopmentToolRow {
  id: string;
  label: string;
  note: string;
}

export interface SupportoSviluppo {
  developmentTools: DevelopmentToolRow[];
  puntiDiForzaTags: string[];
  areeDiMiglioramentoTags: string[];
}

export interface ReadinessTraiettorie {
  aspettativeFuture: string;
  readinessDescription: string;
  engagement: string;
  readinessForRole: number;
  roleName: string;
  readinessStatus: ReadinessStatus;
}

export interface RischioUscita {
  matrixPosition: MatrixPosition;
  commento: string;
}

export interface GrowthPotential {
  matrixPosition: MatrixPosition;
  commento: string;
}

export interface DossierData {
  slide1: ProfiloComplessivo;
  slide2: HighlightsBusinessCase;
  slide3: OverviewCompetenze;
  slide4: SupportoSviluppo;
  slide5: ReadinessTraiettorie;
  slide6: RischioUscita;
  slide7: GrowthPotential;
}
