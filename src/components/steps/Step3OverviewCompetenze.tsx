import { useDossier } from '@/context/DossierContext';
import { RatingInput } from '@/components/form/RatingInput';
import { TextArea } from '@/components/form/TextArea';
import { FormSection } from '@/components/form/FormSection';
import { RadarChart } from '@/components/interactive/RadarChart';

export function Step3OverviewCompetenze() {
  const { state, dispatch } = useDossier();
  const data = state.slide3;

  const updateScore = (id: string, score: number) => {
    const updated = data.competencies.map(c => c.id === id ? { ...c, score } : c);
    dispatch({ type: 'UPDATE_SLIDE', slide: 'slide3', data: { competencies: updated } });
  };

  const updatePotentialScore = (id: string, score: number) => {
    const updated = data.potentialFactors.map(p => p.id === id ? { ...p, score } : p);
    dispatch({ type: 'UPDATE_SLIDE', slide: 'slide3', data: { potentialFactors: updated } });
  };

  const update = (fields: Partial<typeof data>) => {
    dispatch({ type: 'UPDATE_SLIDE', slide: 'slide3', data: fields });
  };

  const competenzeMedia = (data.competencies.reduce((sum, c) => sum + c.score, 0) / data.competencies.length).toFixed(1);
  const potenzialeMedia = (data.potentialFactors.reduce((sum, p) => sum + p.score, 0) / data.potentialFactors.length).toFixed(1);

  return (
    <div>
      <h2 className="text-xl font-bold text-k2p-dark mb-1">Overview Competenze Manageriali</h2>
      <p className="text-xs text-gray-400 mb-6">Slide 3 - Punteggi competenze e radar chart</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <FormSection title="Radar Chart Preview">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <RadarChart competencies={data.competencies} />
            </div>
          </FormSection>

          <div className="grid grid-cols-1 gap-4 mt-4">
            <TextArea
              label="Punti di Forza"
              value={data.puntiDiForza}
              onChange={v => update({ puntiDiForza: v })}
              placeholder="Descrivi i principali punti di forza..."
              rows={4}
            />
            <TextArea
              label="Aree di Miglioramento"
              value={data.areeDiMiglioramento}
              onChange={v => update({ areeDiMiglioramento: v })}
              placeholder="Descrivi le principali aree di miglioramento..."
              rows={4}
            />
          </div>
        </div>

        <div>
          <FormSection title="Competenze Manageriali" description="Valuta ogni competenza da 1 a 5">
            <div className="space-y-3">
              {data.competencies.map(comp => (
                <RatingInput
                  key={comp.id}
                  label={comp.label}
                  value={comp.score}
                  onChange={score => updateScore(comp.id, score)}
                  max={5}
                />
              ))}
            </div>
            <div className="mt-3 p-3 bg-k2p-superlight rounded-lg border border-k2p-light">
              <p className="text-xs text-k2p-grape font-medium">
                Media Competenze Manageriali: <span className="text-lg font-bold text-k2p-violet">{competenzeMedia}</span>/5
              </p>
            </div>
          </FormSection>

          <FormSection title="Potenziale" description="Valuta i 3 fattori di potenziale da 1 a 5">
            <div className="space-y-3">
              {data.potentialFactors.map(factor => (
                <RatingInput
                  key={factor.id}
                  label={factor.label}
                  value={factor.score}
                  onChange={score => updatePotentialScore(factor.id, score)}
                  max={5}
                />
              ))}
            </div>
            <div className="mt-3 p-3 bg-k2p-superlight rounded-lg border border-k2p-light">
              <p className="text-xs text-k2p-grape font-medium">
                Media Potenziale: <span className="text-lg font-bold text-k2p-violet">{potenzialeMedia}</span>/5
              </p>
            </div>
          </FormSection>
        </div>
      </div>
    </div>
  );
}
