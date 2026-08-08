const API_BASE_URL = 'http://localhost:5000/api';

export const getDevices = async () => {
  const response = await fetch(`${API_BASE_URL}/devices`);
  if (!response.ok) throw new Error('Failed to fetch devices');
  return response.json();
};

export const getDeviceById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/devices/${id}`);
  if (!response.ok) throw new Error('Failed to fetch device');
  return response.json();
};

export const getAlerts = async () => {
  const response = await fetch(`${API_BASE_URL}/alerts`);
  if (!response.ok) throw new Error('Failed to fetch alerts');
  return response.json();
};

export const resolveAlert = async (id) => {
  const response = await fetch(`${API_BASE_URL}/alerts/${id}/resolve`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Failed to resolve alert');
  return response.json();
};