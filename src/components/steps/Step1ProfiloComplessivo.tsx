import { useDossier } from '@/context/DossierContext';
import { TextField } from '@/components/form/TextField';
import { TextArea } from '@/components/form/TextArea';
import { RatingInput } from '@/components/form/RatingInput';
import { IndicatorSelector } from '@/components/form/IndicatorSelector';
import { FormSection } from '@/components/form/FormSection';
import type { IndicatorLevel } from '@/types/dossier';
import { CompetenzePotenzialePlot } from '@/components/interactive/CompetenzePotenzialePlot';

export function Step1ProfiloComplessivo() {
  const { state, dispatch } = useDossier();
  const data = state.slide1;
  const slide3 = state.slide3;

  const competenzeAvg = slide3.competencies.reduce((s, c) => s + c.score, 0) / slide3.competencies.length;
  const potenzialeAvg = slide3.potentialFactors.reduce((s, p) => s + p.score, 0) / slide3.potentialFactors.length;

  const update = (fields: Partial<typeof data>) => {
    dispatch({ type: 'UPDATE_SLIDE', slide: 'slide1', data: fields });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-k2p-dark mb-1">Profilo Complessivo</h2>
      <p className="text-xs text-gray-400 mb-6">Slide 1 - Informazioni generali e valutazione del candidato</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <FormSection title="Anagrafica">
            <TextField
              label="Nome Candidato"
              value={data.candidateName}
              onChange={v => update({ candidateName: v })}
              placeholder="Nome e Cognome"
            />
          </FormSection>

          <FormSection title="Carriera">
            <TextArea
              label="Carriera e Visione d'Insieme"
              value={data.carrieraVisioneInsieme}
              onChange={v => update({ carrieraVisioneInsieme: v })}
              placeholder="Descrivi il percorso professionale e la visione d'insieme..."
              rows={5}
            />
          </FormSection>

          <FormSection title="Soft Skills">
            <TextArea
              label="Business Domain"
              value={data.softSkillsBusiness}
              onChange={v => update({ softSkillsBusiness: v })}
              placeholder="Analisi, ragionamento, competenze di business..."
              rows={4}
            />
            <TextArea
              label="Action Domain"
              value={data.softSkillsAction}
              onChange={v => update({ softSkillsAction: v })}
              placeholder="Accountability, metodo di lavoro, execution..."
              rows={3}
            />
            <TextArea
              label="Relation Domain"
              value={data.softSkillsRelation}
              onChange={v => update({ softSkillsRelation: v })}
              placeholder="Approccio relazionale, people management..."
              rows={3}
            />
          </FormSection>

          <FormSection title="Considerazioni Finali">
            <TextArea
              label="Considerazioni Finali"
              value={data.considerazioniFinali}
              onChange={v => update({ considerazioniFinali: v })}
              placeholder="Sintesi della valutazione e percorso di sviluppo..."
              rows={4}
            />
          </FormSection>
        </div>

        <div className="space-y-5">
          <FormSection title="Mappa Competenze / Potenziale">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs text-gray-500">Competenze: <strong className="text-k2p-violet">{competenzeAvg.toFixed(1)}/5</strong></span>
              <span className="text-xs text-gray-500">Potenziale: <strong className="text-k2p-violet">{potenzialeAvg.toFixed(1)}/5</strong></span>
              <span className="text-xs text-gray-400">(calcolati da Step 3)</span>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-100" style={{ height: 320 }}>
              <CompetenzePotenzialePlot
                competenzeAvg={competenzeAvg}
                potenzialeAvg={potenzialeAvg}
                candidateName={data.candidateName}
              />
            </div>
          </FormSection>

          <FormSection title="Valutazioni">
            <RatingInput
              label="Valore di Mercato"
              value={data.valoreDiMercato}
              onChange={v => update({ valoreDiMercato: v })}
              max={5}
              labels={['Carenze rilevanti', 'Best in class']}
            />
          </FormSection>

          <FormSection title="Indicatori">
            <IndicatorSelector
              label="Valore Aziendale"
              value={data.valoreAziendale}
              onChange={v => update({ valoreAziendale: v as IndicatorLevel })}
            />
          </FormSection>
        </div>
      </div>
    </div>
  );
}
