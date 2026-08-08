import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDeviceById } from '../services/api';

const riskColors = {
  Low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  Medium: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  High: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
  Critical: 'bg-red-500/20 text-red-400 border-red-500/40',
};

function DeviceDetail() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDeviceById(id)
      .then(setDevice)
      .catch(() => setError('Device not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Loading device...</p>
      </div>
    );
  }

  if (error || !device) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error || 'Device not found'}</p>
        <Link to="/" className="text-emerald-400 hover:underline">
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-8 md:px-12">
      <Link
        to="/"
        className="text-slate-400 hover:text-emerald-400 text-sm mb-6 inline-block transition-colors"
      >
        ← Back to dashboard
      </Link>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 md:p-8 max-w-3xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">{device.name}</h1>
            <p className="text-slate-400">{device.type}</p>
          </div>
          <span
            className={`text-sm px-3 py-1 rounded-full border ${riskColors[device.riskLevel]}`}
          >
            {device.riskLevel} Risk
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Status</p>
            <p className={device.status === 'online' ? 'text-emerald-400' : 'text-slate-400'}>
              {device.status === 'online' ? '● Online' : '○ Offline'}
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">IP Address</p>
            <p className="text-slate-200">{device.ipAddress}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Firmware Version</p>
            <p className="text-slate-200">{device.firmwareVersion}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Last Firmware Update</p>
            <p className="text-slate-200">
              {new Date(device.lastFirmwareUpdate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">Open Ports</p>
          {device.openPorts.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {device.openPorts.map((port) => (
                <span
                  key={port}
                  className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-md"
                >
                  {port}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">None detected</p>
          )}
        </div>

        <div>
          <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">
            Known Vulnerabilities
          </p>
          {device.knownVulnerabilities.length > 0 ? (
            <ul className="space-y-1">
              {device.knownVulnerabilities.map((vuln) => (
                <li key={vuln} className="text-red-400 text-sm">
                  ⚠ {vuln}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-emerald-400 text-sm">✅ No known vulnerabilities</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeviceDetail;