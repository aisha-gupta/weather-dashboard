import React, { useState, useEffect } from 'react';

function CurrentWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: 28.6139, lon: 77.2090 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => console.log('Using default location')
    );
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index,precipitation&hourly=temperature_2m,relative_humidity_2m&daily=sunrise,sunset&timezone=auto`;

      const res = await fetch(url);
      const data = await res.json();

      setWeather(data);
      setLoading(false);
    };

    if (location.lat && location.lon) {
      fetchWeather();
    }
  }, [location]);

  // ✅ SAFE CHECK (fixes crash)
  if (loading || !weather || !weather.current) {
    return <div className="loading">⏳ Loading weather...</div>;
  }

  const current = weather.current;
  const hourly = weather.hourly;
  const daily = weather.daily;

  return (
    <div className="current-weather">
      <div className="weather-grid">
        <div className="weather-card">
          <span className="label">🌡️ Temperature</span>
          <span className="value">{current.temperature_2m}°C</span>
        </div>
        <div className="weather-card">
          <span className="label">💧 Humidity</span>
          <span className="value">{current.relative_humidity_2m}%</span>
        </div>
        <div className="weather-card">
          <span className="label">🌬️ Wind Speed</span>
          <span className="value">{current.wind_speed_10m} km/h</span>
        </div>
        <div className="weather-card">
          <span className="label">☀️ UV Index</span>
          <span className="value">{current.uv_index}</span>
        </div>
        <div className="weather-card">
          <span className="label">🌅 Sunrise</span>
          <span className="value">{daily.sunrise[0].split('T')[1]}</span>
        </div>
        <div className="weather-card">
          <span className="label">🌇 Sunset</span>
          <span className="value">{daily.sunset[0].split('T')[1]}</span>
        </div>
      </div>

      <h3 style={{ marginTop: '24px', marginBottom: '12px' }}>⏰ Hourly Forecast</h3>
      <div className="hourly">
        {hourly.time.slice(0, 12).map((time, i) => (
          <div className="hour-card" key={i}>
            <span className="hour-time">{time.split('T')[1]}</span>
            <span className="hour-temp">{hourly.temperature_2m[i]}°C</span>
            <span className="hour-hum">{hourly.relative_humidity_2m[i]}%💧</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CurrentWeather;