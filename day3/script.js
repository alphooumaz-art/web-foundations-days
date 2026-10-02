let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];


// 1. Search notes
function searchNotes(word) {
  const searchWord = word.toLowerCase();

  return notes.filter((note) =>
    note.text.toLowerCase().includes(searchWord)
  );
}


// 2. Find the longest note
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  return notes.reduce((longest, note) => {
    return note.text.length > longest.text.length ? note : longest;
  });
}


// 3. Count notes by category
function countByCategory() {
  const counts = {};

  for (const note of notes) {
    if (counts[note.category]) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  }

  return counts;
}


// 4. Get summary
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;

  const noteWord = total === 1 ? "note" : "notes";

  return `${total} ${noteWord}: ${counts.personal || 0} personal, ${
    counts.work || 0
  } work, ${counts.study || 0} study.`;
}


// 5. Check for duplicate
function isDuplicate(text) {
  const newText = text.trim().toLowerCase();

  return notes.some(
    (note) => note.text.trim().toLowerCase() === newText
  );
}


// 6. Add a note
function addNote(text, category) {
  const trimmedText = text.trim();
  const validCategories = ["personal", "work", "study"];

  if (trimmedText.length < 1 || trimmedText.length > 200) {
    console.log("Note not added: text must be 1–200 characters.");
    return false;
  }

  if (isDuplicate(trimmedText)) {
    console.log("Note not added: duplicate note.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log("Note not added: invalid category.");
    return false;
  }

  const newId =
    notes.length > 0
      ? Math.max(...notes.map((note) => note.id)) + 1
      : 1;

  notes.push({
    id: newId,
    text: trimmedText,
    category: category,
  });

  console.log("Note added successfully.");
  return true;
}


// TESTS

// searchNotes
console.log(searchNotes("javascript"));
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

console.log(searchNotes("football"));
// Expected: []


// longestNote
console.log(longestNote());
// Expected: { id: 2, text: "Finish the Day 3 assignment", category: "study" }

notes = [];
console.log(longestNote());
// Expected: null

// Restore starting notes for the remaining tests
notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];


// countByCategory
console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

notes = [];
console.log(countByCategory());
// Expected: {}


// Restore starting notes
notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];


// getSummary
console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."

notes = [
  { id: 1, text: "Call mum", category: "personal" },
];

console.log(getSummary());
// Expected: "1 note: 1 personal, 0 work, 0 study."


// Restore starting notes
notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];


// isDuplicate
console.log(isDuplicate("  BUY MILK AND BREAD  "));
// Expected: true

console.log(isDuplicate("Buy apples"));
// Expected: false


// addNote
console.log(addNote("Learn JavaScript functions", "study"));
// Expected: true

console.log(addNote("  Buy milk and bread  ", "personal"));
// Expected: false (duplicate)

console.log(addNote("", "study"));
// Expected: false (invalid length)

console.log(addNote("New note", "shopping"));
// Expected: false (invalid category)