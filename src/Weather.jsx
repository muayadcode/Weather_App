import { useState, useEffect } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null); // Store weather data
  const [city, setCity] = useState('London'); // Default city
  const [inputCity, setInputCity] = useState(''); // Input for city search

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`; // Add units=metric for Celsius
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        console.log(data)
        setWeatherData({
          humidity: data.main.humidity,
          temperature: data.main.temp,
          feels: data.main.feels_like,
          wind: data.wind.speed,
        });
      } else {
        console.error("City not found");
        setWeatherData(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  //use effect to handle side effects and fetching city data
  useEffect(() => {
    search(city); // Search for default city when component mounts
  }, [city]);

  // Function to handle search input and update city state
  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity) {
      setCity(inputCity); // Trigger search with input city
      setInputCity(''); // Clear input field
    }
  };

  return (
    <div>
      <h1>Weather Information</h1>
      
      {/* /* Search Form */ }
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* /* Display weather data if available */}
      {weatherData ? (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.wind} m/s</p>
          <p>Feels Like: {weatherData.feels}°C</p>
        </div>
      ) : (
        <p>No weather data available. Try searching for another city.</p>
      )}
    </div>
  );
};

export default Weather;
