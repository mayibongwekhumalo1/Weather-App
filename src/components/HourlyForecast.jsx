import React, { useState, useRef } from 'react';

function HourlyForecast({ hourlyData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  
  const visibleItems = 4; // Number of items visible at once

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.children[0]?.offsetWidth || 120;
      scrollContainerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(hourlyData.length - visibleItems, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Hourly Forecast</h3>
      
      <div className="relative">
        {/* Navigation arrows */}
        {currentIndex > 0 && (
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Previous hours"
          >
            &lt;
          </button>
        )}
        
        {currentIndex < hourlyData.length - visibleItems && (
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Next hours"
          >
            &gt;
          </button>
        )}
        
        {/* Carousel container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-hidden p-2 scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {hourlyData.map((hour, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 bg-white p-2 rounded-lg shadow w-20 text-center"
            >
              <p className="text-sm font-medium">{hour.time}</p>
              <img 
                src={hour.icon} 
                alt="Weather Icon" 
                className="mx-auto my-1 w-10"
              />
              <p className="text-sm font-bold">{hour.temp}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HourlyForecast;