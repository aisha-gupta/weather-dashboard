import React, { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import HistoricalData from './components/HistoricalData';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="app">
      <h1>🌤️ Weather Dashboard</h1>
      <div className="tabs">
        <button
          className={activeTab === 'current' ? 'active' : ''}
          onClick={() => setActiveTab('current')}
        >
          Current Weather
        </button>
        <button
          className={activeTab === 'historical' ? 'active' : ''}
          onClick={() => setActiveTab('historical')}
        >
          Historical Data
        </button>
      </div>
      <div className="content">
        {activeTab === 'current' ? <CurrentWeather /> : <HistoricalData />}
      </div>
    </div>
  );
}

export default App;