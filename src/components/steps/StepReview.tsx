import { useDossier } from '@/context/DossierContext';
import { RadarChart } from '@/components/interactive/RadarChart';
import { INDICATOR_LEVELS } from '@/constants/brand';

export function StepReview() {
  const { state } = useDossier();
  const { slide1, slide2, slide3, slide4, slide5, slide6, slide7 } = state;

  const getIndicatorLabel = (value: string) =>
    INDICATOR_LEVELS.find(l => l.value === value)?.label ?? value;

  const competenzeAvg = slide3.competencies.reduce((s, c) => s + c.score, 0) / slide3.competencies.length;
  const potenzialeAvg = slide3.potentialFactors.reduce((s, p) => s + p.score, 0) / slide3.potentialFactors.length;

  function averageToIndicator(avg: number) {
    if (avg <= 1.5) return 'basso';
    if (avg <= 2.5) return 'medio-basso';
    if (avg <= 3.5) return 'medio';
    if (avg <= 4.5) return 'medio-alto';
    return 'alto';
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-k2p-dark mb-1">Revisione e Generazione</h2>
      <p className="text-xs text-gray-400 mb-6">Controlla i dati prima di generare il dossier PPTX</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Slide 1 Summary */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h4 className="text-xs font-bold text-k2p-grape uppercase mb-2">1. Profilo Complessivo</h4>
          <p className="text-sm font-semibold text-k2p-dark mb-1">{slide1.candidateName || '(nome non inserito)'}</p>
          <p className="text-xs text-gray-400">Valore di mercato: <span className="font-bold text-k2p-violet">{slide1.valoreDiMercato}/5</span></p>
          <p className="text-xs text-gray-400">Competenze: {getIndicatorLabel(averageToIndicator(competenzeAvg))} ({competenzeAvg.toFixed(1)}/5)</p>
          <p className="text-xs text-gray-400">Potenziale: {getIndicatorLabel(averageToIndicator(potenzialeAvg))} ({potenzialeAvg.toFixed(1)}/5)</p>
        </div>

        {/* Slide 2 Summary */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h4 className="text-xs font-bold text-k2p-grape uppercase mb-2">2. Business Case & Role Play</h4>
          <p className="text-xs text-gray-400 line-clamp-3">{slide2.businessCase || '(non compilato)'}</p>
        </div>

        {/* Slide 3 Summary */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h4 className="text-xs font-bold text-k2p-grape uppercase mb-2">3. Competenze Manageriali</h4>
          <div className="h-48">
            <RadarChart competencies={slide3.competencies} />
          </div>
        </div>

        {/* Slide 4 Summary */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h4 className="text-xs font-bold text-k2p-grape uppercase mb-2">4. Supporto Sviluppo</h4>
          <p className="text-xs text-gray-400">
            {slide4.developmentTools.filter(t => t.note).length}/6 strumenti compilati
          </p>
          {slide4.puntiDiForzaTags.length > 0 && (
            <p className="text-xs text-gray-400 mt-1">Forza: {slide4.puntiDiForzaTags.join(', ')}</p>
          )}
        </div>

        {/* Slide 5 Summary */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h4 className="text-xs font-bold text-k2p-grape uppercase mb-2">5. Readiness</h4>
          <p className="text-xs text-gray-400">Ruolo: {slide5.roleName || '(non specificato)'}</p>
          <p className="text-xs text-gray-400">Readiness: <span className="font-bold text-k2p-violet">{slide5.readinessForRole}/4</span></p>
          <p className="text-xs text-gray-400">Stato: {slide5.readinessStatus.replace(/_/g, ' ')}</p>
        </div>

        {/* Slide 6 Summary */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h4 className="text-xs font-bold text-k2p-grape uppercase mb-2">6. Rischio di Uscita</h4>
          <p className="text-xs text-gray-400">
            Engagement: {(slide6.matrixPosition.x * 100).toFixed(0)}% |
            Benchmark: {(slide6.matrixPosition.y * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{slide6.commento || '(nessun commento)'}</p>
        </div>

        {/* Slide 7 Summary */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 md:col-span-2 lg:col-span-1">
          <h4 className="text-xs font-bold text-k2p-grape uppercase mb-2">7. Growth Potential</h4>
          <p className="text-xs text-gray-400">
            Percorso: {['Stabilita', 'Sviluppo orizz.', 'Sviluppo vert.'][Math.round(slide7.matrixPosition.x * 2)]} |
            Potenziale: {['Basso', 'Medio', 'Alto'][Math.round(slide7.matrixPosition.y * 2)]}
          </p>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{slide7.commento || '(nessun commento)'}</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-k2p-superlight rounded-xl border border-k2p-light text-center">
        <p className="text-sm text-k2p-grape font-medium">
          Premi "Genera PPTX" per scaricare il dossier completo di {slide1.candidateName || 'assessment'}
        </p>
      </div>
    </div>
  );
}
