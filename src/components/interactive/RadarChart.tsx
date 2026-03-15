import {
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import type { CompetencyScore } from '@/types/dossier';

interface RadarChartProps {
  competencies: CompetencyScore[];
}

export function RadarChart({ competencies }: RadarChartProps) {
  const data = competencies.map(c => ({
    name: c.label,
    score: c.score,
    fullMark: 5,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RechartsRadar data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="#E2ADFF" strokeOpacity={0.5} />
        <PolarAngleAxis
          dataKey="name"
          tick={{ fill: '#272727', fontSize: 9 }}
          tickLine={false}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 5]}
          tickCount={6}
          tick={{ fill: '#999', fontSize: 8 }}
          axisLine={false}
        />
        <Radar
          dataKey="score"
          stroke="#8E00D8"
          fill="#8E00D8"
          fillOpacity={0.15}
          strokeWidth={2}
          dot={{ r: 4, fill: '#8E00D8', stroke: '#490473', strokeWidth: 1 }}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
