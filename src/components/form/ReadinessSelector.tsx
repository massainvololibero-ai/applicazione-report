import type { ReadinessStatus } from '@/types/dossier';
import { Circle, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ReadinessSelectorProps {
  value: ReadinessStatus;
  onChange: (value: ReadinessStatus) => void;
}

const options: { value: ReadinessStatus; label: string; icon: typeof Circle; color: string; bg: string }[] = [
  { value: 'non_pronto', label: 'Non pronto', icon: Circle, color: 'text-gray-400', bg: 'bg-gray-50 border-gray-200 hover:border-gray-300' },
  { value: 'pronto_con_restrizioni', label: 'Pronto con restrizioni', icon: AlertCircle, color: 'text-k2p-purple', bg: 'bg-k2p-superlight border-k2p-light hover:border-k2p-violet' },
  { value: 'pronto_subito', label: 'Pronto subito', icon: CheckCircle2, color: 'text-k2p-violet', bg: 'bg-k2p-superlight border-k2p-violet hover:border-k2p-grape' },
];

export function ReadinessSelector({ value, onChange }: ReadinessSelectorProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-2">Stato di Readiness</label>
      <div className="grid grid-cols-3 gap-2">
        {options.map(opt => {
          const Icon = opt.icon;
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? `${opt.bg} border-k2p-violet shadow-md shadow-k2p-violet/10`
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon size={20} className={isSelected ? opt.color : 'text-gray-300'} />
              <span className={`text-xs font-medium text-center ${isSelected ? 'text-k2p-grape' : 'text-gray-400'}`}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
