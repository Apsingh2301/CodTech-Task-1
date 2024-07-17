
document.getElementById('search-btn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = '1e49651f5c1a2d093d630a35e5e5d359';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok) {
            updateWeatherInfo(data);
        } else {
            alert(data.message); 
        }
    } catch (error) {
        alert('Error fetching weather data');
    }
}

function updateWeatherInfo(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°`;
    document.getElementById('real-feel').textContent = `${Math.round(data.main.feels_like)}°`;
    document.getElementById('rain-chance').textContent = `Chance of rain: ${data.rain ? data.rain['1h'] || data.rain['3h'] : 0}%`;
    document.getElementById('wind-speed').textContent = `${Math.round(data.wind.speed)} km/h`;
    document.getElementById('uv-index').textContent = 'N/A'; 

    const weatherIcon = document.getElementById('weather-icon');
    const weatherMain = data.weather[0].main.toLowerCase();
    
    if (weatherMain.includes('rain')) {
        weatherIcon.textContent = '🌧️';
    } else if (weatherMain.includes('cloud')) {
        weatherIcon.textContent = '☁️';
    } else if (weatherMain.includes('snow')) {
        weatherIcon.textContent = '❄️';
    } else if (weatherMain.includes('thunderstorm')) {
        weatherIcon.textContent = '⚡';
    } else {
        weatherIcon.textContent = '☀️';
    }
}

// Function to get forecast data (if needed for forecast section)
async function getForecast(city) {
    const apiKey = '1e49651f5c1a2d093d630a35e5e5d359';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok) {
            updateForecastInfo(data);
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error fetching forecast data');
    }
}

function updateForecastInfo(data) {
    const forecastDetails = document.querySelector('.forecast-details');
    forecastDetails.innerHTML = '';

    for (let i = 0; i < 8; i++) {
        const forecast = data.list[i];
        const forecastTime = new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const forecastTemp = `${Math.round(forecast.main.temp)}°`;
        const forecastWeather = forecast.weather[0].main.toLowerCase();
        let weatherEmoji = '☀️';

        if (forecastWeather.includes('rain')) {
            weatherEmoji = '🌧️';
        } else if (forecastWeather.includes('cloud')) {
            weatherEmoji = '☁️';
        } else if (forecastWeather.includes('snow')) {
            weatherEmoji = '❄️';
        } else if (forecastWeather.includes('thunderstorm')) {
            weatherEmoji = '⚡';
        }

        forecastDetails.innerHTML += `<div class="forecast-time">${forecastTime} <span>${forecastTemp} ${weatherEmoji}</span></div>`;
    }
}
