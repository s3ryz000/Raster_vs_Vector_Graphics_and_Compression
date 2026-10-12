/* =========================================================
   Start page: 1. sign in with a name → 2. welcome popup
   Rock-solid Vanilla JS with Bootstrap enhancement.
   ========================================================= */
(function () {
  // If returning learner already completed lessons, allow skipping straight to path
  if (state.name && state.welcomed && state.done > 0) {
    return location.replace("path.html");
  }

  const form = document.getElementById("nameForm");
  const input = document.getElementById("nameInput");
  const modalEl = document.getElementById("welcomeModal");
  const preview = document.getElementById("previewPath");
  const startBtn = document.getElementById("startBtn");
  const startLesson1Btn = document.getElementById("startLesson1Btn");
  const previewRoadmapBtn = document.getElementById("previewRoadmapBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");

  // Prefill stored name if present
  if (state.name && input) input.value = state.name;

  // Safe modal opener (works with Bootstrap or native fallback)
  function openModal() {
    if (!modalEl) return;
    const name = (input ? input.value.trim() : "") || state.name || "Learner";
    state.name = name.slice(0, 30);
    save();

    setText("welcomeName", state.name);
    if (preview && typeof renderPath === "function") {
      renderPath(preview);
      preview.removeAttribute("inert");
    }

    // Try Bootstrap Modal first
    if (window.bootstrap && bootstrap.Modal) {
      try {
        const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
        bsModal.show();
        return;
      } catch (err) {
        console.warn("Bootstrap modal invocation failed, using fallback:", err);
      }
    }

    // Native fallback
    modalEl.classList.add("show");
    modalEl.style.display = "block";
    document.body.classList.add("modal-open");
    let backdrop = document.getElementById("nativeModalBackdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "nativeModalBackdrop";
      backdrop.className = "modal-backdrop fade show";
      backdrop.addEventListener("click", closeModal);
      document.body.appendChild(backdrop);
    }
  }

  function closeModal() {
    if (!modalEl) return;
    if (window.bootstrap && bootstrap.Modal) {
      try {
        const bsModal = bootstrap.Modal.getInstance(modalEl);
        if (bsModal) { bsModal.hide(); return; }
      } catch (e) {}
    }
    modalEl.classList.remove("show");
    modalEl.style.display = "none";
    document.body.classList.remove("modal-open");
    const backdrop = document.getElementById("nativeModalBackdrop");
    if (backdrop) backdrop.remove();
  }

  // 1. Submit form ("Start learning" button)
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      openModal();
    });
  }

  // 2. Preview 5-lesson path button
  if (previewRoadmapBtn) {
    previewRoadmapBtn.addEventListener("click", () => {
      openModal();
    });
  }

  // 3. Start Lesson 1 directly
  if (startLesson1Btn) {
    startLesson1Btn.addEventListener("click", () => {
      state.welcomed = true;
      if (!state.name) state.name = (input && input.value.trim()) || "Learner";
      save();
      location.href = "lesson.html?id=1";
    });
  }

  // 4. Go to my path
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      state.welcomed = true;
      if (!state.name) state.name = (input && input.value.trim()) || "Learner";
      save();
      location.href = "path.html";
    });
  }

  // 5. Close modal button
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      closeModal();
    });
  }

  // 6. Interactive roadmap preview nodes: clicking any unlocked node opens that lesson
  if (preview) {
    preview.addEventListener("click", e => {
      const btn = e.target.closest(".node");
      if (!btn) return;
      const { id } = btn.dataset;
      state.welcomed = true;
      if (!state.name) state.name = (input && input.value.trim()) || "Learner";
      save();

      if (id === "final") {
        location.href = "lesson.html?id=final";
      } else {
        location.href = `lesson.html?id=${id || 1}`;
      }
    });
  }

  // 7. Interactive chips
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      chip.classList.add("active");
      setTimeout(() => chip.classList.remove("active"), 400);
      openModal();
    });
  });
})();
