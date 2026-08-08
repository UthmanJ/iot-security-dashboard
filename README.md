# IoT Device Security Dashboard

A full-stack web application that simulates real-time monitoring of IoT devices, tracking security posture, firmware status, and active alerts across a fleet of connected devices. Built to demonstrate practical full-stack engineering with a focus on security-relevant data modeling.

## Overview

Organizations managing IoT fleets (smart locks, cameras, sensors, gateways) need visibility into which devices are exposed, outdated, or misconfigured. This dashboard simulates that monitoring layer — surfacing device risk levels, open ports, known vulnerabilities, and live security alerts in a single interface.

All device and alert data is simulated (no physical hardware involved) to keep the project fully self-contained and portable.

## Features

- **Device inventory** — view all monitored devices with live status (online/offline), risk level, and firmware version
- **Device detail view** — drill into any device for full details: open ports, known vulnerabilities, firmware history
- **Automated risk levels** — each device is tagged Low / Medium / High / Critical based on its security posture
- **Security alerts feed** — real-time list of active alerts (unauthorized access attempts, outdated firmware, weak credentials, etc.), each linked to its source device
- **Alert resolution** — mark alerts as resolved directly from the dashboard
- **Dashboard summary** — at-a-glance stats: total devices, online count, at-risk count, active alerts
- **Responsive design** — fully usable on mobile and desktop

## Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- CORS, dotenv

## Project Structure
iot-security-dashboard/
├── client/ # React frontend
│ └── src/
│ ├── components/ # DashboardSummary, DeviceCard, AlertsPanel
│ ├── pages/ # DeviceDetail
│ ├── services/ # API layer (fetch calls)
│ └── App.jsx
│
├── server/ # Express backend
│ └── src/
│ ├── models/ # Device, Alert (Mongoose schemas)
│ ├── controllers/ # Route logic
│ ├── routes/ # API route definitions
│ ├── config/ # Database connection
│ ├── seed/ # Mock data seeding script
│ └── server.js # Entry point

## Getting Started

### Prerequisites
- Node.js 18+
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/UthmanJ/iot-security-dashboard.git
cd iot-security-dashboard
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
MONGODB_URI=your_mongodb_connection_string
PORT=5000

Seed the database with sample devices and alerts:
```bash
node src/seed/seedData.js
```

Start the backend server:
```bash
npm run dev
```
Server runs at `http://localhost:5000`.

### 3. Frontend setup
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
App runs at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/devices` | Get all devices |
| GET | `/api/devices/:id` | Get a single device by ID |
| GET | `/api/alerts` | Get all alerts (with device info populated) |
| PATCH | `/api/alerts/:id/resolve` | Mark an alert as resolved |

## Author

**Usman Ja'afar Shehu**
[BeeWave Tech Solutions](https://github.com/UthmanJ)