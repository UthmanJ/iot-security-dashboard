import { useState, useEffect } from 'react';
import { getDevices, getAlerts, resolveAlert } from './services/api';
import DashboardSummary from './components/DashboardSummary';
import DeviceCard from './components/DeviceCard';
import AlertsPanel from './components/AlertsPanel';

function App() {
  const [devices, setDevices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [devicesData, alertsData] = await Promise.all([
        getDevices(),
        getAlerts(),
      ]);
      setDevices(devicesData);
      setAlerts(alertsData);
      setError(null);
    } catch (err) {
      setError('Failed to load data. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleResolve = async (alertId) => {
    try {
      await resolveAlert(alertId);
      setAlerts((prev) =>
        prev.map((a) => (a._id === alertId ? { ...a, resolved: true } : a))
      );
    } catch (err) {
      alert('Failed to resolve alert');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-8 md:px-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">
          IoT Device Security Dashboard
        </h1>
        <p className="text-slate-400 mt-1">
          Real-time monitoring of connected device security posture
        </p>
      </header>

      <DashboardSummary devices={devices} alerts={alerts} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">Devices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {devices.map((device) => (
              <DeviceCard key={device._id} device={device} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-200 mb-4">
            Active Alerts
          </h2>
          <AlertsPanel alerts={alerts} onResolve={handleResolve} />
        </div>
      </div>
    </div>
  );
}

export default App;