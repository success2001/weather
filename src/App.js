import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'd6f90cfc4faff43d33603444060794fb';  // Replace with your OpenWeather API key

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
      const data = response.data;
      setWeather({
        temp: `${data.main.temp}°C`,
        condition: data.weather[0].description,
        humidity: `${data.main.humidity}%`,
        wind: `${data.wind.speed} km/h`,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
      setError('');  // Clear error in case of a successful fetch
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);  // Clear weather data if an error occurs
    }
  };

  return (
    <div className="weather-app">
      <h1>My Weather App</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-info">
         <div className="weather-icon">
            <img src={weather.icon} alt="Weather icon" />
          </div>
          <h2>{city}</h2>
          <p>Temperature: {weather.temp}</p>
          <p>Condition: {weather.condition}</p>
          <p>Humidity: {weather.humidity}</p>
          <p>Wind: {weather.wind}</p>
        </div>
      )}
    </div>
  );
};

export default App;
