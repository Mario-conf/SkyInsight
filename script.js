const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');

const handleApiResponse = (json) => {
    if (json.cod && json.cod !== '200') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        console.error('API error:', json.message);
    } else {
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const climaPrincipal = json.weather[0].main.toLowerCase();
        const traducciones = {
            'clear': 'Despejado',
            'clouds': 'Nublado',
            'rain': 'Lluvia',
            'snow': 'Nieve',
            'mist': 'Neblina',
            'drizzle': 'Llovizna',
            'thunderstorm': 'Tormenta',
            'smoke': 'Humo',
            'hurricane': 'Huracán',
            'tornado': 'Tornado'
        };

        const traduccion = traducciones[climaPrincipal] || json.weather[0].description;

        description.innerHTML = traduccion;
        temperature.innerHTML = `${parseInt(json.main.temp)}<span> °C</span>`;
        humidity.innerHTML = `${json.main.humidity} %`;
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    }
};

search.addEventListener('click', () => {
    const APIkey = 'f7cd398265e2a084772ed8732ffce854';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => handleApiResponse(json))
        .catch(error => console.error('Error fetching data:', error));
});
