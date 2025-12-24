import { cn } from '@/lib';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex justify-center gap-6 mt-4 flex-wrap">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function AnalyticChart({
  className,
  show = true,
  heightStyle,
  item = [],
  children,
}: any) {
  return (
    <div className={cn('bg-[#575757]/10 rounded-xl p-5', className)}>
      {show && <h1 className="font-medium text-2xl">Analytics Chart</h1>}

      <div className={cn('flex flex-col items-center', heightStyle)}>
        <div className="relative w-64 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={item}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                paddingAngle={0}
                stroke="none"
                labelLine={false}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                  const RADIAN = Math.PI / 180;
                  const radius =
                    innerRadius + (outerRadius - innerRadius) / 2;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#fff"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={14}
                      fontWeight={600}
                    >
                      {value}
                    </text>
                  );
                }}
              >
                {item.map((entry: any, index: number) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <CustomLegend
          payload={item.map((item: any) => ({
            value: item.name,
            color: item.color,
          }))}
        />

        {children}
      </div>
    </div>
  );
}
