
const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

const DRAFT_KEY = "notesToolkitDraft";
const THEME_KEY = "notesToolkitTheme";

// Update character and word counts
function updateCounts() {
  const text = noteText.value;
  const characters = text.length;

  const trimmedText = text.trim();
  const words = trimmedText === ""
    ? 0
    : trimmedText.split(/\s+/).length;

  charCount.textContent = `${characters} / 200 characters`;
  wordCount.textContent = `${words} words`;

  charCount.classList.remove("warning", "over");

  if (characters > 200) {
    charCount.classList.add("over");
  } else if (characters > 180) {
    charCount.classList.add("warning");
  }
}

// Save the note automatically whenever it changes
noteText.addEventListener("input", function () {
  updateCounts();
  localStorage.setItem(DRAFT_KEY, noteText.value);
});

// Clear the note and remove the saved draft
function clearNote() {
  noteText.value = "";
  localStorage.removeItem(DRAFT_KEY);
  updateCounts();
}

clearBtn.addEventListener("click", clearNote);

// Press Escape to clear the note
noteText.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    clearNote();
  }
});

// Update the theme button label
function updateThemeLabel() {
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "Light mode";
  } else {
    themeToggle.textContent = "Dark mode";
  }
}

// Switch themes and remember the choice
themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  const theme = document.body.classList.contains("dark")
    ? "dark"
    : "light";

  localStorage.setItem(THEME_KEY, theme);
  updateThemeLabel();
});

// Restore the saved draft and theme when the page loads
const savedDraft = localStorage.getItem(DRAFT_KEY);

if (savedDraft !== null) {
  noteText.value = savedDraft;
}

const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

updateThemeLabel();
updateCounts();