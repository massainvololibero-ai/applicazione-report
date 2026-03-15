import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface TagInputProps {
  label: string;
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (index: number) => void;
  variant?: 'violet' | 'grey';
}

export function TagInput({ label, tags, onAdd, onRemove, variant = 'violet' }: TagInputProps) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onAdd(trimmed);
      setInput('');
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-2">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          placeholder="Aggiungi..."
          className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-k2p-black"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="p-2 bg-k2p-superlight text-k2p-violet rounded-lg hover:bg-k2p-light transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <Badge key={i} label={tag} onRemove={() => onRemove(i)} variant={variant} />
          ))}
        </div>
      )}
    </div>
  );
}
