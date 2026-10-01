/* =========================================================
   UI helpers shared by all pages
   ========================================================= */
const escapeHtml = s => String(s).replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

// Toast message (only on pages that include the #toast markup)
function notify(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  document.getElementById("toastMsg").textContent = msg;
  bootstrap.Toast.getOrCreateInstance(el, { delay: 2500 }).show();
}

// Header stats: fills whichever of these elements the page has
function renderStats() {
  setText("xp", state.xp);
  setText("hearts", state.hearts);
  setText("streak", state.streak);
  setText("userName", state.name);
  setText("progressText", `${state.done} / ${TOTAL} lessons`);
}
function setProgress(fraction) {
  const bar = document.getElementById("progressBar");
  if (!bar) return;
  bar.style.width = Math.round(fraction * 100) + "%";
  bar.parentElement.setAttribute("aria-valuenow", Math.round(fraction * bar.parentElement.getAttribute("aria-valuemax")));
}
