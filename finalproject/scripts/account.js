const params = new URLSearchParams(window.location.search);
const details = document.querySelector("#account-details");

const fields = [
  ["Full name", params.get("full-name")],
  ["Email address", params.get("email")],
  ["Plan", params.get("plan")],
  ["Message", params.get("message")],
];

fields.forEach(([label, value]) => {
  const item = document.createElement("li");
  const name = document.createElement("strong");
  name.textContent = `${label}: `;
  item.append(name, value || "Not provided");
  details.appendChild(item);
});