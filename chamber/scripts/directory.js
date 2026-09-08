const membersContainer = document.querySelector("#members-container");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");

async function getMembersData() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Error fetching member data:", error);
  }
}

function membershipLabel(level) {
  if (level === 3) return "Gold Member";
  if (level === 2) return "Silver Member";
  return "Member";
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");

    const name = document.createElement("h2");
    name.textContent = member.name;

    const tagline = document.createElement("p");
    tagline.textContent = membershipLabel(member.membership);

    cardHeader.appendChild(name);
    cardHeader.appendChild(tagline);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const image = document.createElement("img");
    image.setAttribute("src", `images/${member.image}`);
    image.setAttribute("alt", `${member.name} logo`);
    image.setAttribute("loading", "lazy");

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

    membersContainer.appendChild(card);
  });
}

gridBtn.addEventListener("click", () => {
  membersContainer.classList.remove("list-view");
  membersContainer.classList.add("grid-view");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.remove("grid-view");
  membersContainer.classList.add("list-view");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

const currentYear = document.querySelector("#currentyear");
currentYear.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = "Last Modification: " + document.lastModified;

getMembersData();