import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';

export default function CarbonChart({ data, title = "Weekly Carbon Footprint" }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-card border">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-primary">{`Footprint: ${payload[0].value} kg CO₂`}</p>
          {payload[1] && (
            <p className="text-muted-foreground">{`Target: ${payload[1].value} kg CO₂`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="day" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="footprint" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
            opacity={0.8}
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="hsl(var(--accent))" 
            strokeWidth={2}
            dot={{ fill: "hsl(var(--accent))", r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}