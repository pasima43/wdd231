const currentYear = document.querySelector("#currentyear");
currentYear.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = "Last Modification: " + document.lastModified;

const weatherContainer = document.querySelector("#weather-container");
const apiKey = "3697b8532a77ee6e413834085cb1edc0";
const lat = 9.08;
const lon = 7.48;
const spotlightsContainer = document.querySelector("#spotlights-container");

async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displaySpotlights(data);
  } catch (error) {
    console.error("Error fetching spotlights:", error);
  }
}

function displaySpotlights(members) {
  const goldSilverMembers = members.filter(function (member) {
    return member.membership === 3 || member.membership === 2;
  });

  const shuffled = goldSilverMembers.sort(function () {
    return Math.random() - 0.5;
  });

  const selected = shuffled.slice(0, 3);

  selected.forEach(function (member) {
    const level = member.membership === 3 ? "Gold Member" : "Silver Member";

    const card = document.createElement("div");
    card.classList.add("member-card");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");

    const name = document.createElement("h2");
    name.textContent = member.name;

    const tagline = document.createElement("p");
    tagline.textContent = level;

    cardHeader.appendChild(name);
    cardHeader.appendChild(tagline);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const image = document.createElement("img");
    image.setAttribute("src", "images/" + member.image);
    image.setAttribute("alt", member.name + " logo");

    const details = document.createElement("div");
    details.classList.add("card-details");
    details.innerHTML = `
      <p><strong>ADDRESS:</strong> ${member.address}</p>
      <p><strong>PHONE:</strong> ${member.phone}</p>
      <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
    `;

    cardBody.appendChild(image);
    cardBody.appendChild(details);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    spotlightsContainer.appendChild(card);
  });
}

async function getCurrentWeather() {
  try {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=metric&appid=" +
      apiKey;
    const response = await fetch(url);
    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;

  const currentCard = document.createElement("div");
  currentCard.classList.add("weather-card");
  currentCard.innerHTML = `
    <p class="weather-temp">${temp}&deg;C</p>
    <p class="weather-description">${description}</p>
  `;

  weatherContainer.appendChild(currentCard);
}

async function getForecast() {
  try {
    const url =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=metric&appid=" +
      apiKey;
    const response = await fetch(url);
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
}

function displayForecast(data) {
  const forecastList = data.list;

  const forecastWrapper = document.createElement("div");
  forecastWrapper.classList.add("forecast-wrapper");

  for (let i = 0; i < 3; i++) {
    const dayIndex = i * 8;
    const dayData = forecastList[dayIndex];

    const dayDate = new Date(dayData.dt_txt);
    const dayName = dayDate.toLocaleDateString("en-US", { weekday: "short" });
    const dayTemp = Math.round(dayData.main.temp);

    const dayCard = document.createElement("div");
    dayCard.classList.add("forecast-day");
    dayCard.innerHTML = `
      <p class="forecast-day-name">${dayName}</p>
      <p class="forecast-day-temp">${dayTemp}&deg;C</p>
    `;

    forecastWrapper.appendChild(dayCard);
  }

  weatherContainer.appendChild(forecastWrapper);
}

getCurrentWeather();
getForecast();
getSpotlights();