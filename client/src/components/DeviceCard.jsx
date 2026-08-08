const riskColors = {
  Low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  Medium: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  High: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
  Critical: 'bg-red-500/20 text-red-400 border-red-500/40',
};

function DeviceCard({ device }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-slate-100 font-semibold text-lg">{device.name}</h3>
          <p className="text-slate-400 text-sm">{device.type}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full border ${riskColors[device.riskLevel]}`}
        >
          {device.riskLevel}
        </span>
      </div>

      <div className="space-y-1 text-sm text-slate-400">
        <p>
          Status:{' '}
          <span
            className={device.status === 'online' ? 'text-emerald-400' : 'text-slate-500'}
          >
            {device.status === 'online' ? '● Online' : '○ Offline'}
          </span>
        </p>
        <p>IP Address: <span className="text-slate-300">{device.ipAddress}</span></p>
        <p>Firmware: <span className="text-slate-300">{device.firmwareVersion}</span></p>
        {device.knownVulnerabilities.length > 0 && (
          <p className="text-red-400 pt-1">
            ⚠ {device.knownVulnerabilities.length} known vulnerabilit
            {device.knownVulnerabilities.length === 1 ? 'y' : 'ies'}
          </p>
        )}
      </div>
    </div>
  );
}

export default DeviceCard;