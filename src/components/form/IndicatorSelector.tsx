import type { IndicatorLevel } from '@/types/dossier';
import { INDICATOR_LEVELS } from '@/constants/brand';

interface IndicatorSelectorProps {
  label: string;
  value: IndicatorLevel;
  onChange: (value: IndicatorLevel) => void;
}

export function IndicatorSelector({ label, value, onChange }: IndicatorSelectorProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-2">{label}</label>
      <div className="flex gap-1.5">
        {INDICATOR_LEVELS.map((level) => {
          const isSelected = value === level.value;
          return (
            <button
              key={level.value}
              type="button"
              onClick={() => onChange(level.value as IndicatorLevel)}
              className={`flex-1 py-2 px-1 text-[10px] font-medium rounded-lg transition-all duration-200 text-center ${
                isSelected
                  ? 'bg-k2p-violet text-white shadow-md shadow-k2p-violet/20'
                  : 'bg-k2p-grey/50 text-gray-400 hover:bg-k2p-light/50'
              }`}
              title={level.label}
            >
              {level.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
