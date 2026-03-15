import type { CompetencyScore } from '@/types/dossier';

export const COMPETENCY_LABELS = [
  { id: 'innovazione_sostenibile', label: 'Innovazione sostenibile' },
  { id: 'market_insight', label: 'Market insight' },
  { id: 'mindset_trasformazionale', label: 'Mindset trasformazionale' },
  { id: 'agilita', label: 'Agilita' },
  { id: 'gestione_complessita', label: 'Gestione della complessita' },
  { id: 'sicurezza', label: 'Sicurezza' },
  { id: 'condivisione_networking', label: 'Condivisione e networking' },
  { id: 'inclusione_diversita', label: 'Inclusione e valorizzazione della diversita' },
  { id: 'responsabilita_sociale', label: 'Responsabilita sociale' },
  { id: 'leadership_ispirazionale', label: 'Leadership ispirazionale' },
  { id: 'integrita', label: 'Integrita' },
] as const;

export const DEFAULT_COMPETENCIES: CompetencyScore[] = COMPETENCY_LABELS.map(c => ({
  id: c.id,
  label: c.label,
  score: 3,
}));
