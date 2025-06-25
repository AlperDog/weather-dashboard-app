# 🌤️ Weather Dashboard App

A modern, responsive weather dashboard built with React and TypeScript. Get real-time weather information and 5-day forecasts for your location with a beautiful dark theme interface.

## 🚀 Live Demo

**[Try the Weather Dashboard Live](https://AlperDog.github.io/weather-dashboard-app)**

## ✨ Features

- **Real-time Weather**: Get current weather conditions for your location
- **5-Day Forecast**: View detailed weather predictions for the upcoming week
- **Geolocation**: Automatic location detection using browser geolocation
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Theme**: Modern, eye-friendly dark interface with purple accents
- **Weather Icons**: Dynamic weather icons that change based on conditions
- **Mock Data Fallback**: Graceful fallback to sample data if API is unavailable
- **No API Key Required**: Uses free weather API services

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Bootstrap 5** - Responsive UI components
- **Font Awesome** - Weather and UI icons
- **wttr.in API** - Free weather data service
- **GitHub Pages** - Automated deployment

## 📱 Screenshots

### Desktop View

- Clean, organized weather display
- Current conditions with temperature and details
- Expandable 5-day forecast
- Humidity and wind speed indicators

### Mobile View

- Touch-friendly interface
- Responsive layout
- Optimized for small screens

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AlperDog/weather-dashboard-app.git
   cd weather-dashboard-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Deployment

The app is automatically deployed to GitHub Pages:

```bash
npm run deploy
```

## 🎯 How to Use

### Getting Weather Data

1. **Click "Get Weather"** - The app will request location permission
2. **Allow Location Access** - For real-time weather data
3. **View Current Weather** - Temperature, conditions, humidity, and wind speed
4. **Show Forecast** - Click to view 5-day weather predictions
5. **Refresh Data** - Get updated weather information

### Features in Detail

- **Current Weather**: Real-time temperature, conditions, and atmospheric data
- **Location Display**: Shows your current city and country
- **Weather Icons**: Dynamic icons that represent current conditions
- **Forecast Toggle**: Expandable 5-day weather forecast
- **Refresh Functionality**: Update weather data anytime

## 🔧 Technical Implementation

### React Hooks Used

- `useState` - Manage weather data and UI state
- `useEffect` - Handle API calls and side effects

### API Integration

- **wttr.in API**: Free weather service with JSON format
- **Geolocation API**: Browser-based location detection
- **Error Handling**: Graceful fallback to mock data

### Data Structure

```typescript
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
```

### Code Structure

```
src/
├── components/
│   └── Weather.tsx        # Main weather component
├── App.tsx                # Root component
├── App.css                # Global styles
└── index.tsx              # Entry point
```

## 🎨 Customization

### Styling

The app uses a dark theme with purple accents (`#aa00ff`). You can customize:

- Colors in `App.css`
- Weather icon animations
- Card styles and layouts
- Button appearances

### Adding Features

Easy to extend with:

- Multiple location support
- Weather alerts and notifications
- Historical weather data
- Weather maps integration
- Unit conversion (Celsius/Fahrenheit)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Alper Doğramacı**

- GitHub: @AlperDog
- Portfolio: [https://alperdog.github.io/portfolio](https://alperdog.github.io/portfolio)

## 🙏 Acknowledgments

- React team for the amazing framework
- Bootstrap for the responsive UI components
- wttr.in for the free weather API
- GitHub Pages for free hosting
- The open-source community for inspiration

---

**Built with ❤️ by Alper Doğramacı**
