import { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import RadioToggle from '@/components/reuseable/radio-toggle';

// Weekly and Monthly Data
const weeklyData = [
  { day: 'Mon', value: 1800, date: '22 Apr, 2024' },
  { day: 'Tue', value: 3200, date: '23 Apr, 2024' },
  { day: 'Wed', value: 2800, date: '24 Apr, 2024' },
  { day: 'Thu', value: 4200, date: '25 Apr, 2024' },
  { day: 'Fri', value: 3800, date: '26 Apr, 2024' },
  { day: 'Sat', value: 4400, date: '27 Apr, 2024' },
  { day: 'Sun', value: 2600, date: '28 Apr, 2024' },
];

const monthlyData = [
  { day: '1-7 Apr, 2024', value: 12000 },
  { day: '8-14 Apr, 2024', value: 18000 },
  { day: '15-21 Apr, 2024', value: 15000 },
  { day: '22-28 Apr, 2024', value: 22000 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      date: string;
      value: number;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const value = payload[0].value;
    const prevValue = 2000; // Mock previous value for calculation
    const change = value - prevValue;
    const sign = change >= 0 ? '+' : '';

    return (
      <div className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-white font-medium">
          {sign}
          {(change / 1000).toFixed(1)}k
        </p>
        <p className="text-slate-400 text-sm">{data?.date}</p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');

  const data = period === 'weekly' ? weeklyData : monthlyData;
  const maxValue = period === 'weekly' ? 5000 : 25000;

  return (
    <div className="space-y-6 bg-figma-chart rounded-xl p-4 mt-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">Static analysis</p>
          <h2 className="text-white text-2xl font-semibold">Revenues</h2>
        </div>

        {/* Period Toggle */}
        <RadioToggle
          value={period}
          onValueChange={(value) => setPeriod(value as 'weekly' | 'monthly')}
          options={[
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' },
          ]}
        />
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            // margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="revenueGradientFill" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
              domain={[0, maxValue]}
              ticks={[0, maxValue * 0.4, maxValue * 0.6, maxValue * 0.8, maxValue]}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: '#475569',
                strokeWidth: 1,
                strokeDasharray: '4 4',
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#revenueGradient)"
              strokeWidth={2}
              fill="url(#revenueGradientFill)"
              dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                fill: '#14b8a6',
                strokeWidth: 2,
                stroke: '#1e293b',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
