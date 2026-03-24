import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function HistoricalData() {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-03-01');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState('temperature');

  const fetchHistory = async () => {
    setLoading(true);
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=28.6139&longitude=77.2090&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto`;
    const res = await fetch(url);
    const json = await res.json();

    const formatted = json.daily.time.map((t, i) => ({
      date: t,
      maxTemp: json.daily.temperature_2m_max[i],
      minTemp: json.daily.temperature_2m_min[i],
      precipitation: json.daily.precipitation_sum[i],
      wind: json.daily.wind_speed_10m_max[i],
    }));
    setData(formatted);
    setLoading(false);
  };

  const charts = {
    temperature: (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={Math.floor(data.length / 6)} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="maxTemp" stroke="#e53e3e" name="Max Temp °C" dot={false} />
        <Line type="monotone" dataKey="minTemp" stroke="#4299e1" name="Min Temp °C" dot={false} />
      </LineChart>
    ),
    precipitation: (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={Math.floor(data.length / 6)} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="precipitation" stroke="#38a169" name="Precipitation mm" dot={false} />
      </LineChart>
    ),
    wind: (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={Math.floor(data.length / 6)} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="wind" stroke="#d69e2e" name="Wind Speed km/h" dot={false} />
      </LineChart>
    ),
  };

  return (
    <div className="historical">
      <div className="date-picker">
        <div className="date-group">
          <label>From:</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div className="date-group">
          <label>To:</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <button onClick={fetchHistory} className="fetch-btn">
          {loading ? '⏳ Loading...' : '🔍 Get Data'}
        </button>
      </div>

      {data.length > 0 && (
        <>
          <div className="chart-tabs">
            {['temperature', 'precipitation', 'wind'].map(tab => (
              <button
                key={tab}
                className={active === tab ? 'active' : ''}
                onClick={() => setActive(tab)}
              >
                {tab === 'temperature' ? '🌡️ Temperature' : tab === 'precipitation' ? '🌧️ Precipitation' : '🌬️ Wind'}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {charts[active]}
          </ResponsiveContainer>
        </>
      )}

      {data.length === 0 && !loading && (
        <div className="no-data">👆 Select a date range and click "Get Data"</div>
      )}
    </div>
  );
}

export default HistoricalData;