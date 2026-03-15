interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}

export function TextArea({ label, value, onChange, placeholder, rows = 4, maxLength }: TextAreaProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-gray-500">{label}</label>
        {maxLength && (
          <span className={`text-xs ${value.length > maxLength * 0.9 ? 'text-k2p-purple' : 'text-gray-300'}`}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-k2p-black resize-y transition-all duration-200 leading-relaxed"
      />
    </div>
  );
}
