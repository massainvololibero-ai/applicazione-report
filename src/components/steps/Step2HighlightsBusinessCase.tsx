import { useDossier } from '@/context/DossierContext';
import { TextArea } from '@/components/form/TextArea';
import { FormSection } from '@/components/form/FormSection';

export function Step2HighlightsBusinessCase() {
  const { state, dispatch } = useDossier();
  const data = state.slide2;

  const update = (fields: Partial<typeof data>) => {
    dispatch({ type: 'UPDATE_SLIDE', slide: 'slide2', data: fields });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-k2p-dark mb-1">Highlights Business Case & Role Play</h2>
      <p className="text-xs text-gray-400 mb-6">Slide 2 - Evidenze emerse dalle prove di assessment</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormSection title="Business Case">
          <TextArea
            label="Business Case"
            value={data.businessCase}
            onChange={v => update({ businessCase: v })}
            placeholder="Descrivi le evidenze emerse dal business case..."
            rows={8}
          />
        </FormSection>

        <div className="space-y-5">
          <FormSection title="Role Play">
            <TextArea
              label="Capo Collaboratore"
              value={data.rolePlayCapoCollaboratore}
              onChange={v => update({ rolePlayCapoCollaboratore: v })}
              placeholder="Dinamiche emerse nella relazione capo-collaboratore..."
              rows={5}
            />
            <TextArea
              label="Peer to Peer"
              value={data.rolePlayPeerToPeer}
              onChange={v => update({ rolePlayPeerToPeer: v })}
              placeholder="Dinamiche emerse nella relazione tra pari..."
              rows={5}
            />
          </FormSection>
        </div>
      </div>
    </div>
  );
}
