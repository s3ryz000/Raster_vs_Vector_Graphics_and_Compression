/* =========================================================
   Lesson quiz: completing it unlocks the next node
   ========================================================= */
const quiz = (function () {
  const QUESTIONS = [
    { q: "A phone photo is made of…", a: ["Mathematical paths", "A grid of pixels", "Sound samples", "Fonts"], c: 1,
      why: "Photos are raster images: millions of coloured pixels." },
    { q: "Which image stays sharp when enlarged to billboard size?", a: ["A JPEG photo", "A PNG screenshot", "An SVG logo", "A GIF"], c: 2,
      why: "SVG is a vector format, so it is redrawn from maths at any size." },
    { q: "What happens to a raster image when you zoom in a lot?", a: ["It gets sharper", "Nothing changes", "It becomes pixelated", "It turns into a vector"], c: 2,
      why: "Each pixel gets stretched into a visible block." },
  ];
  const body = document.getElementById("quizBody");
  let idx, picked, correct;

  function restart() { idx = 0; correct = 0; delete body.dataset.locked; renderQ(); }

  function renderQ() {
    picked = null;
    document.getElementById("quizCount").textContent = `(${Math.min(idx + 1, QUESTIONS.length)}/${QUESTIONS.length})`;
    if (idx >= QUESTIONS.length) return renderDone();
    const Q = QUESTIONS[idx];
    body.innerHTML = `<h3 class="mb-3">${Q.q}</h3>
      <div class="d-grid gap-2 mb-3">${Q.a.map((t, i) =>
        `<button class="answer" type="button" data-i="${i}"><span class="badge text-bg-light border me-2">${"ABCD"[i]}</span>${t}</button>`).join("")}</div>
      <div id="fb"></div>
      <button class="btn btn-chunky w-100 mt-3" id="checkBtn" type="button" disabled>Check</button>`;
  }

  function renderDone() {
    const passed = correct >= 2;
    if (passed && state.done === 0) {
      state.done = 1; state.xp += 15 + correct * 5; state.streak = Math.max(1, state.streak);
      save(); renderAll();
    }
    document.getElementById("quizCount").textContent = "";
    body.innerHTML = `<div class="text-center py-3">
      <p class="display-4 mb-0" aria-hidden="true">${passed ? "🎉" : "💪"}</p>
      <h3 class="mt-2">${passed ? "Lesson complete!" : "Almost there!"}</h3>
      <p class="mx-auto">You got <strong>${correct} / ${QUESTIONS.length}</strong> correct.
        ${passed ? "Lesson 2 is now unlocked on your path." : "Score at least 2 to unlock the next lesson."}</p>
      <div class="d-flex gap-2 justify-content-center flex-wrap">
        <button class="btn btn-outline-chunky" type="button" id="retryBtn">Retake quiz</button>
        <a class="btn btn-chunky blue" href="#roadmap">Back to path</a>
      </div></div>`;
    document.getElementById("retryBtn").addEventListener("click", restart);
  }

  body.addEventListener("click", e => {
    const ans = e.target.closest(".answer");
    const check = e.target.closest("#checkBtn");
    if (ans && !body.dataset.locked) {
      picked = +ans.dataset.i;
      body.querySelectorAll(".answer").forEach(b => b.classList.toggle("selected", b === ans));
      document.getElementById("checkBtn").disabled = false;
    }
    if (check) {
      if (body.dataset.locked) { delete body.dataset.locked; idx++; return renderQ(); }
      const Q = QUESTIONS[idx], ok = picked === Q.c;
      if (ok) correct++; else state.hearts = Math.max(0, state.hearts - 1);
      save(); renderStats();
      body.querySelectorAll(".answer").forEach((b, i) => {
        b.classList.remove("selected");
        if (i === Q.c) b.classList.add("correct"); else if (i === picked) b.classList.add("wrong");
      });
      document.getElementById("fb").innerHTML =
        `<div class="feedback ${ok ? "ok" : "no"}">${ok ? "✔ Correct!" : "✘ Not quite."} <span class="fw-semibold">${Q.why}</span></div>`;
      body.dataset.locked = "1";
      check.textContent = "Continue";
    }
  });

  return { restart };
})();
