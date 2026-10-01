/* =========================================================
   Start page: 1. sign in with a name → 2. welcome popup
   ========================================================= */
(function () {
  // Returning learners skip straight to their path
  if (state.name && state.welcomed) return location.replace("path.html");

  const form = document.getElementById("nameForm");
  const input = document.getElementById("nameInput");
  const modal = new bootstrap.Modal("#welcomeModal");

  function showWelcome() {
    setText("welcomeName", state.name);
    const preview = document.getElementById("previewPath");
    renderPath(preview);
    preview.inert = true; // the preview is a picture of the path, not clickable
    modal.show();
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = input.value.trim();
    if (!name) {
      input.classList.add("is-invalid");
      input.focus();
      return;
    }
    state.name = name.slice(0, 30);
    save();
    showWelcome();
  });
  input.addEventListener("input", () => input.classList.remove("is-invalid"));

  document.getElementById("startBtn").addEventListener("click", () => {
    state.welcomed = true;
    save();
    location.href = "path.html";
  });

  // Signed in earlier but closed the popup: prefill the name
  if (state.name) input.value = state.name;
})();
