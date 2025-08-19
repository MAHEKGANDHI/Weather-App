import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (city === "") {
      alert("Please enter city or state name!!");
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ed570ac911dad2a255e2965a53ced74&units=metric`
      );
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      } else {
        alert("City not found!");
        setWeather(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Dynamic CSS class
  const getWeatherClass = () => {
    if (!weather) return "";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("clear")) return "sunny";
    if (main.includes("cloud")) return "cloudy";
    if (main.includes("rain")) return "rainy";
    return "";
  };

  return (
    <div className={`app ${getWeatherClass()}`}>
      <div className="container">
        <h1 className="title">🌦 Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeather}>Get Weather</button>

        {weather && (
          <div className="weather-card">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="weather-icon"
            />
            <p className="temp">{weather.main.temp}°C</p>
            <p className="desc">{weather.weather[0].description}</p>
            <div className="extra-info">
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>💨 Wind: {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
