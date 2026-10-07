const coinList = document.querySelector("#coin-list");
const coinDialog = document.querySelector("#coin-dialog");
const WATCHLIST_KEY = "elPasimaWatchlist";
let coins = [];

export async function loadCoins() {
  if (!coinList) return;

  coinList.addEventListener("click", (event) => {
    const detailsButton = event.target.closest(".details-btn");
    const watchButton = event.target.closest(".watch-btn");

    if (detailsButton) {
      showDetails(coins[Number(detailsButton.dataset.index)]);
    } else if (watchButton) {
      toggleWatch(watchButton.dataset.symbol);
    }
  });

  coinDialog.querySelector(".dialog-close").addEventListener("click", () => {
    coinDialog.close();
  });

  coinDialog.addEventListener("click", (event) => {
    const box = coinDialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom;
    if (clickedOutside) coinDialog.close();
  });

  try {
    const response = await fetch("data/coins.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    coins = await response.json();
    displayCoins(coins);
  } catch (error) {
    coinList.textContent =
      "Sorry, the list of digital assets could not be loaded.";
  }
}

function getWatchlist() {
  return JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
}

function toggleWatch(symbol) {
  const watchlist = getWatchlist();
  const updated = watchlist.includes(symbol)
    ? watchlist.filter((item) => item !== symbol)
    : [...watchlist, symbol];
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
  displayCoins(coins);
}

function displayCoins(list) {
  const watchlist = getWatchlist();

  const cards = list
    .map((coin, index) => {
      const saved = watchlist.includes(coin.symbol);
      return `
        <article class="coin-card">
          <h2>${coin.name} <span>(${coin.symbol})</span></h2>
          <p><strong>Launched:</strong> ${coin.launched}</p>
          <p><strong>How it works:</strong> ${coin.mechanism}</p>
          <p>${coin.description}</p>
                    <div class="coin-actions">
            <button type="button" class="details-btn" data-index="${index}">
              View details
            </button>
            <button type="button" class="watch-btn" data-symbol="${coin.symbol}">
              ${saved ? "Saved" : "Add to watchlist"}
            </button>
          </div>

        </article>
      `;
    })
    .join("");

  coinList.innerHTML = cards;
}

function showDetails(coin) {
  coinDialog.querySelector("#dialog-title").textContent =
    `${coin.name} (${coin.symbol})`;
  coinDialog.querySelector("#dialog-launched").textContent = coin.launched;
  coinDialog.querySelector("#dialog-mechanism").textContent = coin.mechanism;
  coinDialog.querySelector("#dialog-body").textContent = coin.description;
  coinDialog.showModal();
}