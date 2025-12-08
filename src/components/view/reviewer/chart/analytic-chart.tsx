import { cn } from '@/lib';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-sm text-muted-foreground">{entry.value}</span>
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
    <div className={cn(`bg-[#575757]/10 rounded-xl p-5`, className)}>
      {show && <h1 className="font-medium text-2xl">Analytics Chart</h1>}
      <div className={cn(`flex flex-col items-center`, heightStyle)}>
        <div className="relative w-64 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={item}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {item.map((entry: any, index: any) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Chart value labels */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {item.map((item: any, index: any) => {
                const angle = index * 120 - 90; // Distribute labels around the circle
                const radius = 80;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={item.name}
                    className="absolute text-white font-semibold text-sm"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {item.value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <CustomLegend
          payload={item.map((item: any) => ({
            value: item.name,
            color: item.color,
          }))}
        />

        {children && children}
      </div>
    </div>
  );
}
