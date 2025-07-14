import React from 'react';

const WeatherDetails = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Weather Details</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Visibility</p>
          <p className="font-semibold">{data.visibility / 1000} km</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Cloudiness</p>
          <p className="font-semibold">{data.clouds}%</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Sunrise</p>
          <p className="font-semibold">
            {new Date(data.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Sunset</p>
          <p className="font-semibold">
            {new Date(data.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-600">UV Index</p>
          <p className="font-semibold">{data.uvi}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Dew Point</p>
          <p className="font-semibold">{Math.round(data.dew_point)}°C</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;