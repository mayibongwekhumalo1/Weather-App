import React from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

const getWeatherIcon = (condition) => {
  const conditionCode = condition?.toString().charAt(0);
  switch (conditionCode) {
    case '2':
      return <WiThunderstorm className="text-2xl" />;
    case '3':
      return <WiRain className="text-2xl" />;
    case '5':
      return <WiRain className="text-2xl" />;
    case '6':
      return <WiSnow className="text-2xl" />;
    case '7':
      return <WiFog className="text-2xl" />;
    case '8':
      return condition === '800' ? <WiDaySunny className="text-2xl" /> : <WiCloudy className="text-2xl" />;
    default:
      return <WiDaySunny className="text-2xl" />;
  }
};

const DailyForecast = ({ dailyData }) => {
  if (!dailyData || dailyData.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">7-Day Forecast</h3>
      <div className="space-y-3">
        {dailyData.map((day, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <p className="w-24 text-gray-700">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <div className="flex items-center w-10">
              {getWeatherIcon(day.weather[0].id)}
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-medium">{Math.round(day.temp.max)}°C</span>
              <span className="text-gray-500">{Math.round(day.temp.min)}°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;