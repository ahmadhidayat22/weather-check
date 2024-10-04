
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const minMax = document.querySelector('.min-max');
const error404 = document.querySelector('.not-found');


search.addEventListener('click', () => {

    const APIKey = ''; // fill with your api

    const city = document.querySelector('.search-box input').value;
    
    if (city === '')
        return;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '380px';
		minMax.style.display='none';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const min= document.querySelector('.min-max .min span');
            const max= document.querySelector('.min-max .max span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }
         
            min.innerHTML = `${parseInt(json.main.temp_min)}<span>°C</span>`;
            max.innerHTML = `${parseInt(json.main.temp_max)}<span>°C</span>`;
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            minMax.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            minMax.classList.add('fadeIn');

            container.style.height = '640px';


        

           
    
    
    });

});
