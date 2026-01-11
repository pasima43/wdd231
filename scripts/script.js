// script.js

// Hamburger menu toggle for mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Weather API fetch (example using OpenWeatherMap)
const weatherSection = document.querySelector('.weather');

fetch('https://api.openweathermap.org/data/2.5/weather?q=Abuja&appid=YOUR_API_KEY&units=metric')
    .then(response => response.json())
    .then(data => {
        const temp = data.main.temp;
        const description = data.weather[0].description;
        weatherSection.innerHTML = `
      <h2>Weather in Abuja</h2>
      <p>Temperature: ${temp}°C</p>
      <p>Condition: ${description}</p>
    `;
    })
    .catch(error => console.error(error));

// Simple form validation for Join page
const joinForm = document.querySelector('#join-form');

if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;

        if (name && email) {
            alert('Form submitted!');
        } else {
            alert('Please fill in all fields');
        }
    });
}