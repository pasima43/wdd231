import discoverData from "../data/discover.mjs";

const discoverContainer = document.querySelector("#discover-container");

function displayDiscoverItems(items) {
  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("discover-card");

    const title = document.createElement("h2");
    title.textContent = item.name;

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.setAttribute("src", `images/${item.image}`);
    image.setAttribute("alt", item.name);
    image.setAttribute("loading", "lazy");

    figure.appendChild(image);

    const address = document.createElement("address");
    address.textContent = item.address;

    const description = document.createElement("p");
    description.textContent = item.description;

    const learnMoreBtn = document.createElement("button");
    learnMoreBtn.textContent = "learn more";

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(learnMoreBtn);

    discoverContainer.appendChild(card);
  });
}

function displayVisitMessage() {
  const visitMessage = document.querySelector("#visit-message");
  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");

  if (!lastVisit) {
    visitMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor((now - lastVisit) / msPerDay);

    if (daysBetween < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", now);
}

const currentYear = document.querySelector("#currentyear");
currentYear.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = "Last Modification: " + document.lastModified;

displayDiscoverItems(discoverData);
displayVisitMessage();