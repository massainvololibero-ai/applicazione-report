import { useDossier } from '@/context/DossierContext';
import { TextArea } from '@/components/form/TextArea';
import { FormSection } from '@/components/form/FormSection';
import { Matrix2x2 } from '@/components/interactive/Matrix2x2';

export function Step6RischioUscita() {
  const { state, dispatch } = useDossier();
  const data = state.slide6;

  const update = (fields: Partial<typeof data>) => {
    dispatch({ type: 'UPDATE_SLIDE', slide: 'slide6', data: fields });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-k2p-dark mb-1">Rischio di Uscita</h2>
      <p className="text-xs text-gray-400 mb-6">Slide 6 - Posiziona il candidato sulla matrice di rischio</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormSection title="Matrice di Rischio" description="Clicca sulla matrice per posizionare il candidato">
          <Matrix2x2
            position={data.matrixPosition}
            onChange={pos => update({ matrixPosition: pos })}
          />
        </FormSection>

        <FormSection title="Commento">
          <TextArea
            label="Analisi del Rischio"
            value={data.commento}
            onChange={v => update({ commento: v })}
            placeholder="Commenta il posizionamento del candidato nella matrice di rischio..."
            rows={8}
          />
        </FormSection>
      </div>
    </div>
  );
}
