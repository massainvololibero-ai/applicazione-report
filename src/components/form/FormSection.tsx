import type { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-k2p-grape uppercase tracking-wider mb-1">{title}</h3>
      {description && <p className="text-xs text-gray-400 mb-3">{description}</p>}
      <div className="space-y-4">{children}</div>
    </div>
  );
}
