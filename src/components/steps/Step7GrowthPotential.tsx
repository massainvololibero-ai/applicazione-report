import { useDossier } from '@/context/DossierContext';
import { TextArea } from '@/components/form/TextArea';
import { FormSection } from '@/components/form/FormSection';
import { Matrix3x3 } from '@/components/interactive/Matrix3x3';

export function Step7GrowthPotential() {
  const { state, dispatch } = useDossier();
  const data = state.slide7;

  const update = (fields: Partial<typeof data>) => {
    dispatch({ type: 'UPDATE_SLIDE', slide: 'slide7', data: fields });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-k2p-dark mb-1">Growth Potential</h2>
      <p className="text-xs text-gray-400 mb-6">Slide 7 - Posiziona il candidato sulla matrice di crescita</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormSection title="Matrice Growth Potential" description="Clicca sulla cella per posizionare il candidato">
          <Matrix3x3
            position={data.matrixPosition}
            onChange={pos => update({ matrixPosition: pos })}
          />
        </FormSection>

        <FormSection title="Commento">
          <TextArea
            label="Analisi Growth Potential"
            value={data.commento}
            onChange={v => update({ commento: v })}
            placeholder="Commenta il potenziale di crescita del candidato..."
            rows={8}
          />
        </FormSection>
      </div>
    </div>
  );
}
