// Weather API Integration (Home Page)
if (document.getElementById('weather-display')) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Carlsbad,CA,US&appid=YOUR_API_KEY&units=imperial')
        .then(response => response.json())
        .then(data => {
            document.getElementById('weather-display').innerHTML =
                `<p>Temperature: ${data.main.temp}°F</p><p>Condition: ${data.weather[0].description}</p>`;
        })
        .catch(error => {
            document.getElementById('weather-display').innerHTML = '<p>Weather data unavailable.</p>';
        });
}

// Image Montage Slideshow (Discover Page)
if (document.getElementById('montage')) {
    const images = document.querySelectorAll('#montage img');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach(img => img.style.display = 'none');
        images[index].style.display = 'block';
    }

    showImage(currentIndex);
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }, 3000);
}

// Membership Form Handler (Join Page)
if (document.getElementById('membership-form')) {
    document.getElementById('membership-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const level = document.getElementById('level').value;
        console.log(`Membership submitted: ${name}, ${email}, ${level}`);
        alert('Thank you for your application!');
    });
}