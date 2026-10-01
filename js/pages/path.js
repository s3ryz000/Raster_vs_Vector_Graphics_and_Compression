/* =========================================================
   Path page: roadmap home. Clicking an open lesson goes to lesson.html?id=N
   ========================================================= */
(function () {
  if (!requireUser()) return;
  const pathRoot = document.getElementById("pathRoot");

  function renderAll() {
    renderStats();
    setProgress(state.done / TOTAL);
    renderPath(pathRoot);
  }

  pathRoot.addEventListener("click", e => {
    const btn = e.target.closest(".node");
    if (!btn) return;
    const { id, status } = btn.dataset;
    if (status === "locked") return notify("🔒 Finish the previous lesson first!");
    if (id === "final") return notify("🏆 The final quiz is coming soon.");
    location.href = `lesson.html?id=${id}`;
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    if (!confirm("Reset all your progress? Your XP, streak and completed lessons will be cleared.")) return;
    resetProgress();
    renderAll();
    notify("Progress reset.");
  });

  document.getElementById("signOutBtn").addEventListener("click", () => {
    if (!confirm("Sign out? Your name and progress will be removed from this browser.")) return;
    signOut();
    location.replace("index.html");
  });

  renderAll();
  // Bring the current lesson into view
  pathRoot.querySelector(".node.is-active")?.scrollIntoView({ block: "center" });
})();
