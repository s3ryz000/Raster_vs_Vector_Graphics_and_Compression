/* =========================================================
   Saved state (localStorage)
   ========================================================= */
const STORE = "rva-progress";
const DEFAULT = { done: 0, xp: 0, hearts: 5, streak: 0 };
let state = load();

function load() {
  try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem(STORE)) }; }
  catch { return { ...DEFAULT }; }
}
function save() {
  try { localStorage.setItem(STORE, JSON.stringify(state)); } catch { /* storage blocked: keep in memory */ }
}
