// Raster & Vector Academy: demo script

// 1. Remember the learner's name (the sign-in form sends it as ?name=...)
const nameFromForm = new URLSearchParams(location.search).get("name");
if (nameFromForm) localStorage.setItem("learnerName", nameFromForm);

const learnerName = localStorage.getItem("learnerName");
if (learnerName) {
  document.querySelectorAll(".learner-name").forEach(el => el.textContent = learnerName);
}

// 2. Quiz buttons: say correct or wrong, then explain why
document.querySelectorAll(".answer").forEach(button => {
  button.addEventListener("click", () => {
    const result = button.closest(".question").querySelector(".result");
    const isCorrect = button.dataset.correct === "true";
    result.textContent = (isCorrect ? "✔ Correct! " : "✘ Wrong. ") + button.dataset.explain;
    result.className = isCorrect ? "result correct" : "result wrong";
  });
});

// 3. Zoom slider (lesson page only): enlarge both images by the same amount
const zoom = document.getElementById("zoom");
if (zoom) {
  zoom.addEventListener("input", () => {
    const size = 64 * zoom.value + "px";
    document.getElementById("rasterArt").style.width = size;
    document.getElementById("rasterArt").style.height = size;
    document.getElementById("vectorArt").style.width = size;
    document.getElementById("vectorArt").style.height = size;
    document.getElementById("zoomValue").textContent = zoom.value + "×";
    // Scroll both boxes to the mountain's edge, where the difference shows best
    document.querySelectorAll(".zoom-box").forEach(box => {
      box.scrollLeft = 64 * zoom.value * 0.45 - 100;
      box.scrollTop = 64 * zoom.value * 0.5 - 100;
    });
  });
}
