import React from 'react'
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
import HourlyForecast from './components/HourlyForecast'
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(''); 
  const [loading, setLoading] = useState(false);

  const api_key = "71a2d1806d2c458e83c213514251307";
  const api_url = "http://api.weatherapi.com/v1/forecast.json";

  const fetchData = async () => {
    if (!city) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`${api_url}?key=${api_key}&q=${city}&days=1&aqi=no&alerts=no`);
      setWeatherData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  }

  // Format hourly data for the component
  const formatHourlyData = () => {
    if (!weatherData) return [];
    
    return weatherData.forecast.forecastday[0].hour.map(hour => ({
      time: new Date(hour.time).getHours() + ':00',
      temp: hour.temp_c,
      icon: hour.condition.icon,
      condition: hour.condition.text
    }));
  }

  return (
    <div className='bg-green-100 min-h-screen flex items-center justify-center p-4'>
      {/* card container */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex mb-4">
          {/* input field and search button */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full">
            <input 
              type="text" 
              onKeyUp={handleKeyPress}
              onChange={(e) => setCity(e.target.value)}
              value={city}
              placeholder="Enter city name" 
              className="border-none px-4 py-2 w-full focus:outline-none"
            />
            <FaSearch className='text-gray-500 mr-2'/>
          </div>
          {/* current location Button */}
          <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center">
            <FaMapMarkerAlt className='text-white' />
          </button>
        </div>
        
        {loading && <p className="text-center">Loading...</p>}

        {weatherData && (
          <div className="bg-blue-100 p-4 rounded-lg mb-4 w-full">
            <h2 className="text-2xl font-bold mb-2">{weatherData.location.name}, {weatherData.location.country}</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-5xl font-bold">{weatherData.current.temp_c}°C</p>
                <p className="text-gray-700">{weatherData.current.condition.text}</p>
              </div>
              <img 
                src={weatherData.current.condition.icon}
                alt="Weather Icon" 
                className="h-20"
              />
            </div>
            
            {/* Additional weather info */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
              <div className="bg-white p-2 rounded">
                <p>Humidity</p>
                <p className="font-bold">{weatherData.current.humidity}%</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p>Wind</p>
                <p className="font-bold">{weatherData.current.wind_kph} km/h</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p>Feels Like</p>
                <p className="font-bold">{weatherData.current.feelslike_c}°C</p>
              </div>
              <div className="bg-white p-2 rounded">
                <p>UV Index</p>
                <p className="font-bold">{weatherData.current.uv}</p>
              </div>
            </div>

            {/* hourly forecast */}
            <HourlyForecast hourlyData={formatHourlyData()} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App;