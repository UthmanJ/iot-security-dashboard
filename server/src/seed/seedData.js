import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import Device from '../models/Device.js';
import Alert from '../models/Alert.js';

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

const devices = [
  {
    name: 'Front Door Smart Lock',
    type: 'Smart Lock',
    status: 'online',
    ipAddress: '192.168.1.12',
    firmwareVersion: '2.1.0',
    lastFirmwareUpdate: new Date('2025-11-02'),
    openPorts: [8080],
    knownVulnerabilities: [],
    riskLevel: 'Low',
  },
  {
    name: 'Living Room Camera',
    type: 'Camera',
    status: 'online',
    ipAddress: '192.168.1.15',
    firmwareVersion: '1.4.2',
    lastFirmwareUpdate: new Date('2024-03-18'),
    openPorts: [554, 8000],
    knownVulnerabilities: ['CVE-2023-1389'],
    riskLevel: 'High',
  },
  {
    name: 'Office Thermostat',
    type: 'Thermostat',
    status: 'offline',
    ipAddress: '192.168.1.20',
    firmwareVersion: '3.0.1',
    lastFirmwareUpdate: new Date('2026-05-10'),
    openPorts: [],
    knownVulnerabilities: [],
    riskLevel: 'Low',
  },
  {
    name: 'Warehouse Motion Sensor',
    type: 'Sensor',
    status: 'online',
    ipAddress: '192.168.1.33',
    firmwareVersion: '1.0.9',
    lastFirmwareUpdate: new Date('2023-08-05'),
    openPorts: [23],
    knownVulnerabilities: ['CVE-2022-30525', 'Default Telnet Credentials'],
    riskLevel: 'Critical',
  },
  {
    name: 'Main Network Router',
    type: 'Router',
    status: 'online',
    ipAddress: '192.168.1.1',
    firmwareVersion: '4.2.3',
    lastFirmwareUpdate: new Date('2026-01-20'),
    openPorts: [80, 443],
    knownVulnerabilities: [],
    riskLevel: 'Medium',
  },
  {
    name: 'IoT Gateway Hub',
    type: 'Gateway',
    status: 'offline',
    ipAddress: '192.168.1.5',
    firmwareVersion: '2.0.0',
    lastFirmwareUpdate: new Date('2024-12-01'),
    openPorts: [1883],
    knownVulnerabilities: ['Weak MQTT Auth'],
    riskLevel: 'Medium',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected for seeding');

    await Device.deleteMany();
    await Alert.deleteMany();
    console.log('🧹 Cleared existing devices and alerts');

    const createdDevices = await Device.insertMany(devices);
    console.log(`📦 Inserted ${createdDevices.length} devices`);

    const alerts = [
      {
        device: createdDevices[1]._id, // Living Room Camera
        type: 'Outdated Firmware',
        severity: 'High',
        message: 'Living Room Camera firmware is over a year old and has a known CVE.',
        resolved: false,
      },
      {
        device: createdDevices[3]._id, // Warehouse Motion Sensor
        type: 'Weak Credentials',
        severity: 'Critical',
        message: 'Warehouse Motion Sensor is using default Telnet credentials.',
        resolved: false,
      },
      {
        device: createdDevices[3]._id,
        type: 'Open Port Detected',
        severity: 'Critical',
        message: 'Telnet port 23 is open and exposed on Warehouse Motion Sensor.',
        resolved: false,
      },
      {
        device: createdDevices[5]._id, // IoT Gateway Hub
        type: 'Device Offline Unexpectedly',
        severity: 'Medium',
        message: 'IoT Gateway Hub went offline outside of scheduled maintenance.',
        resolved: false,
      },
      {
        device: createdDevices[4]._id, // Main Network Router
        type: 'Unusual Traffic Pattern',
        severity: 'Medium',
        message: 'Unusual outbound traffic spike detected from Main Network Router.',
        resolved: true,
      },
    ];

    const createdAlerts = await Alert.insertMany(alerts);
    console.log(`🚨 Inserted ${createdAlerts.length} alerts`);

    console.log('✅ Seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();