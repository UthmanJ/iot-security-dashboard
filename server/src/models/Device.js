import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Sensor', 'Camera', 'Smart Lock', 'Thermostat', 'Router', 'Gateway', 'Other'],
    },
    status: {
      type: String,
      enum: ['online', 'offline'],
      default: 'offline',
    },
    ipAddress: {
      type: String,
      required: true,
    },
    firmwareVersion: {
      type: String,
      required: true,
    },
    lastFirmwareUpdate: {
      type: Date,
      required: true,
    },
    openPorts: {
      type: [Number],
      default: [],
    },
    knownVulnerabilities: {
      type: [String],
      default: [],
    },
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Low',
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Device', deviceSchema);