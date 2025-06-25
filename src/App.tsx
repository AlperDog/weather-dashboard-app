import React from 'react';
import './App.css';
import Weather from './components/Weather';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="text-center mb-5">
              <h1 className="display-4 text-white mb-3">
                <i className="fas fa-cloud-sun me-3" style={{ color: '#aa00ff' }}></i>
                Weather Dashboard
              </h1>
              <p className="text-white-50 lead">
                Get real-time weather information and 5-day forecasts for your location
              </p>
            </div>
            
            <div className="card-custom">
              <Weather />
            </div>
            
            <div className="text-center mt-4">
              <p className="text-white-50">
                Built with React, TypeScript, and Bootstrap 5
              </p>
              <a 
                href="https://github.com/AlperDog/weather-dashboard-app" 
                className="btn btn-outline-light btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github me-2"></i>
                View Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 