interface CompetenzePotenzialePlotProps {
  competenzeAvg: number;
  potenzialeAvg: number;
  candidateName: string;
}

export function CompetenzePotenzialePlot({ competenzeAvg, potenzialeAvg, candidateName }: CompetenzePotenzialePlotProps) {
  const gridSize = 240;
  const padding = 40;
  const plotSize = gridSize - padding * 2;

  // Map 1-5 to plot coordinates
  const x = padding + ((competenzeAvg - 1) / 4) * plotSize;
  const y = padding + ((5 - potenzialeAvg) / 4) * plotSize; // invert Y

  return (
    <svg viewBox={`0 0 ${gridSize} ${gridSize}`} className="w-full h-full">
      {/* Grid background */}
      <rect x={padding} y={padding} width={plotSize} height={plotSize} fill="#FCF6FF" stroke="#E2ADFF" strokeWidth="1" />

      {/* Grid lines */}
      {[1, 2, 3].map(i => (
        <g key={i}>
          <line
            x1={padding + (i / 4) * plotSize} y1={padding}
            x2={padding + (i / 4) * plotSize} y2={padding + plotSize}
            stroke="#E2ADFF" strokeWidth="0.5" strokeDasharray="3,3"
          />
          <line
            x1={padding} y1={padding + (i / 4) * plotSize}
            x2={padding + plotSize} y2={padding + (i / 4) * plotSize}
            stroke="#E2ADFF" strokeWidth="0.5" strokeDasharray="3,3"
          />
        </g>
      ))}

      {/* Axis labels */}
      {[1, 2, 3, 4, 5].map(v => (
        <g key={v}>
          <text x={padding + ((v - 1) / 4) * plotSize} y={gridSize - 8} textAnchor="middle" fontSize="9" fill="#999">{v}</text>
          <text x={padding - 8} y={padding + ((5 - v) / 4) * plotSize + 3} textAnchor="end" fontSize="9" fill="#999">{v}</text>
        </g>
      ))}

      {/* Axis titles */}
      <text x={gridSize / 2} y={gridSize - 0} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#490473">
        Competenze Manageriali
      </text>
      <text
        x={8} y={gridSize / 2}
        textAnchor="middle" fontSize="10" fontWeight="bold" fill="#490473"
        transform={`rotate(-90, 8, ${gridSize / 2})`}
      >
        Potenziale
      </text>

      {/* Candidate dot */}
      <circle cx={x} cy={y} r="6" fill="#8E00D8" stroke="#490473" strokeWidth="2" />

      {/* Candidate name label */}
      <text x={x} y={y - 12} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#2F034A">
        {candidateName || 'Candidato'}
      </text>
    </svg>
  );
}
