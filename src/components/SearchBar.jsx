import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-weather-primary focus:border-transparent shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-2 bg-weather-primary text-white p-2 rounded-full hover:bg-weather-secondary transition-colors"
        >
          <FiSearch className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;