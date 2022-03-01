const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMessage = document.getElementById('errorMessage');
const locationMessage = document.getElementById('locationMessage');
const forecastMessage = document.getElementById('forecastMessage');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    errorMessage.textContent = 'Loading...';
    locationMessage.textContent = '';
    forecastMessage.textContent = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then(({ error, location, weatherDescription, temperature, feelslike }) => {
            if (error) {
                errorMessage.textContent = error;
            } else {
                errorMessage.textContent = '';
                locationMessage.textContent = location;
                forecastMessage.textContent = `${weatherDescription}. It is currently ${temperature} degress out. It is feels like ${feelslike} degress out.`
            }
        });
    });
});


