# 🌤️ Weather Dashboard (ReactJS)

## 🚀 Live Demo

👉(https://weather-dashboard-o9h7-9ycnohvuu-aisha-guptas-projects.vercel.app/)

---

## 📌 Project Overview

This is a Weather Dashboard built using ReactJS that provides real-time and historical weather data based on the user's location.

The application uses the Open-Meteo API to fetch weather data and displays it in a clean, responsive UI.

---

## ✨ Features

### 🌍 Current Weather

* Auto-detects user location using Geolocation API
* Displays:

  * Temperature
  * Humidity
  * Wind Speed
  * UV Index
  * Precipitation
  * Sunrise & Sunset
* Hourly forecast (next 12 hours)

### 📊 Historical Data

* Select custom date range
* View trends for:

  * Temperature (min & max)
  * Precipitation
  * Wind speed
* Interactive charts using Recharts

---

## 🛠️ Tech Stack

* ReactJS (Functional Components + Hooks)
* JavaScript (ES6+)
* Recharts (Data visualization)
* Open-Meteo API
* CSS (Responsive design)

---

## ⚙️ How It Works

1. The app fetches the user's location using the browser Geolocation API.
2. Based on coordinates, it calls the Open-Meteo API.
3. Weather data is stored in state using React hooks.
4. UI updates automatically based on fetched data.
5. Historical data is visualized using charts.

---

## 📦 Installation

```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
npm install
npm start
```

---

## 🚀 Deployment

The project is deployed using Vercel for fast performance and HTTPS support.

---

## 🎯 Future Improvements

* Temperature unit toggle (°C ↔ °F)
* Air quality data (AQI)
* UI animations
* Improved error handling

---


