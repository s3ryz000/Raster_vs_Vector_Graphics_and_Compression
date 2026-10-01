/* =========================================================
   Toast helper
   ========================================================= */
const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("toast"), { delay: 2500 });
function notify(msg) { document.getElementById("toastMsg").textContent = msg; toast.show(); }

/* =========================================================
   Header stats
   ========================================================= */
function renderStats() {
  document.getElementById("xp").textContent = state.xp;
  document.getElementById("hearts").textContent = state.hearts;
  document.getElementById("streak").textContent = state.streak;
  document.getElementById("progressText").textContent = `${state.done} / ${TOTAL} lessons`;
  document.getElementById("progressBar").style.width = (state.done / TOTAL * 100) + "%";
  document.getElementById("progressWrap").setAttribute("aria-valuenow", state.done);
}
