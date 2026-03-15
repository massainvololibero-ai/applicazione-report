import { useRef, useCallback } from 'react';
import type { MatrixPosition } from '@/types/dossier';

interface Matrix2x2Props {
  position: MatrixPosition;
  onChange: (position: MatrixPosition) => void;
}

const QUADRANT_LABELS = [
  { x: 0.25, y: 0.75, text: 'Alta prob.\nAlto danno', bg: '#F3E8FF' },
  { x: 0.75, y: 0.75, text: 'Bassa prob.\nAlto danno', bg: '#FCF6FF' },
  { x: 0.25, y: 0.25, text: 'Alta prob.\nMedio danno', bg: '#FCF6FF' },
  { x: 0.75, y: 0.25, text: 'Bassa prob.\nMedio danno', bg: '#F8F8F8' },
];

export function Matrix2x2({ position, onChange }: Matrix2x2Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const padding = 40;
    const gridW = rect.width - padding * 2;
    const gridH = rect.height - padding * 2;
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left - padding) / gridW));
    const y = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top - padding) / gridH));
    onChange({ x, y });
  }, [onChange]);

  const pad = 40;
  const w = 400;
  const h = 300;
  const gw = w - pad * 2;
  const gh = h - pad * 2;
  const dotX = pad + position.x * gw;
  const dotY = pad + (1 - position.y) * gh;

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${w} ${h}`}
        className="w-full cursor-crosshair"
        onClick={handleClick}
      >
        {QUADRANT_LABELS.map((q, i) => (
          <rect
            key={i}
            x={pad + (q.x < 0.5 ? 0 : gw / 2)}
            y={pad + (q.y > 0.5 ? 0 : gh / 2)}
            width={gw / 2}
            height={gh / 2}
            fill={q.bg}
            stroke="#E2ADFF"
            strokeWidth="1"
          />
        ))}

        {QUADRANT_LABELS.map((q, i) => (
          <text
            key={`label-${i}`}
            x={pad + q.x * gw}
            y={pad + (1 - q.y) * gh}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#999"
            fontSize="9"
          >
            {q.text.split('\n').map((line, li) => (
              <tspan key={li} x={pad + q.x * gw} dy={li === 0 ? 0 : 12}>{line}</tspan>
            ))}
          </text>
        ))}

        {/* Axes */}
        <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#272727" strokeWidth="1.5" />
        <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="#272727" strokeWidth="1.5" />

        {/* Axis labels */}
        <text x={w / 2} y={h - 8} textAnchor="middle" fill="#490473" fontSize="11" fontWeight="bold">ENGAGEMENT</text>
        <text x={8} y={h / 2} textAnchor="middle" fill="#490473" fontSize="11" fontWeight="bold"
          transform={`rotate(-90, 12, ${h / 2})`}>BENCHMARK</text>
        <text x={pad + 5} y={h - pad + 14} fill="#999" fontSize="8">Basso</text>
        <text x={w - pad - 20} y={h - pad + 14} fill="#999" fontSize="8">Alto</text>
        <text x={pad - 5} y={pad + 5} fill="#999" fontSize="8" textAnchor="end">Alto</text>
        <text x={pad - 5} y={h - pad} fill="#999" fontSize="8" textAnchor="end">Basso</text>

        {/* Dot */}
        <circle cx={dotX} cy={dotY} r="10" fill="#8E00D8" stroke="#490473" strokeWidth="2" />
        <circle cx={dotX} cy={dotY} r="4" fill="white" />
      </svg>
    </div>
  );
}
