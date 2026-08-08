function DashboardSummary({ devices, alerts }) {
  const totalDevices = devices.length;
  const onlineDevices = devices.filter((d) => d.status === 'online').length;
  const atRiskDevices = devices.filter(
    (d) => d.riskLevel === 'High' || d.riskLevel === 'Critical'
  ).length;
  const activeAlerts = alerts.filter((a) => !a.resolved).length;

  const stats = [
    { label: 'Total Devices', value: totalDevices, color: 'text-slate-100' },
    { label: 'Online', value: onlineDevices, color: 'text-emerald-400' },
    { label: 'At Risk', value: atRiskDevices, color: 'text-red-400' },
    { label: 'Active Alerts', value: activeAlerts, color: 'text-amber-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-slate-800 border border-slate-700 rounded-lg p-4"
        >
          <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
          <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardSummary;