import React from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

const getWeatherIcon = (condition) => {
  const conditionCode = condition?.toString().charAt(0);
  switch (conditionCode) {
    case '2':
      return <WiThunderstorm className="text-5xl" />;
    case '3':
      return <WiRain className="text-5xl" />;
    case '5':
      return <WiRain className="text-5xl" />;
    case '6':
      return <WiSnow className="text-5xl" />;
    case '7':
      return <WiFog className="text-5xl" />;
    case '8':
      return condition === '800' ? <WiDaySunny className="text-5xl" /> : <WiCloudy className="text-5xl" />;
    default:
      return <WiDaySunny className="text-5xl" />;
  }
};

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">
            {data.city}, {data.country}
          </h2>
          <p className="text-gray-600">{new Date(data.timestamp * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="flex items-center justify-center md:justify-start mt-2">
            {getWeatherIcon(data.weather[0].id)}
            <span className="text-4xl font-bold ml-2">{Math.round(data.temp)}°C</span>
          </div>
          <p className="text-gray-700 capitalize">{data.weather[0].description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">Feels Like</p>
            <p className="font-semibold">{Math.round(data.feels_like)}°C</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-semibold">{data.humidity}%</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-semibold">{data.wind_speed} m/s</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">Pressure</p>
            <p className="font-semibold">{data.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;