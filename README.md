# 💧 Aqua-Alert: Residential Water Quality Monitoring System

Aqua-Alert is an IoT-based real-time water quality monitoring system built using **ESP32**, **Node.js**, and a **live web dashboard**. It continuously tracks water parameters like **TDS**, **pH**, and **turbidity**, detects anomalies, and sends **instant alerts via WhatsApp**.

---

## 🚀 Live Demo

🌐 Dashboard: https://aqua-alert-wshl.onrender.com

---

## 📌 Features

* 📡 Real-time sensor data monitoring (TDS, pH, Turbidity)
* 📊 Live dashboard with graphs
* ⚠️ Smart anomaly detection using baseline deviation
* 🔔 Instant WhatsApp alerts using Twilio
* 🌐 WebSocket-based live updates (no refresh needed)
* ☁️ Cloud deployment using Render

---

## 🏗️ System Architecture

```
ESP32 → HTTP POST → Node.js Server → WebSocket → Dashboard
                                      ↓
                                   Twilio API
                                      ↓
                               WhatsApp Alert
```

---

## 🛠️ Tech Stack

### Hardware

* ESP32
* TDS Sensor (simulated)
* pH Sensor (simulated)
* Turbidity Sensor (simulated)
* LED + Buzzer (alerts)

### Software

* Embedded C (Arduino)
* Node.js + Express
* WebSocket (ws)
* Twilio API
* HTML, CSS, JavaScript

### Deployment

* Render (Backend + Frontend hosting)

---

## ⚙️ How It Works

1. ESP32 reads sensor values using ADC pins
2. Data is averaged and filtered to remove noise
3. Baseline values are set initially
4. Deviation is calculated in percentage
5. If deviation > 20%, alert is triggered
6. Data is sent to backend via HTTP POST
7. Backend broadcasts data via WebSocket
8. Dashboard updates in real-time
9. Twilio sends WhatsApp alert if needed

---

## 📂 Project Structure

```
aqua-alert/
│
├── public/
│   └── index.html        # Dashboard UI
│
├── server.js             # Backend (Express + WebSocket)
├── package.json
├── .gitignore
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file:

```
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_FROM=whatsapp:+14155238886
TWILIO_TO=whatsapp:+91XXXXXXXXXX
```

---

## ▶️ Running Locally

```bash
npm install
node server.js
```

Open:

```
http://localhost:3000
```

---

## 📡 ESP32 Configuration

Update this in your code:

```cpp
const char* serverURL = "https://aqua-alert-wshl.onrender.com/data";
```

---

## 🧠 Key Concepts Used

* IoT Data Acquisition
* WebSocket Real-time Communication
* REST API (HTTP POST)
* Cloud Deployment
* Noise Filtering & Data Validation
* Event-driven Alerts

---

## ⚠️ Problem Solved

* Water contamination detection
* Real-time monitoring without manual testing
* Instant alert system for safety

---

## 🔮 Future Improvements

* Mobile app integration
* AI-based water quality prediction
* Historical data analytics
* Multi-user dashboard
* Sensor calibration for real-world deployment

---

## 👨‍💻 Author

**Abhijay Panwar**
B.Tech IT | VIT Vellore

---

## 📜 License

This project is for academic and educational purposes.

---

⭐ If you like this project, give it a star on GitHub!
