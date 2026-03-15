interface RatingInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  labels?: string[];
}

export function RatingInput({ label, value, onChange, max = 5, labels }: RatingInputProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-2">{label}</label>
      <div className="flex items-center gap-2">
        {Array.from({ length: max }, (_, i) => {
          const n = i + 1;
          const isActive = n <= value;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-k2p-violet text-white shadow-md shadow-k2p-violet/30'
                  : 'bg-k2p-grey text-gray-400 hover:bg-k2p-light hover:text-k2p-grape'
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      {labels && (
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-gray-400">{labels[0]}</span>
          <span className="text-[10px] text-gray-400">{labels[labels.length - 1]}</span>
        </div>
      )}
    </div>
  );
}
