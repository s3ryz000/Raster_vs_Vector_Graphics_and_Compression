/* =========================================================
   Lesson player: one template for every lesson.
   lesson.html?id=N loads js/lessons/lesson-NN.js, then shows its steps
   one at a time: cards (text / media / widget) → questions → complete screen.

   Supports question formats: multiple-choice, true-false, fill-blank.
   Supports heart depletion → "Out of Hearts" retry modal.
   ========================================================= */
(function () {
  if (!requireUser()) return;

  // ---- Guard: only open lessons that exist and are unlocked ----
  const id = Number(new URLSearchParams(location.search).get("id"));
  const isFinal = new URLSearchParams(location.search).get("id") === "final";
  if (!isFinal && (!Number.isInteger(id) || id < 1 || id > TOTAL || id > state.done + 1)) return location.replace("path.html");

  const stage = document.getElementById("stage");
  const feedback = document.getElementById("feedback");
  const actions = document.getElementById("actions");
  const btn = document.getElementById("actionBtn");
  const info = isFinal ? { title: "Final Quiz", unit: "★", unitTitle: "Final" } : LESSON_INFO[id];

  let steps = [], i = 0, picked = null, checked = false, correct = 0, finished = false;

  // ---- Load this lesson's content file ----
  const script = document.createElement("script");
  script.src = isFinal ? "js/lessons/lesson-final.js" : `js/lessons/lesson-${String(id).padStart(2, "0")}.js`;
  script.onload = () => {
    const key = isFinal ? "final" : id;
    LESSONS[key] ? start(LESSONS[key]) : location.replace("path.html");
  };
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
    stage.querySelector("h1, h2")?.focus({ preventScroll: true });
  }

  function renderCard(step) {
    const eyebrow = step.eyebrow || `Unit ${info.unit} · Lesson ${isFinal ? "★" : id}`;
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

  /* ─── Multi-format question renderer ─── */
  function renderQuestion(step) {
    const format = step.format || "multiple-choice";

    if (format === "true-false") {
      stage.innerHTML = `<article class="lesson-card">
        <p class="eyebrow mb-1">True or False</p>
        <h1 class="h2" tabindex="-1">${step.q}</h1>
        <div class="d-grid gap-2 mt-3" role="group" aria-label="Answers">
          <button class="answer tf-answer" type="button" data-n="0" aria-pressed="false"><span class="badge text-bg-light border me-2">T</span>True</button>
          <button class="answer tf-answer" type="button" data-n="1" aria-pressed="false"><span class="badge text-bg-light border me-2">F</span>False</button>
        </div>
      </article>`;
    } else if (format === "fill-blank") {
      stage.innerHTML = `<article class="lesson-card">
        <p class="eyebrow mb-1">Fill in the blank</p>
        <h1 class="h2" tabindex="-1">${step.q}</h1>
        <div class="mt-3">
          <label for="blankInput" class="form-label fw-bold">Your answer</label>
          <div class="d-flex gap-2">
            <input type="text" class="form-control fill-input" id="blankInput" autocomplete="off" placeholder="Type your answer…" aria-describedby="blankHint">
          </div>
          <p class="form-text" id="blankHint">Spelling counts, but capitalization does not.</p>
        </div>
      </article>`;
      const inp = stage.querySelector("#blankInput");
      inp.addEventListener("input", () => { picked = inp.value; btn.disabled = !inp.value.trim(); });
      inp.addEventListener("keydown", e => { if (e.key === "Enter" && !btn.disabled) btn.click(); });
    } else {
      /* Default: multiple-choice (4 options) */
      stage.innerHTML = `<article class="lesson-card">
        <p class="eyebrow mb-1">Select the correct answer</p>
        <h1 class="h2" tabindex="-1">${step.q}</h1>
        <div class="d-grid gap-2 mt-3" role="group" aria-label="Answers">${step.a.map((t, n) =>
          `<button class="answer" type="button" data-n="${n}" aria-pressed="false"><span class="badge text-bg-light border me-2">${"ABCD"[n]}</span>${t}</button>`).join("")}
        </div>
      </article>`;
    }
    btn.textContent = "Check";
    btn.disabled = true;
  }

  // ---- Answer selection (MC & T/F only — fill-blank uses input event) ----
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
    const format = step.format || "multiple-choice";
    let ok;

    if (format === "fill-blank") {
      const given = String(picked).trim().toLowerCase();
      const accepted = Array.isArray(step.c) ? step.c.map(s => s.toLowerCase()) : [String(step.c).toLowerCase()];
      ok = accepted.includes(given);
    } else {
      ok = picked === step.c;
    }

    if (ok) { correct++; try { SFX.correct(); } catch {} }
    else {
      state.hearts = Math.max(0, state.hearts - 1);
      try { SFX.wrong(); } catch {}
    }
    save();
    renderStats();

    if (format === "fill-blank") {
      const inp = stage.querySelector("#blankInput");
      inp.disabled = true;
      inp.classList.add(ok ? "is-valid" : "is-invalid");
    } else {
      stage.querySelectorAll(".answer").forEach((b, n) => {
        b.classList.remove("selected");
        const correctIndex = format === "true-false" ? step.c : step.c;
        if (n === correctIndex) b.classList.add("correct");
        else if (n === picked) b.classList.add("wrong");
      });
    }
    feedback.innerHTML = `<div class="feedback ${ok ? "ok" : "no"}">${ok ? "✔ Correct!" : "✘ Not quite."} <span class="fw-semibold">${step.why}</span></div>`;
    btn.textContent = "Continue";

    // Out of Hearts check
    if (state.hearts <= 0 && !ok) {
      showOutOfHearts();
    }
  }

  /* ─── Out of Hearts modal ─── */
  function showOutOfHearts() {
    btn.disabled = true;
    const overlay = document.createElement("div");
    overlay.className = "hearts-modal-overlay";
    overlay.innerHTML = `
      <div class="hearts-modal" id="heartsModalContent">
        <p class="hearts-modal-emoji" aria-hidden="true">💔</p>
        <h2 class="h3" tabindex="-1">Out of Hearts!</h2>
        <p class="text-secondary">You've run out of hearts. Choose how you want to keep learning:</p>
        <div class="d-grid gap-2 mt-3">
          <button class="btn btn-chunky" type="button" id="practiceDrillBtn">⚡ Practice Drill (+3 Hearts)</button>
          <button class="btn btn-outline-chunky" type="button" id="restartLessonBtn">🔄 Restart Lesson (+5 Hearts)</button>
          <a class="btn btn-sm btn-link text-muted mt-2" href="path.html">Back to path</a>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const modalContent = overlay.querySelector("#heartsModalContent");
    overlay.querySelector("h2").focus();

    overlay.querySelector("#restartLessonBtn").addEventListener("click", () => {
      state.hearts = 5;
      save();
      location.reload();
    });

    overlay.querySelector("#practiceDrillBtn").addEventListener("click", () => {
      startPracticeDrill(modalContent, overlay);
    });
  }

  function startPracticeDrill(container, overlay) {
    const drillQuestions = [
      { q: "What does 'pixel' stand for?", a: ["Picture Element", "Pixelated Electronic", "Picture Elevation", "Pixel Matrix"], c: 0 },
      { q: "Is PNG a lossy or lossless compression format?", a: ["Lossy", "Lossless", "Uncompressed", "Analog"], c: 1 },
      { q: "True or False: Vector graphics lose quality when scaled indefinitely.", format: "true-false", c: 1 }
    ];
    let drillIndex = 0;

    function renderDrillStep() {
      const q = drillQuestions[drillIndex];
      container.innerHTML = `
        <span class="badge text-bg-warning mb-2">Practice Drill · ${drillIndex + 1}/3</span>
        <h3 class="h5 mb-3">${q.q}</h3>
        <div class="d-grid gap-2 text-start" id="drillAnswers">
          ${q.format === "true-false"
            ? `<button class="answer tf-answer py-2" data-idx="0">True</button><button class="answer tf-answer py-2" data-idx="1">False</button>`
            : q.a.map((opt, idx) => `<button class="answer py-2" data-idx="${idx}">${opt}</button>`).join("")
          }
        </div>
        <div id="drillFeedback" class="mt-2"></div>
      `;
      container.querySelectorAll(".answer").forEach(b => {
        b.addEventListener("click", () => {
          const chosen = +b.dataset.idx;
          const isCorrect = chosen === q.c;
          b.classList.add(isCorrect ? "correct" : "wrong");
          container.querySelectorAll(".answer").forEach(btn => btn.disabled = true);
          const fb = container.querySelector("#drillFeedback");
          if (isCorrect) {
            fb.innerHTML = `<p class="text-success fw-bold mb-2">✔ Correct!</p>`;
            try { SFX.correct(); } catch {}
            setTimeout(() => {
              drillIndex++;
              if (drillIndex < drillQuestions.length) {
                renderDrillStep();
              } else {
                finishDrill();
              }
            }, 800);
          } else {
            fb.innerHTML = `<p class="text-danger fw-bold mb-2">Try again!</p>`;
            try { SFX.wrong(); } catch {}
            setTimeout(() => renderDrillStep(), 1000);
          }
        });
      });
    }

    function finishDrill() {
      state.hearts = 3;
      save();
      renderStats();
      try { SFX.complete(); } catch {}
      container.innerHTML = `
        <p class="hearts-modal-emoji" aria-hidden="true">💖</p>
        <h3 class="h4">Drill Complete!</h3>
        <p class="text-success fw-bold">+3 Hearts Restored!</p>
        <button class="btn btn-chunky w-100 mt-2" type="button" id="resumeLessonBtn">Resume Lesson</button>
      `;
      container.querySelector("#resumeLessonBtn").addEventListener("click", () => {
        overlay.remove();
        btn.disabled = false;
      });
    }

    renderDrillStep();
  }

  // ---- Lesson complete screen ----
  function finish() {
    finished = true;
    const questions = steps.filter(s => s.type === "question").length;
    const mistakes = questions - correct;
    const stars = mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;
    const xpGain = isFinal ? 100 : (10 + correct * 5);
    if (!isFinal && id === state.done + 1) state.done = id; // first completion unlocks the next lesson
    if (isFinal && state.done >= TOTAL) state.done = TOTAL + 1; // mark final done
    state.xp += xpGain;
    bumpStreak();
    save();
    renderStats();
    setProgress(1);
    try { SFX.complete(); } catch {}

    if (isFinal) {
      triggerConfetti();
    }

    const name = escapeHtml(state.name);
    const message = isFinal
      ? `Outstanding achievement, ${name}! You have mastered all 5 units of digital media and compression.`
      : (stars === 3 ? `Flawless, ${name}! Not a single mistake.`
        : stars === 2 ? `Great work, ${name}! Just one slip.` : `You made it, ${name}! Practice makes perfect.`);
    const star = k => `<svg class="star${k <= stars ? " is-earned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8L12 2Z"/></svg>`;
    const stat = (label, value) => `<div class="col-4"><div class="stat-card"><p class="label mb-0">${label}</p><p class="value mb-0">${value}</p></div></div>`;

    stage.innerHTML = `<section class="complete text-center">
      <p class="complete-emoji" aria-hidden="true">${isFinal ? "🏆" : "🎉"}</p>
      <h1 tabindex="-1">${isFinal ? "Mastery Achieved!" : "Lesson complete!"}</h1>
      <p class="mx-auto text-secondary">${message}</p>
      <div class="stars" role="img" aria-label="${stars} out of 3 stars">${star(1)}${star(2)}${star(3)}</div>
      <div class="row g-2 mt-3 justify-content-center">
        ${stat("Total XP", "+" + xpGain)}
        ${stat("Accuracy", Math.round(correct / questions * 100) + "%")}
        ${stat("Streak", state.streak + (state.streak === 1 ? " day" : " days"))}
      </div>
    </section>`;
    stage.querySelector("h1").focus();

    const nextId = isFinal ? null : (id < TOTAL ? id + 1 : null);
    actions.innerHTML = `<div class="d-grid gap-2">
      ${isFinal ? `<button class="btn btn-chunky" type="button" id="viewCertBtn">🎓 View Graduation Certificate</button>` : ""}
      ${nextId ? `<a class="btn btn-chunky" href="lesson.html?id=${nextId}">Next lesson</a>` : ""}
      ${!isFinal && id === TOTAL ? `<a class="btn btn-chunky" href="lesson.html?id=final">🏆 Take Final Quiz!</a>` : ""}
      <a class="btn btn-outline-chunky" href="path.html">Back to path</a>
    </div>`;
    feedback.innerHTML = "";

    if (isFinal) {
      document.getElementById("viewCertBtn")?.addEventListener("click", () => showCertificateModal(name));
    }
  }

  function triggerConfetti() {
    const container = document.createElement("div");
    container.className = "confetti-container";
    const colors = ["#58cc02", "#1cb0f6", "#ffc800", "#ff4b72", "#ce82ff", "#ff9600"];
    for (let c = 0; c < 60; c++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 2 + "s";
      piece.style.transform = `scale(${Math.random() * 0.8 + 0.6})`;
      container.appendChild(piece);
    }
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 6000);
  }

  function showCertificateModal(studentName) {
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const overlay = document.createElement("div");
    overlay.className = "cert-modal-overlay";
    overlay.innerHTML = `
      <div class="cert-card" tabindex="-1">
        <svg class="cert-seal" viewBox="0 0 24 24" fill="#ce9b32" aria-hidden="true">
          <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 16.1 7.2 18.6l.9-5.3-3.8-3.7 5.3-.8L12 2zm0 17v4l-4-2-4 2v-4a9.9 9.9 0 0 0 8 0zm8 0a9.9 9.9 0 0 0-8 0v4l4-2 4 2v-4z"/>
        </svg>
        <p class="text-uppercase small fw-bold tracking-wide text-secondary mb-1">Official Academy Credential</p>
        <h2 class="cert-title">Certified Digital Media Specialist</h2>
        <p class="cert-subtitle mt-2 mb-1">This certifies that</p>
        <div class="cert-name">${studentName}</div>
        <p class="cert-subtitle">has successfully mastered the foundations of<br><strong>Raster Graphics, Vector Mathematics & Digital Compression Algorithms</strong></p>
        <p class="cert-date mt-3 mb-4">Awarded on ${today} · Raster & Vector Academy</p>
        <div class="d-flex gap-2 justify-content-center">
          <button class="btn btn-chunky px-4" type="button" onclick="window.print()">🖨️ Print Certificate</button>
          <button class="btn btn-outline-chunky px-4" type="button" id="closeCertBtn">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector("#closeCertBtn").addEventListener("click", () => overlay.remove());
    overlay.querySelector(".cert-card").focus();
  }

  // ---- Leaving mid-lesson asks first ----
  document.getElementById("closeLink").addEventListener("click", e => {
    if (i > 0 && !finished && !confirm("Leave this lesson? You'll need to start it again.")) e.preventDefault();
  });
})();
