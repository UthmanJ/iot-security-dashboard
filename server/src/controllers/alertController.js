import Alert from '../models/Alert.js';

// GET /api/alerts — list all alerts, most recent first, with device info populated
export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate('device', 'name type ipAddress')
      .sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/alerts/:id/resolve — mark an alert as resolved
export const resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { resolved: true },
      { new: true }
    );
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    res.json(alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};