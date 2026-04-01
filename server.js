require('dotenv').config();
const express = require('express');
const { WebSocketServer } = require('ws');
const twilio = require('twilio');
const http = require('http');

const app = express();
app.use(express.json());
app.use(express.static('public')); // serve dashboard

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Attach WebSocket server (IMPORTANT)
const wss = new WebSocketServer({ noServer: true });

// 🔥 REQUIRED for Render / ngrok / WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// ✅ Track connections
wss.on('connection', (ws) => {
  console.log('🔌 WebSocket client connected');

  ws.on('close', () => {
    console.log('❌ WebSocket client disconnected');
  });
});

// ✅ Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

let lastAlertSent = 0;
const ALERT_COOLDOWN_MS = 5 * 60 * 1000;

// ✅ ESP32 sends data here
app.post('/data', (req, res) => {
  const { tds, ph, turb, alert } = req.body;

  console.log("📩 Data received:", tds, ph, turb, alert);

  const payload = JSON.stringify({
    tds,
    ph,
    turb,
    alert,
    ts: Date.now()
  });

  // 🔥 FIX: safer WebSocket broadcast
  wss.clients.forEach((wsClient) => {
  if (wsClient.readyState === 1) {
    wsClient.send(payload);
  }
});

  // ✅ WhatsApp alert (optional)
  if (alert && Date.now() - lastAlertSent > ALERT_COOLDOWN_MS) {
    lastAlertSent = Date.now();

    client.messages.create({
      from: process.env.TWILIO_FROM,
      to: process.env.TWILIO_TO,
      body: `🚨 Aqua-Alert: Water quality degraded!
TDS: ${tds} | pH: ${ph} | Turbidity: ${turb}`
    }).catch(console.error);
  }

  res.sendStatus(200);
});

// ✅ Root route (VERY IMPORTANT)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// ✅ Start server (Render compatible)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});