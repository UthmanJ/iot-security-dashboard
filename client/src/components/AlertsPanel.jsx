const severityColors = {
  Low: 'border-l-emerald-500',
  Medium: 'border-l-amber-500',
  High: 'border-l-orange-500',
  Critical: 'border-l-red-500',
};

function AlertsPanel({ alerts, onResolve }) {
  const activeAlerts = alerts.filter((a) => !a.resolved);

  if (activeAlerts.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center text-slate-400">
        No active alerts. All clear ✅
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activeAlerts.map((alert) => (
        <div
          key={alert._id}
          className={`bg-slate-800 border border-slate-700 border-l-4 ${severityColors[alert.severity]} rounded-lg p-4 flex items-start justify-between gap-4`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-slate-100 font-semibold">{alert.type}</span>
              <span className="text-xs text-slate-500">· {alert.severity}</span>
            </div>
            <p className="text-slate-400 text-sm">{alert.message}</p>
            <p className="text-slate-500 text-xs mt-1">
              Device: {alert.device?.name || 'Unknown'}
            </p>
          </div>
          <button
            onClick={() => onResolve(alert._id)}
            className="shrink-0 text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-md transition-colors"
          >
            Resolve
          </button>
        </div>
      ))}
    </div>
  );
}

export default AlertsPanel;