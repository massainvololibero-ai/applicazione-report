import { X } from 'lucide-react';

interface BadgeProps {
  label: string;
  onRemove?: () => void;
  variant?: 'violet' | 'grey';
}

export function Badge({ label, onRemove, variant = 'violet' }: BadgeProps) {
  const colors = variant === 'violet'
    ? 'bg-k2p-superlight text-k2p-grape border-k2p-light'
    : 'bg-gray-100 text-gray-600 border-gray-200';

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg border ${colors}`}>
      {label}
      {onRemove && (
        <button onClick={onRemove} className="hover:text-k2p-violet transition-colors ml-1">
          <X size={12} />
        </button>
      )}
    </span>
  );
}
