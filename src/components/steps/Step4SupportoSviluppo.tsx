import { useDossier } from '@/context/DossierContext';
import { TextArea } from '@/components/form/TextArea';
import { TagInput } from '@/components/form/TagInput';
import { FormSection } from '@/components/form/FormSection';

export function Step4SupportoSviluppo() {
  const { state, dispatch } = useDossier();
  const data = state.slide4;

  const updateToolNote = (id: string, note: string) => {
    const updated = data.developmentTools.map(t => t.id === id ? { ...t, note } : t);
    dispatch({ type: 'UPDATE_SLIDE', slide: 'slide4', data: { developmentTools: updated } });
  };

  const update = (fields: Partial<typeof data>) => {
    dispatch({ type: 'UPDATE_SLIDE', slide: 'slide4', data: fields });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-k2p-dark mb-1">Supporto al Processo di Sviluppo</h2>
      <p className="text-xs text-gray-400 mb-6">Slide 4 - Strumenti e azioni di sviluppo suggeriti</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormSection title="Strumenti di Sviluppo">
          <div className="space-y-3">
            {data.developmentTools.map(tool => (
              <div key={tool.id} className="bg-white rounded-xl p-3 border border-gray-100">
                <label className="block text-xs font-semibold text-k2p-grape mb-1.5">{tool.label}</label>
                <TextArea
                  label=""
                  value={tool.note}
                  onChange={v => updateToolNote(tool.id, v)}
                  placeholder="Note e raccomandazioni..."
                  rows={2}
                />
              </div>
            ))}
          </div>
        </FormSection>

        <div className="space-y-5">
          <FormSection title="Etichette Sintesi">
            <TagInput
              label="Punti di Forza"
              tags={data.puntiDiForzaTags}
              onAdd={tag => update({ puntiDiForzaTags: [...data.puntiDiForzaTags, tag] })}
              onRemove={i => update({ puntiDiForzaTags: data.puntiDiForzaTags.filter((_, idx) => idx !== i) })}
              variant="violet"
            />
            <TagInput
              label="Aree di Miglioramento"
              tags={data.areeDiMiglioramentoTags}
              onAdd={tag => update({ areeDiMiglioramentoTags: [...data.areeDiMiglioramentoTags, tag] })}
              onRemove={i => update({ areeDiMiglioramentoTags: data.areeDiMiglioramentoTags.filter((_, idx) => idx !== i) })}
              variant="grey"
            />
          </FormSection>
        </div>
      </div>
    </div>
  );
}
