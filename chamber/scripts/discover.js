import { pointsOfInterest } from '../data/points-of-interest.mjs';

function createCards() {
    const container = document.getElementById('points-of-interest');
    pointsOfInterest.forEach(poi => {
        const card = document.createElement('div');
        card.className = 'poi-card';
        card.innerHTML = `
      <h2>${poi.name}</h2>
      <figure>
        <img src="${poi.image}" alt="${poi.name}">
      </figure>
      <address>${poi.address}</address>
      <p>${poi.description}</p>
      <button>Learn More</button>
    `;
        container.appendChild(card);
    });
}

function displayVisitMessage() {
    const visitMessage = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysSinceVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceVisit} ${daysSinceVisit === 1 ? 'day' : 'days'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', now);
}

createCards();
displayVisitMessage();