// Weather API Integration (Home Page)
const weatherDisplay = document.getElementById('weather-display');
if (weatherDisplay) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Carlsbad,CA,US&appid=YOUR_API_KEY&units=imperial')
        .then(response => {
            if (!response.ok) throw new Error('Weather fetch failed');
            return response.json();
        })
        .then(data => {
            weatherDisplay.innerHTML =
                `<p>Temperature: ${data.main.temp}°F</p><p>Condition: ${data.weather[0].description}</p>`;
        })
        .catch(error => {
            console.error(error);
            weatherDisplay.innerHTML = '<p>Weather data unavailable.</p>';
        });
}

// Image Montage Slideshow (Discover Page)
const montage = document.getElementById('montage');
if (montage) {
    const images = montage.querySelectorAll('img');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach(img => img.style.display = 'none');
        if (images[index]) images[index].style.display = 'block';
    }

    if (images.length > 0) {
        showImage(currentIndex);
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 3000);
    }
}

// Membership Form Handler (Join Page)
const membershipForm = document.getElementById('membership-form');
if (membershipForm) {
    membershipForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const level = document.getElementById('level')?.value;
        console.log(`Membership submitted: ${name}, ${email}, ${level}`);
        alert('Thank you for your application!');
        this.reset();
    });
}

// Business Spotlights (Home Page)
const spotlightsContainer = document.querySelector('.business-spotlights');
if (spotlightsContainer) {
    document.querySelectorAll('.business-spotlight').forEach(spotlight => {
        spotlight.addEventListener('click', () => {
            const details = spotlight.querySelector('.details');
            if (details) {
                details.style.display = details.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
}

// Responsive Navigation Menu
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Footer Date Update
const footerDate = document.getElementById('footer-date');
if (footerDate) {
    footerDate.textContent = `© ${new Date().getFullYear()} Your Chamber of Commerce`;
}

// Last Modified Date
const lastModified = document.getElementById('last-modified');
if (lastModified) {
    lastModified.textContent = `Last Modified: ${new Date(document.lastModified).toLocaleDateString()}`;
}

// Lazy Loading Images
document.querySelectorAll('img.lazy').forEach(img => {
    img.src = img.dataset.src;
    img.classList.remove('lazy');
});

// Directory View Toggle (Directory Page)
const directoryContainer = document.getElementById('directoryContainer');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');

if (directoryContainer && gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener('click', () => {
        directoryContainer.classList.add('grid-view');
        directoryContainer.classList.remove('list-view');
    });

    listViewBtn.addEventListener('click', () => {
        directoryContainer.classList.add('list-view');
        directoryContainer.classList.remove('grid-view');
    });
}