export default function StatsCard({ title, value, unit, icon: Icon, trend, color = "primary" }) {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    success: "text-success bg-success/10",
    info: "text-info bg-info/10",
    warning: "text-warning bg-warning/10"
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card hover:shadow-eco transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {trend && (
            <p className={`text-xs mt-1 ${trend.positive ? 'text-success' : 'text-warning'}`}>
              {trend.positive ? '↗' : '↘'} {trend.value}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}