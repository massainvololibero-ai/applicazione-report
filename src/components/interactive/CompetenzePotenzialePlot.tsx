interface CompetenzePotenzialePlotProps {
  competenzeAvg: number;
  potenzialeAvg: number;
  candidateName: string;
}

export function CompetenzePotenzialePlot({ competenzeAvg, potenzialeAvg, candidateName }: CompetenzePotenzialePlotProps) {
  const svgW = 340;
  const svgH = 340;
  const padL = 40;
  const padR = 15;
  const padT = 25;
  const padB = 30;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  // Map 1-5 to plot coordinates
  const x = padL + ((competenzeAvg - 1) / 4) * plotW;
  const y = padT + ((5 - potenzialeAvg) / 4) * plotH;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Grid background */}
      <rect x={padL} y={padT} width={plotW} height={plotH} fill="#FCF6FF" stroke="#E2ADFF" strokeWidth="1" />

      {/* Grid lines */}
      {[1, 2, 3].map(i => (
        <g key={i}>
          <line
            x1={padL + (i / 4) * plotW} y1={padT}
            x2={padL + (i / 4) * plotW} y2={padT + plotH}
            stroke="#E2ADFF" strokeWidth="0.5" strokeDasharray="3,3"
          />
          <line
            x1={padL} y1={padT + (i / 4) * plotH}
            x2={padL + plotW} y2={padT + (i / 4) * plotH}
            stroke="#E2ADFF" strokeWidth="0.5" strokeDasharray="3,3"
          />
        </g>
      ))}

      {/* Axis labels */}
      {[1, 2, 3, 4, 5].map(v => (
        <g key={v}>
          <text x={padL + ((v - 1) / 4) * plotW} y={padT + plotH + 16} textAnchor="middle" fontSize="9" fill="#999">{v}</text>
          <text x={padL - 8} y={padT + ((5 - v) / 4) * plotH + 3} textAnchor="end" fontSize="9" fill="#999">{v}</text>
        </g>
      ))}

      {/* Axis titles */}
      <text x={padL + plotW / 2} y={svgH - 2} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#490473">
        Competenze Manageriali
      </text>
      <text
        x={10} y={padT + plotH / 2}
        textAnchor="middle" fontSize="10" fontWeight="bold" fill="#490473"
        transform={`rotate(-90, 10, ${padT + plotH / 2})`}
      >
        Potenziale
      </text>

      {/* Candidate dot */}
      <circle cx={x} cy={y} r="7" fill="#8E00D8" stroke="#490473" strokeWidth="2" />

      {/* Candidate name label */}
      <text x={x} y={y - 14} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2F034A">
        {candidateName || 'Candidato'}
      </text>
    </svg>
  );
}
