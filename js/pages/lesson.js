/* =========================================================
   Lesson player: one template for every lesson.
   lesson.html?id=N loads js/lessons/lesson-NN.js, then shows its steps
   one at a time: cards (text / media / widget) → questions → complete screen.
   ========================================================= */
(function () {
  if (!requireUser()) return;

  // ---- Guard: only open lessons that exist and are unlocked ----
  const id = Number(new URLSearchParams(location.search).get("id"));
  if (!Number.isInteger(id) || id < 1 || id > TOTAL || id > state.done + 1) return location.replace("path.html");

  const stage = document.getElementById("stage");
  const feedback = document.getElementById("feedback");
  const actions = document.getElementById("actions");
  const btn = document.getElementById("actionBtn");
  const info = LESSON_INFO[id];

  let steps = [], i = 0, picked = null, checked = false, correct = 0, finished = false;

  // ---- Load this lesson's content file ----
  const script = document.createElement("script");
  script.src = `js/lessons/lesson-${String(id).padStart(2, "0")}.js`;
  script.onload = () => (LESSONS[id] ? start(LESSONS[id]) : location.replace("path.html"));
  script.onerror = () => location.replace("path.html");
  document.body.appendChild(script);

  function start(lesson) {
    document.title = `${info.title} · Raster & Vector Academy`;
    steps = lesson.steps;
    renderStats();
    render();
  }

  // ---- Render the current step ----
  function render() {
    const step = steps[i];
    setProgress(i / steps.length);
    feedback.innerHTML = "";
    picked = null;
    checked = false;
    if (step.type === "question") renderQuestion(step); else renderCard(step);
    window.scrollTo(0, 0);
    stage.querySelector("h1").focus({ preventScroll: true });
  }

  function renderCard(step) {
    const eyebrow = step.eyebrow || `Unit ${info.unit} · Lesson ${id}`;
    stage.innerHTML = `<article class="lesson-card">
      <p class="eyebrow mb-1">${eyebrow}</p>
      <h1 tabindex="-1">${step.title}</h1>
      ${step.html || ""}
      ${step.widget ? `<div class="mt-3" data-widget="${step.widget}">${WIDGETS[step.widget].markup()}</div>` : ""}
    </article>`;
    if (step.widget) WIDGETS[step.widget].init(stage.querySelector("[data-widget]"));
    btn.textContent = "Continue";
    btn.disabled = false;
  }

  function renderQuestion(step) {
    stage.innerHTML = `<article class="lesson-card">
      <p class="eyebrow mb-1">Select the correct answer</p>
      <h1 class="h2" tabindex="-1">${step.q}</h1>
      <div class="d-grid gap-2 mt-3" role="group" aria-label="Answers">${step.a.map((t, n) =>
        `<button class="answer" type="button" data-n="${n}" aria-pressed="false"><span class="badge text-bg-light border me-2">${"ABCD"[n]}</span>${t}</button>`).join("")}
      </div>
    </article>`;
    btn.textContent = "Check";
    btn.disabled = true;
  }

  // ---- Answer selection ----
  stage.addEventListener("click", e => {
    const ans = e.target.closest(".answer");
    if (!ans || checked) return;
    picked = +ans.dataset.n;
    stage.querySelectorAll(".answer").forEach(b => {
      b.classList.toggle("selected", b === ans);
      b.setAttribute("aria-pressed", b === ans);
    });
    btn.disabled = false;
  });

  // ---- Check / Continue ----
  btn.addEventListener("click", () => {
    const step = steps[i];
    if (step.type === "question" && !checked) return check(step);
    i++;
    if (i < steps.length) render(); else finish();
  });

  function check(step) {
    checked = true;
    const ok = picked === step.c;
    if (ok) correct++; else state.hearts = Math.max(0, state.hearts - 1);
    save();
    renderStats();
    stage.querySelectorAll(".answer").forEach((b, n) => {
      b.classList.remove("selected");
      if (n === step.c) b.classList.add("correct"); else if (n === picked) b.classList.add("wrong");
    });
    feedback.innerHTML = `<div class="feedback ${ok ? "ok" : "no"}">${ok ? "✔ Correct!" : "✘ Not quite."} <span class="fw-semibold">${step.why}</span></div>`;
    btn.textContent = "Continue";
  }

  // ---- Lesson complete screen ----
  function finish() {
    finished = true;
    const questions = steps.filter(s => s.type === "question").length;
    const mistakes = questions - correct;
    const stars = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;
    const xpGain = 10 + correct * 5;
    if (id === state.done + 1) state.done = id; // first completion unlocks the next lesson
    state.xp += xpGain;
    bumpStreak();
    save();
    renderStats();
    setProgress(1);

    const name = escapeHtml(state.name);
    const message = stars === 3 ? `Flawless, ${name}! Not a single mistake.`
      : stars === 2 ? `Great work, ${name}! Just one slip.` : `You made it, ${name}! Practice makes perfect.`;
    const star = k => `<svg class="star${k <= stars ? " is-earned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8L12 2Z"/></svg>`;
    const stat = (label, value) => `<div class="col-4"><div class="stat-card"><p class="label mb-0">${label}</p><p class="value mb-0">${value}</p></div></div>`;

    stage.innerHTML = `<section class="complete text-center">
      <p class="complete-emoji" aria-hidden="true">🎉</p>
      <h1 tabindex="-1">Lesson complete!</h1>
      <p class="mx-auto text-secondary">${message}</p>
      <div class="stars" role="img" aria-label="${stars} out of 3 stars">${star(1)}${star(2)}${star(3)}</div>
      <div class="row g-2 mt-3 justify-content-center">
        ${stat("Total XP", "+" + xpGain)}
        ${stat("Accuracy", Math.round(correct / questions * 100) + "%")}
        ${stat("Streak", state.streak + (state.streak === 1 ? " day" : " days"))}
      </div>
    </section>`;
    stage.querySelector("h1").focus();

    actions.innerHTML = `<div class="d-grid gap-2">
      ${id < TOTAL ? `<a class="btn btn-chunky" href="lesson.html?id=${id + 1}">Next lesson</a>` : ""}
      <a class="btn btn-outline-chunky" href="path.html">Back to path</a>
    </div>`;
    feedback.innerHTML = "";
  }

  // ---- Leaving mid-lesson asks first ----
  document.getElementById("closeLink").addEventListener("click", e => {
    if (i > 0 && !finished && !confirm("Leave this lesson? You'll need to start it again.")) e.preventDefault();
  });
})();
