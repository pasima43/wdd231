const params = new URLSearchParams(window.location.search);

document.querySelector("#result-first").textContent = params.get("first-name");
document.querySelector("#result-last").textContent = params.get("last-name");
document.querySelector("#result-email").textContent = params.get("email");
document.querySelector("#result-phone").textContent = params.get("phone");
document.querySelector("#result-business").textContent =
  params.get("organization");
document.querySelector("#result-timestamp").textContent =
  params.get("timestamp");

const currentYear = document.querySelector("#currentyear");
currentYear.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = "Last Modification: " + document.lastModified;