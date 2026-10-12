/* =========================================================
   Saved state (localStorage)
   Name and progress live only in this browser.
   ========================================================= */
const STORE = "rva-progress";
const DEFAULT = { name: "", welcomed: false, done: 0, xp: 0, hearts: 5, streak: 0, lastDay: "" };
let state = load();

function load() {
  try {
    const data = { ...DEFAULT, ...JSON.parse(localStorage.getItem(STORE)) };
    if (typeof data.done !== "number" || isNaN(data.done)) data.done = 0;
    if (typeof TOTAL === "number" && data.done > TOTAL + 1) data.done = TOTAL;
    if (typeof data.hearts !== "number" || isNaN(data.hearts)) data.hearts = 5;
    if (typeof data.xp !== "number" || isNaN(data.xp)) data.xp = 0;
    if (typeof data.streak !== "number" || isNaN(data.streak)) data.streak = 0;
    return data;
  }
  catch { return { ...DEFAULT }; }
}
function save() {
  try { localStorage.setItem(STORE, JSON.stringify(state)); } catch { /* storage blocked: keep in memory */ }
}

// Keep the learner's name, clear everything else
function resetProgress() { state = { ...DEFAULT, name: state.name, welcomed: true }; save(); }
function signOut() { state = { ...DEFAULT }; save(); }

// Pages behind sign-in call this first; ensures a friendly name exists so learners are never trapped
function requireUser() {
  if (state.name && state.name.trim()) return true;
  state.name = "Learner";
  save();
  return true;
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
