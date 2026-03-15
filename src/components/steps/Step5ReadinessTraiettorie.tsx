import { useDossier } from '@/context/DossierContext';
import { TextField } from '@/components/form/TextField';
import { TextArea } from '@/components/form/TextArea';
import { RatingInput } from '@/components/form/RatingInput';
import { ReadinessSelector } from '@/components/form/ReadinessSelector';
import { FormSection } from '@/components/form/FormSection';

export function Step5ReadinessTraiettorie() {
  const { state, dispatch } = useDossier();
  const data = state.slide5;

  const update = (fields: Partial<typeof data>) => {
    dispatch({ type: 'UPDATE_SLIDE', slide: 'slide5', data: fields });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-k2p-dark mb-1">Readiness e Traiettorie Evolutive</h2>
      <p className="text-xs text-gray-400 mb-6">Slide 5 - Prontezza per il ruolo target e percorsi di crescita</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <FormSection title="Testi Descrittivi">
            <TextArea
              label="Aspettative Future"
              value={data.aspettativeFuture}
              onChange={v => update({ aspettativeFuture: v })}
              placeholder="Focus di lettura business e successione..."
              rows={4}
            />
            <TextArea
              label="Readiness / Traiettorie Evolutive"
              value={data.readinessDescription}
              onChange={v => update({ readinessDescription: v })}
              placeholder="Capacita tecniche e manageriali, potenziale..."
              rows={5}
            />
            <TextArea
              label="Engagement"
              value={data.engagement}
              onChange={v => update({ engagement: v })}
              placeholder="Livello di engagement e motivazione..."
              rows={3}
            />
          </FormSection>
        </div>

        <div className="space-y-5">
          <FormSection title="Valutazione Readiness">
            <TextField
              label="Nome Ruolo Target"
              value={data.roleName}
              onChange={v => update({ roleName: v })}
              placeholder="Es: Dir. Operations"
            />
            <RatingInput
              label="Readiness per il Ruolo"
              value={data.readinessForRole}
              onChange={v => update({ readinessForRole: v })}
              max={4}
              labels={['Non adatto ora', 'Possiede a pieno i requisiti']}
            />
            <ReadinessSelector
              value={data.readinessStatus}
              onChange={v => update({ readinessStatus: v })}
            />
          </FormSection>
        </div>
      </div>
    </div>
  );
}
