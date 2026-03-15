import { useRef, useCallback } from 'react';
import type { MatrixPosition } from '@/types/dossier';

interface Matrix3x3Props {
  position: MatrixPosition;
  onChange: (position: MatrixPosition) => void;
}

const COL_LABELS = ['Stabilita', 'Sviluppo\norizzontale', 'Sviluppo\nverticale'];
const ROW_LABELS = ['Basso', 'Medio', 'Alto'];

const CELL_COLORS = [
  ['#F5F5F5', '#FCF6FF', '#F3E8FF'],
  ['#FCF6FF', '#F3E8FF', '#E8D5F5'],
  ['#F3E8FF', '#E8D5F5', '#DCC0F0'],
];

export function Matrix3x3({ position, onChange }: Matrix3x3Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const padding = 60;
    const gridW = rect.width - padding - 20;
    const gridH = rect.height - padding - 20;
    const rawX = (e.clientX - rect.left - padding) / gridW;
    const rawY = 1 - (e.clientY - rect.top - 20) / gridH;

    // Snap to nearest cell center
    const snapX = Math.max(0, Math.min(1, Math.round(rawX * 2) / 2));
    const snapY = Math.max(0, Math.min(1, Math.round(rawY * 2) / 2));
    onChange({ x: snapX, y: snapY });
  }, [onChange]);

  const pad = 60;
  const w = 420;
  const h = 320;
  const gw = w - pad - 20;
  const gh = h - 20 - 30;
  const cellW = gw / 3;
  const cellH = gh / 3;

  // Map 0, 0.5, 1 to column/row centers
  const colIdx = Math.round(position.x * 2);
  const rowIdx = Math.round(position.y * 2);
  const cx = pad + colIdx * cellW + cellW / 2;
  const cy = 20 + (2 - rowIdx) * cellH + cellH / 2;

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${w} ${h}`}
        className="w-full cursor-crosshair"
        onClick={handleClick}
      >
        {/* Grid cells */}
        {[0, 1, 2].map(row =>
          [0, 1, 2].map(col => (
            <rect
              key={`${row}-${col}`}
              x={pad + col * cellW}
              y={20 + row * cellH}
              width={cellW}
              height={cellH}
              fill={CELL_COLORS[2 - row][col]}
              stroke="#E2ADFF"
              strokeWidth="1"
            />
          ))
        )}

        {/* Column labels */}
        {COL_LABELS.map((label, i) => (
          <text
            key={`col-${i}`}
            x={pad + i * cellW + cellW / 2}
            y={h - 5}
            textAnchor="middle"
            fill="#490473"
            fontSize="9"
            fontWeight="600"
          >
            {label.split('\n').map((line, li) => (
              <tspan key={li} x={pad + i * cellW + cellW / 2} dy={li === 0 ? 0 : 11}>{line}</tspan>
            ))}
          </text>
        ))}

        {/* Row labels */}
        {ROW_LABELS.map((label, i) => (
          <text
            key={`row-${i}`}
            x={pad - 8}
            y={20 + (2 - i) * cellH + cellH / 2}
            textAnchor="end"
            dominantBaseline="middle"
            fill="#490473"
            fontSize="9"
            fontWeight="600"
          >
            {label}
          </text>
        ))}

        {/* Axis titles */}
        <text x={pad + gw / 2} y={h - 28} textAnchor="middle" fill="#490473" fontSize="11" fontWeight="bold">PERCORSO</text>
        <text x={14} y={20 + gh / 2} textAnchor="middle" fill="#490473" fontSize="11" fontWeight="bold"
          transform={`rotate(-90, 14, ${20 + gh / 2})`}>POTENZIALE DI LEADERSHIP</text>

        {/* Dot */}
        <circle cx={cx} cy={cy} r="12" fill="#8E00D8" stroke="#490473" strokeWidth="2" />
        <circle cx={cx} cy={cy} r="5" fill="white" />
      </svg>
    </div>
  );
}
