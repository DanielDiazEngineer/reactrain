import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function WeatherDashboard() {
    const mockWeatherData = {
        'New York': {
            temperature: '22°C',
            humidity: '56%',
            windSpeed: '15 km/h'
        },
        'Los Angeles': {
            temperature: '27°C',
            humidity: '45%',
            windSpeed: '10 km/h'
        },
        'London': {
            temperature: '15°C',
            humidity: '70%',
            windSpeed: '20 km/h'
        }
    };

    const [searchInput, setSearchInput] = useState('');
    const [currentCity, setCurrentCity] = useState(null);
    const [searchHistory, setSearchHistory] = useState([]);

    const handleSearch = () => {
        const cityData = mockWeatherData[searchInput];

        if (cityData) {
            setCurrentCity({ name: searchInput, ...cityData });

            // Add to history if not already there
            if (!searchHistory.includes(searchInput)) {
                setSearchHistory([...searchHistory, searchInput]);
            }
        } else {
            setCurrentCity({ name: searchInput, notFound: true });
        }
    };

    const handleCityClick = (cityName) => {
        const cityData = mockWeatherData[cityName];
        setCurrentCity({ name: cityName, ...cityData });
    };

    return (
        <div>
            <input
                type="text"
                id="citySearch"
                placeholder="Search for a city..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button id="searchButton" onClick={handleSearch}>
                Search
            </button>

            <div id="weatherData">
                {currentCity && (
                    currentCity.notFound ? (
                        <div>City not found.</div>
                    ) : (
                        <div>
                            <div>Temperature: {currentCity.temperature}</div>
                            <div>Humidity: {currentCity.humidity}</div>
                            <div>Wind Speed: {currentCity.windSpeed}</div>
                        </div>
                    )
                )}
            </div>

            <div id="previousSearches">
                {searchHistory.map((city) => (
                    <button key={city} onClick={() => handleCityClick(city)}>
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<WeatherDashboard />);