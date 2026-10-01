/* =========================================================
   Saved state (localStorage)
   Name and progress live only in this browser.
   ========================================================= */
const STORE = "rva-progress";
const DEFAULT = { name: "", welcomed: false, done: 0, xp: 0, hearts: 5, streak: 0, lastDay: "" };
let state = load();

function load() {
  try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem(STORE)) }; }
  catch { return { ...DEFAULT }; }
}
function save() {
  try { localStorage.setItem(STORE, JSON.stringify(state)); } catch { /* storage blocked: keep in memory */ }
}

// Keep the learner's name, clear everything else
function resetProgress() { state = { ...DEFAULT, name: state.name, welcomed: true }; save(); }
function signOut() { state = { ...DEFAULT }; save(); }

// Pages behind sign-in call this first; it sends signed-out visitors to the start page
function requireUser() {
  if (state.name) return true;
  location.replace("index.html");
  return false;
}

// Streak: +1 for learning on consecutive days, back to 1 after a gap
function bumpStreak() {
  const day = d => d.toLocaleDateString("en-CA"); // YYYY-MM-DD in local time
  const today = day(new Date());
  if (state.lastDay === today) return;
  const yesterday = day(new Date(Date.now() - 864e5));
  state.streak = state.lastDay === yesterday ? state.streak + 1 : 1;
  state.lastDay = today;
}
