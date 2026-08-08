import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema(
  {
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'Unauthorized Access Attempt',
        'Outdated Firmware',
        'Open Port Detected',
        'Weak Credentials',
        'Unusual Traffic Pattern',
        'Device Offline Unexpectedly',
      ],
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Alert', alertSchema);