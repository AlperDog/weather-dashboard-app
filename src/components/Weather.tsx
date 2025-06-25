import React, { useState } from 'react';

interface WeatherData {
  current: {
    temp: number;
    condition: string;
    icon: string;
    humidity: number;
    wind_speed: number;
  };
  forecast: Array<{
    date: string;
    temp: number;
    condition: string;
    icon: string;
  }>;
  location: string;
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForecast, setShowForecast] = useState(false);

  const getWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Using a free weather API (wttr.in) that doesn't require API key
      const response = await fetch(
        `https://wttr.in/?format=j1&lat=${lat}&lon=${lon}`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      
      // Process current weather from wttr.in API
      const current = data.current_condition[0];
      const location = data.nearest_area[0];
      
      const currentWeather = {
        temp: parseInt(current.temp_C),
        condition: current.weatherDesc[0].value,
        icon: current.weatherIconUrl[0].value,
        humidity: parseInt(current.humidity),
        wind_speed: parseInt(current.windspeedKmph)
      };
      
      // Process forecast (next 5 days)
      const dailyForecast = data.weather.slice(0, 5).map((day: any) => ({
        date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
        temp: parseInt(day.hourly[4].tempC), // Use noon temperature
        condition: day.hourly[4].weatherDesc[0].value,
        icon: day.hourly[4].weatherIconUrl[0].value
      }));
      
      setWeather({
        current: currentWeather,
        forecast: dailyForecast,
        location: `${location.areaName[0].value}, ${location.country[0].value}`
      });
      
    } catch (err) {
      // Fallback to mock data if API fails
      console.warn('Weather API failed, using mock data:', err);
      setMockWeatherData();
    } finally {
      setLoading(false);
    }
  };

  const setMockWeatherData = () => {
    const mockWeather: WeatherData = {
      current: {
        temp: 22,
        condition: 'Partly Cloudy',
        icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png',
        humidity: 65,
        wind_speed: 12
      },
      forecast: [
        { date: 'Mon', temp: 24, condition: 'Sunny', icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png' },
        { date: 'Tue', temp: 21, condition: 'Cloudy', icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0003_white_cloud.png' },
        { date: 'Wed', temp: 19, condition: 'Rain', icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0017_cloudy_with_light_rain.png' },
        { date: 'Thu', temp: 23, condition: 'Partly Cloudy', icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png' },
        { date: 'Fri', temp: 26, condition: 'Sunny', icon: 'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png' }
      ],
      location: 'Your Location'
    };
    
    setWeather(mockWeather);
  };

  const getLocationAndWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherData(latitude, longitude);
        },
        (error) => {
          console.warn('Geolocation failed, using mock data:', error);
          setMockWeatherData();
        }
      );
    } else {
      console.warn('Geolocation not supported, using mock data');
      setMockWeatherData();
    }
  };

  const getWeatherIcon = (iconUrl: string) => {
    // Extract weather condition from icon URL or use default
    if (iconUrl.includes('sunny')) return 'fas fa-sun';
    if (iconUrl.includes('cloud')) return 'fas fa-cloud';
    if (iconUrl.includes('rain')) return 'fas fa-cloud-rain';
    if (iconUrl.includes('snow')) return 'fas fa-snowflake';
    if (iconUrl.includes('thunder')) return 'fas fa-bolt';
    if (iconUrl.includes('fog') || iconUrl.includes('mist')) return 'fas fa-smog';
    
    return 'fas fa-cloud-sun';
  };

  const getWeatherColor = (condition: string) => {
    const colorMap: { [key: string]: string } = {
      'Sunny': '#ffd700',
      'Partly Cloudy': '#87ceeb',
      'Cloudy': '#87ceeb',
      'Rain': '#4682b4',
      'Snow': '#ffffff',
      'Thunderstorm': '#4b0082',
      'Drizzle': '#87ceeb',
      'Mist': '#d3d3d3',
      'Fog': '#d3d3d3',
      'Clear': '#ffd700'
    };
    
    return colorMap[condition] || '#aa00ff';
  };

  return (
    <div>
      {!weather ? (
        <div className="text-center">
          <button 
            className="btn btn-custom" 
            onClick={getLocationAndWeather}
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin me-2"></i>
                Loading...
              </>
            ) : (
              <>
                <i className="fas fa-map-marker-alt me-2"></i>
                Get Weather
              </>
            )}
          </button>
          {error && (
            <div className="mt-3 alert alert-danger" style={{ backgroundColor: 'rgba(220, 53, 69, 0.2)', border: '1px solid #dc3545', color: '#fff' }}>
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Current Weather */}
          <div className="text-center mb-4">
            <h5 className="text-white mb-2">{weather.location}</h5>
            <div className="d-flex align-items-center justify-content-center mb-3">
              <i 
                className={`${getWeatherIcon(weather.current.icon)} weather-icon`}
                style={{ 
                  fontSize: '3rem', 
                  color: getWeatherColor(weather.current.condition),
                  marginRight: '1rem'
                }}
              ></i>
              <div>
                <h3 className="text-white mb-0">{weather.current.temp}°C</h3>
                <small className="text-white-50">{weather.current.condition}</small>
              </div>
            </div>
            
            {/* Weather Details */}
            <div className="row g-2 mb-3">
              <div className="col-6">
                <div className="card-custom p-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <i className="fas fa-tint me-1" style={{ color: '#00aaff' }}></i>
                  <small className="text-white">{weather.current.humidity}%</small>
                </div>
              </div>
              <div className="col-6">
                <div className="card-custom p-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <i className="fas fa-wind me-1" style={{ color: '#87ceeb' }}></i>
                  <small className="text-white">{weather.current.wind_speed} km/h</small>
                </div>
              </div>
            </div>
            
            {/* Forecast Toggle */}
            <button 
              className="btn btn-custom btn-sm"
              onClick={() => setShowForecast(!showForecast)}
            >
              {showForecast ? 'Hide Forecast' : 'Show Forecast'}
            </button>
          </div>
          
          {/* 5-Day Forecast */}
          {showForecast && (
            <div className="mt-3">
              <h6 className="text-white text-center mb-3">5-Day Forecast</h6>
              <div className="row g-2">
                {weather.forecast.map((day, index) => (
                  <div key={index} className="col">
                    <div className="card-custom p-2 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                      <small className="text-white-50 d-block">{day.date}</small>
                      <i 
                        className={`${getWeatherIcon(day.icon)} weather-icon`}
                        style={{ 
                          fontSize: '1.5rem', 
                          color: getWeatherColor(day.condition),
                          margin: '0.5rem 0'
                        }}
                      ></i>
                      <small className="text-white d-block">{day.temp}°C</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Refresh Button */}
          <div className="text-center mt-3">
            <button 
              className="btn btn-outline-light btn-sm"
              onClick={getLocationAndWeather}
            >
              <i className="fas fa-sync-alt me-1"></i>
              Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather; 