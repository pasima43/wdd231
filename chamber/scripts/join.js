const timestampField = document.querySelector("#timestamp");
timestampField.value = new Date().toLocaleString();

const currentYear = document.querySelector("#currentyear");
currentYear.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = "Last Modification: " + document.lastModified;

const npLink = document.querySelector("#np-link");
const bronzeLink = document.querySelector("#bronze-link");
const silverLink = document.querySelector("#silver-link");
const goldLink = document.querySelector("#gold-link");

const npModal = document.querySelector("#np-modal");
const bronzeModal = document.querySelector("#bronze-modal");
const silverModal = document.querySelector("#silver-modal");
const goldModal = document.querySelector("#gold-modal");

npLink.addEventListener("click", () => {
  npModal.showModal();
});

bronzeLink.addEventListener("click", () => {
  bronzeModal.showModal();
});

silverLink.addEventListener("click", () => {
  silverModal.showModal();
});

goldLink.addEventListener("click", () => {
  goldModal.showModal();
});

const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

const allModals = document.querySelectorAll("dialog");

allModals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
});