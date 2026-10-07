import { loadCoins } from "./coins.js";

const currentYear = document.querySelector("#currentyear");
currentYear.textContent = new Date().getFullYear();

loadCoins();