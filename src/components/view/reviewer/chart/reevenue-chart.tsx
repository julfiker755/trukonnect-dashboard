import { useState, useMemo } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import RadioToggle from '@/components/reuseable/radio-toggle';

interface RevenueChartProps {
  data: {
    totaluser: number;
    totalrevenue: string;
    weeklyrevenue: { day: string; total: number }[];
    monthlyrevenue: { day: number; total: number }[];
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const value = payload[0]?.value;
    const label = payload[0]?.payload?.label;

    return (
      <div className="bg-slate-700/90 backdrop-blur border border-slate-600 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-white font-medium text-sm sm:text-base">{value}</p>
        <p className="text-slate-400 text-xs sm:text-sm">{label}</p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ data }: RevenueChartProps) {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');

  const chartData = useMemo(() => {
    if (!data) return [];
    return period === 'weekly'
      ? data.weeklyrevenue.map((item) => ({
          label: item?.day,
          value: item?.total,
        }))
      : data.monthlyrevenue.map((item) => ({
          label: item?.day?.toString(),
          value: item?.total,
        }));
  }, [data, period]);

  return (
    <div className="w-full bg-figma-chart rounded-2xl p-3 sm:p-5 mt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
         <div>
          <p className="text-slate-400 text-sm font-medium">Static analysis</p>
          <h2 className="text-white text-2xl font-semibold">Revenues</h2>
        </div>

        <div className="w-full sm:w-auto">
          <RadioToggle
            value={period}
            onValueChange={(value) => setPeriod(value as 'weekly' | 'monthly')}
            options={[
              { label: 'Weekly', value: 'weekly' },
              { label: 'Monthly', value: 'monthly' },
            ]}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="w-full overflow-x-auto">
         <div className="min-w-[600px] h-60 sm:h-72 md:h-80 lg:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.4} />
              </linearGradient>

              <linearGradient
                id="revenueGradientFill"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 14 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 14 }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#revenueGradient)"
              strokeWidth={2}
              fill="url(#revenueGradientFill)"
              dot={{ r: 3, fill: '#14b8a6' }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      </div>
     
    </div>
  );
}
