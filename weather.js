document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.getElementById('inputs');
    const getweather = document.getElementById('getweather');
    const unordered = document.getElementById('unorderd'); // Fixed ID
    const cityName = document.getElementById('name'); // Renamed to avoid conflict
    const temp = document.getElementById('temp');
    const descp = document.getElementById('desc');
    const errorMsg = document.getElementById('errormsg');

    const API_KEY = '5f56d525d1619d0a2cd2eac4ce55588e';

    getweather.addEventListener('click', async () => {
        const city = inputs.value.trim();
        if (!city) {
            showError();
            return;
        }

        const weatherData = await fetchCityDetails(city); // ✅ Use await
        if (weatherData) {
            displayCityDetails(weatherData);
        } else {
            showError();
        }
    });

    async function fetchCityDetails(city) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                return data; // ✅ Return the fetched data
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error:', error);
            return null; // ✅ Return null in case of error
        }
    }

    function displayCityDetails(data) {
        unordered.classList.remove('hidden');
        errorMsg.classList.add('hidden'); // ✅ Hide error message

        const { name, main, weather } = data;

        cityName.textContent = `City: ${name}`;
        temp.textContent = `Temperature: ${main.temp}°C`;
        descp.textContent = `Condition: ${weather[0].description}`;
    }

    function showError() {
        unordered.classList.add('hidden');
        errorMsg.classList.remove('hidden');
    }
});
