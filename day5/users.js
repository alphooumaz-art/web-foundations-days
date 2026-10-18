@'
const loadButton = document.querySelector("#load-users");
const filterInput = document.querySelector("#filter-input");
const statusMessage = document.querySelector("#status");
const usersList = document.querySelector("#users-list");

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

let users = [];

async function loadUsers() {
  loadButton.disabled = true;
  statusMessage.textContent = "Loading users...";
  usersList.replaceChildren();

  try {
    const response = await fetch(USERS_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("The server returned unexpected data.");
    }

    users = data;

    renderUsers(users);

    statusMessage.textContent =
      `Successfully loaded ${users.length} users.`;
  } catch (error) {
    console.error("Could not load users:", error);

    users = [];
    usersList.replaceChildren();

    statusMessage.textContent =
      "Unable to load users. Please check your connection and try again.";
  } finally {
    loadButton.disabled = false;
  }
}

function renderUsers(list) {
  usersList.replaceChildren();

  if (list.length === 0) {
    const message = document.createElement("li");
    message.textContent = filterInput.value.trim()
      ? "No users match your filter."
      : "No users available.";

    usersList.appendChild(message);
    return;
  }

  list.forEach((user) => {
    const item = document.createElement("li");
    item.classList.add("user-card");

    const name = document.createElement("h2");
    name.textContent = user.name;

    const email = document.createElement("p");
    email.textContent = `Email: ${user.email}`;

    const city = document.createElement("p");
    city.textContent = `City: ${user.address.city}`;

    const company = document.createElement("p");
    company.textContent = `Company: ${user.company.name}`;

    item.append(name, email, city, company);
    usersList.appendChild(item);
  });
}

loadButton.addEventListener("click", loadUsers);

filterInput.addEventListener("input", () => {
  const searchTerm = filterInput.value.trim().toLowerCase();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );

  renderUsers(filteredUsers);
});
'@ | Set-Content -Encoding utf8 users.js