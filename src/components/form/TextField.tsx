interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextField({ label, value, onChange, placeholder }: TextFieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-k2p-black transition-all duration-200"
      />
    </div>
  );
}
